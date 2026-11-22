# Terra Wave 3.5 — compatibility and regression handoff

**Date:** 2026-11-21. **Branch:** `feature/wave-3-5-compatibility`; based on PR #13 head `32e7adb6599b7454d0d230ac4a93cb08c2396b27`. Main observed at `0658889ba34f297aeb335a467fb6e4eadf85fca2`. **System version:** `0.1.1.000`. Issue [#14](https://github.com/EmberWolf-Games/neon-requiem-dnd/issues/14) was [updated](https://github.com/EmberWolf-Games/neon-requiem-dnd/issues/14#issuecomment-7074633537). [Issue ledger](TERRA-UNATTENDED-ISSUE-LOG.md) retains prior history.

## Compatibility decision record

| Foundry build | Evidence | Status |
| --- | --- | --- |
| 14.367–14.368 | Manifest says minimum 14.367; no runtime available in this sprint. | NOT TESTED |
| 14.369 | Two fresh isolated-world runs logged 26 distinct pack document migration errors because source core version is newer; Crowbar index and item sheet nevertheless opened in the Wave 3.5 world. Other affected documents were not opened in this run. | FAIL for clean compendium migration; partial basic functionality |
| 14.370+ | Official release is a test candidate; no licensed 14.370+ installation or installer was found locally. | NOT TESTED / BLOCKED |

**Recommendation:** Preserve the inherited source and manifest for now. Test unmodified current main and PR #13 separately in fresh, licensed 14.370+ environments; inspect the server log, all three affected pack indices, open affected documents and UUID links, and complete runtime regression. If that succeeds, propose minimum 14.370 only for explicit owner approval, clearly documenting loss of 14.367–14.369. No passing minimum is established. If 14.370 fails, investigate its actual errors before any version-policy decision. The previously observed core migration errors remain a compatibility/release blocker; successful Crowbar rendering does not prove all affected records are safe.

## Reproducible source, upstream and package comparison

Official dnd5e `release-6.1.1` resolves to `bc1b2c921e2f306dc5079f8de883ad64607118a6`. A read-only audit scanned `packs/_source`, parsed YAML and compared all 14.370 `_stats.coreVersion` locations and record IDs with the corresponding official files. Run from this repository after `npm ci --ignore-scripts`, `npm run build`, and `npm run package`:

```powershell
node scripts/audit-core-versions.mjs <upstream-dnd5e-packs/_source> dist/package <scratch-output> <optional-foundry-error-log>
```

The command reads built LevelDB packs through the existing Foundry CLI `extractPack` API and writes no source YAML. Its output includes file paths, IDs, marker paths, upstream differences, and optional server-log comparison. Scratch output is outside the repository. The [affected-record list](2026-11-21-wave-3-5-affected-records.md) contains all 26 names and paths.

| Pack | Top-level affected documents | Embedded 14.370 markers | Upstream matching marker sets | Built package matching marker sets |
| --- | ---: | ---: | ---: | ---: |
| classes24 | 3 | 2 | 3/3 | 3/3 |
| spells24 | 22 | 12 | 22/22 | 22/22 |
| equipment24 | 1 | 0 | 1/1 | 1/1 |
| **Total** | **26** | **14** | **26/26** | **26/26** |

The previously collected 14.369 server error log had **52 entries across repeated starts for 26 unique pack/document IDs**, all matching the source list; the 14 embedded markers are additional metadata locations, not additional root errors. A text scan found 40 total `14.370` markers and no later `coreVersion` in source. Representative error: `Documents from a core version newer than the running version cannot be migrated`, e.g. `neon-requiem-dnd.classes24` document `phbPrimalOrderMa`. Build compilation runs `cleanPackEntry` and local compendium UUID adaptation; this audit establishes preservation of audited version markers, not byte-identical documents or full gameplay correctness.

## Workstream status

| Workstream | Status | Evidence / limit |
| --- | --- | --- |
| A — compatibility investigation | PARTIAL / BLOCKED | Source, upstream and compiled metadata matched as above; 14.370+ runtime unavailable. |
| B — policy | PARTIAL / NEEDS OWNER DECISION | No minimum change; conditional recommendation above requires a successful newer-build test and owner approval. |
| C — Foundry regression | PARTIAL | Fresh isolated 14.369 world: system registered, NPC created/opened, Strength save rolled 16 to chat, equipment created/opened, affected Crowbar searched and opened. Branch opt-in character showed a real weapon, container and container-move rerender; observer and GM comparison performed. Prior Wave 3 recorded token (300,200) → (400,200), persisted over client/server restart, and static token path unchanged after unequip; this sprint did not repeat that complete token sequence. Weapon sheet opened and inventory move succeeded. Full matrix below. |
| D — inventory privacy | PARTIAL | Pure ancestry filter, conservative unidentified/unknown permission handling, duplicate/cycle/missing parent tests, and live GM/Observer test. New projection hides an unidentified parent and its child, while the inherited container sheet exposes an identified child to an Observer; owner policy decision needed (TERRA-031). |
| E — fixtures | PARTIAL | Added removed owner, multiple Cyberware sources, duplicate/missing slot/source and explicit cross-role ambiguity tests. Fixture format is not an approved schema. The validator currently allows an owned ID to be both augmentation and attachment because it lacks approved type data (TERRA-030). |
| F — opt-in sheet | PARTIAL | Localized inherited item-type group headings and clearer empty state; preserved default sheet and existing controls. Live GM/Observer checks cover the new projection; wider accessibility and multiuser cases remain. |
| G — automated validation | COMPLETE locally | Clean dependency install and all requested checks passed, 31 tests, 733 package entries. Final GitHub run must be checked. |
| H — ledger and handoff | COMPLETE | Ledger entries TERRA-026–031, Issue #14 comment, this report, record list, and draft PR. |

## Fresh 14.369 runtime matrix

| Check | Result |
| --- | --- |
| System registration, new disposable world | PASS |
| Default character, opt-in character, NPC sheet | PASS: character and NPC created/opened; opt-in selected for test actor |
| Weapon and equipment sheet | PASS: weapon and equipment created/opened |
| NPC Strength save and chat result | PASS: result 16 shown in chat |
| Compendium search and affected Crowbar opening | PASS for this document, despite server migration errors |
| Other affected classes/spells, UUID links, pack-wide indices | NOT TESTED |
| Item creation and movement into container; projection rerender | PASS: test weapon moved into Wave35 Bag and projection showed its parent |
| Equip/unequip, static token URL, scene position and restart | NOT REPEATED in Wave 3.5; separately observed in Wave 3 as recorded there |
| Player versus GM visibility | PARTIAL: identified container and weapon appeared to Observer; after GM marked container unidentified, Neon projection hid both, but inherited container still displayed identified child (TERRA-031) |
| Hidden items, private descriptions and multi-actor permissions | PARTIAL: unit tests cover hidden ancestry and isolated snapshots; broad live permission cases not completed |
| 1440×900 viewport | PASS for exercised controls; second width NOT TESTED this run |
| Browser log | No warning/error entries during exercised GM and player sheet checks after supported viewport was applied |
| Server log | FAIL: 26 distinct newer-core migration errors on fresh 14.369 startup |
| Animation, encoder process and media swaps | NOT TESTED: no animation assets or encoder were used |
| 14.370+ and formal remote manifest installation | BLOCKED / NOT TESTED |

## Security and design notes

`filterVisibleInventory` fails closed for missing explicit visibility, identification, duplicate IDs, inaccessible/missing parents and cycles, before projecting names. The GM still sees owned unidentified items; the test Observer saw only the conservative projection. This does not change inherited Foundry permission rules, nor does it enforce security on other Foundry components. Do not claim the inherited container behavior enforces an unapproved private-container rule.

Equipment remains separate from artwork; no token appearance or animation code was added. No fixture is saved to Actors, Items, compendia, world settings, or migration runners. Cross-role identity constraints require an owner-approved Item model rather than a silently invented rule.

## Automated validation and change list

Windows, Node `24.15.0`, npm `11.7.0`. `npm ci --ignore-scripts` installed 218 packages with zero reported vulnerabilities. `check:version`, `check:manifest`, `check:assets`, `npm test` (31/31), `lint`, `build`, `package`, `check:package` (733 entries) and `git diff --check` passed. `build:clean` was not run.

- `bd03169`: inventory ancestry privacy filter, localized grouping, empty state and projection tests.
- `4590874`: reproducible source/upstream/package audit and fixture edge-case tests.
- This report, [affected-record list](2026-11-21-wave-3-5-affected-records.md), project index and issue ledger document outcomes; see branch history for documentation commit.

No source pack YAML, system version, Foundry minimum, package lockfile, release workflow or game mechanics were changed. No release, tag, merge, campaign modification or production migration occurred.

## Recommended next sprint

1. Obtain an authorized licensed Foundry 14.370+ test environment and run unchanged main and PR #13 against separately created disposable worlds, including all three affected pack documents and logs.
2. Decide whether to raise the minimum only after successful evidence and explicit owner approval; if not, investigate a validated compatible source baseline without backdating metadata.
3. Resolve owner decisions on inherited container content privacy and augmentation-versus-attachment item typing before persistent schemas.
4. Complete untested GM/player, inventory, scene, token and accessibility cases in the target runtime; then review the dependent PR chain.
