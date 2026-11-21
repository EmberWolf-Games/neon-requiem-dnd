# Releasing

Neon Requiem releases are distributed as a Foundry Game System through GitHub Releases. No release was published during repository setup.

## Release channel

Foundry's stable manifest URL is:

```text
https://raw.githubusercontent.com/EmberWolf-Games/neon-requiem-dnd/stable/system.json
```

The `stable` branch is written by the release workflow only after a release has been published and its public assets have been checked. The source `system.json` intentionally has no `download` field, so a checkout or pull request cannot advertise a nonexistent release. The release-specific `system.json` asset contains the matching ZIP URL and points back to the stable manifest for future updates.

The GitHub release is published as a regular release, even while the system's Major remains `0`. GitHub prerelease filtering therefore does not control Foundry update discovery. The stable manifest branch is the explicit Foundry update channel.

## Release assets and layout

Each release includes:

- `neon-requiem-dnd.zip` — system files at the ZIP root, with `system.json` at the top level and no extra enclosing directory.
- `system.json` — release-specific manifest matching the tag and ZIP download URL.

The package includes the production build and required licenses/attributions. It excludes development caches, `node_modules`, tests, source docs, and generated files not listed by the Foundry manifest/package configuration.

## Release steps

1. Complete the version decision and update `system.json` with the version helper. For the first release, use the initialized `0.1.1.000` without incrementing it.
2. Verify that the source has passed CI, package validation, an in-app Foundry v14 smoke test, and the current asset-license review.
3. Dispatch **Release** from the repository's `main` branch. Leave `publish_release` false for a dry run. Set it true only when explicitly authorizing publication.
4. Before publication, confirm the exact candidate passed a clean Foundry v14 in-app smoke test and that the release asset/provenance review is complete. The workflow blocks publication unless both confirmations are set.
5. Supply Major approval and the `carry`/`reset` Minor choice only for a Major transition.
6. The workflow checks the version/tag, compares against published releases, serializes release work, builds the package, validates its structure, and creates/uploads the release assets.
7. It checks public asset URLs and verifies the stable manifest after updating the `stable` branch.
8. Confirm the GitHub release, tag, ZIP, release `system.json`, and stable manifest all use the same version.

## Safeguards

- Release jobs use least-privilege `contents: write` only for publishing; CI uses read-only repository access.
- A repository-wide Actions concurrency group serializes release runs. The validator rejects duplicate tags, reused versions, out-of-order versions, and skipped Builds.
- The Build counter increases only for published releases. Failed checks and local packages do not consume a number. A failed workflow should be retried with the same candidate version until it is published.
- GitHub Releases are not created by CI pushes or pull requests. The manual dispatch input defaults to a non-publishing dry run.
- The stable manifest is updated only after the ZIP and release manifest are publicly reachable.
- No workflow deploys to Foundry hosting or uses a private credential; `GITHUB_TOKEN` is sufficient.

If a run fails after creating a draft or after publishing but before updating the stable manifest, inspect the release and branch state before retrying. Do not delete or overwrite a published tag. Re-run only the remaining safe publication steps after confirming their state.
