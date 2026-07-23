import { CenaJornada } from "@/components/ui/cena-jornada";
import type { VisualSkin } from "@/components/ui/lumen-guia";

// TODO: mesmo mock de visual_skin usado em app/(app)/home/page.tsx — duplicado
// até existir um estado de usuário compartilhado de verdade (Supabase).
const mockVisualSkin: VisualSkin = "kids";

const LUMENS_AMBIENTE = [
  { path: "lumen-path-a", duration: "25s", delay: "3s" },
  { path: "lumen-path-b", duration: "29s", delay: "8s" },
];

export default function JornadaPensadoresPage() {
  return (
    <CenaJornada
      jornada="pensadores"
      nome="Grandes Pensadores"
      skin={mockVisualSkin}
      corVar="var(--trilha-pensadores)"
      textoBoasVindas="Cada canto desta floresta guarda a ideia de um grande pensador — passe o mouse pra descobrir onde, e comece pelo que quiser, na ordem que preferir!"
      lumensAmbiente={LUMENS_AMBIENTE}
    />
  );
}
