"use client";

import { useState } from "react";
import { LumenGuiaFala } from "@/components/ui/lumen-guia-fala";
import type { VisualSkin } from "@/components/ui/lumen-guia";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";

export interface CenaBoasVindasProps {
  skin: VisualSkin;
  glow: LumenGlowTier;
  expressao: LumenExpressao;
  texto: string;
}

// Overlay de boas-vindas do Lumen Guia — reaproveitado na praça do Centro de
// Conexões e em cada cenário de Jornada (sociedade, linguagens, ...), pra não
// duplicar o mesmo modal em cada página. Some ao fechar, revela a cena por
// baixo. Ainda reseta a cada visita (sem sessão real pra lembrar "já vi").
export function CenaBoasVindas({ skin, glow, expressao, texto }: CenaBoasVindasProps) {
  const [mostrar, setMostrar] = useState(true);
  if (!mostrar) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-[2px]">
      <LumenGuiaFala
        skin={skin}
        glow={glow}
        expressao={expressao}
        texto={texto}
        onFechar={() => setMostrar(false)}
        className="max-w-md"
      />
    </div>
  );
}
