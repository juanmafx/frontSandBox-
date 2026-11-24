# Release Notes: v1.0.0

Version 1.0.0 modernizes this 2022 deployment sandbox. The page keeps its purpose, while the toolchain, structure, tests, and security controls are new.

## Highlights

- Vite, React 19, and strict TypeScript replace Create React App.
- A deny-by-default Content Security Policy protects production builds.
- Automated tests and CI cover the application, build policy, and optional schema.

## Upgrade notes

- Use Node.js 24.15 or later.
- Install with `npm ci --ignore-scripts`.
- Use `npm run dev` instead of `npm start`.
- The production output directory is still `build/`, and `npm run deploy` still publishes it.

## Known limitations

- The live site keeps serving the previous build, including the removed PDF, until a new deployment is made.
- The removed PDF remains in git history.

See [CHANGELOG.md](CHANGELOG.md) for the full list of changes.
