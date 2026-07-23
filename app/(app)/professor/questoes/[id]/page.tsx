import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { QuestaoForm, type QuestaoFormValores } from "@/components/questao-form";
import { QuestaoPreview, type QuestaoPreviewData } from "@/components/questao-preview";
import { createClient } from "@/lib/supabase/server";
import { STATUS_LABEL, STATUS_TONE } from "@/lib/question-status";
import { atualizarQuestao } from "../../actions";

export default async function QuestaoDetalhePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erro?: string }>;
}) {
  const { id } = await params;
  const { erro } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("active_role")
    .eq("id", user.id)
    .single();

  if (profile?.active_role !== "professor" && profile?.active_role !== "admin") {
    redirect("/home");
  }

  // RLS ("creator reads own questions" / "admin reads all questions") já
  // garante que só o dono ou um admin conseguem ver — pra qualquer outro
  // caso o select simplesmente não retorna nada, então tratamos como 404.
  const { data: questao } = await supabase
    .from("questions")
    .select(
      "id, title, prompt_text, prompt_video_url, image_url, options, answer, correct_feedback_video_url, incorrect_feedback_video_url, libras_level, portugues_level, type, espaco_numero, status, rejection_reason, trilha_id, trilhas(name)"
    )
    .eq("id", id)
    .single();

  if (!questao) notFound();

  const editavel = questao.status === "draft" || questao.status === "rejected";

  if (!editavel) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-foreground">{questao.title}</h1>
          <Badge tone={STATUS_TONE[questao.status]}>{STATUS_LABEL[questao.status]}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted">
          {questao.status === "pending"
            ? "Em análise pelo admin — não dá pra editar enquanto isso."
            : "Já aprovada e visível pros jogadores — não dá mais pra editar."}
        </p>
        <div className="mt-6 rounded-card border border-border bg-surface p-5">
          <QuestaoPreview questao={questao as QuestaoPreviewData} />
        </div>
        <Link href="/professor" className="mt-6 text-sm font-medium text-primary">
          ← Voltar pro painel
        </Link>
      </div>
    );
  }

  const { data: trilhas } = await supabase
    .from("trilhas")
    .select("id, slug, name")
    .eq("is_geral", false)
    .order("name");

  const opcoes = (questao.options ?? []) as { value: string }[];
  const valoresIniciais: QuestaoFormValores = {
    trilha_id: questao.trilha_id,
    espaco_numero: questao.espaco_numero,
    tipo: questao.type,
    nivel_libras: questao.libras_level,
    nivel_portugues: questao.portugues_level,
    titulo: questao.title,
    enunciado: questao.prompt_text,
    prompt_video_url: questao.prompt_video_url,
    image_url: questao.image_url,
    alternativas: opcoes.map((o) => o.value),
    correta: (questao.answer as number[])?.[0] ?? 0,
    correct_feedback_video_url: questao.correct_feedback_video_url,
    incorrect_feedback_video_url: questao.incorrect_feedback_video_url,
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Editar questão</h1>
        <Badge tone={STATUS_TONE[questao.status]}>{STATUS_LABEL[questao.status]}</Badge>
      </div>
      {questao.status === "rejected" && questao.rejection_reason && (
        <p className="mt-3 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          Rejeitada pelo admin: {questao.rejection_reason}
        </p>
      )}
      {erro && <p className="mt-3 text-sm text-danger">{erro}</p>}
      <QuestaoForm trilhas={trilhas ?? []} valores={valoresIniciais} action={atualizarQuestao.bind(null, id)} />
    </div>
  );
}
