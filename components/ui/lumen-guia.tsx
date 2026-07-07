import { cn } from "@/lib/cn";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";

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

// Só a proporção/estilo do rosto muda por skin — a lógica de brilho e
// expressão (lib/lumen-guia.ts) é idêntica pros 3.
const skinSpec: Record<VisualSkin, { eyeR: number; eyeSpacing: number; mouthScale: number }> = {
  kids: { eyeR: 7, eyeSpacing: 15, mouthScale: 1.2 },
  joy: { eyeR: 5.5, eyeSpacing: 14, mouthScale: 1 },
  adult: { eyeR: 4, eyeSpacing: 13, mouthScale: 0.75 },
};

// Curva da boca por expressão — um único conjunto, reaproveitado pelos 3 skins.
const mouthPath: Record<LumenExpressao, string> = {
  preocupado: "M 38 62 Q 50 54 62 62",
  tranquilo: "M 40 60 Q 50 60 60 60",
  curioso: "M 40 58 Q 50 66 60 58",
  alegre: "M 36 56 Q 50 72 64 56",
};

const sizePx: Record<NonNullable<LumenGuiaProps["size"]>, number> = {
  sm: 40,
  md: 64,
  lg: 120,
};

export function LumenGuia({ skin, glow, expressao, size = "md", className }: LumenGuiaProps) {
  const g = glowSpec[glow];
  const s = skinSpec[skin];
  const px = sizePx[size];

  return (
    <svg
      viewBox="0 0 100 100"
      width={px}
      height={px}
      role="img"
      aria-label={`Lumen Guia — brilho ${glow}, ${expressao}`}
      className={cn("shrink-0", className)}
    >
      <circle
        cx="50"
        cy="50"
        r={32 * g.scale}
        fill="var(--lumen-guia)"
        opacity={g.opacity}
        style={{ filter: `blur(${g.blur}px)` }}
      />
      <circle cx="50" cy="50" r="26" fill="var(--lumen-guia)" />
      <circle cx={50 - s.eyeSpacing / 2} cy="45" r={s.eyeR} fill="white" />
      <circle cx={50 + s.eyeSpacing / 2} cy="45" r={s.eyeR} fill="white" />
      <circle cx={50 - s.eyeSpacing / 2} cy="45" r={s.eyeR * 0.45} fill="#20504c" />
      <circle cx={50 + s.eyeSpacing / 2} cy="45" r={s.eyeR * 0.45} fill="#20504c" />
      <path
        d={mouthPath[expressao]}
        fill="none"
        stroke="white"
        strokeWidth={2.5 * s.mouthScale}
        strokeLinecap="round"
      />
    </svg>
  );
}
