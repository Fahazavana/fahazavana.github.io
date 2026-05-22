# Personal Website

Portfolio and blog scaffold built with Hugo and Tailwind CSS v4.

## Stack

- Hugo extended for templating, multilingual routing, feeds, and static generation
- Tailwind CSS v4 through Hugo's asset pipeline
- Vanilla JavaScript modules for UI interactions

## Development

Prerequisites:

- Hugo extended
- Node.js

Commands:

- `hugo server -D`
- `hugo --minify`

## Structure

- `config.toml`: site, language, menu, SEO, and analytics configuration
- `data/home/*.yml`: homepage section content
- `layouts/partials/sections/*`: homepage section templates
- `layouts/_default/*`: default layouts for content pages, including blog pages
- `assets/css/main.css`: design tokens and shared component styles
- `assets/js/*.js`: modular frontend behavior
- `content/blog/*`: blog list and future posts

## Content Workflow

Homepage content is data-driven:

- `data/home/intro.yml`
- `data/home/experience.yml`
- `data/home/education.yml`
- `data/home/skills.yml`
- `data/home/projects.yml`
- `data/home/publications.yml`
- `data/home/contact.yml`

Blog posts are content-driven:

- Create a post with `hugo new blog/my-post.en.md --kind blog`
- Add matching `.fr.md` or `.mg.md` translations when needed

## Notes

- The homepage and blog now share the same top-level site shell.
- RSS and sitemap use Hugo defaults instead of custom hardcoded templates.
- Social links, SEO metadata, and analytics are centralized in shared partials.
