export type Locale = "id" | "en";

export function detectInitialLocale(
  storedLocale: string | null,
  browserLanguage: string | undefined,
): Locale {
  if (storedLocale === "id" || storedLocale === "en") {
    return storedLocale;
  }
  if (browserLanguage?.toLowerCase().startsWith("en")) {
    return "en";
  }
  return "id";
}
