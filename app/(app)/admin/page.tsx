import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuestaoItem } from "./questao-item";
import type { QuestaoPreviewData } from "@/components/questao-preview";

interface QuestaoAdmin extends QuestaoPreviewData {
  id: string;
  status: string;
  rejection_reason: string | null;
}

const CAMPOS =
  "id, title, prompt_text, prompt_video_url, image_url, options, answer, correct_feedback_video_url, incorrect_feedback_video_url, libras_level, portugues_level, type, espaco_numero, status, rejection_reason, trilhas(name)";

export default async function AdminPage() {
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

  if (profile?.active_role !== "admin") redirect("/home");

  // Uma consulta só, agrupada em memória por status — mais simples do que
  // 3 idas ao banco pra 3 listas pequenas.
  const { data: questoes } = await supabase
    .from("questions")
    .select(CAMPOS)
    .in("status", ["pending", "approved", "rejected"])
    .order("created_at", { ascending: true });

  const todas = (questoes ?? []) as QuestaoAdmin[];
  const pendentes = todas.filter((q) => q.status === "pending");
  const aprovadas = todas.filter((q) => q.status === "approved");
  const rejeitadas = todas.filter((q) => q.status === "rejected");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-foreground">Fila de aprovação</h1>

      <Secao titulo="Pendentes de análise" questoes={pendentes} vazio="Nada pendente no momento." />
      <Secao titulo="Aprovadas" questoes={aprovadas} vazio="Nenhuma questão aprovada ainda." />
      <Secao titulo="Rejeitadas" questoes={rejeitadas} vazio="Nenhuma questão rejeitada." />
    </div>
  );
}

function Secao({
  titulo,
  questoes,
  vazio,
}: {
  titulo: string;
  questoes: QuestaoAdmin[];
  vazio: string;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-foreground">
        {titulo} ({questoes.length})
      </h2>
      <div className="mt-3 flex flex-col gap-3">
        {questoes.length === 0 && <p className="text-sm text-muted">{vazio}</p>}
        {questoes.map((q) => (
          <QuestaoItem key={q.id} questao={q} />
        ))}
      </div>
    </section>
  );
}
