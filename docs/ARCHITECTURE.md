# Architecture

## Overview

react-pages-sandbox is a static single-page application. Vite compiles it to HTML, CSS, JavaScript, and images, and GitHub Pages serves those files. There is no server component, so the project is not split into `frontend/` and `backend/`.

```text
Source -> Lint, type check, test -> Vite build -> build/ -> gh-pages branch -> GitHub Pages
```

## Module structure

```text
src/
  main.tsx
  app/
    App.tsx
    App.test.tsx
    global.css
  assets/
    logo.svg
  config/
    site.ts
  features/
    landing/
      components/
        LandingPage.tsx
        LandingPage.css
        LandingPage.test.tsx
  shared/
    components/
      ExternalLink.tsx
      ExternalLink.test.tsx
    security/
      safeExternalUrl.ts
      safeExternalUrl.test.ts
  test/
    setup.ts
tooling/
  contentSecurityPolicy.ts
  contentSecurityPolicy.test.ts
db/
  schema.sql
  schema.test.ts
```

## Dependency rules

| Layer | May import from |
| --- | --- |
| `app` | `features`, `config`, `shared` |
| `features` | `config`, `shared`, `assets` |
| `shared` | `shared` only |
| `config` | Nothing |
| `tooling` | Build tool types only, never `src` |

Features do not import from one another. Code needed by two features moves to `shared`.

## Design decisions

| Decision | Reason |
| --- | --- |
| Vite replaces Create React App | Create React App is deprecated and carried a large, vulnerable dependency tree |
| Strict TypeScript | Catches configuration and component contract errors before runtime |
| Configuration is passed as props | Components can be tested with fixture data |
| CSP is added at build time | The development server needs inline behavior that production must forbid |
| CSP uses a meta tag | GitHub Pages does not allow custom response headers |
| Assets are never inlined | Allows `img-src 'self'` without permitting `data:` URLs |

## Recommended evolution

Add new screens under `src/features/<name>/`. If the sandbox ever needs server code, move the client to `frontend/`, add a separate `backend/`, and connect them through a versioned API.
