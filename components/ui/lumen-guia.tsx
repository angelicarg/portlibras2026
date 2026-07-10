import Image from "next/image";
import { cn } from "@/lib/cn";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";
import { lumenGuiaSrc } from "@/lib/lumens";

export type VisualSkin = "kids" | "joy" | "adult";

export interface LumenGuiaProps {
  skin: VisualSkin;
  glow: LumenGlowTier;
  expressao: LumenExpressao;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const glowSpec: Record<LumenGlowTier, { blur: number; opacity: number; scale: number }> = {
  suave: { blur: 6, opacity: 0.35, scale: 1 },
  constante: { blur: 10, opacity: 0.5, scale: 1.03 },
  vibrante: { blur: 14, opacity: 0.65, scale: 1.06 },
  radiante: { blur: 20, opacity: 0.85, scale: 1.1 },
};

// A arte só tem 5 expressões (neutro/calmo/surpreso/feliz/triste, ver lib/lumens.ts) —
// a mecânica de brilho+humor (lib/lumen-guia.ts) usa outro vocabulário de 4 estados
// (decidido antes da arte existir), então essa tabela só faz a ponte entre os dois,
// sem mudar a lógica já testada. "neutro" fica sem uso por enquanto (reserva).
const expressaoParaArte: Record<LumenExpressao, "calmo" | "surpreso" | "feliz" | "triste"> = {
  preocupado: "triste",
  tranquilo: "calmo",
  curioso: "surpreso",
  alegre: "feliz",
};

const sizePx: Record<NonNullable<LumenGuiaProps["size"]>, number> = {
  sm: 40,
  md: 64,
  lg: 120,
};

export function LumenGuia({ skin, glow, expressao, size = "md", className }: LumenGuiaProps) {
  const g = glowSpec[glow];
  const px = sizePx[size];
  const src = lumenGuiaSrc(skin, expressaoParaArte[expressao]);

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: px, height: px }}
      role="img"
      aria-label={`Lumen Guia — brilho ${glow}, ${expressao}`}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: "var(--lumen-guia)",
          opacity: g.opacity,
          filter: `blur(${g.blur}px)`,
          transform: `scale(${g.scale})`,
        }}
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
