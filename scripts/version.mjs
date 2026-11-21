import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "system.json");
const versionPattern = /^(0|[1-9]\d*)\.([1-9]\d*)\.([1-9]\d*)\.(\d{3})$/;

/**
 * Parse a Neon Requiem four-part version.
 * @param value
 */
export function parseVersion(value) {
  if ( typeof value !== "string" ) throw new TypeError("Version must be a string.");
  const match = versionPattern.exec(value);
  if ( !match ) throw new Error(`Invalid Neon Requiem version '${value}'. Expected M.m.r.b with a three-digit Build.`);
  const [major, minor, release, build] = match.slice(1).map(Number);
  if ( ![major, minor, release, build].every(Number.isSafeInteger) || build > 999 ) {
    throw new Error(`Version '${value}' contains an out-of-range component.`);
  }
  return { major, minor, release, build };
}

/**
 * Format numeric components as the canonical four-part version.
 * @param parts
 */
export function formatVersion(parts) {
  const { major, minor, release, build } = parts;
  if ( ![major, minor, release, build].every(Number.isSafeInteger)
    || major < 0 || minor < 1 || release < 1 || build < 0 || build > 999 ) {
    throw new Error("Version components are outside the supported ranges.");
  }
  return `${major}.${minor}.${release}.${String(build).padStart(3, "0")}`;
}

/**
 * Compare two four-part versions numerically, including the Build component.
 * @param left
 * @param right
 */
export function compareVersions(left, right) {
  const a = parseVersion(left);
  const b = parseVersion(right);
  for ( const component of ["major", "minor", "release", "build"] ) {
    if ( a[component] < b[component] ) return -1;
    if ( a[component] > b[component] ) return 1;
  }
  return 0;
}

/**
 * Increment Minor, reset Release to 1, and preserve the published Build counter.
 * @param version
 */
export function incrementMinor(version) {
  const parts = parseVersion(version);
  return formatVersion({ ...parts, minor: parts.minor + 1, release: 1 });
}

/**
 * Increment Release within the current Minor and preserve the published Build counter.
 * @param version
 */
export function incrementRelease(version) {
  const parts = parseVersion(version);
  return formatVersion({ ...parts, release: parts.release + 1 });
}

/**
 * Prepare the next published Build without wrapping at 999.
 * @param version
 */
export function prepareNextBuild(version) {
  const parts = parseVersion(version);
  if ( parts.build === 999 ) {
    throw new Error("Build 999 is exhausted. Request a versioning policy decision; Build will not wrap or reset.");
  }
  return formatVersion({ ...parts, build: parts.build + 1 });
}

/**
 * Increment Major only with explicit approval and a recorded Minor transition choice.
 * @param version
 * @param root0
 * @param root0.authorized
 * @param root0.minor
 */
export function incrementMajor(version, { authorized = false, minor } = {}) {
  if ( !authorized ) throw new Error("Major changes require explicit --authorize-major approval.");
  if ( !Number.isSafeInteger(minor) || minor < 1 ) {
    throw new Error("A Major transition requires an explicit --minor value; carry-forward and reset are product decisions.");
  }
  const parts = parseVersion(version);
  return formatVersion({ ...parts, major: parts.major + 1, minor, release: 1 });
}

/**
 *
 * @param tag
 */
function publishedTagVersion(tag) {
  if ( typeof tag !== "string" || !/^v\d/.test(tag) ) return null;
  const version = tag.slice(1);
  parseVersion(version);
  return version;
}

/**
 *
 * @param filePath
 */
function readPublishedTags(filePath) {
  if ( !filePath ) return [];
  const input = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const values = Array.isArray(input) ? input : input.tags;
  if ( !Array.isArray(values) ) throw new Error("Published releases must be a JSON array of tags or objects with tagName fields.");
  return values.map(entry => typeof entry === "string" ? entry : entry.tagName).filter(Boolean);
}

/**
 * Validate sequencing and reuse rules against previously published version tags.
 * @param version
 * @param tags
 * @param root0
 * @param root0.majorAuthorized
 * @param root0.majorMinorDecision
 * @param root0.resumePublished
 */
export function validatePublishedTransition(version, tags, {
  majorAuthorized = false,
  majorMinorDecision = null,
  resumePublished = false
} = {}) {
  const candidate = parseVersion(version);
  const published = tags.map(publishedTagVersion).filter(Boolean);
  if ( published.includes(version) ) {
    const latestPublished = published.reduce((current, item) => compareVersions(item, current) > 0 ? item : current);
    if ( !resumePublished || latestPublished !== version ) {
      throw new Error(`Version v${version} has already been published and cannot be reused.`);
    }
    return { version, latest: version, resume: true };
  }

  if ( published.length === 0 ) {
    if ( version !== "0.1.1.000" ) throw new Error("The first published build must be the initialized version 0.1.1.000.");
    return { version, latest: null };
  }

  const latest = published.reduce((current, item) => compareVersions(item, current) > 0 ? item : current);
  const previous = parseVersion(latest);
  if ( candidate.build !== previous.build + 1 ) {
    if ( previous.build === 999 ) throw new Error("Build 999 is exhausted. A new policy decision is required.");
    throw new Error(`Build must increase exactly once from ${String(previous.build).padStart(3, "0")} to ${String(previous.build + 1).padStart(3, "0")}.`);
  }

  if ( candidate.major < previous.major ) throw new Error("Major cannot decrease.");
  if ( candidate.major === previous.major ) {
    if ( candidate.minor < previous.minor ) throw new Error("Minor cannot decrease.");
    if ( candidate.minor === previous.minor ) {
      if ( candidate.release !== previous.release && candidate.release !== previous.release + 1 ) {
        throw new Error("Release must stay the same for a new Build or increase by exactly one.");
      }
    } else if ( candidate.minor !== previous.minor + 1 || candidate.release !== 1 ) {
      throw new Error("Minor must increase by exactly one and reset Release to 1.");
    }
  } else {
    if ( !majorAuthorized ) throw new Error("Major changes require explicit --authorize-major approval.");
    if ( candidate.major !== previous.major + 1 || candidate.release !== 1 ) {
      throw new Error("Major must increase by exactly one and start at Release 1.");
    }
    if ( !["carry", "reset"].includes(majorMinorDecision) ) {
      throw new Error("Major changes require an explicit Minor decision: --major-minor-decision=carry or reset.");
    }
    const expectedMinor = majorMinorDecision === "carry" ? previous.minor : 1;
    if ( candidate.minor !== expectedMinor ) {
      throw new Error(`The selected Minor decision '${majorMinorDecision}' requires Minor ${expectedMinor}.`);
    }
  }

  if ( compareVersions(version, latest) <= 0 ) throw new Error(`New version ${version} must be newer than the latest published version ${latest}.`);
  return { version, latest };
}

/**
 *
 */
function readManifestVersion() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if ( manifest.id !== "neon-requiem-dnd" ) throw new Error(`Expected system.json id neon-requiem-dnd; found '${manifest.id}'.`);
  parseVersion(manifest.version);
  return manifest.version;
}

/**
 *
 * @param version
 */
function writeManifestVersion(version) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  parseVersion(version);
  manifest.version = version;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

/**
 *
 * @param args
 * @param name
 */
function optionValue(args, name) {
  const prefix = `${name}=`;
  const inline = args.find(argument => argument.startsWith(prefix));
  if ( inline ) return inline.slice(prefix.length);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

/**
 *
 */
function run() {
  const [command = "show", ...args] = process.argv.slice(2);
  const current = readManifestVersion();
  if ( command === "show" ) {
    console.info(current);
    return;
  }
  if ( command === "validate" ) {
    console.info(`Valid Neon Requiem version: ${current}`);
    return;
  }

  let next;
  if ( command === "minor" ) next = incrementMinor(current);
  else if ( command === "release" ) next = incrementRelease(current);
  else if ( command === "prepare-build" ) next = prepareNextBuild(current);
  else if ( command === "major" ) {
    const minor = Number(optionValue(args, "--minor"));
    next = incrementMajor(current, { authorized: args.includes("--authorize-major"), minor });
  } else if ( command === "verify-release" ) {
    const publishedFile = args.find(argument => !argument.startsWith("--"));
    const result = validatePublishedTransition(current, readPublishedTags(publishedFile), {
      majorAuthorized: args.includes("--authorize-major"),
      majorMinorDecision: optionValue(args, "--major-minor-decision"),
      resumePublished: args.includes("--resume-existing")
    });
    if ( result.resume ) console.info(`Validated resume of published ${result.version}.`);
    else console.info(result.latest ? `Validated ${result.version} after ${result.latest}.` : `Validated initial release ${result.version}.`);
    return;
  } else {
    throw new Error(`Unknown version command '${command}'. Use show, minor, release, prepare-build, major, validate, or verify-release.`);
  }

  writeManifestVersion(next);
  console.info(`${current} -> ${next}`);
}

if ( process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) ) run();
