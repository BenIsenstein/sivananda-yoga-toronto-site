# Editing the Website (Content Manager)

The Toronto Sivananda Yoga Vedanta Centre website has a built-in **Content
Manager** for staff to add and edit events, courses, and policies — no coding
required.

- **URL:** `https://<your-site-domain>/admin/`
- **Login:** with your GitHub account (you must be added as a repo collaborator
  first — ask the site administrator).

> **Important:** When you save, your change is committed to the website's code
> and the site **rebuilds automatically**. Your edit goes live in about
> **1–2 minutes** — it is not instant. Refresh the public page after a couple of
> minutes to see it.

---

## Logging in

1. Go to `https://<your-site-domain>/admin/`.
2. Click **Login with GitHub** and authorize.
3. You'll see three collections in the sidebar: **Events**, **Courses**,
   **Policies**.

---

## Adding an event

1. Click **Events → New Event**.
2. Fill in the fields:
   - **Title** (required).
   - **Categories** (required) — pick one or more. These control the filter
     pills on the Events page:
     Regular Courses, Special Practices, Education, Retreats, Teacher Trainings.
   - **Start date** — the day the event begins.
   - **End date** — _only_ for multi-day events. Leave empty for a single-day
     event.
   - **Time (text)** — free text like `6:30–7:45 pm`. Shown on single-day
     events.
   - **Price (text)** — e.g. `$120` or `By donation`.
   - **Image** + **Image alt text** — upload a photo and describe it briefly.
   - **Teacher / facilitator** — optional.
   - **Register link** — the Acuity or Square URL.
   - **Register note** — optional text shown under the button (see
     _By-donation events_ below).
   - **Ongoing** — see _Ongoing items_ below.
   - **Draft** — turn on to hide the event from the site while you work on it.
   - **Description** — the main body text (supports headings, bold, lists,
     links).
3. Click **Save**. Wait 1–2 minutes, then check the live Events page.

### Single-day vs multi-day

- **Single-day:** set **Start date**, leave **End date** empty. The **Time**
  text is shown (e.g. "Aug 15 · Saturday 1–2:30 pm").
- **Multi-day:** set both **Start** and **End**. The site shows a date range
  (e.g. "Aug 14 – Sep 11") and does not show the Time text.

### By-donation events (e.g. Yoga at the Park)

- Put the **Square donate link** in **Register link**.
- In **Register note**, explain the follow-up step, for example:
  > Registration is by donation. Please donate via Square, then email us at
  > toronto@sivananda.org to let us know which date you're attending.

### Ongoing items (e.g. teacher trainings)

For things that don't have fixed dates yet ("announced through the year"):

- Leave **Start date** and **End date** empty.
- Turn **Ongoing** on.

Ongoing items always show on the Events page and sort to the end of the list.

### Past events

You don't need to delete old events — once an event's date has passed, it is
**hidden from the site automatically** on the next rebuild. It stays in the
Content Manager as a record.

---

## Adding or editing a course

**Courses** are the evergreen "what we teach" description pages (no dates). If a
course has specific upcoming dates, add those as an **Event** instead.

1. Click **Courses → New Course** (or pick an existing one to edit).
2. Fields: **Title**, **Summary**, **Sort order** (lower numbers appear first on
   the Courses hub), **Image** + **Image alt text**, **Register link**,
   **Draft**, **Description**.
3. **Save** and wait for the rebuild.

---

## Editing a policy

**Policies → pick a policy → edit the Body → Save.** Optionally set a **PDF URL**
if the policy links to a PDF.

---

## Uploading images

- Use the **Image** field's upload button. Images are stored with the site and
  optimized automatically.
- Prefer landscape photos; very large files are fine (they're compressed on
  build).
- Always fill in **Image alt text** for accessibility.

---

## Troubleshooting

- **My change isn't showing.** Wait 2 minutes and hard-refresh. Rebuilds aren't
  instant.
- **I can't log in.** You need write access to the GitHub repository — ask the
  site administrator to add you as a collaborator.
- **I made a mistake.** Every save is a version in GitHub history and can be
  undone by the administrator.

---

---

# Administrator setup (one-time)

This section is for the site owner/developer. It records how the Content Manager
authentication is wired. **Secrets are never committed to the repo.**

## Overview

Sveltia CMS uses the **GitHub backend**. Because this is a static site, GitHub's
OAuth code-for-token exchange must happen on a small server-side **OAuth broker**
(it holds the OAuth _client secret_, which must never ship to the browser). We
run that broker on **Railway**.

## 1. Create a GitHub OAuth App

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fields:
   - **Application name:** `Sivananda Toronto CMS`
   - **Homepage URL:** `https://<your-site-domain>`
   - **Authorization callback URL:** `https://<broker-domain>/callback`
     (the Railway broker URL from step 2, path `/callback`).
3. Create it, then **generate a client secret**. Note the **Client ID** and
   **Client Secret** — you'll paste them into Railway, not the repo.

## 2. Deploy the OAuth broker on Railway

The broker lives in this repo at **`cms-auth/`** — a zero-dependency Node
service that ports the official `sveltia-cms-auth` logic verbatim (see
`cms-auth/README.md`). Deploy it as a **separate Railway service** from the
static site.

1. Railway → **New Service** in the same project.
2. Point it at this repo with **root directory `cms-auth/`** and start command
   `npm start` (Node 20+).
3. Set environment variables on that Railway service (never in the repo):
   - `GITHUB_CLIENT_ID` = the OAuth App client id
   - `GITHUB_CLIENT_SECRET` = the OAuth App client secret
   - `ALLOWED_DOMAINS` = `<your-site-domain>` (lock the broker to this site)
4. Deploy and note the broker's public origin,
   e.g. `https://sivananda-cms-auth.up.railway.app`.
5. Confirm it's up: visiting the broker origin returns
   "Sveltia CMS Auth broker is running."

## 3. Point the CMS at the broker

In `public/admin/config.yml`, set:

```yaml
backend:
  name: github
  repo: BenIsenstein/sivananda-yoga-toronto-site
  branch: main
  base_url: https://<broker-domain> # <-- replace REPLACE-WITH-OAUTH-BROKER-ORIGIN
  auth_endpoint: oauth
```

Commit that one-line change (the broker **origin** is not a secret; the client
**secret** stays only in Railway env).

## 4. Grant editor access

Add each staff member as a **collaborator with write access** on
`BenIsenstein/sivananda-yoga-toronto-site`. They can then log in at `/admin/`.

## 5. Verify

1. Visit `https://<your-site-domain>/admin/`.
2. **Login with GitHub** → authorize → the collections load.
3. Make a trivial test edit (e.g. a Draft event), save, and confirm a commit
   lands on `main` and Railway redeploys.

## Notes

- `/admin/` is marked `noindex`; it is not linked from the site navigation.
- The repo is public; **write access is still required to save**, so public
  visibility does not grant editing.
- Image uploads land in `src/assets/events` (or `.../courses`) and are optimized
  by `astro:assets` on build, matching how existing images work.
