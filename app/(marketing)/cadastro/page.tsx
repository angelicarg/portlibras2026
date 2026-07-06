"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Label, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Papel = "jogador" | "professor";

const niveis = [
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
];

export default function CadastroPage() {
  const router = useRouter();
  const [papel, setPapel] = useState<Papel>("jogador");
  const [pending, setPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // Mock: sem backend conectado ainda — cadastro sempre "funciona" e leva pra /home.
    // Professor não tem gate de verificação no lançamento (self-service).
    setTimeout(() => router.push("/home"), 400);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Card>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription className="mt-1 mb-6">
          Escolha como você vai usar o PortLibras.
        </CardDescription>

        <div className="mb-6 grid grid-cols-2 gap-2">
          {(["jogador", "professor"] as const).map((opcao) => (
            <button
              key={opcao}
              type="button"
              onClick={() => setPapel(opcao)}
              className={cn(
                "rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                papel === opcao
                  ? "border-primary bg-primary/10 text-primary-hover"
                  : "border-border text-muted hover:border-primary/40"
              )}
            >
              {opcao === "jogador" ? "Sou jogador" : "Sou professor"}
            </button>
          ))}
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1"
            />
          </div>

          {papel === "jogador" && (
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-background p-3">
              <div>
                <Label htmlFor="nivel_libras">Nível em Libras</Label>
                <Select id="nivel_libras" name="nivel_libras" className="mt-1">
                  {niveis.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="nivel_portugues">Nível em Português</Label>
                <Select
                  id="nivel_portugues"
                  name="nivel_portugues"
                  className="mt-1"
                >
                  {niveis.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          {papel === "professor" && (
            <p className="text-xs text-muted">
              Sem verificação de credenciais no momento — suas atividades
              passam por aprovação do admin antes de ficarem visíveis.
            </p>
          )}

          <Button type="submit" disabled={pending} className="mt-2 w-full">
            {pending ? "Criando conta…" : "Criar conta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-primary">
            Entrar
          </Link>
        </p>
      </Card>
    </div>
  );
}
