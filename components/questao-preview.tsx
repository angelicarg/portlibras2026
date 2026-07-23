import { cn } from "@/lib/cn";
import { toEmbedUrl } from "@/lib/youtube";
import { NIVEIS_PROFICIENCIA, TIPOS_DE_QUESTAO } from "@/lib/question-types";

export interface Opcao {
  id: string;
  kind: string;
  value: string;
}

export interface QuestaoPreviewData {
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

// Renderização somente-leitura de uma questão montada — usada tanto na fila
// de aprovação do admin (com os botões de aprovar/rejeitar ao redor) quanto
// na visão do professor pra questões que já saíram de rascunho (pendente ou
// aprovada, quando não dá mais pra editar).
export function QuestaoPreview({ questao }: { questao: QuestaoPreviewData }) {
  const trilha = Array.isArray(questao.trilhas) ? questao.trilhas[0] : questao.trilhas;

  return (
    <div>
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
    </div>
  );
}
