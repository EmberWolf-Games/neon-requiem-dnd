# Neon Requiem — Pre-Implementation Readiness Audit

**Date:** 21 Nov 2026  
**Prepared by:** Luna  
**Audience:** Owner, Terra, Sol, Astra  
**Status:** Readiness assessment and proposed implementation order; not a gameplay authorization

## Executive conclusion

**Ready for a narrow, non-destructive engineering sprint; not ready for wholesale gameplay conversion.** The owner-approved GDD has a clear starting skeleton, but several universal systems remain intentionally undefined. Terra can begin a verified Foundry v14 baseline and a reversible character-sheet/slot prototype without inventing those mechanics.

This report covers GitHub project metadata, the current GitHub PRs, the main build/manifest/test workflow, selected inherited character/Item/inventory code paths, and the approved project GDD addenda. It is not a complete line-by-line security review or a successful Foundry playtest.

## Repository and runtime baseline

| Reference | Finding |
| --- | --- |
| Repository | [EmberWolf-Games/neon-requiem-dnd](https://github.com/EmberWolf-Games/neon-requiem-dnd) |
| Default branch | `main`, commit `74a4a94022e81a29e05d37cd1981dd87b3214212` at audit |
| Game system | Standalone Foundry VTT v14+, ID `neon-requiem-dnd` |
| Inherited code | Official dnd5e v6.1.1 editable source |
| System version | `0.1.1.000`; four-part `M.m.r.b` policy; unpublished |
| Node/npm | Node >=24.15.0; npm 11.7.0 or compatible |
| CI | `.github/workflows/ci.yml`; checks version, manifest, assets, unit tests, lint, build, package layout |
| Character integration | `module/data/actor/character.mjs`, `module/applications/actor/character-sheet.mjs`, `templates/actors/tabs/character-inventory.hbs` |
| Equipment integration | `module/data/item/equipment.mjs`, `module/applications/components/inventory.mjs` |
| Source compendia | `packs/_source/`; many inherited SRD items/classes/spells/backgrounds remain present |

### Open pull requests and actual validation

1. **[PR #7 — Foundry v14 compatibility](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/7):** Open **draft**, head `0df308a66ef1dd6a2cd5425d4c37f385310773c4`. Passing CI. Fixes/prototypes inherited `dnd5e` flag scope compatibility, cross-system compendium UUIDs and derivative-version migration guard. Terra's [preflight handoff](https://github.com/EmberWolf-Games/neon-requiem-dnd/blob/fix/foundry-v14-runtime-compatibility/docs/project/handoffs/2026-11-21-foundry-preflight-terra-to-luna.md) reports selected operations working in **Foundry 14.369** in disposable worlds: character/NPC/weapon sheets, chat rolls, token placement/movement, scene persistence and reopen/reload. This is **not** a complete formal remote-install smoke test. The original world suffered upstream migration before the guard; do not reuse it for migration validation.
2. **[PR #8 — Technology systems](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/8):** Open, head `b682063c1385dc50d7284a1120fe18a023348999`. Passing CI. Contains Cyberware/Augmentation/Hack foundations and source-owned slot semantics. It is **documentation only**.
3. **[PR #9 — Character, equipment and subclass GDD](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/9):** Open, head at start of audit `9c9c0444b217cc1e24b5c5397963fc752d5a738d`. Passing CI before adding this audit. Contains the six approved 1–40 class progressions, 18 subclass feature tracks, Ripperdoc, Human/Synth foundations, twelve backgrounds, equipment architecture and the Character Identity Creator addendum. It is **documentation only**.

**No merges authorized in this audit.** PR #7's runtime changes are absent from `main`. Code written directly against the old `main` may reproduce the known preflight problems.

### Build and runtime hazards

- The source manifest has no release `download` URL. The documented stable channel has not been published; the formal test installing from a public GitHub manifest cannot yet be completed without separate release authorization.
- The current main-branch README/Development/Smoke Test text says the live smoke test is still pending. PR #7's **limited local preflight** provides newer evidence, but does **not** justify changing the formal public-install gate to complete.
- In PR #7, `npm run build:clean` was discovered to **rewrite source YAML**, despite prior documentation suggesting it merely deletes generated pack output. **Do not run this command** during an unattended first sprint.
- Source and data retain many `dnd5e` keys, internal classes and SRD content on purpose. A global rename, pack deletion, forced migration or spell-system removal risks corrupting the baseline.
- CI passing does not prove compatibility with a target local Foundry world, browser size, media codecs or real campaign data.

## Design inventory

| System | Approved and documented | Still requires owner/game-design work |
| --- | --- | --- |
| Core characters | Human/Synth only; six body-owned Augmentation slots each; Human 1 / Synth 2 starting Cyberware | Distinctive racial benefits/disadvantages, treatment/repair compatibility, specific starting item choices |
| Classes | Vanguard, Deadeye, Ghost, Cipher, Engineer, Lifeline, each with 1–40 progression | Global proficiency beyond level 20, HP/ASI/feat/attribute caps, multiclass advancements, combat power tuning |
| Subclasses | 18 complete 10-milestone feature tracks, 180 provisional features | Individual abilities' edge cases, numeric balance, shared action economy |
| Special hybrid | Earned Ripperdoc 1–20; Engineer 5 + Lifeline 5 entry, within total level 40 | Medical/engineering procedure rules, resource interaction, surgical facilities, specific hybrid combat costs |
| Backgrounds | 12 choices approved for initial testing; two skills, one tool, an Edge and story hooks | Final tool taxonomy, duplicate-proficiency rules, money and gear, tests of relative usefulness |
| Equipment | Ten functional slot types; four quick-access positions; hand/holster/sling distinctions; item attachments | Actual item catalog, weight/cost/rarity, gear socket lists, draw/reload actions, gear balance |
| Augmentations | Six initial categories: Force, Mobility, Interface, Sensory, Recovery, Defense | Specific firmware effects, color-coded catalog, scaling/stacking, installation; salvage after Cyberware removal |
| Cyberware | Installed hardware; exact expansion slot ownership and targeted removal | Anatomy conflict maps, damage/disable behavior, surgery, upgrade/removal economy |
| Hacks | Learned/installed software needs compatible Cyberware; accessible to compatible classes | Program list, access/trace/security, execution costs and action economy; no assumption that RAM equals spell slots |
| Animation | Four Human/Synth appearance bases, top-down states, masks, WebM/WebP and local-to-hosted plan | Original rigs/assets, compositor, WebM alpha test, state controller, authorization, perf and multiplayer validation |
| Token/equipment boundary | Gear **never** changes token art or triggers re-encoding | Only explicit authorized identity edits can generate a new appearance pack |
| World content | Cyberpunk design direction established | NPC/bestiary, factions, setting locations, encounter scaling, economy/loot/vehicles and mission content |

## Owner decisions that should come before their corresponding production work

**Not needed for a read-only slot prototype:** level-21–40 formulas, firearm balance, Hack resource rules, medical compatibility, setting economics, racial traits or loot math.

**Needed before fully functional gameplay:**

1. **Universal 21–40 progression math:** proficiency bonus, hit points/hit dice, ability caps, multiclass level attribution and feat/ASI rules.
2. **Hack execution and security:** installed capacity, resource/cost/cooldowns, targets/range, saves/access/trace and effects.
3. **Equipment catalog and combat handling:** weapon/ammo/reload properties, armor stacking, weight/value, currencies, item socket details and starting gear.
4. **Human/Synth mechanics and treatment:** racial differences, body-vs-machine healing and special Lifeline/Ripperdoc interactions.
5. **Cyberware lifecycle:** anatomy and coexistence, ownership, physical removal vs disabling, salvage, repair and patient safety.
6. **Encounter and economy model:** enemies, loot, progression/wealth, vehicles, crafting and repair prices.
7. **Polish/performance later:** real art assets, animation export, storage worker and supported-client test matrix.

These require separate design/review; an unattended coding agent should **not** choose final gameplay values because the GDD labels them provisional.

## Suggested implementation order

**Milestone 0 — Runtime safety gate:** Review PR #7 migration/flag bridge, verify build/CI, and confirm a disposable local Foundry world works if available. Do not touch campaign worlds. Do not publish a release.

**Milestone 1 — First safe vertical slice:** On a dependent feature branch from PR #7 head, create independently testable code for the **approved slot topology** and a **read-only prototype** character-sheet inventory/augmentation panel. No persistent schema migrations or item installation writes. Explicitly keep token artwork independent from all gear changes.

**Milestone 2 — Item model and inventory workflow:** Once approved for persistence, add item-source identity, equipment state transitions, compatible installations, and tests of precise Cyberware-slot removal. Do not settle salvage implicitly.

**Milestone 3 — Character creation:** Add Human/Synth options, twelve test backgrounds, first equipment catalog entries and class data once missing racial/tool/starting-gear choices are resolved.

**Milestone 4 — Gameplay systems:** Implement firearms, Hack rules, medical care, device action economy, class progression and high-level scaling after the common rules pass.

**Milestone 5 — Character Identity Creator and animation:** Original assets, mask preview, four bases, animation states and local media pipeline, without equipment-driven appearance. Only after runtime/application foundations are stable.

**Milestone 6 — Release readiness:** Complete remote-manifest installation, version comparison, license review, runtime smoke tests, multiplayer and migration tests before an owner-authorized release.

## Unattended run policy

The first sprint should operate only on a **new dependent feature branch**, based on PR #7's known compatibility head. Use PR #8 and PR #9 **as design references**, not as a reason to merge either into `main`.

Allowed: code research, reversible **prototype** modules, unit tests, read-only sheet panel, CI/build/package checks, disposable-world smoke checks where the environment is already available, draft PR and handoff notes.

Forbidden: merging PRs, changing `main` or `stable`, releasing/publishing, changing the four-part version, editing credentials, migrating owner worlds, `npm run build:clean`, broad `dnd5e` namespace replacement, deleting inherited packs, rewriting spells/class machinery, installing arbitrary dependencies, or inventing unfinished design rules.

**If a blocking baseline check fails:** record the reproducible error and stop implementation at that gate. Leave a draft PR with the partial safe work and a handoff. Never hide a failure behind a manual bypass.

**If no Foundry runtime is accessible:** perform automated code/build tests only, mark live acceptance **not tested**, and do not claim the system runs in Foundry.

See [draft Terra first-sprint instructions](2026-11-21-terra-first-unattended-sprint-draft.md). These are prepared for owner review; writing them here does not launch an agent or authorize a merge.
