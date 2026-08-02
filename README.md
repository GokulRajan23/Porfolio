# Gokul Rajan - Personal Portfolio

Source for my personal portfolio site, live at [gokulrajan.de](https://www.gokulrajan.de/).

It is a hand-written static site: no framework, no build step, no dependencies to install.
Three files carry the whole thing (`index.html`, `style.css`, `script.js`), plus a separate
blog index and an archive of exported posts.

## Contents

| Path | Purpose |
| --- | --- |
| `index.html` | The portfolio itself: hero, core competencies, experience, education and certifications, projects and hackathons, volunteering |
| `style.css` | All styling for `index.html`, including the light/dark theme variables |
| `script.js` | Scroll reveal, sticky header state, smooth anchor scrolling, theme toggle |
| `blog.html` | Standalone blog index ("The Technobyte") with its own self-contained styles |
| `blogposts/` | Archived blog posts exported from Medium, one HTML file per post |
| `.github/copilot-instructions.md` | Repository conventions for AI coding assistants |

## How it works

**Theming.** Colours, spacing and the shared transition are defined as CSS custom properties on
`:root` (dark, the default) and overridden under `[data-theme="light"]`. The toggle in the header
flips the `data-theme` attribute on `<html>` and stores the choice in `localStorage`, so the
preference survives a reload. Nothing else in the stylesheet hardcodes a theme colour, which is
why a single attribute swap re-themes the whole page.

**Scroll reveal.** Elements carrying the `reveal` class start at `opacity: 0` and shifted down.
An `IntersectionObserver` adds `active` when they enter the viewport and then stops observing
them, so each element animates exactly once. The hero uses `reveal-on-load` instead, which runs
a CSS keyframe immediately rather than waiting on the observer.

**Layout.** The skills and projects sections are flex containers with a shared per-breakpoint
width cap (one column on phones, two from 700px, three from 1000px) and `justify-content: center`.
That keeps every card the same width and centres a trailing partial row, so adding a card does
not leave a full-width orphan at the bottom of the section.

**Background.** A single fixed `.blob-bg` element plus its `::after` pseudo-element render two
blurred radial gradients that drift on a long CSS animation. It sits at `z-index: -1` with
`pointer-events: none`, so it never interferes with the content.

## Running locally

No build and no package manager. Either open `index.html` directly in a browser, or serve the
folder if you want relative links to behave exactly as they do in production:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## External dependencies

Loaded at runtime from a CDN, not vendored:

- [Outfit](https://fonts.google.com/specimen/Outfit) via Google Fonts
- [Font Awesome 6.4.0](https://fontawesome.com/) for the icons

## Editing the content

Content lives directly in the markup; there is no data file or templating layer.

- **Hero tagline, links, resume button** - the `#hero` section at the top of `index.html`
- **Core competencies** - `.skills-grid`; each card is a `.glass-card.skill-card` holding either
  a `<ul>`, a `.tags` block, or the `.language-bars` progress bars
- **Experience and volunteering** - `.timeline` blocks; each entry is a `.timeline-item`
- **Projects and hackathons** - `.projects-grid`; each entry is a `.glass-card.project-card`
  with a header, description, `.key-contributions` list, `.tags`, and an optional
  `.project-links` footer
- **Blog** - add the exported post to `blogposts/` and link it from `blog.html`

New cards need no CSS changes: `.reveal` opts them into the scroll animation and `.hover-lift`
into the hover effect, and the flex layout absorbs the extra card on its own.

## Deployment

The site is static, so it deploys as-is from the repository root to any static host. The custom
domain `gokulrajan.de` points at that deployment.

## License

Content and design are personal work. Feel free to read the source, but please do not republish
the site as your own.
