// Lógica do "companheiro" Lumen Guia — compartilhada pelos 3 estilos visuais
// (kids/joy/adult). Nenhuma regra aqui deve variar por estilo: só a renderização
// em components/ui/lumen-guia.tsx varia por `visual_skin`.

export type LumenGlowTier = "suave" | "constante" | "vibrante" | "radiante";

export type LumenExpressao = "preocupado" | "tranquilo" | "curioso" | "alegre";

// O brilho reflete progresso acumulado (pontos) — nunca regride sozinho,
// mesmo quando o jogador erra (regra já decidida: errar nunca desconta).
export function getGlowTier(pontos: number): LumenGlowTier {
  if (pontos >= 350) return "radiante";
  if (pontos >= 150) return "vibrante";
  if (pontos >= 50) return "constante";
  return "suave";
}

export interface ExpressaoInput {
  // Dias desde a última sessão jogada — só essa dimensão pode "esfriar" a
  // expressão. Existe pra incentivar engajamento, não pra punir erro.
  diasInativo: number;
  // Resultado da resposta mais recente na sessão atual, se houver.
  ultimaResposta?: "correta" | "incorreta" | null;
}

export function getExpressao({ diasInativo, ultimaResposta }: ExpressaoInput): LumenExpressao {
  if (diasInativo >= 3) return "preocupado";
  if (ultimaResposta === "correta") return "alegre";
  if (diasInativo === 0) return "curioso";
  return "tranquilo";
}
