"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuestaoPreview, type QuestaoPreviewData } from "@/components/questao-preview";
import { STATUS_LABEL, STATUS_TONE } from "@/lib/question-status";
import { aprovarQuestao, rejeitarQuestao } from "./actions";

interface Questao extends QuestaoPreviewData {
  id: string;
  status: string;
  rejection_reason: string | null;
}

// Linha recolhida por padrão (título + jornada/espaço + status) — clica pra
// expandir e ver a questão inteira montada. Recolhido é o que faz sentido
// aqui (ao contrário do painel do professor, que precisava ficar mais
// visível): com muitas questões nas 3 listas, expandir tudo de uma vez
// deixaria a tela imensa.
export function QuestaoItem({ questao }: { questao: Questao }) {
  const [aberta, setAberta] = useState(false);
  const [mostrarRejeicao, setMostrarRejeicao] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [pending, startTransition] = useTransition();

  const trilha = Array.isArray(questao.trilhas) ? questao.trilhas[0] : questao.trilhas;

  return (
    <div className="rounded-card border border-border bg-surface">
      <button
        type="button"
        onClick={() => setAberta((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        aria-expanded={aberta}
      >
        <div>
          <p className="font-medium text-foreground">{questao.title}</p>
          <p className="text-xs text-muted">
            {trilha?.name ?? "—"} — espaço {questao.espaco_numero}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={STATUS_TONE[questao.status]}>{STATUS_LABEL[questao.status]}</Badge>
          <span className="text-muted" aria-hidden="true">
            {aberta ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {aberta && (
        <div className="border-t border-border p-5">
          <QuestaoPreview questao={questao} />

          {questao.status === "rejected" && questao.rejection_reason && (
            <p className="mt-3 text-sm text-danger">Motivo da rejeição: {questao.rejection_reason}</p>
          )}

          {questao.status === "pending" &&
            (!mostrarRejeicao ? (
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
            ))}
        </div>
      )}
    </div>
  );
}
