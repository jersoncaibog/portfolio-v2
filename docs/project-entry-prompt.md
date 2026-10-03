# Prompt: write a portfolio project entry from a codebase

Open Claude Code in the root of the project you want to add, and paste
everything below the line. Claude reads the codebase and returns one JSON
object to add to the `work` array in `src/data/profile.json` of the portfolio
repo.

---

I'm adding the project in this repository to my portfolio site. Get
everything from the codebase itself. I'm not going to describe the project,
so don't ask me for a summary, features or numbers.

Look through the repo before you write anything: the README and any docs,
the package manifests and lockfiles, routes and pages, the database schema
and migrations, API handlers, config and deploy files (such as
`vercel.json`, CI workflows and cron schedules), tests, and `git log` for
dates. Work out what the project does, who it's for, how it's built, and
what's technically interesting about it.

Then write one JSON object in exactly this shape:

```json
{
  "slug": "kebab-case-url-name",
  "name": "Short card name",
  "title": "Full project title",
  "summary": "One sentence: what it is and who it's for.",
  "role": "My role, Company",
  "year": "2026",
  "stack": ["Framework 1", "Language", "Database", "Hosting"],
  "cardStack": ["Main tech", "Second", "Third"],
  "links": { "live": "https://… or null", "source": "https://… or null" },
  "stats": [{ "value": "8", "label": "production deployments" }],
  "points": [{ "label": "Architecture", "text": "One or two sentences." }],
  "images": []
}
```

Rules for each field:

- **slug**: lowercase, words joined with hyphens. It becomes the URL
  `/work/<slug>`.
- **name**: what the project card shows, at most about 35 characters.
- **title**: the full name for the case study heading. It can match `name`.
- **summary**: one sentence, at most about 140 characters. Say what it does
  and for whom, not which tech it uses.
- **role**: the codebase usually can't tell you this. Use `null` and list it
  in your questions at the end.
- **year**: from the first and last commit dates in `git log`: "2026", or a
  range written with an en dash, like "2024–2025".
- **stack**: the main technologies from the manifests, 3 to 7 items, most
  important first. Use versions only when they matter, like "Next.js 16".
  Skip small libraries and dev tooling.
- **cardStack**: the 2 or 3 most recognizable items from `stack`.
- **links**: `live` only if a production URL appears in the code or config
  (site URL, metadata base, sitemap, README). Ignore local, staging and
  preview hosts. If you can't find one, set it to `null` and ask me for the
  live URL at the end. `source` only if the git remote is a public repo,
  otherwise `null`.
- **stats**: 0 to 4 numbers that show scale, each counted from the code, such
  as pages or routes, database tables, API endpoints, components, records in
  a data file, or test count. Short lowercase labels. Only use numbers you
  actually counted, and tell me at the end how you counted each one.
- **points**: 1 to 4 items. Each has a 1–3 word label (Architecture, Data
  pipeline, Security, Performance…) and one or two plain sentences, at most
  about 160 characters, about what was built and why it matters. Pick what
  an engineer reviewing my work would find interesting. Don't repeat the
  summary. Don't start with "I".
- **images**: leave it as an empty array. Instead, at the end, list the 3–5
  pages or screens most worth screenshotting, with their routes.

Keep these out of everything you write: secrets and env values, internal or
staging URLs, customer or personal data, and anything that looks
confidential to a client. If the project is client work, describe what was
built, not the client's private business details.

Writing style: short, concrete and plain. No marketing words like
"seamless", "robust" or "cutting-edge". Numbers as digits.

Return the JSON object first. After it, give me:

1. How you counted each stat, with the files you used.
2. Any fields you left `null` and what you need from me to fill them. Always
   ask for `role`, and ask for the live URL whenever `links.live` is `null`.
3. The screens to screenshot.
