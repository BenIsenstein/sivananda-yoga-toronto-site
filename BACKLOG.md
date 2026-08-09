# Sivananda Yoga Toronto — Astro Rebuild Backlog

A brand-new static site for the **Toronto Sivananda Yoga Vedanta Centre**
(77 Harbord Street, Toronto, ON M5S 1G4), rebuilt from the current WordPress site
at <https://sivanandacanada.org/toronto/> using Astro.

## Working agreement

- **After each epic is finished, do not commit.** Ask for review and permission, then commit.
- Preserve at minimum every _type_ of content on the current site (page structure may change).
- Drop stale/dead pages (see "Dropped" below).

## Decisions locked in

| Area                   | Decision                                                                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | Astro (static output), TypeScript strict, Prettier + ESLint, conventional commits                                                                           |
| Styling                | Tailwind CSS **v4** + **shadcn/ui token system** (CSS vars in `global.css`, `@theme inline`, light/dark), **native `.astro` components** — no React runtime |
| Aesthetic              | Warm, serene, traditional-yoga palette (sand / sage / terracotta) mapped onto shadcn tokens                                                                 |
| Content                | Auto-migrate all live copy → Markdown; drop stale/dead pages; owner reviews                                                                                 |
| Schedule grid          | Data-driven from one editable YAML/JSON file → responsive Tailwind table                                                                                    |
| Booking                | Keep Acuity **iframe** on Book page + Acuity outbound links from schedule/passes                                                                            |
| Events/Workshops       | **Model B**: Astro Content Collection (Markdown per event) + Acuity register links; past events auto-hidden at build                                        |
| Editing                | **Sveltia CMS** (Git-based, GitHub OAuth) for staff to add/edit events + pages                                                                              |
| Donations / Gift cards | Link out to **Square**                                                                                                                                      |
| Newsletter             | **Constant Contact** link/embed                                                                                                                             |
| Repo                   | Public GitHub repo, GitHub → Railway auto-deploy on `main`                                                                                                  |
| Hosting                | **Railway** static deploy (Nixpacks / static server)                                                                                                        |

## Third-party integrations (kept as-is)

- **Acuity Scheduling** (`owner=21122031`, `SivanandaToronto.as.me`) — booking, passes, course registration, event registration.
- **Square** — donations, printed gift cards.
- **Constant Contact** — newsletter signup.

## Target sitemap (new site)

- `/` Home (hero, featured events, hatha intro, quick links)
- **About:** `/about`, `/about/our-centre`, `/about/teachers`, `/about/what-we-teach`,
  `/about/community-outreach`, `/about/rental`, `/about/inspiration`
- **Classes:** `/schedule` (in-person grid), `/online`, `/class-descriptions`,
  `/book` (Acuity iframe), `/passes` (passes + gift cards)
- **Get started:** `/new-to-yoga`
- **Courses:** `/courses` + children (meditation, private, pranayama, ayurvedic-nutrition,
  philosophy, vedic-studies, nada-yoga)
- **Workshops/Events:** `/events` (filterable list) + `/events/[slug]`
- **Retreats & Training:** `/retreats/weekend-retreat`; external links (Ashram Camp, TTC);
  teacher trainings (chair, gentle, prenatal)
- **Kids / Teens / Family**, **Satsang / Spiritual** sections
- **Support:** `/donate` (→ Square), `/fundraiser`
- `/contact` (address, hours, directions, form), `/faq`
- **Policies:** `/policies/*` (terms, refund, privacy, data-privacy, anti-harassment, misconduct)
- Auto-generated `sitemap.xml`; **301 redirects** from old WP URLs

**Dropped as dead:** `sample-page`, `tabs`, `event-directory`, `summer-sale` (2019),
duplicate `classes` / `yoga-camp`, dead 2019 blog posts.

---

## Backlog

### Epic 0 — Repo & Foundations

- [x] Create repo/folder `sivananda-yoga-toronto-site`
- [x] Scaffold Astro (minimal, TS strict)
- [x] Add Tailwind v4 (`@tailwindcss/vite`), `@astrojs/sitemap`
- [x] Prettier + `prettier-plugin-astro`, ESLint (`eslint-plugin-astro`), `astro check`
- [x] Baseline `global.css` with shadcn token layer + warm palette
- [x] Base `Layout.astro`, placeholder home
- [x] Write this `BACKLOG.md`
- [ ] Create public GitHub repo + initial commit (**after review**)

### Epic 1 — Theming (shadcn tokens)

- [ ] Finalize warm/serene palette (OKLCH) via tweakcn; light + dark
- [ ] Typography scale + serene serif/sans pairing
- [ ] `tw-animate-css` subtle motion utilities

### Epic 2 — Core UI components (native `.astro`)

- [ ] Header w/ multi-level nav (mobile drawer)
- [ ] Footer (policies, social, newsletter, contact)
- [ ] Button, Card, Badge, Tabs, Accordion (FAQ)
- [ ] Hero section, CTA bands

### Epic 3 — Content migration

- [ ] Content Collections: `pages`, `courses`, `events`, `policies`
- [ ] Migrate copy → Markdown (About, Our Centre, Teachers, What We Teach, New to Yoga,
      Courses, Community Outreach, Rental, Contact, FAQ, all Policies)
- [ ] Download & optimize images → `astro:assets`
- [ ] Owner review pass

### Epic 4 — Schedule & Booking

- [ ] `schedule.yaml` (day/time/class-type/Acuity link) → responsive grid component
- [ ] Class-descriptions section + passes/gift-cards page (Acuity catalog + Square)
- [ ] `/book` (Acuity iframe `owner=21122031`), `/online`

### Epic 5 — Events (Model B)

- [ ] `events` collection schema (title, start/end, price, image, teacher, body, acuityUrl)
- [ ] `/events` list (upcoming only) + `/events/[slug]`
- [ ] Homepage "Upcoming Events" block
- [ ] Seed current live events

### Epic 6 — Sveltia CMS

- [ ] `public/admin` Sveltia config for `events` + editable pages
- [ ] GitHub OAuth (app + broker) for staff login
- [ ] Author docs (how to add an event)

### Epic 7 — SEO & Redirects

- [ ] `@astrojs/sitemap`, `robots.txt`
- [ ] 301 redirect map old WP paths → new paths
- [ ] Per-page meta, OG images, JSON-LD (LocalBusiness, Event)

### Epic 8 — Deploy (Railway + GitHub)

- [ ] Railway project; connect GitHub; static serve of `dist/`
- [ ] Auto-deploy on `main`; env for CMS OAuth
- [ ] Custom domain / DNS cutover; verify redirects & forms
- [ ] Contact form provider (replace Caldera — Formspree/Web3Forms)

### Epic 9 — QA & Launch

- [ ] Responsive / a11y / Lighthouse pass; broken-link + Acuity/Square check
- [ ] Content owner sign-off; go-live
