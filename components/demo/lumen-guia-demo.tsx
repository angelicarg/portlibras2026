"use client";

import { useState } from "react";
import { LumenGuia, type VisualSkin } from "@/components/ui/lumen-guia";
import { getExpressao, getGlowTier } from "@/lib/lumen-guia";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const skins: VisualSkin[] = ["kids", "joy", "adult"];
const skinLabel: Record<VisualSkin, string> = { kids: "Kids", joy: "Joy", adult: "Adulto" };

// Demonstração viva da mecânica do Lumen Guia — não é uma tela final do produto,
// é um preview pra avaliar o placeholder antes da arte real e antes de existir
// um fluxo de quiz de verdade pra reagir de fato.
export function LumenGuiaDemo() {
  const [skin, setSkin] = useState<VisualSkin>("joy");
  const [pontos, setPontos] = useState(20);
  const [diasInativo, setDiasInativo] = useState(0);
  const [ultimaResposta, setUltimaResposta] = useState<"correta" | "incorreta" | null>(null);

  const glow = getGlowTier(pontos);
  const expressao = getExpressao({ diasInativo, ultimaResposta });

  return (
    <Card>
      <CardTitle>Companheiro (demo)</CardTitle>
      <CardDescription className="mt-1 mb-4">
        Preview da mecânica de brilho + expressão do Lumen Guia — o brilho só sobe com
        pontos, a expressão esfria só com inatividade, nunca por errar.
      </CardDescription>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-2">
          <LumenGuia skin={skin} glow={glow} expressao={expressao} size="lg" />
          <span className="text-xs text-muted">
            brilho: {glow} · expressão: {expressao}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex gap-2">
            {skins.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSkin(s)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  skin === s
                    ? "border-primary bg-primary/10 text-primary-hover"
                    : "border-border text-muted hover:border-primary/40"
                )}
              >
                {skinLabel[s]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPontos((v) => v + 50);
                setDiasInativo(0);
                setUltimaResposta("correta");
              }}
            >
              Responder certo (+50 pts)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setDiasInativo(0);
                setUltimaResposta("incorreta");
              }}
            >
              Responder errado (sem penalidade)
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setDiasInativo(3)}>
              Simular 3 dias inativo
            </Button>
          </div>
          <p className="text-xs text-muted">Pontos atuais: {pontos}</p>
        </div>
      </div>
    </Card>
  );
}
