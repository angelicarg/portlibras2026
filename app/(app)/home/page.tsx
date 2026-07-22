"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { TrilhaNode, type TrilhaId, type TrilhaNodeState } from "@/components/ui/trilha-node";
import { LumenJornada } from "@/components/ui/lumen-jornada";
import type { VisualSkin } from "@/components/ui/lumen-guia";
import { CenaBoasVindas } from "@/components/ui/cena-boas-vindas";
import type { LumenArteExpressao } from "@/lib/lumens";
import { arvoreSrc } from "@/lib/arvore";
import { insigniaSrc, insigniaVariantes } from "@/lib/insignias";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

// TODO: substituir por dados reais (user_trilha_progress) quando o Supabase estiver plugado.
const mockProficiencia = { libras: "iniciante", portugues: "iniciante" };

// TODO: substituir pelo visual_skin real do perfil quando o Supabase estiver plugado
// (mesmo valor mockado em app/(app)/layout.tsx, mantidos em sincronia por enquanto).
// "kids" é o público prioritário por enquanto — "joy"/"adult" ficam pra depois.
const mockVisualSkin: VisualSkin = "kids";

// TODO: mesmo mock de brilho/expressão calculado em app/(app)/layout.tsx a
// partir do mockUser — duplicado aqui até existir um estado de usuário
// compartilhado de verdade (Supabase). Ver lib/lumen-guia.ts pras regras.
const mockLumenGuia = { glow: "constante" as const, expressao: "alegre" as const };

const expressaoPorEstado: Record<TrilhaNodeState, LumenArteExpressao> = {
  bloqueada: "calmo",
  "em-andamento": "neutro",
  concluida: "feliz",
};

const trilhaColorVar: Record<TrilhaId, string> = {
  espaco: "var(--trilha-espaco)",
  pensadores: "var(--trilha-pensadores)",
  linguagens: "var(--trilha-linguagens)",
  sociedade: "var(--trilha-sociedade)",
};

// As 4 Jornadas do Centro de Conexões — "Geral" não aparece aqui, virou
// "Desafios Livres" no hub (ver card abaixo do mapa). Posições (top/left em %)
// escolhidas pra cair nos 4 "portais" da pintura da praça (portal ao fundo,
// arco de mãos embaixo, fonte à direita, bússola à esquerda) — ajustar a olho
// depois de ver renderizado, a pintura não tem marcação exata pra isso.
const mockJornadas: Array<{
  id: TrilhaId;
  nome: string;
  estado: TrilhaNodeState;
  // Quantas das INSIGNIA_VARIANTES insígnias o jogador já ganhou nessa
  // Jornada — jogar de novo pode render outra (não é mais um flag binário de
  // "concluída", ver conversa 2026-07-22). "concluida" como estado passa a
  // significar só "sem mais nada de novo a fazer aqui por enquanto", não
  // "parou de valer a pena entrar".
  conquistas: number;
  top: number;
  left: number;
}> = [
  { id: "espaco", nome: "Exploração Espacial", estado: "bloqueada", conquistas: 0, top: 6, left: 51 },
  { id: "pensadores", nome: "Grandes Pensadores", estado: "bloqueada", conquistas: 0, top: 47, left: 88 },
  { id: "sociedade", nome: "Vida em Sociedade", estado: "em-andamento", conquistas: 0, top: 78, left: 50 },
  // TODO: simulação — 1 conquista pra testar a insígnia na árvore (ver
  // conversa 2026-07-22). Zerar ou plugar progresso real quando o Supabase
  // estiver conectado. Continua "em-andamento" (não "concluida") porque dá
  // pra jogar de novo e ganhar outra das 4 insígnias possíveis.
  { id: "linguagens", nome: "Linguagens", estado: "em-andamento", conquistas: 1, top: 57, left: 23 },
];

// Ornamentos na copa da árvore — um "slot" fixo por Jornada, que acende com a
// insígnia real assim que ela tem pelo menos 1 conquista. É o que acumula
// visualmente na árvore central (compartilhada) conforme o jogador progride
// nas 4 Jornadas — diferente da insígnia no portal, que é só daquela Jornada.
const ornamentosArvore: Array<{ id: TrilhaId; top: number; left: number }> = [
  { id: "espaco", top: 20, left: 45 },
  { id: "pensadores", top: 19, left: 57 },
  { id: "linguagens", top: 25, left: 48 },
  { id: "sociedade", top: 26, left: 54 },
];

// Lumens perambulando pela praça — puramente ambiente/decorativo, não reagem a
// clique. Cada um segue um "lumen-path-*" definido em globals.css (loop de ida
// e volta passando perto do centro/portais). Duração e delay diferentes pra não
// ficarem sincronizados entre si.
const mockLumensAmbiente: Array<{ jornada: TrilhaId; path: string; duration: string; delay: string }> = [
  { jornada: "linguagens", path: "lumen-path-a", duration: "24s", delay: "0s" },
  { jornada: "pensadores", path: "lumen-path-b", duration: "28s", delay: "4s" },
  { jornada: "espaco", path: "lumen-path-c", duration: "32s", delay: "9s" },
];

function recomendaSociedade(proficiencia: typeof mockProficiencia) {
  return proficiencia.libras === "iniciante" && proficiencia.portugues === "iniciante";
}

export default function HomePage() {
  const router = useRouter();
  const sociedadeRecomendada = recomendaSociedade(mockProficiencia);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Centro de Conexões
        </h1>
        <p className="text-sm text-muted">
          Escolha uma Jornada — nenhuma ordem obrigatória, jogue na sequência que quiser.
        </p>
        <p className="mt-1 text-xs text-muted italic">
          Passe o mouse pela praça para descobrir onde ficam os portais.
        </p>
      </div>

      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card border border-border bg-surface">
        <Image
          src={arvoreSrc(mockVisualSkin)}
          alt="Árvore das Conexões, no centro do pátio do Centro de Conexões"
          fill
          priority
          className="object-cover"
        />

        {/* Ornamentos da árvore central — acendem conforme cada Jornada ganha
            sua 1ª conquista. Puramente decorativo, atrás dos portais. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {ornamentosArvore.map((ornamento) => {
            const jornada = mockJornadas.find((j) => j.id === ornamento.id);
            if (!jornada || jornada.conquistas <= 0) return null;
            return (
              <span
                key={ornamento.id}
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${ornamento.top}%`,
                  left: `${ornamento.left}%`,
                  animation: "insignia-glow 2.6s ease-in-out infinite",
                }}
              >
                <Image
                  src={insigniaSrc(jornada.id)}
                  alt={`Ornamento da árvore — ${jornada.nome} conquistada`}
                  width={32}
                  height={32}
                  className="h-full w-full object-contain drop-shadow"
                />
              </span>
            );
          })}
        </div>

        {/* Lumens ambiente — decorativos, atrás dos portais, não bloqueiam clique */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {mockLumensAmbiente.map((lumen) => (
            <span
              key={lumen.jornada}
              className="absolute -translate-x-1/2 -translate-y-1/2 opacity-85 drop-shadow-sm"
              style={{
                animation: `${lumen.path} ${lumen.duration} ease-in-out infinite`,
                animationDelay: lumen.delay,
              }}
            >
              <LumenJornada jornada={lumen.jornada} skin={mockVisualSkin} expressao="feliz" size="sm" />
            </span>
          ))}
        </div>

        {mockJornadas.map((jornada) => (
          <div
            key={jornada.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${jornada.top}%`, left: `${jornada.left}%` }}
          >
            {/* Pista sempre visível: Jornada com pelo menos 1 conquista
                mostra a insígnia de verdade, brilhando — é a conquista, não
                precisa de descoberta. As demais mantêm o pontinho pulsante
                (mecânica de explorar). */}
            {jornada.conquistas > 0 ? (
              <span
                className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0"
                style={{ animation: "insignia-glow 2.6s ease-in-out infinite" }}
              >
                <Image
                  src={insigniaSrc(jornada.id)}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-contain drop-shadow"
                />
              </span>
            ) : (
              <span
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0"
                style={{
                  backgroundColor: trilhaColorVar[jornada.id],
                  animation: "portal-pulse 2.4s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            )}

            {/* Cartão completo — só aparece no hover/foco */}
            <div className="flex scale-90 flex-col items-center gap-1 rounded-2xl bg-background/75 px-3 py-2 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100">
              {jornada.conquistas > 0 ? (
                <Image
                  src={insigniaSrc(jornada.id)}
                  alt={`Insígnia conquistada — ${jornada.nome}`}
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
              ) : (
                <LumenJornada
                  jornada={jornada.id}
                  skin={mockVisualSkin}
                  expressao={expressaoPorEstado[jornada.estado]}
                  size="sm"
                />
              )}
              <TrilhaNode
                trilha={jornada.id}
                nome={jornada.nome}
                estado={jornada.estado}
                conquistas={jornada.conquistas}
                recomendada={jornada.id === "sociedade" && sociedadeRecomendada}
                onClick={() => router.push(`/jornadas/${jornada.id}`)}
              />
            </div>
          </div>
        ))}

        <CenaBoasVindas
          skin={mockVisualSkin}
          glow={mockLumenGuia.glow}
          expressao={mockLumenGuia.expressao}
          texto="Cada portal ao redor da árvore leva a uma Jornada de aprendizado diferente. Escolha o que quiser — não tem ordem certa — e comece por ali!"
        />
      </div>

      {/* Galeria de insígnias por Jornada — primeira versão da arte
          (2026-07-22), só pra ver como fica renderizada lado a lado. A
          quantidade por Jornada vem de lib/insignias.ts, não é mais fixa em
          4 — Vida em Sociedade, por exemplo, deve crescer conforme mais
          espaços/quizzes entrarem (transporte, afazeres domésticos,
          atividades em família). Ainda não há regra de qual variante o
          jogador ganha em cada jogada, é só teste visual/escolha de arte. */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground">
          Galeria de insígnias por Jornada
        </h2>
        <p className="text-xs text-muted">
          Primeira versão da arte — ainda não representa progresso real.
        </p>
        <div className="mt-3 flex flex-col gap-5">
          {mockJornadas.map((jornada) => (
            <div key={jornada.id} className="rounded-2xl border border-border bg-surface p-4">
              <span
                className="text-sm font-semibold"
                style={{ color: trilhaColorVar[jornada.id] }}
              >
                {jornada.nome}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {insigniaVariantes(jornada.id).map((variante) => (
                  <div
                    key={variante}
                    className="flex flex-col items-center gap-1 rounded-xl bg-background p-2"
                  >
                    <Image
                      src={insigniaSrc(jornada.id, variante)}
                      alt={`Insígnia ${variante} — ${jornada.nome}`}
                      width={120}
                      height={120}
                      className="h-auto w-full max-w-[120px] object-contain"
                    />
                    <span className="text-[11px] text-muted">Variante {variante}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardTitle>Desafios livres</CardTitle>
          <CardDescription className="mt-1">
            Conteúdo avulso do Centro de Conexões, fora das Jornadas temáticas — bom
            ponto de partida se você ainda não sabe por onde começar.
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Revisão pendente</CardTitle>
          <CardDescription className="mt-1">
            Você tem 3 questões erradas esperando pra voltar — elas reaparecem aos
            poucos, não de uma vez.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
