# Terra unattended sprint issue ledger

Base: PR #7 `0df308a66ef1dd6a2cd5425d4c37f385310773c4`. Design references: PR #8 `b682063c1385dc50d7284a1120fe18a023348999` and PR #9 `0ee71bcfc9f4a2c36fdddbceeb45f22f6b7181c5`. These design branches are not merged into this branch.

## Issues

### TERRA-001

- **Severity:** Blocking
- **Status:** Deferred
- **Area:** Derivative data migrations
- **Problem:** PR #7 deliberately does not migrate between distinct Neon Requiem versions.
- **Evidence:** `dnd5e.mjs` warns and returns when the stored four-part migration version differs from the system version.
- **Attempted resolution:** Reviewed the guarded code and existing preflight handoff; no persistent migration changes attempted.
- **Result:** Current prototype can remain in memory; migration behavior remains undefined.
- **Next action:** Design and validate an independently versioned migration strategy before persistence or release.
- **Dependency:** Persistent actor/item schema and upgrades.

### TERRA-002

- **Severity:** Non-blocking
- **Status:** Open
- **Area:** Foundry flag compatibility
- **Problem:** PR #7 registers the inherited `dnd5e` scope by mutating the client database backend's scope list; this depends on Foundry implementation details.
- **Evidence:** `module/neon-compatibility.mjs` calls `CONFIG.DatabaseBackend.getFlagScopes()` and pushes `dnd5e`.
- **Attempted resolution:** Reviewed the bridge and prior Foundry 14.369 preflight; its mock unit test passes, but future Foundry versions are not validated.
- **Result:** Retained the existing PR #7 behavior without broad changes.
- **Next action:** Review supported API and test compatibility on future Foundry builds.
- **Dependency:** Runtime compatibility and future Foundry upgrades.

### TERRA-003

- **Severity:** Non-blocking
- **Status:** Resolved
- **Area:** Augmentation category design references
- **Problem:** The PR #8 technology document says category names/colors remain to be specified, while PR #9 equipment rules and this sprint specify them.
- **Evidence:** PR #8 `b682063`; PR #9 equipment document `0ee71bc`; owner sprint specification.
- **Attempted resolution:** Compared the references and applied the later explicit owner-provided six categories and colors.
- **Result:** Six categories are usable for this isolated prototype; no earlier document was overwritten.
- **Next action:** Luna can reconcile the cross-document wording when those design PRs are integrated.
- **Dependency:** Documentation consistency, not pure slot topology.

### TERRA-004

- **Severity:** Non-blocking
- **Status:** Resolved
- **Area:** Slot module lint
- **Problem:** Initial lint reported a missing JSDoc comment and one line over 120 characters.
- **Evidence:** `npm run lint` reported two warnings in `module/neon/slots.mjs`.
- **Attempted resolution:** Added the helper documentation and wrapped the line.
- **Result:** Correction applied; final lint run will verify.
- **Next action:** Confirm final lint is clean.
- **Dependency:** Code quality, not slot behavior.

### TERRA-005

- **Severity:** Non-blocking
- **Status:** Resolved in English; other locales deferred
- **Area:** Inherited first-run welcome
- **Problem:** The welcome presents the derivative as the official D&D 5e system and links to upstream issue reporting.
- **Evidence:** Foundry 14.369 displayed the inherited D&D 5e welcome on creation of the disposable world.
- **Attempted resolution:** Inspected the runtime behavior; no unrelated branding changes made in this sprint.
- **Result:** English welcome and project support links were corrected and verified in disposable Foundry 14.369. Other locales remain unaudited.
- **Next action:** Audit non-English translations and inherited content links before release.
- **Dependency:** Accurate derivative presentation before public distribution.

### TERRA-006

- **Severity:** Non-blocking
- **Status:** Resolved
- **Area:** Disposable test browser viewport
- **Problem:** Initial browser viewport was too small for Foundry's canvas.
- **Evidence:** Foundry emitted a viewport-related warning at 1280 × 720.
- **Attempted resolution:** Resized the test browser to 1440 × 900.
- **Result:** The world and sheets loaded; after the prototype reload the browser error and warning log was empty.
- **Next action:** Include smaller-display layout testing in future UI validation.
- **Dependency:** Runtime visual testing.

### TERRA-007

- **Severity:** Non-blocking
- **Status:** Resolved
- **Area:** GitHub Actions on dependent draft PR
- **Problem:** The existing CI workflow does not trigger for this branch or a pull request targeting PR #7's branch.
- **Evidence:** `.github/workflows/ci.yml` limits pull requests to `main` and pushes to `main` and `setup/**`; GitHub reported no workflow runs for the feature branch.
- **Attempted resolution:** Checked the trigger and GitHub run list; all documented checks were run locally.
- **Result:** GitHub-hosted `feature/**` push validation passed on the final Wave 2 commit `42c919209bda523959fe80c333ee7af06d2d26f7` ([run 44957369490](https://github.com/EmberWolf-Games/neon-requiem-dnd/actions/runs/44957369490)). Dependent PR targets still do not trigger the pull_request event directly.
- **Next action:** Continue validating every updated head via feature-branch push and repeat required checks after retargeting/merging the dependency chain.
- **Dependency:** GitHub-hosted verification of the draft.

### TERRA-008

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** E.
- **Problem and evidence:** ESLint flagged a 121-character line in `assignEquipment` during the first lint pass.
- **Attempted fix and result:** Split the conditional across lines; slot unit tests passed before the edit.
- **Next action:** Confirm final lint; unrelated work can continue.

### TERRA-009

- **Severity:** Blocking; **Status:** Deferred; **Workstream:** D.
- **Problem and evidence:** The inherited sheet has no reviewed Neon equipment-position relationship or persistent Cyberware/Hack schema; the prior runtime prototype displays examples only.
- **Attempted fix and result:** Added labeled overview, combat, loadout and Hack guidance alongside the existing inherited inventory instead of inferring assignments or creating persistent fields. This remains a partial preview, not a separate comprehensive character-sheet mode.
- **Next action:** Review the persistence proposal and design an opt-in sheet with real owned-inventory mapping after schema decisions. Other independent work can continue.

### TERRA-010

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** C.
- **Problem and evidence:** The Foundry settings sidebar labeled upstream D&D 5e release notes, issues, wiki and Discord as system links after the revised welcome loaded.
- **Attempted fix and result:** Repointed notes, issues and documentation to the Neon Requiem repository and removed the misleading upstream Discord link. Upstream attribution remains elsewhere. This does not block other work.
- **Next action:** Retain upstream attribution and review other locales before release. The rebuilt sidebar displayed the three intended project links in Foundry 14.369.

### TERRA-011

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** D.
- **Problem and evidence:** At 1024 × 768, the expanded preview took most of the visible inventory area, pushing inherited controls below the fold.
- **Attempted fix and result:** Wrapped the preview in a native collapsed `details` element, keeping the original inventory readily accessible; no gameplay data changed.
- **Next action:** Extend accessibility testing when a full sheet mode exists. At 1024 × 768 the rebuilt preview was collapsed by default, inventory controls appeared in the accessibility tree, and Enter expanded the preview.

### TERRA-012

- **Severity:** Non-blocking; **Status:** Open; **Workstream:** A.
- **Problem and evidence:** A character token was placed in a new scene, but an attempted drag did not clearly show a position change; selecting the token darkened the blank canvas. Movement and persistence after restart were not established.
- **Attempted fix and result:** Tried a drag and an arrow key; the visual result was inconclusive. No repeated speculative fixes or campaign data changes were attempted.
- **Next action:** Use a lit disposable scene to verify movement and restart persistence; other independent work can continue.

### TERRA-013

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** E.
- **Problem and evidence:** The initial pure functions returned new arrays but shared untouched nested slot and position objects, so a caller could mutate a previous configuration through a later result.
- **Attempted fix and result:** Copy all known nested model objects on install and removal; added tests that mutate the returned occupant and position and confirm the earlier configuration remains unchanged.
- **Next action:** Keep future schema extensions included in the copy and immutability tests. Other work continues independently.

### TERRA-014

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** validation.
- **Problem and evidence:** A sandboxed `npm ci --ignore-scripts` stalled with no output during the final clean install.
- **Attempted fix and result:** Interrupted that attempt and repeated the same locked install with approved network access; 218 packages installed and npm reported zero vulnerabilities.
- **Next action:** Run final checks against the restored dependencies. Other work can continue.

### TERRA-015

- **Severity:** Non-blocking; **Status:** Open; **Workstream:** B.
- **Problem and evidence:** The successful GitHub Actions run for `a4c7f74` annotated that `actions/checkout@v4` and `actions/setup-node@v4` target deprecated Node 20 and were forced to run on Node 24.
- **Attempted fix and result:** Preserved existing action versions and permissions to keep this sprint's CI change narrowly scoped; all validation steps passed.
- **Next action:** Review supported action upgrades and pinning in a separate CI maintenance change. Other work can continue.

Wave 3 investigation: official action metadata for v5 declares Node 24. The CI-only action references are updated to v5, with no release workflow or permission change. GitHub run 44960223321 passed on `6841891` with no check annotations; this resolves the observed warning for that run, pending final-head verification.

### TERRA-016

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** G.
- **Problem and evidence:** Baseline `npm run lint` exits 0 but reports `no-useless-return` at `dnd5e.mjs:683` on main `0658889`.
- **Attempted fix and result:** Removed only the redundant final return from the function; the preceding migration branches remain unchanged.
- **Next action:** Run migration gate unit tests and lint. **Dependency:** Clean lint output; other work remains safe.

### TERRA-017

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** C.
- **Problem and evidence:** First lint run reported two missing JSDoc tags for the new projection.
- **Attempted fix and result:** Added the parameter and return tags; projection tests passed.
- **Next action:** Confirm final lint. **Dependency:** Code quality only.

### TERRA-018

- **Severity:** Non-blocking; **Status:** Deferred; **Workstream:** F.
- **Problem and evidence:** The upstream-content welcome tab reads a bundled listing and attempts an upstream network listing; it includes store links and can enable installed modules on form submission. Compatibility and commercial entitlements for this derivative are unverified.
- **Attempted fix and result:** Added a clear compatibility and licensing notice on the listing; did not install or enable content, change licenses or remove packs.
- **Next action:** Review listing and activation behavior with rights holders and test content compatibility before public release. **Dependency:** Premium content support claims; independent work continues.

### TERRA-019

- **Severity:** Non-blocking; **Status:** Deferred; **Workstream:** F.
- **Problem and evidence:** Only `lang/en.json` is bundled; other-language support and external localization overrides have not been audited for derivative branding.
- **Attempted fix and result:** Inspected the language directory and retained English; no speculative translation introduced.
- **Next action:** Audit supported translations and third-party overrides before localization release. **Dependency:** Non-English presentation only.

### TERRA-020

- **Severity:** Non-blocking; **Status:** Fix applied, limited runtime verification pending; **Workstream:** C.
- **Problem and evidence:** Directly projecting an item name could reveal an unidentified item to a non-owner even if the inherited item is generally visible.
- **Attempted fix and result:** Exclude unidentified items for non-owners in addition to Foundry's visibility and sheet filters; no documents are modified.
- **Next action:** Verify with a non-owner user in a disposable world and extend permission regression tests. **Dependency:** Multi-user permission validation; other work continues.

### TERRA-021

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** A.
- **Problem and evidence:** The previously used disposable server automatically reopened its old world; blank administrator credentials could not return it to Setup.
- **Attempted fix and result:** Started a separate licensed Foundry 14.369 instance with a fresh test-only data directory and created a new world; no old world or credentials were modified.
- **Next action:** Continue runtime testing only in the new disposable world. **Dependency:** Isolated runtime regression.

### TERRA-022

- **Severity:** Blocking; **Status:** Open; **Workstream:** A / G.
- **Problem and evidence:** Fresh main package on Foundry 14.369 emitted server-side compendium migration errors: `Documents from a core version newer than the running version cannot be migrated`, including `classes24`, `spells24`, and `equipment24`. Source records such as `packs/_source/spells24/cantrips/true-strike.yml` and `packs/_source/classes24/warlock/eldritch-invocation-options/pact-of-the-tome.yml` declare `coreVersion: '14.370'`. The server log contains 26 such record errors. Manifest minimum is 14.367.
- **Attempted fix and result:** Traced the failing records back to committed inherited source; did not downgrade metadata, modify packs, or run a migration. One character and item still opened, but this does not establish compendium safety.
- **Next action:** Compare exact official upstream records and Foundry compatibility behavior, test an appropriately licensed 14.370+ runtime, and determine a reviewed compatibility/remediation policy before release. **Dependency:** Reliable compendium access and minimum Foundry compatibility; pure-function work can continue.

### TERRA-023

- **Severity:** Non-blocking; **Status:** Resolved; **Workstream:** A.
- **Problem and evidence:** After returning the fresh disposable world to Setup and stopping its verified server process, the restart failed because `Config/options.json.lock` remained; the log reports the directory locked.
- **Attempted fix and result:** Verified the listener PID and its isolated data-path command line before shutdown, and checked that no matching process remains. No existing campaign data was touched.
- **Next action:** None for this test. After verifying no process used the test path, moved the stale lock aside inside the disposable directory, restarted the server, relaunched the world, and confirmed the token remained at (400, 200). **Dependency:** Full server restart regression; independent work continues.

### TERRA-024

- **Severity:** Non-blocking; **Status:** Deferred; **Workstream:** A / B / C.
- **Problem and evidence:** This run did not complete NPC, separate equipment sheet, chat roll, compendium document/link, item move, non-owner visibility or animation/media monitoring checks against the final branch. A weapon was created and equipped/unequipped in the disposable world, and static texture was checked, but these do not prove those remaining paths.
- **Attempted fix and result:** Tested the independently available character, weapon, scene, restart, static texture and compact keyboard paths and documented the server-side compendium errors separately.
- **Next action:** Run the missing checks in an isolated world after diagnosing TERRA-022, including a non-owner session and media-process observation. **Dependency:** Full end-to-end acceptance; fixtures and code review remain independent.

### TERRA-025

- **Severity:** Blocking; **Status:** Needs Owner Decision; **Workstream:** E / H.
- **Problem and evidence:** The fixture model demonstrates referential validation, but cannot establish approved persisted namespaces, item compatibility, clone remapping, backup policy, or disposition of removed Cyberware occupants.
- **Attempted fix and result:** Built plain-JSON validation, explicit clone remap and before/after dry-run snapshots without touching Foundry documents.
- **Next action:** Review and approve those data lifecycle decisions before persistent schema or migration implementation. **Dependency:** Persistent loadouts and migrations; read-only presentation can continue.

## Completed Work

- Wave 3 baseline: Windows, Node 24.15.0, npm 11.7.0, base `0658889ba34f297aeb335a467fb6e4eadf85fca2`; clean `npm ci --ignore-scripts`, version, manifest, assets, 21 tests, lint (one pre-existing warning), build, package and package verification passed (exit 0; 732 entries).
- Wave 3: Baseline `main` created and opened a character in a new disposable Foundry 14.369 world. The branch registered as an opt-in sheet, showed a real owned weapon and updated its inherited equipped state after the normal inventory button was clicked; browser error/warning log after the branch reload was empty.
- Wave 3: In a nonblank globally illuminated test scene with token vision disabled, a named token moved from (300, 200) to (400, 200) pixels; the latter coordinates persisted after client reload and after world shutdown, isolated server restart and world relaunch. Unequipping the linked actor's weapon left the token image path `systems/neon-requiem-dnd/icons/svg/actors/character.svg` unchanged. Animation/export behavior was not tested.

- Wave 2: CI is configured to run the unchanged validation job for pushes to `feature/**`; this does not change release workflows or grant additional permissions.
- Wave 2: English welcome identifies Neon Requiem D&D and EmberWolf Games, points to project support and documentation, and identifies upstream content as unverified for this derivative. JSON parsing and lint passed; live verification remains pending.
- Wave 2: In-memory equipment assignment validates explicit multi-position occupancy, capacity, duplicate items, unknown positions, and retains independent prior arrays; unit tests passed.
- Wave 2: Static metadata records the approved races, starting Cyberware counts, class/subclass names and milestones, hybrid prerequisites, backgrounds, and augmentation categories. Exact Ripperdoc tool names remain pending; isolated metadata tests passed.
- Wave 2 runtime: Foundry 14.369 reopened the disposable world after a server start; revised welcome and project links displayed. Character inventory preview rendered at 1440 × 900 and 1024 × 768. A modern Equipment compendium opened, search found Rope, and the Rope item sheet rendered. A blank scene was created and a character token placed. The only captured browser errors were the initial 1280 × 720 minimum-viewport warnings, before resizing.

- Created a separate branch from the verified PR #7 head and established this ledger before implementation.
- Windows; Node `24.15.0`, npm `11.7.0`; licensed Foundry v14 executable is present. `npm ci --ignore-scripts`, `check:version`, `check:manifest`, `check:assets`, `npm test` (14 passed), `lint`, `build`, `package`, and `check:package` (732 entries) all passed at baseline.
- Implemented an in-memory slot module and a read-only inventory prototype. Final validation: version, manifest and asset checks passed; 18 tests passed; lint, build, package, package check (732 entries), and `git diff --check` passed.
- In a newly created disposable world on Foundry 14.369, opened character, NPC and weapon sheets and rolled in chat. After installing only rebuilt code, CSS and the changed template in the isolated test system and reloading, the inventory prototype displayed all 10 equipment capacities and six named color categories; inherited inventory controls remained visible. Browser warnings/errors after reload: none.

## Deferred Work

- Formal GitHub-manifest installation, persistent inventory, and token media integration are outside this sprint.
- This sprint did not re-test compendium document opening, scene/token placement, or full world restart after the prototype; these remain regression checks, not claimed passes.
