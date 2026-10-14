# Installation

BlueCurrent Aquatics has no build step or package dependency.

1. Copy the complete project directory to a static web host.
2. Preserve the relative `assets/`, `pages/` and `pages/guides/` paths.
3. Serve through HTTP rather than opening files directly, so query parameters and browser storage behave consistently.
4. Use the root `index.html` as the public entry point.

Local preview: `python3 -m http.server 8080`.

Before production, set canonical URLs to the real public domain, verify all catalog content, configure the contact workflow, replace policy templates and add verified store details.
