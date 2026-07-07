# Guia de estilo visual — PortLibras

Referência para gerar as ilustrações via IA de imagem (ChatGPT/DALL-E ou similar). Objetivo: identidade visual própria e original — **não reaproveitar nem se inspirar no estilo do ilustrador usado na versão anterior do projeto** (ver decisão de autoria no histórico do projeto).

> **Atualização (2026-07-06):** a direção de arte evoluiu de "flat vector minimalista" pra um universo próprio — **Centro de Conexões**, **Árvore das Conexões** e os **Lumens** (espécie de seres de luz, companheiros do jogador) — desenvolvido em paralelo com o ChatGPT num estilo **cartoon 3D estilizado** (referências: Duolingo, Pokémon, Animal Crossing, Monument Valley). As regras de conteúdo abaixo (paleta, diversidade, sem texto embutido) continuam valendo; a regra de traço "vetorial flat" foi superada por esse estilo mais ilustrado/dimensional. Primeira arte já produzida: Character Bible dos Lumens (`PL-ART-001`) e Árvore das Conexões (`PL-ART-002`) — arquivos ainda vivem fora do repo, em `PortLibras Desenho com ChatGPT/`.

## Regras gerais

- Paleta calorosa e acolhedora — evitar o clichê genérico de "edtech" (azul corporativo + roxo gradiente) na identidade *geral* da marca. Cores mais saturadas (azul, roxo, verde, laranja) são usadas como identidade de cada Jornada individual, não como paleta principal do app.
- Representação diversa: tons de pele variados, ao menos uma opção de personagem com aparelho auditivo/implante coclear visível (sutil, não estigmatizante — é só mais uma característica, não o traço definidor do personagem).
- Personagens em poses que sugerem comunicação/expressividade (mãos visíveis, expressões faciais claras) — coerente com uma plataforma de Libras.
- **Sem texto ou letras dentro da imagem** — todo texto em Português/Libras é sobreposto pela interface, não faz parte da arte.
- Não gerar nada derivado de personagens/IPs existentes (nem de jogos, nem de mascotes de terceiros).

## Os três estilos (público-alvo)

Continuam valendo, agora aplicados também aos Lumens (decisão de 2026-07-06: cada um dos 6 Lumens ganha 3 versões — triplica o volume de arte por personagem, ciente e aceito):

1. **Kids** (crianças): formas mais arredondadas, olhos grandes, cores primárias vivas, proporções "fofas" clássicas de desenho infantil.
2. **Joy** (adolescentes/jovens adultos): estilizado e moderno, semi-flat, cores vibrantes mas sem ser "bebê", poses mais dinâmicas.
3. **Adulto**: paleta mais sóbria, traço minimalista e sofisticado, **sem infantilização** — este é o público que, na pesquisa original, reclamou de material "muito para criança" (ver achado da tese sobre o participante "Toad 7").

## O que precisamos gerar

- **Os 6 Lumens** (Biblioteca, Natureza, Estrelas, Ideias, Comunidade, Guia) — cada um nas 3 variações de estilo. O Lumen Guia já tem turnaround completo (frontal/lateral/traseira/¾, ~90cm) e 8 expressões definidas na Character Bible atual — próximo passo é repetir esse nível de detalhe pros outros 5 e, depois, gerar as 3 variações de estilo de cada um.
- **Avatares jogáveis** (o *jogador*, não os Lumens): 4 a 6 por estilo, com a diversidade descrita acima, ~170cm de referência (mesma escala usada na Character Bible).
- **Ícones das 4 Jornadas** (Linguagens, Grandes Pensadores, Vida em Sociedade, Exploração Espacial): um ícone por Jornada, versionado nos 3 estilos. *(Geral deixou de ser uma Jornada — virou "Desafios Livres" dentro do Centro de Conexões, sem ícone de trilha próprio.)*
- **Estados do nó no mapa**: trancado / em progresso / concluído (medalha).
- **A Árvore das Conexões**: já definida nos 4 estágios (Broto/Jovem/Madura/Lendária) — falta gerar as 3 variações de estilo, se fizer sentido (a ver: pode ser que a árvore fique fixa/única, já que é o símbolo central do jogo, e só os avatares/Lumens variam por estilo — decidir antes de gerar).
- **Emblemas de conquista / Frutos da Conexão**: os 6 tipos já têm cor e significado definidos (Conhecimento, Natureza, Ciência, Criatividade, Comunidade, Empatia) — cada um casa 1:1 com um Lumen.

## Prompt-modelo (copiar e ajustar o [assunto] a cada geração)

```
Ilustração cartoon 3D estilizada, cores suaves, traço expressivo, sem fotorrealismo.
Estilo [kids: arredondado e fofo / joy: moderno e estilizado / adulto: minimalista e sóbrio, sem infantilização].
Paleta calorosa e acolhedora, cores [vivas e primárias / vibrantes / sóbrias e sofisticadas].
Assunto: [ex: avatar de personagem sorrindo, mãos visíveis em pose de comunicação, tom de pele Y, com/sem aparelho auditivo visível].
Sem letras, sem logotipos, fundo transparente ou neutro.
```

## Status

Em andamento — Character Bible dos Lumens (`PL-ART-001`) e Árvore das Conexões (`PL-ART-002`) já produzidas num único estilo de referência. Próximo passo: revisar consistência desse primeiro estilo e então multiplicar pros 3 estilos etários (kids/joy/adulto), começando pelo Lumen Guia por já estar mais detalhado.
