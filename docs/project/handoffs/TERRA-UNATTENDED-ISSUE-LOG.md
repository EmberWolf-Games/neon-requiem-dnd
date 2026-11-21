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
- **Status:** Resolved in English; runtime verification pending
- **Area:** Inherited first-run welcome
- **Problem:** The welcome presents the derivative as the official D&D 5e system and links to upstream issue reporting.
- **Evidence:** Foundry 14.369 displayed the inherited D&D 5e welcome on creation of the disposable world.
- **Attempted resolution:** Inspected the runtime behavior; no unrelated branding changes made in this sprint.
- **Result:** Misleading copy remains.
- **Next action:** Verify the revised welcome in Foundry; audit other translations separately before release.
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
- **Status:** Resolved locally; hosted verification pending
- **Area:** GitHub Actions on dependent draft PR
- **Problem:** The existing CI workflow does not trigger for this branch or a pull request targeting PR #7's branch.
- **Evidence:** `.github/workflows/ci.yml` limits pull requests to `main` and pushes to `main` and `setup/**`; GitHub reported no workflow runs for the feature branch.
- **Attempted resolution:** Checked the trigger and GitHub run list; all documented checks were run locally.
- **Result:** Local validation passed, but GitHub-hosted CI is not yet verified for this draft.
- **Next action:** The Wave 2 branch adds `feature/**` push coverage; verify its GitHub Actions run after pushing. PRs targeting other feature branches still do not independently trigger the pull-request event; push checks run on their feature heads.
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

## Completed Work

- Wave 2: CI is configured to run the unchanged validation job for pushes to `feature/**`; this does not change release workflows or grant additional permissions.
- Wave 2: English welcome identifies Neon Requiem D&D and EmberWolf Games, points to project support and documentation, and identifies upstream content as unverified for this derivative. JSON parsing and lint passed; live verification remains pending.
- Wave 2: In-memory equipment assignment validates explicit multi-position occupancy, capacity, duplicate items, unknown positions, and retains independent prior arrays; unit tests passed.
- Wave 2: Static metadata records the approved races, starting Cyberware counts, class/subclass names and milestones, hybrid prerequisites, backgrounds, and augmentation categories. Exact Ripperdoc tool names remain pending; isolated metadata tests passed.

- Created a separate branch from the verified PR #7 head and established this ledger before implementation.
- Windows; Node `24.15.0`, npm `11.7.0`; licensed Foundry v14 executable is present. `npm ci --ignore-scripts`, `check:version`, `check:manifest`, `check:assets`, `npm test` (14 passed), `lint`, `build`, `package`, and `check:package` (732 entries) all passed at baseline.
- Implemented an in-memory slot module and a read-only inventory prototype. Final validation: version, manifest and asset checks passed; 18 tests passed; lint, build, package, package check (732 entries), and `git diff --check` passed.
- In a newly created disposable world on Foundry 14.369, opened character, NPC and weapon sheets and rolled in chat. After installing only rebuilt code, CSS and the changed template in the isolated test system and reloading, the inventory prototype displayed all 10 equipment capacities and six named color categories; inherited inventory controls remained visible. Browser warnings/errors after reload: none.

## Deferred Work

- Formal GitHub-manifest installation, persistent inventory, and token media integration are outside this sprint.
- This sprint did not re-test compendium document opening, scene/token placement, or full world restart after the prototype; these remain regression checks, not claimed passes.
