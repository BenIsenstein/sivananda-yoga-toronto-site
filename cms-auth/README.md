# Sivananda CMS Auth broker

A tiny, zero-dependency Node service that performs the GitHub OAuth
code-for-token exchange for **Sveltia CMS** (used by the site's `/admin/`
Content Manager). It exists because a static site cannot safely hold the OAuth
**client secret** in the browser.

- `worker.js` — OAuth logic ported **verbatim** from the official
  [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) worker
  (Web-standard `Request`/`Response`/`fetch`; CSRF cookie + domain allow-list).
- `server.js` — ~40-line `node:http` bootstrap adapting Node req/res to the
  Web-standard handler. No npm dependencies.

## Routes

- `GET /auth` — starts the flow, redirects to GitHub.
- `GET /callback` — completes the flow, returns the token to the CMS popup.
- `GET /` — health check.

## Environment variables

| Variable               | Required | Notes                                             |
| ---------------------- | -------- | ------------------------------------------------- |
| `GITHUB_CLIENT_ID`     | yes      | From the GitHub OAuth App.                         |
| `GITHUB_CLIENT_SECRET` | yes      | From the GitHub OAuth App. **Secret — never commit.** |
| `ALLOWED_DOMAINS`      | recommended | Comma-separated allow-list; supports `*` wildcard. |
| `PORT`                 | no       | Set automatically by Railway.                     |

## Deploy on Railway

1. Create a **new service** in the same Railway project, root directory
   `cms-auth/`.
2. Start command: `npm start` (or `node server.js`).
3. Set the env vars above (never in the repo).
4. Note the service's public domain, e.g.
   `https://sivananda-cms-auth.up.railway.app`.

## GitHub OAuth App

- **Authorization callback URL:** `https://<broker-domain>/callback`

## Wire the CMS

In `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: BenIsenstein/sivananda-yoga-toronto-site
  branch: main
  base_url: https://<broker-domain>
  auth_endpoint: oauth
```

## Local test

```sh
GITHUB_CLIENT_ID=x GITHUB_CLIENT_SECRET=y PORT=3000 npm start
# then: curl -s localhost:3000/  -> "Sveltia CMS Auth broker is running."
```
