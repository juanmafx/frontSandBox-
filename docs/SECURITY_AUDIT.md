# Security Audit

**Date:** 2026-11-23. **Scope:** the working tree of version 1.0.0, its dependency lockfile, its CI workflow, and a pattern-based secret scan of all local git refs.

This is a self-review using automated tools and manual reading. It is not an independent penetration test.

## Results

| Area | Finding | Status |
| --- | --- | --- |
| Dependencies | `npm audit` on the previous lockfile reported 78 advisories: 8 critical, 35 high, 21 moderate, 14 low | Fixed: 0 reported after the migration |
| End-of-life tooling | Create React App 5 is deprecated | Fixed: replaced with Vite |
| XSS | No raw HTML rendering; text is escaped by React and covered by a test | No issue found |
| Unsafe links | External links had no central validation | Fixed: only credential-free `https:` URLs become links |
| Unsafe evaluation | No `eval` or equivalent in source | Fixed in policy: blocked by lint rules and CSP |
| Content Security Policy | None | Fixed: deny-by-default policy in production builds |
| Injection and CSRF | No backend, forms, queries, or state-changing requests | Not applicable |
| Password hashing | No credentials are handled | Not applicable |
| Hardcoded secrets | No matches in the tree or local history | No issue found |
| Supply chain | Version ranges and install scripts were allowed | Fixed: exact versions, scripts disabled, CI actions pinned |
| CI permissions | No CI existed | Fixed: read-only token and no persisted credentials |
| Third-party content | A full copy of an external article was published with the site | Partly fixed: see below |

## Open items

1. **Third-party PDF.** It is removed from this branch but remains in git history and on the live `gh-pages` branch until the site is redeployed.
2. **Response headers.** GitHub Pages does not allow custom headers. Protections that require them, such as `frame-ancestors`, are unavailable on this host.

## Reproducing the checks

```bash
npm ci --ignore-scripts
npm audit
npm run verify
```
