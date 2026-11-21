# Development

## Requirements

- Node.js `24.15.0` as recorded in `.nvmrc`; `package.json` requires Node.js `>=24.15.0`.
- npm `11.7.0` or a compatible npm release.
- Git for branches and source history.
- A licensed Foundry VTT v14 installation for the in-app smoke test. Foundry itself is not bundled with this repository.

The source follows the EmberWolf Games Foundry System template's JavaScript ES Module convention and uses the upstream `dnd5e` build tools.

## Install dependencies

```powershell
npm ci --ignore-scripts
```

The lockfile is committed. `npm ci` is preferred for a clean install; the project runs explicit build commands rather than relying on install hooks.

## Local validation

```powershell
npm run check:version
npm run check:manifest
npm run check:assets
npm test
npm run lint
```

`npm test` uses Node's built-in test runner. The version tests cover the four-part parser and formatter, transitions, numeric comparisons, three-digit Build padding, release sequencing, Major approval, and exhaustion.

## Build the inherited source

```powershell
npm run build
```

This runs the upstream steps in order:

1. Rollup compiles `dnd5e.mjs` to `dnd5e-compiled.mjs`.
2. Less compiles `less/dnd5e.less` to `dnd5e.css`.
3. The Foundry CLI compiles the YAML under `packs/_source/` into local pack data.

Build output is ignored by Git. Run `npm run build:clean` to remove generated compendium output before rebuilding.

## Create and verify a local package

```powershell
npm run package
npm run check:package
```

The package appears at `dist/neon-requiem-dnd.zip`; the staged installation files are in `dist/package/`. The ZIP is deterministic for the same source and Node/zlib toolchain, and its paths begin at the system root. Local packages omit a `download` URL because they are not published releases.

For a release candidate, the workflow calls `npm run package:release -- vM.m.r.b`. That command requires the tag to match `system.json` and writes a release-specific manifest with the corresponding GitHub asset URL.

## Foundry smoke test

No live Foundry runtime is bundled or configured in this workspace. Before calling the derivative installable, copy a built package into a clean Foundry v14 data folder under `systems/neon-requiem-dnd/`, start Foundry without the official `dnd5e` system installed, and check system registration, a new world, core actor/item sheets, rolls, compendium access, and a basic world reload. Also run the version comparison checks in [Versioning](VERSIONING.md).

Record the exact Foundry version and results in the release review. Until this is completed, the app remains unvalidated as a playable derivative.
