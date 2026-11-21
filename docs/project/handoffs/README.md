# Project Handoffs

Use this folder for reviewable coordination between Luna, Terra, Sol, Astra, and other project contributors.

## Recommended file name

`YYYY-MM-DD-topic-owner-to-recipient.md`

## Handoff template

```markdown
# Handoff — <topic>

- Date:
- From / To:
- Related GDD requirement(s):
- Related GitHub branch / PR / commit:
- Status: Proposed | In progress | Implemented | Validated | Blocked

## Objective
Describe the bounded outcome.

## Decisions and constraints
Link approved requirements; distinguish suggestions from locked decisions.

## Work completed
List changed files and relevant implementation details.

## Validation
Commands, Foundry v14 build, smoke-test environment, findings and failures.

## Pending questions / blockers
Identify owner decisions and missing infrastructure.

## Suggested next action
State the next safe, concrete action.
```

Do not store passwords, tokens, confidential deployment details, or large generated binaries here. Prefer links to reviewable commits/PRs and project docs.
