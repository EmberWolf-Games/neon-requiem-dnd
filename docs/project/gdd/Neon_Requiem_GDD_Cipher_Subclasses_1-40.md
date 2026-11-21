# NEON REQUIEM — Cipher Subclasses (Levels 1–40)

**Decision status:** OWNER-PRE-APPROVED SUBCLASS DESIGN DRAFT — revised balance and future systemic Hack rules pending  
**Date:** 2026-11-21  
**Base class:** Cipher ([owner-approved 1–40 progression](Neon_Requiem_GDD_Cipher_Progression_1-40.md))  
**Implementation:** NOT IMPLEMENTED. No gameplay-code or release authorization.

## Mandatory shared constraints

- Cipher subclass milestones are class levels **3, 7, 11, 15, 19, 23, 27, 31, 35, 39**. The base class already reserves ASI/feat selections at **4, 8, 12, 16, 20, 24, 28, 32, 36, 40**.
- **Every Hack still requires a learned, installed, compatible software program and its required Cyberware.** Cipher subclasses do not create hardware, firmware/augmentation slots, installed programs, or free Hack resources.
- Final global Hack resources (including whether RAM exists), range, targeting, save/check DC, action economy, connection rules, trace/detection, command/control privileges, durations and upkeep remain **open**. A feature that modifies a Hack works **only when the underlying Hack allows that action**, and normal costs remain unless explicitly stated.
- **Cipher subclass DC (provisional):** 8 + proficiency bonus + INT modifier; common proficiency math for levels 21–40 remains unsettled.
- **Intruder** specializes in hostile software exploitation; **Puppeteer** in control of compatible devices; **Handler** in communications and tactical coordination. Do not redefine these as autonomous computer omnipotence, biological mind control, or magic.
- Consent and security are game-mechanical categories. A drone, implant or device cannot be commandeered without legitimate control credentials or a successfully resolved eligible Hack.

## Intruder

**Identity:** Offensive network exploitation, hostile cyberware disruption, and exploiting a real intrusion opening.

| Cipher level | Feature | Playtest mechanic |
| ---: | --- | --- |
| 3 | **Exploit Hunter** | Once per Short Rest when a compatible installed offensive Hack succeeds against a valid target, add your INT modifier (minimum 1) to one damage roll it actually makes, or gain +2 on the next check to diagnose that target's digital vulnerability if it deals no damage. Does not turn harmless Hacks into attack programs. |
| 7 | **Trace Splitter** | Once per Short Rest after a successful Hack, gain advantage on an immediately following appropriate check to conceal its electronic origin. It does not automatically erase access logs or override a detected alarm. |
| 11 | **Cascade Attempt** | Once per Short Rest after successfully compromising a compatible networked device, attempt a second installed Hack against another eligible device on the same reachable network as a Bonus Action. It pays all usual costs and requires a separate security check or defense. |
| 15 | **System Burn** | Once per turn after a successful offensive Hack against valid Cyberware, impose a -2 penalty to that target's next eligible technical ability check before the start of your next turn. No effect on purely organic targets or unrelated physical attacks. |
| 19 | **Blackout Route** | Once per Long Rest after a successful installed Hack against a camera, alarm or sensor node, suppress that node's ordinary digital reporting for up to one minute if the Hack's effect permits access/control; ongoing security defenses and maintenance costs still apply. |
| 23 | **Counter-Exploit** | Once per Short Rest when an enemy Hack targeting you fails, use your Reaction to execute one compatible installed counter-Hack against its originating eligible device if you can actually target and reach it. Pay the normal cost and roll any defenses. |
| 27 | **Backdoor Window** | Once per Long Rest after successfully breaching a specific eligible electronic device, prepare a temporary backdoor lasting up to one minute while connection persists. Your next compatible Hack check against that device gains advantage; it does not exempt normal costs, targeting or authentication beyond the earned access. |
| 31 | **Precision Payload** | Once per turn when one of your installed offensive Hacks genuinely deals damage to a valid target, add your INT modifier to one of its damage rolls. This replaces rather than stacks with Exploit Hunter's same-effect damage bonus. |
| 35 | **Chain Exploit** | Once per Long Rest after a successful offensive Hack against one valid device, execute that same installed Hack against a second connected, compatible device within the original Hack's legal reach as a Bonus Action. Pay its costs and resolve all defenses anew; no uncontrolled spreading. |
| 39 | **Intruder Mastery** | Once per Short Rest after failing an intrusion check against an eligible electronic target, reroll the check and use the new result. If it succeeds, you may also attempt to conceal the trace using the ordinary rules, but do not gain immunity to detection. |

## Puppeteer

**Identity:** Cameras, drones, connected machinery, authorized devices, and software-limited remote manipulation.

| Cipher level | Feature | Playtest mechanic |
| ---: | --- | --- |
| 3 | **Peripheral Access** | Gain advantage on one check per Short Rest to establish remote control of an eligible accessible camera, sensor or noncombat utility device using an installed Hack. The Hack must already support interaction/control, and any target security remains in force. |
| 7 | **Borrowed Eyes** | After legally accessing or successfully hacking a compatible camera or sensor, use an action to perceive through it for up to one minute while a connection persists. You cannot simultaneously use your own sight to inspect another scene in detail. |
| 11 | **Command Multiplexer** | Once per Short Rest, use a Bonus Action to issue one nondamaging command each to two devices you own or currently control, provided the devices accept remote commands. Attacking drones still obey their individual action economies. |
| 15 | **Distraction Feed** | Once per Short Rest after a successful eligible control Hack, command a compromised nearby display, speaker or light to create a distraction. One ally who can exploit the distraction gains advantage on its next Stealth check before your next turn; devices must physically support the output. |
| 19 | **Contested Control** | Once per Short Rest after a successful valid Hack against a hostile drone, you may attempt one additional opposed technical check to suppress that drone's next attack. The drone's normal defenses and any Hack effects still apply; not a permanent takeover. |
| 23 | **Parallel Surveillance** | While your installed hardware and access permissions support it, monitor sensory information from two eligible connected devices rather than one. You may suffer disadvantage on unrelated Perception checks while divided this way. |
| 27 | **Signal Redirect** | Once per Long Rest, when a compromised hostile device is about to attack an ally, use your Reaction to make an eligible control check; on success the device instead attacks an empty legal space or holds fire. Does not redirect fire at an enemy or create a second device action. |
| 31 | **Device Relay** | Once per turn while connected to compatible, already-controlled noncombat devices, issue a single nondamaging signal to up to three devices as a Bonus Action, without expanding their ranges or power sources. |
| 35 | **Puppeteer's Web** | Once per Long Rest, for one minute coordinate up to three compatible devices you already own/control as an information network. Once per round one device may relay a verified alert to all other devices; no extra attacks, automated intrusions or free Hack execution. |
| 39 | **Master of Puppets** | Once per Short Rest after winning an opposed intrusion/control check against an eligible hostile non-sentient drone, prevent it from receiving new remote commands until the end of its next turn. It may still follow pre-existing autonomous programming; this is not unconditional total control. |

## Handler

**Identity:** Information superiority, tactical communication, psychological pressure and coordinated squad action.

| Cipher level | Feature | Playtest mechanic |
| ---: | --- | --- |
| 3 | **Command Relay** | When a consenting communicating ally uses your Tactical Uplink die on an attack roll, it may also move 5 feet after the roll, provided a legal path exists. This movement provokes opportunity attacks normally. |
| 7 | **Network Contacts** | Once per Short Rest, gain advantage on one social check involving a contact you have legitimately established or a believable professional cover identity. This is narrative preparation and does not generate anonymous free favors. |
| 11 | **Interlocking Fire** | Once per round when an ally turns a missed attack into a hit by using your Tactical Uplink die, another communicating ally attacking that same target before your next turn gains +1 to its attack roll. |
| 15 | **Long-Range Orders** | Tactical Uplink's range becomes 60 feet for allies with compatible active communications; it remains 30 feet for nonconnected allies you can see and communicate with. Jamming and line-of-contact rules still apply. |
| 19 | **Crisis Command** | Once per Short Rest when a communicating ally within 30 feet drops to 0 HP, use your Reaction to let one other willing standing ally within 30 feet move up to half its speed toward the casualty. This movement follows normal opportunity attack rules and provides no healing. |
| 23 | **Operational Briefing** | Once per Long Rest after one uninterrupted minute briefing the squad on a plausible immediate objective, grant one participating ally advantage on its next Initiative or Insight roll before the end of the upcoming encounter. |
| 27 | **Pincer Call** | Once per Short Rest when a Tactical Uplink recipient hits a target, designate a second ally who can hear/receive you; that ally adds your proficiency bonus to its next successful weapon damage roll against the same target before your next turn. |
| 31 | **Fallback Signals** | Within 15 feet and with clear line of sight, you can use Tactical Uplink through gestures if communications are jammed; the recipient must see and understand you. This does not transmit digital data or overcome sensory obstruction. |
| 35 | **Operation Control** | Once per Long Rest, when you grant Tactical Uplink to two allies through Distributed Intelligence II, each may also move 5 feet at the time it uses that Uplink die. Legal paths and opportunity attacks apply. |
| 39 | **Handler's Call** | Once per Long Rest when you roll Initiative, spend one available Tactical Uplink use to give one temporary Uplink die to up to three willing communicating allies who can receive your orders. Each die expires at the end of its recipient's first turn and cannot be stacked with another Uplink die. |

## Future engineering and balance

- Review every bonus-action Hack subclass feature against **Rapid Execution**, **Parallel Processing**, **Recursive Intrusion**, and **Root Access**, ensuring no more than the approved quantity of actions/Hacks can resolve in one turn.
- **Puppeteer is not Rigger**: hacking another party's device depends on access, valid programs, cybersecurity and power; physical drone maintenance/construct ownership stays Engineer's domain.
- Handler uses the existing **Tactical Uplink** resource rather than a second Bardic Inspiration-like pool; social abilities depend on real contacts or plausible identities.
- These **30 feature milestones are pre-approved for concept development**, not finalized universal Cyberware/Hack rules or playtested security checks.