-- Alinha os slugs de trilhas com os TrilhaId usados no código (o front usa
-- "pensadores"/"sociedade", mas os slugs originais do schema.sql ainda eram
-- "matematica-artes"/"cotidiano" — só o nome de exibição foi atualizado na
-- migration_002, não o slug). Ids/FKs não mudam, então isso é seguro mesmo
-- com dados já existentes.
update trilhas set slug = 'pensadores' where slug = 'matematica-artes';
update trilhas set slug = 'sociedade' where slug = 'cotidiano';

-- Cada Jornada tem hoje 4 "espaços" de desafio dentro do próprio cenário
-- (Lumen Market, Portal Esquerdo, etc. — ver lib/espacos-quiz.ts no app).
-- Isso ainda não existia no banco: uma questão só se ligava à Jornada
-- (trilha_id), não a um espaço específico dentro dela. Sem uma tabela própria
-- de espaços (eles são só config estática no front por enquanto), a forma
-- mais simples é guardar o número do espaço (1..4, mesmo "numero" de
-- ESPACOS_QUIZ) direto na questão.
alter table questions add column espaco_numero smallint not null default 1;
alter table questions alter column espaco_numero drop default;

-- questions_public precisa expor espaco_numero também, senão o jogador não
-- sabe filtrar quais questões pertencem ao espaço que ele clicou.
drop view if exists public.questions_public;
create view public.questions_public as
  select id, trilha_id, espaco_numero, type, title, prompt_text, prompt_video_url, image_url,
         options, correct_feedback_video_url, incorrect_feedback_video_url,
         libras_level, portugues_level, created_at
  from questions
  where status = 'approved';

grant select on public.questions_public to anon, authenticated;
