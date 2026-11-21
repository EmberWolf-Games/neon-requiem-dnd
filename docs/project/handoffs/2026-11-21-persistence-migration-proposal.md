# Neon Requiem persistence and migration proposal

**Status: technical proposal for review; no schema or migration is implemented.** Depends on PR #7, PR #10, and the design in PRs #8 and #9. The existing source uses `CharacterData` in `module/data/actor/character.mjs`, `Actor5e` in `module/documents/actor/actor.mjs`, inherited embedded Item documents, and the guarded migration handling in `dnd5e.mjs`. These integration points are observations, not authorization to change them.

## Recommended boundaries

- Retain Foundry Actor and embedded Item ownership. Represent race and background as references to owned identity documents or validated selections; map class and subclass choices to owned class/subclass Items only after reviewing inherited advancement behavior. Decide whether canonical content uses compendium UUIDs, local Item IDs, or both; never rely on mutable display names.
- Keep equipment position assignments in one actor-level loadout structure that references owned embedded Item IDs, with explicit state and positions. The current in-memory validator models capacity and multiple positions but does not determine item compatibility; item definitions must state requirements. Carried inventory must not be treated as automatically equipped.
- For Cyberware, use the owning embedded Item ID plus a stable per-item slot ID; resolve each augmentation occupant to a distinct owned item. Validate ownership, source existence, category and duplicate occupancy as one actor-level operation. Define an explicit treatment for missing sources and detached occupants before any writes. Do not silently move or delete them.
- Store attachment relations against an owning equipment Item and validate both owner and attachment ownership, separately from augmentations. Model Hacks independently with their own future item types and compatibility rules; do not derive capacity or mechanics from this proposal.
- Token appearance is a separate identity-creator concern. Equipment writes must not trigger appearance changes or media generation.

## Versioning, validation, rollback

Use a dedicated integer schema version independent of the four-part published system version and upstream D&D migration versions. Agree on namespace and storage location before creating any persisted field. Validate all references and compatibility server-side or through the supported document update boundary, not just in the sheet. Treat document IDs as world-local; define remapping for import, duplication, compendium transfer and actor cloning. Avoid persisting derived slot lists if the same topology can be deterministically derived from owned Cyberware definitions; retain stable identifiers and occupant relationships.

Prototype on copies of disposable worlds, record a pre-migration backup, implement idempotent forward steps with dry-run reporting and explicit handling for missing or ambiguous references, and verify crash recovery. Keep an export of the original representation for rollback and test both forward conversion and restore on copies. Do not promise automatic downgrade or write production data until backup/restore, version-gating, error handling, permissions and supported Foundry APIs are reviewed. Preserve the existing guard against applying upstream migrations to derivative version numbers.

## Owner and design decisions required

1. Authoritative race/class/background representation and coexistence with inherited Items and advancements.
2. Storage namespace, schema owner, item duplication/import remapping, and scope of supported downgrade.
3. Cyberware removal disposition, conflict repair, deletion protection and user-facing confirmation.
4. Item compatibility definitions, handling blocked positions and explicit capacity modifiers.
5. Hack data model, prerequisites, resource rules, and migration policy.
6. Migration approval and recovery policy, especially legacy worlds and system version transitions.

Before implementation, validate the proposal against Foundry v14 APIs and the finalized GDD, write migration and round-trip tests, and obtain explicit approval for any production schema transition.
