# Personal Website

Portfolio built with Hugo and Tailwind CSS v4.

## Stack
- Hugo (templating, data-driven sections)
- Tailwind CSS v4 (CSS-first, JIT via Hugo’s Tailwind pipeline)
- Vanilla JS (interactions, typing, particles)

## Development
Prereqs: Hugo extended, Node (optional for local PostCSS/Tailwind CLI)

- Run dev server: `hugo server -D`
- Build production: `hugo --minify`

CSS is compiled by Hugo using `assets/css/main.css` with `@import "tailwindcss"` and `@source "hugo_stats.json"`.

## Theming and Colors
Colors are centralized as design tokens in `assets/css/main.css`.

- Light/Dark variables live under `:root` and `.dark`.
- Tailwind aliases are exposed via `@theme` so you can use native utilities:
  - `text-foreground`, `text-muted`, `text-primary`
  - `bg-background`, `bg-surface`, `bg-elevated`
  - `border-border`, `ring-primary`

Edit these in one place:
- `assets/css/main.css:1`

Recommended usage patterns:
- Headings/content: `text-foreground`
- Secondary text: `text-muted`
- Cards/containers: `card` (or `bg-elevated border-border` if not using `.card`)
- Sections: `bg-surface`
- Accents/actions: `text-primary`, `.btn.btn-primary`

Dark mode is toggled by the `dark` class on `<html>`; variables update automatically and utilities reflect the new values.

## Project Structure
- Templates: `layouts/partials/*`, `layouts/index.html`
- Styles: `assets/css/main.css`
- Scripts: `assets/js/*`
- Data: `data/content.yml`

## Notes
- Legacy, hard-coded color classes have been replaced by semantic tokens for consistency.
- If you add new UI, prefer the token utilities over raw grays (e.g., `text-gray-700`).

## SEO
- Meta/OG/Twitter handled in `layouts/partials/seo.html` and included from `layouts/partials/head.html`.
- Configure Twitter handle in `config.toml` under `[params] twitter = "your_handle"`.
- Sitemap is enabled via `[sitemap]` and Hugo outputs; Robots.txt is generated from `layouts/robots.txt`.

## Credits
- Theme inspiration: [hugo-port](https://github.com/tylerlaws0n/port-hugo)
- Typing effect: [Medium article](https://medium.com/front-end-weekly/how-to-create-typing-effect-in-css-and-js-3252dd807f0a)
