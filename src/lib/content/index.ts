import type { ContentData, Locale } from "./types";
import { idContent } from "./id";
import { enContent } from "./en";

export * from "./types";

export const content: Record<Locale, ContentData> = {
  id: idContent,
  en: enContent,
};
