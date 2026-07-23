"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { espacosDaJornada } from "@/lib/espacos-quiz";
import { TIPOS_DE_QUESTAO, NIVEIS_PROFICIENCIA } from "@/lib/question-types";
import type { TrilhaId } from "@/components/ui/trilha-node";
import { criarQuestao } from "../../actions";

interface Trilha {
  id: string;
  slug: string;
  name: string;
}

export function NovaQuestaoForm({ trilhas }: { trilhas: Trilha[] }) {
  const [trilhaId, setTrilhaId] = useState(trilhas[0]?.id ?? "");
  const [alternativas, setAlternativas] = useState<string[]>(["", ""]);
  const [correta, setCorreta] = useState(0);

  const trilhaAtual = trilhas.find((t) => t.id === trilhaId);
  const espacos = trilhaAtual ? espacosDaJornada(trilhaAtual.slug as TrilhaId) : [];

  function adicionarAlternativa() {
    setAlternativas((prev) => [...prev, ""]);
  }

  function removerAlternativa(index: number) {
    setAlternativas((prev) => prev.filter((_, i) => i !== index));
    setCorreta((prev) => (prev === index ? 0 : prev > index ? prev - 1 : prev));
  }

  return (
    <form action={criarQuestao} className="mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="tipo">Modelo</Label>
          <Select id="tipo" name="tipo" required className="mt-1">
            {TIPOS_DE_QUESTAO.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="trilha_id">Jornada</Label>
          <Select
            id="trilha_id"
            name="trilha_id"
            required
            className="mt-1"
            value={trilhaId}
            onChange={(e) => setTrilhaId(e.target.value)}
          >
            {trilhas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="espaco_numero">Espaço dentro da Jornada</Label>
          <Select id="espaco_numero" name="espaco_numero" required className="mt-1">
            {espacos.map((e) => (
              <option key={e.numero} value={e.numero}>
                {e.nome} — {e.tema}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="nivel_libras">Nível em Libras</Label>
            <Select id="nivel_libras" name="nivel_libras" required className="mt-1">
              {NIVEIS_PROFICIENCIA.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="nivel_portugues">Nível em Português</Label>
            <Select id="nivel_portugues" name="nivel_portugues" required className="mt-1">
              {NIVEIS_PROFICIENCIA.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" name="titulo" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="enunciado">Enunciado</Label>
        <textarea
          id="enunciado"
          name="enunciado"
          required
          rows={3}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="prompt_video_url">Vídeo em Libras do enunciado (link do YouTube)</Label>
          <Input id="prompt_video_url" name="prompt_video_url" type="url" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="image_url">Imagem de contexto (URL)</Label>
          <Input id="image_url" name="image_url" type="url" required className="mt-1" />
        </div>
      </div>

      <div>
        <Label>Alternativas</Label>
        <div className="mt-1 flex flex-col gap-2">
          {alternativas.map((valor, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="correta"
                value={i}
                checked={correta === i}
                onChange={() => setCorreta(i)}
                aria-label={`Alternativa ${i + 1} é a correta`}
              />
              <input
                name="alternativa"
                value={valor}
                onChange={(e) =>
                  setAlternativas((prev) =>
                    prev.map((v, idx) => (idx === i ? e.target.value : v))
                  )
                }
                placeholder={`Alternativa ${i + 1}`}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
              {alternativas.length > 2 && (
                <button
                  type="button"
                  onClick={() => removerAlternativa(i)}
                  className="text-xs text-muted hover:text-danger"
                  aria-label="Remover alternativa"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={adicionarAlternativa}
          className="mt-2 text-xs font-medium text-primary"
        >
          + adicionar alternativa
        </button>
        <p className="mt-1 text-xs text-muted">Marque com o círculo qual alternativa é a correta.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="correct_feedback_video_url">Vídeo de feedback — resposta certa</Label>
          <Input
            id="correct_feedback_video_url"
            name="correct_feedback_video_url"
            type="url"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="incorrect_feedback_video_url">Vídeo de feedback — resposta errada</Label>
          <Input
            id="incorrect_feedback_video_url"
            name="incorrect_feedback_video_url"
            type="url"
            required
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-2 flex gap-3">
        <Button type="submit" name="intent" value="draft" variant="outline">
          Salvar rascunho
        </Button>
        <Button type="submit" name="intent" value="pending">
          Enviar para aprovação
        </Button>
      </div>
    </form>
  );
}
