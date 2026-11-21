# Neon Requiem — Game Design

This directory contains approved design decisions and working mechanics. **Approved** means the direction is settled for now; it does not mean a feature is balanced, implemented, or tested. We can revise individual values as the rest of the rules come together.

The authoritative consolidated GDD has not yet been established. Until then, these documents are the working record.

## Core design

- [Technology systems](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/8): Cyberware is hardware, Augmentations are firmware, and Hacks are software. Includes slot ownership and removal rules. *(Separate PR awaiting review.)*
- [Character Identity Creator and animated scene tokens](Neon_Requiem_GDD_Character_Creator_Animation_Addendum_v2.md): Four Human/Synth art bases, overhead tokens, appearance controls, video and fallback pipeline.
- [Playable class roster](Neon_Requiem_GDD_Six_Class_Roster.md): Six base classes, their party roles and all eighteen subclass names.
- [Subclass milestone index](Neon_Requiem_GDD_Subclass_Index_1-40.md): Every subclass feature name by level, with links to the full rules.

## Class progressions

| Class | Base class levels 1–40 | Three subclass paths |
| --- | --- | --- |
| **Vanguard** | [Base progression](Neon_Requiem_GDD_Vanguard_Progression_1-40.md) | [Juggernaut · Reaver · Warden](Neon_Requiem_GDD_Vanguard_Subclasses_1-40.md) |
| **Deadeye** | [Base progression](Neon_Requiem_GDD_Deadeye_Progression_1-40.md) | [Longshot · Gunslinger · Demolitionist](Neon_Requiem_GDD_Deadeye_Subclasses_1-40.md) |
| **Ghost** | [Base progression](Neon_Requiem_GDD_Ghost_Progression_1-40.md) | [Phantom · Blade Dancer · Saboteur](Neon_Requiem_GDD_Ghost_Subclasses_1-40.md) |
| **Cipher** | [Base progression](Neon_Requiem_GDD_Cipher_Progression_1-40.md) | [Intruder · Puppeteer · Handler](Neon_Requiem_GDD_Cipher_Subclasses_1-40.md) |
| **Engineer** | [Base progression](Neon_Requiem_GDD_Engineer_Progression_1-40.md) | [Rigger · Fabricator · Architect](Neon_Requiem_GDD_Engineer_Subclasses_1-40.md) |
| **Lifeline** | [Base progression](Neon_Requiem_GDD_Lifeline_Progression_1-40.md) | [Trauma Tech · Nanomedic · Combat Responder](Neon_Requiem_GDD_Lifeline_Subclasses_1-40.md) |

**Ripperdoc:** [Earned Engineer/Lifeline hybrid, levels 1–20](Neon_Requiem_GDD_Ripperdoc_Hybrid_Progression_1-20.md). Entry requires Engineer 5 and Lifeline 5, plus ability and tool prerequisites. Ripperdoc has no subclass tree.

All six base classes reserve **ASI/feat choices at 4, 8, 12, 16, 20, 24, 28, 32, 36 and 40**. Subclass features occur at **3, 7, 11, 15, 19, 23, 27, 31, 35 and 39**. Ripperdoc uses its own twenty-level progression and overall character levels still cap at 40.

## Still to be settled

Common proficiency and ability-score scaling past level 20; Hack resources and execution; firearms and ammunition; device and drone action economy; healing supplies and Human/Synth medical compatibility; specific damage, DCs and recovery values.

[Editorial review notes](EDITORIAL_REVIEW_NOTES.md) track text cleanup and rules issues that should be resolved before these working drafts become implementation specifications.

**No gameplay code is changed by these GDD files.** Consult the [project documentation hub](../README.md) for implementation instructions and handoffs.
