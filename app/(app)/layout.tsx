import { redirect } from "next/navigation";
import { AppHeader } from "@/components/shell/app-header";
import { getExpressao, getGlowTier } from "@/lib/lumen-guia";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Dupla checagem como no site principal (aruana-digital-novo): o proxy.ts
  // já redireciona quem não tem sessão, mas isso cobre o caso de o proxy não
  // rodar por algum motivo (build estático, etc.) — nunca renderiza a área
  // logada sem usuário confirmado.
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, base_role, active_role, points, visual_skin")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const lumenGlow = getGlowTier(profile.points);
  // TODO: dias inativo / última resposta ainda não são calculados de verdade
  // (dependem do histórico de question_attempts) — expressão neutra por ora.
  const lumenExpressao = getExpressao({ diasInativo: 0, ultimaResposta: "correta" });

  return (
    <>
      <AppHeader
        nome={profile.display_name}
        baseRole={profile.base_role}
        activeRole={profile.active_role}
        pontos={profile.points}
        visualSkin={profile.visual_skin}
        lumenGlow={lumenGlow}
        lumenExpressao={lumenExpressao}
      />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
    </>
  );
}
