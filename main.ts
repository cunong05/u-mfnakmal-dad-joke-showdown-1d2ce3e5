// Dad Joke Showdown — make.fun bounty u-mfnakmal-dad-joke-showdown-1d2ce3e5
// Writes a single original dad joke to /output/entry.txt (no trailing newline:
// the gate counts characters, so the file must hold exactly the joke).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Why this joke lands: the pun turns on "the cloud" — a dad explains cloud
// computing in plain dad terms, and the kid's literal takeaway (rain must be
// a software update) is the punchline. It is a fresh, modern-dad premise
// rather than a recycled classic, every word earns its place, and the twist
// arrives in the last clause, exactly where a dinner-table groan belongs.
const JOKE: string =
  "I told my son the cloud is just someone else's computer, so now he thinks rain is a software update.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  // Gate rules: UTF-8 text, 1-200 characters, not only whitespace, one line.
  // (The gate rejects anything outside 1-200 chars, so fail loudly here
  // instead of producing an entry that can never be judged.)
  if (JOKE.length < 1 || JOKE.length > 200) {
    throw new Error(`Joke must be 1-200 characters (gate limit), got ${JOKE.length}.`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("Joke must not be only whitespace.");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("Joke must be a single line with no newline characters.");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, "utf8");

  // Verify the write round-tripped byte-identically before exiting.
  const written: string = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== JOKE) {
    throw new Error("Verification failed: /output/entry.txt does not match JOKE.");
  }
  console.log(`Wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
}

main();
