-- Aligns trilha display names with the "Jornadas" naming established in the
-- PortLibras worldbuilding pass (Centro de Conexões / Masterplan v1.0).
-- Slugs and ids are untouched (existing FKs stay valid) — only display copy changes.
-- "Geral" stops being a themed trilha: it's now framed as "Desafios Livres" inside
-- the Centro de Conexões hub, not a 5th map node. We keep the row (so any content
-- already tagged is_geral keeps working) but rename it to match that framing.

update trilhas set
  name = 'Jornada das Linguagens',
  description = 'Território da Natureza e das Culturas — imersão na natureza e em civilizações antigas.'
where slug = 'linguagens';

update trilhas set
  name = 'Jornada dos Grandes Pensadores',
  description = 'Cidade do Conhecimento — uma viagem ao passado, na era de grandes pensadores (da Vinci, Bhaskara e outros).'
where slug = 'matematica-artes';

update trilhas set
  name = 'Jornada da Vida em Sociedade',
  description = 'Cidade Viva — vocabulário básico do dia a dia (rotina, família, casa, comida).'
where slug = 'cotidiano';

update trilhas set
  name = 'Jornada da Exploração Espacial',
  description = 'Observatório e Centro Espacial — física, química, biologia e atualidades, ambientadas no espaço.'
where slug = 'espaco';

update trilhas set
  name = 'Desafios Livres',
  description = 'Conteúdo avulso do Centro de Conexões, fora das Jornadas temáticas.'
where slug = 'geral';
