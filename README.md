# BlueCurrent Aquatics - Aquarium Fish & Aquatic Supplies Store

A modern, responsive, frontend storefront for aquarium fish, aquatic plants, equipment, and care guides built with HTML5, CSS3, and vanilla JavaScript.

🌐 **Live Website**: [https://teknritsolutions-2.github.io/Aquarium-Fish-Aquatic-Supplies-Store/](https://teknritsolutions-2.github.io/Aquarium-Fish-Aquatic-Supplies-Store/)

## File Structure

```
.
├── index.html (root entry point for hosting)
├── .nojekyll (GitHub Pages static bypass)
├── 404.html (root 404 handler)
├── assets/
│   ├── brand/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   └── favicon.svg
│   ├── css/
│   │   ├── style.css (main styles)
│   │   ├── dark-mode.css
│   │   └── rtl.css
│   ├── js/
│   │   ├── main.js
│   │   ├── catalog-data.js
│   │   ├── theme-init.js
│   │   └── plugins/
│   ├── images/
│   └── fonts/
├── pages/
│   ├── index.html (home)
│   ├── about.html
│   ├── services.html
│   ├── blog.html
│   ├── contact.html
│   ├── fish-catalog.html
│   ├── fish-details.html
│   ├── aquatic-plants.html
│   ├── equipment.html
│   ├── product-details.html
│   ├── care-guides.html
│   ├── tank-planner.html
│   ├── cart.html
│   ├── checkout.html
│   ├── faq.html
│   ├── shipping-returns.html
│   ├── privacy.html
│   ├── terms.html
│   ├── home2.html
│   └── guides/
├── documentation/
└── README.md
```

## Features

- **Storefront & Catalog**: Comprehensive fish species, aquatic plants, and equipment collections with interactive filtering, sorting, and detail views.
- **Interactive Tank Planner**: Equipment checklist calculator based on water type, volume, and setup goals.
- **Care Guides & Husbandry**: Practical guides covering setup, water parameters, acclimation, cycling, and maintenance.
- **Theme & Direction Controls**: Instant light/dark theme switching and full Right-to-Left (RTL) layout support.
- **Shopping Bag & Inquiries**: Add-to-bag workflow with persistent cart counts, checkout review, and live-animal availability request flows.
- **Fully Responsive**: Optimized fluid layouts from mobile (320px+) to ultra-wide desktop screens.

## Getting Started

Open `pages/index.html` directly in any modern browser, or serve locally with any standard web server:

```bash
# Using Python
python3 -m http.server 8080

# Navigate to: http://localhost:8080/pages/index.html
```

All asset sources and licenses are documented in `documentation/IMAGE-SOURCES.md` and `documentation/asset-sources.json`.
For customization guidelines, see `documentation/CUSTOMIZATION.md`.
