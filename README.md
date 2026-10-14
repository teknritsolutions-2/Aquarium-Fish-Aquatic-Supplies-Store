# BlueCurrent Aquatics

A complete, frontend-only aquarium fish, aquatic plants and equipment storefront built with HTML5, CSS3 and vanilla JavaScript. Runtime pages have no Node dependency.

## Run locally

From the project root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`. The root entry redirects to `pages/index.html` without duplicating the homepage.

## Important launch notes

- `BLUECURRENT AQUATICS` is a provisional, editable working identity.
- No verified store address, hours, phone, currency, shipping policy or form endpoint was supplied.
- Catalog prices and product names are demonstration content and require client verification.
- Live-animal actions open an availability enquiry; they never claim an order or reservation.
- Checkout is intentionally frontend-only and never collects payment-card data.
- All visible catalog and editorial imagery is self-hosted and source-audited in `documentation/IMAGE-SOURCES.md` and `documentation/asset-sources.json`.

## Build and validate

```bash
npm run docs:images
npm run build
npm test
```

`scripts/build.mjs` recreates `dist/` from source on every run, so stale files cannot survive a build.

See `documentation/INSTALLATION.md` and `documentation/CUSTOMIZATION.md` for the full handoff.
