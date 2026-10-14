import { access, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const manifestPath = join(root, "documentation", "asset-sources.json");
const imageRoot = join(root, "assets", "images");

const assets = [
  ["fish", "kuhli-loach", "Pangio kuhlii", "Kuhli loach in aquarium.jpg", "Verified photograph from the Wikimedia Commons Pangio kuhlii taxon category"],
  ["plants", "monte-carlo", "Micranthemum tweediei", "Micranthemum tweediei-1-veda aquarium-bengaluru-India.jpg", "File description explicitly identifies Micranthemum tweediei (Monte Carlo)"],
  ["equipment", "rimless-60", "Glass aquarium", "Aquarium-Tank.jpg", "Representative photograph of a glass home aquarium"],
  ["equipment", "cube-30", "Nano aquarium", "Nano reef aquarium, May 2020.jpg", "Representative photograph of a compact nano aquarium"],
  ["equipment", "reef-120", "Reef aquarium system", "New York Aquarium Reef Tank.jpg", "Representative photograph of a reef aquarium"],
  ["equipment", "canister-200", "External canister filter", "Eheim type 2011, pump 101101993-4233.jpg", "Photograph of an external aquarium canister filter; shown as a representative device without relabeling the manufacturer"],
  ["equipment", "hob-75", "External aquarium filter", "Aquarium - external filter.jpg", "Photograph of an external aquarium filter"],
  ["equipment", "sponge-60", "Air-driven sponge filter", "Filtr gąbkowy.jpg", "Photograph of an aquarium sponge filter"],
  ["equipment", "plant-light-60", "Aquarium LED light", "Led Aquarium Light.jpg", "Photograph of an aquarium LED fixture"],
  ["equipment", "reef-light-90", "Reef aquarium lighting", "Georgia Aquarium tank lights IMG 6993.jpg", "Photograph of lighting installed above a reef display"],
  ["equipment", "nano-light-30", "Compact aquarium light", "Aquarium and light.jpg", "Photograph of an aquarium lighting setup"],
  ["equipment", "heater-100", "Aquarium heater", "Aquarium heater1.jpg", "Photograph of a glass-tube aquarium heater"],
  ["equipment", "heater-200", "Submersible aquarium heater", "Grzałka do akwarium.jpg", "Photograph of an aquarium heater"],
  ["equipment", "fresh-test", "Aquarium pH test kit", "PH Kit.jpg", "Photograph of a pH kit used with a fish system"],
  ["equipment", "marine-test", "Aquarium water test", "Determination of acidity of the water.jpg", "Photograph of testing water used for aquariums"],
  ["equipment", "aquascape-tools", "Aquascaping tweezers", "An Aquascapist Planting Aquatic Plant Anubias Petite with Tweezers in an Aquarium.jpg", "Photograph of aquascaping tweezers being used to plant Anubias"],
  ["home", "hero-reef", "Reef aquarium", "Reef Aquarium.jpg", "Photograph of a reef aquarium"],
  ["home", "freshwater-aquarium", "Freshwater aquarium", "Aquarium-Tank.jpg", "Photograph of a freshwater home aquarium"],
  ["home", "marine-aquarium", "Marine aquarium", "Reef aquarium.jpg", "Photograph of a marine reef aquarium"],
  ["home", "planted-aquarium", "Aquarium under LED lighting", "Acuario iluminado con lámparas led.jpg", "Photograph of an aquarium illuminated with LED lamps"],
  ["about", "aquarium-gallery", "Aquarium gallery", "Main fish tank at Enoshima Aquarium.jpg", "Photograph of a public aquarium gallery display"],
];

const clean = (value = "") => value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
const params = new URLSearchParams({
  action: "query",
  format: "json",
  origin: "*",
  prop: "imageinfo",
  iiprop: "url|mime|size|extmetadata",
  iiurlwidth: "1600",
  titles: assets.map((row) => `File:${row[3]}`).join("|"),
});
const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": "BlueCurrentAquaticsAssetAudit/1.0" } });
if (!response.ok) throw new Error(`Commons metadata request failed: ${response.status}`);
const payload = await response.json();
const pages = new Map(Object.values(payload.query?.pages || {}).map((page) => [page.title.replaceAll("_", " "), page]));

let records = [];
try { records = JSON.parse(await readFile(manifestPath, "utf8")); } catch {}
const curatedKeys = new Set(assets.map(([group, id]) => `${group}/${id}`));
records = records.filter((record) => !curatedKeys.has(`${record.group}/${record.id}`));

for (const [group, id, label, fileName, confirmation] of assets) {
  const page = pages.get(`File:${fileName}`);
  const info = page?.imageinfo?.[0];
  if (!info?.thumburl) {
    console.error(`✗ ${group}/${id}: ${fileName} unavailable`);
    continue;
  }
  const folder = join(imageRoot, group);
  const destination = join(folder, `${id}.jpg`);
  const temporary = `${destination}.download`;
  await mkdir(folder, { recursive: true });
  try {
    await access(destination);
  } catch {
    let imageResponse;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      imageResponse = await fetch(info.thumburl, { headers: { "User-Agent": "BlueCurrentAquaticsAssetAudit/1.0" } });
      if (imageResponse.status !== 429) break;
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 4000 * (attempt + 1)));
    }
    if (!imageResponse?.ok) throw new Error(`${imageResponse?.status} ${info.thumburl}`);
    await writeFile(temporary, Buffer.from(await imageResponse.arrayBuffer()));
    execFileSync("/usr/bin/sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", temporary, "--out", destination], { stdio: "ignore" });
    await rm(temporary, { force: true });
  }
  const metadata = info.extmetadata || {};
  records.push({
    group,
    id,
    label,
    file: `assets/images/${group}/${id}.jpg`,
    sourceUrl: info.descriptionurl,
    artist: clean(metadata.Artist?.value || metadata.Credit?.value || "See source page"),
    license: clean(metadata.LicenseShortName?.value || metadata.UsageTerms?.value || "See source page"),
    confirmation,
  });
  console.log(`✓ ${group}/${id}`);
}

records.sort((left, right) => `${left.group}/${left.id}`.localeCompare(`${right.group}/${right.id}`));
await writeFile(manifestPath, JSON.stringify(records, null, 2) + "\n");
console.log(`Recorded ${records.length} total assets.`);
