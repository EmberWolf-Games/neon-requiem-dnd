# Technology Systems — Cyberware, Augmentations and Hacks

**Status:** Approved design rules; implementation and detailed mechanics pending  
**Recorded:** 21 Nov 2026  
**Scope:** The replacement for traditional 5e magic, augmentation slots and equipment ownership

## The model

Neon Requiem keeps 5e as its rules foundation, but its setting has **no traditional fantasy magic**. The spellcasting and spell-slot system will be replaced or substantially reworked around three forms of technology.

| System | Analogy | What the player is using |
| --- | --- | --- |
| **Cyberware** | Hardware | Physical implants, replacement limbs and installed devices |
| **Augmentations** | Firmware | Enhancements fitted into type-matched slots |
| **Hacks** | Software | Programs learned and installed on compatible hardware |

The three systems serve different purposes, and a character may use more than one together. Their detailed resource and action rules are not settled yet.

**Spellcasting implementation remains open.** The owner described removing the existing spell-slot and casting rules with a deliberate "kinda" qualification. That establishes the design direction, not a decision to delete inherited 5e fields, code or spell data before a replacement and compatibility plan exists.

## Hacks: software

A Hack is a program the character can **learn and install**, provided they have suitable Cyberware. It must be compatible with the hardware that will run it.

Hacks have uses in and out of combat. Established examples include:

- Blinding an opponent through compatible cybernetic eyes.
- Disabling security cameras or using connected equipment to create a distraction.
- Opening electronically locked doors and containers.
- Accessing an ATM or other electronic system, including for criminal purposes.

Hacking is part of the setting's ordinary security and criminal economy; it is not limited to combat encounters.

**To specify later:** how Hacks are learned, stored and installed; compatible hardware; targeting and network access; resource costs (including whether RAM is used); actions, checks, defenses, range, duration, cooldowns, tracing and consequences. Learning a program, installing it and executing it should remain distinct operations unless a later rule combines them.

## Augmentations: firmware

Augmentations are enhancements installed in **color-coded, type-specific slots**. They fill the character-customization role that 5e attunement slots once served, with stricter installation constraints.

- Every **Human and Synth body starts with six body-owned Augmentation slots**.
- Each slot has a **type, represented by a color**. An Augmentation can only occupy a compatible slot.
- Augmentations can improve Strength, Dexterity, movement speed, lifting/carrying capacity, agility and other capabilities.
- Some Augmentations also require particular Cyberware before they can be installed.
- The eventual catalog is expected to contain **hundreds of options**. Characters therefore choose among many possible upgrades but have limited space to install them.

**Six is the baseline, not the character's absolute capacity.** Advanced Cyberware can supply additional slots.

**To specify later:** the color/type categories, which colors appear in the baseline six, individual effects and stacking, how Augmentations are acquired or moved between slots, and which Cyberware prerequisites apply.

## Cyberware: hardware

Cyberware physically changes the body. It includes implants and replacement parts, from small communication units to substantial cybernetic limbs or internal medical systems.

Examples already established for the setting:

- Eyes with enhanced vision.
- Communication units implanted in the ear or jaw.
- Entire replacement limbs or other body parts.
- Cybernetic legs that can improve movement and reflexes.
- Internal nanobot dispensers that assist healing and recovery.

Some higher-end Cyberware grants **additional Augmentation slots**. The item itself specifies **how many slots** and **which slot types/colors** it provides. Those slots are added to the body's six baseline slots.

Cyberware is not automatically an Augmentation and does not implicitly consume one of the body's six slots. Its physical installation and other prerequisites are separate rules to be developed.

## Slot ownership: the binding rule

**An Augmentation belongs to the exact slot where it was installed. The slot belongs to its source.**

There are two kinds of source:

1. **Body-owned:** The six baseline slots provided by the Human or Synth body.
2. **Cyberware-owned:** Any additional slots supplied by a particular installed Cyberware item.

Cyberware-owned slots do not become permanent body slots. They remain associated with the item that grants them.

### Removing Cyberware

When a piece of Cyberware is physically removed from a character:

1. All Augmentation slots granted by **that specific item** disappear from the character.
2. Every Augmentation installed in **those specific slots** is lost from the character's active installed configuration.
3. The six body-owned slots and any slots from other Cyberware remain unchanged, along with their installed Augmentations.

**Example:** A character installs an Augmentation into a slot supplied by cybernetic legs. When those legs are removed, that slot and its installed Augmentation leave the active configuration. The body's baseline slots are unaffected.

**What "lost" means physically is still undecided.** The rule establishes removal from the active configuration; it does **not** establish whether the Augmentation was destroyed, stays attached to the removed hardware, can be salvaged or returns to inventory. This distinction must be settled separately.

Removing Cyberware must not silently move its Augmentations into available slots elsewhere.

### Other hardware states

**Removal is not the same as damage or temporary disabling.** No decision has yet been made about how slots behave when the owning Cyberware is hacked, malfunctioning, damaged, suppressed or replaced with an identical component. Until those rules exist, implementation should not assume they behave like physical removal.

## Data and implementation requirements

When gameplay implementation is authorized, each Augmentation installation must retain two identifiable relationships:

- The **particular slot** containing it, including that slot's type/color.
- The **source** of that slot: the body or a specific Cyberware item.

This source tracking is required to implement precise hardware removal and keep unrelated installations intact. The final Foundry Actor/Item schema, stable identifiers, migrations and rollback behavior still need engineering review.

The technology framework must also preserve the existing distinction between **Human and Synth** bodies; their six baseline slots are the same, but other racial rules and starting Cyberware differ under the separate character-design decisions.

## Acceptance checks for eventual gameplay work

1. A Human or Synth begins with six body-owned slots.
2. An Augmentation fits only a compatible type/color slot and meets any defined Cyberware requirement.
3. A Cyberware item grants exactly its specified number and types of slots.
4. Every installation is linked to one particular slot and its owner.
5. Removing Cyberware removes **only its own** slots and the Augmentations installed there from the character's active configuration.
6. Baseline slots and slots granted by other hardware survive unaffected.
7. No operation silently promotes an expansion slot to a permanent body slot or relocates its installed Augmentation.
8. Salvage, damage, disabling, hardware replacement and reinstallation must follow later owner-approved rules, not implied default behavior.

## Open design work

The big remaining decisions are the common Hack resource and execution model; Augmentation categories and individual effects; Cyberware installation and repair; how damaged or disabled hardware affects firmware; salvage/recovery; and integration with 5e's action economy, saving throws, conditions and level progression.

The class and subclass designs now reference these systems, but **they do not settle the underlying technology rules by themselves**. Ripperdoc surgery, Engineer device features and Cipher's hacking abilities must eventually use the same shared model.

**Build status:** Design documented. No rules implementation, playtest or release is claimed.
