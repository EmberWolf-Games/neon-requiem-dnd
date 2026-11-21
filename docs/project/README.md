# Neon Requiem — Project Documentation Hub

This folder holds **project-owned design decisions, development instructions, and team handoffs** for the Neon Requiem Foundry VTT v14+ **Game System**.

## Directory layout

| Folder | Purpose |
| --- | --- |
| [`gdd/`](gdd/) | User-approved design requirements and GDD addenda, pending integration into the authoritative GDD |
| [`instructions/`](instructions/) | Standing project/developer/assistant conventions and implementation guidance |
| [`handoffs/`](handoffs/) | Bounded task handoffs, results, blockers, tests, and integration notes |

## Current design decision

- [Character Identity Creator & Animated Scene Tokens — approved GDD addendum, revision 2](gdd/Neon_Requiem_GDD_Character_Creator_Animation_Addendum_v2.md): true-overhead rotatable tokens, four Human/Synth body bases, selectable heads, independent skin/hair masks, transparent WebM animations, local-PC validation and a future self-hosted encoder worker.

**Status:** The linked addendum records an **approved design requirement**, **not an implemented feature**. It is not yet merged into the canonical GDD; the authoritative GDD location/version must be established first.

## Approved project instructions

- [Visual direction](instructions/VISUAL-DIRECTION.md): owner-approved GitHub branding and a visual reference for future Foundry interface work.

## Development handoffs

- [Foundry v14 local preflight](handoffs/2026-11-21-foundry-preflight-terra-to-luna.md): runtime findings, experimental compatibility work, and outstanding checks.
- [Unattended sprint report](handoffs/2026-11-21-terra-unattended-sprint-report.md) and [issue ledger](handoffs/TERRA-UNATTENDED-ISSUE-LOG.md): prototype results, dependencies, and deferred decisions.
- [Wave 2 report](handoffs/2026-11-21-terra-wave-2-report.md) and [persistence and migration proposal](handoffs/2026-11-21-persistence-migration-proposal.md): scoped implementation, test evidence, and decisions awaiting review.

## Working conventions

1. **Read before acting.** Check this index and relevant `gdd/`, `instructions/`, and `handoffs/` files before related implementation work.
2. **Design authority.** Owner-approved decisions are design requirements. A technical proposal or agent suggestion is not approved simply because it was written here.
3. **Keep provenance.** Note date, status, scope, source/decision context, dependencies, and open questions. Do not silently change previously approved rules.
4. **Reviewable changes.** Follow protected-branch workflow: use a feature/docs branch and PR. Do not force-push or bypass required checks. Coordinate with the ongoing setup PR.
5. **Separate design from code.** This folder is documentation, not executable system assets. Runtime code belongs in its established source directories.
6. **Small, linkable files.** Prefer Markdown, descriptive filenames, relative links, and focused addenda. Record status as *proposed*, *approved*, *implemented*, or *validated* as appropriate.
7. **Do not make up implementation results.** Any outstanding Foundry v14 runtime smoke tests, media compatibility tests, asset-license review, or hosted-worker validation must remain explicitly pending until verified.
8. **Attribution/security.** Preserve upstream license notices and third-party credit; keep secrets and personally identifying server configuration out of the repository.

The existing top-level `docs/` contains technical manuals such as architecture, development, releases, upstream tracking and versioning. Maintain those manuals in place; use `docs/project/` for project-level GDD decisions, instructions and handoffs.

## For Luna, Terra, Sol and Astra

Use [instructions/README.md](instructions/README.md) as the common operating guide and [handoffs/README.md](handoffs/README.md) as the handoff format. If requirements conflict with existing implementation, report the discrepancy rather than altering the approved design without the owner's decision.
