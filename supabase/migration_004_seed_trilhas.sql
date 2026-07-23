-- A tabela trilhas nunca foi populada de fato (confirmado 2026-07-23 —
-- select direto via API retornava []). Reinsere as 5 Jornadas já com os
-- slugs/nomes finais (pós migration_002 e migration_003), pra não depender
-- de reexecutar as migrations antigas em cima de linhas que não existem.
insert into trilhas (slug, name, description, is_geral) values
  ('espaco', 'Jornada da Exploração Espacial', 'Observatório e Centro Espacial — física, química, biologia e atualidades, ambientadas no espaço.', false),
  ('pensadores', 'Jornada dos Grandes Pensadores', 'Cidade do Conhecimento — uma viagem ao passado, na era de grandes pensadores (da Vinci, Bhaskara e outros).', false),
  ('linguagens', 'Jornada das Linguagens', 'Território da Natureza e das Culturas — imersão na natureza e em civilizações antigas.', false),
  ('sociedade', 'Jornada da Vida em Sociedade', 'Cidade Viva — vocabulário básico do dia a dia (rotina, família, casa, comida).', false),
  ('geral', 'Desafios Livres', 'Conteúdo avulso do Centro de Conexões, fora das Jornadas temáticas.', true)
on conflict (slug) do nothing;
