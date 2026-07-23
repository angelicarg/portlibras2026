"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Alternativas ainda são só texto (kind: "text") pra qualquer um dos 7
// modelos — os editores específicos por tipo (imagens clicáveis, letras
// arrastáveis, etc.) ficam pra uma iteração futura. O objetivo agora é
// destravar o fluxo criar → aprovar → (futuramente) responder de ponta a
// ponta, não já cobrir as 7 variações de interface de alternativa.
function montarCamposDaQuestao(formData: FormData) {
  const alternativas = formData
    .getAll("alternativa")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const corretaIndex = Number(formData.get("correta"));

  if (alternativas.length < 2 || Number.isNaN(corretaIndex)) {
    return { erro: "Adicione pelo menos 2 alternativas e marque qual é a correta." };
  }

  return {
    campos: {
      trilha_id: String(formData.get("trilha_id")),
      espaco_numero: Number(formData.get("espaco_numero")),
      type: String(formData.get("tipo")),
      title: String(formData.get("titulo")),
      prompt_text: String(formData.get("enunciado")),
      prompt_video_url: String(formData.get("prompt_video_url")),
      image_url: String(formData.get("image_url")),
      options: alternativas.map((value, i) => ({ id: String(i), kind: "text", value })),
      answer: [corretaIndex],
      correct_feedback_video_url: String(formData.get("correct_feedback_video_url")),
      incorrect_feedback_video_url: String(formData.get("incorrect_feedback_video_url")),
      libras_level: String(formData.get("nivel_libras")),
      portugues_level: String(formData.get("nivel_portugues")),
    },
  };
}

export async function criarQuestao(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const intent = String(formData.get("intent") ?? "draft");
  const { campos, erro } = montarCamposDaQuestao(formData);
  if (erro) {
    redirect(`/professor/questoes/nova?erro=${encodeURIComponent(erro)}`);
  }

  const { error } = await supabase.from("questions").insert({
    ...campos,
    status: intent === "pending" ? "pending" : "draft",
    created_by: user.id,
  });

  if (error) {
    redirect(`/professor/questoes/nova?erro=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/professor");
  redirect("/professor");
}

// Editar só é permitido em rascunho/rejeitada (a RLS já trava isso no banco
// — "creator updates own draft/rejected questions" da migration_001; aqui é
// só a mesma regra refletida na UI). Reenviar pra aprovação limpa o motivo
// de rejeição anterior, senão ficaria mostrando um aviso velho depois que
// ela já corrigiu e reenviou.
export async function atualizarQuestao(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const intent = String(formData.get("intent") ?? "draft");
  const { campos, erro } = montarCamposDaQuestao(formData);
  if (erro) {
    redirect(`/professor/questoes/${id}?erro=${encodeURIComponent(erro)}`);
  }

  const novoStatus = intent === "pending" ? "pending" : "draft";
  const { error } = await supabase
    .from("questions")
    .update({
      ...campos,
      status: novoStatus,
      rejection_reason: novoStatus === "pending" ? null : undefined,
    })
    .eq("id", id)
    .eq("created_by", user.id);

  if (error) {
    redirect(`/professor/questoes/${id}?erro=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/professor");
  redirect("/professor");
}
