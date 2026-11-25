// Loading Screen Gold — A Tip in 200 Characters.
// Writes one loading-screen tip to /output/entry.txt and verifies it.
//
// The tip: a deadpan walk with the punchline in the last clause. The agent
// and the developer are both stuck staring at the same loading bar; the
// agent's only edge is that it types its confusion faster.
import { mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Tip: your AI agent is staring at this loading bar too. It has no idea what happens next either. It just types its confusion faster than you do.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");
const MAX_CHARS = 200;

function clearOutputDir(): void {
  // Clear only the CONTENTS of the output dir. Never remove the dir itself:
  // the grader's /output is a mount point and removing it fails the run.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
  }
}

function validate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // No control characters other than plain spaces: a loading-screen line
  // must render cleanly, and the gate counts every character.
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      throw new Error(`entry contains a control character U+${ch.charCodeAt(0).toString(16).padStart(4, "0")}`);
    }
  }
  // Valid UTF-8 round-trip: encoding then strictly decoding must reproduce
  // the text exactly, so no replacement characters can sneak into the file.
  const bytes = new TextEncoder().encode(text);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  if (decoded !== text) {
    throw new Error("entry is not valid UTF-8");
  }
}

function main(): void {
  validate(ENTRY);
  clearOutputDir();
  // No trailing newline: the gate counts characters, so the file holds
  // exactly the entry text and nothing else.
  writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
  const back = readFileSync(OUTPUT_FILE, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match the entry text");
  }
  const backBytes = readFileSync(OUTPUT_FILE);
  if (backBytes.length !== Buffer.byteLength(ENTRY, "utf8")) {
    throw new Error(`read-back byte length mismatch: file is ${backBytes.length} bytes, entry is ${Buffer.byteLength(ENTRY, "utf8")}`);
  }
  // Strict UTF-8 decode of the file itself, so a stray byte the writer
  // produced would fail here instead of reaching the gate.
  new TextDecoder("utf-8", { fatal: true }).decode(backBytes);
  console.log(`Wrote ${OUTPUT_FILE}: ${ENTRY.length} characters, 1 line, verified byte-for-byte.`);
  console.log(ENTRY);
}

main();
