"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { toEmbedUrl } from "@/lib/youtube";
import { createClient } from "@/lib/supabase/client";

interface Opcao {
  id: string;
  kind: string;
  value: string;
}

export interface QuestaoJogador {
  id: string;
  title: string;
  prompt_text: string;
  prompt_video_url: string;
  image_url: string;
  options: Opcao[];
  correct_feedback_video_url: string;
  incorrect_feedback_video_url: string;
}

// Alternativas ainda são só clicar-em-uma-de-N (mesma simplificação da tela
// do professor — os 7 modelos de exercício ainda não têm interações
// específicas próprias). O objetivo aqui é a esteira toda funcionar de
// ponta a ponta: aprovar → jogador responder → pontuar/registrar de
// verdade, não já cobrir as 7 variações de interface.
export function QuizInterativo({
  questao,
  jornada,
  espacoNome,
  corVar,
}: {
  questao: QuestaoJogador;
  jornada: string;
  espacoNome: string;
  corVar: string;
}) {
  const router = useRouter();
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [resultado, setResultado] = useState<"correta" | "incorreta" | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Se o servidor mandar uma questão diferente (ex: "tentar outra"), zera o
  // estado local em vez de continuar mostrando o resultado da anterior.
  useEffect(() => {
    setSelecionada(null);
    setResultado(null);
    setErro(null);
  }, [questao.id]);

  async function responder(index: number) {
    if (resultado || enviando) return;
    setSelecionada(index);
    setEnviando(true);
    setErro(null);

    const supabase = createClient();
    const { data, error } = await supabase.rpc("submit_answer", {
      p_question_id: questao.id,
      p_submitted_answer: [index],
    });

    setEnviando(false);
    if (error) {
      setErro("Não deu pra registrar sua resposta agora. Tenta de novo.");
      setSelecionada(null);
      return;
    }
    setResultado(data ? "correta" : "incorreta");
  }

  function tentarOutra() {
    router.refresh();
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-5 px-6 py-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">{questao.title}</h1>
        <p className="text-xs text-muted">{espacoNome}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="aspect-video overflow-hidden rounded-lg border border-border bg-surface">
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

      <p className="text-base text-foreground">{questao.prompt_text}</p>

      <div className="flex flex-col gap-2">
        {questao.options.map((opt, i) => {
          const escolhida = selecionada === i;
          const mostrarComoCorreta = resultado === "correta" && escolhida;
          const mostrarComoErrada = resultado === "incorreta" && escolhida;
          return (
            <button
              key={opt.id ?? i}
              type="button"
              disabled={!!resultado || enviando}
              onClick={() => responder(i)}
              className={cn(
                "rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed",
                mostrarComoCorreta && "border-success bg-success/10 text-success",
                mostrarComoErrada && "border-danger bg-danger/10 text-danger",
                !mostrarComoCorreta && !mostrarComoErrada && "border-border text-foreground hover:border-primary/40"
              )}
            >
              {opt.value}
            </button>
          );
        })}
      </div>

      {erro && <p className="text-sm text-danger">{erro}</p>}

      {resultado && (
        <div className="rounded-card border border-border bg-surface p-4">
          <p
            className={cn(
              "font-semibold",
              resultado === "correta" ? "text-success" : "text-danger"
            )}
          >
            {resultado === "correta" ? "Resposta certa!" : "Não foi dessa vez."}
          </p>
          <div className="mt-3 aspect-video overflow-hidden rounded-lg border border-border bg-background">
            <iframe
              src={toEmbedUrl(
                resultado === "correta"
                  ? questao.correct_feedback_video_url
                  : questao.incorrect_feedback_video_url
              )}
              className="h-full w-full"
              allow="encrypted-media"
              title="Vídeo de feedback em Libras"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <Button variant="outline" onClick={tentarOutra}>
              Tentar outra questão
            </Button>
            <Link
              href={`/jornadas/${jornada}`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
              style={{ backgroundColor: corVar }}
            >
              Voltar para a Jornada
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
