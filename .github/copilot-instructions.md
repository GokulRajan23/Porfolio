# Copilot Instructions for the Gokul Rajan Portfolio

## Project Overview

- This repository is a personal portfolio site, live at https://www.gokulrajan.de/.
- It is a plain static site. There is no framework, no bundler, no package manager and no
  build step. Do not introduce one without being asked.
- `index.html`, `style.css` and `script.js` make up the portfolio page. `blog.html` is a
  separate, self-contained blog index; `blogposts/` holds exported post HTML.

## Architecture

- **Content lives in the markup.** There is no data file, CMS or template layer. Adding a
  project, skill or timeline entry means adding markup to `index.html`.
- **`script.js` does four things**, all inside one `DOMContentLoaded` handler: the
  `IntersectionObserver` scroll reveal, the `scrolled` class on the header, smooth scrolling
  for `a[href^="#"]`, and the theme toggle.
- **`blog.html` is intentionally standalone** with its own inline `<style>` block. It does not
  use `style.css` or `script.js`. Keep it self-contained.

## Conventions

- **Theming goes through CSS variables.** Every colour is a custom property defined on `:root`
  and overridden under `[data-theme="light"]`. Never hardcode a colour in a rule; add a
  variable, or a `[data-theme="light"]` override if a value cannot be expressed as one.
- **Card markup is compositional.** A card is `glass-card` plus a role class
  (`skill-card`, `project-card`, `edu-card`, `cert-card`), plus `reveal` to opt into the scroll
  animation and `hover-lift` for the hover effect. Reuse these instead of writing new card CSS.
- **The skills and projects sections are flex, not grid**, with a per-breakpoint `max-width` on
  the children and `justify-content: center`. This keeps all cards the same width and centres a
  trailing partial row. Adding a card should need no CSS change; if you are tempted to switch
  back to `grid-template-columns`, note that it leaves a stretched orphan on the last row.
- **Icons are Font Awesome 6 classes** (`fa-solid`, `fa-brands`) loaded from a CDN, as is the
  Outfit font. Nothing is vendored, and there are no local assets to build.

## Developer Workflow

- Open `index.html` directly, or serve the folder to match production link behaviour:
  ```bash
  python3 -m http.server 8080
  ```
- There is no test suite. Verify changes in the browser, in both themes (toggle in the header)
  and at mobile, tablet and desktop widths.

## Examples

- **New project card:** copy an existing `.glass-card.project-card` block in `#projects`, keep
  the `project-header` / `description` / `key-contributions` / `tags` / optional `project-links`
  order. Cards without a link simply omit `.project-links`.
- **New blog post:** add the exported HTML to `blogposts/` and link it from `blog.html`.

---

For more, see [README.md](../README.md).
