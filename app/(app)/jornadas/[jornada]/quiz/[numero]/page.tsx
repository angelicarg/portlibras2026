import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { TrilhaId } from "@/components/ui/trilha-node";
import { insigniaSrc } from "@/lib/insignias";
import { espacosDaJornada } from "@/lib/espacos-quiz";
import { createClient } from "@/lib/supabase/server";
import { QuizInterativo } from "./quiz-interativo";

const jornadaCorVar: Record<TrilhaId, string> = {
  espaco: "var(--trilha-espaco)",
  pensadores: "var(--trilha-pensadores)",
  linguagens: "var(--trilha-linguagens)",
  sociedade: "var(--trilha-sociedade)",
};

function isTrilhaId(id: string): id is TrilhaId {
  return id in jornadaCorVar;
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ jornada: string; numero: string }>;
}) {
  const { jornada, numero } = await params;
  if (!isTrilhaId(jornada)) notFound();

  const espaco = espacosDaJornada(jornada).find((e) => e.numero === Number(numero));
  if (!espaco) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: trilha } = await supabase.from("trilhas").select("id").eq("slug", jornada).single();

  const { data: questoes } = trilha
    ? await supabase
        .from("questions_public")
        .select(
          "id, title, prompt_text, prompt_video_url, image_url, options, correct_feedback_video_url, incorrect_feedback_video_url"
        )
        .eq("trilha_id", trilha.id)
        .eq("espaco_numero", espaco.numero)
    : { data: [] };

  // Sem questão aprovada ainda pra esse espaço — mantém o placeholder
  // original em vez de quebrar a página (mesmo espírito de degradação
  // graciosa do resto do site: falta de conteúdo não deve virar erro).
  if (!questoes || questoes.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <Image
          src={insigniaSrc(jornada, espaco.numero)}
          alt={`Insígnia deste quiz — ${espaco.nome}`}
          width={140}
          height={140}
          className="h-auto w-full max-w-[140px] object-contain"
        />
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">{espaco.nome}</h1>
          <p className="mt-2 text-sm text-muted">
            Quiz sobre {espaco.tema.toLowerCase()} — ainda sem nenhuma questão aprovada. Ao
            completar, esta é a insígnia que você ganha.
          </p>
        </div>
        <Link
          href={`/jornadas/${jornada}`}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          style={{ backgroundColor: jornadaCorVar[jornada] }}
        >
          Voltar para a Jornada
        </Link>
      </div>
    );
  }

  // Uma pergunta por vez, escolhida ao acaso entre as aprovadas desse espaço
  // — sem lógica de dificuldade/repetição espaçada ainda (ver review_queue,
  // fica pra depois). "Tentar outra" recarrega e pode sortear outra.
  const questaoEscolhida = questoes[Math.floor(Math.random() * questoes.length)];

  return (
    <QuizInterativo
      questao={questaoEscolhida}
      jornada={jornada}
      espacoNome={espaco.nome}
      corVar={jornadaCorVar[jornada]}
    />
  );
}
