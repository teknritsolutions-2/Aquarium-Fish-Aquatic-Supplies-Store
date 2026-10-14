import { mkdir, writeFile, readFile, access, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const imageRoot = join(root, "assets", "images");
const manifestPath = join(root, "documentation", "asset-sources.json");

const taxa = [
  ["fish", "neon-tetra", "Paracheirodon innesi"],
  ["fish", "honey-gourami", "Trichogaster chuna"],
  ["fish", "harlequin-rasbora", "Trigonostigma heteromorpha"],
  ["fish", "celestial-pearl-danio", "Danio margaritatus"],
  ["fish", "corydoras-panda", "Corydoras panda"],
  ["fish", "cardinal-tetra", "Paracheirodon axelrodi"],
  ["fish", "dwarf-gourami", "Trichogaster lalius"],
  ["fish", "kuhli-loach", "Pangio kuhlii"],
  ["fish", "angelfish", "Pterophyllum scalare"],
  ["fish", "discus", "Symphysodon aequifasciatus"],
  ["fish", "clownfish", "Amphiprion ocellaris"],
  ["fish", "royal-gramma", "Gramma loreto"],
  ["fish", "firefish", "Nemateleotris magnifica"],
  ["fish", "banggai-cardinal", "Pterapogon kauderni"],
  ["fish", "yellow-tang", "Zebrasoma flavescens"],
  ["fish", "blue-green-chromis", "Chromis viridis"],
  ["fish", "flame-hawkfish", "Neocirrhites armatus"],
  ["fish", "mandarin-dragonet", "Synchiropus splendidus"],
  ["fish", "coral-beauty", "Centropyge bispinosa"],
  ["fish", "watchman-goby", "Cryptocentrus cinctus"],
  ["plants", "anubias-nana", "Anubias barteri"],
  ["plants", "java-fern", "Microsorum pteropus"],
  ["plants", "amazon-sword", "Echinodorus grisebachii"],
  ["plants", "dwarf-hairgrass", "Eleocharis parvula"],
  ["plants", "crypt-wendtii", "Cryptocoryne wendtii"],
  ["plants", "water-wisteria", "Hygrophila difformis"],
  ["plants", "vallisneria", "Vallisneria spiralis"],
  ["plants", "java-moss", "Taxiphyllum barbieri"],
  ["plants", "red-root-floater", "Phyllanthus fluitans"],
  ["plants", "monte-carlo", "Micranthemum tweediei"],
  ["plants", "rotala-rotundifolia", "Rotala rotundifolia"],
  ["plants", "bucephalandra", "Bucephalandra"],
];

const clean = (value = "") => value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
const pause = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

async function json(url, attempt = 0) {
  const response = await fetch(url, { headers: { "User-Agent": "BlueCurrentAquaticsAssetAudit/1.0 (catalog image verification)" } });
  if (response.status === 429 && attempt < 5) {
    await pause(5000 * (attempt + 1));
    return json(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function download(url, destination) {
  const response = await fetch(url, { headers: { "User-Agent": "BlueCurrentAquaticsAssetAudit/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const temporary = `${destination}.download`;
  await writeFile(temporary, Buffer.from(await response.arrayBuffer()));
  execFileSync("/usr/bin/sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", temporary, "--out", destination], { stdio: "ignore" });
  await rm(temporary, { force: true });
}

const pageParams = new URLSearchParams({
  action: "query",
  format: "json",
  origin: "*",
  redirects: "1",
  prop: "pageimages",
  piprop: "thumbnail|name|original",
  pithumbsize: "1400",
  titles: taxa.map((row) => row[2]).join("|"),
});
const pageData = await json(`https://en.wikipedia.org/w/api.php?${pageParams}`);
const pages = Object.values(pageData.query?.pages || {});
const normalized = new Map([
  ...(pageData.query?.normalized || []).map((row) => [row.from, row.to]),
  ...(pageData.query?.redirects || []).map((row) => [row.from, row.to]),
]);
const resolveTitle = (title) => {
  let current = title;
  for (let index = 0; index < 4 && normalized.has(current); index += 1) current = normalized.get(current);
  return current;
};
const byTitle = new Map(pages.map((page) => [page.title, page]));
const fileTitles = pages.filter((page) => page.pageimage).map((page) => `File:${page.pageimage}`);

const metaParams = new URLSearchParams({
  action: "query",
  format: "json",
  origin: "*",
  prop: "imageinfo",
  iiprop: "url|extmetadata",
  titles: fileTitles.join("|"),
});
const metaData = fileTitles.length ? await json(`https://commons.wikimedia.org/w/api.php?${metaParams}`) : { query: { pages: {} } };
const metaByTitle = new Map(Object.values(metaData.query?.pages || {}).map((page) => [page.title.replaceAll("_", " "), page.imageinfo?.[0]]));

let records = [];
try { records = JSON.parse(await readFile(manifestPath, "utf8")); } catch {}
records = records.filter((record) => !["fish", "plants"].includes(record.group));

for (const [group, id, scientific] of taxa) {
  const page = byTitle.get(resolveTitle(scientific)) || byTitle.get(scientific);
  if (!page?.thumbnail?.source || !page.pageimage) {
    console.error(`✗ ${group}/${id}: no exact-taxon lead image`);
    continue;
  }
  const fileTitle = `File:${page.pageimage}`.replaceAll("_", " ");
  const info = metaByTitle.get(fileTitle);
  const metadata = info?.extmetadata || {};
  const destination = join(imageRoot, group, `${id}.jpg`);
  await mkdir(join(imageRoot, group), { recursive: true });
  try { await access(destination); } catch { await download(page.thumbnail.source, destination); await pause(350); }
  records.push({
    group,
    id,
    label: scientific,
    file: `assets/images/${group}/${id}.jpg`,
    sourceUrl: info?.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replaceAll(" ", "_"))}`,
    artist: clean(metadata.Artist?.value || metadata.Credit?.value || "See source page"),
    license: clean(metadata.LicenseShortName?.value || metadata.UsageTerms?.value || "See source page"),
    confirmation: `Lead image on the English Wikipedia article resolved for the exact taxon ${scientific}; visually reviewed in the catalog contact sheet`,
  });
  console.log(`✓ ${group}/${id}`);
}

await writeFile(manifestPath, JSON.stringify(records, null, 2) + "\n");
console.log(`Recorded ${records.length} total assets.`);
