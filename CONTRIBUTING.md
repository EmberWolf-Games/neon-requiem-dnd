# Contributing

Neon Requiem is currently establishing its derivative system foundation. Keep changes focused and preserve the upstream rules engine while this setup is being validated. Custom setting mechanics, character progression changes, and sheet redesigns are outside this initial repository setup scope.

## Before making changes

1. Read [Architecture](docs/ARCHITECTURE.md), [Development](docs/DEVELOPMENT.md), [Versioning](docs/VERSIONING.md), and [Upstream](docs/UPSTREAM.md).
2. Check that no repository-level `AGENTS.md` or package-specific guidance has been added for your area.
3. Use a topic branch and keep commits small enough to review.
4. Preserve upstream copyright notices and every applicable file-level license.

## Development practices

- Use Node.js `24.15.0` and the committed npm lockfile. Install with `npm ci --ignore-scripts`.
- Use modern JavaScript ES Modules and the existing ESLint configuration.
- Keep `system.json` as the only source of the Foundry system version. Do not put a four-part version into npm metadata.
- Preserve the upstream internal `dnd5e` namespace unless an individual integration has been reviewed and adapted. Never perform a broad global replacement.
- Keep source files in their source locations. Do not commit `node_modules/`, generated packs, compiled CSS/JavaScript, or release ZIPs.
- Add or update tests for versioning, package metadata, and other infrastructure behavior.
- Do not claim an inherited feature works until it has been checked in the supported Foundry runtime.

## Local validation

Before opening a pull request, run:

```powershell
npm run check:version
npm run check:manifest
npm run check:assets
npm test
npm run lint
npm run build
npm run package
npm run check:package
```

If a live Foundry v14 installation is unavailable, say so in the pull request and leave the in-app smoke check marked pending.

## Upstream updates

Start from an exact official D&D 5e source tag. Do not use the compiled release ZIP as an editable source tree. Record the tag and commit, inspect changed entry points, build steps, compendia, licenses, and asset provenance, then adapt package identity and runtime paths in a reviewed way. Rerun `npm run assets:adapt` only after checking the new upstream files and their licenses.

## Pull requests

Use the pull request template. Explain what changed, how it was checked, whether the change modifies upstream behavior, and any Foundry runtime validation that remains. Keep release creation and merge decisions with the project maintainers.
