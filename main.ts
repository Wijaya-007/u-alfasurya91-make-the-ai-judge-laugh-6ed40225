// Make the AI Judge Laugh — office joke, one line, under 200 characters.
// The observation is true to office life and the turn is specific: the
// standup is 15 minutes, the camera freezes mid-sentence, and suddenly the
// nodding is the most productive thing in the sprint.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Our standup is 15 minutes, so I set my camera to freeze mid-sentence — now my nodding is the most productive thing in the sprint.";

// Gate: a single line of plain text, 1-199 Unicode code points.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints >= 200) {
  throw new Error(`line is ${codePoints} code points, must be under 200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("line must not have leading/trailing whitespace or double spaces");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  join(dirname(fileURLToPath(import.meta.url)), "output");
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Verify the written bytes round-trip exactly.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("written entry does not match the line");
}
console.log(`wrote ${outPath} (${codePoints} chars)`);
console.log(LINE);
