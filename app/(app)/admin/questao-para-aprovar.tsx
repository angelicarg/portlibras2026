"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { QuestaoPreview, type QuestaoPreviewData } from "@/components/questao-preview";
import { aprovarQuestao, rejeitarQuestao } from "./actions";

export function QuestaoParaAprovar({ questao }: { questao: QuestaoPreviewData & { id: string } }) {
  const [mostrarRejeicao, setMostrarRejeicao] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <QuestaoPreview questao={questao} />

      {!mostrarRejeicao ? (
        <div className="mt-4 flex gap-2">
          <Button disabled={pending} onClick={() => startTransition(() => aprovarQuestao(questao.id))}>
            Aprovar
          </Button>
          <Button variant="outline" disabled={pending} onClick={() => setMostrarRejeicao(true)}>
            Rejeitar
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo da rejeição"
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={pending || !motivo.trim()}
              onClick={() => startTransition(() => rejeitarQuestao(questao.id, motivo))}
            >
              Confirmar rejeição
            </Button>
            <Button variant="ghost" disabled={pending} onClick={() => setMostrarRejeicao(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
