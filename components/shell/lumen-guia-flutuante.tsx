import { LumenGuia, type VisualSkin } from "@/components/ui/lumen-guia";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";

// O Lumen Guia (brilho = desempenho) ficava pequeno espremido no cabeçalho e
// passava despercebido. Vira um "companheiro" flutuante no canto da tela,
// maior, visível em qualquer página logada — só pro jogador, já que
// professor/admin estão em modo de trabalho, não de progresso.
export function LumenGuiaFlutuante({
  visualSkin,
  lumenGlow,
  lumenExpressao,
  pontos,
}: {
  visualSkin: VisualSkin;
  lumenGlow: LumenGlowTier;
  lumenExpressao: LumenExpressao;
  pontos: number;
}) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5">
      <LumenGuia skin={visualSkin} glow={lumenGlow} expressao={lumenExpressao} size="lg" />
      <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
        ⭐ {pontos} pts
      </span>
    </div>
  );
}
