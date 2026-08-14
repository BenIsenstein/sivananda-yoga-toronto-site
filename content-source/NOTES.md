# Content Source Notes (verbatim from live WordPress site)

> Captured during Epic 2 re-read of <https://sivanandacanada.org/toronto/>.
> Epic 3 must migrate from THESE facts, not from memory. Preserve wording; do not invent.

## ⚠️ Discrepancies / questions for the client

1. **Founding year — RESOLVED as a timeline** (confirm with client): the two pages aren't
   contradictory once read as a timeline — **1959** International org founded (Our Centre
   page), **1962** Toronto chapter established (About page), **1992** current 77 Harbord
   Centre established (Our Centre page). Presented as a timeline on `/about/our-centre`
   with a hidden `TODO(client)` note.
2. Several FAQ links point to legacy URLs (`beginners-yoga-courses`, `class-prices`)
   that map to our new `/new-to-yoga` and `/schedule` (passes) — re-pointed on migration.
3. **Transfer fee discrepancy**: the Terms page says a **$10** course-transfer fee; the
   newer Refund page (2025) says **$20**. Used **$20** (newer) on `/policies/refund` and
   left the Terms page fee unspecified. Confirm with client.

## Events surfaces (three related routes on the live site) — Epic 5

The live site has **three overlapping event surfaces**, all powered by the EventON plugin:

- **`/yoga-workshop/`** — the page the nav's "Workshops/ Events" link points to. Has an
  intro ("Lifelong Learning") **plus a filtered feed of workshops & specialized courses**
  (Intensive Asana, Intro to Meditation, Chair Yoga, Kirtan, Ayurvedic Nutrition, etc.).
- **`/programs/`** — NOT in the nav; linked from the homepage "See All Workshops, Events,
  Courses". A **broader, unfiltered feed of ALL events** — a superset that also includes
  drop-in-style items (Yoga at the Park, Yoga Level 1/2 course cohorts, etc.).
- **`/events/<slug>`** — individual event detail pages (e.g. `/events/kirtan-with-shell-and-anton/`).

**"Lifelong Learning" intro (verbatim, from `/yoga-workshop/`):**

> If you would like to learn more about different aspects of yoga and related subjects, here
> are our workshops, events and specialized courses. From cooking workshops to philosophy,
> hatha yoga to chanting and ayurveda, all the programs are designed to help you achieve
> improved physical, mental and spiritual well-being. We add new topics and dates frequently.
> Check back regularly, or follow us on Instagram for updates.

**Our consolidation decision (Epic 5):** collapse these into a single `/events` collection
(Model B) + `/events/[slug]` detail pages, with **category/type filtering** to reproduce
BOTH surfaces: a curated "Workshops & Courses" view (≈ `/yoga-workshop/`) and an "All events"
view (≈ `/programs/`). Preserve the "Lifelong Learning" intro on the curated view. This is a
deliberate merge, recorded here to avoid drift.

### Proposed event taxonomy (owner input — refine in Epic 5)

How many pages/collections this maps to is TBD; use these **types** as the starting model:

- **Regular Practices** — the normal weekly drop-in classes. Go on a **static weekly
  calendar** (not the events feed) and don't change week to week. (Overlaps with Epic 4
  schedule grid — decide whether these live in the schedule, the events model, or both.)
- **Regular Courses** — regularly repeating multi-week courses: **Yoga 1, Yoga 2,
  Intro to Meditation**. Recurring cohorts with start dates.
- **Special Practices** — one-off or seasonal yoga practices: **Yoga in the Park,
  3-hour Asana Intensive, Chair Yoga**, etc.
- **Education** — teachings that are informational, not practice-based: **philosophy,
  Ayurveda**, talks, workshops.
- **Retreats** — contiguous time away: **Ashram retreats, weekend retreats**.
- **Teacher Trainings** — TBD whether these belong in the events collection at all.
  Leaning toward **their own page + external links** (Ashram TTC is already external;
  chair/gentle/prenatal TT already exist as `/training/*` pages). Revisit in Epic 5.

Open questions for Epic 5: which types are `category` values on one `events` collection vs.
separate collections/pages; how "Regular Practices" reconcile with the Epic 4 weekly schedule
grid; whether Teacher Trainings stay out of events entirely.

## Facts to preserve

### Location / neighbourhood

- 77 Harbord Street, Toronto, ON, M5S 1G4 · (416) 966-9642
- In **Toronto's Annex** neighbourhood, a couple of blocks south of Spadina & Bloor,
  across from the University of Toronto (St. George campus / athletic centre).
- A converted brick house with "vintage charm."

### Our Centre (verbatim essence)

- Mission: support students' physical, mental and spiritual growth by teaching Yoga
  and Vedanta. All welcome.
- Part of **The International Sivananda Yoga Vedanta Centres**, a non-profit named after
  **Swami Sivananda**, founded 1959 by his disciple **Swami Vishnudevananda**.
- Recognized worldwide for teaching yoga authentically, preserving purity/tradition.

### Teachers (lineage)

- **Swami Sivananda** (1887–1963) — doctor turned sage; "Serve, Love, Give, Purify,
  Meditate, Realise." Founded Sivananda Ashram (1932), Divine Life Society (1936).
- **Swami Vishnudevananda** (1927–1993) — disciple; first professor of hatha yoga at
  the Yoga Vedanta Forest Academy; brought yoga West (first Centre in Montreal, 1957);
  motto "Health is Wealth. Peace of Mind is Happiness. Yoga Shows the Way"; author of
  _The Complete Illustrated Book of Yoga_; peace-missionary flights.

### What We Teach

- **5 Points of Yoga**: Proper Exercise (Asanas), Proper Breathing (Pranayama),
  Proper Relaxation (Savasana), Proper Diet (Vegetarian), Positive Thinking (Vedanta)
  & Meditation (Dhyana).
- **4 Paths of Yoga**: Karma, Bhakti, Raja, Jnana.
- **Sivananda class structure**: pranayama, Sun Salutations, 12 basic asanas, deep
  relaxation. Yoga 1/2 courses → Open/Intermediate classes; variations in Yoga 3 /
  Advanced.

### New to Yoga

- **Yoga 1 (Introduction to Yoga)** and **Yoga 2 (Establish Your Practice)** (incl.
  Headstand). 2-level package = 10% discount. 2-week drop-in pass after Yoga 1.

### Community Outreach (preserve lists verbatim)

- Fundraising causes: Doctors Without Borders (Project Syria); Shanti Girls Gurukulam
  (Trissur); Christie Refugee Centre Christmas drive; Swami Sivananda Rural Hospital
  (Kadavur/Madurai); UN World Food Programme; Fort York Food Bank.
- Program sites: Toronto East General Hospital (Youth Anxiety Clinic); Toronto District
  School Board; Sketch; Robertson House; Hincks-Dellcrest Centre; Kennedy House Youth
  Center; Birchmount Residence.

### FAQ topics (preserve Q&A)

- Where to start; what kind of yoga; beginner courses optional; injuries.
- What to wear (loose clothes, barefoot); mats provided free; change rooms yes;
  no mat storage; no showers.
- Prices (non-profit; registered charity — no one turned away for lack of funds).
- Location/TTC (Spadina station ~2 blocks; 510 streetcar to Harbord); Green P parking
  (Harbord cheaper than Spadina); bike post out front.

### Rental

- Rentable when classes aren't scheduled. Spacious sunlit hall (up to 25; yoga up to 12);
  smaller cozy hall (up to 15). Mats & cushions; fully equipped kitchen. Contact by email.

### Hours (from Contact page)

- Mon 4:30–9pm; Tue 9–11:30am & 4:30–9pm; Wed 4:30–9pm; Thu 9–11:30am & 4:30–9pm;
  Fri 9–11:30am & 4:30–9pm; Sat 9am–1pm & 3:30–6pm; Sun 3:30–8pm.
