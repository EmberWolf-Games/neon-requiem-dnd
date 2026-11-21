# Equipment, Loadouts and Slots

**Status:** Owner-approved design; item values and equipment catalog pending  
**Recorded:** 21 Nov 2026  
**Scope:** Physical inventory, readied equipment, weapon/armor attachments, Cyberware locations, Augmentation types and token-art separation  
**Implementation:** Not started. No gameplay-code or media-pipeline changes have been authorized by this record.

## Principle: gameplay equipment does not change animated token artwork

**The animated scene token is determined by the Character Identity Creator, not by what the character equips.** This is an explicit owner-approved simplification to keep animated-token assets manageable.

Equipping or removing weapons, armor, jackets, helmets, goggles, packs, grenades, implants, or other gear **never automatically adds, removes, recolors, swaps or regenerates token art**. Cosmetic appearance is a separate saved identity choice. There is no automatic item-to-sprite lookup, equipment-driven layer stack, or per-weapon/per-armor animated variant.

The four established art bases (Male Human, Female Human, Male Synth, Female Synth), supported head choices, and independent skin/hair colors remain the starting Character Identity Creator scope. Chosen artwork may depict a fixed outfit or cyberpunk gear motif as part of the **visual identity**, but that artwork is **not a live representation of equipped inventory**. Changing inventory does not alter it.

**Appearance choices are not equipment slots.** The earlier concept of headwear, outerwear, gloves, legwear, footwear and accessories can only be treated as **optional, future cosmetic identity choices**, if later approved. They are **not required for the first creator**, do not grant gameplay stats and are not automatically populated by owned items. A deliberate identity edit under the creator's approved finalization/GM-override rules is the only normal reason to create a different personalized appearance pack. Updating the art source may also require re-export, but gameplay gear changes do not.

This limitation applies to both static WebP fallbacks and transparent WebM animation states. Animations still react to movement and character state (idle, walk, downed, dead); those state transitions are **not equipment-dependent**.

## Four distinct inventories and slot systems

| System | What it describes | Slot authority |
| --- | --- | --- |
| **Inventory / loadout** | Gear carried, wielded, worn, readied or stored | Physical equipment positions on the character |
| **Cyberware** | Physically installed devices and replacement parts | Anatomical compatibility of the actual hardware |
| **Augmentations** | Type-matched firmware installed in body or Cyberware-granted slots | Six baseline body-owned slots plus item-owned expansion slots |
| **Attachments** | Modifications mounted on a particular firearm, armor piece, drone or other device | Sockets supplied by the parent equipment item |

**Hacks are separate installed software.** Their installation capacity and resource/action model will be defined by compatible Cyberware and shared Hack rules, **not by gear pockets, body-owned Augmentation slots or weapon attachment sockets**.

An item may exist in inventory without being equipped, active or installed. Foundry implementation must distinguish ownership from usable location and active status.

## Physical equipment slots — initial loadout

| Slot | Capacity | Typical use |
| --- | ---: | --- |
| Head | 1 | Helmet or protective headgear |
| Face | 1 | Mask, visor, goggles or respirator |
| Body Armor | 1 | Light, medium or heavy armor |
| Tactical Rig | 1 | Holsters, magazines, utility pouches or other carrying harness |
| Back | 1 | Backpack, equipment pack or supported apparatus |
| Left Hand | 1 | Held weapon, shield or tool, or an empty hand |
| Right Hand | 1 | Held weapon, shield or tool, or an empty hand |
| Sidearm Holster | 2 | Readied compact firearms |
| Long-Gun Sling | 1 | Readied rifle, shotgun or similar long gun |
| Quick-Access | 4 | Compatible small consumables, magazines and small tools |

These capacities are **approved initial design targets**, not extra combat actions, extra inventory volume or additional Augmentation slots.

- A **two-handed weapon** occupies both hands while wielded, even if it can be slung when not wielded.
- A one-handed pistol or shield uses one hand while wielded.
- A slung or holstered weapon is **readied**, not automatically wielded.
- A piece of gear can occupy or block more than one slot if its item rules say so. For example, a sealed full-face helmet may occupy **Head and Face**.
- Carrying gear in a pack does not place it in a quick-access position. A tactical rig may modify accessible capacity **only when an item explicitly grants that effect**.
- An empty loadout slot does not create a free item; actual gear must be present in inventory.

The exact action costs for drawing, stowing, readying, switching weapons, retrieving bagged supplies and reloading firearms will be part of the universal combat/equipment rules.

### Armor protection

**Body Armor** sets the character's base armor calculation under the future Neon Requiem armor rules. Do not add multiple full armor values from helmets, body armor, clothing and accessories. Other gear may supply a discrete, defined bonus or protection effect; stacking, coverage and numeric balance still require shared rules.

The loadout is **mechanical only**. Wearing heavier armor never swaps the token's clothing layers or animation media.

## Item states and accessibility

| State | Meaning |
| --- | --- |
| **Equipped** | Worn or mounted in a compatible loadout position |
| **Wielded** | Currently held in one or both hands |
| **Readied** | In a supported holster, sling or quick-access position |
| **Carried** | Stored in a carried container without immediate access |
| **Stashed** | Stored somewhere else; not on the character |
| **Installed** | Physically incorporated into a body or item, or installed as compatible software/firmware |

These are **functional descriptions**, not necessarily mutually exclusive inventory flags. A wielded weapon is also in the character's possession; an installed attachment belongs to its parent equipment item. The final data model must represent those relationships without allowing duplicate copies or contradictory active locations.

For initial testing, retain the inherited 5e **carrying-capacity foundation**. Item weight, container capacity and exact retrieval costs need a later equipment pass; do not invent a second carry-weight system yet.

## Augmentation slots — six body-owned categories

Every Human and Synth begins with **six body-owned, type-restricted Augmentation slots**, one of each of the approved initial categories below:

| Slot name | Color reference | Category | Examples of intended effects |
| --- | --- | --- | --- |
| **Force** | Red (`#D94D58`) | Strength and impact | Heavy lifting, melee force, impact resistance |
| **Mobility** | Amber (`#E5A93E`) | Movement and agility | Sprinting, climbing, evasive movement |
| **Interface** | Cyan (`#36BBD8`) | Digital access and connections | Compatible interface and control improvements |
| **Sensory** | Violet (`#A27BE8`) | Perception and targeting | Enhanced awareness, targeting support |
| **Recovery** | Green (`#41B88A`) | Health and endurance | Recovery and physiological support |
| **Defense** | Blue (`#598BE4`) | Protection and resilience | Defensive support and physical resistance |

The names/colors are the **initial approved organization for testing** and may be retuned if item catalog work reveals problems. Always accompany color with a name or icon for accessibility. Individual Augmentation effects, stacking, Cyberware prerequisites, installation procedures and prices remain to be designed.

One Augmentation occupies **one specific compatible slot** unless its item explicitly sets different requirements. An empty slot of another color is not a substitute. Body-owned slots persist independently of external equipment and all Cyberware expansion slots.

### Cyberware expansion slots and ownership

Higher-tier Cyberware may grant extra Augmentation slots of specified types, in whatever number its item definition allows. **Each expansion slot belongs to the particular Cyberware item that granted it.**

Example: An advanced neural interface grants **one Interface** slot and **one Sensory** slot. A character with it installed has six body slots plus two slots owned by that neural interface: **eight active slots in total**.

Removing that interface physically removes **only its two slots** and the Augmentations installed in them from the character's active configuration. The original six body slots and expansion slots from other Cyberware stay intact. **No automatic migration to available slots** occurs.

Whether the detached Augmentations are destroyed, salvaged, recoverable or remain mounted on the removed hardware is **not yet decided**. Damage, suppression, hacking, replacement and temporary malfunction are also distinct from physical removal and require separate rules.

This section restates the owner-approved [Technology Systems Foundation](https://github.com/EmberWolf-Games/neon-requiem-dnd/pull/8), without changing its source-ownership rule.

## Cyberware locations and compatibility

Track **anatomical installation region** separately from Augmentation slots:

| Region | Typical Cyberware |
| --- | --- |
| Neural | Interfaces and neural processors |
| Ocular | Cybernetic eyes and targeting optics |
| Auditory / Facial | Hearing, communications and facial implants |
| Torso / Internal | Medical systems, internal power and organ replacements |
| Arms / Hands | Prosthetic limbs and grip systems |
| Legs / Feet | Replacement limbs and mobility actuators |
| Dermal / Skeletal | Subdermal protection and structural reinforcement |

**No universal one-implant-per-region rule.** Hardware determines which exact locations it uses, whether smaller implants can coexist and which replacements conflict. For example, two full replacements cannot occupy the same physical arm, but smaller compatible components may share a broader region.

Cyberware installation does not implicitly consume a body-owned Augmentation slot. It grants slots only where the item's definition explicitly says so. **Installed Cyberware also does not automatically change the token art.**

## Weapon, armor and device attachment sockets

Attachments live on the **particular equipment item**, not the character's body. An item has only the sockets its definition actually specifies.

| Firearm socket | Typical attachment |
| --- | --- |
| Optic | Reflex sight or magnified scope |
| Muzzle | Suppressor or compensator |
| Underbarrel | Foregrip or tactical light |
| Magazine / Feed | Extended magazine or alternate feed |
| Stock / Grip | Recoil-control part |

Armor may support plates, protective lining, sealed modules or communication mounts. Drones and turrets may provide their own weapon, sensor, tool or power sockets.

A scope remains attached to its rifle when the rifle is stashed, dropped or transferred. A drone mount belongs to the drone. **Attachment sockets never convert into Augmentation slots**, and Fabricator modifications are physical/equipment enhancements rather than body firmware.

Attachment compatibility, installation labor, item-tier enhancement limits and stacking bonuses await the equipment catalog and bounded-accuracy review.

## Quick-access gear, consumables and ammunition

The standard quick-access capacity is **four compatible slots**. A slot may hold an allowed small item or allowed stack—such as a magazine, medical injector, grenade or compact tool—subject to the eventual item's size, quantity and stacking rules.

- A quick-access slot does not create supplies, increase weapon capacity or override the ammunition count.
- A backpack cannot be treated as four extra quick slots.
- A tactical rig can only grant more accessible positions if its item description explicitly supports that change.
- Carrying, readying, loading and using a consumable are different actions; their combat timing still needs a unified rule.

The full item catalog will define which items fit and how many may occupy each position.

## Drones and external deployables

A **carried drone** and an **active deployed drone** are different states. A character may own or transport several physical devices but must still obey the Engineer's class-level active-deployable limits, shared command economy, material requirements and device attack restrictions.

Rigger drones, Architect turrets, portable barricades and other devices use their own physical attachment sockets. Those sockets do not grant body Augmentations or free Hack installation capacity.

## Initial equipment catalog — next design stage

| Category | Initial coverage |
| --- | --- |
| Firearms | Pistols, SMGs, shotguns, rifles, heavy weapons |
| Melee weapons | Knives, batons, blades, powered melee |
| Armor | Light, medium, heavy, helmets |
| Clothing | Jackets, masks, gloves, boots; gameplay item data, not token overlays |
| Tactical gear | Holsters, rigs, packs, shields |
| Consumables | Medical supplies, grenades, ammunition |
| Tools | Medical, engineering, salvage, security and communications kits |
| Gadgets | Sensors, traps, surveillance and deployables |
| Cyberware | Implants, prosthetics and internal devices |
| Augmentations | Type-coded firmware |
| Hacks | Learned and installed software |
| Attachments | Weapon, armor and device modifications |
| Vehicles and drones | Transport and autonomous physical constructs |

Item lists, statistics, costs, currencies, availability, rarity, weights, firearm reloads, attachment capacities and class/background starting equipment remain open. Do not assume any specific item catalog exists in Foundry yet.

## Acceptance criteria for implementation planning

1. Equip, swap, holster or drop a weapon: **no change to animated or static token art**.
2. Equip/unequip armor, clothing, helmet or pack: **no token media swap, visual overlay or export job**.
3. Install/remove Cyberware: enforce actual hardware compatibility and slot provenance, **without automatically altering token visuals**.
4. Equipment position restrictions and two-handed occupancy are enforced independently of carried inventory.
5. All Human/Synth characters have the same six body slots and categories; starting installed Cyberware follows their racial rules.
6. Item-owned Augmentation expansion slots retain the identity of their parent Cyberware; removing that item removes only its own slots and occupants from the active configuration.
7. An equipment attachment remains bound to its actual weapon, armor piece or device; it cannot be installed in an Augmentation slot.
8. Hacks require learned/installed compatible software and Cyberware; gear positions do not change Hack capacity.
9. Device deployment obeys Engineer capacity, action economy and physical item requirements.
10. The Character Identity Creator may export media upon **deliberate appearance finalization or approved appearance edit**, but ordinary inventory events **must not enqueue encoding or change the selected media pack**.

**Design status:** Approved equipment-and-slot architecture, with the independent token appearance constraint. No equipment prices, stats or system code are approved by this document.
