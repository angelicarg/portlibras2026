import { cn } from "@/lib/cn";

export type TrilhaId =
  | "espaco"
  | "arte"
  | "linguagens"
  | "cotidiano"
  | "geral";

export type TrilhaNodeState = "bloqueada" | "em-andamento" | "concluida";

const trilhaColorVar: Record<TrilhaId, string> = {
  espaco: "var(--trilha-espaco)",
  arte: "var(--trilha-arte)",
  linguagens: "var(--trilha-linguagens)",
  cotidiano: "var(--trilha-cotidiano)",
  geral: "var(--trilha-geral)",
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
  recomendada?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TrilhaNode({
  trilha,
  nome,
  estado,
  recomendada,
  onClick,
  className,
}: TrilhaNodeProps) {
  const cor = trilhaColorVar[trilha];
  const bloqueada = estado === "bloqueada";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={bloqueada}
      aria-label={`Trilha ${nome} — ${stateLabel[estado]}`}
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
        {estado === "concluida" ? "★" : nome.charAt(0)}
        {recomendada && (
          <span className="absolute -top-2 -right-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground shadow">
            pra você
          </span>
        )}
      </span>
      <span className="text-sm font-medium text-foreground">{nome}</span>
      <span className="text-xs text-muted">{stateLabel[estado]}</span>
    </button>
  );
}
