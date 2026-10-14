import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const sourceHtml = walk(root).filter(
  (file) => file.endsWith(".html") && !file.includes(`${join(root, "dist")}/`),
);

for (const file of sourceHtml) {
  const source = readFileSync(file, "utf8");
  if (!/<title>[^<]+<\/title>/.test(source))
    failures.push(`${file}: missing title`);
  if (file !== join(root, "index.html") && !source.includes("data-page=")) {
    failures.push(`${file}: missing page renderer`);
  }
  if (
    file.includes(`${join(root, "pages")}/`) &&
    !source.includes("favicon.svg?v=2")
  ) {
    failures.push(`${file}: missing versioned favicon`);
  }
  for (const match of source.matchAll(/(?:src|href)="([^"?#]+)"/g)) {
    const ref = match[1];
    if (/^(https?:|#|mailto:|tel:)/.test(ref) || ref.endsWith(".html"))
      continue;
    const target = resolve(dirname(file), ref);
    if (!existsSync(target))
      failures.push(`${file}: broken local reference ${ref}`);
  }
}

const dataSource = readFileSync(
  join(root, "assets/js/catalog-data.js"),
  "utf8",
);
const context = { window: {} };
new Function("window", "location", dataSource)(context.window, {
  pathname: "/pages/index.html",
});
const data = context.window.BlueCurrentData;
const expectedCounts = { fish: 20, plants: 11, equipment: 11, guides: 6 };

for (const [group, expected] of Object.entries(expectedCounts)) {
  if (data[group].length !== expected) {
    failures.push(
      `${group}: expected ${expected} records, found ${data[group].length}`,
    );
  }
  const ids = data[group].map((item) => item.id);
  if (new Set(ids).size !== ids.length)
    failures.push(`${group}: duplicate IDs`);
  if (group !== "guides") {
    const images = data[group].map((item) => item.image);
    if (new Set(images).size !== images.length)
      failures.push(`${group}: duplicate catalog images`);
  }
}

const catalogItems = [...data.fish, ...data.plants, ...data.equipment];
for (const item of catalogItems) {
  if (/^https?:/.test(item.image))
    failures.push(`${item.id}: remote image URL`);
  if (!/\.(?:jpe?g|png|webp|svg)$/i.test(item.image)) {
    failures.push(`${item.id}: unsupported image extension`);
    continue;
  }
  const imagePath = resolve(root, item.image.replace(/^\.\.\//, ""));
  if (!existsSync(imagePath))
    failures.push(`${item.id}: missing ${item.image}`);
  else if (statSync(imagePath).size === 0)
    failures.push(`${item.id}: empty image file`);
}

const manifest = JSON.parse(
  readFileSync(join(root, "documentation/asset-sources.json"), "utf8"),
);
const manifestByKey = new Map(
  manifest.map((item) => [`${item.group}/${item.id}`, item]),
);
for (const [group, items] of [
  ["fish", data.fish],
  ["plants", data.plants],
  ["equipment", data.equipment],
]) {
  for (const item of items) {
    const source = manifestByKey.get(`${group}/${item.id}`);
    if (!source) failures.push(`${group}/${item.id}: missing source record`);
    else if (
      !source.sourceUrl ||
      !source.artist ||
      !source.license ||
      !source.confirmation
    ) {
      failures.push(`${group}/${item.id}: incomplete source record`);
    } else if (/manual review required/i.test(source.confirmation)) {
      failures.push(
        `${group}/${item.id}: image has not been visually confirmed`,
      );
    }
  }
}

const mainSource = readFileSync(join(root, "assets/js/main.js"), "utf8");
const cssSource = readFileSync(join(root, "assets/css/style.css"), "utf8");
if (/images\.unsplash|https?:\/\//.test(mainSource + dataSource)) {
  failures.push("Runtime catalog source still contains remote asset URLs");
}
if (mainSource.split("\n").length < 500 || cssSource.split("\n").length < 900) {
  failures.push("Source formatting regressed into compressed one-line code");
}

for (const required of [
  "fish-catalog.html",
  "aquatic-plants.html",
  "equipment.html",
  "care-guides.html",
  "about.html",
  "contact.html",
]) {
  if (!mainSource.includes(required))
    failures.push(`Navigation missing ${required}`);
}

for (const file of sourceHtml) {
  const rel = relative(root, file);
  const built = join(root, "dist", rel);
  if (!existsSync(built)) failures.push(`dist missing ${rel}`);
  else if (readFileSync(file, "utf8") !== readFileSync(built, "utf8")) {
    failures.push(`dist out of sync: ${rel}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Validated ${sourceHtml.length} HTML files, ${catalogItems.length} catalog images, ${manifest.length} source records, and deterministic dist output.`,
);
