import { cn } from "@/lib/cn";
import { LumenGuia, type VisualSkin } from "@/components/ui/lumen-guia";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";

export interface LumenGuiaFalaProps {
  skin: VisualSkin;
  glow: LumenGlowTier;
  expressao: LumenExpressao;
  texto: string;
  onFechar?: () => void;
  className?: string;
}

// Balão de fala do Lumen Guia — pensado pra já nascer bilíngue (Português +
// Libras), mesmo que o vídeo em Libras ainda não exista: o espaço reservado
// fica visível desde já, em vez de vir "depois" como um adendo. Quando o
// vídeo existir, troca o placeholder por um <video> ali dentro.
export function LumenGuiaFala({ skin, glow, expressao, texto, onFechar, className }: LumenGuiaFalaProps) {
  return (
    <div className={cn("flex items-end gap-4", className)}>
      <LumenGuia skin={skin} glow={glow} expressao={expressao} size="lg" />
      <div className="relative flex-1 rounded-2xl border border-border bg-surface px-5 py-4 pr-10 shadow-sm">
        <span
          aria-hidden="true"
          className="absolute -left-2 bottom-6 h-4 w-4 rotate-45 border-b border-l border-border bg-surface"
        />
        {onFechar && (
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-background hover:text-foreground"
          >
            ✕
          </button>
        )}
        <p className="text-sm text-foreground">{texto}</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-2 text-xs text-muted">
          <span aria-hidden="true">🤟</span>
          <span>Vídeo em Libras — em breve</span>
        </div>
      </div>
    </div>
  );
}
