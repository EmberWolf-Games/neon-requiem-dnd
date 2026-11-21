# Neon Requiem — Working Agreement

Neon Requiem is a standalone Foundry VTT v14+ game system derived from the official dnd5e v6.1.1 source. We keep its rules chassis where the owner has not approved a change, while building a distinct setting, class roster and technology systems.

## Before changing the system

Start with the [project notes](../README.md) and the relevant [game design files](../gdd/). The [writing guide](WRITING-STYLE.md) covers rulebook voice and feature formatting. The [visual direction](VISUAL-DIRECTION.md) is the reference for branding and future interface work.

A recorded design choice is not a finished implementation. If a rule is incomplete or clashes with current code, flag the problem and propose a resolution; don't quietly make up an answer.

For a substantial change, record what was assigned, which files changed, what was tested and what still needs a decision. Use the [handoff notes](../handoffs/) to keep the team aligned.

## Development boundaries

- Work through branches and pull requests. Don't merge into `main` or publish a release without the owner's approval.
- Preserve the inherited 5e internal schema and flag namespaces until a compatible migration is designed and authorized. Don't delete old engine code just because gameplay options will eventually be replaced.
- Follow the four-part `M.m.r.b` system versioning policy. Documentation edits do not call for a release.
- Follow the project's artwork licensing and attribution rules. Never commit restricted art, private player files, secrets or generated personalized token packs.
- Keep build results separate from assumptions. Foundry v14 runtime tests, alpha video support and future hosted encoder work must be validated in their actual environments.
- Local Foundry testing comes first. A later owner-operated server may run separate authenticated media-generation workers, but that deployment has its own design and security review.

## Team responsibilities

**Luna** maintains the GDD, project records and handoffs. **Terra** leads implementation and flags design gaps. **Sol** and **Astra** are engineering escalation paths when needed. The owner remains the final authority on rules and feature scope.

Link back to the specific GDD rule behind a code change. Keep implementation notes in the technical documentation or handoff; don't rewrite the design rationale into every source file.
