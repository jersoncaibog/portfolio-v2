# Jerson Caibog — Portfolio

Personal portfolio site: profile, skills, experience and 40 projects with case studies.

**Live:** [jersoncaibog.vercel.app](https://jersoncaibog.vercel.app)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, fully static) with React 19 and TypeScript
- Tailwind CSS v4, with design tokens in `src/app/globals.css`
- Geist and Geist Mono via `next/font`
- [simple-icons](https://simpleicons.org) for the skill logos
- Hosted on Vercel, deployed on every push to `main`

## Pages

| Route | What it shows |
|---|---|
| `/` | Hero, about, skills, experience and education, and the featured projects |
| `/projects` | Every project, sortable by relevance or date (`?sort=date`) |
| `/work/<slug>` | Case study: links, image gallery, role, stack, stats and what was built |

## Editing content

All content lives in one file: [`src/data/profile.json`](src/data/profile.json). The pages read it through [`src/lib/profile.ts`](src/lib/profile.ts), which also defines the `Work` type.

### Projects

Each entry in `work` becomes a card, a row in `/projects` and a case study page. The fields are:

- `slug`, `name`, `title`, `summary`, `role`, `year`, `org`
- `stack`: the full stack on the case study. `cardStack`: the 2–3 items shown on cards.
- `links`: `live`, `source`, and optionally `admin` and a `document` (label and href, for example a PDF)
- `stats`: `{ value, label }` numbers. `points`: `{ label, text }` highlights.
- `images`: `{ src, alt, caption? }`. The first image is the thumbnail.
- `featured: true` puts a project on the homepage. Without any, the first 6 are shown.

The order of the `work` array is the relevance order. It drives the `/projects` list, the homepage cards and the "Next project" link. Date sorting puts the newest year first and keeps that order within a year.

`org` is the badge next to the year: `Prostrive BV`, `ESSU`, `Freelance` or `Personal project`. Freelance entries leave the client's name out.

### Images

Put project images in `public/work/<slug>/` as WebP (at most 1920px wide) and list them in the project's `images`. When replacing an image under the same file name, clear `.next/cache/images` so the dev server stops serving the old one.

### Adding a project from another codebase

[`docs/project-entry-prompt.md`](docs/project-entry-prompt.md) is a prompt for a Claude session opened in the project's own repository. It reads the codebase and saves a ready-made `work` entry to `~/portfolio-entries/<slug>.json`, which can then be added to `profile.json`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # production build; every page is prerendered
```

The homepage's GitHub section reads the contribution graph from GitHub's GraphQL API and refreshes it daily. It needs a `GITHUB_TOKEN` environment variable: a fine-grained personal access token with read-only access to public repositories. Put it in `.env.local` for development and in the Vercel project's environment variables for production. Without it, the section is left out.

This project uses Next.js 16, which has breaking changes from earlier versions. See [`AGENTS.md`](AGENTS.md) and the bundled docs in `node_modules/next/dist/docs/` before changing framework code.
