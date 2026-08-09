# Sivananda Yoga Toronto — Astro Rebuild Backlog

A brand-new static site for the **Toronto Sivananda Yoga Vedanta Centre**
(77 Harbord Street, Toronto, ON M5S 1G4), rebuilt from the current WordPress site
at <https://sivanandacanada.org/toronto/> using Astro.

## Working agreement

- **After each epic is finished, do not commit.** Ask for review and permission, then commit.
- Preserve at minimum every _type_ of content on the current site (page structure may change).
- Drop stale/dead pages (see "Dropped" below).
- **Keep the theme preview page** (`/theme-preview`) — this build goes to the client for review.
- **Build every page/component light + dark aware** using semantic tokens (no hardcoded colors).

## Content decisions

- **Founding timeline (synthesized from two live pages; confirm with client):**
  - **1959** — the International Sivananda Yoga Vedanta Centres organization founded
    (by Swami Vishnudevananda). _(Source: Our Centre page.)_
  - **1962** — the Sivananda tradition / Toronto chapter established.
    _(Source: About page.)_
  - **1992** — the current Centre at 77 Harbord Street established.
    _(Source: Our Centre page.)_
  - Present as a timeline; add a hidden `TODO(client): confirm 1959/1962/1992` note.
- **Legacy FAQ links** (`beginners-yoga-courses`, `class-prices`, etc.) → re-point to new routes
  (`/new-to-yoga`, `/schedule`).
- Preserve verbatim lists (e.g. Community Outreach partners/causes); do not invent copy.
  Source facts captured in `content-source/NOTES.md`.

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

**Dropped as dead (do not migrate):** `sample-page`, `tabs`, `event-directory`,
`summer-sale` (2019), duplicate/legacy schedule pages (`classes`, `yoga-camp`,
`yoga-class-descriptions` duplicate), and dead 2019 blog posts (`post-sitemap`).

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
- [x] Create public GitHub repo + initial commit

### Epic 1 — Theming (shadcn tokens)

- [x] Finalize warm/serene palette (OKLCH); light + dark; full token set (muted, accent, ring, chart, sidebar)
- [x] Typography: serif display (Cormorant Garamond) + sans body (Inter), self-hosted via Fontsource
- [x] Base element styles + reduced-motion handling; `tw-animate-css` retained (current shadcn-recommended successor)
- [x] Theme preview page (`/theme-preview`) to verify tokens — **kept for client review**

### Epic 2 — Core UI components (native `.astro`)

- [x] Header w/ multi-level nav (mobile drawer) + theme toggle (light/dark/system)
- [x] Footer (policies, social, newsletter, contact)
- [x] Button, Card, Badge, Tabs, Accordion (all token-styled, light + dark)
- [x] Hero section, CTA band
- [x] `cn()` util, `@/*` path alias, central `site.ts` config (nav/contact/social)
- [x] Re-read live site → `content-source/NOTES.md` (verbatim facts; flagged 1962/1992 discrepancy)

### Epic 3 — Content migration (full fidelity)

Collections: `pages`, `courses`, `policies` (the `events` collection is defined in Epic 5).
All pages light + dark aware; verbatim copy from `content-source/NOTES.md`; images via
`astro:assets`. Expand `site.ts` nav to make every new route reachable.

**Setup**

- [x] Define content collections + schemas (`src/content.config.ts`)
- [x] Expand `site.ts` nav (inspiration, full courses, retreats subpages, kids/teens, satsang, fundraiser)

**About hub + subpages**

- [x] `/about` — card directory hub (Teachers, Teachings, Our Centre, New to Yoga, FAQ, Outreach)
- [x] `/about/our-centre` — prose + 1959/1962/1992 timeline (hidden TODO) + gallery
- [x] `/about/teachers` — Tabs: Swami Sivananda / Swami Vishnudevananda (verbatim)
- [x] `/about/what-we-teach` — Tabs: 5 Points / 4 Paths / Sivananda Class
- [x] `/about/community-outreach` — prose + verbatim fundraising & program-site lists
- [x] `/about/rental` — halls, capacities, kitchen, email CTA
- [x] `/about/inspiration` — Dose of Yoga Inspiration

**Get started**

- [x] `/new-to-yoga` — Yoga 1 & 2, package discount, 2-week pass

**Courses**

- [x] `/courses` — hub (card grid)
- [x] `/courses/meditation`
- [x] `/courses/private`
- [x] `/courses/pranayama`
- [x] `/courses/ayurvedic-nutrition`
- [x] `/courses/philosophy`
- [x] `/courses/vedic-studies`
- [x] `/courses/nada-yoga`

**Classes (content only; interactive grid in Epic 4)**

- [x] `/class-descriptions`

**Retreats & Training**

- [x] `/retreats/weekend-retreat`
- [x] `/training/chair-yoga` (teacher training)
- [x] `/training/gentle-yoga` (teacher training)
- [x] `/training/prenatal-yoga` (teacher training)

**Kids / Teens / Family**

- [x] `/kids-teens/kids-yoga`
- [x] `/kids-teens/teen-yoga`
- [x] `/kids-teens/for-parents`

**Satsang / Spiritual**

- [x] `/satsang` (free group meditation)
- [x] `/satsang/sunday-prayers`
- [x] `/satsang/puja`

**Support**

- [x] `/fundraiser` (Donate remains an external Square link)

**Contact & FAQ**

- [x] `/contact` — address, hours, directions (form deferred to Epic 8)
- [x] `/faq` — Accordion; legacy links re-pointed

**Policies (6)**

- [x] `/policies/terms`
- [x] `/policies/refund`
- [x] `/policies/privacy`
- [x] `/policies/data-privacy`
- [x] `/policies/anti-harassment`
- [x] `/policies/misconduct` (links existing PDF)

**Wrap-up**

- [ ] Download & optimize images → `astro:assets` — **deferred**: pages built text-first;
      confirm with client which live-site images to carry over (many are stale) before adding.
- [x] Verify all nav targets resolve (no 404s); light + dark pass
- [x] Added `/schedule`, `/online`, `/events` placeholders (full build in Epic 4/5) so nav is complete
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
