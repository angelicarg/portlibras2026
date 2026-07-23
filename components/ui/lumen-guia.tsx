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

// Faixas bem mais afastadas entre si do que a primeira versão (que rendia
// quase imperceptível entre vibrante/radiante) — e as duas faixas de cima
// pulsam (animação), já que movimento chama muito mais atenção do que só
// blur/opacity estáticos maiores.
const glowSpec: Record<
  LumenGlowTier,
  { blur: number; opacity: number; scale: number; pulse?: string }
> = {
  suave: { blur: 4, opacity: 0.22, scale: 1 },
  constante: { blur: 10, opacity: 0.45, scale: 1.04 },
  vibrante: { blur: 18, opacity: 0.7, scale: 1.1, pulse: "lumen-guia-pulse-vibrante 2.4s ease-in-out infinite" },
  radiante: { blur: 28, opacity: 0.95, scale: 1.2, pulse: "lumen-guia-pulse-radiante 1.5s ease-in-out infinite" },
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
          animation: g.pulse,
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
