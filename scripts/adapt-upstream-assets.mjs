import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const systemPath = path.join(root, "system.json");
const sourceManifest = JSON.parse(fs.readFileSync(systemPath, "utf8"));

if ( !["dnd5e", "neon-requiem-dnd"].includes(sourceManifest.id) ) {
  throw new Error(`Refusing to adapt assets for unexpected system id: ${sourceManifest.id}`);
}

const textExtensions = new Set([".css", ".hbs", ".json", ".less", ".md", ".mjs", ".yml"]);
const excludedDirectories = new Set([".git", "dist", "node_modules"]);
const replacements = [
  [/systems\/dnd5e\/tokens\/[^\s"'`<>]+/g, "icons/svg/mystery-man.svg"],
  [/systems\/dnd5e\/ui\/[^\s"'`<>]+/g, "systems/neon-requiem-dnd/icons/svg/monster.svg"],
  [/systems\/dnd5e\/icons\/spell-tiers\/[^\s"'`<>]+/g, "systems/neon-requiem-dnd/icons/svg/spell-slot.svg"],
  [/systems\/dnd5e\/icons\/svg\/schools\/[^\s"'`<>]+/g, "systems/neon-requiem-dnd/icons/svg/spell-slot.svg"],
  [/systems\/dnd5e\/icons\/currency\/[^\s"'`<>]+/g, "systems/neon-requiem-dnd/icons/svg/scale-value.svg"],
  [/systems\/dnd5e\//g, "systems/neon-requiem-dnd/"]
];
const removedAssetDirectories = [
  "tokens",
  "ui",
  "icons/spell-tiers",
  "icons/svg/schools",
  "icons/currency"
];
const removedAssetFiles = ["json/fa-token-mapping.json"];

/**
 *
 * @param directory
 */
function walk(directory) {
  const files = [];
  for ( const entry of fs.readdirSync(directory, { withFileTypes: true }) ) {
    if ( entry.isDirectory() && excludedDirectories.has(entry.name) ) continue;
    const target = path.join(directory, entry.name);
    if ( entry.isDirectory() ) files.push(...walk(target));
    else if ( entry.isFile() && textExtensions.has(path.extname(entry.name)) ) files.push(target);
  }
  return files;
}

/**
 *
 * @param relativePath
 */
function removeWithinRepository(relativePath) {
  const target = path.resolve(root, relativePath);
  if ( !target.startsWith(`${root}${path.sep}`) ) throw new Error(`Unsafe asset path: ${relativePath}`);
  if ( fs.existsSync(target) ) fs.rmSync(target, { recursive: true, force: true });
}

let changedFiles = 0;
let replacedReferences = 0;
for ( const file of walk(root) ) {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;
  for ( const [pattern, replacement] of replacements ) {
    updated = updated.replace(pattern, match => {
      replacedReferences += 1;
      return replacement;
    });
  }

  updated = updated.replace(/url\(\s*(["']?)(?:\.\.\/)*ui\/[^"')]+\1\s*\)/g, () => {
    replacedReferences += 1;
    return "none";
  });

  if ( updated !== original ) {
    fs.writeFileSync(file, updated, "utf8");
    changedFiles += 1;
  }
}

for ( const relativePath of removedAssetDirectories ) removeWithinRepository(relativePath);
for ( const relativePath of removedAssetFiles ) removeWithinRepository(relativePath);

console.info(`Adapted ${replacedReferences} restricted asset references in ${changedFiles} source files.`);
console.info("Removed unlicensed or narrowly licensed upstream asset directories and mapping data.");
