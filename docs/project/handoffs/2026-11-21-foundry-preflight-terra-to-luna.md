# Handoff — Foundry v14 local preflight

- Date: 2026-11-21
- From / To: Terra / Luna
- Related GDD: [Character Creator and Animation addendum](../gdd/Neon_Requiem_GDD_Character_Creator_Animation_Addendum_v2.md) (future design only).
- Branch: `fix/foundry-v14-runtime-compatibility`
- Status: In progress; local preflight only. Remote-manifest acceptance remains pending.

## Objective and constraints

Test the standalone inherited baseline in a disposable local world; keep the system version at `0.1.1.000` and do not publish a release or introduce game features.

## Observations

- Foundry VTT 14.369, Node.js 24.15.0, npm 11.7.0, source base `74a4a94022e81a29e05d37cd1981dd87b3214212`.
- The original build registered as a system and the owner created a sandbox world. Opening an NPC failed because Foundry rejected the inactive `dnd5e` flag scope. Upstream compendium UUIDs also referenced `Compendium.dnd5e`, and the upstream migration routine treated `0.1.1.000` as older than its own `6.x` migrations.
- An experimental compatibility bridge was installed only into the isolated test system. The NPC sheet opened; a new character and weapon sheet rendered; a Starter Heroes actor opened; `/r 1d20 + 5` and an NPC Strength saving throw produced chat results. A blank test scene was created and viewed; a character token was placed, moved, and seen again after a client reload.
- With the candidate migration guard and configuration UUID changes, a client reload did not show the prior migration warning or spell-list registration errors. After a server restart and installation of the rebuilt package, a fresh test world launched, created an NPC, returned to Setup, relaunched, and reopened the NPC without those errors. One adapted link from Magic Item Categories to Equipment opened successfully. The browser's small viewport generated a Foundry size warning unrelated to the system. Foundry's setup displayed its own world-data migration progress during relaunch; no upstream D&D migration warning appeared in the client.
- The original preflight world was subjected to upstream migration before the guard was added. Do not treat that world as a clean migration test or use it for campaign data.
- The development guide previously described `npm run build:clean` as removing generated packs; the actual upstream command rewrites source YAML. The guide was corrected, and the command was not run.

## Changes and limits

The branch experiments with a Foundry flag-scope compatibility bridge, prevents interpreting a four-part derivative migration version as an upstream version, and redirects upstream configuration UUIDs to the derivative's packs. The bridge depends on Foundry's current client backend scope list and needs compatibility review. The derivative migration policy is not implemented; mismatched derivative versions issue a warning and are not migrated. Compendium build processing adapts references to declared local packs while leaving editable upstream YAML intact. A scan of the rebuilt declared packs found no remaining `Compendium.dnd5e` UUIDs, and one rewritten rules link was verified live. Other identifier forms, external references, and broader imported content still need an audit.

The owner-approved live preflight is distinct from the [formal remote installation test](../../SMOKE-TESTING.md). No public release or stable manifest publication occurred.

## Next action

Review the compatibility approach and migration policy, expand the pack-reference and imported-content checks, and repeat the complete smoke test at a supported viewport before considering this baseline functional. Preserve all existing campaign worlds.
