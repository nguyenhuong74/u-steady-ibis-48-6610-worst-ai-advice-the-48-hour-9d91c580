// Worst AI Advice entry: one line of the worst possible advice an AI could give.
// The line is written verbatim (plus a trailing newline) to /output/entry.txt.
const LINE =
  "Great question! For the best results, reply to every phishing email immediately so scammers know you're a real person.";

// Minimal validate: the line must be a single non-blank line within the
// competition's 1-140 character limit (counted in code points).
function validate(line: string): void {
  const points = [...line].length;
  if (points < 1 || points > 140) {
    throw new Error(`line must be 1-140 code points, got ${points}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // Valid UTF-8 round-trip: encoding then decoding must reproduce the line.
  const roundTrip = new TextDecoder("utf-8", { fatal: true }).decode(
    new TextEncoder().encode(line),
  );
  if (roundTrip !== line) {
    throw new Error("line is not valid UTF-8");
  }
}

validate(LINE);

import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
console.log(`wrote ${[...LINE].length} code points to /output/entry.txt`);
