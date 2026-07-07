-- PortLibras database schema
-- Designed 2026-07-05. Run this in the Supabase SQL Editor on a fresh project.

-- ENUMS
create type role_enum as enum ('admin', 'professor', 'jogador');
create type visual_skin_enum as enum ('kids', 'joy', 'adult');
create type proficiency_enum as enum ('iniciante', 'intermediario', 'avancado');
create type plan_enum as enum ('livre', 'academico'); -- 'academico' reserved for later
create type question_type_enum as enum (
  'monte_a_palavra', 'clique_na_imagem', 'complete_a_palavra',
  'escolha_a_frase', 'escreva_a_palavra', 'complete_a_frase', 'clique_no_video'
);
create type question_status_enum as enum ('draft', 'pending', 'approved', 'rejected');
create type progress_status_enum as enum ('not_started', 'in_progress', 'completed');

-- PROFILES (1:1 with auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  base_role role_enum not null default 'jogador',
  active_role role_enum not null default 'jogador',
  visual_skin visual_skin_enum not null default 'joy',
  libras_level proficiency_enum not null default 'iniciante',
  portugues_level proficiency_enum not null default 'iniciante',
  plan plan_enum not null default 'livre',
  points integer not null default 0,
  created_at timestamptz not null default now()
);

-- TRILHAS
create table trilhas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  is_geral boolean not null default false,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

-- QUESTIONS
create table questions (
  id uuid primary key default gen_random_uuid(),
  trilha_id uuid not null references trilhas(id),
  type question_type_enum not null,
  title text not null,
  prompt_text text not null,
  prompt_video_url text not null,
  image_url text not null,
  options jsonb not null,              -- ordered array of {id, kind: 'text'|'image'|'video', value}
  answer jsonb not null,                -- single index or ordered array of indices
  correct_feedback_video_url text not null,
  incorrect_feedback_video_url text not null,
  libras_level proficiency_enum not null,
  portugues_level proficiency_enum not null,
  status question_status_enum not null default 'draft',
  rejection_reason text,
  created_by uuid not null references profiles(id),
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on questions (trilha_id, status);

-- QUESTION ATTEMPTS (answer log)
create table question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  question_id uuid not null references questions(id),
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);
create index on question_attempts (user_id, question_id);

-- REVIEW QUEUE (spaced repetition)
create table review_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  question_id uuid not null references questions(id),
  added_at timestamptz not null default now(),
  resolved boolean not null default false,
  resolved_at timestamptz
);
create unique index review_queue_active_unique on review_queue (user_id, question_id) where not resolved;

-- PER-TRILHA PROGRESS
create table user_trilha_progress (
  user_id uuid not null references profiles(id),
  trilha_id uuid not null references trilhas(id),
  status progress_status_enum not null default 'not_started',
  correct_count integer not null default 0,
  completed_at timestamptz,
  primary key (user_id, trilha_id)
);

-- ACHIEVEMENT CATALOG
create table achievement_types (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  icon text
);

-- EARNED ACHIEVEMENTS
create table user_achievements (
  user_id uuid not null references profiles(id),
  achievement_type_id uuid not null references achievement_types(id),
  earned_at timestamptz not null default now(),
  primary key (user_id, achievement_type_id)
);

-- SEED: initial trilhas ("Jornadas", per the Centro de Conexões worldbuilding pass)
insert into trilhas (slug, name, description, is_geral) values
  ('espaco', 'Jornada da Exploração Espacial', 'Observatório e Centro Espacial — física, química, biologia e atualidades, ambientadas no espaço.', false),
  ('matematica-artes', 'Jornada dos Grandes Pensadores', 'Cidade do Conhecimento — uma viagem ao passado, na era de grandes pensadores (da Vinci, Bhaskara e outros).', false),
  ('linguagens', 'Jornada das Linguagens', 'Território da Natureza e das Culturas — imersão na natureza e em civilizações antigas.', false),
  ('cotidiano', 'Jornada da Vida em Sociedade', 'Cidade Viva — vocabulário básico do dia a dia (rotina, família, casa, comida).', false),
  ('geral', 'Desafios Livres', 'Conteúdo avulso do Centro de Conexões, fora das Jornadas temáticas.', true);

-- NOTE: is_geral trilhas are not surfaced as their own map node in the UI — they're
-- presented as "Desafios Livres" inside the Centro de Conexões hub instead. See
-- migration_002_jornadas_rename.sql for the naming rationale.

-- NOTE: Row Level Security policies are intentionally not included here yet —
-- to be designed alongside the auth/role implementation, not before.
