// Caminhos da arte das insígnias de conquista por Jornada, em
// public/insignias/insignia-{jornada}-{variante}.png.
// Cada Jornada tem sua própria quantidade de variantes — uma por espaço/quiz
// dentro do cenário dela (ver lib/espacos-quiz.ts). Não é mais um número fixo:
// Vida em Sociedade tem potencial de crescer além de 4 (transporte, afazeres
// domésticos, atividades em família — ver conversa 2026-07-22), então o jogo
// já lê a quantidade daqui em vez de assumir 4 em todo lugar.
import type { TrilhaId } from "@/components/ui/trilha-node";

export const INSIGNIA_COUNT: Record<TrilhaId, number> = {
  espaco: 4,
  pensadores: 4,
  linguagens: 4,
  sociedade: 4, // primeira leva — previsto crescer conforme mais espaços/quizzes entrarem
};

export function insigniaSrc(jornada: TrilhaId, variante: number = 1) {
  return `/insignias/insignia-${jornada}-${variante}.png`;
}

export function insigniaVariantes(jornada: TrilhaId): number[] {
  return Array.from({ length: INSIGNIA_COUNT[jornada] }, (_, i) => i + 1);
}
