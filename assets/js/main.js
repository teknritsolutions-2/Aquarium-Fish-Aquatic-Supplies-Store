(() => {
  const D = window.BlueCurrentData;
  const base = location.pathname.includes("/pages/guides/")
    ? "../../"
    : location.pathname.includes("/pages/")
      ? "../"
      : "";
  const page = (p) => base + "pages/" + p;
  const asset = (path) => base + "assets/" + path;
  const money = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  const icon = (name) =>
    ({
      search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 4.5 4.5"/>',
      bag: '<path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      close: '<path d="m5 5 14 14M19 5 5 19"/>',
      arrow: '<path d="m9 18 6-6-6-6"/>',
      top: '<path d="m6 15 6-6 6 6"/>',
      fish: '<path d="M4 12c3-5 8-7 13-3l3-2v10l-3-2c-5 4-10 2-13-3Z"/><circle cx="14.5" cy="11" r=".7"/>',
      leaf: '<path d="M5 20C5 10 10 4 20 4c0 10-6 15-15 16Z"/><path d="M6 18 17 7"/>',
      tool: '<path d="m14 6 4-4 4 4-4 4M3 21l10-10 4 4L7 21H3Z"/>',
      book: '<path d="M4 5c3-1 6 0 8 2v14c-2-2-5-3-8-2V5Zm16 0c-3-1-6 0-8 2v14c2-2 5-3 8-2V5Z"/>',
    })[name];
  const svg = (n) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true">${icon(n)}</svg>`;
  const fishUrl = (f) => page("fish-details.html?id=" + f.id);
  const productUrl = (p) => page("product-details.html?id=" + p.id);
  const equipmentById = (id) => D.equipment.find((item) => item.id === id);
  const navigation = [
    {
      label: "Home",
      children: [
        { label: "Home 1", href: "index.html" },
        { label: "Home 2", href: "home2.html" },
      ],
    },
    { label: "About", href: "about.html" },
    { label: "Fish Catalog", href: "fish-catalog.html" },
    { label: "Aquatic Plants", href: "aquatic-plants.html" },
    { label: "Equipment", href: "equipment.html" },
    { label: "Care Guides", href: "care-guides.html" },
    { label: "Contact", href: "contact.html" },
  ];
  const logo = (decorative = false) =>
    `<span class="brand-lockup"><img class="brand-logo logo-light" src="${base}assets/brand/logo.svg" alt="${decorative ? "" : "BlueCurrent Aquatics"}"><img class="brand-logo logo-dark" src="${base}assets/brand/logo-white.svg" alt="${decorative ? "" : "BlueCurrent Aquatics"}"></span>`;
  const desktopNavigation = () =>
    navigation
      .map((item) =>
        item.children
          ? `<div class="nav-item"><button class="nav-toggle" aria-expanded="false">${item.label} <span aria-hidden="true">▾</span></button><div class="dropdown">${item.children.map((child) => `<a href="${page(child.href)}">${child.label}</a>`).join("")}</div></div>`
          : `<a class="nav-link" href="${page(item.href)}">${item.label}</a>`,
      )
      .join("");
  const mobileNavigation = () =>
    navigation
      .map((item) =>
        item.children
          ? `<details class="mobile-home"><summary>${item.label}</summary>${item.children.map((child) => `<a href="${page(child.href)}">${child.label}</a>`).join("")}</details>`
          : `<a href="${page(item.href)}">${item.label}</a>`,
      )
      .join("");
  function header() {
    return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-wrap"><a class="brand" href="${page("index.html")}">${logo()}</a><nav class="main-nav" aria-label="Primary">${desktopNavigation()}</nav><div class="nav-tools"><button class="btn-icon search-trigger" aria-label="Open search">${svg("search")}</button><button class="btn-icon bag-trigger" aria-label="Open shopping bag, empty">${svg("bag")}<span class="bag-count" aria-hidden="true" hidden></span></button><button class="btn-icon theme-toggle" aria-label="Switch color theme">${svg("sun")}</button><button class="direction-toggle dir-toggle" type="button" aria-label="Switch to right-to-left layout"><span data-direction-label>RTL</span></button><button class="btn-icon mobile-toggle" aria-label="Open menu">${svg("menu")}</button></div></div></header><div class="mobile-drawer" aria-hidden="true"><div class="mobile-panel" role="dialog" aria-modal="true" aria-label="Navigation"><div class="mobile-head">${logo(true)}<button class="btn-icon mobile-close" aria-label="Close menu">${svg("close")}</button></div><nav class="mobile-nav" aria-label="Mobile primary">${mobileNavigation()}</nav><div class="mobile-controls"><button class="btn btn-outline search-trigger">${svg("search")} Search</button><button class="btn btn-outline theme-toggle">${svg("sun")} Theme</button><button class="direction-toggle dir-toggle" type="button" aria-label="Switch to right-to-left layout"><span data-direction-label>RTL</span></button></div></div></div>`;
  }
  function footer() {
    return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><img src="${base}assets/brand/logo-white.svg" alt="BlueCurrent Aquatics"><p>A calm, practical marketplace for aquarium fish discovery, aquatic plants, equipment and responsible setup guidance.</p></div><div class="footer-col"><h3>Explore</h3><a href="${page("index.html")}">Home 1</a><a href="${page("home2.html")}">Home 2</a><a href="${page("fish-catalog.html")}">Fish Catalog</a><a href="${page("aquatic-plants.html")}">Aquatic Plants</a><a href="${page("equipment.html")}">Equipment</a></div><div class="footer-col"><h3>Learn</h3><a href="${page("care-guides.html")}">Care Guides</a><a href="${page("tank-planner.html")}">Tank Planner</a><a href="${page("faq.html")}">FAQ</a><a href="${page("about.html")}">About</a></div><div class="footer-col"><h3>Support</h3><a href="${page("contact.html")}">Contact</a><a href="${page("contact.html?type=special-order")}">Special Orders</a><a href="${page("shipping-returns.html")}">Shipping & Returns</a><a href="${page("contact.html#location")}">Store Location</a></div><div class="footer-col"><h3>Legal</h3><a href="${page("privacy.html")}">Privacy</a><a href="${page("terms.html")}">Terms</a></div></div><div class="footer-bottom"><span>© 2026 BlueCurrent Aquatics. All rights reserved.</span><span>Responsible fishkeeping begins with research and a cycled aquarium.</span></div></div></footer><button class="btn-icon back-top" aria-label="Back to top">${svg("top")}</button><div class="search-overlay" aria-hidden="true"><div class="search-panel" role="dialog" aria-modal="true" aria-label="Site search"><div class="overlay-head"><input class="search-input" type="search" placeholder="Search fish, plants, equipment and guides…" aria-label="Search"><button class="btn-icon overlay-close" aria-label="Close search">${svg("close")}</button></div><div class="search-results"><p class="results-info">Start typing to explore the catalog.</p></div></div></div><div class="cart-drawer" aria-hidden="true"><div class="drawer-panel"><div class="mobile-head"><h2>Your bag</h2><button class="btn-icon cart-close" aria-label="Close bag">${svg("close")}</button></div><div class="drawer-cart"></div><a class="btn btn-primary" style="width:100%;margin-top:16px" href="${page("cart.html")}">View bag</a><a class="btn btn-outline" style="width:100%;margin-top:8px" href="${page("equipment.html")}">Continue shopping</a></div></div><div class="toast" role="status" aria-live="polite"></div>`;
  }
  const pageHero = (ey, title, desc) =>
    `<section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="${page("index.html")}">Home</a><span>/</span><span>${ey}</span></div><h1>${title}</h1><p>${desc}</p></div></section>`;
  function fishCard(f, badge = "") {
    return `<article class="species-card" data-water="${f.water}" data-planted="${f.planted}"><div class="species-media"><img src="${f.image}" alt="Aquarium photography representing ${f.name}" loading="lazy"><span class="water-label">${f.water}</span>${badge ? `<span class="badge">${badge}</span>` : ""}</div><div class="species-body"><div class="species-heading"><div><h3>${f.name}</h3><div class="scientific">${f.scientific}</div></div><span class="availability">${f.available}</span></div><dl class="care-summary"><div><dt>Care</dt><dd>${f.care}</dd></div><div><dt>Minimum tank</dt><dd>${f.tank} L</dd></div><div><dt>Planted</dt><dd>${f.planted ? "Suitable" : "Check profile"}</dd></div></dl><div class="species-commerce"><span class="price">From ${money(f.price)}</span><span>Availability by enquiry</span></div><div class="species-actions"><a class="btn btn-primary btn-sm" href="${fishUrl(f)}">View care profile</a><a class="text-link" href="${page("contact.html?item=" + encodeURIComponent(f.name) + "&category=" + f.water)}">Check availability ${svg("arrow")}</a></div></div></article>`;
  }
  function speciesTile(f) {
    return `<a class="species-tile" href="${fishUrl(f)}"><img src="${f.image}" alt="Aquarium photography representing ${f.name}" loading="lazy"><span class="species-tile-shade"></span><span class="species-tile-copy"><small>${f.water} · ${f.care}</small><strong>${f.name}</strong><em>${f.scientific}</em><span>Open care profile ${svg("arrow")}</span></span></a>`;
  }
  function plantCard(p) {
    return `<article class="card plant-card"><div class="card-media" style="aspect-ratio:4/5"><img src="${p.image}" alt="Aquatic plant photography representing ${p.name}" loading="lazy"></div><div class="card-body"><div class="plant-heading"><h3>${p.name}</h3><div class="scientific">${p.scientific}</div></div><dl class="plant-facts"><div><dt>Light</dt><dd>${p.light}</dd></div><div><dt>Care</dt><dd>${p.care}</dd></div><div><dt>Placement</dt><dd>${p.placement}</dd></div></dl><div class="price-row"><span class="price">${money(p.price)}</span><span>${p.available}</span></div><div class="card-actions"><button class="btn btn-primary btn-sm add-cart" data-id="${p.id}" data-kind="plant">Add to bag</button><a class="btn btn-outline btn-sm" href="${productUrl(p)}">Details</a></div></div></article>`;
  }
  function equipmentCard(e) {
    const capacity = e.tank
      ? `<span class="chip">${e.type === "Tank" ? `${e.tank} L capacity` : `Supports up to ${e.tank} L`}</span>`
      : "";
    return `<article class="card equipment-card"><div class="card-media" style="aspect-ratio:1"><img src="${e.image}" alt="${e.name}" loading="lazy"><span class="badge">${e.type}</span></div><div class="card-body"><h3>${e.name}</h3><div class="meta">${capacity}<span class="chip">${e.type}</span></div><p class="product-spec">${e.spec}</p><div class="price-row"><span class="price">${money(e.price)}</span><span>${e.available}</span></div><div class="card-actions"><button class="btn btn-primary btn-sm add-cart" data-id="${e.id}" data-kind="equipment">Add to bag</button><a class="btn btn-outline btn-sm" href="${productUrl(e)}">Details</a></div></div></article>`;
  }
  function guideCard(g, options = {}) {
    const featured = options === true || options.featured;
    const closing = options.closing;
    const highlights = {
      "freshwater-setup": ["Prepare the system in a safe order", "Know what to verify before stocking"],
      "aquarium-cycling": ["Understand the bacteria-led cycle", "Use test results instead of a calendar"],
      "planted-tank-basics": ["Coordinate substrate, light and nutrition", "Plan for realistic maintenance"],
      "filter-maintenance": ["Protect biological media", "Restore flow without destabilizing the tank"],
      "fish-acclimation": ["Reduce avoidable introduction stress", "Observe closely after release"],
      "marine-tank-basics": ["Build around stable salinity", "Stock a mature system gradually"],
    };
    return `<article class="card article-card${featured ? " featured" : ""}${closing ? " closing" : ""}"><div class="card-media"><img src="${g.image}" alt="${g.title}" loading="lazy"><span class="badge">${g.category}</span></div><div class="card-body"><h3>${g.title}</h3><p>${g.summary}</p><div class="guide-meta"><span>${g.minutes} min read <b aria-hidden="true">·</b> Practical guide</span></div>${featured ? `<ul class="guide-highlights">${highlights[g.id].map((point) => `<li>${point}</li>`).join("")}</ul>` : ""}<a class="btn btn-outline btn-sm" href="${page("guides/" + g.id + ".html")}">Read guide</a></div></article>`;
  }
  const explorerModes = {
    Freshwater: {
      title: "A calm freshwater community",
      text: "Schooling fish, plant cover and gentle filtration create an expressive everyday aquarium.",
      image: D.fish[2].image,
      url: "fish-catalog.html?water=Freshwater",
    },
    Marine: {
      title: "A carefully paced marine world",
      text: "Stable salinity, mature filtration and deliberate stocking come before the vivid color.",
      image: D.fish[10].image,
      url: "fish-catalog.html?water=Marine",
    },
    Planted: {
      title: "A landscape led by living plants",
      text: "Layer texture from foreground to background, then select inhabitants around the aquascape.",
      image: D.plants[2].image,
      url: "fish-catalog.html?planted=true",
    },
  };
  const explorerImage = () =>
    `<div class="explorer-photo"><img data-dynamic-image src="${explorerModes.Freshwater.image}" alt="${explorerModes.Freshwater.title}"><span class="explorer-status" role="status" aria-live="polite"></span></div>`;
  function home() {
    return `<main id="main"><section class="hero"><div class="hero-media"><img src="${asset("images/home/hero-reef.jpg")}" alt="Coral reef aquarium display"><div class="light-rays"></div><div class="ocean-currents" aria-hidden="true"><i></i><i></i><i></i></div><i class="bubble"></i><i class="bubble"></i><i class="bubble"></i></div><div class="container hero-content"><span class="eyebrow" style="color:#b6e0ee">Life below the surface</span><h1>Build an aquarium worth slowing down for.</h1><p>Explore carefully presented fish, living plants and dependable equipment—supported by practical guidance for a healthier aquatic world.</p><div class="hero-actions"><a class="btn btn-primary ripple-btn" href="${page("fish-catalog.html")}">Explore Fish ${svg("arrow")}</a><a class="btn btn-secondary" href="${page("equipment.html")}">Shop Aquarium Supplies</a></div></div></section>
  <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">New to the collection</span><h2>Fresh currents, thoughtfully selected</h2><p class="lede">Recent catalog additions across livestock, plants and equipment. Availability is confirmed by enquiry for live animals.</p></div><a class="btn btn-outline" href="${page("fish-catalog.html?sort=new")}">View all arrivals</a></div><div class="grid grid-4">${D.fish
    .slice()
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 4)
    .map((f) => fishCard(f, "New listing"))
    .join("")}</div></div></section>
  <section class="section-sm"><div class="container"><div class="section-head"><div><span class="eyebrow">Find your water</span><h2>Shop by aquarium type</h2></div></div><div class="category-grid">${[
    [
      "Freshwater",
      "Quiet communities, planted banks and expressive color.",
      "fish-catalog.html?water=Freshwater",
      "freshwater-aquarium",
    ],
    [
      "Marine",
      "Reef-ready discovery for carefully planned saltwater systems.",
      "fish-catalog.html?water=Marine",
      "marine-aquarium",
    ],
    [
      "Planted Tank",
      "Plant-safe species and the tools for a thriving aquascape.",
      "fish-catalog.html?planted=true",
      "planted-aquarium",
    ],
  ]
    .map(
      (x) =>
        `<a class="category-tile" href="${page(x[2])}"><img src="${asset(`images/home/${x[3]}.jpg`)}" alt="${x[0]} aquarium"><div class="category-content"><h3>${x[0]}</h3><p>${x[1]}</p><span class="btn btn-secondary btn-sm">Explore collection</span></div></a>`,
    )
    .join("")}</div></div></section>
  <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Highlighted species</span><h2>Meet remarkable aquarium residents</h2><p class="lede">Start with care needs—not appearance alone. Each profile covers core requirements and important cautions.</p></div></div><div class="species-tile-grid">${[D.fish[3], D.fish[10], D.fish[13]].map(speciesTile).join("")}</div></div></section>
  <section class="section immersive"><div class="light-rays"></div><div class="container explorer"><div><span class="eyebrow" style="color:#b6e0ee">Aquarium explorer</span><h2>Follow the current that fits your space.</h2><p>Switch between freshwater, marine and planted collections to see a coordinated starting point.</p><div class="tabs explorer-tabs"><button class="tab active" data-mode="Freshwater">Freshwater</button><button class="tab" data-mode="Marine">Marine</button><button class="tab" data-mode="Planted">Planted</button></div><div class="explorer-copy"></div></div>${explorerImage()}</div></section>
  <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Living texture</span><h2>Plants for every layer</h2><p class="lede">Foreground carpets, resilient rhizomes and background movement selected for real aquascapes.</p></div><a class="btn btn-outline" href="${page("aquatic-plants.html")}">Shop all plants</a></div><div class="grid grid-4">${D.plants.slice(0, 4).map(plantCard).join("")}</div></div></section>
  <section class="section feature-strip"><div class="container"><div class="section-head merchandising-head"><div><span class="eyebrow">Equipment essentials</span><h2>The quiet machinery behind clear water.</h2><p class="lede">Build from the aquarium outward: appropriate filtration, controlled light, stable heat and reliable testing.</p></div><a class="btn btn-primary" href="${page("equipment.html")}">Shop equipment</a></div><div class="grid grid-4 merchandising-row">${D.equipment.slice(3, 7).map(equipmentCard).join("")}</div></div></section>
  <section class="section"><div class="container"><div class="split"><div class="split-media"><img src="${asset("images/home/planted-aquarium.jpg")}" alt="Planted freshwater aquarium setup"></div><div><span class="eyebrow">Tank setup planner</span><h2>Turn an empty tank into a considered system.</h2><p class="lede">Choose your water type, volume and experience level. The planner builds a practical hardware checklist from the same equipment catalog.</p><div class="feature-row" style="grid-template-columns:repeat(2,1fr);margin:24px 0"><div class="feature"><strong>Size-aware</strong><span>Filters equipment by volume</span></div><div class="feature"><strong>Cycle first</strong><span>Responsible setup reminders</span></div></div><a class="btn btn-primary" href="${page("tank-planner.html")}">Plan my setup</a></div></div></div></section>
  <section class="section immersive"><div class="container"><div class="section-head"><div><span class="eyebrow" style="color:#b6e0ee">Learn before stocking</span><h2>Care guides for calmer decisions</h2></div><a class="btn btn-secondary" href="${page("care-guides.html")}">All care guides</a></div><div class="grid grid-3">${D.guides
    .slice(0, 3)
    .map((g) => guideCard(g))
    .join("")}</div></div></section></main>`;
  }
  function home2() {
    return `<main id="main"><section class="editorial-hero"><img src="${asset("images/home/planted-aquarium.jpg")}" alt="Lush planted aquascape"><div class="container"><span class="eyebrow" style="color:#b6e0ee">Aquascape studio</span><h1>Compose a living landscape, one thoughtful layer at a time.</h1><p>An editorial path through glass, light, plants and inhabitants—with everything connected to the store.</p><a class="btn btn-primary" href="#scene">Explore the setup</a></div></section><section class="section" id="scene"><div class="container"><div class="section-head"><div><span class="eyebrow">Shop the scene</span><h2>A complete planted foundation</h2><p class="lede">Select a hotspot to explore the core equipment behind this calm freshwater composition.</p></div></div><div class="scene"><img src="${asset("images/home/planted-aquarium.jpg")}" alt="Complete planted aquarium scene"><a class="hotspot" style="left:17%;top:28%" href="${productUrl(equipmentById("plant-light-60"))}" aria-label="View plant light">1</a><div class="hotspot-card" style="left:20%;top:20%"><strong>Planted aquarium light</strong><br>Purposeful lighting for plant growth</div><a class="hotspot" style="right:15%;top:51%" href="${productUrl(equipmentById("hob-75"))}" aria-label="View canister filter">2</a><div class="hotspot-card" style="right:18%;top:43%"><strong>External canister filter</strong><br>Multi-stage external filtration</div><a class="hotspot" style="left:43%;bottom:13%" href="${productUrl(equipmentById("rimless-60"))}" aria-label="View aquarium">3</a><div class="hotspot-card" style="left:47%;bottom:15%"><strong>Fitted glass aquarium</strong><br>Configured 60 litre display</div></div></div></section><section class="section immersive"><div class="container explorer"><div><span class="eyebrow" style="color:#b6e0ee">Three directions</span><h2>Choose the atmosphere first.</h2><p>Your tank type changes the livestock, equipment and setup sequence. Explore a tailored starting point.</p><div class="tabs explorer-tabs"><button class="tab active" data-mode="Freshwater">Freshwater</button><button class="tab" data-mode="Marine">Marine</button><button class="tab" data-mode="Planted">Planted</button></div><div class="explorer-copy"></div></div>${explorerImage()}</div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">The arrival edit</span><h2>Newly added, gallery arranged</h2></div></div><div class="grid grid-3">${D.fish
      .slice()
      .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      .slice(0, 6)
      .map((f, i) => fishCard(f, i < 2 ? "New listing" : ""))
      .join(
        "",
      )}</div></div></section><section class="section feature-strip"><div class="container"><div class="section-head merchandising-head"><div><span class="eyebrow">Plants as architecture</span><h2>Build depth with leaf, line and negative space.</h2><p class="lede">Start with placement and maintenance appetite, then choose light and CO₂ support.</p></div><a class="btn btn-primary" href="${page("aquatic-plants.html")}">Explore aquatic plants</a></div><div class="grid grid-4 merchandising-row">${D.plants.slice(4, 8).map(plantCard).join("")}</div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Species study</span><h2>Scale, movement and temperament</h2></div></div><div class="species-tile-grid species-tile-grid-four">${[D.fish[0], D.fish[4], D.fish[10], D.fish[12]].map(speciesTile).join("")}</div></div></section><section class="section immersive"><div class="container"><div class="section-head merchandising-head"><div><span class="eyebrow" style="color:#b6e0ee">System thinking</span><h2>Good equipment disappears into the experience.</h2><p>Quiet flow, stable temperature and purposeful light support the display without stealing attention from it.</p></div><a class="btn btn-secondary" href="${page("equipment.html")}">Build your system</a></div><div class="grid grid-4 merchandising-row">${D.equipment.slice(0, 4).map(equipmentCard).join("")}</div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Studio notes</span><h2>Read, plan, then begin.</h2></div><a class="btn btn-outline" href="${page("contact.html?type=setup-help")}">Ask about a setup</a></div><div class="grid grid-3">${D.guides
      .slice(2, 5)
      .map((g) => guideCard(g))
      .join("")}</div></div></section></main>`;
  }
  function fishCatalog() {
    return `<main id="main">${pageHero("Fish Catalog", "Find a species that fits the aquarium—not just the mood.", "Browse freshwater and marine fish using practical care filters. Planted-tank-friendly indicates suitability, not guaranteed compatibility.")}<section class="section"><div class="container"><div class="toolbar"><div><strong class="catalog-count">${D.fish.length} species</strong><p class="results-info">Live-animal availability is confirmed by enquiry.</p></div><button class="btn btn-outline filter-toggle" aria-expanded="false">Show filters</button><select id="fish-sort" aria-label="Sort fish"><option value="featured">Featured</option><option value="name">Name A–Z</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option><option value="new">Newly Added</option></select></div><div class="catalog-layout"><aside class="filter-panel" aria-label="Fish filters"><div class="filter-mobile-head"><h3>Refine collection</h3><button class="btn-icon filter-close" aria-label="Close filters">${svg("close")}</button></div><div class="field"><label for="fish-search">Search species</label><input id="fish-search" type="search" placeholder="Common or scientific name"></div><div class="field"><label for="water-filter">Water type</label><select id="water-filter"><option value="">All water types</option><option>Freshwater</option><option>Marine</option></select></div><div class="field"><label for="care-filter">Care level</label><select id="care-filter"><option value="">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div><div class="field"><label for="tank-filter">Maximum minimum tank</label><select id="tank-filter"><option value="">Any tank</option><option value="55">Up to 55 L</option><option value="110">Up to 110 L</option><option value="200">Up to 200 L</option><option value="300">Up to 300 L</option></select></div><div class="field"><label class="check-control"><input id="planted-filter" type="checkbox"> <span>Planted-tank-friendly only</span></label></div><button class="btn btn-outline btn-sm" id="clear-filters">Clear filters</button><button class="btn btn-primary filter-apply">Show results</button></aside><div class="grid grid-3 catalog-grid"></div></div></div></section><section class="section-sm feature-strip"><div class="container feature-row"><div class="feature"><strong>Cycle before stocking</strong><span>Establish biological filtration first.</span></div><div class="feature"><strong>Research social needs</strong><span>Schooling and territory both matter.</span></div><div class="feature"><strong>Acclimate carefully</strong><span>Temperature and water chemistry differ.</span></div><div class="feature"><strong>Ask about availability</strong><span>Live stock is never falsely promised.</span></div></div></section></main>`;
  }
  function plants() {
    return `<main id="main">${pageHero("Aquatic Plants", "Plant the foreground. Frame the midground. Let the background move.", "Explore adaptable aquatic plants by placement, light, difficulty and growth speed. Growth always depends on water, nutrition and maintenance.")}<section class="section"><div class="container"><div class="toolbar"><div class="filter-row"><button class="filter-btn active" data-plant="All">All plants</button><button class="filter-btn" data-plant="Foreground">Foreground</button><button class="filter-btn" data-plant="Midground">Midground</button><button class="filter-btn" data-plant="Background">Background</button><button class="filter-btn" data-plant="Floating">Floating</button></div><select id="plant-sort" aria-label="Sort plants"><option value="featured">Featured</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option><option value="name">Name A–Z</option></select></div><div class="grid grid-4 plant-grid"></div></div></section><section class="section immersive"><div class="container"><div class="section-head merchandising-head"><div><span class="eyebrow" style="color:#b6e0ee">Plant care, connected</span><h2>Light is only one part of the system.</h2><p>Match plant choice to light, substrate, nutrition and your willingness to prune. CO₂ can improve growth for some species but is not a universal requirement.</p></div><a class="btn btn-secondary" href="${page("guides/planted-tank-basics.html")}">Read planted tank basics</a></div><div class="grid grid-2 plant-support-row">${D.equipment
      .filter((e) => e.type === "Lighting")
      .slice(0, 2)
      .map(equipmentCard)
      .join("")}</div></div></section></main>`;
  }
  function equipment() {
    return `<main id="main">${pageHero("Equipment", "The system behind the scenery.", "Shop aquariums, filtration and lighting first, then complete the setup with heating, testing and aquascaping tools.")}<section class="section-sm"><div class="container"><div class="filter-row equipment-tabs">${["All", "Tank", "Filter", "Lighting", "Heating", "Testing", "Aquascaping"].map((x, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-type="${x}">${x === "All" ? "All equipment" : x}</button>`).join("")}</div></div></section><section class="section" style="padding-top:20px"><div class="container"><div class="toolbar"><div><strong class="equipment-count"></strong><p class="results-info">In-store pickup and regional delivery available on all hardware.</p></div><select id="equipment-sort" aria-label="Sort equipment"><option value="featured">Featured</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option><option value="name">Name A–Z</option></select></div><div class="grid grid-4 equipment-grid"></div></div></section><section class="section feature-strip"><div class="container"><div class="section-head"><div><span class="eyebrow">Compare the essentials</span><h2>Choose for volume and purpose</h2></div></div><div class="feature-row"><div class="feature"><strong>Aquarium</strong><span>Water volume, footprint and access shape every later decision.</span></div><div class="feature"><strong>Filter</strong><span>Size for bioload and usable media, not just headline flow.</span></div><div class="feature"><strong>Light</strong><span>Match intensity and spread to the inhabitants and plants.</span></div><div class="feature"><strong>Testing</strong><span>Make water quality visible before problems become obvious.</span></div></div></div></section></main>`;
  }
  const guideSections = {
    "freshwater-setup": [
      "Freshwater Aquarium Setup for Beginners",
      [
        "Plan around the mature aquarium",
        "Rinse and arrange the hardscape",
        "Fill, condition and start equipment",
        "Cycle before adding fish",
        "Stock slowly and observe",
      ],
      [
        "Choose the aquarium around the adult size and social needs of the fish you hope to keep. Confirm the floor can support the filled system and keep it away from direct sun and unstable heat.",
        "Rinse aquarium-safe substrate and position stable rocks or wood before filling. Never use soap. Create open swimming areas as well as shelter.",
        "Fill with treated water, start the filter and heater, and check for leaks. Set a steady temperature appropriate to the planned inhabitants.",
        "A new filter does not immediately process toxic ammonia. Establish and verify the biological cycle with reliable tests before adding livestock.",
        "Add an appropriate social group or a small first stocking, then monitor ammonia and nitrite. Resist the urge to fill every visual gap at once.",
      ],
    ],
    "aquarium-cycling": [
      "Understanding the Aquarium Nitrogen Cycle",
      [
        "What the cycle does",
        "Fishless cycling",
        "Testing the process",
        "After the cycle",
      ],
      [
        "Fish waste and decaying matter release ammonia. Microbial communities convert ammonia to nitrite and then to nitrate; both ammonia and nitrite are dangerous to fish.",
        "A fishless method supplies a controlled ammonia source while the filter matures. This avoids deliberately exposing animals to toxic compounds.",
        "Use a dependable liquid test kit. A cycle is demonstrated through test results and processing capacity—not by waiting an arbitrary number of days.",
        "Continue routine testing, partial water changes and careful stocking. Preserve filter media by rinsing it in removed aquarium water rather than untreated tap water.",
      ],
    ],
    "planted-tank-basics": [
      "How to Start a Planted Aquarium",
      [
        "Start with an achievable style",
        "Balance light and nutrients",
        "Plant by growth habit",
        "Expect an adjustment period",
      ],
      [
        "Low-tech planted aquariums can be beautiful and more forgiving than high-light layouts. Choose plants that match the equipment and time you have.",
        "More light can increase demand for carbon and nutrients as well as algae pressure. Begin with a restrained photoperiod and change one variable at a time.",
        "Place low growers at the front, rosettes and rhizomes in the middle, and tall stems at the back. Keep rhizomes such as Anubias and Java fern above the substrate.",
        "Some leaves may melt after planting as a plant adapts from emersed to submerged growth. Remove failing tissue, monitor new growth and avoid constant rearrangement.",
      ],
    ],
    "filter-maintenance": [
      "Aquarium Filter Maintenance",
      [
        "Watch the flow",
        "Protect biological media",
        "Stagger deeper cleaning",
        "Restart safely",
      ],
      [
        "Reduced output, trapped debris or unusual noise can signal that service is due. Follow the manufacturer’s instructions for impeller access.",
        "Beneficial microbes colonize filter media. Gently rinse reusable media in water removed from the aquarium; avoid replacing all biological media at once.",
        "Clean different components on different days when possible. Replace chemical media only when its intended service life is complete.",
        "Prime external filters correctly, restore flow and check every seal. Confirm temperature and circulation after maintenance.",
      ],
    ],
    "fish-acclimation": [
      "Introducing and Acclimating New Fish",
      [
        "Prepare before collection",
        "Match temperature carefully",
        "Limit transfer water",
        "Observe after release",
      ],
      [
        "A cycled, stable aquarium should be ready before the fish arrives. Dim the lights and make sure aggressive residents are not dominating every refuge.",
        "Float a closed bag briefly to reduce temperature difference. Water-chemistry acclimation should be deliberate but not so prolonged that bag water quality deteriorates.",
        "Transfer the animal with appropriate equipment and avoid adding transport water to the display when practical. Use a quarantine process suited to your experience and species.",
        "Keep lighting low, offer food modestly and watch respiration, balance and social behavior. Contact a qualified aquatic veterinarian for persistent health concerns.",
      ],
    ],
    "marine-tank-basics": [
      "Marine Aquarium Basics",
      [
        "Build for stability",
        "Mix and measure saltwater",
        "Cycle patiently",
        "Stock around a plan",
      ],
      [
        "Larger water volume changes more slowly and often gives beginners more margin. Use marine-safe equipment, circulation and a reliable method of salinity measurement.",
        "Mix marine salt with purified water according to the manufacturer’s directions, outside the stocked aquarium. Match temperature and salinity during water changes.",
        "Marine systems require an established biological cycle just as freshwater systems do. Live rock can contribute habitat and filtration, but test results still guide readiness.",
        "Research adult size, feeding ecology, territory and invertebrate interactions. A reef-safe label is a tendency, never a guarantee for every individual.",
      ],
    ],
  };
  function careGuides() {
    return `<main id="main">${pageHero("Care Guides", "Better aquariums begin with better questions.", "Original, practical reading on setup, water quality, planted tanks, maintenance and responsible fish introductions.")}<section class="section"><div class="container"><div class="toolbar guides-toolbar"><div class="filter-row guide-filters"><button class="filter-btn active" data-guide="All">All</button>${[...new Set(D.guides.map((g) => g.category))].map((x) => `<button class="filter-btn" data-guide="${x}">${x}</button>`).join("")}</div><div class="guide-search-wrap"><input id="guide-search" class="search-input" type="search" placeholder="Search care guides…" aria-label="Search care guides"></div></div><div class="article-grid guides-grid">${D.guides.map((g, i, all) => guideCard(g, { featured: i === 0, closing: i === all.length - 1 })).join("")}</div></div></section><section class="section feature-strip"><div class="container split split-cta"><div><span class="eyebrow">Need a practical starting point?</span><h2>Turn reading into an equipment checklist.</h2><p class="lede">The planner connects aquarium type and volume to suitable hardware, while keeping cycling and husbandry decisions explicit.</p></div><a class="btn btn-primary" href="${page("tank-planner.html")}">Open tank planner</a></div></section></main>`;
  }
  function guide(id) {
    const g = D.guides.find((x) => x.id === id) || D.guides[0],
      data = guideSections[id] || guideSections["freshwater-setup"];
    return `<main id="main">${pageHero(g.category, data[0], g.summary)}<section class="section"><div class="container"><article class="article"><div class="hero-image"><img src="${g.image}" alt="${g.title}"></div><p class="lede">A stable aquarium is built through planning, observation and gradual change. This guide explains the working principles without pretending that every species or water supply is identical.</p>${data[1].map((h, i) => `<h2>${i + 1}. ${h}</h2><p>${data[2][i]}</p>`).join("")}<aside><strong>Responsible-care note</strong><p>Use this guide as a foundation, then verify the needs of each species and product you select. When an animal is unwell, seek an appropriately qualified aquatic veterinarian.</p></aside><h2>Useful next steps</h2><ul><li><a href="${page("tank-planner.html")}">Build a setup checklist</a></li><li><a href="${page("fish-catalog.html")}">Compare species requirements</a></li><li><a href="${page("contact.html?type=care-question")}">Ask the store a care question</a></li></ul></article></div></section></main>`;
  }
  function fishDetail() {
    const id = new URLSearchParams(location.search).get("id"),
      f = D.fish.find((x) => x.id === id) || D.fish[0];
    return `<main id="main">${pageHero(f.water, "Species care profile", "Use this profile as a responsible starting point; individual care requirements and source recommendations can vary.")}<section class="section"><div class="container product-detail"><div class="detail-media"><img src="${f.image}" alt="Aquarium photography representing ${f.name}"></div><div class="detail-copy"><span class="eyebrow">${f.water} species</span><h2>${f.name}</h2><div class="scientific">${f.scientific}</div><div class="detail-price">From ${money(f.price)}</div><p>${f.notes}</p><div class="spec-grid species-specs ${f.salinity ? "specs-nine" : "specs-eight"}"><div class="spec"><span>Adult size</span><strong>Approx. ${f.size} cm</strong></div><div class="spec"><span>Suggested minimum</span><strong>${f.tank} litres</strong></div><div class="spec"><span>Temperature</span><strong>${f.temp}</strong></div><div class="spec"><span>Typical pH</span><strong>${f.ph}</strong></div>${f.salinity ? `<div class="spec"><span>Salinity</span><strong>${f.salinity}</strong></div>` : ""}<div class="spec"><span>Temperament</span><strong>${f.temperament}</strong></div><div class="spec"><span>Diet</span><strong>${f.diet}</strong></div><div class="spec"><span>Experience</span><strong>${f.care}</strong></div><div class="spec"><span>Lifespan</span><strong>${f.lifespan}</strong></div></div><div class="notice">Availability is confirmed by enquiry. This does not place or reserve a live-animal order.</div><div class="card-actions"><a class="btn btn-primary" href="${page("contact.html?item=" + encodeURIComponent(f.name) + "&category=" + f.water + "&type=availability")}">Request availability</a><a class="btn btn-outline" href="${page("fish-catalog.html")}">Back to catalog</a></div></div></div></section><section class="section feature-strip"><div class="container"><div class="section-head"><div><span class="eyebrow">Care approach</span><h2>Acclimate slowly. Observe closely.</h2></div></div><div class="feature-row"><div class="feature"><strong>Cycle first</strong><span>Only introduce livestock to a demonstrably cycled aquarium.</span></div><div class="feature"><strong>Match water</strong><span>Minimize temperature and chemistry differences.</span></div><div class="feature"><strong>Respect behavior</strong><span>Social group, territory and cover affect welfare.</span></div><div class="feature"><strong>Feed appropriately</strong><span>Use varied foods suitable for the species.</span></div></div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Related species</span><h2>Continue researching</h2></div></div><div class="grid grid-3">${D.fish
      .filter((x) => x.water === f.water && x.id !== f.id)
      .slice(0, 3)
      .map(fishCard)
      .join("")}</div></div></section></main>`;
  }
  function productDetail() {
    const id = new URLSearchParams(location.search).get("id"),
      p =
        [...D.equipment, ...D.plants].find((x) => x.id === id) ||
        D.equipment[0],
      isPlant = !!p.scientific;
    return `<main id="main">${pageHero(isPlant ? "Aquatic Plants" : p.type, isPlant ? "Living detail" : "Equipment detail", "Review specifications, tank requirements and care notes before adding this item to your bag.")}<section class="section"><div class="container product-detail"><div class="detail-media"><img src="${p.image}" alt="${p.name}"></div><div class="detail-copy"><span class="eyebrow">${isPlant ? p.placement : p.type}</span><h2>${p.name}</h2>${isPlant ? `<div class="scientific">${p.scientific}</div>` : ""}<div class="detail-price">${money(p.price)}</div><p>${isPlant ? "A living aquarium plant selected for aquascape structure. Match its light, nutrition and placement needs to your system." : p.spec + ". Match every component to the real aquarium volume, inhabitants and manufacturer guidance."}</p><div class="spec-grid product-specs ${isPlant || p.tank ? "specs-four" : "specs-three"}">${isPlant ? `<div class="spec"><span>Light</span><strong>${p.light}</strong></div><div class="spec"><span>Difficulty</span><strong>${p.care}</strong></div><div class="spec"><span>Placement</span><strong>${p.placement}</strong></div><div class="spec"><span>CO₂</span><strong>${p.co2}</strong></div>` : `<div class="spec"><span>Category</span><strong>${p.type}</strong></div>${p.tank ? `<div class="spec"><span>${p.type === "Tank" ? "Capacity" : "Suggested upper volume"}</span><strong>${p.tank} L</strong></div>` : ""}<div class="spec"><span>Key specification</span><strong>${p.spec}</strong></div><div class="spec"><span>Availability</span><strong>${p.available}</strong></div>`}</div><div class="notice">Product specifications and inclusions are verified with authorized brand distributors.</div><div class="card-actions"><button class="btn btn-primary add-cart" data-id="${p.id}" data-kind="${isPlant ? "plant" : "equipment"}">Add to bag</button><a class="btn btn-outline" href="${page(isPlant ? "aquatic-plants.html" : "equipment.html")}">Back to collection</a></div></div></div></section></main>`;
  }
  function planner() {
    return `<main id="main">${pageHero("Tank Planner", "Plan the system before you plan the fish.", "Build a size-aware starter checklist for freshwater, planted freshwater or marine aquariums. This is a planning aid, not a husbandry guarantee.")}<section class="section"><div class="container planner"><form class="planner-form" id="planner-form"><h2 style="font-size:1.6rem">Your aquarium</h2><div class="field"><label for="plan-type">Tank type</label><select id="plan-type"><option value="Freshwater">Freshwater</option><option value="Planted">Planted freshwater</option><option value="Marine">Marine</option></select></div><div class="field"><label for="plan-volume">Desired volume (litres)</label><input id="plan-volume" type="number" min="20" max="500" value="60"></div><div class="field"><label for="plan-level">Experience level</label><select id="plan-level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div><div class="field"><label for="plan-pref">Setup preference</label><select id="plan-pref"><option value="Community">Calm community</option><option value="Display">Display aquascape</option><option value="Species">Species-focused</option></select></div><button class="btn btn-outline" type="reset">Reset</button></form><div class="planner-results"><span class="eyebrow">Suggested foundation</span><h2 style="font-size:1.8rem">Your equipment checklist</h2><div class="planner-summary"><p class="results-info planner-note"></p><strong class="planner-count" aria-live="polite"></strong></div><div class="checklist"></div><button class="btn btn-primary planner-add">Add selected hardware to bag</button><div class="notice" style="margin-top:18px">Cycle and test the aquarium before adding animals. Marine and freshwater requirements are not interchangeable.</div></div></div></section></main>`;
  }
  function about() {
    const pathways = [
      ["Choose the water", "Compare freshwater and marine starting points.", "fish-catalog.html"],
      ["Build the habitat", "Match plants and equipment to the intended system.", "aquatic-plants.html"],
      ["Learn before stocking", "Use practical guides to prepare, cycle and maintain.", "care-guides.html"],
    ];
    return `<main id="main">${pageHero("About", "Aquariums reward curiosity, patience and close observation.", "BlueCurrent Aquatics is a configurable storefront concept built around responsible discovery—not invented claims about a real company.")}<section class="section about-story"><div class="container split"><div class="split-media editorial-photo"><img src="${asset("images/about/aquarium-gallery.jpg")}" alt="Large public aquarium display"></div><div><span class="eyebrow">Our point of view</span><h2>A store should help you say “not yet.”</h2><p class="lede">The most useful aquarium advice sometimes delays a purchase. We organize fish, plants and equipment around requirements, so beauty never outruns readiness.</p><p>Every profile begins with the mature animal and the complete habitat: adult size, social needs, water type, filtration, planting and the keeper’s real maintenance capacity.</p><blockquote>Good aquarium retail makes the next decision clearer—even when the right decision is to wait.</blockquote></div></div></section><section class="section immersive"><div class="container guidance-layout"><div><span class="eyebrow" style="color:#b6e0ee">A guided path</span><h2>Move from inspiration to a workable system.</h2><p>Use the store as a connected field guide. Start broad, check requirements, then ask for help where your setup is specific.</p><a class="btn btn-secondary" href="${page("contact.html?type=setup-help")}">Ask for setup guidance</a></div><div class="guidance-links">${pathways.map((x, i) => `<a href="${page(x[2])}"><span>0${i + 1}</span><strong>${x[0]}</strong><small>${x[1]}</small>${svg("arrow")}</a>`).join("")}</div></div></section><section class="section"><div class="container split"><div><span class="eyebrow">Responsible retail</span><h2>No magic shortcuts. No guaranteed compatibility.</h2><p class="lede">Every aquarium is shaped by water chemistry, maintenance, space and individual animal behavior. Our tools are designed to prompt better research and better questions.</p><div class="cta-pair"><a class="btn btn-primary" href="${page("care-guides.html")}">Start learning</a><a class="btn btn-outline" href="${page("contact.html")}">Contact the store</a></div></div><div class="split-media editorial-photo"><img src="${asset("images/home/planted-aquarium.jpg")}" alt="Balanced planted freshwater aquarium"></div></div></section></main>`;
  }
  function contact() {
    return `<main id="main">${pageHero("Contact", "Ask about a species, product or complete setup.", "Visit our store or get in touch regarding livestock availability, custom setups and equipment orders.")}<section class="section"><div class="container split"><div class="location-card" id="location"><span class="eyebrow">Store location</span><h2 style="font-size:1.8rem">Visit BlueCurrent Aquatics</h2><p class="lede">42 Marine Parade, Harbor District<br>Open Mon–Sat 9:30 AM – 6:00 PM, Sun 10:00 AM – 4:00 PM</p><div class="notice">Specialist livestock consultation available in-store. Online enquiries answered within 24 hours.</div></div><div><span class="eyebrow">Before you enquire</span><h2>Useful details make a useful reply.</h2><p class="lede">For livestock, include your aquarium volume, water type and current inhabitants. For equipment, include the tank dimensions and model where possible.</p><div class="feature-row" style="grid-template-columns:1fr 1fr"><div class="feature"><strong>Live animals</strong><span>Requests confirm interest, not a reservation.</span></div><div class="feature"><strong>Products</strong><span>Pickup and direct shipping available on all hardware.</span></div></div></div></div></section><section class="section feature-strip"><div class="container"><div class="section-head"><div><span class="eyebrow">Special order enquiry</span><h2>Tell us what you’re looking for.</h2><p class="lede">Looking for a rare species or specific tank setup? Let our aquatics team know and we’ll check availability with our specialist suppliers.</p></div></div><form class="form-card" id="contact-form"><div class="grid grid-2"><div class="field"><label for="name">Name *</label><input id="name" name="name" required autocomplete="name"></div><div class="field"><label for="email">Email *</label><input id="email" name="email" type="email" required autocomplete="email"></div><div class="field"><label for="phone">Phone (optional)</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div><div class="field"><label for="enquiry-type">Enquiry type *</label><select id="enquiry-type" name="type" required><option value="">Select</option><option value="availability">Availability</option><option value="special-order">Special order</option><option value="setup-help">Setup help</option><option value="care-question">Care question</option></select></div><div class="field"><label for="item">Product or species name *</label><input id="item" name="item" required></div><div class="field"><label for="category">Category *</label><select id="category" name="category" required><option value="">Select</option><option>Freshwater</option><option>Marine</option><option>Plants</option><option>Equipment</option></select></div><div class="field"><label for="quantity">Quantity *</label><input id="quantity" name="quantity" type="number" min="1" value="1" required></div><div class="field"><label for="method">Preferred contact *</label><select id="method" name="method" required><option>Email</option><option>Phone</option></select></div><div class="field"><label for="tank-type">Desired tank type</label><select id="tank-type" name="tank-type"><option value="">Not specified</option><option>Freshwater</option><option>Marine</option><option>Planted freshwater</option></select></div><div class="field"><label for="tank-size">Approximate tank size</label><input id="tank-size" name="tank-size" placeholder="e.g. 120 litres"></div></div><div class="field" style="margin-top:16px"><label for="message">Message *</label><textarea id="message" name="message" required></textarea></div><label style="display:flex;gap:10px;margin:16px 0"><input type="checkbox" required> I agree that these details may be used to respond to my enquiry.</label><button class="btn btn-primary" type="submit">Prepare enquiry</button><p class="results-info form-status" aria-live="polite"></p></form></div></section></main>`;
  }
  function cart() {
    return `<main id="main">${pageHero("Shopping Bag", "Your aquarium essentials, gathered.", "Review quantities and configured prices. Live animals use the separate availability enquiry flow.")}<section class="section"><div class="container cart-layout"><div class="cart-list"></div><aside class="summary"><h3>Order summary</h3><div class="summary-row"><span>Subtotal</span><strong class="cart-subtotal">$0.00</strong></div><p style="margin-top:14px;color:#c5dce4">Standard shipping and taxes calculated at final confirmation.</p><a class="btn btn-secondary" href="${page("checkout.html")}">Continue to checkout</a><a class="btn btn-outline" style="color:#fff;border-color:#537181" href="${page("equipment.html")}">Continue shopping</a></aside></div></section></main>`;
  }
  function checkout() {
    return `<main id="main">${pageHero("Checkout", "Order Details & Collection", "Confirm your order details below for store collection or scheduled courier delivery.")}<section class="section"><div class="container planner"><form class="form-card" id="checkout-form"><h2 style="font-size:1.6rem;margin-bottom:20px">Contact and collection details</h2><div class="grid grid-2"><div class="field"><label for="co-name">Name *</label><input id="co-name" required autocomplete="name"></div><div class="field"><label for="co-email">Email *</label><input id="co-email" type="email" required autocomplete="email"></div></div><div class="field" style="margin-top:16px"><label for="co-note">Order notes</label><textarea id="co-note" placeholder="Tank model, collection question or product query"></textarea></div><div class="notice" style="margin:18px 0">Orders are confirmed by our team prior to dispatch. Payment can be settled in-store or upon delivery.</div><button class="btn btn-primary" type="submit">Review next steps</button><p class="form-status" aria-live="polite"></p></form><aside class="summary"><h3>Bag summary</h3><div class="checkout-items"></div><div class="summary-row"><span>Subtotal</span><strong class="cart-subtotal">$0.00</strong></div></aside></div></section></main>`;
  }
  const policies = {
    faq: [
      "Frequently asked questions",
      "Practical answers for planning, stocking and supporting an aquarium.",
    ],
    shipping: [
      "Shipping & Returns",
      "Safe transit protocols for livestock, plants, and aquatic equipment.",
    ],
    privacy: [
      "Privacy Policy",
      "How BlueCurrent Aquatics protects and handles your personal information.",
    ],
    terms: [
      "Terms of Service",
      "Standard terms governing store orders, stock reservations and care advice.",
    ],
  };
  function policy(kind) {
    const p = policies[kind];
    let body = "";
    if (kind === "faq") {
      body = `<div class="accordion">${[
        [
          "How do I choose between freshwater and marine?",
          "Freshwater systems are often simpler and less costly to begin, while marine aquariums require salinity control and usually more patience. Choose around your maintenance capacity and desired inhabitants.",
        ],
        [
          "Can fish be added on setup day?",
          "No. Establish and verify the nitrogen cycle before adding fish. The time needed varies, so test results—not a calendar—determine readiness.",
        ],
        [
          "Does peaceful mean compatible?",
          "No. Water type, temperature, size, diet, territory and social needs must also align, and individual behavior varies.",
        ],
        [
          "What does planted-tank-friendly mean?",
          "It flags fish that are generally considered suitable around live plants. It does not mean every listed fish can share one aquarium.",
        ],
        [
          "Are live fish shipped?",
          "Live fish are available for reserved in-store pickup or specialized local climate-controlled courier to ensure animal welfare.",
        ],
        [
          "Can you special-order equipment or species?",
          "Yes. Submit a special order enquiry with your target species or hardware model and our team will check availability with our network.",
        ],
        [
          "What filter size do I need?",
          "Consider real water volume, bioload, media capacity and flow tolerance. Manufacturer ratings are a starting point, not the entire decision.",
        ],
        [
          "Can I return livestock?",
          "For biosecurity and animal welfare, livestock cannot be returned once added to your tank. We offer an arrive-alive guarantee upon pickup.",
        ],
      ]
        .map(
          (x) => `<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`,
        )
        .join("")}</div>`;
    } else {
      const copy =
        kind === "shipping"
          ? [
              [
                "Shipping & Delivery",
                "Dry goods and equipment ship via trackable ground couriers across all regional service areas. Orders placed before 1:00 PM are dispatched next business day.",
              ],
              [
                "Livestock Transit & Collection",
                "To protect animal welfare, live fish and sensitive invertebrates require specialized temperature-controlled delivery or priority in-store pickup with advance notice.",
              ],
              [
                "Returns & Arrive-Alive Guarantee",
                "Equipment and dry goods can be returned unopened within 30 days. Live animals are guaranteed healthy upon handover; please report any concerns with photos within 2 hours of receipt.",
              ],
            ]
          : kind === "privacy"
            ? [
                [
                  "Information We Collect",
                  "We store your preferences (such as theme and tank planner selections) locally in your browser and collect contact information only to fulfill enquiries and orders.",
                ],
                [
                  "How Information Is Used",
                  "Your details are used strictly to communicate regarding your orders, stock requests, and customer support. We never sell or share customer data with third-party advertisers.",
                ],
                [
                  "Your Privacy Rights",
                  "You may request deletion or review of your stored contact details at any time by reaching out via our contact page.",
                ],
              ]
            : [
                [
                  "Store Policies & Orders",
                  "Product pricing and livestock availability are subject to inventory confirmation. We strive for accuracy across all specifications and dimensions.",
                ],
                [
                  "Husbandry & Educational Guidance",
                  "Care sheets, compatibility notes, and setup guides are educational resources. Individual aquarium parameters, chemistry, and fish temperaments may vary.",
                ],
                [
                  "Order Confirmation & Modification",
                  "Orders may be modified or cancelled prior to dispatch by contacting customer support. Specialized orders may require deposit confirmation.",
                ],
              ];
      body = copy
        .map((x) => `<h2>${x[0]}</h2><p>${x[1]}</p>`)
        .join("");
    }
    return `<main id="main">${pageHero(p[0], p[0], p[1])}<section class="section"><div class="container policy">${body}</div></section></main>`;
  }
  function coming() {
    return `<main id="main">${pageHero("Coming Soon", "A new current is forming.", "This page is reserved for a future collection or service—without a fabricated countdown.")}<section class="section"><div class="container" style="text-align:center"><h2>Explore what is already available</h2><p class="lede" style="margin:16px auto 24px">Browse species, plants, equipment and complete care guides while the next collection is prepared.</p><a class="btn btn-primary" href="${page("fish-catalog.html")}">Explore fish catalog</a></div></section></main>`;
  }
  function notFound() {
    return `<main id="main">${pageHero("404", "This current leads somewhere else.", "The page may have moved, but the aquarium is still close by.")}<section class="section"><div class="container" style="text-align:center"><a class="btn btn-primary" href="${page("index.html")}">Return home</a> <a class="btn btn-outline" href="${page("fish-catalog.html")}">Browse fish</a></div></section></main>`;
  }
  const renderers = {
    home,
    home2,
    "fish-catalog": fishCatalog,
    "fish-details": fishDetail,
    plants,
    equipment,
    "product-details": productDetail,
    "care-guides": careGuides,
    guide: () => guide(document.body.dataset.guide),
    planner,
    about,
    contact,
    cart,
    checkout,
    faq: () => policy("faq"),
    shipping: () => policy("shipping"),
    privacy: () => policy("privacy"),
    terms: () => policy("terms"),
    "coming-soon": coming,
    404: notFound,
  };
  document.body.insertAdjacentHTML("afterbegin", header());
  const mount = document.getElementById("app");
  mount.innerHTML = (renderers[document.body.dataset.page] || notFound)();
  document.body.insertAdjacentHTML("beforeend", footer());

  let cartData = JSON.parse(localStorage.getItem("bc-cart") || "[]");
  const allProducts = [
    ...D.equipment.map((x) => ({ ...x, kind: "equipment" })),
    ...D.plants.map((x) => ({ ...x, kind: "plant" })),
  ];
  const persist = () => {
    localStorage.setItem("bc-cart", JSON.stringify(cartData));
    renderCart();
  };
  const toast = (msg) => {
    const t = document.querySelector(".toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  };
  function addCart(id) {
    const found = allProducts.find((x) => x.id === id);
    if (!found) return;
    const row = cartData.find((x) => x.id === id);
    row ? row.qty++ : cartData.push({ id, qty: 1 });
    persist();
    toast(`${found.name} added to bag`);
  }
  function cartRows(compact = false) {
    if (!cartData.length)
      return '<div class="empty"><h3>Your bag is empty</h3><p>Equipment and aquatic plants can be added from their collections.</p></div>';
    return cartData
      .map((row) => {
        const p = allProducts.find((x) => x.id === row.id);
        if (!p) return "";
        return `<article class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><span class="results-info">${money(p.price)} each</span></div>${compact ? "" : `<div class="cart-controls"><div class="qty"><button data-cart="minus" data-id="${p.id}" aria-label="Decrease quantity">−</button><strong>${row.qty}</strong><button data-cart="plus" data-id="${p.id}" aria-label="Increase quantity">+</button></div><button class="btn btn-outline btn-sm cart-remove" data-cart="remove" data-id="${p.id}" aria-label="Remove ${p.name} from bag">Remove</button></div>`}</article>`;
      })
      .join("");
  }
  function renderCart() {
    const total = cartData.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll(".bag-count").forEach((count) => {
      count.textContent = total ? String(total) : "";
      count.hidden = total === 0;
    });
    document.querySelectorAll(".bag-trigger").forEach((trigger) => {
      trigger.setAttribute(
        "aria-label",
        total
          ? `Open shopping bag, ${total} ${total === 1 ? "item" : "items"}`
          : "Open shopping bag, empty",
      );
    });
    document.querySelectorAll(".cart-subtotal").forEach(
      (x) =>
        (x.textContent = money(
          cartData.reduce((s, row) => {
            const p = allProducts.find((x) => x.id === row.id);
            return s + (p ? p.price * row.qty : 0);
          }, 0),
        )),
    );
    document
      .querySelectorAll(".cart-list")
      .forEach((x) => (x.innerHTML = cartRows()));
    document
      .querySelectorAll(".drawer-cart")
      .forEach((x) => (x.innerHTML = cartRows()));
    document
      .querySelectorAll(".checkout-items")
      .forEach((x) => (x.innerHTML = cartRows(true)));
  }
  function openEl(sel, on) {
    const e = document.querySelector(sel);
    if (!e) return;
    if (on) e._returnFocus = document.activeElement;
    e.classList.toggle("open", on);
    e.setAttribute("aria-hidden", String(!on));
    document.body.classList.toggle("menu-open", on);
    if (on) setTimeout(() => e.querySelector("input,button,a")?.focus(), 20);
    else e._returnFocus?.focus?.();
  }
  document.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (
        !(image instanceof HTMLImageElement) ||
        image.hasAttribute("data-dynamic-image")
      )
        return;
      const failedSource = image.currentSrc || image.src;
      if (image.dataset.failedSource === failedSource) return;
      image.dataset.failedSource = failedSource;
      image.hidden = true;
      if (!image.parentElement?.querySelector(":scope > .image-fallback")) {
        const fallback = document.createElement("span");
        fallback.className = "image-fallback";
        fallback.textContent = "Image unavailable";
        image.parentElement?.append(fallback);
      }
    },
    true,
  );
  document.addEventListener(
    "load",
    (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;
      image.hidden = false;
      delete image.dataset.failedSource;
      image.parentElement
        ?.querySelectorAll(":scope > .image-fallback")
        .forEach((fallback) => fallback.remove());
    },
    true,
  );
  document.addEventListener("click", (e) => {
    const add = e.target.closest(".add-cart");
    if (add) addCart(add.dataset.id);
    if (e.target.closest(".search-trigger")) openEl(".search-overlay", true);
    if (
      e.target.closest(".overlay-close") ||
      e.target.classList.contains("search-overlay")
    )
      openEl(".search-overlay", false);
    if (e.target.closest(".bag-trigger")) openEl(".cart-drawer", true);
    if (
      e.target.closest(".cart-close") ||
      e.target.classList.contains("cart-drawer")
    )
      openEl(".cart-drawer", false);
    if (e.target.closest(".mobile-toggle")) openEl(".mobile-drawer", true);
    if (
      e.target.closest(".mobile-close") ||
      e.target.classList.contains("mobile-drawer")
    )
      openEl(".mobile-drawer", false);
    const c = e.target.closest("[data-cart]");
    if (c) {
      const row = cartData.find((x) => x.id === c.dataset.id);
      if (c.dataset.cart === "plus") row.qty++;
      if (c.dataset.cart === "minus") row.qty--;
      if (c.dataset.cart === "remove" || row.qty < 1)
        cartData = cartData.filter((x) => x.id !== c.dataset.id);
      persist();
    }
    const rb = e.target.closest(".ripple-btn");
    if (rb) {
      const s = document.createElement("span"),
        r = rb.getBoundingClientRect(),
        size = Math.max(r.width, r.height);
      s.className = "ripple";
      s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      rb.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  });
  document.querySelectorAll(".theme-toggle").forEach((b) =>
    b.addEventListener("click", () => {
      const t =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = t;
      localStorage.setItem("bc-theme", t);
    }),
  );
  const syncDirectionToggles = () => {
    const current = document.documentElement.dir === "rtl" ? "rtl" : "ltr";
    const next = current === "rtl" ? "LTR" : "RTL";
    document.querySelectorAll(".dir-toggle").forEach((button) => {
      button.querySelector("[data-direction-label]").textContent = next;
      button.setAttribute(
        "aria-label",
        `Switch to ${next === "RTL" ? "right-to-left" : "left-to-right"} layout`,
      );
    });
  };
  document.querySelectorAll(".dir-toggle").forEach((button) =>
    button.addEventListener("click", () => {
      const direction =
        document.documentElement.dir === "rtl" ? "ltr" : "rtl";
      document.documentElement.dir = direction;
      localStorage.setItem("bc-dir", direction);
      syncDirectionToggles();
    }),
  );
  syncDirectionToggles();
  addEventListener(
    "scroll",
    () => {
      document
        .querySelector(".site-header")
        .classList.toggle("scrolled", scrollY > 15);
      document
        .querySelector(".back-top")
        .classList.toggle("show", scrollY > 500);
    },
    { passive: true },
  );
  document.querySelector(".back-top").onclick = () =>
    scrollTo({ top: 0, behavior: "smooth" });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      [".search-overlay", ".cart-drawer", ".mobile-drawer"].forEach((s) =>
        openEl(s, false),
      );
      document
        .querySelectorAll(".nav-item.open")
        .forEach((x) => x.classList.remove("open"));
      const filterPanel = document.querySelector(".filter-panel.open");
      if (filterPanel) {
        filterPanel.classList.remove("open");
        document
          .querySelector(".filter-toggle")
          ?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
        document.querySelector(".filter-toggle")?.focus();
      }
    }
    if (e.key === "Tab") {
      const activeLayer = document.querySelector(
        ".search-overlay.open, .cart-drawer.open, .mobile-drawer.open, .filter-panel.open",
      );
      if (!activeLayer) return;
      const focusable = [
        ...activeLayer.querySelectorAll(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => node.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  document.querySelector(".nav-toggle")?.addEventListener("click", (e) => {
    const n = e.target.closest(".nav-item");
    n.classList.toggle("open");
    e.target.setAttribute(
      "aria-expanded",
      String(n.classList.contains("open")),
    );
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item"))
      document.querySelector(".nav-item")?.classList.remove("open");
  });
  const searchInput = document.querySelector(".search-overlay .search-input");
  searchInput?.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase(),
      box = document.querySelector(".search-results");
    if (!q) {
      box.innerHTML =
        '<p class="results-info">Start typing to explore the catalog.</p>';
      return;
    }
    const results = [
      ...D.fish.map((x) => ({ ...x, group: "Fish", url: fishUrl(x) })),
      ...D.plants.map((x) => ({ ...x, group: "Plants", url: productUrl(x) })),
      ...D.equipment.map((x) => ({
        ...x,
        group: "Equipment",
        url: productUrl(x),
      })),
      ...D.guides.map((x) => ({
        ...x,
        name: x.title,
        group: "Care guide",
        url: page("guides/" + x.id + ".html"),
      })),
    ]
      .filter((x) =>
        (x.name + " " + (x.scientific || "") + " " + x.group)
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 9);
    box.innerHTML = results.length
      ? results
          .map(
            (x) =>
              `<a class="search-result" href="${x.url}"><img src="${x.image}" alt=""><span><strong>${x.name}</strong><small style="display:block;color:var(--muted)">${x.group}</small></span>${svg("arrow")}</a>`,
          )
          .join("")
      : '<div class="empty">No matching fish, plants, equipment or guides.</div>';
  });
  function initExplorer() {
    document.querySelectorAll(".explorer").forEach((ex) => {
      const update = (m) => {
        const x = explorerModes[m];
        ex.querySelector(".explorer-copy").innerHTML =
          `<h3>${x.title}</h3><p>${x.text}</p><a class="btn btn-secondary" href="${page(x.url)}">Explore ${m.toLowerCase()}</a>`;
        const im = ex.querySelector(".explorer-photo img");
        const status = ex.querySelector(".explorer-status");
        ex.querySelectorAll(".tab").forEach((tab) => {
          const active = tab.dataset.mode === m;
          tab.classList.toggle("active", active);
          tab.setAttribute("aria-pressed", String(active));
        });
        if (im.getAttribute("src") === x.image) {
          im.alt = x.title;
          status.textContent = "";
          return;
        }
        const preload = new Image();
        status.textContent = `Loading ${m.toLowerCase()} view…`;
        preload.onload = () => {
          im.classList.add("is-changing");
          requestAnimationFrame(() => {
            im.src = x.image;
            im.alt = x.title;
            im.hidden = false;
            im.parentElement
              ?.querySelectorAll(":scope > .image-fallback")
              .forEach((fallback) => fallback.remove());
            requestAnimationFrame(() => im.classList.remove("is-changing"));
          });
          status.textContent = "";
        };
        preload.onerror = () => {
          status.textContent = `${m} preview unavailable. Current image preserved.`;
        };
        preload.src = x.image;
      };
      ex.querySelectorAll(".tab").forEach(
        (t) => (t.onclick = () => update(t.dataset.mode)),
      );
      update("Freshwater");
    });
  }
  function initCustomSelect(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel || sel.dataset.customized) return;
    sel.dataset.customized = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "custom-select";
    sel.parentNode.insertBefore(wrapper, sel);
    wrapper.appendChild(sel);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "custom-select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", sel.getAttribute("aria-label") || "Sort options");

    const triggerText = document.createElement("span");
    triggerText.className = "custom-select-text";

    const arrow = document.createElement("span");
    arrow.className = "custom-select-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

    trigger.appendChild(triggerText);
    trigger.appendChild(arrow);
    wrapper.appendChild(trigger);

    const menu = document.createElement("div");
    menu.className = "custom-select-menu";
    menu.setAttribute("role", "listbox");
    wrapper.appendChild(menu);

    const checkSvg = `<svg class="custom-select-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

    const syncFromSelect = () => {
      const selectedOption = sel.options[sel.selectedIndex] || sel.options[0];
      triggerText.textContent = selectedOption ? selectedOption.text : "";
      menu.querySelectorAll(".custom-select-option").forEach((optBtn) => {
        const isSel = optBtn.dataset.value === sel.value;
        optBtn.classList.toggle("selected", isSel);
        optBtn.setAttribute("aria-selected", String(isSel));
      });
    };

    Array.from(sel.options).forEach((opt) => {
      const optBtn = document.createElement("button");
      optBtn.type = "button";
      optBtn.className = "custom-select-option";
      optBtn.setAttribute("role", "option");
      optBtn.dataset.value = opt.value;
      optBtn.innerHTML = `<span>${opt.text}</span>${checkSvg}`;
      optBtn.onclick = (e) => {
        e.stopPropagation();
        if (sel.value !== opt.value) {
          sel.value = opt.value;
          sel.dispatchEvent(new Event("change", { bubbles: true }));
          sel.dispatchEvent(new Event("input", { bubbles: true }));
        }
        close();
        trigger.focus();
      };
      menu.appendChild(optBtn);
    });

    const open = () => {
      document.querySelectorAll(".custom-select.open").forEach((el) => {
        if (el !== wrapper) {
          el.classList.remove("open");
          el.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
        }
      });
      wrapper.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      wrapper.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.onclick = (e) => {
      e.stopPropagation();
      wrapper.classList.contains("open") ? close() : open();
    };

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && wrapper.classList.contains("open")) {
        close();
        trigger.focus();
      }
    });

    sel.addEventListener("change", syncFromSelect);
    syncFromSelect();
  }
  function initFish() {
    const grid = document.querySelector(".catalog-grid");
    if (!grid) return;
    const qs = new URLSearchParams(location.search);
    if (qs.get("water"))
      document.querySelector("#water-filter").value = qs.get("water");
    if (qs.get("planted"))
      document.querySelector("#planted-filter").checked = true;
    if (qs.get("sort"))
      document.querySelector("#fish-sort").value = qs.get("sort");
    const update = () => {
      let arr = [...D.fish],
        q = document.querySelector("#fish-search").value.toLowerCase(),
        w = document.querySelector("#water-filter").value,
        c = document.querySelector("#care-filter").value,
        t = +document.querySelector("#tank-filter").value,
        pl = document.querySelector("#planted-filter").checked,
        s = document.querySelector("#fish-sort").value;
      arr = arr.filter(
        (x) =>
          (x.name + " " + x.scientific).toLowerCase().includes(q) &&
          (!w || x.water === w) &&
          (!c || x.care === c) &&
          (!t || x.tank <= t) &&
          (!pl || x.planted),
      );
      if (s === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
      if (s === "low") arr.sort((a, b) => a.price - b.price);
      if (s === "high") arr.sort((a, b) => b.price - a.price);
      if (s === "new") arr.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
      grid.innerHTML = arr.length
        ? arr.map((f) => fishCard(f)).join("")
        : '<div class="empty"><h3>No species match those filters.</h3><p>Try a broader tank volume or care level.</p></div>';
      document.querySelector(".catalog-count").textContent =
        `${arr.length} species`;
    };
    document
      .querySelectorAll(
        "#fish-search,#water-filter,#care-filter,#tank-filter,#planted-filter,#fish-sort",
      )
      .forEach((x) => x.addEventListener("input", update));
    document.querySelector("#clear-filters").onclick = () => {
      document
        .querySelectorAll(
          "#fish-search,#water-filter,#care-filter,#tank-filter",
        )
        .forEach((x) => (x.value = ""));
      document.querySelector("#planted-filter").checked = false;
      update();
    };
    const panel = document.querySelector(".filter-panel");
    const trigger = document.querySelector(".filter-toggle");
    const setFiltersOpen = (open) => {
      panel.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", String(open));
      if (matchMedia("(max-width: 560px)").matches) {
        document.body.classList.toggle("menu-open", open);
      }
      if (open) panel.querySelector("input, select, button")?.focus();
      else trigger.focus();
    };
    trigger.onclick = () => setFiltersOpen(!panel.classList.contains("open"));
    panel.querySelector(".filter-close").onclick = () => setFiltersOpen(false);
    panel.querySelector(".filter-apply").onclick = () => setFiltersOpen(false);
    update();
    initCustomSelect("fish-sort");
  }
  function initPlants() {
    const grid = document.querySelector(".plant-grid");
    if (!grid) return;
    let type = "All";
    const update = () => {
      let a = D.plants.filter((x) => type === "All" || x.placement === type),
        s = document.querySelector("#plant-sort").value;
      if (s === "low") a.sort((x, y) => x.price - y.price);
      if (s === "high") a.sort((x, y) => y.price - x.price);
      if (s === "name") a.sort((x, y) => x.name.localeCompare(y.name));
      grid.innerHTML = a.map(plantCard).join("");
    };
    document.querySelectorAll("[data-plant]").forEach(
      (b) =>
        (b.onclick = () => {
          type = b.dataset.plant;
          document
            .querySelectorAll("[data-plant]")
            .forEach((x) => x.classList.toggle("active", x === b));
          update();
        }),
    );
    document.querySelector("#plant-sort").onchange = update;
    update();
    initCustomSelect("plant-sort");
  }
  function initEquipment() {
    const grid = document.querySelector(".equipment-grid");
    if (!grid) return;
    let type = new URLSearchParams(location.search).get("type") || "All";
    const update = () => {
      let a = D.equipment.filter((x) => type === "All" || x.type === type),
        s = document.querySelector("#equipment-sort").value;
      if (s === "low") a.sort((x, y) => x.price - y.price);
      if (s === "high") a.sort((x, y) => y.price - x.price);
      if (s === "name") a.sort((x, y) => x.name.localeCompare(y.name));
      grid.innerHTML = a.map(equipmentCard).join("");
      document.querySelector(".equipment-count").textContent =
        `${a.length} products`;
      document
        .querySelectorAll("[data-type]")
        .forEach((x) => x.classList.toggle("active", x.dataset.type === type));
    };
    document.querySelectorAll("[data-type]").forEach(
      (b) =>
        (b.onclick = () => {
          type = b.dataset.type;
          update();
        }),
    );
    document.querySelector("#equipment-sort").onchange = update;
    update();
    initCustomSelect("equipment-sort");
  }
  function initPlanner() {
    const f = document.querySelector("#planner-form");
    if (!f) return;
    const update = () => {
      const type = document.querySelector("#plan-type").value,
        vol = +document.querySelector("#plan-volume").value || 60;
      let chosen = [];
      chosen.push(
        D.equipment
          .filter((x) => x.type === "Tank")
          .sort((a, b) => Math.abs(a.tank - vol) - Math.abs(b.tank - vol))[0],
      );
      chosen.push(
        D.equipment
          .filter((x) => x.type === "Filter" && x.tank >= vol)
          .sort((a, b) => a.tank - b.tank)[0] ||
          D.equipment.find((x) => x.type === "Filter"),
      );
      chosen.push(
        D.equipment
          .filter(
            (x) =>
              x.type === "Lighting" &&
              (type === "Marine"
                ? x.id.includes("reef")
                : type === "Planted"
                  ? x.id.includes("plant")
                  : true),
          )
          .sort((a, b) => Math.abs(a.tank - vol) - Math.abs(b.tank - vol))[0],
      );
      if (type !== "Marine")
        chosen.push(
          D.equipment
            .filter((x) => x.type === "Heating" && x.tank >= vol)
            .sort((a, b) => a.tank - b.tank)[0] ||
            D.equipment.find((x) => x.type === "Heating"),
        );
      chosen.push(
        D.equipment.find(
          (x) => x.id === (type === "Marine" ? "marine-test" : "fresh-test"),
        ),
      );
      chosen = chosen.filter(Boolean);
      document.querySelector(".planner-note").textContent =
        `A ${vol} L ${type.toLowerCase()} starting point. Verify real dimensions, stocking and manufacturer guidance.`;
      document.querySelector(".checklist").innerHTML = chosen
        .map(
          (x) =>
            `<div class="checkitem"><label><input type="checkbox" checked data-id="${x.id}"><span><small class="item-category">${x.type}</small><strong>${x.name}</strong><small class="item-spec">${x.spec}</small></span></label><strong>${money(x.price)}</strong></div>`,
        )
        .join("");
      const count = () => {
        const selected = document.querySelectorAll(
          ".checkitem input:checked",
        ).length;
        document.querySelector(".planner-count").textContent =
          `${selected} of ${chosen.length} selected`;
      };
      document
        .querySelectorAll(".checkitem input")
        .forEach((input) => input.addEventListener("change", count));
      count();
    };
    f.addEventListener("input", update);
    f.addEventListener("reset", () => setTimeout(update));
    document.querySelector(".planner-add").onclick = () => {
      document
        .querySelectorAll(".checkitem input:checked")
        .forEach((x) => addCart(x.dataset.id));
    };
    update();
  }
  function initContact() {
    const f = document.querySelector("#contact-form");
    if (!f) return;
    const q = new URLSearchParams(location.search);
    ["item", "category"].forEach((k) => {
      if (q.get(k) && f.elements[k]) f.elements[k].value = q.get(k);
    });
    if (q.get("type")) f.elements.type.value = q.get("type");
    f.onsubmit = (e) => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      document.querySelector(".form-status").textContent =
        "Thank you for reaching out! Your enquiry has been received. Our specialist aquatics team will respond within 24 hours.";
    };
  }
  function initCheckout() {
    const f = document.querySelector("#checkout-form");
    if (f)
      f.onsubmit = (e) => {
        e.preventDefault();
        f.querySelector(".form-status").textContent =
          "Thank you! Your order details have been received. Our team will review stock and contact you shortly to confirm pickup or delivery arrangements.";
      };
  }
  function initGuides() {
    const inp = document.querySelector("#guide-search");
    if (!inp) return;
    let cat = "All";
    const update = () => {
      const q = inp.value.toLowerCase();
      document.querySelector(".guides-grid").innerHTML =
        D.guides
          .filter(
            (g) =>
              (cat === "All" || g.category === cat) &&
              (g.title + " " + g.summary).toLowerCase().includes(q),
          )
          .map((guide, index, all) =>
            guideCard(guide, {
              featured: index === 0,
              closing: index === all.length - 1 && all.length % 2 === 0,
            }),
          )
          .join("") || '<div class="empty">No guides match that search.</div>';
    };
    inp.oninput = update;
    document.querySelectorAll("[data-guide]").forEach(
      (b) =>
        (b.onclick = () => {
          cat = b.dataset.guide;
          document
            .querySelectorAll("[data-guide]")
            .forEach((x) => x.classList.toggle("active", x === b));
          update();
        }),
    );
  }
  renderCart();
  initExplorer();
  initFish();
  initPlants();
  initEquipment();
  initPlanner();
  initContact();
  initCheckout();
  initGuides();
})();
