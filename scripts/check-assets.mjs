import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = relativePath => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const manifest = readJson("system.json");
const foundry = readJson("foundryvtt.json");
const requiredNotices = [
  "LICENSE",
  "LICENSE.txt",
  "icons/LICENSE",
  "fonts/roboto/LICENSE",
  "fonts/roboto-condensed/LICENSE",
  "fonts/roboto-slab/LICENSE",
  "LICENSES/SRD-5.1-CC-BY-4.0.md",
  "LICENSES/SRD-5.2-CC-BY-4.0.md",
  "THIRD-PARTY-NOTICES.md"
];
const excludedPaths = [
  "tokens",
  "ui",
  "icons/spell-tiers",
  "icons/svg/schools",
  "icons/currency",
  "json/fa-token-mapping.json"
];
const sourceRoots = ["dnd5e.mjs", "system.json", "foundryvtt.json", "json", "lang", "less", "module", "packs/_source", "templates"];
const restrictedReference = /systems\/neon-requiem-dnd\/(?:tokens|ui|icons\/(?:spell-tiers|svg\/schools|currency))\//;
const legacyInstallPath = /systems\/dnd5e\//;

for ( const relativePath of requiredNotices ) {
  assert.ok(fs.existsSync(path.join(root, relativePath)), `Required license or attribution file is missing: ${relativePath}`);
}

for ( const relativePath of excludedPaths ) {
  assert.equal(fs.existsSync(path.join(root, relativePath)), false, `Restricted or unaudited asset path must not be redistributed: ${relativePath}`);
}

/**
 *
 * @param relativePath
 */
function walk(relativePath) {
  const target = path.join(root, relativePath);
  if ( !fs.existsSync(target) ) return [];
  if ( fs.statSync(target).isFile() ) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap(entry => {
    const child = path.join(relativePath, entry.name);
    return entry.isDirectory() ? walk(child) : [path.join(root, child)];
  });
}

for ( const relativePath of sourceRoots ) {
  for ( const file of walk(relativePath) ) {
    if ( !/\.(?:css|hbs|json|less|md|mjs|yml)$/i.test(file) ) continue;
    const text = fs.readFileSync(file, "utf8");
    assert.equal(restrictedReference.test(text), false,
      `${path.relative(root, file)} refers to a removed or restricted asset`);
    assert.equal(legacyInstallPath.test(text), false,
      `${path.relative(root, file)} refers to the old systems/dnd5e installation path`);
    assert.equal(/url\(\s*["']?(?:\.\.\/)*ui\//.test(text), false,
      `${path.relative(root, file)} refers to an unaudited ui asset`);
  }
}

assert.equal(manifest.background, undefined, "Unlicensed upstream backgrounds must not be advertised");
assert.equal(manifest.media, undefined, "Unlicensed upstream setup media must not be advertised");
assert.equal(manifest.flags?.compendiumArtMappings, undefined,
  "Mappings that point to restricted third-party token artwork must be omitted");
assert.ok(foundry.includes.includes("icons/"));
assert.ok(foundry.includes.includes("LICENSES/"));

console.info("Asset provenance audit passed for the retained source, fonts, icons, and SRD data.");
