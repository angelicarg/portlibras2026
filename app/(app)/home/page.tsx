"use client";

import { useRouter } from "next/navigation";
import { TrilhaNode, type TrilhaId, type TrilhaNodeState } from "@/components/ui/trilha-node";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

// TODO: substituir por dados reais (user_trilha_progress) quando o Supabase estiver plugado.
const mockProficiencia = { libras: "iniciante", portugues: "iniciante" };

const mockTrilhas: Array<{
  id: TrilhaId;
  nome: string;
  estado: TrilhaNodeState;
  top: number;
  left: number;
}> = [
  { id: "linguagens", nome: "Linguagens", estado: "bloqueada", top: 18, left: 30 },
  { id: "arte", nome: "Matemática e Artes", estado: "bloqueada", top: 15, left: 68 },
  { id: "cotidiano", nome: "Cotidiano", estado: "em-andamento", top: 50, left: 14 },
  { id: "espaco", nome: "Espaço", estado: "bloqueada", top: 48, left: 84 },
  { id: "geral", nome: "Geral", estado: "concluida", top: 80, left: 50 },
];

function recomendaCotidiano(proficiencia: typeof mockProficiencia) {
  return proficiencia.libras === "iniciante" && proficiencia.portugues === "iniciante";
}

export default function HomePage() {
  const router = useRouter();
  const cotidianoRecomendada = recomendaCotidiano(mockProficiencia);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Escolha sua trilha
        </h1>
        <p className="text-sm text-muted">
          Nenhuma ordem obrigatória — jogue as trilhas na sequência que quiser.
        </p>
      </div>

      <div className="relative min-h-[420px] w-full overflow-hidden rounded-card border border-border bg-surface">
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 88 C 20 70, 15 55, 15 48 M 50 88 C 80 70, 88 55, 88 48 M 15 48 C 20 30, 28 18, 33 15 M 88 48 C 82 25, 75 12, 71 11"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
        </svg>

        {mockTrilhas.map((trilha) => (
          <div
            key={trilha.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${trilha.top}%`, left: `${trilha.left}%` }}
          >
            <TrilhaNode
              trilha={trilha.id}
              nome={trilha.nome}
              estado={trilha.estado}
              recomendada={trilha.id === "cotidiano" && cotidianoRecomendada}
              onClick={() => router.push(`/trilhas/${trilha.id}`)}
            />
          </div>
        ))}
      </div>

      <Card>
        <CardTitle>Revisão pendente</CardTitle>
        <CardDescription className="mt-1">
          Você tem 3 questões erradas esperando pra voltar — elas reaparecem aos poucos, não de uma vez.
        </CardDescription>
      </Card>
    </div>
  );
}
