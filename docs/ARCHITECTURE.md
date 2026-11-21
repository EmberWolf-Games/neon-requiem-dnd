# Architecture

## Foundry package identity

Neon Requiem is a standalone Foundry Game System. The root `system.json` declares ID `neon-requiem-dnd`; `foundryvtt.json` declares `project.type` as `system`. The manifest has no dependency relationship to the official `dnd5e` system.

The source starts from official Foundry D&D 5e v6.1.1. It retains the upstream entry point name `dnd5e.mjs`, language keys, document schemas, migration code, and internal `dnd5e` flag namespace to avoid breaking data and code that uses these values. The package ID, compendium `system` fields, and static `systems/neon-requiem-dnd/...` runtime asset paths were adapted to the Neon Requiem system folder. Internal `dnd5e` keys are not installation dependencies. Foundry v14 validates flag scopes against active package IDs, so the derivative registers the inherited scope with the client database backend; this compatibility bridge requires review against future Foundry releases.

## Runtime source and build

| Source area | Role |
|---|---|
| `dnd5e.mjs`, `module/` | Entry point and JavaScript rules engine, documents, sheets, applications, and utilities |
| `templates/`, `less/`, `lang/` | Handlebars templates, Less styles, and English localization |
| `packs/_source/` | Editable YAML source for the inherited compendia |
| `icons/`, `fonts/`, `json/` | Retained licensed icons, fonts, and runtime configuration data |
| `system.json` | Foundry package manifest and canonical version |
| `foundryvtt.json` | Build/package include configuration; identifies this as a system |
| `utils/packs.mjs` | Upstream compendium packaging helper |
| `scripts/` | Version, manifest, provenance, and distribution package tooling |

The upstream build uses Rollup for JavaScript, Less for CSS, and `@foundryvtt/foundryvtt-cli` through `utils/packs.mjs` for compendia. `npm run build` keeps that sequence. Generated CSS, compiled JavaScript, maps, and packed compendium data are ignored and created locally or in CI.

During pack compilation, references to upstream `Compendium.dnd5e` packs are adapted only when the pack name exists in this system's manifest. Editable YAML remains unchanged. External and unrecognized pack references are not rewritten.

`scripts/package.mjs` stages only files referenced by the system manifest and `foundryvtt.json`. It writes a deterministic ZIP with sorted root-relative paths and a fixed timestamp. The archive contains `system.json` at its root and does not include npm or Git metadata.

## Upstream adaptation boundary

The initial derivative change is limited to package identity, Foundry installation paths, and asset references that cannot be redistributed under their upstream terms. The internal rules/data namespace is kept. Custom setting rules, progression changes, and sheet redesigns are not part of this baseline.

Some upstream code and content refer to the official dnd5e folder path. The asset adaptation script replaces specific source path prefixes; it does not replace every occurrence of the string `dnd5e`. Review each new path change before upstream updates.

The standalone system has been exercised in a local Foundry v14 test world, but the full smoke test is not complete. In particular, remaining upstream compendium references require an audit, and derivative version migrations require a separate policy. Treat a complete live smoke test and the remote installation test as release gates. See the [preflight handoff](project/handoffs/2026-11-21-foundry-preflight-terra-to-luna.md).

## Data and licensing boundary

The inherited compendium sources include SRD 5.1 and 5.2 material. Those sources are attributed under CC BY 4.0. Upstream software uses MIT, while fonts and icons retain their own license files. Upstream token, official Wizards artwork, spell-tier images, and other uncertain or narrowly licensed assets are excluded. See [Upstream](UPSTREAM.md) and [Third-Party Notices](../THIRD-PARTY-NOTICES.md).
