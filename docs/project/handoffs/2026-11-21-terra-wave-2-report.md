# Terra Wave 2 implementation report — 2026-11-21

**Branch:** `feature/unattended-wave-2`, based on verified PR #10 head `d5abf18fbc831a75667f9234a76f7456da2d1385`. PR #10 itself depends on PR #7. Design sources are PR #8 `b682063c1385dc50d7284a1120fe18a023348999` and PR #9 `0ee71bcfc9f4a2c36fdddbceeb45f22f6b7181c5`; they remain separate open dependencies. This work is for review, not a release.

## Workstream status

| Workstream | Status | Evidence and limits |
| --- | --- | --- |
| A: runtime regression | PARTIAL | In a disposable Foundry 14.369 world, after starting the isolated server, the existing character opened with the preview; the modern Equipment compendium was searched and its Rope sheet opened; a new blank scene was created and a character token placed. At 1024 × 768 the collapsed preview opened using Enter and inventory controls were present. Earlier PR #10 tests opened NPC and weapon sheets and rolled chat. The attempted token movement was visually inconclusive; movement persistence, shutdown/restart after placement, a new chat roll, full inventory interactions, NPC/weapon retests and full layout coverage remain outstanding. The earlier 1280 × 720 browser viewport produced Foundry minimum-size errors; it is below the 1024 × 768 minimum, and was changed to supported dimensions. |
| B: CI | COMPLETE | `feature/**` push trigger retains the existing job and permissions. GitHub run for `a4c7f74` succeeded; a newer head requires its own run. PR events still target main only. The run reported an action runtime deprecation warning (TERRA-015). |
| C: welcome branding | PARTIAL | English welcome and settings links now identify the derivative and project support; both were observed in Foundry. Other language translations and broader localization remain unaudited. Upstream content is explicitly labeled and its derivative compatibility is not claimed. |
| D: sheet foundation | PARTIAL | The inherited inventory remains intact. A default-collapsed, keyboard-operable read-only preview labels planned overview, combat, loadout and Hacks, and retains example augmentation topology. It points to the real inherited inventory without assigning positions. A full opt-in sheet and actual Neon loadout associations require reviewed schema decisions. |
| E: equipment logic | COMPLETE for the in-memory scope | Pure explicit position assignments support multi-position occupancy, capacity, duplicate and invalid IDs, alongside item-owned augmentation slots and separate attachment sockets. Existing item compatibility rules are not invented. Tests cover isolation of returned configuration from earlier nested objects. |
| F: metadata | COMPLETE for scoped static design | Records Human/Synth and starting Cyberware counts; six classes, 18 subclasses and class-level milestones; Ripperdoc prerequisites; 12 testing backgrounds; augmentation categories. Exact medical and engineering tool names remain pending in the GDD. No permanent Foundry compendia created. |
| G: persistence architecture | COMPLETE as proposal | [Persistence and migration proposal](2026-11-21-persistence-migration-proposal.md) documents Actor/Item integration candidates, identity, validation, separate Hack and attachment models, backup/restore, and owner decisions. No migration or production schema executed. |

## Validation

Node 24.15.0 and npm 11.7.0. Version, manifest and assets checks passed; `npm test` passed 20 tests; lint passed without warnings after fixes; `npm run build`, `npm run package`, and `npm run check:package` passed with 732 root entries. A clean `npm ci --ignore-scripts` installed 218 packages with zero reported vulnerabilities after the sandboxed attempt stalled. `build:clean` was not run. The local build was loaded only into the isolated test system. Formal remote-manifest installation has not been tested.

## Changed files

- `.github/workflows/ci.yml`: feature-branch push validation.
- `lang/en.json`, `module/applications/welcome-screen.mjs`, `module/applications/settings/sidebar.mjs`: accurate English derivative welcome and support links.
- `module/neon/slots.mjs`, `tests/neon-slots.test.mjs`: in-memory assignment, isolation and tests.
- `module/neon/character-metadata.mjs`, `tests/neon-character-metadata.test.mjs`: static approved design identities and consistency tests.
- `templates/actors/tabs/character-inventory.hbs`, `less/v2/neon-slot-prototype.less`: reversible, collapsed preview and planned-section labels.
- Project index, [issue ledger](TERRA-UNATTENDED-ISSUE-LOG.md), this report, and the persistence proposal: coordination, test record and decisions.

## Prioritized backlog

1. Review PR #7 then PR #10 and this dependent draft; ensure required checks pass on the final target without bypasses.
2. Complete token movement and persistence across world shutdown/restart in a lit disposable scene; re-test NPC, weapon, chat and inventory actions with the final build.
3. Agree on Actor/Item ownership, migration and detached-augmentation disposition; decide reference remapping and rollback before persistent writes.
4. Design an opt-in sheet with meaningful owned-inventory presentation and accessible responsive controls; preserve inherited behavior.
5. Audit non-English startup text and external content compatibility; avoid implying upstream premium content is compatible without testing.
6. Later, separately validate remote installation and update delivery. Identity Creator, token animation, gameplay mechanics and formal release remain separate work.

No system version change, world migration, gameplay implementation, merge, release, or production deployment was performed.
