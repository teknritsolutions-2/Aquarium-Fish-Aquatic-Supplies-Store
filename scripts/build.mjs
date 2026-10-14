import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(root, "dist");
const entries = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "assets",
  "pages",
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const entry of entries) {
  await cp(resolve(root, entry), resolve(dist, entry), { recursive: true });
}

const files = await readdir(dist, { recursive: true });
console.log(`Built dist/ from source (${files.length} entries).`);
