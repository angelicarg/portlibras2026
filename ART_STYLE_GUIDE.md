# Guia de estilo visual — PortLibras

Referência para gerar as ilustrações via IA de imagem (ChatGPT/Gemini/DALL-E ou similar). Objetivo: identidade visual própria e original — **não reaproveitar nem se inspirar no estilo do ilustrador usado na versão anterior do projeto** (ver decisão de autoria no histórico do projeto).

> **Atualização (2026-07-06):** a direção de arte evoluiu de "flat vector minimalista" pra um universo próprio — **Centro de Conexões**, **Árvore das Conexões** e os **Lumens** (espécie de seres de luz, companheiros do jogador) — desenvolvido em paralelo com o ChatGPT. Primeira arte já produzida: Character Bible dos Lumens (`PL-ART-001`) e Árvore das Conexões (`PL-ART-002`) — arquivos ainda vivem fora do repo, em `PortLibras Desenho com ChatGPT/`.
>
> **Atualização (2026-07-07):** testes no Gemini pro estilo **adulto** foram além do "cartoon 3D estilizado" original e chegaram num visual **semi-realista/etéreo** (ser translúcido, feito de luz, sem roupas nem cabelo — no lugar, uma extensão fluida tipo chama) — aprovado, ver prompt-modelo atualizado abaixo. Esse visual mais realista é específico do estilo **adulto**; kids/joy continuam mirando o cartoon mais arredondado/estilizado.

## Regras gerais

- Paleta calorosa e acolhedora — evitar o clichê genérico de "edtech" (azul corporativo + roxo gradiente) na identidade *geral* da marca. Cores mais saturadas (azul, roxo, verde, laranja) são usadas como identidade de cada Jornada individual, não como paleta principal do app.
- Representação diversa: tons de pele variados, ao menos uma opção de personagem com aparelho auditivo/implante coclear visível (sutil, não estigmatizante — é só mais uma característica, não o traço definidor do personagem). *(Os Lumens, por serem seres de luz sem corpo humano literal, ficam de fora dessa regra especificamente — ela vale pros avatares jogáveis.)*
- Personagens em poses que sugerem comunicação/expressividade (mãos visíveis, expressões faciais claras) — coerente com uma plataforma de Libras.
- **Regra crítica: mãos/gestos nunca devem formar uma configuração reconhecível como um sinal específico de Libras (ou de qualquer língua de sinais).** Decidido em 2026-07-07 depois de um primeiro teste em que a IA gerou sem querer algo parecido com um sinal real. Risco: um sinal errado ou sem sentido, mesmo que só decorativo, mina a credibilidade de um produto que ensina Libras de verdade. Gestos abertos/genéricos (comunicar, acolher, celebrar) estão liberados — só configuração de mão específica-de-sinal é proibida, a menos que a própria Angélica (intérprete/pesquisadora) desenhe e valide aquele sinal especificamente.
- **Sem texto ou letras dentro da imagem** — todo texto em Português/Libras é sobreposto pela interface, não faz parte da arte.
- Não gerar nada derivado de personagens/IPs existentes (nem de jogos, nem de mascotes de terceiros).

## Os três estilos (público-alvo)

1. **Kids** (crianças): formas mais arredondadas, olhos grandes, cores primárias vivas, proporções "fofas" clássicas de desenho infantil.
2. **Joy** (adolescentes/jovens adultos): estilizado e moderno, semi-flat, cores vibrantes mas sem ser "bebê", poses mais dinâmicas.
3. **Adulto**: visual semi-realista/etéreo (ver atualização 2026-07-07 acima), traço sofisticado, **sem infantilização** — este é o público que, na pesquisa original, reclamou de material "muito para criança" (ver achado da tese sobre o participante "Toad 7").

Decisão de 2026-07-06 mantida: cada Lumen ganha as 3 versões — triplica o volume de arte por personagem, ciente e aceito.

## O elenco de Lumens (atualizado 2026-07-07)

**Substituiu o roster antigo de "6 Lumens = 6 tipos de conquista".** Agora é **1 Lumen por Jornada + o Lumen Guia** (universal, sem Jornada própria):

| Lumen | Jornada | Cor (igual à cor da Jornada no app) |
|---|---|---|
| Lumen Guia | — mora no Centro de Conexões, acompanha todo mundo | turquesa |
| Lumen das Linguagens | Jornada das Linguagens | verde |
| Lumen dos Grandes Pensadores | Jornada dos Grandes Pensadores | roxo |
| Lumen da Vida em Sociedade | Jornada da Vida em Sociedade | laranja |
| Lumen da Exploração Espacial | Jornada da Exploração Espacial | azul |

**Consequência aceita:** isso desfaz o 1:1 antigo entre Lumens e os 6 Frutos da Conexão (Conhecimento/Natureza/Ciência/Criatividade/Comunidade/Empatia) da Árvore das Conexões — os Frutos continuam existindo como sistema de conquista, só que sem um Lumen correspondente cada.

## O que precisamos gerar

- **Os 5 Lumens** da tabela acima, cada um nas 3 variações de estilo. O Lumen Guia já tem turnaround completo (frontal/lateral/traseira/¾, ~90cm) e 8 expressões definidas na Character Bible original (`PL-ART-001`, estilo cartoon) — os 4 Lumens de Jornada ainda precisam desse mesmo nível de detalhe (turnaround + expressões) em cada um dos 3 estilos, começando pelo adulto, que já tem uma primeira leva aprovada.
- **Avatares jogáveis** (o *jogador*, não os Lumens): 4 a 6 por estilo, com a diversidade descrita acima, ~170cm de referência.
- **Ícones das 4 Jornadas**: um ícone por Jornada, versionado nos 3 estilos — pode reaproveitar os ícones que já orbitam a cabeça de cada Lumen de Jornada no estilo adulto (ver prompt abaixo).
- **Estados do nó no mapa**: trancado / em progresso / concluído (medalha).
- **A Árvore das Conexões**: já definida nos 4 estágios (Broto/Jovem/Madura/Lendária) — falta gerar as 3 variações de estilo, se fizer sentido (a ver: pode ser que a árvore fique fixa/única, e só os avatares/Lumens variem por estilo).
- **Emblemas de conquista / Frutos da Conexão**: os 6 tipos já têm cor e significado definidos, agora desacoplados do elenco de Lumens (ver acima).

## Prompt-modelo — estilo adulto (aprovado 2026-07-07)

Base fixa, repete em todo Lumen (garante que a família continua parecendo a mesma espécie):

```
Ilustração digital semi-realista, ser humanoide translúcido e etéreo, feito de luz,
sem gênero definido, cabeça alongada, sem cabelo — no lugar do cabelo, uma extensão
fluida em forma de chama/fumaça flutuando para trás. Corpo levemente transparente,
com brilho interno irradiando do peito. Pele lisa, sem roupa, sem textura de tecido.
Postura de braços/mãos aberta e acolhedora, evocando comunicação — mas as mãos NUNCA
devem formar uma configuração reconhecível como um sinal específico de Libras ou de
qualquer língua de sinais, apenas gestos genéricos e abertos. Fundo transparente.
Sem texto, sem letras, sem logotipos.
```

Complemento por Lumen (cor + ícones orbitando a cabeça):

- **Lumen Guia** (turquesa): anel de círculos simples orbitando em órbita regular — não usa ícones temáticos, reforça o papel de guia universal.
- **Lumen das Linguagens** (verde): folhas, ondas sonoras, padrões têxteis de civilizações antigas.
- **Lumen dos Grandes Pensadores** (roxo): formas geométricas (cubo, esfera, pirâmide), fórmulas matemáticas sutis, um compasso.
- **Lumen da Vida em Sociedade** (laranja): casa, xícara, utensílios de cozinha, relógio.
- **Lumen da Exploração Espacial** (azul): constelações, órbitas planetárias, uma pequena galáxia.

## Prompt-modelo — kids / joy (ainda não testado)

```
Ilustração cartoon 3D estilizada, cores suaves, traço expressivo, sem fotorrealismo.
Estilo [kids: arredondado e fofo / joy: moderno e estilizado].
Paleta calorosa e acolhedora, cores [vivas e primárias / vibrantes].
Assunto: [ex: avatar de personagem sorrindo, mãos visíveis em pose de comunicação
genérica — nunca um sinal específico de Libras —, tom de pele Y, com/sem aparelho
auditivo visível].
Sem letras, sem logotipos, fundo transparente ou neutro.
```

## Status

Em andamento. Estilo adulto do elenco de Lumens (1 por Jornada + Guia) com uma primeira leva de poses aprovada no Gemini — próximo passo é gerar as variações de expressão de cada um nesse mesmo estilo. Depois disso: repetir para kids e joy. Árvore das Conexões (`PL-ART-002`) segue num único estilo de referência, ainda não replicada nos 3 estilos etários. Arquivos finais aprovados devem ser salvos em `portlibras/public/lumens/` (pasta ainda não criada) conforme forem ficando prontos.
