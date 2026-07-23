import { CenaJornada } from "@/components/ui/cena-jornada";
import type { VisualSkin } from "@/components/ui/lumen-guia";

// TODO: mesmo mock de visual_skin usado em app/(app)/home/page.tsx — duplicado
// até existir um estado de usuário compartilhado de verdade (Supabase).
const mockVisualSkin: VisualSkin = "kids";

const LUMENS_AMBIENTE = [
  { path: "lumen-path-b", duration: "27s", delay: "1s" },
  { path: "lumen-path-c", duration: "23s", delay: "6s" },
];

export default function JornadaEspacoPage() {
  return (
    <CenaJornada
      jornada="espaco"
      nome="Exploração Espacial"
      skin={mockVisualSkin}
      corVar="var(--trilha-espaco)"
      textoBoasVindas="Cada canto desta praça sob as estrelas esconde um quiz diferente — passe o mouse pra descobrir onde, e comece pelo que quiser, na ordem que preferir!"
      lumensAmbiente={LUMENS_AMBIENTE}
    />
  );
}
