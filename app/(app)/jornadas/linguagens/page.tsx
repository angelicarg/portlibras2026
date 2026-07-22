import { CenaJornada } from "@/components/ui/cena-jornada";
import type { VisualSkin } from "@/components/ui/lumen-guia";

// TODO: mesmo mock de visual_skin usado em app/(app)/home/page.tsx — duplicado
// até existir um estado de usuário compartilhado de verdade (Supabase).
const mockVisualSkin: VisualSkin = "kids";

const LUMENS_AMBIENTE = [
  { path: "lumen-path-c", duration: "28s", delay: "2s" },
  { path: "lumen-path-a", duration: "24s", delay: "7s" },
];

export default function JornadaLinguagensPage() {
  return (
    <CenaJornada
      jornada="linguagens"
      nome="Linguagens"
      skin={mockVisualSkin}
      corVar="var(--trilha-linguagens)"
      textoBoasVindas="Cada símbolo e portal desta floresta esconde um quiz diferente — passe o mouse pra descobrir onde, e comece pelo que quiser, na ordem que preferir!"
      lumensAmbiente={LUMENS_AMBIENTE}
    />
  );
}
