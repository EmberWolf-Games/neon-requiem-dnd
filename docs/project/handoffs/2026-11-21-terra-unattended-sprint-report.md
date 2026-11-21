# Terra unattended sprint handoff — 2026-11-21

**Status:** Draft, dependent on [PR #7](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/7); do not merge before resolving that dependency. Base commit: `0df308a66ef1dd6a2cd5425d4c37f385310773c4`. The equipment requirements are on [PR #9](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/9) at `0ee71bcfc9f4a2c36fdddbceeb45f22f6b7181c5`; technology reference [PR #8](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/8) at `b682063c1385dc50d7284a1120fe18a023348999`. These design branches are not included in this branch.

## Implemented

- `module/neon/slots.mjs` supplies pure in-memory body slots, separately owned Cyberware expansion slots, physical equipment capacities and equipment sockets. Category matching and source removal are explicit; detached occupants receive no invented disposition.
- `tests/neon-slots.test.mjs` exercises ownership, capacity, compatibility, isolation and removal without Foundry.
- `module/applications/actor/character-sheet.mjs`, `templates/actors/tabs/character-inventory.hbs`, `less/dnd5e.less`, and `less/v2/neon-slot-prototype.less` add a clearly labeled read-only example to the inherited inventory tab. It does not read or write installed equipment, alter calculations, or update token appearance.
- The [issue ledger](TERRA-UNATTENDED-ISSUE-LOG.md) records findings and deferred work. The project index links this handoff.

## Validation and limitations

Windows, Node 24.15.0, npm 11.7.0; baseline `npm ci --ignore-scripts`, version, manifest and assets checks, tests (14), lint, build, package and package check passed. After changes all checks passed again, with 18 tests and 732 ZIP entries. `git diff --check` passed. No `build:clean` was run.

A separate local Foundry 14.369 instance and new disposable world were used. Character, NPC and weapon sheets opened and a chat roll succeeded on the baseline; the rebuilt prototype displayed its positions, categories and example expansion after a browser reload, with no browser warnings or errors recorded after reload. This is a limited runtime check, not formal remote-install acceptance. Compendium opening, scene/token placement and full world restart with this prototype were not re-tested in this sprint. Existing campaigns were not used.

## Decisions and next actions

Persistent Actor/Item schema, item prerequisites, detached augmentation disposition and derivative migrations remain unresolved; no rule or migration was invented. Reconcile the category wording across the pending design documents. First review and validate PR #7, then review this dependent draft and exercise compendiums, scenes, tokens, reloads and accessibility in a disposable world. Formal GitHub-manifest installation, character identity and animated token development remain separate future work.
