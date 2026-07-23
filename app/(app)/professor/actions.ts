"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Alternativas ainda são só texto (kind: "text") pra qualquer um dos 7
// modelos — os editores específicos por tipo (imagens clicáveis, letras
// arrastáveis, etc.) ficam pra uma iteração futura. O objetivo agora é
// destravar o fluxo criar → aprovar → (futuramente) responder de ponta a
// ponta, não já cobrir as 7 variações de interface de alternativa.
export async function criarQuestao(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const intent = String(formData.get("intent") ?? "draft");
  const alternativas = formData
    .getAll("alternativa")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const corretaIndex = Number(formData.get("correta"));

  if (alternativas.length < 2 || Number.isNaN(corretaIndex)) {
    redirect(
      `/professor/questoes/nova?erro=${encodeURIComponent(
        "Adicione pelo menos 2 alternativas e marque qual é a correta."
      )}`
    );
  }

  const options = alternativas.map((value, i) => ({ id: String(i), kind: "text", value }));
  const answer = [corretaIndex];

  const { error } = await supabase.from("questions").insert({
    trilha_id: String(formData.get("trilha_id")),
    espaco_numero: Number(formData.get("espaco_numero")),
    type: String(formData.get("tipo")),
    title: String(formData.get("titulo")),
    prompt_text: String(formData.get("enunciado")),
    prompt_video_url: String(formData.get("prompt_video_url")),
    image_url: String(formData.get("image_url")),
    options,
    answer,
    correct_feedback_video_url: String(formData.get("correct_feedback_video_url")),
    incorrect_feedback_video_url: String(formData.get("incorrect_feedback_video_url")),
    libras_level: String(formData.get("nivel_libras")),
    portugues_level: String(formData.get("nivel_portugues")),
    status: intent === "pending" ? "pending" : "draft",
    created_by: user.id,
  });

  if (error) {
    redirect(`/professor/questoes/nova?erro=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/professor");
  redirect("/professor");
}
