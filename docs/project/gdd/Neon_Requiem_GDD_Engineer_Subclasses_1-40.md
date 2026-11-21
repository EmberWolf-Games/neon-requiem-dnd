# NEON REQUIEM — Engineer Subclasses (Levels 1–40)

**Decision status:** OWNER-PRE-APPROVED SUBCLASS DESIGN DRAFT — open to balancing and the eventual device/equipment item taxonomy  
**Date:** 2026-11-21  
**Base class:** Engineer ([approved 1–40 progression](Neon_Requiem_GDD_Engineer_Progression_1-40.md))  
**Related special hybrid:** [Ripperdoc](Neon_Requiem_GDD_Ripperdoc_Hybrid_Progression_1-20.md), which requires Engineer 5 and Lifeline 5  
**Implementation:** NOT IMPLEMENTED.

## Shared device rules and hard boundaries

- Subclass milestones are Engineer class levels **3, 7, 11, 15, 19, 23, 27, 31, 35, 39**; ASI/feat choices remain **4, 8, 12, 16, 20, 24, 28, 32, 36, 40**.
- Base Engineer **Deployment Charges and active-deployable limits remain authoritative** (one at 2; two at 21; up to three only during Grand Design at 40). Any operating drone, turret, portable cover or remote gadget occupying the active-deployable system **counts against this limit**.
- Drones and turrets need actual buildable **physical items, ammunition, energy, components, HP/AC, ranges and control connections**. Never infer that a class level conjures free hardware. An owned item must be created/acquired through normal agreed procedures.
- **Provisional equipment attack formula:** INT + proficiency bonus; exact die values, damage types, equipment cost, construct stat blocks, scaling, and the 21–40 proficiency table require future review.
- Different devices share commands and action economy. In particular, **extra drones or turrets cannot produce an unlimited number of attacks**: the prototype rules above allow at most one commanded/offensive device attack per round under Engineer's control unless a separate explicit future system rule modifies this.
- Fabricator modifications are **equipment tuning, not Augmentations**. They never occupy, relocate, mint or bypass body/Cyberware-owned color slots, and cannot grant missing Cyberware prerequisites.
- No magical creation, remote biological healing or general-purpose digital intrusion. Unauthorized system access is the domain of actual learned/installed compatible Hacks.

## Rigger

**Identity:** Construct, maintain and operate a physical drone companion; remote control and reconnaissance rather than unauthorized hacking.

| Engineer level | Feature | Proposed effect |
| ---: | --- | --- |
| 3 | **Companion Drone** | Using an actual drone chassis, components and tools, prepare one owned companion drone. Deployed, it counts toward Engineer's active-deployable limit. On your turn use a Bonus Action to command it to move and take one action (Scan, Help, Interact or one installed light-weapon attack). Prototype attack: INT + proficiency bonus to hit, range determined by the weapon (provisionally 30 ft), 1d6 + INT damage, expending ammunition. Drone HP/AC require a construct stat block. |
| 7 | **Extended Control Link** | Increase your drone's supported command link by 30 feet when radio conditions permit. Once per Short Rest when it successfully scans a hazard, gain advantage on one associated Investigation check within one minute. |
| 11 | **Combat Drone** | Your companion drone's eligible light-weapon damage increases to 2d6 + INT, with suitable upgraded components. It still makes only one commanded attack per round and uses actual ammunition. |
| 15 | **Reinforced Chassis** | A compatible modified companion drone you maintain gains +2 AC and increased maximum HP equal to your Engineer level. The reinforcement requires materials and does not prevent mechanical failure. |
| 19 | **Recon Autonomy** | Once per round, an active companion drone equipped with an appropriate sensor may send a warning about one approaching visible/detectable threat in its range without consuming its commanded action. It does not perform an attack automatically. |
| 23 | **Two-Drone Coordination** | If the Engineer has two available active-deployable slots, two compatible companion drones can both move when you give a single Bonus Action command. Only one may attack or perform a significant device action through that command. |
| 27 | **Remote Service** | Once per Short Rest, use an action and expend one Deployment Charge to have a companion drone with the correct onboard repair components restore 2d8 + INT HP to an adjacent repairable construct, or itself; it must actually carry those materials. |
| 31 | **Tactical Swarm** | Once per Short Rest when commanding two active compatible drones, one may Help while the other makes its single commanded attack with the same Bonus Action. All line-of-sight, communication and ammo requirements apply. |
| 35 | **Adaptive Payload** | After a Short Rest with appropriate components, reconfigure one companion drone's mounted tool, sensor or weapon payload without spending a Deployment Charge. It cannot carry mutually incompatible payloads. |
| 39 | **Rigger Mastery** | Once per Long Rest after one companion drone is destroyed, deploy a previously constructed spare drone from your physical inventory as an action without an additional Deployment Charge; it must be accessible, fit active slots, and cannot appear from nowhere. |

## Fabricator

**Identity:** Improve weapons, armor, tools and equipment through physical fabrication and iterative mechanical tuning.

| Engineer level | Feature | Proposed effect |
| ---: | --- | --- |
| 3 | **Workshop Modification** | At the end of a Short Rest with tools/materials, tune one mundane weapon or armor item for a consenting user. Choose +1 to attack rolls with a weapon or +1 AC when wearing the armor, as applicable. Only one such Fabricator modification active, no duplicate modifier on the same item, and equipment cannot exceed future enhancement limits. |
| 7 | **Maintenance Specialist** | Once per Short Rest during appropriate maintenance, restore an eligible tool, weapon or device to working condition after mundane wear or a minor jam, with a successful technical check and materials. This does not restore bodily HP. |
| 11 | **Dual Workstation** | Maintain two different modified items simultaneously; each item has only one Fabricator modification. With appropriate tools you can prepare one for another willing character. |
| 15 | **Specialized Tuning** | When modifying an item, you may instead choose a specialized effect: a weapon gains +2 to one damage roll per turn, or armor grants advantage on the first check to resist a physical forced-movement effect each Short Rest. The item still has only one active modification unless later features allow otherwise. |
| 19 | **Combat Refit** | Once per Short Rest, use an action, materials and one Deployment Charge to temporarily restore an accessible disabled but repairable weapon or mechanical device to function for one minute. It reverts to its previous condition afterward unless fully repaired. |
| 23 | **Hardened Components** | One of your modified devices or weapons gains advantage on its own eligible saving throw against mundane electrical disruption, vibration, or mechanical jamming. This does not protect an entire character against a cybernetic Hack. |
| 27 | **Prototype Suite** | Maintain up to three different modified items simultaneously, using the existing modification limits per item. At least one may be equipment held by a consenting ally. |
| 31 | **Flash Calibration** | Once per Short Rest, use an action with tools/components to change one active item modification into a different eligible modification without completing a Short Rest, if the item is accessible and the rework physically makes sense. |
| 35 | **Iterative Prototype** | One of your three modified items may carry a second distinct approved Fabricator enhancement after a Short Rest; no doubling the same numerical bonus or gaining new Cyberware-owned augmentation slots. |
| 39 | **Master Fabricator** | Once per Long Rest during a Short Rest with a properly equipped workshop, temporarily tune a fourth item for one hour and grant one of your standard modified items +1 additional damage on one hit per turn for that hour. All required materials must exist and stacking limits apply. |

## Architect

**Identity:** Static emplacements, cover, traps, defense infrastructure and battlefield engineering.

| Engineer level | Feature | Proposed effect |
| ---: | --- | --- |
| 3 | **Portable Barricade** | Learn a deployable folding barricade schematic. As an eligible gadget deployment it creates physical half cover in a legal space, has object HP/AC, occupies one active-deployable slot, and requires a real frame/materials. It can be damaged, moved or destroyed. |
| 7 | **Perimeter Alarm** | Learn a non-damaging sensor/signal trap schematic for a 10-foot-radius approach zone. Once placed and active it can alert connected teammates when movement triggers its compatible sensors. It counts toward your active-deployable limit and is subject to stealth/jamming. |
| 11 | **Sentry Platform** | Learn a stationary turret schematic requiring a real frame, mount and ammunition. It occupies an active slot. Command one attack as a Bonus Action when its line of fire and ammo permit: provisional INT + proficiency bonus to hit, damage 1d8 + INT, normal weapon range 60 feet; only one turret attack per round unless a specific future rule grants more. |
| 15 | **Reinforced Position** | When you deploy a barricade with sufficient reinforcement materials, allies using it as physical cover may benefit from three-quarters cover instead of half cover on eligible firing lines. Enemies can flank, destroy or bypass it. |
| 19 | **Reactive Sentry** | Once per Short Rest, use your Reaction to command an active equipped turret to make one attack when a hostile creature enters its monitored lane. This consumes normal ammunition and cannot occur if the turret already attacked that round. |
| 23 | **Fortification Layer** | Your portable barricades gain additional maximum HP equal to your Engineer level and +1 AC as physical objects. They remain destructible, movable and subject to the normal cover geometry. |
| 27 | **Minefield Grid** | If you have two active-deployable slots, maintain two distinct compatible trap devices whose separate triggers can be monitored as a common alert network. No automatic additional explosions or free attacks occur. |
| 31 | **Breach Engineer** | Once per Short Rest, use a technical check and appropriate charges or demolition equipment to identify and exploit one structural weak point of a mundane barrier. The GM adjudicates physical collapse; this never creates explosives or bypasses total cover. |
| 35 | **Automated Emplacement** | Once per round an active turret may make its single eligible attack when a hostile creature triggers a defined firing condition, without spending your Bonus Action. All turrets under your control still share a **one attack per round** limit unless a later global rule explicitly changes it. |
| 39 | **Siege Formation** | Once per Long Rest, deploy one prepared barricade and one prepared turret or alarm with a single action, paying each gadget's full material/Deployment Charge costs and obeying your current active-deployable limit. The deployment must have two legal physical spaces. |

## Development concerns

- **Device action economy:** Carefully test the one-offensive-device-attack prototype rule alongside Engineer's Dual Deployment, Linked Systems, Autonomous Response and Grand Design. Autonomy does not bypass shared offensive limits unless explicitly revised.
- **Artificer-like item enhancements:** Avoid stacking repeated Fabricator numerical bonuses with future weapon tiers or Augmentation slots. Compatible inventory/object data and item ownership are required.
- **Ripperdoc boundary:** Fabricator repairs gear; the special hybrid handles integrated body/cybernetic surgery. These subclass features do not grant Ripperdoc class levels, surgery credentials or Surgical Protocols by themselves.
- This file records 30 pre-approved feature **concepts**, subject to later tuning and actual engineering specifications.