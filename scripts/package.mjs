import fs from "node:fs";
import path from "node:path";
import { deflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { parseVersion } from "./version.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({
  options: {
    "release-tag": { type: "string" }
  }
});
const releaseTag = values["release-tag"];
const manifestPath = path.join(root, "system.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const foundry = JSON.parse(fs.readFileSync(path.join(root, "foundryvtt.json"), "utf8"));
const version = parseVersion(manifest.version) && manifest.version;
const repositoryUrl = "https://github.com/EmberWolf-Games/neon-requiem-dnd";
const stableManifestUrl = "https://raw.githubusercontent.com/EmberWolf-Games/neon-requiem-dnd/stable/system.json";
const stageDirectory = path.join(root, "dist", "package");
const archivePath = path.join(root, "dist", "neon-requiem-dnd.zip");

if ( manifest.id !== "neon-requiem-dnd" ) throw new Error("Refusing to package an unexpected Foundry system id.");
if ( manifest.manifest !== stableManifestUrl ) throw new Error(`Stable manifest URL must be ${stableManifestUrl}.`);
if ( "download" in manifest ) throw new Error("The source manifest must not advertise an unreleased download.");
if ( releaseTag && releaseTag !== `v${version}` ) {
  throw new Error(`Release tag ${releaseTag} does not match system.json version ${version}.`);
}

/**
 *
 * @param relativePath
 */
function resolveInsideRepository(relativePath) {
  const source = path.resolve(root, relativePath);
  if ( !source.startsWith(`${root}${path.sep}`) ) throw new Error(`Package path escapes the repository: ${relativePath}`);
  return source;
}

/**
 *
 * @param sourceRelativePath
 * @param destinationRelativePath
 */
function addFile(sourceRelativePath, destinationRelativePath = sourceRelativePath) {
  const source = resolveInsideRepository(sourceRelativePath);
  if ( !fs.existsSync(source) || !fs.statSync(source).isFile() ) {
    throw new Error(`Required build output is missing: ${sourceRelativePath}. Run npm run build first.`);
  }
  const destination = path.resolve(stageDirectory, destinationRelativePath);
  if ( !destination.startsWith(`${stageDirectory}${path.sep}`) ) throw new Error(`Package destination escapes staging: ${destinationRelativePath}`);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

/**
 *
 * @param relativePath
 */
function addDirectory(relativePath) {
  const source = resolveInsideRepository(relativePath);
  if ( !fs.existsSync(source) || !fs.statSync(source).isDirectory() ) {
    throw new Error(`Required build directory is missing: ${relativePath}. Run npm run build first.`);
  }
  for ( const entry of fs.readdirSync(source, { withFileTypes: true }) ) {
    const child = path.posix.join(relativePath.replaceAll("\\", "/"), entry.name);
    if ( entry.isDirectory() ) addDirectory(child);
    else if ( entry.isFile() ) addFile(child);
  }
}

/**
 *
 * @param relativePath
 */
function addConfiguredPath(relativePath) {
  const normalized = relativePath.replaceAll("\\", "/").replace(/\/$/, "");
  const source = resolveInsideRepository(normalized);
  if ( fs.existsSync(source) && fs.statSync(source).isDirectory() ) addDirectory(normalized);
  else addFile(normalized);
}

/**
 *
 * @param buffer
 */
function crc32(buffer) {
  let crc = 0xffffffff;
  for ( const byte of buffer ) crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

const crcTable = Uint32Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for ( let bit = 0; bit < 8; bit++ ) crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
  return crc >>> 0;
});

/**
 *
 * @param sourceDirectory
 * @param outputPath
 */
function writeZip(sourceDirectory, outputPath) {
  const files = [];
  /**
   *
   * @param directory
   */
  function collect(directory) {
    for ( const entry of fs.readdirSync(directory, { withFileTypes: true }) ) {
      const source = path.join(directory, entry.name);
      if ( entry.isDirectory() ) collect(source);
      else if ( entry.isFile() ) files.push(source);
    }
  }
  collect(sourceDirectory);
  files.sort((left, right) => {
    const a = path.relative(sourceDirectory, left).split(path.sep).join("/");
    const b = path.relative(sourceDirectory, right).split(path.sep).join("/");
    return a < b ? -1 : a > b ? 1 : 0;
  });

  if ( files.length > 0xffff ) throw new Error("Package contains too many files for the supported ZIP format.");
  const localRecords = [];
  const centralRecords = [];
  let offset = 0;

  for ( const file of files ) {
    const name = Buffer.from(path.relative(sourceDirectory, file).split(path.sep).join("/"), "utf8");
    const data = fs.readFileSync(file);
    const compressed = deflateRawSync(data, { level: 9 });
    const checksum = crc32(data);
    if (
      name.length > 0xffff || data.length >= 0xffffffff || compressed.length >= 0xffffffff || offset >= 0xffffffff
    ) {
      throw new Error("Package exceeds the supported non-ZIP64 archive limits.");
    }

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(33, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(data.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);
    localRecords.push(localHeader, name, compressed);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(0x0314, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(33, 14);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(compressed.length, 20);
    centralHeader.writeUInt32LE(data.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0x81a40000, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralRecords.push(centralHeader, name);
    offset += localHeader.length + name.length + compressed.length;
  }

  const centralDirectory = Buffer.concat(centralRecords);
  if ( centralDirectory.length >= 0xffffffff || offset >= 0xffffffff ) {
    throw new Error("Package exceeds the supported non-ZIP64 archive limits.");
  }
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(files.length, 8);
  endRecord.writeUInt16LE(files.length, 10);
  endRecord.writeUInt32LE(centralDirectory.length, 12);
  endRecord.writeUInt32LE(offset, 16);
  endRecord.writeUInt16LE(0, 20);
  fs.writeFileSync(outputPath, Buffer.concat([...localRecords, centralDirectory, endRecord]));
}

if ( !manifest.esmodules?.includes("dnd5e.mjs") ) throw new Error("The system manifest must load dnd5e.mjs.");

const stageRoot = path.resolve(stageDirectory);
if ( !stageRoot.startsWith(`${root}${path.sep}`) ) throw new Error("Unsafe package staging path.");
fs.rmSync(stageRoot, { recursive: true, force: true });
fs.mkdirSync(stageRoot, { recursive: true });

const packageManifest = structuredClone(manifest);
packageManifest.flags = { ...packageManifest.flags, hotReload: false };
if ( releaseTag ) {
  packageManifest.download = `${repositoryUrl}/releases/download/${releaseTag}/neon-requiem-dnd.zip`;
} else {
  delete packageManifest.download;
}
fs.writeFileSync(path.join(stageDirectory, "system.json"), `${JSON.stringify(packageManifest, null, 2)}\n`, "utf8");

for ( const moduleFile of manifest.esmodules ) {
  if ( moduleFile === "dnd5e.mjs" ) addFile("dnd5e-compiled.mjs", moduleFile);
  else addFile(moduleFile);
}
for ( const style of manifest.styles ?? [] ) addFile(style);
for ( const pack of manifest.packs ?? [] ) addDirectory(pack.path);
for ( const language of manifest.languages ?? [] ) addFile(language.path);
for ( const include of foundry.includes ?? [] ) addConfiguredPath(include);

fs.mkdirSync(path.dirname(archivePath), { recursive: true });
writeZip(stageDirectory, archivePath);
console.info(`Packaged ${manifest.id} ${version} at ${path.relative(root, archivePath)}${releaseTag ? ` for ${releaseTag}` : " (local build; no download URL)"}.`);
