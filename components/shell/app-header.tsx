import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const roleLabel: Record<string, string> = {
  jogador: "Jogador",
  professor: "Professor",
  admin: "Admin",
};

export interface AppHeaderProps {
  nome: string;
  activeRole: "jogador" | "professor" | "admin";
  pontos: number;
}

export function AppHeader({ nome, activeRole, pontos }: AppHeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/home"
          className="font-display text-lg font-semibold text-foreground"
        >
          Port<span className="text-primary">Libras</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            ⭐ {pontos} pts
          </span>
          <Badge tone="primary">{roleLabel[activeRole]}</Badge>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary-hover">
            {nome.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
