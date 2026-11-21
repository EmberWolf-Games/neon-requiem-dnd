# Local Foundry v14 Smoke Test

## Status

This guide prepares the first live runtime check; it does not report that the check has been performed. No Foundry runtime test has been run as part of this documentation change.

The repository can build and package a local system artifact. The owner’s acceptance test must install Neon Requiem from a public GitHub manifest and its downloadable ZIP so the test also exercises Foundry’s remote installation path.

## Current remote-install prerequisite

As of 2026-11-21, `main` points the stable manifest URL to `https://raw.githubusercontent.com/EmberWolf-Games/neon-requiem-dnd/stable/system.json`, but the repository has no `stable` branch or published GitHub release. The source manifest on `main` also has no `download` field. Foundry therefore has no current public package to install or update from. Do not substitute a local folder copy for this test.

Before running the live test, the owner must authorize a public test release/channel whose stable manifest is reachable and whose `download` URL resolves to the matching release ZIP. No release is published by this guide.

## 1. Prerequisites

- A licensed Foundry VTT v14 installation at version 14.367 or newer, matching the system manifest minimum.
- Git for obtaining the source repository.
- Node.js 24.15.0 or newer and npm 11.7.0 or a compatible release for building the source.
- Internet access to GitHub for source, dependencies, the public manifest, and the release ZIP.
- A disposable test world. Do not use a campaign world with valuable data.

The system is intended to run as a standalone Foundry Game System. The official `dnd5e` system does not need to be installed for this check, and no add-on modules should be enabled in the test world unless a failure specifically needs to be reproduced with one.

## 2. Get the repository

Use PowerShell from a development folder:

```powershell
git clone https://github.com/EmberWolf-Games/neon-requiem-dnd.git
Set-Location neon-requiem-dnd
git switch main
git rev-parse HEAD
```

Record the commit SHA printed by the final command. For a later test of an approved release, record the release tag as well; the tested release and source commit should match.

## 3. Install dependencies and build

From the repository root, check the installed tool versions and use the committed lockfile:

```powershell
node --version
npm --version
npm ci --ignore-scripts
npm run check:version
npm run check:manifest
npm run check:assets
npm test
npm run lint
npm run build
npm run package
npm run check:package
```

The current build scripts use Rollup to compile `dnd5e.mjs`, Less to compile `less/dnd5e.less`, and the Foundry CLI to compile pack sources under `packs/_source/`. `npm run package` stages an installable directory at `dist/package/` and writes `dist/neon-requiem-dnd.zip`; `npm run check:package` verifies package structure. The ZIP contents start at the system root, without an extra enclosing folder.

This local build is useful for development and package-layout verification only. It does not satisfy the owner’s remote-install acceptance test and must not be copied into the owner’s Foundry data folder as a substitute.

## 4. Find the Foundry User Data directory

In Foundry’s Setup screen, open **Configuration** and note the configured User Data path. Foundry permits this path to be customized. On Windows the documented default is `%localappdata%/FoundryVTT`.

Installed systems live below:

```text
<User Data Path>/Data/systems/neon-requiem-dnd/
```

When the public manifest is ready, use Foundry’s installer so Foundry itself downloads and extracts the ZIP into that location. Do not manually create or replace files in this directory for the owner’s acceptance test.

## 5. Install from the GitHub manifest

Once an owner-approved test release/channel is available:

1. Launch Foundry VTT and stay on the Setup screen.
2. Open **Game Systems**, then choose **Install System**.
3. Paste the stable manifest URL: `https://raw.githubusercontent.com/EmberWolf-Games/neon-requiem-dnd/stable/system.json`.
4. Install the system through Foundry.
5. Confirm the system appears as **Neon Requiem**, has ID `neon-requiem-dnd`, and displays the version intended for the test.
6. Check that installation completed without a download, extraction, or manifest error.

If the manifest cannot be fetched, the system is absent after installation, or the expected version is not shown, stop and record the exact URL and error. Do not use a local build as a workaround for this acceptance test.

Foundry’s stable manifest field is also the update-check URL. After an authorized newer build is available through that manifest, use **Update** from Setup and confirm that Foundry reports the intended new version. Do not publish a release or change the stable channel as part of this test preparation.

## 6. Create a disposable world

1. From Setup, open **Game Worlds** and choose **Create World**.
2. Give it an unmistakable test name, such as `Neon Requiem Smoke Test`.
3. Select **Neon Requiem** as the game system and create the world.
4. Start the world. Keep it isolated from production worlds and avoid installing modules for the baseline pass.

## 7. Check inherited baseline behavior

These steps check functionality inherited from the upstream D&D 5e v6.1.1 foundation. Their presence in source is not proof that they work in Foundry v14; record the actual result for each step.

### Character, NPC, and item sheets

- In the **Actors** directory, create a **Character** actor, give it a simple name, open its sheet, save, close, and reopen it. Check that the sheet renders and the saved name and fields persist.
- Create a second actor with type **NPC**. Open, save, close, and reopen its sheet.
- In the **Items** directory, create a simple **Weapon** or **Consumable** item. Open its sheet, edit a basic field, save, close, and reopen it.
- If the system’s compendium packs load, open one entry from **Starter Heroes**, **Monsters (SRD)**, or **Items (SRD)** and record whether the content displays. These names are declared in `system.json`.

### Rolls and chat

- From the character sheet, use an available ability or skill roll control and confirm a result appears in Chat.
- In Chat, run a simple Foundry formula such as `/r 1d20 + 5`; confirm the roll resolves and the result is visible.
- If a sheet control throws an error or does not post a message, capture the control used, the actor type, and the console output.

### Scene and token

- Create a blank scene using the system’s default grid settings (the manifest specifies 5 ft.).
- Place the test character on the scene as a token and move it one or two grid spaces.
- Confirm the scene, token, and actor remain present after returning to Setup and reopening the test world.

## 8. Features that are not implemented

The Character Identity Creator and its four body bases, selectable hairstyles, skin/hair masks, and live preview are approved design requirements only. Animated top-down tokens, animation states, WebM/WebP export, a generation worker, appearance persistence locks, and GM overrides are also design requirements only. None should be expected in this smoke test. Do not treat their absence as a regression in the inherited baseline.

## 9. Diagnose and collect evidence

- Open the browser developer tools (usually **F12** or **Ctrl+Shift+I**) and keep the **Console** visible. Save the first relevant JavaScript exception and its stack trace.
- In the developer tools **Network** panel, look for failed requests and 404 responses, especially for `system.json`, scripts, styles, templates, fonts, icons, and compendium files. Capture the failing URL and status.
- Check Foundry’s server logs under `<User Data Path>/Logs/`. Include the log covering the startup and test time.
- Capture screenshots of the Setup system listing/version, world launch, character and NPC sheets, item sheet, Chat roll, scene, and any error dialog.
- Record Foundry’s full version/build, Windows version, system version, Git commit or release tag, installation manifest URL, enabled modules, exact reproduction steps, and expected versus observed result.
- Redact license keys, passwords, private world or player data, and unrelated personal information before sharing logs or screenshots.

## 10. Test record

```text
Foundry version/build:
Operating system:
System ID and version shown in Setup:
Installation manifest URL:
Release tag / source commit:
Enabled modules:
Results: install / world / character / NPC / item / chat roll / scene / reload
Console errors:
Network failures:
Relevant server log filename and timestamp:
Screenshots:
```

Mark the live smoke test complete only after these steps have actually been performed in Foundry v14 and the results have been reviewed.

## Official Foundry references

- [Application Configuration and User Data paths](https://foundryvtt.com/article/configuration/)
- [System Development and manifest installation](https://foundryvtt.com/article/system-development/)
- [Game Worlds](https://foundryvtt.com/article/game-worlds/)
- [Troubleshooting](https://foundryvtt.com/article/troubleshooting/)
