# NEON REQUIEM — GDD Addendum: Technology Systems Foundation

**Decision status:** OWNER-APPROVED DESIGN REQUIREMENTS — implementation pending  
**Decision date:** 2026-11-21  
**System:** Neon Requiem, a standalone Foundry VTT v14+ Game System derived from D&D 5e  
**Scope:** Magic replacement concept; Cyberware, Augmentations, and Hacks; augmentation slot ownership and loss rules  
**Canonical GDD:** This is a project-level approved addendum. Incorporation into the authoritative GDD remains pending confirmation of that document's location/version.  
**Design authority:** The owner's rules decisions in the Neon Requiem design conversation. This file is not evidence that these mechanics have been implemented or tested.

## 1. Foundation: D&D 5e rules, without traditional magic

- **D&D 5e remains the overall rules and mechanics foundation** for Neon Requiem, subject to explicit Neon Requiem changes.
- **Traditional fantasy magic is absent** from the intended Neon Requiem setting/rules experience.
- The traditional **spellcasting and spell-slot system is to be replaced or substantially repurposed** around three technological systems: **Hacks, Augmentations, and Cyberware**.
- The owner qualified the spellcasting removal with **"kinda"**. The precise extent of underlying spell-slot/spellcasting code removal, reuse, replacement, and migration is **not yet defined**. Do not interpret this requirement as authorization to delete inherited 5e source code, data, or spell APIs before detailed rules and compatibility work is approved.
- The technology systems are not merely three labels for one resource. Their individual roles and mechanics must remain distinct.

## 2. Foundational vocabulary (locked)

| Neon Requiem system | Conceptual role | Owner-approved meaning |
| --- | --- | --- |
| **Cyberware** | **Hardware** | Physical cybernetic modifications to the body, including implanted devices and replacement body parts |
| **Augmentations** | **Firmware** | Installed enhancements which modify a character's capabilities through compatible, color/type-matched augmentation slots |
| **Hacks** | **Software** | Learned and installed executable programs that require appropriate Cyberware and provide combat or utility effects |

**Canonical mnemonic:** **Cyberware = hardware; Augmentations = firmware; Hacks = software.**

The analogy is a conceptual model, not permission to invent technical limitations or a universal shared resource.

## 3. Hacks — software (locked concept)

- Hacks are **programs** a user may **learn and install**.
- A user needs the **proper Cyberware** installed to use compatible Hacks.
- Hacks can aid in **combat** and as **utility/environmental interactions**.
- Owner-provided examples include disabling cameras, blinding an enemy with cybernetic eyes, creating distractions, hacking ATMs, and opening electronically locked doors or containers.
- Criminal actions remain possible in the setting, including using hacking for unlawful access or theft.

**Not yet specified:** Learning procedure, installation capacity, activation actions, range, target eligibility, skill checks/DCs, costs/RAM, cooldowns, cybersecurity countermeasures, item taxonomy, legal consequences, and detailed compatibility rules.

## 4. Augmentations — firmware (locked concept)

- Augmentations are enhancements installed into **compatible augmentation slots**, serving the design role that traditional 5e **attunement slots** occupied.
- Every **Human or Synth body** provides **exactly six baseline augmentation slots**.
- **Each slot is color-coded by its augmentation type.** A selected Augmentation must match the slot's type/color to be installed there.
- Augmentations can modify character capabilities. Owner-provided examples include strength, lifting/carrying ability, agility, movement speed, and Dexterity.
- **Some Augmentations may require particular Cyberware** before installation is allowed.
- The game is expected to offer **hundreds of augmentation options** over time, creating meaningful configuration choices.

**Important:** Six is the number of **body-owned baseline slots**, not an absolute cap on all augmentation slots available to a character.

**Not yet specified:** Slot color names and type taxonomy, the mix of the six baseline slot colors, individual augmentation effects, stacking, availability/progression, install/remove procedure, swap cost, and exact attunement-rule interactions.

## 5. Cyberware — hardware (locked concept)

- Cyberware is a **physical cybernetic modification** installed into or replacing part of the body.
- Owner-provided examples include:
  - cybernetic eyes with enhanced vision;
  - integrated communication devices in the ear or jaw;
  - cybernetic replacement limbs or body parts;
  - replacing both human legs with cybernetic legs to improve movement and reflexes;
  - an internal nanobot dispenser aiding healing or recovery.
- Some **higher-end Cyberware** provides **additional augmentation slots**.
- The **number and color/type of those extra slots depend on the specific Cyberware**. They are not universal upgrades and are **in addition to** the six body-owned baseline slots.
- The presence of extra augmentation slots does **not** imply that Cyberware itself occupies or consumes baseline augmentation slots.

**Not yet specified:** Cyberware body-location categories, installation/surgery rules, baseline hardware limits, maintenance, failure, damage, costs, exact slot grants, and detailed mechanical effects.

## 6. Augmentation slot ownership, persistence, and removal (locked)

**Core ownership rule: An Augmentation is tied to the particular slot in which it is installed, and that slot is tied to its specific source.**

### 6.1 Body-owned baseline slots

- A Human or Synth body is the owner/source of its **six baseline slots**.
- The baseline slots belong to the body itself, not to a currently installed Cyberware item.

### 6.2 Cyberware-owned expansion slots

- A piece of Cyberware owns **each additional slot it provides**.
- Each such slot keeps the color/type assigned by that specific piece of hardware.
- An Augmentation installed in one of those slots is specifically associated with **that slot and its owning Cyberware**.
- Expansion slots are **not** an anonymous interchangeable pool that survives independently of the granting hardware.

### 6.3 Removing the owning Cyberware

When a Cyberware item that grants additional augmentation slots is **removed from the character**:

1. The specific augmentation slots granted by that Cyberware are **lost** from the character.
2. **Any Augmentations installed in those particular slots are lost with those slots** from the character's active installed configuration.
3. **Unrelated slots and Augmentations remain unaffected**, including the body's six baseline slots and slots supplied by other installed Cyberware.

**Owner's example:** A character has an Augmentation installed in a slot supplied by a set of cybernetic legs. Remove those cybernetic legs: their granted slots disappear, along with the Augmentations installed in those slots.

**Scope of "lost":** The owner has explicitly established the loss of slots and their slotted Augmentations when the hardware is removed. Whether the physical Augmentation items are destroyed, detached with the hardware, recoverable, or returned to inventory has **not** yet been defined. Do not invent a salvage policy.

### 6.4 Requirement for future implementation

To implement the locked behavior correctly, the system must be able to distinguish **which source owns each slot** and **which exact slot contains each Augmentation**. Stable identity and provenance for slot grants are an engineering requirement implied by the approved rules; the final Actor/Item data model remains for future design and review.

Removing Cyberware must not silently reassign its slotted Augmentations to unrelated available slots. Any future explicit relocation or recovery procedure requires a separately approved rule.

## 7. Explicitly unresolved interactions

Do **not** decide these without a further owner ruling:

- What happens to physical Augmentation items after removal of their owning Cyberware (destruction vs. recovery/storage)?
- What happens if Cyberware is **disabled, hacked, damaged, or temporarily suppressed**, rather than physically removed?
- What happens when Cyberware is upgraded, replaced with an identical component, or swapped for different hardware?
- May a character voluntarily transfer an Augmentation between slots, and at what cost/procedure?
- What color/type categories exist, and what six baseline colors each Human/Synth body starts with?
- How does Cyberware installation interact with biological versus Synth bodies?
- How do Hacks, Augmentations, and Cyberware change 5e action economy, resources, checks, saving throws, conditions, and combat balance?
- How precisely is the inherited spellcasting/spell-slot implementation retained, adapted, hidden, or replaced?

## 8. Acceptance criteria for a future implementation

These are **requirements for testing when implementation is authorized**, not claims of passing tests:

1. Human and Synth characters expose six body-owned augmentation slots, with stable type/color restrictions.
2. An Augmentation can be installed only into a compatible type/color slot, subject to any approved Cyberware prerequisite.
3. Cyberware grants only the number and colors/types of expansion slots explicitly defined for that item.
4. Slotted Augmentations maintain an explicit association with their **particular** slot and source.
5. Physically removing Cyberware eliminates only the slots it provides and their installed Augmentations from the active configuration.
6. The six body slots and unrelated Cyberware-owned slots survive removal of some other piece of Cyberware.
7. The system does not silently treat an expansion slot as a permanent body slot.
8. Undecided salvage, disabling, replacement, and reinstallation behavior must be blocked or explicitly flagged pending rules approval, not invented.

## 9. Implementation status and handoff

**Status: Design only. No gameplay implementation is authorized by this addendum.**

Luna is the project's documentation/bookkeeping lead; Terra is the primary code implementation agent; Sol is the Tier 2 engineering escalation; Astra is the final escalation option.

When implementation is separately approved, Terra should propose a data model and migration plan that preserve inherited 5e behavior until the new technology systems are ready, and Luna should track decisions and open questions. Do not release or bump versions merely because this addendum is documented.
