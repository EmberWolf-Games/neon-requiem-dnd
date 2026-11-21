# Versioning

Neon Requiem uses the EmberWolf Games version format `M.m.r.b`. This is a project policy, not conventional three-part Semantic Versioning.

`system.json` is the single canonical source for the Foundry system version. npm package metadata deliberately has no `version` field; npm SemVer tooling must never write `0.1.1.000` into `package.json`.

## Components

| Part | Meaning | Rule |
|---|---|---|
| `M` | Major | Starts at `0` and stays `0` through prototype, alpha, and beta. Set to `1` only after explicit approval for the first complete production release. Every future Major change also needs explicit approval. |
| `m` | Minor | Starts at `1`. Increase by exactly one for an intentional feature, capability, or system-level change. Do not increase for fixes or maintenance. |
| `r` | Release | Starts at `1` within each Minor. Increase by exactly one for a maintenance release. Reset to `1` when Minor increases. |
| `b` | Build | Starts at `000`, is exactly three digits, and ranges from `000` to `999`. It increases by exactly one for each new published build across all Major, Minor, and Release changes. It never resets. |

Major, Minor, and Release are unpadded non-negative decimal components, with Minor and Release at least `1`. Build always has three digits, including `000`, `001`, and `010`.

## Examples

| Event | Version |
|---|---|
| Initial published version | `0.1.1.000` |
| Next build of the same release | `0.1.1.001` |
| Maintenance release within Minor 1 | `0.1.2.002` |
| New feature release | `0.2.1.003` |
| Another build of that release | `0.2.1.004` |
| Maintenance release within Minor 2 | `0.2.2.005` |

The version listed in the current `system.json` is `0.1.1.000`. It is an unpublished setup baseline; no release tag or public artifact exists yet.

## Commands

Run commands from the repository root. They read and write only the `version` field in `system.json`.

| Command | Effect |
|---|---|
| `npm run version -- show` | Print the canonical Foundry version. |
| `npm run version -- minor` | Increase Minor by one, reset Release to `1`, and preserve Build. |
| `npm run version -- release` | Increase Release by one and preserve Build. |
| `npm run version -- prepare-build` | Increase Build by one, preserving the other components. Fails at `999`. |
| `npm run version -- major --authorize-major --minor 1` | Increase Major after explicit approval and an explicit choice of the new Minor value. |
| `npm run check:version` | Validate the current four-part value. |

For a future feature release, first run `minor`, then `prepare-build` before publishing. For a maintenance release, run `release`, then `prepare-build`. For another published build of the same release, run only `prepare-build`. The initial `0.1.1.000` is the one exception: it is already the starting build and is used for the first published release without incrementing it.

The `major` command is intentionally explicit. The first Major transition must also decide whether Minor carries forward or resets. The release validator requires the matching `--major-minor-decision=carry` or `--major-minor-decision=reset`; no default is assumed. Use the command only after the production Major decision is approved.

## Parsing and comparison

`scripts/version.mjs` provides parsing, formatting, validation, numeric comparison, Minor and Release transitions, Build preparation, Major approval checks, and published-release sequencing. It rejects missing/extra components, leading zeroes outside Build, non-numeric values, invalid Minor/Release zeroes, and Build values outside `000`–`999`.

The comparison helper treats each component as an integer, so `0.1.1.010` is newer than `0.1.1.009`. Automated tests cover parsing, transitions, zero padding, release sequencing, reuse, Major approval, and Build exhaustion.

Foundry v14 documents `foundry.utils.isNewerVersion` as comparing version parts separated by periods. This repository does not include a Foundry runtime, so the four-part leading-zero comparison still needs an in-app check before the system is called installable. In a Foundry v14 console, verify:

```js
foundry.utils.isNewerVersion("0.1.1.001", "0.1.1.000") === true
foundry.utils.isNewerVersion("0.1.1.000", "0.1.1.001") === false
foundry.utils.isNewerVersion("0.1.1.010", "0.1.1.009") === true
```

The upstream minimum is Foundry `14.367`; the live comparison check remains pending. See the [Foundry v14 API documentation](https://foundryvtt.com/api/functions/foundry.utils.isNewerVersion.html).

## Published Build and release protections

- A published release tag is `vM.m.r.b`, for example `v0.1.1.000`.
- The first published version must be `0.1.1.000`.
- Each subsequent published version must use the next global Build number exactly once and compare newer than the latest published tag.
- The validator rejects a duplicate version, skipped Build number, skipped Minor or Release, decreasing component, unauthorized Major, and Build exhaustion.
- GitHub Actions serializes release jobs. The job also checks published tags before it creates a release; a duplicate tag cannot be published.
- A failed CI run, local package, draft, or unshipped artifact does not consume a published Build number. If validation or upload fails before publication, fix the issue and retry the same version. Do not advance Build until a version is published.
- If Build `999` is reached, the utility and release validation fail safely. Do not wrap or reset; obtain a new version-policy decision.

## npm and release metadata

The Foundry system version lives in `system.json`. The Node project has a valid package name and engine requirement but no npm package version. The committed `package-lock.json` remains the dependency source for `npm ci`.

Source `system.json` does not contain a `download` URL before publication. The packaging workflow creates a release-specific manifest with a `download` URL matching the ZIP and uploads both as assets. After public URLs are verified, the workflow updates the `stable` manifest branch. This keeps the stable manifest from advertising an artifact that does not exist.
