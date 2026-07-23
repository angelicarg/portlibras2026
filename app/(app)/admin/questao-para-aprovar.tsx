"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { toEmbedUrl } from "@/lib/youtube";
import { NIVEIS_PROFICIENCIA, TIPOS_DE_QUESTAO } from "@/lib/question-types";
import { aprovarQuestao, rejeitarQuestao } from "./actions";

interface Opcao {
  id: string;
  kind: string;
  value: string;
}

interface Questao {
  id: string;
  title: string;
  prompt_text: string;
  prompt_video_url: string;
  image_url: string;
  options: Opcao[];
  answer: number[];
  correct_feedback_video_url: string;
  incorrect_feedback_video_url: string;
  libras_level: string;
  portugues_level: string;
  type: string;
  espaco_numero: number;
  trilhas: { name: string } | { name: string }[] | null;
}

const tipoLabel = Object.fromEntries(TIPOS_DE_QUESTAO.map((t) => [t.value, t.label]));
const nivelLabel = Object.fromEntries(NIVEIS_PROFICIENCIA.map((n) => [n.value, n.label]));

export function QuestaoParaAprovar({ questao }: { questao: Questao }) {
  const [mostrarRejeicao, setMostrarRejeicao] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [pending, startTransition] = useTransition();

  const trilha = Array.isArray(questao.trilhas) ? questao.trilhas[0] : questao.trilhas;

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground">{questao.title}</h2>
        <p className="text-xs text-muted">
          {trilha?.name ?? "—"} — espaço {questao.espaco_numero} — {tipoLabel[questao.type] ?? questao.type}
        </p>
        <p className="mt-1 text-xs text-muted">
          Libras: {nivelLabel[questao.libras_level]} · Português: {nivelLabel[questao.portugues_level]}
        </p>
      </div>

      <p className="mt-3 text-sm text-foreground">{questao.prompt_text}</p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="aspect-video overflow-hidden rounded-lg border border-border bg-background">
          <iframe
            src={toEmbedUrl(questao.prompt_video_url)}
            className="h-full w-full"
            allow="encrypted-media"
            title={`Vídeo em Libras — ${questao.title}`}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={questao.image_url}
          alt=""
          className="h-full max-h-48 w-full rounded-lg border border-border object-cover"
        />
      </div>

      <ul className="mt-3 flex flex-col gap-1">
        {(questao.options ?? []).map((opt, i) => (
          <li
            key={opt.id ?? i}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm",
              questao.answer?.includes(i)
                ? "border-success bg-success/10 text-success"
                : "border-border text-foreground"
            )}
          >
            {opt.value}
          </li>
        ))}
      </ul>

      <div className="mt-4 grid grid-cols-1 gap-3 text-xs text-muted sm:grid-cols-2">
        <div>
          <p className="font-medium text-foreground">Feedback correto</p>
          <a href={questao.correct_feedback_video_url} target="_blank" rel="noreferrer" className="text-primary underline">
            ver vídeo
          </a>
        </div>
        <div>
          <p className="font-medium text-foreground">Feedback incorreto</p>
          <a href={questao.incorrect_feedback_video_url} target="_blank" rel="noreferrer" className="text-primary underline">
            ver vídeo
          </a>
        </div>
      </div>

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
