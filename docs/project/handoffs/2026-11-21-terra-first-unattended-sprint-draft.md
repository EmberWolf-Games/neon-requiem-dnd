# Draft Handoff — Terra's First Unattended Development Sprint

**Date:** 21 Nov 2026  
**From:** Luna / owner, once the owner forwards or approves this handoff  
**To:** Terra  
**Status:** **READY-TO-SEND DRAFT — NOT DISPATCHED**  
**Goal:** Produce a small, inspectable proof of Neon Requiem customization **without** waiting for the owner to be online and **without** inventing missing game rules.

## Mission

**First make the current Foundry v14 compatibility baseline safe. Then, only if the automated baseline passes, build a reversible, read-only prototype of the approved character equipment and Augmentation slots.**

The deliverable is **one draft/dependent PR** with unit tests, build results and a concise handoff. The owner is unavailable during the run. Work within the scope and stop at blockers rather than attempting broad repairs.

### Authoritative inputs

- **Code starting point:** [PR #7 — Foundry v14 runtime compatibility](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/7), branch `fix/foundry-v14-runtime-compatibility`, audited head commit `0df308a66ef1dd6a2cd5425d4c37f385310773c4`. Fetch the current branch head before starting and record its SHA. PR #7 is **open and a draft**, not merged.
- **Technology rules:** [PR #8](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/8), branch `docs/gdd-technology-systems-foundation-20261121` (approved slot source ownership).
- **Character/loadout rules:** [PR #9](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/9), branch `docs/gdd-six-class-roster-20261121`, file [Equipment and Slots](https://github.com/EmberWolf-Games/neon-requiem-dnd/blob/docs/gdd-six-class-roster-20261121/docs/project/gdd/Neon_Requiem_GDD_Equipment_and_Slots.md).
- **Token invariant:** [Character Identity Creator](https://github.com/EmberWolf-Games/neon-requiem-dnd/blob/docs/gdd-six-class-roster-20261121/docs/project/gdd/Neon_Requiem_GDD_Character_Creator_Animation_Addendum_v2.md). **Inventory and installed gear never alter token art or cause WebM/WebP export.**
- **Review and standards:** [Readiness Audit](2026-11-21-pre-implementation-readiness-audit-luna.md) and [Rules Writing Guide](../instructions/WRITING-STYLE.md).

The design branches are not merged. Read their files by the linked branch; do **not** merge either documentation PR or copy their unrelated changes into this code branch.

## Unattended safety rules — non-negotiable

1. **Create a new feature branch from the current PR #7 head.** Do not commit to `main`, `stable`, PR #7's existing branch, or an owner's campaign world.
2. **Do not merge or publish anything.** No release, tag, GitHub deployment, uploaded ZIP, public stable manifest, automatic merge, or version increment. Keep `system.json` version `0.1.1.000` unchanged.
3. **Never run `npm run build:clean`** in this first sprint. The upstream command was found to rewrite editable source YAML.
4. **No migrations or live data writes.** Do not migrate, import, delete, or rewrite saved actor data in campaign worlds. If a Foundry runtime is available, use a **new disposable local world**; otherwise record runtime tests as unavailable.
5. **Preserve upstream compatibility.** No global `dnd5e` namespace rename, broad refactor, deletion of spell/class/compendium content, package dependency changes or insecure flag hacks beyond what was already proposed in PR #7.
6. **No guesswork on unresolved rules.** Do not invent firearm statistics, Hack RAM, Augmentation bonuses, surgery, Cyberware salvage, class level-40 math or Human/Synth traits.
7. **No inventory-driven token rendering.** No new gear overlays, visual item layers, token texture update hooks, equipment animation states or FFmpeg/media jobs.
8. **Limit changed source files** to a small, reviewable testable slot-logic helper and the minimum sheet/templating/style files required for a prototype. If it requires large engine changes or a persistent schema migration, **stop** and document why.
9. Don't add secrets, private world files, test-world data, generated binaries, licensed artwork or unsupported third-party dependencies to the repo.

## Phase A — baseline gate

- Record Git head, branch, OS, Node/npm versions, and whether licensed Foundry VTT v14 is actually accessible.
- Inspect the PR #7 handoff and the compatibility bridge for the legacy flag scope, derivative migration protection and compendium UUID adaptation.
- Run the repository's normal automated checks in order:

```bash
npm ci --ignore-scripts
npm run check:version
npm run check:manifest
npm run check:assets
npm test
npm run lint
npm run build
npm run package
npm run check:package
```

**If these fail because of a baseline or environment issue, stop Phase B.** Report the command, first actionable error, logs and suggested next safe action; do not change broad unrelated code to hide a failure.

If Foundry is accessible, run a *disposable-world* smoke check of NPC and character sheets, basic item creation, chat roll, token movement, save/reload and browser console/network. Do not claim the formal remote-manifest installation test has passed; a published stable manifest doesn't exist.

## Phase B — narrow, reversible implementation

Only proceed if Phase A's automated checks pass.

### B1. Pure slot topology and tests

Create a small standalone module (choose a clear `module/neon-...` location) that can build and validate an **in-memory representation** of:

- **Six body-owned Augmentation slots**, exactly one each of **Force, Mobility, Interface, Sensory, Recovery, Defense**, each with a stable slot identity, type/color, and source `body`.
- Additional Augmentation slots supplied by a **particular Cyberware item ID**, with exact source ownership and type, e.g., an example interface item granting one Interface and one Sensory slot.
- **Physical loadout positions**: Head 1, Face 1, Body Armor 1, Tactical Rig 1, Back 1, Left Hand 1, Right Hand 1, Sidearm Holster 2, Long-Gun Sling 1, Quick-Access 4.
- **Attachment sockets owned by specific equipment**, separate from Augmentation slots. An example fixture is enough; do not invent a universal socket list.
- A simple **preview of the active installed configuration**. When a fixture Cyberware item is physically removed, only the source-owned slots and the firmware occupying them leave the *active configuration*. Do **not** assume those items are destroyed, salvaged, or moved to inventory.
- Color/category compatibility that rejects installing an Augmentation into the wrong category. The rules for changing physical items can remain future work.

**Pure-function unit tests must cover** all six body slots; exact equipment capacity; extra slots with two different Cyberware source IDs; rejection of wrong-color installation; removing one source without altering the other's active slots; body slots surviving Cyberware removal; and no silent Augmentation migration. Tests must not require a live Foundry process.

No persistent Actor schema or saved-Item mutation in this sprint. Fixture IDs are examples, not a final migration/data format contract.

### B2. Read-only character-sheet prototype

Using the inherited [CharacterActorSheet](https://github.com/EmberWolf-Games/neon-requiem-dnd/blob/fix/foundry-v14-runtime-compatibility/module/applications/actor/character-sheet.mjs) and existing [inventory tab](https://github.com/EmberWolf-Games/neon-requiem-dnd/blob/fix/foundry-v14-runtime-compatibility/templates/actors/tabs/character-inventory.hbs), add the smallest **read-only demonstration** of:

- Ten loadout position types and their approved capacities.
- Six color-labelled body Augmentation categories.
- A clearly marked prototype/example display for item-owned expansion slots, only if it can be shown without adding persistent document fields.
- Readable gunmetal UI with restrained magenta/cyan details, following [approved visual direction](https://github.com/EmberWolf-Games/neon-requiem-dnd/blob/main/docs/project/instructions/VISUAL-DIRECTION.md).

A prototype may show empty/fixture values; **label fixtures unmistakably**. It must not imply equipment is genuinely installed until real Actor/Item persistence is approved. Do **not** replace the entire sheet, alter attack/save/HP math, modify inherited inventory operations, or hide the existing 5e controls. Keep view composition separate from the slot logic so it can be replaced cleanly later.

### B3. Tests and cleanup

- Re-run every Phase A command.
- Confirm no edits to `system.json`, `package-lock.json`, release workflow, upstream compendium source, migrated data, or media pipeline.
- If a disposable Foundry environment is available, check character/NPC/item sheets and basic dice/chat/token behavior still work; check layout at a normal supported desktop viewport.
- Explicitly test/inspect that equipping gear does **not** change a token's art/URL or trigger video encoding.
- If any regression occurs, revert the last scoped prototype change; **do not leave a partially broken runtime committed**.

## Stop conditions

Stop and report if any of the following occurs:

- A baseline check or runtime setup fails and the fix exceeds this scope.
- PR #7 has materially changed, is no longer accessible or conflicts with the selected branch.
- A task demands an Actor schema migration, a compendium rewrite, a licensing decision, a version increment, or an owner design ruling.
- Existing data might be corrupted, altered or migrated.
- The UI prototype cannot be implemented without replacing major inherited system behavior.
- Test failures remain after one narrowly relevant repair attempt.

If Phase B cannot start, **Phase A findings and a clear blocker report are a valid completed unattended deliverable**.

## Deliverable and reporting

1. A **new draft PR**, ideally **targeting PR #7's branch** so reviewers see only the new work; if that isn't practical, clearly label the dependency and avoid claiming it can merge into `main` independently.
2. A scoped change list, with why each file changed.
3. Unit-test results and complete automated check command outcomes, including any failures.
4. If performed, Foundry version, disposable-world test details and screenshots; otherwise explicit **NOT TESTED IN FOUNDRY**.
5. A handoff file under `docs/project/handoffs/`, recording implementation, blockers, decisions still needed and a recommended next task.
6. A final summary to the owner that distinguishes **committed**, **tested**, **prototype-only** and **blocked**.

**Final unattended state:** Leave branches and PRs unmerged and unpublished. Do not wait for a sleeping owner or continue into the full class/weapon/Hack implementation; finish the documented scope and stop.
