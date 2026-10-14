import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replaceAll("%20", " "));
const imageRoot = join(root, "assets", "images");
const records = [];

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

const equipment = [
  ["rimless-60", "empty glass aquarium tank"],
  ["cube-30", "nano aquarium tank"],
  ["reef-120", "reef aquarium tank"],
  ["canister-200", "aquarium canister filter"],
  ["hob-75", "hang on back aquarium filter"],
  ["sponge-60", "aquarium sponge filter"],
  ["plant-light-60", "aquarium LED light fixture"],
  ["reef-light-90", "reef aquarium LED lighting"],
  ["nano-light-30", "nano aquarium LED lamp"],
  ["heater-100", "aquarium heater"],
  ["heater-200", "submersible aquarium heater"],
  ["fresh-test", "aquarium water test kit"],
  ["marine-test", "marine aquarium water testing"],
  ["gravel-vac", "aquarium gravel vacuum siphon"],
  ["aquascape-tools", "aquarium aquascaping tweezers scissors"],
];

const editorial = [
  ["home", "hero-reef", "reef aquarium"],
  ["home", "freshwater-aquarium", "freshwater planted aquarium"],
  ["home", "marine-aquarium", "marine reef aquarium"],
  ["home", "planted-aquarium", "planted aquarium aquascape"],
  ["about", "aquarium-gallery", "public aquarium gallery"],
  ["guides", "fish-acclimation", "aquarium fish bag acclimation"],
];

const clean = (value = "") => value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();

async function json(url) {
  const response = await fetch(url, { headers: { "User-Agent": "BlueCurrentAquaticsAssetAudit/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function wikipediaLead(title) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    redirects: "1",
    prop: "pageimages",
    piprop: "thumbnail|name|original",
    pithumbsize: "1600",
    titles: title,
  });
  const data = await json(`https://en.wikipedia.org/w/api.php?${params}`);
  const page = Object.values(data.query?.pages || {})[0];
  if (!page?.thumbnail?.source || !page?.pageimage) return null;
  return { url: page.thumbnail.source, fileTitle: `File:${page.pageimage}`, article: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replaceAll(" ", "_"))}` };
}

async function commonsSearch(query) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "12",
    gsrsearch: `${query} filetype:bitmap`,
    prop: "imageinfo",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1600",
  });
  const data = await json(`https://commons.wikimedia.org/w/api.php?${params}`);
  const pages = Object.values(data.query?.pages || {});
  const ranked = pages.filter((page) => {
    const info = page.imageinfo?.[0];
    return info?.thumburl && info.width >= 600 && info.height >= 400 && !/logo|map|diagram|icon|drawing|stamp/i.test(page.title);
  });
  const page = ranked[0];
  if (!page) return null;
  return { url: page.imageinfo[0].thumburl, fileTitle: page.title };
}

async function commonsMetadata(fileTitle) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    titles: fileTitle,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
  });
  const data = await json(`https://commons.wikimedia.org/w/api.php?${params}`);
  const page = Object.values(data.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  const meta = info?.extmetadata || {};
  return {
    sourceUrl: info?.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replaceAll(" ", "_"))}`,
    artist: clean(meta.Artist?.value || meta.Credit?.value || "See source page"),
    license: clean(meta.LicenseShortName?.value || meta.UsageTerms?.value || "See source page"),
  };
}

async function saveJpeg(url, destination) {
  const response = await fetch(url, { headers: { "User-Agent": "BlueCurrentAquaticsAssetAudit/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const temporary = `${destination}.download`;
  await writeFile(temporary, Buffer.from(await response.arrayBuffer()));
  execFileSync("/usr/bin/sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", temporary, "--out", destination], { stdio: "ignore" });
  await rm(temporary, { force: true });
}

async function acquireTaxon(group, id, scientific) {
  let candidate = await wikipediaLead(scientific);
  let verification = `Lead image on the English Wikipedia article for ${scientific}`;
  if (!candidate) {
    candidate = await commonsSearch(scientific);
    verification = `Wikimedia Commons search result for exact scientific name ${scientific}; manual visual review required`;
  }
  if (!candidate) throw new Error(`No image found for ${scientific}`);
  const metadata = await commonsMetadata(candidate.fileTitle);
  const destination = join(imageRoot, group, `${id}.jpg`);
  await saveJpeg(candidate.url, destination);
  records.push({ group, id, label: scientific, file: `assets/images/${group}/${id}.jpg`, confirmation: verification, ...metadata });
}

async function acquireSearch(group, id, query) {
  const candidate = await commonsSearch(query);
  if (!candidate) throw new Error(`No image found for ${query}`);
  const metadata = await commonsMetadata(candidate.fileTitle);
  const destination = join(imageRoot, group, `${id}.jpg`);
  await saveJpeg(candidate.url, destination);
  records.push({ group, id, label: query, file: `assets/images/${group}/${id}.jpg`, confirmation: `Wikimedia Commons category search for “${query}”; manually reviewed before publication`, ...metadata });
}

for (const folder of ["fish", "plants", "equipment", "home", "guides", "about", "common"]) {
  await mkdir(join(imageRoot, folder), { recursive: true });
}

for (const row of taxa) {
  try { await acquireTaxon(...row); console.log(`✓ ${row[0]}/${row[1]}`); }
  catch (error) { console.error(`✗ ${row[0]}/${row[1]}: ${error.message}`); }
}
for (const row of equipment) {
  try { await acquireSearch("equipment", ...row); console.log(`✓ equipment/${row[0]}`); }
  catch (error) { console.error(`✗ equipment/${row[0]}: ${error.message}`); }
}
for (const row of editorial) {
  try { await acquireSearch(...row); console.log(`✓ ${row[0]}/${row[1]}`); }
  catch (error) { console.error(`✗ ${row[0]}/${row[1]}: ${error.message}`); }
}

await writeFile(join(root, "documentation", "asset-sources.json"), JSON.stringify(records, null, 2) + "\n");
console.log(`Recorded ${records.length} local assets.`);
