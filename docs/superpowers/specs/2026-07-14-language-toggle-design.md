# Language Toggle (Indonesian / English) — Design

## Context

The portfolio (`portfolio-anantyan`) is a static-export Next.js single-page site. All visible content — bio, experience, project descriptions, certifications — is currently Indonesian-only, sourced from `src/lib/content.ts`. The site needs a bilingual toggle so English-speaking recruiters/clients can read it in their language, while keeping Indonesian as the primary/default experience.

## Requirements (confirmed with user)

1. Initial language auto-detects from the visitor's browser (`navigator.language`), falling back to Indonesian.
2. Because this is a static export (HTML generated once at build time, not per-request), auto-detection can only run client-side after the page loads. The page always **first paints in Indonesian**, then switches immediately after detection runs. This brief flash is an accepted trade-off — there is no server available at request time to detect language earlier.
3. The chosen language persists across visits via `localStorage`, and always overrides auto-detection once set.
4. The switcher is a dropdown in the nav showing the active language's full name ("Bahasa Indonesia" / "English") with a chevron; clicking opens a 2-item menu.
5. **Full content is translated** — nav labels, section headings/descriptions, hero tagline, bio summary, every experience entry's role + description, every project's description, certifications, awards, and CTA/footer text. Project names, company names, and technology/skill names (e.g. "Kotlin", "Firebase") stay as-is in both languages (proper nouns aren't translated). City names (Purwokerto, Yogyakarta, Tangerang, Banjarnegara) also stay as-is. **Exception, accepted post-implementation:** province/direction components of a location (e.g. "Jawa Tengah" → "Central Java", "Jakarta Selatan" → "South Jakarta") ARE translated in the English content, since these are standard exonyms and read more naturally to an English audience than untranslated Indonesian administrative terms. This was flagged by the final whole-branch review as a deviation from the original wording of this requirement and deliberately accepted rather than reverted — city names remain untranslated, only province/direction words are localized.
6. `<head>` SEO metadata (`<title>`, `<meta description>`) is generated once at build time and **stays Indonesian** regardless of the visitor's toggle choice — accepted limitation, since a static single-page export has no per-locale build. Only visible page content is bilingual.

## Architecture

No routing changes, no new URL segments, no `next.config.ts` changes. Everything is a client-side toggle over pre-bundled bilingual data, matching the lightweight custom-i18n pattern already used by sibling projects in this folder (`kelana-djiwa`, `bojes-travel` both hand-roll i18n rather than pulling in a library) — consistent with this being a small, single-page static site where a routing-based i18n library (next-intl/next-i18next) would add build complexity (duplicate static pages per locale) with no real benefit.

```
LocaleProvider (client, Context)
  ├─ state: locale: 'id' | 'en'
  ├─ on mount: localStorage['portfolio-locale'] ?? (navigator.language.startsWith('en') ? 'en' : 'id')
  ├─ setLocale(next): updates state + localStorage + document.documentElement.lang
  └─ exposed via useLocale() hook

Sections (Nav, Hero, About, Experience, Projects, Education, Contact)
  └─ "use client", call useLocale(), read content[locale] / ui[locale]
```

## Data Model

Restructure `src/lib/content.ts` into a `content/` folder, keeping the current shape but duplicated per locale:

- `src/lib/content/id.ts` — current Indonesian data, moved as-is (profile, skills, experience, education, certifications, awards, projects)
- `src/lib/content/en.ts` — same shape, full English translation of every field listed in Requirement 5. Skill names, project names, company names, and place names are copied unchanged; everything else is translated to natural, professional English matching the existing tone (concise, outcome-focused).
- `src/lib/content/types.ts` — shared TypeScript types (`Profile`, `ExperienceItem`, `Project`, etc.), imported by both locale files so they can't drift out of shape
- `src/lib/content/index.ts` — exports `content: Record<Locale, ContentShape>` and `type Locale = 'id' | 'en'`

Separately, `src/lib/i18n/ui.ts` holds UI-chrome strings that aren't biographical content — nav link labels, section eyebrows/titles/descriptions, button labels ("Lihat Proyek"/"View Projects", "Unduh CV"/"Download Resume"), the language-switcher's own labels, and the footer line. Kept apart from `content` because it's interface copy, not CV data, and will likely stay short/stable while `content` grows.

## Components

- **New:** `src/lib/i18n/LocaleContext.tsx` — `LocaleProvider` + `useLocale()` hook (client component)
- **New:** `src/lib/i18n/ui.ts` — bilingual UI-string dictionary
- **New:** `src/lib/content/{id,en,types,index}.ts` — replaces the current `src/lib/content.ts`
- **New:** `src/components/sections/LocaleSwitcher.tsx` — dropdown button + menu, lives inside `Nav`
- **Changed:** `Nav`, `Hero`, `About`, `Experience`, `Projects`, `Education`, `Contact` — become `"use client"`, read from `useLocale()` + `content[locale]` / `ui[locale]` instead of importing static `content.ts` directly
- **Changed:** `src/app/layout.tsx` — wraps `children` in `<LocaleProvider>`

## Accessibility & Edge Cases

- Switcher button: `aria-haspopup="menu"`, `aria-expanded`
- Menu items: `role="menuitemradio"`, `aria-checked` matching active locale
- Dropdown closes on outside click, `Escape`, or selecting an option
- `document.documentElement.lang` updates on every locale change (screen readers)
- No hydration-mismatch errors: server/first paint always renders `'id'`; the `useEffect` that reads `localStorage`/`navigator.language` runs after mount, so React hydrates against the same markup it rendered server-side, then re-renders client-side with the detected locale

## Testing / Verification

1. `npx tsc --noEmit` and `npm run lint` clean
2. `npm run build` (static export) succeeds
3. Headless-browser check (Playwright, as used for the initial build): load page, confirm default Indonesian content renders, exercise the switcher to English and confirm every section's text changes with no leftover Indonesian strings or `undefined`/missing-key errors, toggle back, reload and confirm the persisted choice sticks
4. Manually confirm no console errors and no layout shift/overflow when switching (English strings tend to run longer than Indonesian — check button/nav wrapping at mobile width)
