import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

const statusTone: Record<string, NonNullable<BadgeProps["tone"]>> = {
  draft: "neutral",
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const statusLabel: Record<string, string> = {
  draft: "Rascunho",
  pending: "Aguardando aprovação",
  approved: "Aprovada",
  rejected: "Rejeitada",
};

export default async function ProfessorPage() {
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

  // Rota gate por active_role — só UX (evita mostrar a tela errada), a
  // segurança de verdade é a RLS em cima de base_role (ver migration_001).
  if (profile?.active_role !== "professor" && profile?.active_role !== "admin") {
    redirect("/home");
  }

  const { data: questoes } = await supabase
    .from("questions")
    .select("id, title, status, rejection_reason, espaco_numero, trilhas(name)")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Painel do Professor</h1>
        <Link href="/professor/questoes/nova" className={buttonClasses()}>
          + Nova questão
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {(questoes ?? []).length === 0 && (
          <p className="text-sm text-muted">Você ainda não criou nenhuma questão.</p>
        )}
        {(questoes ?? []).map((q) => {
          const trilha = Array.isArray(q.trilhas) ? q.trilhas[0] : q.trilhas;
          return (
            <Link
              key={q.id}
              href={`/professor/questoes/${q.id}`}
              className="flex items-center justify-between gap-4 rounded-card border border-border bg-surface p-4 transition hover:border-primary/40"
            >
              <div>
                <p className="font-medium text-foreground">{q.title}</p>
                <p className="text-xs text-muted">
                  {trilha?.name ?? "—"} — espaço {q.espaco_numero}
                </p>
                {q.status === "rejected" && q.rejection_reason && (
                  <p className="mt-1 text-xs text-danger">Motivo: {q.rejection_reason}</p>
                )}
              </div>
              <Badge tone={statusTone[q.status]}>{statusLabel[q.status]}</Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
