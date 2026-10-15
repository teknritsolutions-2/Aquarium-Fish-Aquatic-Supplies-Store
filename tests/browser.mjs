import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.log("Browser interaction tests skipped: Playwright is not installed.");
  process.exit(0);
}

const root = resolve(fileURLToPath(new URL("../dist", import.meta.url)));
const types = {
  ".css": "text/css",
  ".html": "text/html",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
};
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://local").pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  let file = normalize(join(root, relativePath));
  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404).end();
    return;
  }
  if (statSync(file).isDirectory()) file = join(file, "index.html");
  response.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(response);
});

await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
let browser;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(origin, { waitUntil: "networkidle" });

  assert(await page.locator(".bag-count").isHidden(), "Empty bag count should be hidden");
  assert(await page.locator(".explorer-photo img").getAttribute("src"), "Explorer needs a default image");
  const initialExplorer = await page.locator(".explorer-photo img").getAttribute("src");
  await page.locator('.explorer-tabs [data-mode="Marine"]').click();
  await page.waitForFunction((before) => document.querySelector(".explorer-photo img")?.getAttribute("src") !== before, initialExplorer);

  const direction = page.locator(".nav-tools .dir-toggle");
  assert((await direction.textContent()).trim() === "RTL", "LTR mode should offer RTL");
  await direction.click();
  assert((await direction.textContent()).trim() === "LTR", "RTL mode should offer LTR");
  assert((await page.locator("html").getAttribute("dir")) === "rtl", "Direction should switch to RTL");

  await page.goto(`${origin}/pages/equipment.html`, { waitUntil: "networkidle" });
  await page.locator(".add-cart").first().click();
  assert(!(await page.locator(".bag-count").isHidden()), "Non-empty bag count should be visible");
  assert((await page.locator(".bag-count").textContent()) === "1", "Bag count should update");
  assert((await page.locator(".bag-trigger").getAttribute("aria-label")).includes("1 item"), "Bag label should announce quantity");

  await page.goto(`${origin}/pages/fish-catalog.html`, { waitUntil: "networkidle" });
  const fishCardHeights = await page.locator(".species-card").evaluateAll((cards) =>
    cards.slice(0, 3).map((card) => Math.round(card.getBoundingClientRect().height)),
  );
  assert(Math.max(...fishCardHeights) - Math.min(...fishCardHeights) <= 2, "Fish cards should align by row");
  const overflowingFacts = await page.locator(".care-summary dd").evaluateAll((facts) =>
    facts.filter((fact) => fact.scrollWidth > fact.clientWidth + 1).length,
  );
  assert(overflowingFacts === 0, "Fish care facts should not overflow their cells");

  await page.goto(`${origin}/pages/aquatic-plants.html`, { waitUntil: "networkidle" });
  const plantCardHeights = await page.locator(".plant-card").evaluateAll((cards) =>
    cards.slice(0, 4).map((card) => Math.round(card.getBoundingClientRect().height)),
  );
  assert(Math.max(...plantCardHeights) - Math.min(...plantCardHeights) <= 2, "Plant cards should align by row");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-toggle").click();
  const mobileLabels = await page.locator(".mobile-nav > *").evaluateAll((items) =>
    items.map((item) => item.matches("details") ? item.querySelector("summary").textContent.trim() : item.textContent.trim()),
  );
  assert(
    JSON.stringify(mobileLabels) === JSON.stringify(["Home", "About", "Fish Catalog", "Aquatic Plants", "Equipment", "Care Guides", "Contact"]),
    "Mobile navigation order is incorrect",
  );

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/pages/care-guides.html`, { waitUntil: "networkidle" });
  assert((await page.locator(".article-card.featured").count()) === 1, "Care guides need one featured card");
  assert((await page.locator(".article-card.closing").count()) === 1, "Care guides need a balanced closing card");

  console.log("Browser interaction tests passed.");
} finally {
  await browser?.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
