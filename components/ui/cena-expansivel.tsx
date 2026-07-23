"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

// Envelope compartilhado por qualquer cena em aspect-[3/2] (praça central,
// cenário de Jornada) — adiciona um botão de expandir, já que em telas mais
// baixas a cena não cabia inteira sem rolar. Expandido vira um overlay fixo
// no viewport inteiro, mas continua em 3:2 (só centralizado e maior) pra não
// bagunçar as posições em % dos hotspots.
export function CenaExpansivel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div
      className={cn(
        expandido && "fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4"
      )}
    >
      <div
        className={cn(
          "relative aspect-[3/2] overflow-hidden rounded-card border border-border bg-surface",
          expandido ? "h-[95vh] max-h-[95vh] w-auto max-w-[95vw]" : "w-full",
          className
        )}
      >
        {children}

        <button
          type="button"
          onClick={() => setExpandido((v) => !v)}
          className="absolute right-3 top-3 z-20 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background"
        >
          {expandido ? "✕ Recolher" : "⤢ Expandir"}
        </button>
      </div>
    </div>
  );
}
