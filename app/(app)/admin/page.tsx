import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuestaoParaAprovar } from "./questao-para-aprovar";

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

  const { data: pendentes } = await supabase
    .from("questions")
    .select(
      "id, title, prompt_text, prompt_video_url, image_url, options, answer, correct_feedback_video_url, incorrect_feedback_video_url, libras_level, portugues_level, type, espaco_numero, trilhas(name)"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-foreground">Fila de aprovação</h1>
      <p className="mt-1 text-sm text-muted">
        {(pendentes ?? []).length} questão(ões) esperando revisão.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        {(pendentes ?? []).length === 0 && (
          <p className="text-sm text-muted">Nada pendente no momento.</p>
        )}
        {(pendentes ?? []).map((q) => (
          <QuestaoParaAprovar key={q.id} questao={q} />
        ))}
      </div>
    </div>
  );
}
