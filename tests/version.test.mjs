import assert from "node:assert/strict";
import test from "node:test";
import {
  compareVersions,
  formatVersion,
  incrementMajor,
  incrementMinor,
  incrementRelease,
  parseVersion,
  prepareNextBuild,
  validatePublishedTransition
} from "../scripts/version.mjs";

test("parses and formats the canonical four-part version", () => {
  assert.deepEqual(parseVersion("0.1.1.000"), { major: 0, minor: 1, release: 1, build: 0 });
  assert.equal(formatVersion({ major: 0, minor: 1, release: 1, build: 7 }), "0.1.1.007");
  assert.equal(formatVersion(parseVersion("12.34.56.789")), "12.34.56.789");
});

test("rejects malformed components and non-canonical leading zeroes", () => {
  for ( const version of [
    "0.1.1",
    "0.1.1.0",
    "0.1.1.0000",
    "00.1.1.000",
    "0.01.1.000",
    "0.1.01.000",
    "0.0.1.000",
    "0.1.0.000",
    "0.1.1.1a0",
    "v0.1.1.000",
    "0.1.1.1000"
  ] ) assert.throws(() => parseVersion(version));
});

test("compares all components numerically, including zero-padded Build", () => {
  assert.equal(compareVersions("0.1.1.009", "0.1.1.010"), -1);
  assert.equal(compareVersions("0.1.1.010", "0.1.1.009"), 1);
  assert.equal(compareVersions("0.1.2.000", "0.1.1.999"), 1);
  assert.equal(compareVersions("0.2.1.000", "0.1.99.999"), 1);
  assert.equal(compareVersions("1.1.1.000", "0.99.99.999"), 1);
});

test("increments Minor and Release without changing the global Build counter", () => {
  assert.equal(incrementMinor("0.1.2.002"), "0.2.1.002");
  assert.equal(incrementRelease("0.1.1.002"), "0.1.2.002");
});

test("prepares the next Build with three digits and refuses exhaustion", () => {
  assert.equal(prepareNextBuild("0.1.1.000"), "0.1.1.001");
  assert.equal(prepareNextBuild("0.1.1.009"), "0.1.1.010");
  assert.throws(() => prepareNextBuild("0.1.1.999"), /Build 999 is exhausted/);
});

test("requires explicit approval and a Minor choice before changing Major", () => {
  assert.throws(() => incrementMajor("0.1.2.002", { minor: 1 }), /explicit/);
  assert.throws(() => incrementMajor("0.1.2.002", { authorized: true }), /explicit --minor/);
  assert.equal(incrementMajor("0.1.2.002", { authorized: true, minor: 1 }), "1.1.1.002");
});

test("validates sequential published releases and prevents reuse", () => {
  assert.deepEqual(validatePublishedTransition("0.1.1.000", []), { version: "0.1.1.000", latest: null });
  assert.equal(validatePublishedTransition("0.1.1.001", ["v0.1.1.000"]).latest, "0.1.1.000");
  assert.equal(validatePublishedTransition("0.1.2.002", ["v0.1.1.001"]).latest, "0.1.1.001");
  assert.equal(validatePublishedTransition("0.2.1.003", ["v0.1.2.002"]).latest, "0.1.2.002");
  assert.equal(validatePublishedTransition("0.2.2.004", ["v0.2.1.003"]).latest, "0.2.1.003");
  assert.throws(() => validatePublishedTransition("0.1.3.002", ["v0.1.1.001"]), /Release must stay the same/);
  assert.throws(() => validatePublishedTransition("0.1.1.003", ["v0.1.1.001"]), /Build must increase exactly once/);
  assert.throws(() => validatePublishedTransition("0.1.1.000", ["v0.1.1.000"]), /already been published/);
  assert.equal(validatePublishedTransition("0.1.1.001", ["v0.1.1.000", "v0.1.1.001"], {
    resumePublished: true
  }).resume, true);
  assert.throws(() => validatePublishedTransition("0.1.1.000", ["v0.1.1.000", "v0.1.1.001"], {
    resumePublished: true
  }), /already been published/);
  assert.throws(() => validatePublishedTransition("0.2.1.000", ["v0.1.1.000"]), /Build must increase exactly once/);
});

test("requires authorization and an explicit Minor policy for a Major release", () => {
  const published = ["v0.2.2.002"];
  assert.throws(() => validatePublishedTransition("1.2.1.003", published), /explicit/);
  assert.throws(() => validatePublishedTransition("1.2.1.003", published, { majorAuthorized: true }), /Minor decision/);
  assert.equal(validatePublishedTransition("1.2.1.003", published, {
    majorAuthorized: true,
    majorMinorDecision: "carry"
  }).latest, "0.2.2.002");
  assert.equal(validatePublishedTransition("1.1.1.003", published, {
    majorAuthorized: true,
    majorMinorDecision: "reset"
  }).latest, "0.2.2.002");
  assert.throws(() => validatePublishedTransition("1.3.1.003", published, {
    majorAuthorized: true,
    majorMinorDecision: "carry"
  }), /requires Minor 2/);
  assert.throws(() => validatePublishedTransition("1.2.1.003", published, {
    majorAuthorized: true,
    majorMinorDecision: "reset"
  }), /requires Minor 1/);
});
