import type { BadgeProps } from "@/components/ui/badge";

export const STATUS_TONE: Record<string, NonNullable<BadgeProps["tone"]>> = {
  draft: "neutral",
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

export const STATUS_LABEL: Record<string, string> = {
  draft: "Rascunho",
  pending: "Aguardando aprovação",
  approved: "Aprovada",
  rejected: "Rejeitada",
};
