# Writing Neon Requiem Rules

The GDD should sound like a game designer's working rules manuscript: specific, readable, and easy to test. Not a pitch deck, a conversation transcript, or a collection of warnings.

## Voice

Use plain language and active verbs. A feature should tell the player **what they can do**. Let class identity come through in the description, then give the mechanical effect without hype.

**Instead of:** "The ultimate adaptive battlefield superiority protocol provides exceptional tactical versatility."  
**Write:** "When you use Combat Overdrive, you can change your active stance without spending a Bonus Action."

## Feature format

Each feature needs, where relevant:

- **Level and name**.
- **Trigger**: what event makes it usable.
- **Action cost**: Action, Bonus Action, Reaction, or no action.
- **Target and range**: who or what it affects, including required access.
- **Effect and duration**: what changes and for how long.
- **Resource and recovery**: dice, charges, materials, times per rest.
- **Limits**: stacking, once-per-turn restrictions and compatibility requirements.

Keep the flavor sentence separate from the rules if combining them would make a long or confusing paragraph.

## Consistency

Use **Cyberware**, **Augmentations**, and **Hacks** with their agreed meanings: hardware, firmware and software. Never let class features silently create extra augmentation slots, free equipment or access to uninstalled Hacks.

Say **class level** when a milestone refers to the level in one class; say **character level** for the overall level-40 cap. Preserve the difference between baseline body-owned slots and additional Cyberware-owned slots.

Use 5e terms consistently. Prefer **ASI/feat** for the working shorthand; record any eventual alternative terminology explicitly. When exact mechanics are undecided, mark them once in the relevant rules section rather than adding five variants of "to be determined."

## Editorial discipline

Do not quote the owner's chat replies as rules text. Record approval as document metadata or in the PR history. Remove outdated instructions such as "design the next class" once that work is complete.

Avoid repeated all-caps warnings, generic closing paragraphs, repetitive boilerplate and overuse of boldface. Keep links and tables useful, not decorative.

A rules edit that changes **a cost, duration, level, prerequisite, target, number or effect** is a mechanics revision, not a copyedit. Call it out separately for review.

## Review handoff

Luna should maintain readable GDD text and decision history. Terra should translate approved rules into implementation tasks and flag ambiguities rather than fill them by assumption. Sol and Astra are escalation paths for engineering work, not alternate authorities on unapproved design changes.
