// Caminhos da arte de cenário de cada Jornada, em
// public/cenarios/{jornada}-{skin}.png — diferente da Árvore das Conexões
// (que é o hub central), cada Jornada tem seu próprio cenário onde os quizzes
// vivem. As 4 Jornadas (sociedade, linguagens, espaco, pensadores) já têm
// arte "kids" (recebida em 2026-07-22).
import type { TrilhaId } from "@/components/ui/trilha-node";
import type { VisualSkin } from "@/components/ui/lumen-guia";

export function cenarioSrc(jornada: TrilhaId, skin: VisualSkin) {
  return `/cenarios/${jornada}-${skin}.png`;
}
