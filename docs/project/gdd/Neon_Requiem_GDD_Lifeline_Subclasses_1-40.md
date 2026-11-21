# NEON REQUIEM — Lifeline Subclasses (Levels 1–40)

**Decision status:** OWNER-PRE-APPROVED SUBCLASS DESIGN DRAFT — subject to medicine, supply, patient and character-level balancing  
**Date:** 2026-11-21  
**Base class:** Lifeline ([approved 1–40 progression](Neon_Requiem_GDD_Lifeline_Progression_1-40.md))  
**Related hybrid:** [Ripperdoc](Neon_Requiem_GDD_Ripperdoc_Hybrid_Progression_1-20.md), requiring Engineer 5 + Lifeline 5  
**Implementation:** NOT IMPLEMENTED. No gameplay code or release authorization.

## Shared constraints

- The subclass milestones are Lifeline class levels **3, 7, 11, 15, 19, 23, 27, 31, 35, 39**. Base-class ASI/feat selections remain **4, 8, 12, 16, 20, 24, 28, 32, 36, 40**.
- All three paths use the **base Lifeline Treatment Dice resource**, scaling as 4d6 at level 2, 6d8 at 13, 8d10 at 21, and 10d12 at 30, plus actual medical tools/consumables. They do not gain fantasy healing spells or new spell-slot pools.
- The **base-class Treatment Dice spending cap per Combat Treatment** remains authoritative (1 die through level 12, 2 at level 13, 3 at 21, 4 at 30). A subclass's multi-patient feature uses separate dice per treatment and cannot silently exceed the per-treatment cap.
- **Medical feature DC (provisional):** 8 + proficiency bonus + WIS modifier, or an appropriate Medicine/technical check as the feature specifies; proficiency scaling beyond level 20 is undecided.
- The precise definition of **eligible patients and treatments for Human versus Synth bodies remains open**, including whether Synths can be healed, repaired, or require specialized alternative devices. A subclass does **not** grant universal repair of mechanical body parts or automatically alter Cyberware-owned augmentation slots.
- No resurrection after established death, no unlimited supplies, no permanent implant surgery without the Ripperdoc's distinct rules, and no unaided remote medical intervention.

## Trauma Tech

**Identity:** Acute injuries, emergency stabilization, treating shock and saving recoverable patients under immediate threat.

| Lifeline level | Feature | Initial playtest effect |
| ---: | --- | --- |
| 3 | **Rapid Stabilizer** | Once per Short Rest when an ally within 5 feet is reduced to 0 HP, expend one Treatment Die and use your Reaction with appropriate medical gear to immediately stabilize them. This prevents further death saving throws due to instability, but does not itself restore HP. |
| 7 | **Shock Triage** | Once per Short Rest when you use Combat Treatment on an ally below half its maximum HP, grant additional temporary HP equal to your proficiency bonus after restoring HP. Temporary HP does not stack. |
| 11 | **Hemorrhage Control** | When treating a target with a medically treatable bleeding/trauma effect, expend one Treatment Die and make an appropriate Medicine check to end one qualifying ongoing physical injury effect while also performing Combat Treatment. The effect must be defined by future injury/condition rules. |
| 15 | **Restorative Care** | During a Long Rest in which you provide one hour of suitable medical care, one consenting eligible ally who benefits from your care can recover one additional expended Hit Die, within its normal Hit Die maximum. You need supplies and a safe enough environment. |
| 19 | **Dual Triage** | Once per Short Rest after using Combat Treatment on a creature within reach, stabilize one different eligible creature within reach as a Bonus Action using a medical kit. This second intervention restores no HP unless a separate feature or spent die permits it. |
| 23 | **Shock Absorption** | Once per Short Rest when an ally within 5 feet takes weapon or environmental damage you can perceive, use your Reaction and expend one Treatment Die with a suitable protective medical device to reduce that damage by the die roll + WIS modifier. It cannot negate a source beyond the device's reach. |
| 27 | **Surgery Under Fire** | Once per Short Rest, use an action and two Treatment Dice to simultaneously administer Combat Treatment and attempt to alleviate one separate eligible medically treatable condition on the same target. Appropriate equipment and check are still required. |
| 31 | **Triage Reach** | With a compatible extension applicator, you can administer one normal touch-range medical intervention to a target within 10 feet as an action once per Short Rest. The delivery mechanism must physically reach the patient and consumables are still spent. |
| 35 | **Golden Hour** | Once per Long Rest, when you begin treating a medically recoverable creature at 0 HP, maximize one Treatment Die used in that intervention. This does not save a creature that has already died or override rules for permanently fatal injuries. |
| 39 | **Trauma Tech Mastery** | Once per Short Rest when Crisis Response triggers, use its Reaction to administer Combat Treatment instead of mere stabilization, spending up to two eligible Treatment Dice and maximizing one die. You must reach the patient and have sufficient supplies; their status remains subject to ordinary HP/death rules. |

## Nanomedic

**Identity:** Controlled nanotechnology, delayed healing, physiological protection and treatment planning; requires functional compatible medical delivery hardware.

| Lifeline level | Feature | Initial playtest effect |
| ---: | --- | --- |
| 3 | **Nanite Applicator** | Gain proficiency with compatible nanomedical applicators. Once per Short Rest when you successfully use Combat Treatment and have a functioning nanite dose, the target also regains 1d4 HP at the start of its next turn. The dose is consumed; no nanobots appear without actual medical supplies. |
| 7 | **Sustained Dose** | Your Nanite Applicator's delayed 1d4 healing can occur at the start of the recipient's next two turns instead of one, while the dose remains active. Multiple doses from this feature do not stack on the same patient. |
| 11 | **Nanoscan Diagnostics** | Once per Short Rest, using appropriate diagnostics, gain advantage on an eligible Medicine/technical check to identify one medical toxin, compatible implant complication, or treatable systemic failure. This does not install or repair Cyberware. |
| 15 | **Programmed Safeguard** | During a Short Rest, prepare one consenting ally with a compatible consumable emergency nanite dose. Once before the next Long Rest, if the ally drops to 0 HP and remains medically recoverable, the dose stabilizes it without healing HP; the dose is then expended. Requires supported applicator/storage technology. |
| 19 | **Shared Regeneration** | Once per Short Rest, when Nanite Applicator activates, you may use a second compatible consumable dose and expend a second Treatment Die on one other eligible patient within 5 feet. That patient's Treatment Die is rolled for immediate healing; delayed regeneration follows the standard applicator limit. |
| 23 | **Targeted Purge** | Once per Short Rest, when a compatible medical treatment could remove a known biological or nanomedical toxin, expend one Treatment Die to perform an appropriate Medicine check with advantage. On success remove the qualifying effect. This does not automatically erase all Poisoned conditions or hostile software. |
| 27 | **Responsive Swarm** | An eligible patient benefiting from your delayed Nanite Applicator healing also gains temporary HP equal to your WIS modifier (minimum 1) at the first delayed healing trigger. It doesn't stack with other temporary HP. |
| 31 | **Staged Recovery** | Once per Short Rest, on an eligible Combat Treatment you may allocate a second Treatment Die to delayed healing, dividing its rolled result across the target's next two turns (round any remainder into the first turn). This respects your base-class maximum dice per treatment; the dose must be compatible and active. |
| 35 | **Emergency Nanite Flush** | Once per Long Rest, when you administer Combat Treatment to an eligible patient at 0 HP using a compatible nanite kit, also attempt to alleviate one medically treatable ongoing condition without expending an extra Treatment Die. Required checks still apply; no resurrection. |
| 39 | **Nanomedic Mastery** | Once per Long Rest, a consumed compatible nanite dose you apply can provide its ordinary delayed 1d4 healing for three turns instead of two and grant the target advantage on its next eligible save against one medically treatable toxin. It cannot revive a dead creature, reconstruct Cyberware or function without real supplies. |

## Combat Responder

**Identity:** Mobile battlefield medicine, casualty extraction, protective evacuation and delivering treatment while moving under fire.

| Lifeline level | Feature | Initial playtest effect |
| ---: | --- | --- |
| 3 | **Extraction Drill** | Your walking speed increases by 5 feet while moving toward a visible ally who is incapacitated or at 0 HP. Once per Short Rest you may drag or carry such an ally without the first 10 feet of the normal movement penalty, assuming your carrying capacity and a legal path allow it. |
| 7 | **Covered Treatment** | When administering Combat Treatment or Field Stabilization to a patient adjacent to physical cover, gain +2 AC against the first opportunity attack targeting you before the start of your next turn. You must plausibly use that cover; it is not a protective aura. |
| 11 | **Mobile Triage** | Once per Short Rest on a turn when you use Dash, you may also use Field Stabilization on an eligible adjacent patient as a Bonus Action, provided you physically reach them. This does not heal HP. |
| 15 | **Pressure Dressing** | Once per Short Rest, after moving at least 10 feet and successfully administering Combat Treatment to an adjacent ally, that ally gains +2 AC against the next melee weapon attack before the start of your next turn while it can use the physical bandaging/positioning benefit. |
| 19 | **Emergency Injector** | Once per Short Rest, use a functioning short-range medical injector that you physically carry to deliver one eligible single-die Combat Treatment to a target within 15 feet. You still spend the Treatment Die, ordinary supplies and the action/Bonus Action that the treatment requires. The projectile/connection needs an unobstructed path. |
| 23 | **Drag to Cover** | Once per Short Rest, when an adjacent willing or incapacitated ally is attacked, use your Reaction to move that ally 5 feet toward reachable cover if able to move/carry them. The movement alone does not negate an already resolved hit; legal path and carrying rules apply. |
| 27 | **Extraction Signal** | Once per Short Rest after successfully stabilizing or treating an ally at 0 HP, direct one other communicating willing ally within 30 feet to move up to 10 feet toward available cover. It uses that ally's Reaction and follows normal opportunity attack rules; it isn't magical forced movement. |
| 31 | **Rolling Care** | Once per Short Rest, after taking the Dash action you may administer one eligible Combat Treatment as a Bonus Action without consuming a Rapid Treatment use, paying the normal Treatment Die and supply costs. You must reach the patient and may not also perform Mobile Triage on the same turn. |
| 35 | **Evacuation Screen** | Once per Long Rest, deploy one actual carried medical evacuation screen, smoke emitter or comparable piece of protective equipment to help an adjacent patient move away. For one round, that patient gains +2 AC against attacks for which the equipment physically provides cover. Item limits and inventory apply. |
| 39 | **First Through Fire** | Once per Long Rest when an eligible communicating ally within 30 feet drops to 0 HP, use your Reaction to move up to your speed along a legal path toward it. If you reach within 5 feet with supplies, immediately perform Field Stabilization; you may spend a Treatment Die to perform eligible Combat Treatment instead. Movement can provoke opportunity attacks and cannot bypass obstructions. |

## Design review boundaries

- Trauma Tech focuses on immediate triage and crisis intervention; Nanomedic on sustained recovery through real compatible equipment; Combat Responder on movement and evacuation.
- Keep the distinctions between **stabilizing at 0 HP**, **restoring HP**, **recovering after a rest**, and **reversing death** explicit.
- Nanomedical treatment must never imply Cyberware magically installs itself; implanted medical Cyberware has its own hardware ownership and compatibility.
- Review mobility/Reaction features with core Lifeline Crisis Response, Triage Link, Mass Casualty Protocol and Last Lifeline to avoid double-consuming an action or granting unlimited interventions.
- These 30 subclass milestones are pre-approved **as editable design concepts**, not a completed medical economy, combat simulation, surgical system, or Foundry test.