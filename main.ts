// News image entry: sum up 26 November 2026's world news in one image.
//
// The program copies the photorealistic image bundled in this repository
// (entry.png) to the output directory. It uses only the Node standard
// library, performs no network access, and writes the same bytes on
// every run, so two runs produce byte-identical output.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const src = join(here, "entry.png");
const bytes = readFileSync(src);

// A PNG file must start with the 8-byte PNG signature.
const pngMagic = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error("entry.png is not a PNG file");
}

const dest = join(outDir, "entry.png");
copyFileSync(src, dest);
console.log(`wrote ${dest} (${bytes.length} bytes)`);
