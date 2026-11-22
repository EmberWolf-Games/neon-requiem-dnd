import test from "node:test";
import assert from "node:assert/strict";
import { AUGMENTATION_CATEGORIES } from "../module/neon/slots.mjs";
import { validateFixture, encodeFixture, decodeFixture, previewFixtureChange, rollbackFixtureChange, remapFixture }
  from "../module/neon/fixture-serialization.mjs";

const fixture = () => ({ schemaVersion: 1, actorId: "actor", ownedItemIds: ["gun", "optic", "cyber", "aug"],
  assignments: [{ itemId: "gun", positions: ["left-hand", "right-hand"] }],
  slots: [...AUGMENTATION_CATEGORIES.map(c => ({ id: `body:${c.id}`, source: "body", ownerId: null,
    category: c.id, occupant: null })), { id: "expansion", source: "cyberware", ownerId: "cyber",
    category: "interface", occupant: { itemId: "aug", category: "interface" } }],
  attachments: [{ ownerId: "gun", socketId: "optic", itemId: "optic" }] });

test("fixture encoding is stable, round-trips, and previews without mutating inputs", () => {
  const original = fixture();
  const proposed = fixture();
  proposed.assignments = [];
  const before = structuredClone(original);
  const encoded = encodeFixture(original);
  assert.equal(encodeFixture(decodeFixture(encoded)), encoded);
  const preview = previewFixtureChange(original, proposed);
  assert.equal(preview.ok, true);
  assert.equal(preview.changed, true);
  assert.deepEqual(preview.changedFields, ["assignments"]);
  assert.deepEqual(preview.before, before);
  assert.deepEqual(rollbackFixtureChange(preview), before);
  preview.after.ownedItemIds.push("other");
  assert.deepEqual(original, before);
  assert.deepEqual(proposed.ownedItemIds, before.ownedItemIds);
});

test("rejects missing, duplicate, mismatched and unknown-version references", () => {
  const bad = fixture();
  bad.schemaVersion = 2;
  bad.slots[6].ownerId = "unknown";
  bad.slots[6].occupant.category = "force";
  bad.assignments.push({ itemId: "gun", positions: ["head"] });
  assert.ok(validateFixture(bad).length >= 4);
  assert.equal(previewFixtureChange(fixture(), bad).ok, false);
  assert.throws(() => rollbackFixtureChange({ ok: false }), /Invalid rollback/);
  assert.throws(() => encodeFixture(bad));
  assert.throws(() => decodeFixture("{"));
  const nonJson = fixture();
  nonJson.extra = undefined;
  assert.throws(() => encodeFixture(nonJson), /plain JSON/);
  assert.ok(validateFixture({ schemaVersion: 1 }).length > 0);
  const duplicate = fixture();
  duplicate.attachments.push({ ownerId: "gun", socketId: "optic", itemId: "aug" });
  assert.ok(validateFixture(duplicate).includes("Invalid attachment"));
});

test("clone remap is explicit, complete, collision-checked and leaves original unchanged", () => {
  const original = fixture();
  const mapping = { gun: "g2", optic: "o2", cyber: "c2", aug: "a2" };
  const remapped = remapFixture(original, "actor2", mapping);
  assert.equal(remapped.slots[6].ownerId, "c2");
  assert.equal(remapped.slots[6].occupant.itemId, "a2");
  assert.equal(remapped.attachments[0].ownerId, "g2");
  assert.equal(original.actorId, "actor");
  assert.throws(() => remapFixture(original, "new", { gun: "g" }), /Missing remap/);
  assert.throws(() => remapFixture(original, "new", { ...mapping, aug: "c2" }), /duplicate/);
});

test("fixture validation detects deleted owners, invalid identities and independent sources", () => {
  const original = fixture();
  const second = { id: "other-slot", source: "cyberware", ownerId: "cyber2", category: "sensory", occupant: null };
  original.ownedItemIds.push("cyber2");
  original.slots.push(second);
  assert.deepEqual(validateFixture(original), []);
  const removed = structuredClone(original);
  removed.ownedItemIds = removed.ownedItemIds.filter(id => id !== "cyber");
  assert.ok(validateFixture(removed).includes("Unknown Cyberware owner"));
  assert.equal(original.slots[6].ownerId, "cyber");
  const duplicate = structuredClone(original);
  duplicate.slots.push({ ...second });
  assert.ok(validateFixture(duplicate).includes("Invalid or duplicate slot ID"));
  const missing = structuredClone(original);
  delete missing.slots[6].ownerId;
  assert.ok(validateFixture(missing).includes("Unknown Cyberware owner"));
});

test("cross-role fixture ambiguity is retained for owner design review", () => {
  const candidate = fixture();
  candidate.attachments[0].itemId = "aug";
  // The fixture alone has no approved item-type information to decide this relationship.
  assert.deepEqual(validateFixture(candidate), []);
  assert.deepEqual(decodeFixture(encodeFixture(candidate)), candidate);
});
