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

Build output is ignored by Git. The upstream `npm run build:clean` command rewrites YAML files under `packs/_source/`; it does not remove generated compendium output. Do not use it as a build-output cleanup command.

## Create and verify a local package

```powershell
npm run package
npm run check:package
```

The package appears at `dist/neon-requiem-dnd.zip`; the staged installation files are in `dist/package/`. The ZIP is deterministic for the same source and Node/zlib toolchain, and its paths begin at the system root. Local packages omit a `download` URL because they are not published releases.

For a release candidate, the workflow calls `npm run package:release -- vM.m.r.b`. That command requires the tag to match `system.json` and writes a release-specific manifest with the corresponding GitHub asset URL.

## Foundry smoke test

Follow the [Local Foundry v14 smoke-test guide](SMOKE-TESTING.md) for the remote-manifest test procedure, test checklist, and diagnostic evidence to collect. The guide distinguishes a local package/layout check from the owner-approved live acceptance test, which must install from GitHub.

No live Foundry v14 runtime test has been performed. Do not describe the system as installable or playable until the remote installation and smoke-test checklist have been completed successfully.
