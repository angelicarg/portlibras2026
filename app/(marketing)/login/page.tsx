"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Label, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    // Mock: sem backend conectado ainda — qualquer login válido leva para /home.
    setTimeout(() => router.push("/home"), 400);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Card>
        <CardTitle>Entrar</CardTitle>
        <CardDescription className="mt-1 mb-6">
          Acesse sua conta jogador, professor ou admin.
        </CardDescription>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1"
              placeholder="voce@exemplo.com"
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
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={pending} className="mt-2 w-full">
            {pending ? "Entrando…" : "Entrar"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-primary">
            Cadastre-se
          </Link>
        </p>
      </Card>
    </div>
  );
}
