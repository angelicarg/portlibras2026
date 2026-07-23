// Os 7 modelos de exercício decididos na tese/worldbuilding (ver memória do
// projeto) — mesmos valores do enum question_type_enum no banco.
export const TIPOS_DE_QUESTAO = [
  { value: "monte_a_palavra", label: "Monte a palavra" },
  { value: "clique_na_imagem", label: "Clique na imagem" },
  { value: "complete_a_palavra", label: "Complete a palavra" },
  { value: "escolha_a_frase", label: "Escolha a frase" },
  { value: "escreva_a_palavra", label: "Escreva a palavra" },
  { value: "complete_a_frase", label: "Complete a frase" },
  { value: "clique_no_video", label: "Clique no vídeo" },
] as const;

export const NIVEIS_PROFICIENCIA = [
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
] as const;
