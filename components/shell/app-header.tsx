"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LumenGuia, type VisualSkin } from "@/components/ui/lumen-guia";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";
import { createClient } from "@/lib/supabase/client";

type Role = "jogador" | "professor" | "admin";

const roleLabel: Record<Role, string> = {
  jogador: "Jogador",
  professor: "Professor",
  admin: "Admin",
};

// Mesma hierarquia de troca decidida pro produto (migration_001,
// switch_active_role): admin -> qualquer um; professor -> professor/jogador;
// jogador -> travado.
const opcoesDeTroca: Record<Role, Role[]> = {
  admin: ["admin", "professor", "jogador"],
  professor: ["professor", "jogador"],
  jogador: [],
};

export interface AppHeaderProps {
  nome: string;
  baseRole: Role;
  activeRole: Role;
  pontos: number;
  visualSkin: VisualSkin;
  lumenGlow: LumenGlowTier;
  lumenExpressao: LumenExpressao;
}

export function AppHeader({
  nome,
  baseRole,
  activeRole,
  pontos,
  visualSkin,
  lumenGlow,
  lumenExpressao,
}: AppHeaderProps) {
  const router = useRouter();
  const [trocando, setTrocando] = useState(false);
  const opcoes = opcoesDeTroca[baseRole];

  async function trocarPapel(novoPapel: Role) {
    if (novoPapel === activeRole) return;
    setTrocando(true);
    const supabase = createClient();
    await supabase.rpc("switch_active_role", { p_new_role: novoPapel });
    setTrocando(false);
    router.push(novoPapel === "jogador" ? "/home" : `/${novoPapel}`);
    router.refresh();
  }

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/home"
            className="font-display text-lg font-semibold text-foreground"
          >
            Port<span className="text-primary">Libras</span>
          </Link>
          {activeRole === "professor" && (
            <Link href="/professor" className="text-sm font-medium text-muted hover:text-foreground">
              Painel do Professor
            </Link>
          )}
          {activeRole === "admin" && (
            <Link href="/admin" className="text-sm font-medium text-muted hover:text-foreground">
              Aprovações
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LumenGuia skin={visualSkin} glow={lumenGlow} expressao={lumenExpressao} size="sm" />
          {activeRole === "jogador" && (
            <span className="text-sm font-medium text-foreground">
              ⭐ {pontos} pts
            </span>
          )}
          {opcoes.length > 1 ? (
            <select
              value={activeRole}
              disabled={trocando}
              onChange={(e) => trocarPapel(e.target.value as Role)}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
              aria-label="Trocar perfil ativo"
            >
              {opcoes.map((papel) => (
                <option key={papel} value={papel}>
                  {roleLabel[papel]}
                </option>
              ))}
            </select>
          ) : (
            <Badge tone="primary">{roleLabel[activeRole]}</Badge>
          )}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary-hover">
            {nome.charAt(0).toUpperCase()}
          </span>
          <button
            type="button"
            onClick={sair}
            className="text-xs font-medium text-muted hover:text-foreground"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
