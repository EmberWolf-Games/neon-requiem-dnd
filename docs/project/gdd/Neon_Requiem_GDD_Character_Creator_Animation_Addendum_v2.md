# Character Identity Creator and Animated Scene Tokens

**Status:** Approved visual and technical design; implementation pending  
**Recorded:** 21 Nov 2026 · Revision 2  
**Scope:** Character appearance, overhead token assets, animation, and personalized media export for Foundry VTT v14+  

This is an appearance system, not a change to character abilities or 5e combat mechanics. Character selections and animation assets need to stay consistent across clients and remain usable without a media-generation service.

### Equipment does not affect token appearance

**Equipped or installed gear never changes the animated or static scene token.** Weapons, armor, clothing, backpacks, helmets, attachments and Cyberware have their normal gameplay effects, but the token retains the saved appearance produced by the Character Identity Creator. Equipment changes must not trigger artwork swaps, animated overlays, new sprite combinations or media regeneration.

A character may wear a jacket or appear to carry gear in their *chosen visual art*, but this is not synchronized to their live inventory. Any optional appearance presets are cosmetic and independent of equipped items; they do not modify gameplay. The first creator still uses the four approved Human/Synth bases with head styles, skin colors and hair colors. A new personalized pack is created only for an authorized, deliberate appearance update or source-asset revision—not from gear changes.

The matching [Equipment and Slots](Neon_Requiem_GDD_Equipment_and_Slots.md) addendum defines the mechanical loadout and item slots.

## Visual requirements

1. Tokens must be **true 90-degree overhead / bird's-eye top-down**, not an oblique or isometric camera angle.
2. **No facial features or face should be visible** from the token camera. The silhouette must make sense when the complete image is rotated to face any direction.
3. Each character needs **one directional source orientation**, not eight separate direction-specific animations. The system rotates the complete token to match the movement vector and holds its last facing while stationary.
4. Characters may differ in gender presentation, hair and their chosen fixed art-base outfit, while all maintaining a consistent scale, center point, orientation reference and overhead camera. **The chosen outfit is independent of their equipped gear.**
5. Prefer transparent **WebM** for scene animations; provide a static WebP fallback. Test codec/alpha support and performance in Foundry-supported clients.
6. **Walking** is the initial locomotion animation (not running). Running is a possible later enhancement, not part of the first proof of concept.
7. Animated tokens are **optional per token**. Static tokens remain supported without added configuration.

## Animation states

| State | Visual behavior | Trigger / priority |
|---|---|---|
| Idle | Loop: breathing, slight movement of the fixed artwork and clothing | Stationary, conscious, alive |
| Walk | Loop: footsteps matching actual movement | Token is moving, conscious, alive |
| Collapse | One-shot: standing to downed pose | Transition into unconscious/downed |
| Unconscious | Loop: prone, faint breathing or minimal movement | Downed but not dead |
| Death | One-shot: character falls or goes limp | Transition to dead |
| Dead | Static final frame or nearly motionless hold | Dead state, highest priority |
| Revive | Optional one-shot recovery transition | Later enhancement; return to idle when revived |

**State priority:** Dead > Unconscious/Downed > Walk > Idle. In D&D 5e, zero HP does not by itself imply death: state decisions must account for the system's actor conditions, death saves and applicable creature rules.

## Foundry v14 integration

- Implement a **system-owned token animation controller**, rather than a module dependency.
- Use documented Foundry v14 movement and token APIs where available for movement, facing and rotation.
- Track movement and status transitions without creating a new document update per animation frame.
- All clients should observe consistent state and facing; avoid racing late events, jerky texture swaps and flickering transitions.
- Handle drag/preview, interrupted movement, teleport, scene reload, actor re-linking and network reconnection gracefully.
- The last valid facing direction persists after movement; rotation is around the visual/token center with a standardized source sprite orientation.
- Preload assets when practical and release unused textures/decoders; enforce sensible resource budgets and static fallbacks for slower machines.
- Validate interaction with Foundry grid movement, token rings, scene lighting, fog, token overlays and the combat tracker.

## First playable proof of concept

**Initial asset set:** One adult male-presenting and one adult female-presenting true-top-down base character, each with idle, walk, collapse, unconscious, death and dead pose assets; static WebP fallback per character. Character designs may draw from the approved Neon Requiem mascot/gear reference imagery but the in-game assets must be genuinely overhead.

**Proof-of-concept acceptance:**

1. A character loops idle when stationary.
2. On legal token movement, walk loops and the token faces the vector of travel, including diagonals and non-cardinal angles.
3. On stopping, idle resumes smoothly without snapping to a default orientation.
4. Downing triggers collapse once, then unconscious loop; recovery returns to idle.
5. Death triggers the death transition and then a stable dead pose; death is not inferred solely from reaching zero HP.
6. Animations are consistent for the GM and connected players and recover correctly after a reload.
7. Static tokens continue operating normally when animation is disabled or video is unsupported.
8. Measurable performance remains acceptable with multiple animated tokens; no runaway decoder, event or memory usage.

## Not part of the first phase

- Eight-direction artwork per character.
- Angled cameras, visible faces, isometric token sprites.
- Running, attacking, reloading, aiming or weapon-specific animation sets.
- New gameplay mechanics or changes to D&D movement and death rules.

These requirements still need to be built and tested in Foundry v14.

---

## Character Identity Creator

Neon Requiem will provide a **system-native Foundry VTT character-identity creator**. A player selects a base character type and an overhead head style, adjusts appearance colors, previews their character, and then finalizes/locks the selected appearance. This is a visual-character system distinct from D&D 5e mechanics.

### Initial body archetypes

1. **Male Human**
2. **Female Human**
3. **Male Synth**
4. **Female Synth**

These are the four initial **art and animation bases** for the two playable races, Human and Synth. They are not a limit on later appearance options.

### Head styles

- Provide a curated set of compatible, clearly distinguishable true-overhead head/hair/helmet styles **for each base**.
- No facial features or face are visible at the token-camera angle.
- Different hairstyles must be recognizable primarily by **silhouette, shape, parting, bulk, and overhead color**, including suitable synthetic/cybernetic scalp choices for Synths.
- Standardize head origin/anchor, scale, orientation, and compositing order across body animations.
- Store the chosen body archetype, head-style ID, color values, and appearance schema version as **namespaced Actor flags or equivalent system-owned appearance metadata**.
- Finalization locks normal player editing of the visual identity; provide an explicit **GM-authorized override** for correction or narrative updates. Server-side authorization is required, not just disabling buttons.
- Never use appearance choices to silently change actor attributes, abilities, or rules. A separate mechanic may use Human/Synth identity as expressly designed in the rules GDD.

### Player-facing flow

1. Select **Human** or **Synth**.
2. Select **Male** or **Female** body base.
3. Browse compatible head styles with overhead thumbnails.
4. Choose **skin color** and **hair color** independently using preset swatches and a color picker.
5. Preview the assembled character at true overhead view, and preview **Idle**, **Walk**, and representative downed/dead poses. Allow rotation of the preview.
6. Confirm the appearance. Save a stable appearance configuration and bind or generate its animation pack.
7. Finalize and lock appearance. Keep a GM override and a static fallback.

A detailed, face-visible portrait may exist separately on the character sheet; it is **not** used as the directional scene token.

## Skin and hair recoloring

- **Independent color masks** for skin and hair are required. Color pickers affect only their respective masked regions.
- A mask is part of the animation source pipeline and must be aligned **per frame** for each relevant pose. It must follow moving head/body pixels during walking, collapsing, and dying.
- Preserve original lighting, highlights, texture, occlusion, and shading when recoloring; do **not** apply flat opaque blocks of color or tint the entire token.
- Store colors in reproducible machine-readable form (e.g., validated six-digit hexadecimal sRGB), with an appearance/asset schema version.
- Recolor consistently across **every** selected character animation state; include any static WebP fallback and thumbnail.
- Optional future *cosmetic* masks might recolor fixed art-base accents, such as synthetic plating or jacket trim. These are **not required for MVP** and must never be driven by equipped armor, weapons, Cyberware or other inventory state.
- For a Synth, skin color may affect synthetic skin or exposed synthetic material according to that art base's defined masks.
- To avoid a combinatorial asset explosion, **do not pre-render every possible color combination**. Produce personalized animation outputs only for selected/finalized appearances, while keeping reusable source rigs, frames and masks.
- Record asset provenance, ownership/license and source rig versions, allowing a personalized pack to be reproduced later.

## Preview and personalized media export

**Preferred approach:**

1. **Source assets**: Four true-overhead body rigs, head-style overlays, and consistently aligned transparent animation frames, with per-frame skin/hair masks.
2. **Interactive preview**: Foundry `ApplicationV2` character-creator interface, with client-side canvas/graphics compositing for responsive, mask-aware recoloring. This is a planned implementation, not a claim of an existing Foundry built-in color-mask editor.
3. **Finalize request**: Save validated appearance metadata to the authorized Actor, with a stable unique character asset ID.
4. **Pack generation**: A controlled asset pipeline composites the selected layers and colors frame-by-frame, then exports **transparent looping WebMs** and static **WebP** fallbacks. FFmpeg may be used for encoding, together with a frame compositor appropriate for precise alpha/mask processing.
5. **Runtime playback**: The system-owned token state controller selects the correct finalized media for idle, walking, unconsciousness, and death, and rotates the complete true-overhead token to face movement.
6. **Fallback**: If personalized video is not ready, unsupported, or too expensive on a client, use the correct personalized static WebP. Existing static-token behavior remains supported.

**Fallback approach:** If encoding infrastructure or browser codec/alpha support becomes a blocker, evaluate real-time, mask-aware rendering on the token canvas. This is a **fallback engineering route**, not the preferred initial production approach. Validate against Foundry v14 rendering APIs before promising compatibility.

**Asset count:** Each finalized character gets the required state media for **that selected appearance only**. Body rigs and style assets are reusable. Avoid multiplying four bases × all hairstyles × all color combinations × all state media in the published system.

**Media/canvas requirements:**

- True 90° overhead; no face or oblique view.
- One source orientation per character; rotate the composite output, not separate eight-direction renders.
- Standard square transparent frame with shared origin and facing axis across all states.
- No baked-in directional shadows/highlights that become visually implausible when rotated.
- Reasonable resolution/frame-rate/codec/alpha settings, determined by live testing. Start with a constrained proof of concept, then benchmark.
- Seamless loops for idle/walk/unconscious; one-shot collapse/death transition clips or equivalent state logic, then static/looped final state.
- No requirement for players to install FFmpeg locally.

## Local development and later hosting

### Stage A — Current: Local Windows PC + Local Foundry VTT v14

The project's **first real tests run on the owner's local PC Foundry instance**.

- Develop and validate the Foundry character creator, Actor appearance flags, masked preview, and animation controller locally.
- Initially run the compositor/FFmpeg export tool **locally as a development command or local-only helper**. Manual export is acceptable for the initial proof of concept; do not block the first live tests on a production web service.
- Place the generated pack inside a **Foundry-accessible User Data asset directory** such as a dedicated `neon-requiem/characters/<asset-id>/` namespace, subject to an installation-specific path decision and access checks.
- Reference the resulting files through Foundry-accessible asset URLs, not local workstation drive letters.
- Test generation, alpha video playback, scene updates, save/reload behavior, and at least a GM/player multiplayer session.
- Keep the encoder separate from ordinary gameplay and from the system's browser JavaScript. A browser-side button should not be expected to run local FFmpeg directly.
- Do not publish external production endpoints or assume a hosted server is already configured.

### Stage B — Future: Owner-Controlled Server Hosting Foundry v14 + Panel/Instances

The owner operates a server hosting the panel website and Foundry instances and has full administrative control. This makes a **server-managed media generation worker** a viable long-term choice.

- Run the compositor and FFmpeg as a **separate authenticated sidecar/worker service** (process/container/job) controlled by the owner, **not as arbitrary client-executed shell commands**.
- When a player finalizes their appearance, send the validated appearance specification to a server endpoint; authorize the user/Actor relationship, queue the job, generate media, and return the resulting stable URLs.
- Scope output directories, job permissions, quotas and filenames by **Foundry instance/world/character** as appropriate; never assume all hosted worlds can share unrestricted write access.
- Give the media worker access only to an approved output directory or object store. Reject path traversal, invalid color specs and unapproved source asset IDs.
- Prefer **content-addressed/versioned outputs**, atomic publication, job deduplication, progress/error feedback, cache invalidation, retries and cleanup of abandoned files.
- Store generated assets where the corresponding Foundry instance can serve them to connected clients. Confirm routing, ownership, backups and permissions with the panel's actual deployment layout.
- Protect the service with authentication and rate limits; do not expose an unauthenticated FFmpeg endpoint to the public Internet.
- Treat the worker as **optional deployment infrastructure**: system gameplay and static tokens continue functioning when it is unavailable.
- An external user-facing website is **not required** for the creator: it remains in Foundry. The existing server/panel may later manage worker deployment and storage, but those integrations require separate design.

**Deployment direction:** Local validation comes first; the self-hosted encoder worker follows when needed. Paths, transport, codecs and worker tooling will be settled against the actual server.

## Acceptance tests

1. Four base choices can be selected and previewed; each exposes its approved head styles.
2. No character reveals a face when the token is rotated through a full 360°.
3. Skin and hair color selections independently recolor only the correctly masked areas.
4. Masks remain registered to the correct sprite pixels through every frame and transition.
5. Two characters with identical base/head selection but different colors remain visually distinct on the same scene.
6. A finalized Actor retains exactly the same visual identity after Foundry/world reload and when viewed by other clients.
7. Appearance lock blocks ordinary player changes while a verified GM override can modify them.
8. Transparent WebM clips play correctly on supported Foundry v14 desktop clients, with no objectionable edge artifacts; static WebP fallback works.
9. Walk state faces the true travel direction; idle, unconscious and dead media retain intended facing and transition correctly.
10. Local export works without a remote media server; remote export may be implemented after local proof of concept.
11. For remote generation, unauthorized calls cannot overwrite another Actor's media, escape designated paths, or exhaust worker resources.
12. Token movement and state changes do not cause unnecessary video re-encoding. Encode only when the **saved appearance is deliberately edited** or its source assets change; do not regenerate media for inventory or equipped-gear events.
13. Bulk token stress tests establish an acceptable animation and video-decoding budget.
14. Equipping or removing weapons, clothing, armor, headgear or tactical gear leaves the character's token artwork and media URLs unchanged.
15. Installing, removing or replacing Cyberware changes game rules and slots where appropriate, but does not automatically change the token artwork.

## Suggested work packages

**A. Foundry identity-creator prototype:** Native UI; four bases; selectable overhead heads; static masked skin/hair preview; Actor persistence and lock/GM override.

**B. Source asset pipeline:** Consistent true-overhead rigging, head anchors, per-frame masks, frame compositor, deterministic export commands, transparent WebM + WebP generation.

**C. State-aware animation on canvas:** Idle/walk/downed/dead media selection, automatic rotation, multiplayer synchronization and fallbacks.

**D. Local end-to-end validation:** Create, recolor, finalize, export locally, load token in v14, walk/down/revive, reload and multiplayer test.

**E. Optional later server automation:** Authenticated worker, job queue, scoped storage, panel integration and production operations.

**Current state:** Requirements and architecture approved. The creator, compositing pipeline, encoding worker and animated tokens still require implementation and live testing.