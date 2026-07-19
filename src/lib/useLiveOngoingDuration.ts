import { useEffect, useState } from "react";
import { formatOngoingDuration } from "./formatDuration";
import type { Locale } from "./content/types";
import ongoingStartDates from "./content/ongoing-start-dates.json";

type StartDate = { startYear: number; startMonth: number };

const startDates: Record<string, StartDate> = ongoingStartDates;

/**
 * Renders `initialDuration` (the value frozen at last build/deploy) until
 * the component mounts, then recomputes from the browser's own clock so the
 * duration stays correct even between deploys. The post-mount swap avoids
 * SSR/client hydration mismatches since React only diffs the first render.
 */
export function useLiveOngoingDuration(
  initialDuration: string,
  durationKey: string | undefined,
  locale: Locale
): string {
  const [duration, setDuration] = useState(initialDuration);

  useEffect(() => {
    if (!durationKey) return;
    const startDate = startDates[durationKey];
    if (!startDate) return;

    const now = new Date();
    const nowTotalMonths = now.getFullYear() * 12 + now.getMonth();
    const startTotalMonths =
      startDate.startYear * 12 + (startDate.startMonth - 1);
    const monthsElapsed = nowTotalMonths - startTotalMonths + 1;

    // Intentional one-time client-only correction, not a bug: a static
    // export bakes in the build-time duration, so this effect synchronizes
    // it with the browser's real clock after mount once JS is available.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDuration(formatOngoingDuration(monthsElapsed, locale));
  }, [durationKey, locale]);

  return duration;
}
