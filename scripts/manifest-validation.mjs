import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseVersion } from "./version.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = relativePath => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const manifest = readJson("system.json");
const foundry = readJson("foundryvtt.json");
const packageMetadata = readJson("package.json");

assert.equal(manifest.id, "neon-requiem-dnd", "system.json must identify a Foundry Game System");
assert.equal(manifest.title, "Neon Requiem");
parseVersion(manifest.version);
assert.equal(manifest.compatibility?.minimum, "14.367");
assert.equal(manifest.compatibility?.verified, "14");
assert.equal(manifest.url, "https://github.com/EmberWolf-Games/neon-requiem-dnd/");
assert.equal(manifest.manifest, "https://raw.githubusercontent.com/EmberWolf-Games/neon-requiem-dnd/stable/system.json");
assert.equal("download" in manifest, false, "The source manifest must not advertise an unreleased download");
assert.equal(foundry.project?.type, "system", "foundryvtt.json must declare a Game System");
assert.ok(manifest.authors?.some(author => author.name === "EmberWolf Games"));
assert.ok(manifest.esmodules?.includes("dnd5e.mjs"));
assert.ok(manifest.styles?.includes("dnd5e.css"));
assert.ok(manifest.packs?.length > 0, "Upstream source compendia should remain configured");
assert.ok(manifest.packs.every(pack => !pack.system || pack.system === manifest.id));
assert.equal(Boolean(manifest.relationships?.systems?.some(system => system.id === "dnd5e")), false,
  "Neon Requiem must not require the official dnd5e system");
assert.match(packageMetadata.engines?.node ?? "", />=24\.15\.0/);
assert.equal("version" in packageMetadata, false,
  "The npm tooling package does not carry the four-part Foundry system version");

console.info(`Validated ${manifest.id} ${manifest.version} as a standalone Foundry system.`);
