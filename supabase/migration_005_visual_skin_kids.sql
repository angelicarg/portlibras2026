-- profiles.visual_skin tinha default 'joy' desde o schema.sql original
-- (2026-07-05), mas "kids" é a skin prioritária desde a decisão de
-- 2026-07-20 (ver memória do projeto) — nenhuma tela hoje lê outra coisa
-- além de "kids" (é mockado fixo no código), então qualquer conta com
-- "joy"/"adult" salva no banco é só o default nunca corrigido, não uma
-- escolha real de ninguém. Seguro reescrever todas.
alter table profiles alter column visual_skin set default 'kids';
update profiles set visual_skin = 'kids' where visual_skin <> 'kids';
