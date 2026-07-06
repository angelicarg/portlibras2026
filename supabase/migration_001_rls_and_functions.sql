-- PortLibras: Row Level Security policies + secure server-side functions.
-- Run this in the Supabase SQL Editor AFTER schema.sql, in the same (Dente Vivo) project.

-- ─── HELPERS ──────────────────────────────────────────────────────────────
-- Security checks always use base_role (the real, granted permission), never
-- active_role (which is just a UI toggle for which screens/components to
-- show — it is not a security boundary).

create or replace function public.has_role(required_role role_enum)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and base_role = required_role
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select has_role('admin'); $$;

-- ─── PROFILES ─────────────────────────────────────────────────────────────

alter table profiles enable row level security;

create policy "select own profile" on profiles for select using (auth.uid() = id);
create policy "admin select all profiles" on profiles for select using (is_admin());

-- Self-service updates are restricted to safe columns only (display_name,
-- visual_skin, proficiency self-assessment). points/base_role/active_role/plan
-- can NEVER be changed by a direct client update — points only change via
-- submit_answer() below, active_role only via switch_active_role() below.
revoke update on profiles from authenticated;
grant update (display_name, visual_skin, libras_level, portugues_level) on profiles to authenticated;
create policy "update own profile (safe columns)" on profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);
create policy "admin update any profile" on profiles for update using (is_admin());

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, base_role, active_role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.email),
    coalesce((new.raw_user_meta_data->>'base_role')::role_enum, 'jogador'),
    coalesce((new.raw_user_meta_data->>'base_role')::role_enum, 'jogador')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Switch active_role, enforcing the hierarchy decided for the product:
-- admin -> any of the 3; professor -> professor/jogador only; jogador -> locked.
create or replace function public.switch_active_role(p_new_role role_enum)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_base_role role_enum;
begin
  select base_role into v_base_role from profiles where id = auth.uid();

  if v_base_role = 'admin' then
    null; -- admin may switch into any role
  elsif v_base_role = 'professor' then
    if p_new_role = 'admin' then
      raise exception 'Professores não podem virar admin';
    end if;
  else
    raise exception 'Jogadores não podem trocar de papel';
  end if;

  update profiles set active_role = p_new_role where id = auth.uid();
end;
$$;

grant execute on function public.switch_active_role(role_enum) to authenticated;

-- ─── TRILHAS ──────────────────────────────────────────────────────────────

alter table trilhas enable row level security;

create policy "public read trilhas" on trilhas for select using (true);
create policy "admin manage trilhas" on trilhas for all
  using (is_admin()) with check (is_admin());

-- ─── QUESTIONS ────────────────────────────────────────────────────────────
-- The `answer` column must never be readable by a jogador client — otherwise
-- the correct answer would be visible via the API before they even attempt
-- the question. Direct table SELECT is only for the creator/admin (who need
-- the answer to edit/review); jogadores read through `questions_public`
-- below, which excludes it entirely.

alter table questions enable row level security;

create policy "creator reads own questions" on questions
  for select using (created_by = auth.uid());
create policy "admin reads all questions" on questions
  for select using (is_admin());

create policy "professor or admin can insert questions" on questions
  for insert with check (
    created_by = auth.uid() and (has_role('professor') or is_admin())
  );

create policy "creator updates own draft/rejected questions" on questions
  for update using (created_by = auth.uid() and status in ('draft', 'rejected'));
create policy "admin updates any question" on questions
  for update using (is_admin());

create view public.questions_public as
  select id, trilha_id, type, title, prompt_text, prompt_video_url, image_url,
         options, correct_feedback_video_url, incorrect_feedback_video_url,
         libras_level, portugues_level, created_at
  from questions
  where status = 'approved';

grant select on public.questions_public to anon, authenticated;

-- ─── QUESTION ATTEMPTS & REVIEW QUEUE ─────────────────────────────────────
-- No direct insert/update grants for these two tables: attempts must go
-- through submit_answer() below, so is_correct can never be spoofed by the
-- client and points can't be farmed by lying about a wrong answer.

alter table question_attempts enable row level security;
create policy "select own attempts" on question_attempts for select using (user_id = auth.uid());
create policy "admin select all attempts" on question_attempts for select using (is_admin());

alter table review_queue enable row level security;
create policy "select own review queue" on review_queue for select using (user_id = auth.uid());

-- Grade an answer server-side: looks up the real answer (never sent to the
-- client), logs the attempt, awards +1/0 points, and manages the
-- spaced-repetition review queue. Mirrors the create_order()/book_appointment()
-- pattern already used in the other portfolio projects.
create or replace function public.submit_answer(
  p_question_id uuid,
  p_submitted_answer jsonb
) returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  v_answer jsonb;
  v_is_correct boolean;
begin
  select answer into v_answer from questions
    where id = p_question_id and status = 'approved';

  if v_answer is null then
    raise exception 'Questão não encontrada ou não aprovada';
  end if;

  v_is_correct := (v_answer = p_submitted_answer);

  insert into question_attempts (user_id, question_id, is_correct)
  values (auth.uid(), p_question_id, v_is_correct);

  if v_is_correct then
    update profiles set points = points + 1 where id = auth.uid();
    update review_queue set resolved = true, resolved_at = now()
      where user_id = auth.uid() and question_id = p_question_id and not resolved;
  else
    insert into review_queue (user_id, question_id)
    values (auth.uid(), p_question_id)
    on conflict (user_id, question_id) where not resolved do nothing;
  end if;

  return v_is_correct;
end;
$$;

grant execute on function public.submit_answer(uuid, jsonb) to authenticated;

-- ─── PER-TRILHA PROGRESS ───────────────────────────────────────────────────

alter table user_trilha_progress enable row level security;
create policy "select own progress" on user_trilha_progress for select using (user_id = auth.uid());
-- Written by trusted server-side logic (service role) as trilhas are completed,
-- not directly by the client — no insert/update grant for authenticated here.

-- ─── ACHIEVEMENTS ───────────────────────────────────────────────────────────

alter table achievement_types enable row level security;
create policy "public read achievement types" on achievement_types for select using (true);
create policy "admin manage achievement types" on achievement_types for all
  using (is_admin()) with check (is_admin());

alter table user_achievements enable row level security;
create policy "select own achievements" on user_achievements for select using (user_id = auth.uid());
-- Achievements are granted server-side (service role) once criteria-evaluation
-- logic exists — not yet implemented, no client insert grant here on purpose.
