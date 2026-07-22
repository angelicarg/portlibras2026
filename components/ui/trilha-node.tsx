import { cn } from "@/lib/cn";

// As 4 Jornadas do Centro de Conexões (worldbuilding pass) — "Geral" não é mais
// um nó de trilha, virou "Desafios Livres" dentro do hub (ver TrilhaNode home).
export type TrilhaId = "espaco" | "pensadores" | "linguagens" | "sociedade";

export type TrilhaNodeState = "bloqueada" | "em-andamento" | "concluida";

const trilhaColorVar: Record<TrilhaId, string> = {
  espaco: "var(--trilha-espaco)",
  pensadores: "var(--trilha-pensadores)",
  linguagens: "var(--trilha-linguagens)",
  sociedade: "var(--trilha-sociedade)",
};

const stateLabel: Record<TrilhaNodeState, string> = {
  bloqueada: "Trancada",
  "em-andamento": "Em andamento",
  concluida: "Concluída",
};

export interface TrilhaNodeProps {
  trilha: TrilhaId;
  nome: string;
  estado: TrilhaNodeState;
  /** Quantas insígnias o jogador já ganhou nessa Jornada (pode repetir a
   * Jornada pra ganhar outras — não é mais um "concluído/não concluído"
   * binário, ver conversa 2026-07-22). Quando > 0, isso substitui o rótulo
   * de estado normal. */
  conquistas?: number;
  recomendada?: boolean;
  onClick?: () => void;
  className?: string;
}

function labelConquistas(conquistas: number) {
  return conquistas === 1 ? "1 conquista concluída" : `${conquistas} conquistas concluídas`;
}

export function TrilhaNode({
  trilha,
  nome,
  estado,
  conquistas = 0,
  recomendada,
  onClick,
  className,
}: TrilhaNodeProps) {
  const cor = trilhaColorVar[trilha];
  const bloqueada = estado === "bloqueada";
  const temConquista = conquistas > 0;
  const label = temConquista ? labelConquistas(conquistas) : stateLabel[estado];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={bloqueada}
      aria-label={`Trilha ${nome} — ${label}`}
      className={cn(
        "group flex flex-col items-center gap-2 disabled:cursor-not-allowed",
        className
      )}
    >
      <span
        className={cn(
          "relative flex h-20 w-20 items-center justify-center rounded-full border-4 text-2xl font-display font-semibold text-white shadow-sm transition-transform group-hover:scale-105",
          bloqueada && "grayscale opacity-60"
        )}
        style={{
          backgroundColor: cor,
          borderColor: recomendada ? "var(--secondary)" : "transparent",
        }}
      >
        {temConquista ? "★" : nome.charAt(0)}
        {recomendada && (
          <span className="absolute -top-2 -right-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground shadow">
            pra você
          </span>
        )}
      </span>
      <span className="text-sm font-medium text-foreground">{nome}</span>
      <span className="text-xs text-muted">{label}</span>
    </button>
  );
}
