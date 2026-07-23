// Espaços clicáveis dentro do cenário de cada Jornada — cada um é a entrada
// de um quiz, e cada quiz dá uma das insígnias daquela Jornada (mesmo índice
// "numero" = mesma "variante" em lib/insignias.ts). Fonte única usada tanto
// pela página do cenário (app/(app)/jornadas/{jornada}/page.tsx) quanto pela
// página genérica de quiz (app/(app)/jornadas/[jornada]/quiz/[numero]/page.tsx).
//
// Vida em Sociedade tem previsão de crescer além de 4 espaços (transporte,
// afazeres domésticos, atividades em família — conversa 2026-07-22): é só
// adicionar entradas aqui e em INSIGNIA_COUNT (lib/insignias.ts), sem mexer
// em código de página.
import type { TrilhaId } from "@/components/ui/trilha-node";

export interface EspacoQuiz {
  numero: number;
  nome: string;
  tema: string;
  top: number;
  left: number;
}

export const ESPACOS_QUIZ: Partial<Record<TrilhaId, EspacoQuiz[]>> = {
  sociedade: [
    { numero: 1, nome: "Lumen Market", tema: "Comércio e trocas", top: 15, left: 11 },
    { numero: 2, nome: "Cine Lumen Kids", tema: "Cultura e entretenimento", top: 33, left: 53 },
    { numero: 3, nome: "Teatro da Praça", tema: "Artes cênicas", top: 28, left: 71 },
    { numero: 4, nome: "Podiums de Debate", tema: "Educação cívica", top: 46, left: 87 },
  ],
  linguagens: [
    { numero: 1, nome: "Pedra da Natureza das Linguagens", tema: "Origem da escrita e dos símbolos", top: 61, left: 32 },
    { numero: 2, nome: "Portal Azul", tema: "Sons e fonética", top: 29, left: 45 },
    { numero: 3, nome: "Árvore das Mãos", tema: "Libras e comunicação gestual", top: 34, left: 72 },
    { numero: 4, nome: "Portal Violeta", tema: "Gramática e estrutura", top: 81, left: 85 },
  ],
  espaco: [
    { numero: 1, nome: "Lousa das Estrelas", tema: "Composição química das estrelas", top: 63, left: 65 },
    { numero: 2, nome: "Telescópio", tema: "Observação astronômica", top: 88, left: 27 },
    { numero: 3, nome: "Poço do Sistema Solar", tema: "Planetas e sistema solar", top: 85, left: 73 },
    { numero: 4, nome: "Bússola Estelar", tema: "Constelações e orientação", top: 90, left: 48 },
  ],
  pensadores: [
    { numero: 1, nome: "Livro de Da Vinci", tema: "Geometria, anatomia e proporção", top: 32, left: 78 },
    { numero: 2, nome: "Ponte Musical", tema: "Música", top: 76, left: 16 },
    { numero: 3, nome: "Tanque das Formas", tema: "Formas geométricas", top: 36, left: 20 },
    { numero: 4, nome: "Portal do Tempo", tema: "Linha do tempo e história", top: 20, left: 88 },
  ],
};

export function espacosDaJornada(jornada: TrilhaId): EspacoQuiz[] {
  return ESPACOS_QUIZ[jornada] ?? [];
}
