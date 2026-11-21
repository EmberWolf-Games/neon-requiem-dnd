# Design QA — Editorial Review and Open Rules

**Reviewed:** 21 Nov 2026  
**Scope:** Six base-class progressions, eighteen subclass tracks, Ripperdoc, the class roster, technology terminology and the Character Identity Creator

## What changed in the editorial pass

The design records now use a straightforward rulebook voice. We removed conversational approval transcripts, redundant status disclaimers, expired "design this class next" instructions and repeated paragraphs explaining that an approved idea has not been implemented.

Long subclass feature tables were converted to individual **feature headings with level labels**. The [subclass index](Neon_Requiem_GDD_Subclass_Index_1-40.md) remains the quick-reference matrix. This keeps the full rules readable without losing a compact level-by-level view.

The roster now reflects the work as it stands: six approved base-class progressions, eighteen drafted and pre-approved subclass trees, and the separately approved Ripperdoc hybrid.

**No approved feature levels, resource quantities, prerequisites, damage values or effects were deliberately rebalanced during the copyedit.** The work above is editorial. Any future balance adjustment should be recorded as a separate rules decision.

## Rules issues to settle before implementation

These are not copyediting errors; they need actual game-design decisions.

| Area | Open question or overlap | Why it matters |
| --- | --- | --- |
| **Progression 21–40** | Proficiency bonus curve, ability-score caps, feat/ASI handling, total character level and multiclass advancement | These affect every feature DC, saving throw and attack bonus |
| **Hacks** | Installation capacity, execution costs, range, actions, targeting, defense, sustained use, trace detection | Cipher's Rapid Execution, Parallel Processing and Root Access cannot be balanced against an undefined Hack economy |
| **Firearms** | Ammo, magazine and reload actions, firearm categories, heavy weapons, cover and burst fire | Deadeye's Paired Fire, Combat Reload and Demolitionist attacks depend on these rules |
| **Deadeye saves** | DEX and WIS are both common/high-value 5e saving throws | Recheck the chassis when comparing all six classes |
| **Ghost damage** | Precision Strike reaches 20d6 at Ghost level 39; exact eligible weapons and once-per-turn triggers | Needs damage and HP benchmarking against Vanguard and Deadeye |
| **Device action economy** | How multiple Rigger drones, Architect turrets, autonomous responses and Engineer Grand Design share attacks | Extra devices must not create an unlimited number of offensive actions |
| **Equipment bonuses** | Fabricator's item enhancements and higher-tier gear modifiers | Keep bounded accuracy intact and prevent stacked equipment bonuses from replacing Augmentation choices |
| **Trauma Tech overlap** | Rapid Stabilizer (subclass level 3) and Crisis Response (Lifeline level 14) both provide reaction-based stabilization at 0 HP | The later base feature may make the earlier subclass choice redundant; consider a distinct upgrade in a later balance pass |
| **Medical eligibility** | Which treatments work on Humans, Synths and cybernetic components; required supplies and delivery hardware | Lifeline's Combat Treatment, nanomedical regeneration and Ripperdoc surgery need compatible patient rules |
| **Cyberware removal** | What happens to installed Augmentations after hardware removal: destroyed, salvaged, or still attached? What happens when hardware is merely disabled? | Slot ownership is settled; item recovery and temporary hardware failure are not |
| **Ripperdoc resources** | Surgical Protocol costs, resource scaling with multiclass levels, procedure time, supplies and facility quality | The hybrid combines Deployment Charges with Treatment Dice and needs a consistent cost model |
| **Human / Synth race traits** | Starting Cyberware count is known (Human 1, Synth 2), but racial bonuses and disadvantages are not | Class balance should not assume unapproved racial traits |
| **Backgrounds** | Twelve Neon Requiem backgrounds are approved for initial testing; skill/tool mappings, Edge adjudication and starting equipment are provisional | Test each background's utility and contact hooks without granting extra Cyberware or free class features |

## Copy and implementation standards

Write feature rules from the player's perspective: **trigger, required action, target, effect, duration, cost, limit**. Use 5e terms consistently (Action, Bonus Action, Reaction, Short Rest, Long Rest, saving throw, advantage) unless Neon Requiem explicitly replaces them.

Prefer direct verbs: **choose, spend, move, make, gain, reduce**. Avoid filler such as "legendary tactical superiority" when the next sentence can say precisely which roll, movement or resource changes.

Do not turn a hardware prerequisite into a free class benefit. A learned Hack still requires an installed compatible program and Cyberware. A drone or turret still needs equipment and supplies. A medical treatment still needs a valid patient and delivery method.

Distinguish **approved design**, **working numbers**, **implemented code**, and **passed tests**. A green design decision is not a playtest result. Move provisional balance notes into a common review section instead of repeating the same caveat after every feature.

Use descriptive class and feature names but keep the rule text plain. The setting can sound cyberpunk without every line sounding like advertising copy.

## Verification checklist for GDD maintenance

- [x] Six base classes and three subclasses per class.
- [x] Thirty features per class spread across the ten reserved subclass levels.
- [x] Base-class tables still span levels 1–40 with ten ASI/feat slots and ten subclass milestones.
- [x] Ripperdoc remains a distinct 20-level hybrid with Engineer 5 / Lifeline 5 entry requirements and no subclass tree.
- [x] Hardware-owned Augmentation slots remain tied to the source and are removed with that Cyberware.
- [x] All files remain design documentation; no game-system source or version was changed.
- [ ] Full numerical and rules-interaction playtest.
- [ ] Foundry v14 implementation and multiplayer validation.
- [ ] Shared progression/equipment/Hack/medical rules finalized.

These notes are for Luna and Terra's next review pass; they do not revise the approved mechanics on their own.
