import { AppHeader } from "@/components/shell/app-header";

// TODO: substituir por sessão real do Supabase quando a autenticação for conectada.
const mockUser = {
  nome: "Ana",
  activeRole: "jogador" as const,
  pontos: 128,
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader {...mockUser} />
      <main className="flex flex-1 flex-col bg-background">{children}</main>
    </>
  );
}
