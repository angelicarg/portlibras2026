// Caminhos dos arquivos de arte dos Lumens em public/lumens/{skin}/lumen-{jornada}-{skin}-{expressao}.png
// Ver lib/lumen-guia.ts pra lógica de brilho/expressão do Lumen Guia, e
// components/ui/trilha-node.tsx pra TrilhaId (mesmos slugs de Jornada usados aqui).

import type { VisualSkin } from "@/components/ui/lumen-guia";
import type { TrilhaId } from "@/components/ui/trilha-node";

export type LumenArteExpressao = "neutro" | "calmo" | "surpreso" | "feliz" | "triste";

export function lumenGuiaSrc(skin: VisualSkin, expressao: LumenArteExpressao) {
  return `/lumens/${skin}/lumen-guia-${skin}-${expressao}.png`;
}

export function lumenJornadaSrc(
  jornada: TrilhaId,
  skin: VisualSkin,
  expressao: LumenArteExpressao
) {
  return `/lumens/${skin}/lumen-${jornada}-${skin}-${expressao}.png`;
}
