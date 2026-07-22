import { CenaJornada } from "@/components/ui/cena-jornada";
import type { VisualSkin } from "@/components/ui/lumen-guia";

// TODO: mesmo mock de visual_skin usado em app/(app)/home/page.tsx — duplicado
// até existir um estado de usuário compartilhado de verdade (Supabase).
const mockVisualSkin: VisualSkin = "kids";

const LUMENS_AMBIENTE = [
  { path: "lumen-path-a", duration: "26s", delay: "0s" },
  { path: "lumen-path-b", duration: "30s", delay: "5s" },
];

export default function JornadaSociedadePage() {
  return (
    <CenaJornada
      jornada="sociedade"
      nome="Vida em Sociedade"
      skin={mockVisualSkin}
      corVar="var(--trilha-sociedade)"
      textoBoasVindas="Cada espaço da vila esconde um quiz diferente — passe o mouse pra descobrir onde, e comece pelo que quiser, na ordem que preferir!"
      lumensAmbiente={LUMENS_AMBIENTE}
    />
  );
}
