import { AppHeader } from "@/components/shell/app-header";
import { getExpressao, getGlowTier } from "@/lib/lumen-guia";

// TODO: substituir por sessão real do Supabase quando a autenticação for conectada.
const mockUser = {
  nome: "Ana",
  activeRole: "jogador" as const,
  pontos: 128,
  visualSkin: "joy" as const,
  diasInativo: 0,
  ultimaResposta: "correta" as const,
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lumenGlow = getGlowTier(mockUser.pontos);
  const lumenExpressao = getExpressao({
    diasInativo: mockUser.diasInativo,
    ultimaResposta: mockUser.ultimaResposta,
  });

  return (
    <>
      <AppHeader
        nome={mockUser.nome}
        activeRole={mockUser.activeRole}
        pontos={mockUser.pontos}
        visualSkin={mockUser.visualSkin}
        lumenGlow={lumenGlow}
        lumenExpressao={lumenExpressao}
      />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
    </>
  );
}
