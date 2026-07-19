import type { Locale } from "./content/types";

export function formatOngoingDuration(months: number, locale: Locale): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (locale === "id") {
    if (years === 0) return `${remainingMonths} bln`;
    if (remainingMonths === 0) return `${years} thn`;
    return `${years} thn ${remainingMonths} bln`;
  }

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}
