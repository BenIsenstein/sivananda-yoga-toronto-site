# AGENTS.md — Sivananda Yoga Toronto Site

Operating instructions for AI agents working in this repository. Read this first.

## Project

Brand-new **static** website for the **Toronto Sivananda Yoga Vedanta Centre**
(77 Harbord Street, Toronto, ON M5S 1G4), rebuilt from the current WordPress site at
<https://sivanandacanada.org/toronto/>. The full plan, decisions, target sitemap, and
epic-by-epic backlog live in **`BACKLOG.md`** — treat it as the source of truth for scope.

## Core working directives (non-negotiable)

1. **Ask before committing each epic.** When an epic in `BACKLOG.md` is finished,
   **do not commit.** Stop, summarize the work, ask for review and explicit permission,
   then commit only after approval.
2. **One epic at a time**, in backlog order. Do not start the next epic until the current
   one is reviewed and committed.
3. **Never commit, push, amend, or create PRs unless explicitly told to.** No `git config`
   changes, no `--force`, no hooks skipped, no interactive rebases.
4. **Preserve every _type_ of content** from the current site (page structure may change);
   drop only the stale/dead pages explicitly listed in `BACKLOG.md`.
5. **Update `BACKLOG.md`** — check off items as they are completed.
6. **Ask, don't assume.** When a decision is ambiguous, ask targeted questions rather than
   guessing. Prefer objective, honest technical guidance over agreement.
7. **Keep the theme preview page** (`/theme-preview`). This build goes to the client for
   review, so the preview must stay available. Do NOT remove it during development.
8. **Build every component and page dark-theme aware.** Support light AND dark mode at
   every step. Use semantic token classes (`bg-background`, `text-foreground`,
   `bg-primary`, `border-border`, etc.) so both modes work automatically — never hardcode
   colors and avoid `dark:` overrides for semantic colors. Verify both modes before
   finishing any epic.

## Tech stack & conventions

- **Framework:** Astro (static output), TypeScript strict.
- **Styling:** Tailwind CSS **v4** (CSS-first, no `tailwind.config.js`) + **shadcn/ui token
  system** (CSS variables in `src/styles/global.css`, `@theme inline`, light/dark).
- **Components:** native `.astro` components styled with **token classes**
  (`bg-primary`, `text-muted-foreground`, `border-border`, etc.).
  **No React runtime** — do not add React or framework islands without explicit approval.
- **Aesthetic:** warm, serene, traditional-yoga palette (sand / sage / terracotta).
- **Package manager:** `pnpm`.
- **Tooling:** Prettier (`prettier-plugin-astro`), ESLint (`typescript-eslint` +
  `eslint-plugin-astro`), `astro check`.
- **TypeScript is pinned to v5** (typescript-eslint does not support TS 7 yet). Do not
  upgrade TypeScript past v5 without resolving the toolchain.

### Before finishing any epic, these must pass

```
pnpm check      # astro check — 0 errors
pnpm lint       # eslint — 0 problems
pnpm build      # static build succeeds
pnpm format     # prettier applied
```

## Third-party integrations (keep as-is; link out or embed)

- **Acuity Scheduling** (`owner=21122031`, `SivanandaToronto.as.me`) — booking, passes,
  course & event registration. Book page uses an Acuity **iframe**.
- **Square** — donations, printed gift cards (link out).
- **Constant Contact** — newsletter (link/embed).
- **Events model (Model B):** each event is a Markdown entry in an Astro content collection
  with an Acuity register link; past events auto-hidden at build.
- **Editing:** **Sveltia CMS** (Git-based, GitHub OAuth) for non-technical staff.

## Deployment

- **Host:** Railway (static serve of `dist/`), GitHub → Railway auto-deploy on `main`.
- **Repo:** public GitHub repo `sivananda-yoga-toronto-site` under `BenIsenstein`.
- Update `site:` in `astro.config.mjs` to the production domain at launch (Epic 8).

## Installed agent skills

Project-scoped skills live in `.agents/skills/` (recorded in `skills-lock.json`).
Consult them for the relevant epics:

- **`astro`** — Astro framework guidance (Epics 3–5).
- **`tailwind-v4-shadcn`** — Tailwind v4 + shadcn token conventions (Epics 1–2).
- **`seo-audit`** — technical/on-page SEO audit (Epic 7).
- **`schema`** — JSON-LD structured data, LocalBusiness/Event (Epic 7).

Restore skills with `npx skills experimental_install`. Do not install new skills without
explicit approval.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Remote-access tooling (infra, NOT part of the site/backlog)

A `remote-dev.sh` script lets the owner drive development remotely from a phone.
It starts `pnpm dev`, `code serve-web`, and `opencode serve`, then exposes all
three over a persistent Cloudflare named tunnel gated by Cloudflare Access
(email OTP):

- `dev.ironstone.work` -> astro dev (`:4321`)
- `code.ironstone.work` -> VS Code web (`:8000`)
- `agent.ironstone.work` -> opencode (`:4096`)

**Files:** `remote-dev.sh` (orchestration + idempotent Cloudflare setup),
`.env` (gitignored — Cloudflare API token/account/email/domain; never commit or
echo it), `.gitignore` (adds `remote-dev-logs/`), and one line in
`astro.config.mjs`: `vite.server.allowedHosts` reads `process.env.REMOTE_DEV_HOST`
(falls back to `[]`). That line is a no-op for normal builds — leave it in place.

**Impact on site work:** none. Ignore `remote-dev.sh`, `.env`, and
`remote-dev-logs/`. Do not commit these as part of an epic; they are separate
infra.

> **NEVER shut down any processes on ports 4321, 8000, or 4096 during
> development or gate checks.** These belong to the owner's live remote session
> (astro dev, VS Code web, opencode). Do not kill them, do not run
> `astro dev stop`, and do not free/rebind those ports. If a dev server is
> needed for a check, assume the one on `:4321` is already running, or use a
> different port — never terminate the running processes.
