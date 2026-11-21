# Upstream Foundation

## Source identity

- **Project:** [Foundry VTT D&D 5e](https://github.com/foundryvtt/dnd5e)
- **Version:** `6.1.1`
- **Official source tag:** [`release-6.1.1`](https://github.com/foundryvtt/dnd5e/releases/tag/release-6.1.1)
- **Source commit:** [`bc1b2c921e2f306dc5079f8de883ad64607118a6`](https://github.com/foundryvtt/dnd5e/commit/bc1b2c921e2f306dc5079f8de883ad64607118a6)
- **Foundry minimum in upstream manifest:** `14.367`

No upstream source archive was present in the workspace before setup. The exact official source tag was fetched from GitHub and inspected directly. The compiled release ZIP is a separate distribution artifact and was not used as the editable source tree.

## Imported source and build system

The source tree includes the upstream ESM entry point, `module/`, Handlebars templates, Less styles, language data, YAML compendium source, and build scripts. The project retains upstream Rollup, Less, Foundry CLI, ESLint, and npm lockfile conventions.

The upstream build commands are `build:code`, `build:css`, and `build:db`, combined by `npm run build`. The original release helper assumes the upstream repository, upstream tag naming, and upstream download URLs; Neon Requiem uses its own package and release scripts so its manifest and tag cannot silently point to the official dnd5e release.

## Identity changes

- The Foundry system ID and title are `neon-requiem-dnd` and `Neon Requiem`.
- Pack declarations identify the Neon Requiem system.
- Static `systems/neon-requiem-dnd/...` installation paths were adapted to `systems/neon-requiem-dnd/...`.
- Upstream `dnd5e` data flags, migration keys, localization keys, and internal APIs are retained where they define the inherited schema.
- The manifest does not declare a runtime dependency on the official dnd5e system.

These targeted changes preserve the upstream rules engine's internal conventions while giving the installed system its own Foundry identity. They require a live Foundry smoke test before functional claims are made.

## License and asset audit

The upstream README identifies the software component as MIT and says bundled images and other assets have separate terms. The original upstream `LICENSE.txt`, `CONTRIBUTORS.md`, and per-asset license files are retained.

The source includes SRD 5.1 and SRD 5.2 content under CC BY 4.0. Attribution is provided in `LICENSES/` and `THIRD-PARTY-NOTICES.md`. Included Roboto fonts retain Apache 2.0 or SIL OFL 1.1 notices. Included general SVG icons retain their per-icon CC BY 3.0/CC0 attributions.

The source also contains assets that cannot be assumed to be covered by MIT. This setup excludes Forgotten Adventures and Caeora tokens, Wizards of the Coast school/official UI artwork, spell-tier images with separate restrictions, unlicensed currency images, and UI assets without an independent license notice. The compendium image references are replaced with generic placeholders, and the upstream token-mapping file is removed. CI checks that excluded asset paths and references stay out of the source package.

## Update strategy

For each upstream update:

1. Select and record an exact official source tag and commit. Do not use a compiled release ZIP as the source of truth.
2. Review the upstream release notes, manifest, entry points, dependencies, build scripts, compendium changes, and each new or changed asset license.
3. Compare upstream changes with Neon Requiem identity and versioning changes. Keep internal namespace changes narrow and reviewable.
4. Run `npm run assets:adapt` only after confirming the upstream asset categories and paths. Review its diff; it intentionally removes restricted asset directories and rewrites only known runtime path prefixes.
5. Update this document and third-party notices, run the full CI commands, package check, and a live Foundry smoke test.

The upstream baseline for this setup is fixed at `release-6.1.1`; newer versions must not be substituted without an explicit project decision.
