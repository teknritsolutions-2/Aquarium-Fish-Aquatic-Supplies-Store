import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const records = JSON.parse(
  await readFile(resolve(root, "documentation/asset-sources.json"), "utf8"),
);
const escapeCell = (value) =>
  String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const rows = records
  .sort((a, b) => `${a.group}/${a.id}`.localeCompare(`${b.group}/${b.id}`))
  .map(
    (item) =>
      `| ${escapeCell(item.group)} | ${escapeCell(item.label)} | \`${escapeCell(item.file)}\` | [Source](${item.sourceUrl}) | ${escapeCell(item.artist)} | ${escapeCell(item.license)} | ${escapeCell(item.confirmation)} |`,
  )
  .join("\n");

const markdown = `# Image sources and verification\n\nAll storefront imagery is self-hosted under \`assets/images/\`. The original files came from Wikimedia Commons and are retained with source, creator, license, and subject-verification notes below. Catalog entries use only reviewed local files; unused research candidates may remain in this inventory for audit history.\n\n| Group | Subject | Local file | Source | Creator | License | Verification note |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows}\n\nThe machine-readable source of truth is [asset-sources.json](asset-sources.json).\n`;

await writeFile(resolve(root, "documentation/IMAGE-SOURCES.md"), markdown);
console.log(`Documented ${records.length} local image assets.`);
