# Customization

## Brand and palette

- Replace the working name inside `assets/brand/logo.svg` and `logo-white.svg`.
- Keep the same mark geometry in `logo-mark.svg` and `favicon.svg`.
- Core colors and spacing live at the top of `assets/css/style.css`.
- Theme overrides live in `assets/css/dark-mode.css`.

## Catalog

Edit `assets/js/catalog-data.js` to add or change fish, plants, equipment, prices and availability language. Each item needs a unique URL-safe `id`. Live fish should keep enquiry-based actions until real livestock fulfillment is connected.

Care ranges must be checked against current, credible species references. Where reliable sources disagree, use a conservative range and explain the uncertainty in the care notes.

## Images

Replace each `image` URL in the data file. Exact-species photos must be correctly identified. Use the aspect ratios already enforced by the card styles and never use `object-fit: fill`.

## Store location and forms

The contact page deliberately contains no map because the client supplied no address. Once an address is verified, add the address, hours and a Leaflet/OpenStreetMap map inside the `#location` block only.

The enquiry form currently validates locally and reports that nothing was sent. Connect its submit handler in `assets/js/main.js` to the approved form service, then update privacy disclosures.

## Motion

Wave, rays and bubble keyframes are in `assets/css/style.css`. Adjust their duration and opacity conservatively. Reduced-motion preferences already stop the nonessential effects.

## Payments

The checkout never collects card data. Add payment only through a compliant hosted commerce provider and replace all shipping, tax, cancellation and returns templates with verified policies.
