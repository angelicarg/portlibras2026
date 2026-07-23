import Image from "next/image";
import Link from "next/link";
import { LumenJornada } from "@/components/ui/lumen-jornada";
import { CenaBoasVindas } from "@/components/ui/cena-boas-vindas";
import { CenaExpansivel } from "@/components/ui/cena-expansivel";
import type { VisualSkin } from "@/components/ui/lumen-guia";
import type { LumenExpressao, LumenGlowTier } from "@/lib/lumen-guia";
import type { TrilhaId } from "@/components/ui/trilha-node";
import { cenarioSrc } from "@/lib/cenarios";
import { espacosDaJornada } from "@/lib/espacos-quiz";

export interface CenaJornadaProps {
  jornada: TrilhaId;
  nome: string;
  skin: VisualSkin;
  corVar: string;
  textoBoasVindas: string;
  lumensAmbiente: Array<{ path: string; duration: string; delay: string }>;
}

// Cena compartilhada por qualquer Jornada que já tenha cenário próprio
// (sociedade, linguagens, ...) — fundo, lúmens perambulando, espaços
// clicáveis (de lib/espacos-quiz.ts) e o Lumen Guia de boas-vindas. Cada
// página de Jornada só passa o que muda: nome, cor, texto e lúmens.
export function CenaJornada({ jornada, nome, skin, corVar, textoBoasVindas, lumensAmbiente }: CenaJornadaProps) {
  const espacos = espacosDaJornada(jornada);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">{nome}</h1>
          <p className="text-sm text-muted">
            Passe o mouse pelo cenário para descobrir onde entrar em cada quiz.
          </p>
        </div>
        <Link
          href="/home"
          className="rounded-full bg-background px-4 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-border/60"
        >
          ← Centro de Conexões
        </Link>
      </div>

      <CenaExpansivel>
        <Image
          src={cenarioSrc(jornada, skin)}
          alt={`Cenário da Jornada ${nome}`}
          fill
          priority
          className="object-cover"
        />

        {/* Lumens ambiente — decorativos, não bloqueiam clique */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {lumensAmbiente.map((lumen, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 opacity-85 drop-shadow-sm"
              style={{
                animation: `${lumen.path} ${lumen.duration} ease-in-out infinite`,
                animationDelay: lumen.delay,
              }}
            >
              <LumenJornada jornada={jornada} skin={skin} expressao="feliz" size="md" />
            </span>
          ))}
        </div>

        {espacos.map((espaco) => (
          <Link
            key={espaco.numero}
            href={`/jornadas/${jornada}/quiz/${espaco.numero}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${espaco.top}%`, left: `${espaco.left}%` }}
          >
            <span
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0"
              style={{ backgroundColor: corVar, animation: "portal-pulse 2.4s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <div className="flex scale-90 flex-col items-center gap-0.5 rounded-2xl bg-background/85 px-3 py-2 text-center opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100">
              <span className="text-xs font-semibold text-foreground">{espaco.nome}</span>
              <span className="text-[11px] text-muted">{espaco.tema}</span>
            </div>
          </Link>
        ))}

        <CenaBoasVindas
          skin={skin}
          glow={"constante" as LumenGlowTier}
          expressao={"alegre" as LumenExpressao}
          texto={textoBoasVindas}
        />
      </CenaExpansivel>
    </div>
  );
}
