// Caminho da arte da Árvore das Conexões em public/arvore/arvore-{skin}.png
// Uma imagem só por skin (paisagem completa, sem variação por expressão/emoção
// — diferente dos Lumens). Ver components/ui/arvore-conexoes.tsx.

import type { VisualSkin } from "@/components/ui/lumen-guia";

export function arvoreSrc(skin: VisualSkin) {
  return `/arvore/arvore-${skin}.png`;
}
