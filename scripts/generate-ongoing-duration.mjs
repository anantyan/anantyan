import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const startDatesPath = path.join(
  rootDir,
  "src/lib/content/ongoing-start-dates.json"
);
const outDir = path.join(rootDir, "src/lib/content/generated");
const outPath = path.join(outDir, "ongoing-duration.json");

const startDates = JSON.parse(readFileSync(startDatesPath, "utf8"));

const now = new Date();
const nowTotalMonths = now.getUTCFullYear() * 12 + now.getUTCMonth();

const monthsElapsed = Object.fromEntries(
  Object.entries(startDates).map(([key, { startYear, startMonth }]) => {
    const startTotalMonths = startYear * 12 + (startMonth - 1);
    const inclusiveMonths = nowTotalMonths - startTotalMonths + 1;
    return [key, inclusiveMonths];
  })
);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, `${JSON.stringify(monthsElapsed, null, 2)}\n`);
