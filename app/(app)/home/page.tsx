"use client";

import { useRouter } from "next/navigation";
import { TrilhaNode, type TrilhaId, type TrilhaNodeState } from "@/components/ui/trilha-node";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LumenGuiaDemo } from "@/components/demo/lumen-guia-demo";

// TODO: substituir por dados reais (user_trilha_progress) quando o Supabase estiver plugado.
const mockProficiencia = { libras: "iniciante", portugues: "iniciante" };

// As 4 Jornadas do Centro de Conexões — "Geral" não aparece aqui, virou
// "Desafios Livres" no hub (ver card abaixo do mapa).
const mockJornadas: Array<{
  id: TrilhaId;
  nome: string;
  estado: TrilhaNodeState;
  top: number;
  left: number;
}> = [
  { id: "linguagens", nome: "Linguagens", estado: "bloqueada", top: 18, left: 22 },
  { id: "pensadores", nome: "Grandes Pensadores", estado: "bloqueada", top: 18, left: 78 },
  { id: "sociedade", nome: "Vida em Sociedade", estado: "em-andamento", top: 78, left: 22 },
  { id: "espaco", nome: "Exploração Espacial", estado: "bloqueada", top: 78, left: 78 },
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
      </div>

      <div className="relative min-h-[420px] w-full overflow-hidden rounded-card border border-border bg-surface">
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 50 C 35 40, 28 30, 22 22 M 50 50 C 65 40, 72 30, 78 22 M 50 50 C 35 60, 28 70, 22 78 M 50 50 C 65 60, 72 70, 78 78"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle cx="50" cy="50" r="3" fill="var(--secondary)" />
        </svg>

        {mockJornadas.map((jornada) => (
          <div
            key={jornada.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${jornada.top}%`, left: `${jornada.left}%` }}
          >
            <TrilhaNode
              trilha={jornada.id}
              nome={jornada.nome}
              estado={jornada.estado}
              recomendada={jornada.id === "sociedade" && sociedadeRecomendada}
              onClick={() => router.push(`/jornadas/${jornada.id}`)}
            />
          </div>
        ))}
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

      <LumenGuiaDemo />
    </div>
  );
}
