import Image from "next/image";
import { cn } from "@/lib/cn";
import { lumenJornadaSrc, type LumenArteExpressao } from "@/lib/lumens";
import type { VisualSkin } from "@/components/ui/lumen-guia";
import type { TrilhaId } from "@/components/ui/trilha-node";

// Companheiro de cada Jornada (diferente do Lumen Guia): brilho fixo na cor da
// própria Jornada, sem a mecânica de progresso/humor — decidido que só o Lumen
// Guia reage a pontos/inatividade (worldbuilding memory, 2026-07-06).
const trilhaColorVar: Record<TrilhaId, string> = {
  espaco: "var(--trilha-espaco)",
  pensadores: "var(--trilha-pensadores)",
  linguagens: "var(--trilha-linguagens)",
  sociedade: "var(--trilha-sociedade)",
};

export interface LumenJornadaProps {
  jornada: TrilhaId;
  skin: VisualSkin;
  expressao?: LumenArteExpressao;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizePx: Record<NonNullable<LumenJornadaProps["size"]>, number> = {
  sm: 40,
  md: 64,
  lg: 120,
};

export function LumenJornada({
  jornada,
  skin,
  expressao = "neutro",
  size = "md",
  className,
}: LumenJornadaProps) {
  const px = sizePx[size];
  const src = lumenJornadaSrc(jornada, skin, expressao);

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: px, height: px }}
      role="img"
      aria-label={`Lumen da Jornada ${jornada} — ${expressao}`}
    >
      <span
        className="absolute inset-0 rounded-full opacity-40 blur-[10px]"
        style={{ backgroundColor: trilhaColorVar[jornada] }}
      />
      <Image
        src={src}
        alt=""
        width={px}
        height={px}
        className="relative h-full w-full object-contain"
      />
    </span>
  );
}
