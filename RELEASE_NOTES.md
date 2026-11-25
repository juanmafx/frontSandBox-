# Release Notes: v1.0.1

Documentation-only patch on top of 1.0.0. No code or behaviour changes.

## Changes

- The live site at https://juanmafx.github.io/react-pages-sandbox/ now serves the 1.0.0 build. The `gh-pages` branch was replaced with a single deployment commit, so the removed third-party PDF is no longer served or kept in that branch.
- The repository history was rewritten on 2026-11-24 and keeps only the 2026 modernization commits.
- The security audit marks the third-party PDF item as resolved.

## Upgrade notes

Unchanged from 1.0.0: use Node.js 24.15 or later, install with `npm ci --ignore-scripts`, run `npm run dev` for local work and `npm run deploy` to publish.

See [CHANGELOG.md](CHANGELOG.md) for the full list of changes.
