# Cipher — Base Class Progression (Levels 1–40)

**Status:** Approved design; numerical balance pending  
**Recorded:** 21 Nov 2026  
**Subclasses:** See [Cipher subclass features](Neon_Requiem_GDD_Cipher_Subclasses_1-40.md)  
**Build status:** Design only; no game-system implementation yet.

## 1. Class foundation and hard design boundary

**Cipher** is the premier specialist in Hacks, electronic warfare, network intelligence, and tactical communications/coordination. Its original 5e mechanical inspirations include Wizard's technical versatility, Warlock's specialization, and Bard's support role—but **not spell slots or magic**.

The class chassis:

| Attribute | Accepted draft proposal |
| --- | --- |
| Hit Die | d8 |
| Primary ability | INT |
| Secondary ability | WIS |
| Saving throw proficiencies | INT, WIS |
| Armor training | Light |
| Weapon training | Simple weapons, compact firearms |
| Signature role | Hacks, technical expertise, electronic information warfare |
| Secondary role | Tactical support and counterhacking |

**Critical universal-rule boundary:** Hacks are **not exclusive to Ciphers**. Every character can learn/install/run compatible Hacks when they have the necessary Cyberware. Cipher class features improve a specialist's ability to operate compatible technology; no class level grants free program storage, nonexistent hardware, unlimited execution, or bypasses hardware/software compatibility requirements.

The **global Hack framework remains unresolved** (resource/RAM or other cost, installation limit, cooldowns, sustained program support, targeting, action economy, range/duration/defenses, skill/DC checks). Do not silently introduce spell slots renamed as RAM or create a cross-class resource policy from this document. Features below that depend on these mechanics are design concepts pending integration.

Subclass identities:
- **Intruder:** Offensive intrusions, cybernetic disruptions and exploit techniques.
- **Puppeteer:** Connected devices, cameras, drones and security-network manipulation.
- **Handler:** Tactical communications, information control, ally coordination, coordinated targeting and psychological warfare.

## 2. Advancement — levels 1–20

| Level | Cipher base-class feature | Subclass | ASI / Feat |
| ---: | --- | --- | --- |
| 1 | Interface Training; Signature Program | — | — |
| 2 | Tactical Uplink | — | — |
| 3 | — | Subclass selection + feature | — |
| 4 | — | — | ASI / Feat |
| 5 | Rapid Execution | — | — |
| 6 | Cyber-Defense | — | — |
| 7 | — | Subclass improvement I | — |
| 8 | — | — | ASI / Feat |
| 9 | Threat Telemetry | — | — |
| 10 | Overclock Protocol | — | — |
| 11 | — | Subclass feature II | — |
| 12 | — | — | ASI / Feat |
| 13 | Distributed Intelligence | — | — |
| 14 | Trace Scrambler | — | — |
| 15 | — | Subclass improvement II | — |
| 16 | — | — | ASI / Feat |
| 17 | Rapid Execution II | — | — |
| 18 | Cyber-Defense II | — | — |
| 19 | — | Subclass feature III | — |
| 20 | — | — | ASI / Feat |

## 3. Advancement — levels 21–40

| Level | Cipher base-class feature | Subclass | ASI / Feat |
| ---: | --- | --- | --- |
| 21 | Parallel Processing | — | — |
| 22 | Threat Telemetry II | — | — |
| 23 | — | Subclass improvement III | — |
| 24 | — | — | ASI / Feat |
| 25 | Emergency Disconnect | — | — |
| 26 | Overclock Protocol II | — | — |
| 27 | — | Subclass feature IV | — |
| 28 | — | — | ASI / Feat |
| 29 | Distributed Intelligence II | — | — |
| 30 | Override Window | — | — |
| 31 | — | Subclass improvement IV | — |
| 32 | — | — | ASI / Feat |
| 33 | Zero-Day Exploit | — | — |
| 34 | Tactical Uplink II | — | — |
| 35 | — | Subclass feature V | — |
| 36 | — | — | ASI / Feat |
| 37 | Recursive Intrusion | — | — |
| 38 | Autonomous Firewall | — | — |
| 39 | — | Subclass Mastery | — |
| 40 | Root Access | — | ASI / Feat |

## 4. Conceptual base-class feature definitions

### Levels 1–10

- **Interface Training (1):** Proficiency in suitable technical tools and skills used to interact with electronics. Expertise in one appropriate technical proficiency. Exact skill/tool naming awaits the Neon Requiem skill taxonomy.
- **Signature Program (1):** Designate one compatible Hack that the character has learned and installed as a signature program; gain a modest execution benefit with it. Does **not** grant extra installed program storage or exempt Cyberware prerequisites.
- **Tactical Uplink (2):** As a Bonus Action, grant a visible or communicating ally within **30 ft** a **d4 support die** usable on one attack roll or ability check before the start of your next turn. Uses: **INT modifier per Long Rest (minimum one)**. Final balance is pending.
- **Rapid Execution (5):** **Once per Short Rest**, execute an eligible Hack that normally requires an action as a Bonus Action, preserving all ordinary compatibility, resource and execution costs.
- **Cyber-Defense (6):** **Once per Short Rest**, use a Reaction to add a **d6** to a qualifying defense against a hostile Hack targeting you.
- **Threat Telemetry (9):** After successful interaction with enemy Cyberware or a connected security system, relay verified diagnostics such as a camera-alarm connection or the presence of identifiable cybernetic components. Does not reveal hidden systems or protected data automatically.
- **Overclock Protocol (10):** **Once per Long Rest**, temporarily improve an installed Hack's supported execution parameters (examples: range or duration). Final effect awaits system-wide Hack properties.

### Levels 11–20

- **Distributed Intelligence (13):** Improve Tactical Uplink when communicating with allies; relay a verified target position or detected hazard without requiring an extra action.
- **Trace Scrambler (14):** **Once per Short Rest**, make a new attempt to conceal your electronic signature after detection. Does not grant automatic surveillance immunity or invisibility.
- **Rapid Execution II (17):** Rapid Execution gains **two uses per Short Rest**, no more than once per turn.
- **Cyber-Defense II (18):** Extend defensive Reaction to a nearby communicating ally if equipment can detect the relevant intrusion.

### Levels 21–30

- **Parallel Processing (21):** Sustain one eligible ongoing Hack while executing another, **only if installed Cyberware supports both**. Actual ongoing-program maintenance rules require approval.
- **Threat Telemetry II (22):** Share detailed tactical information across multiple allies, rather than only one.
- **Emergency Disconnect (25):** **Once per Long Rest**, Reaction to attempt to interrupt an incoming hostile Hack targeting you or an eligible nearby connected ally, with an appropriate opposed check or defense roll.
- **Overclock Protocol II (26):** Gain a second Overclock use per Long Rest.
- **Distributed Intelligence II (29):** One Tactical Uplink use can assist **two eligible allies**.
- **Override Window (30):** **Once per Short Rest**, after compromising an electronic target, exploit the opening to make its next qualifying defense against one of your installed Hacks more difficult before the end of your next turn.

### Levels 31–40

- **Zero-Day Exploit (33):** **Once per Long Rest**, exploit an identified electronic vulnerability to temporarily weaken one target's defense against further compatible intrusion. Does not make an incompatible target hackable.
- **Tactical Uplink II (34):** Upgrade Tactical Uplink support die to **d6**.
- **Recursive Intrusion (37):** **Once per Short Rest**, after compromising a connected device, attempt a follow-up intrusion against a second eligible device on the same accessible network. The second target retains any required checks, Hack compatibility and costs.
- **Autonomous Firewall (38):** **Once per Long Rest**, activate emergency countermeasures to attempt to negate a successful hostile intrusion against you or an eligible nearby ally.
- **Root Access (40):** **Once per Long Rest**, enter a heightened network-operation state for **up to one minute**. While active:
  - Once per turn, an eligible action-cost Hack may be executed as a Bonus Action, while preserving hardware compatibility and all Hack costs.
  - Tactical Uplink can benefit two allies without extra uses (reinforces level-29 improvement).
  - The first successful intrusion on each turn yields enhanced diagnostic information about the compromised system/target.
  - Upon activation, recover one previously expended Overclock Protocol use.
  - Does **not** grant unlimited free Hacks, automatic security bypasses, unrestricted network control, or access to incompatible technology.

## 5. Ten subclass milestone positions

The progression has **one subclass selection and nine later feature or improvement milestones** at levels **3, 7, 11, 15, 19, 23, 27, 31, 35, 39**.

| Level | Intruder direction | Puppeteer direction | Handler direction |
| ---: | --- | --- | --- |
| 3 | Offensive intrusion | Device manipulation | Tactical coordination |
| 7 | Intrusion improvement | Control improvement | Support improvement |
| 11 | Advanced disruption | Expanded device control | Advanced squad commands |
| 15 | Offensive improvement | Manipulation improvement | Communication improvement |
| 19 | Major cyberwarfare feature | Advanced network control | Major coordination feature |
| 23 | Intrusion improvement | Control improvement | Support improvement |
| 27 | Elite offensive technique | Elite network technique | Elite command technique |
| 31 | Advanced refinement | Advanced refinement | Advanced refinement |
| 35 | Legendary offensive feature | Legendary network feature | Legendary support feature |
| 39 | Intruder Mastery | Puppeteer Mastery | Handler Mastery |

Full Intruder, Puppeteer and Handler feature tables are available in the linked subclass document. They are starting points for playtesting.

## 6. ASI/feat cadence and unresolved balance

**Ten ASI/feat selections:** levels **4, 8, 12, 16, 20, 24, 28, 32, 36, 40**.

The system-wide level 21–40 proficiency bonus progression, ability-score caps, feat math, multiclassing, and encounter scaling remain to be decided consistently across all six classes. As with the rest of the roster, 'ASI' uses the standard 5e Ability Score Improvement shorthand; the owner's earlier 'AGI/feat' wording can be revisited if it was meant to indicate a separate mechanism.

**Special compatibility cautions:**

1. **Rapid Execution, Parallel Processing, Overclock Protocol and Root Access** rely on the eventual universal Hack execution and maintenance rules. Their concepts are approved; final hard numbers and legal interactions require additional review.
2. Cyberware is hardware, Augmentations are firmware and Hacks are software. Cipher class features never silently replace an installed Cyberware prerequisite.
3. The **Tactical Uplink support die** is a class feature, not a new cross-class spell-slot or RAM resource.
4. Exact resource costs, checks, save DCs, action economy, targeting, range, cooldowns and feature stacking are not fully implemented rules.
5. No game code, test validation, balancing certification, or release is claimed by this GDD record.

## Balance review

Cipher's strongest features depend on the shared Hack execution rules. Once those are settled, test Rapid Execution and Root Access with the Intruder, Puppeteer and Handler paths to make sure multiple Bonus Action options do not produce extra turns.
