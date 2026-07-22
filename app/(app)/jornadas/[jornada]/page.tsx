import Link from "next/link";
import { notFound } from "next/navigation";
import { LumenJornada } from "@/components/ui/lumen-jornada";
import type { TrilhaId } from "@/components/ui/trilha-node";
import type { VisualSkin } from "@/components/ui/lumen-guia";

// TODO: substituir pelo visual_skin real do perfil quando o Supabase estiver plugado
// (mesmo mock usado em app/(app)/layout.tsx e app/(app)/home/page.tsx).
const mockVisualSkin: VisualSkin = "kids";

const jornadaMeta: Record<TrilhaId, { nome: string; corVar: string }> = {
  espaco: { nome: "Exploração Espacial", corVar: "var(--trilha-espaco)" },
  pensadores: { nome: "Grandes Pensadores", corVar: "var(--trilha-pensadores)" },
  linguagens: { nome: "Linguagens", corVar: "var(--trilha-linguagens)" },
  sociedade: { nome: "Vida em Sociedade", corVar: "var(--trilha-sociedade)" },
};

function isTrilhaId(id: string): id is TrilhaId {
  return id in jornadaMeta;
}

// Placeholder — o conteúdo pedagógico de cada Jornada (atividades, trio
// Português+Libras+imagem) ainda não foi construído. Isso só existe pra o
// portal "abrir" em algum lugar coerente em vez de 404, ver conversa de
// 2026-07-21 sobre a praça do Centro de Conexões.
export default async function JornadaPage({ params }: { params: Promise<{ jornada: string }> }) {
  const { jornada: id } = await params;
  if (!isTrilhaId(id)) notFound();

  const meta = jornadaMeta[id];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <LumenJornada jornada={id} skin={mockVisualSkin} expressao="feliz" size="lg" />
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">{meta.nome}</h1>
        <p className="mt-2 text-sm text-muted">
          Este portal ainda está sendo construído — a trilha completa de {meta.nome.toLowerCase()} chega em breve.
        </p>
      </div>
      <Link
        href="/home"
        className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
        style={{ backgroundColor: meta.corVar }}
      >
        Voltar ao Centro de Conexões
      </Link>
    </div>
  );
}
