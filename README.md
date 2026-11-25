# react-pages-sandbox

A small React and TypeScript sandbox for proving that a frontend change can move from a local edit through checks and a production build to GitHub Pages.

> **Project history:** originally created in 2022, modernized in 2026.

## Purpose

This repository is a deployment sandbox, not a product. It renders one landing page with the author's name, the file to edit, and a link to the deployed site.

## Why it exists

It provides a low-risk place to try a frontend toolchain and the GitHub Pages release path without touching a real application.

## What it does

- Renders a responsive, single-page landing screen with React 19.
- Validates external links, rendering plain text instead of a link for anything other than a credential-free `https:` URL.
- Adds a strict Content Security Policy to production builds.
- Builds static files for the `/react-pages-sandbox/` base path.
- Publishes the build to the `gh-pages` branch when `npm run deploy` is run manually.

It has no backend, authentication, forms, analytics, or runtime data storage.

## Architecture

```text
index.html                 HTML entry point
src/
  main.tsx                 Browser bootstrap
  app/                     Application root and global styles
  config/                  Typed site configuration
  features/landing/        Landing page feature
  shared/components/       Reusable UI
  shared/security/         URL validation
  test/                    Test setup
tooling/                   Build-time security plugin
db/                        Optional SQL schema
reports/tests/             Committed test report
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the dependency rules and design decisions.

## Quick start

Requires Node.js 24.15 or later. The exact version used is in `.nvmrc`.

```bash
nvm use
npm ci --ignore-scripts
npm run dev
```

Open the local URL that Vite prints, which includes the `/react-pages-sandbox/` base path.

## Usage guide

| Command | Result |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and writes a production build to `build/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Runs the TypeScript compiler without emitting files |
| `npm test` | Runs the test suite once |
| `npm run test:report` | Runs the tests and rewrites `reports/tests/` |
| `npm run verify` | Runs lint, type checks, tests, and the build |
| `npm run deploy` | Builds and publishes to the `gh-pages` branch |

To change the page content, edit `src/config/site.ts`.

## Configuration

The app reads no environment variables and needs no secrets.

| Setting | Location |
| --- | --- |
| Author name, deployment URL, link label, displayed file path | `src/config/site.ts` |
| Deployment base path | `base` in `vite.config.ts` |
| Content Security Policy | `tooling/contentSecurityPolicy.ts` |
| npm install policy | `.npmrc` |

## Database

**The database is optional and the application does not use it.** This project has no natural persistence, so `db/schema.sql` offers a small SQLite schema for anyone who wants to keep test run history.

```bash
sqlite3 test-runs.db < db/schema.sql
```

The schema uses `STRICT` tables, which require SQLite 3.37 or later. SQLite enforces foreign keys per connection, so run `PRAGMA foreign_keys = ON;` after every connect. Without it, orphaned rows are accepted and cascading deletes do not run.

## Testing

```bash
npm test
```

The suite uses Vitest and Testing Library. It covers rendering, accessibility roles, URL validation, the Content Security Policy, and the SQL schema constraints. The output of the latest real run is in [reports/tests/](reports/tests/).

## Security notes

- Production builds apply a deny-by-default Content Security Policy with no inline or evaluated code.
- Dependencies are pinned to exact versions and installed with lifecycle scripts disabled.
- CI runs with read-only repository permissions and actions pinned to commit hashes.

See [SECURITY.md](SECURITY.md) and [docs/SECURITY_AUDIT.md](docs/SECURITY_AUDIT.md).

## Credits and license

- Originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which is MIT licensed. `public/favicon.ico`, `public/logo192.png`, `public/logo512.png`, and `src/assets/logo.svg` are unmodified files from its template.
- The deployment approach follows [How to deploy React App to GitHub Pages](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f), an article on DEV Community credited there to Ibrahim Ragab.

Licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE).
