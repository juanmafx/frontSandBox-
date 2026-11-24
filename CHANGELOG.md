# Changelog

This project follows [Semantic Versioning](https://semver.org/).

## [1.0.1] - 2026-11-24

### Changed

- Documentation now reflects the published 1.0.0 release, the redeployed site and the rewritten history. No code changes.

## [1.0.0] - 2026-11-24

### Changed

- **Breaking:** replaced Create React App with Vite and renamed the `start` script to `dev`.
- **Breaking:** Node.js 24.15 or later is now required.
- Migrated the source to strict TypeScript in a feature-based module structure.
- Upgraded React to version 19 and pinned all dependencies to exact versions.
- Rewrote the README and replaced template metadata and UI text.

### Added

- Automated tests, a committed test report, and a CI workflow.
- A production Content Security Policy and external URL validation.
- Architecture, security, and release documentation.
- An optional SQLite schema for test run results.

### Removed

- The unused `web-vitals` integration.
- `public/gbDeploy.pdf`, a full copy of a third-party article. The README now credits and links to the original.

### Fixed

- The original test, which looked for text the page never rendered.
