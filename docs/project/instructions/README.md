# Project Instructions — Agent Working Agreement

**Scope:** Neon Requiem, a standalone Foundry VTT v14+ Game System derived from the official dnd5e v6.1.1 source.

- Check [the project documentation index](../README.md) and applicable [GDD addenda](../gdd/) before writing gameplay, character-creator, animation, or UI code.
- Do not confuse an approved design requirement with a tested or shipped feature.
- Treat the canonical GDD, once identified, as the primary design authority. Until then, preserve these user-approved addenda verbatim and flag any conflicts for the owner.
- For substantial tasks, produce a scoped plan, precise changed-file inventory, validation notes and outstanding questions.
- Never merge to `main` or publish a release without the owner's instruction. Use existing branch protections and pull requests.
- Preserve the underlying v6.1.1 dnd5e rules engine unless the owner explicitly authorizes a mechanics change. Never rename the inherited internal schema/flag namespace indiscriminately.
- Maintain the project's strict four-part `M.m.r.b` versioning policy; documentation changes alone do not authorize a new release.
- New visual assets must satisfy the licensing and attribution rules in the repository's upstream/third-party documentation.
- Do not commit generated personalized token media, server secrets, private user data, or unreviewed restricted artwork.
- Keep deployment decisions explicit: current tests are on the owner's local Foundry v14 PC; a future owner-controlled server will run Foundry instances and may host an authenticated separate media worker.

For scoped implementation notes, link the exact approved addendum rather than duplicating its design text.
