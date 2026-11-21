# Neon Requiem — Project Notes

This is the working home for Neon Requiem's design decisions, developer instructions and team handoffs. The system is a standalone Foundry VTT v14+ game system built from the D&D 5e rules chassis.

| Folder | Contents |
| --- | --- |
| [`gdd/`](gdd/) | Approved game design and feature requirements |
| [`instructions/`](instructions/) | Shared working conventions and visual direction |
| [`handoffs/`](handoffs/) | Assigned work, test results, blockers and handover notes |

## Design references

- [Character Identity Creator and animated tokens](gdd/Neon_Requiem_GDD_Character_Creator_Animation_Addendum_v2.md): Four Human/Synth art bases; true-overhead animation; skin/hair recoloring; local media export and optional later hosted encoding.
- [Technology systems](gdd/Neon_Requiem_GDD_Technology_Systems_Foundation.md): Cyberware is hardware, Augmentations are firmware, Hacks are software. Includes the six body-owned slots and the rule for removing hardware-owned slots.
- [Visual direction](instructions/VISUAL-DIRECTION.md): Gunmetal, charcoal, magenta and cyan; the approved GitHub branding is the visual reference for future interface work.

These are **design decisions**, not a claim that the features are playable. The consolidated authoritative GDD has not yet been identified; these files remain the working record.

## How we work

Read the relevant decision before proposing implementation. If a technical plan conflicts with an approved rule, flag it instead of silently changing the rule. Keep proposals separate from approved mechanics and test results separate from assumptions.

Use a branch and pull request for review; don't merge to `main` or publish without approval. Preserve the inherited dnd5e license notices, schema compatibility and four-part versioning policy. Never commit private deployment data, restricted artwork, personalized token packs or secrets.

The owner currently validates on a local Foundry v14 instance. The later hosting setup and optional media worker require their own deployment review.

## Development handoffs

- [Foundry v14 local preflight](handoffs/2026-11-21-foundry-preflight-terra-to-luna.md): Flag-scope, compendium, migration guard and disposable-world runtime findings.
- [Terra readiness audit](handoffs/2026-11-21-pre-implementation-readiness-audit-luna.md): Open decisions and staged implementation planning.
- [First unattended sprint](handoffs/2026-11-21-terra-unattended-sprint-report.md) and [issue ledger](handoffs/TERRA-UNATTENDED-ISSUE-LOG.md): prototype test evidence, known dependencies and deferred decisions.
- [Wave 2 report](handoffs/2026-11-21-terra-wave-2-report.md) and [persistence proposal](handoffs/2026-11-21-persistence-migration-proposal.md): validation, technical recommendations and remaining design decisions.
- [Wave 3 report](handoffs/2026-11-21-terra-wave-3-report.md): opt-in sheet, fixture-only validation, Foundry test evidence and compatibility blockers.

See the [agent working agreement](instructions/README.md) and [handoff format](handoffs/README.md). Technical build and release documentation remains under the repository's top-level `docs/`.
