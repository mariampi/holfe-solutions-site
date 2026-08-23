import { access, writeFile } from "node:fs/promises";
import { constants } from "node:fs";

const vinextEntry = new URL("../dist/server/index.mjs", import.meta.url);
const sitesEntry = new URL("../dist/server/index.js", import.meta.url);

await access(vinextEntry, constants.R_OK);
await writeFile(
  sitesEntry,
  'export { default } from "./index.mjs";\nexport * from "./index.mjs";\n',
  "utf8",
);
