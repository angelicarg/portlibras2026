import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const destaques = [
  {
    titulo: "Português + Libras + imagem, sempre juntos",
    descricao:
      "Nenhuma atividade aparece sem o trio completo — é a base pedagógica de todo o PortLibras.",
  },
  {
    titulo: "Trilhas temáticas",
    descricao:
      "Espaço, Matemática e Artes, Linguagens, Cotidiano e Geral — escolha livre, sem ordem obrigatória.",
  },
  {
    titulo: "Professores criam, admin aprova",
    descricao:
      "Cada atividade segue um modelo pedagógico fixo e passa por revisão antes de entrar no jogo.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16">
      <section className="flex flex-col items-start gap-6">
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Ensinar Português para surdos, com Libras ao lado, não depois.
        </h1>
        <p className="max-w-xl text-lg text-muted">
          PortLibras é uma plataforma de atividades gamificadas para o ensino
          de Português como segunda língua a estudantes surdos, nascida de
          pesquisa acadêmica em Linguística.
        </p>
        <div className="flex gap-3">
          <Link href="/cadastro" className={buttonClasses({ size: "lg" })}>
            Criar conta
          </Link>
          <Link
            href="/login"
            className={buttonClasses({ variant: "outline", size: "lg" })}
          >
            Entrar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {destaques.map((item) => (
          <Card key={item.titulo}>
            <CardTitle>{item.titulo}</CardTitle>
            <CardDescription className="mt-2">
              {item.descricao}
            </CardDescription>
          </Card>
        ))}
      </section>
    </div>
  );
}
