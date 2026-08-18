import { readFile, writeFile } from "node:fs/promises";

const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
const match = html.match(/<body[^>]*>([\s\S]*?)<script\s+src=["']script\.js["'][^>]*><\/script>\s*<\/body>/i);

if (!match) {
  throw new Error("Could not extract the HolFe home page body.");
}

const source = `export const indexBody = ${JSON.stringify(match[1].trim())};\n`;
await writeFile(new URL("../app/index-body.js", import.meta.url), source, "utf8");
