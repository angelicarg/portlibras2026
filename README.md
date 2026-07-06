# PortLibras

Plataforma bilíngue Português-Libras para ensino de português como L2 para pessoas surdas, através de atividades gamificadas.

Baseado na pesquisa de doutorado de Angélica Rodrigues Gonçalves ("De Atividades Gamificadas ao PortLibras", UFU/PPGEL, 2023) e em um protótipo anterior desenvolvido por Karen Okasaki e Daniel Skonetzky — reconstruído aqui com arquitetura e implementação próprias.

## Stack

- **Frontend/Backend:** Next.js
- **Banco de dados / Auth / Storage:** Supabase (Postgres)
- **Vídeos:** links de YouTube (sem hospedagem própria)
- **Imagens:** upload próprio via Supabase Storage

## Conceito

- 7 tipos de exercício interativos (clique/seleção, sem digitação livre), sempre combinando Português + Libras + imagem.
- Dificuldade em dois eixos independentes: nível de Português e nível de Libras.
- Conteúdo organizado em trilhas temáticas não-lineares (Espaço, Matemática e Artes, Linguagens, Cotidiano, Geral).
- Três papéis de conta (admin, professor, jogador) numa única conta com alternância de papel.
- Professores cadastram questões dentro de modelos pré-definidos; admin aprova antes de publicar.
- Pontuação, conquistas de aprendizado e ranking segmentado por trilha/faixa de proficiência.

## Status

Em planejamento — schema do banco de dados definido, stack escolhida. Implementação ainda não iniciada.
