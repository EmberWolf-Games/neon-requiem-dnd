# Terra Wave 3 — implementation and review handoff

**Date:** 2026-11-21. **Branch:** `feature/wave-3-sheet-foundation`. **Base:** verified `origin/main` at `0658889ba34f297aeb335a467fb6e4eadf85fca2`. **Version:** `0.1.1.000`. Design references: [equipment/slots](../gdd/Neon_Requiem_GDD_Equipment_and_Slots.md), [technology systems](../gdd/Neon_Requiem_GDD_Technology_Systems_Foundation.md), [identity and fixed token art](../gdd/Neon_Requiem_GDD_Character_Creator_Animation_Addendum_v2.md); [prior persistence proposal](2026-11-21-persistence-migration-proposal.md) is not an approved schema. Findings and remaining decisions are tracked in the [issue ledger](TERRA-UNATTENDED-ISSUE-LOG.md).

## Workstreams

| Workstream | Status | Evidence and remaining limits |
| --- | --- | --- |
| A — runtime regression | PARTIAL / BLOCKED | New disposable world in separate Foundry 14.369 data directory. Main baseline character opened. Branch opt-in character and weapon sheet opened, created and equipped/unequipped an owned weapon; projection updated. A lit, nonblank scene and named token were created; movement (300,200) → (400,200) survived browser reload and isolated world/server restart. Static image path remained `systems/neon-requiem-dnd/icons/svg/actors/character.svg` after unequipping. Server reported 26 newer-core compendium-record migration errors; see TERRA-022. NPC, separate equipment sheet, a new chat roll, compendium document/link, item move, animation/media process and broader multiuser checks were not completed. No formal remote install was tested. |
| B — opt-in sheet | PARTIAL | Non-default Foundry sheet selection preserves inherited tabs, actions and biography; actual visible physical embedded items are projected with inherited quantity/equipped state. Slot categories and positions are explicitly not assignments; Cyberware expansion is an example and Hacks are planned. Foundry rendered it at 1440×900 and 1024×768; Enter expanded positions. A full dedicated overview/combat layout and non-owner runtime test remain open. |
| C — inventory projection | PARTIAL | Pure snapshot projector tests empty, invalid, duplicate and hidden records, container labels, stable identifiers, deterministic sorting and isolation. Foundry live-tested owner creation and equip rerender. Non-owner unidentified visibility, move between containers and broad multiuser behavior need runtime tests (TERRA-020/024). |
| D — slot simulation | COMPLETE for isolated scope | Existing multi-position/capacity, source ownership and immutability tests retained; explicit assignment dry run reports success/errors without writes. No item eligibility, salvage, persistence or combat rules added. |
| E — fixture serialization | COMPLETE for prototype scope | Plain JSON-only validation, deterministic encoding/decoding, explicit clone remap, reference checks, dry-run changed fields and rollback snapshot are tested; no Foundry documents are accessed or persisted. This is an experiment, not an approved schema or migration. |
| F — startup/content audit | PARTIAL | English welcome and project support links verified. Inherited content listing fetches bundled and upstream metadata, links to a store and can activate already-installed modules; a compatibility/license notice is visible on the tab. No premium content enabled. Only English ships; other locales and content licensing/compatibility remain open. |
| G — CI and safety | PARTIAL | Documented checks passed locally; CI-only checkout/setup-node updated to v5 (Node 24); hosted run 44960223321 passed without annotations on `6841891`. Final head requires its own run. Release workflow and permissions unchanged. The Foundry 14.369 compendium incompatibility blocks an installability claim. |
| H — handoff | COMPLETE | This report, issue ledger, owner decisions and ranked backlog are provided for review; draft PR requested against main. |

## Actual runtime procedure and evidence

- Licensed Foundry VTT 14.369; new local test-only data path under the workspace, port 30002, zero active modules; new world `Wave 3 Disposable Baseline`. Baseline package built from the base commit. The branch build was copied only into the isolated test system and reloaded; no campaign world was used.
- Created `Wave Three Hero`; selected **Configure Sheet → This Sheet → Neon Requiem — Read-only Overview**. Created `Fixture Pistol` via inherited inventory; the sheet showed it, quantity 1 and inherited equip state, and reflected an equip toggle. Other inherited controls and biography tab were present; their complete behavior was not all tested. User can choose the D&D 5e character sheet from the same configuration.
- Created `Wave 3 Lit Test`, used Foundry's bundled `ui/parchment.jpg`, disabled token vision, enabled global illumination. Token configuration showed `(300, 200)` initially, `(400, 200)` after drag and after reload, and `(400, 200)` after returning to Setup, stopping the verified test listener, restarting, relaunching the world and viewing the scene. The unclean server stop left a test-only lock; it was moved aside after confirming no matching process, then restarted (TERRA-023).
- Token appearance setting before and after unequipping retained the same static system SVG path. No animation states or encoder behavior were instrumented, so those remain unverified.
- At 1024×768, the final sheet showed the owned item and inherited controls, and keyboard Enter opened the collapsed positions. 1440×900 was also used during the runtime session. The browser initially reported the actual 1280×720 viewport was below Foundry's 1024×768 minimum; it was resized. No browser errors were reported after the branch reload in the initial 1440×900 test; browser logs are not a substitute for the server log.
- **Important:** Foundry attempted automatic core migration while loading inherited compendia on 14.369 and refused records marked core 14.370. We did not run a system migration, modify inherited pack source or downgrade record metadata. This is an existing baseline failure that needs investigation before compatibility or release claims.

## Test matrix

Windows, Node 24.15.0, npm 11.7.0. Baseline at `0658889`: `npm ci --ignore-scripts` exit 0 (218 packages, zero reported vulnerabilities), `check:version`, `check:manifest`, `check:assets`, `npm test` (21/21), `lint` (exit 0 with one pre-existing warning), `build`, `package`, `check:package` (732 entries), all exit 0. Final local source: version/manifest/assets checks, `npm test` (27/27), lint without warnings, build, package, package check (733 entries), and `git diff --check` passed. `build:clean` was not run. CI action v5 run noted above passed; check the PR's final head separately.

## Files and commits

- `e72259d`: fixture-only slot validation/serialization and tests; in-memory equipment dry run and test.
- `9b03dcd`: opt-in sheet, projection module and tests, template, sheet registration and accessible styles; removes a redundant final return without changing migration behavior.
- `6841891`: CI action versions, content notice, English localization, issue entries.
- `a798698`: reject non-JSON fixtures, provide changed-field dry-run report and isolated rollback snapshot.
- This handoff and subsequent documentation commits record actual final findings; see `git log` for their final IDs.

Changed paths are `.github/workflows/ci.yml`, `dnd5e.mjs`, `lang/en.json`, `less/v2/neon-slot-prototype.less`, `module/applications/actor/_module.mjs`, `module/applications/actor/neon-character-sheet.mjs`, `module/neon/inventory-projection.mjs`, `module/neon/fixture-serialization.mjs`, `module/neon/slots.mjs`, `templates/actors/tabs/neon-character-inventory.hbs`, `templates/apps/welcome-modules.hbs`, the three corresponding test files, this report, project index and issue ledger. No version, lockfile, inherited source packs, release workflow or media asset changed.

## Owner decision record — proposals only

1. **Actor/Item relationships:** Decide whether identity choices and loadout assignments reference embedded Items, compendium sources, or both, and how owners and GMs authorize edits. Do not treat example `schemaVersion: 1` or JSON keys as a permanent API.
2. **Namespace/schema:** A future system-owned namespace such as `neon-requiem-dnd`, with a dedicated integer schema version separate from system/upstream versions, is a proposal; registration, storage location, validation boundary and permissions need review.
3. **Migration/backup:** Decide upgrade gates, pre-change backups, dry-run reports, crash recovery, restoration and downgrade support before any real migration.
4. **Cyberware removal:** Decide whether removed occupants are retained on hardware, salvaged, transferred or lost; the active-slot rule does not decide physical disposition.
5. **Clone/import:** Approve explicit actor-local item-ID remapping, missing-source handling and ambiguity policy for duplicated/imported documents; current remapping exists only for fixtures.
6. **Compatibility:** Define item-specific position and Cyberware restrictions and attachment/socket rules. No compatibility is inferred from item names or artwork.

## Ranked next-sprint backlog

1. Resolve TERRA-022: compare official upstream source/provenance and 14.370+ behavior; choose a reviewed compatibility remedy and repeat full disposable regression before claiming v14.367/369 support.
2. Review persistence, ownership, migration, rollback and Cyberware disposition decisions; only then design persistent loadouts and item lifecycle tests.
3. Expand the opt-in sheet, non-owner permissions and full inventory/scene regression; verify no equipment-driven media changes across supported clients.
4. Character identity selections after schema and authorization rules are approved; creator/media work remains independently scoped.
5. Item catalog and explicit compatibility rules before persistent equipment placement; Hacks after approved hardware/software prerequisites; full class implementation after the shared progression and underlying systems are approved.

No merge, tag, release, deployment, system-version increment, campaign edit, `build:clean` or hand-written production migration was performed.
