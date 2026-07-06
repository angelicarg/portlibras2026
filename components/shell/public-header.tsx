import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold text-foreground"
        >
          Port<span className="text-primary">Libras</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-foreground hover:text-primary"
          >
            Entrar
          </Link>
          <Link href="/cadastro" className={buttonClasses({ size: "sm" })}>
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
