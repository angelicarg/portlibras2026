// Converte um link comum do YouTube (watch?v=, youtu.be/) pra URL de embed —
// usado só na tela do admin, pra tocar o vídeo inline durante a aprovação.
export function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
    return url;
  } catch {
    return url;
  }
}
