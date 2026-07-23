import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NovaQuestaoForm } from "./form";

export default async function NovaQuestaoPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
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

  const { data: trilhas } = await supabase
    .from("trilhas")
    .select("id, slug, name")
    .eq("is_geral", false)
    .order("name");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-foreground">Criar questão</h1>
      <p className="mt-1 text-sm text-muted">
        Sua questão passa por aprovação do admin antes de ficar visível pros jogadores.
      </p>
      {erro && <p className="mt-3 text-sm text-danger">{erro}</p>}
      <NovaQuestaoForm trilhas={trilhas ?? []} />
    </div>
  );
}
