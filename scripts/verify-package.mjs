import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { inflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { parseVersion } from "./version.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archivePath = path.join(root, "dist", "neon-requiem-dnd.zip");
const sourceManifest = JSON.parse(fs.readFileSync(path.join(root, "system.json"), "utf8"));
const repositoryUrl = "https://github.com/EmberWolf-Games/neon-requiem-dnd";
const stableManifestUrl = "https://raw.githubusercontent.com/EmberWolf-Games/neon-requiem-dnd/stable/system.json";

if ( !fs.existsSync(archivePath) ) throw new Error("Distribution ZIP not found. Run npm run package first.");
const archive = fs.readFileSync(archivePath);

/**
 *
 * @param buffer
 */
function findEndRecord(buffer) {
  const start = Math.max(0, buffer.length - 0xffff - 22);
  for ( let offset = buffer.length - 22; offset >= start; offset-- ) {
    if ( buffer.readUInt32LE(offset) === 0x06054b50 ) return offset;
  }
  throw new Error("ZIP end-of-central-directory record is missing.");
}

const endOffset = findEndRecord(archive);
const entryCount = archive.readUInt16LE(endOffset + 10);
const centralSize = archive.readUInt32LE(endOffset + 12);
const centralOffset = archive.readUInt32LE(endOffset + 16);
if ( entryCount === 0xffff || centralSize === 0xffffffff || centralOffset === 0xffffffff ) {
  throw new Error("ZIP64 packages are not supported by the packaging validator.");
}

const entries = new Map();
let cursor = centralOffset;
for ( let index = 0; index < entryCount; index++ ) {
  if ( archive.readUInt32LE(cursor) !== 0x02014b50 ) throw new Error("Malformed ZIP central directory.");
  const method = archive.readUInt16LE(cursor + 10);
  const checksum = archive.readUInt32LE(cursor + 16);
  const compressedSize = archive.readUInt32LE(cursor + 20);
  const uncompressedSize = archive.readUInt32LE(cursor + 24);
  const nameLength = archive.readUInt16LE(cursor + 28);
  const extraLength = archive.readUInt16LE(cursor + 30);
  const commentLength = archive.readUInt16LE(cursor + 32);
  const localOffset = archive.readUInt32LE(cursor + 42);
  const name = archive.toString("utf8", cursor + 46, cursor + 46 + nameLength);
  if ( name.startsWith("/") || name.split("/").includes("..") ) throw new Error(`Unsafe ZIP entry path: ${name}`);
  if ( entries.has(name) ) throw new Error(`Duplicate ZIP entry: ${name}`);
  entries.set(name, { method, checksum, compressedSize, uncompressedSize, localOffset });
  cursor += 46 + nameLength + extraLength + commentLength;
}
if ( cursor !== centralOffset + centralSize ) throw new Error("ZIP central directory size does not match its entries.");

const requiredRootFiles = ["system.json", "dnd5e.mjs", "dnd5e.css", "LICENSE", "LICENSE.txt", "THIRD-PARTY-NOTICES.md"];
for ( const name of requiredRootFiles ) assert.ok(entries.has(name), `Package is missing root file ${name}`);
assert.ok([...entries.keys()].some(name => name.startsWith("packs/")), "Compiled compendium content is missing");
assert.ok([...entries.keys()].some(name => name.startsWith("fonts/")), "Licensed fonts are missing");
assert.ok([...entries.keys()].some(name => name.startsWith("icons/")), "Licensed icons are missing");

for ( const name of entries.keys() ) {
  assert.equal(name.startsWith("neon-requiem-dnd/"), false, "ZIP entries must not have an extra enclosing directory");
  assert.equal(/^(?:\.git|node_modules|docs|tests|scripts|dist)\//.test(name), false,
    `Development-only path is present in package: ${name}`);
  assert.equal(/^(?:tokens|ui|icons\/(?:spell-tiers|svg\/schools|currency))\//.test(name), false,
    `Restricted or unaudited asset path is present in package: ${name}`);
  assert.equal(name === "package.json" || name === "package-lock.json", false,
    "Node tooling metadata must not be packaged as Foundry content");
}

/**
 *
 * @param buffer
 */
function crc32(buffer) {
  let crc = 0xffffffff;
  for ( const byte of buffer ) {
    let value = (crc ^ byte) & 0xff;
    for ( let bit = 0; bit < 8; bit++ ) value = value & 1 ? (value >>> 1) ^ 0xedb88320 : value >>> 1;
    crc = (crc >>> 8) ^ value;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 *
 * @param name
 */
function readEntry(name) {
  const entry = entries.get(name);
  if ( !entry ) throw new Error(`ZIP entry not found: ${name}`);
  const offset = entry.localOffset;
  if ( archive.readUInt32LE(offset) !== 0x04034b50 ) throw new Error(`Malformed local ZIP record for ${name}`);
  const nameLength = archive.readUInt16LE(offset + 26);
  const extraLength = archive.readUInt16LE(offset + 28);
  const dataStart = offset + 30 + nameLength + extraLength;
  const dataEnd = dataStart + entry.compressedSize;
  const compressed = archive.subarray(dataStart, dataEnd);
  const data = entry.method === 8 ? inflateRawSync(compressed) : entry.method === 0 ? compressed : null;
  if ( !data ) throw new Error(`Unsupported ZIP compression method ${entry.method} for ${name}`);
  if ( data.length !== entry.uncompressedSize || crc32(data) !== entry.checksum ) {
    throw new Error(`ZIP entry content check failed for ${name}`);
  }
  return data;
}

const packagedManifest = JSON.parse(readEntry("system.json").toString("utf8"));
assert.equal(packagedManifest.id, "neon-requiem-dnd");
assert.equal(packagedManifest.version, sourceManifest.version);
assert.equal(packagedManifest.manifest, stableManifestUrl);
parseVersion(packagedManifest.version);
assert.equal(packagedManifest.flags?.hotReload, false);
if ( packagedManifest.download ) {
  assert.equal(packagedManifest.download,
    `${repositoryUrl}/releases/download/v${packagedManifest.version}/neon-requiem-dnd.zip`);
} else {
  assert.equal(entries.has("system.json"), true);
}

console.info(`Verified ${entries.size} root-layout ZIP entries for ${packagedManifest.id} ${packagedManifest.version}.`);
