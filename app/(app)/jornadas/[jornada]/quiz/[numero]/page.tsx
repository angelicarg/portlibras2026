import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { TrilhaId } from "@/components/ui/trilha-node";
import { insigniaSrc } from "@/lib/insignias";
import { espacosDaJornada } from "@/lib/espacos-quiz";

const jornadaCorVar: Record<TrilhaId, string> = {
  espaco: "var(--trilha-espaco)",
  pensadores: "var(--trilha-pensadores)",
  linguagens: "var(--trilha-linguagens)",
  sociedade: "var(--trilha-sociedade)",
};

function isTrilhaId(id: string): id is TrilhaId {
  return id in jornadaCorVar;
}

// Placeholder genérico — o quiz de verdade (perguntas no formato Português+
// Libras+imagem) ainda não existe pra nenhuma Jornada. Isso só existe pra
// qualquer um dos espaços escolhidos em lib/espacos-quiz.ts "abrir" em algum
// lugar coerente, mostrando qual insígnia aquele espaço dá ao completar.
// Ver conversa 2026-07-22.
export default async function QuizPage({
  params,
}: {
  params: Promise<{ jornada: string; numero: string }>;
}) {
  const { jornada, numero } = await params;
  if (!isTrilhaId(jornada)) notFound();

  const espaco = espacosDaJornada(jornada).find((e) => e.numero === Number(numero));
  if (!espaco) notFound();

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
          Quiz sobre {espaco.tema.toLowerCase()} — ainda em construção. Ao completar, esta é a
          insígnia que você ganha.
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
