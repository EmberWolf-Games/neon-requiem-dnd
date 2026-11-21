import test from "node:test";
import assert from "node:assert/strict";
import { AUGMENTATION_CATEGORIES, EQUIPMENT_POSITIONS, createSlotConfiguration, installAugmentation,
  removeCyberware } from "../module/neon/slots.mjs";

test("body owns exactly the six approved category slots", () => {
  const c = createSlotConfiguration();
  assert.deepEqual(c.augmentationSlots.map(s => s.category),
    ["force", "mobility", "interface", "sensory", "recovery", "defense"]);
  assert.equal(new Set(c.augmentationSlots.map(s => s.id)).size, 6);
  assert.ok(c.augmentationSlots.every(s => s.source === "body" && s.ownerId === null && s.augmentation === null));
  assert.deepEqual(AUGMENTATION_CATEGORIES.map(c => c.colorName), ["Red", "Amber", "Cyan", "Violet", "Green", "Blue"]);
});

test("physical capacities and attachment sockets remain separate from body slots", () => {
  const c = createSlotConfiguration({ attachmentSockets: [{ id: "rifle:optic", ownerId: "rifle", label: "Optic" }] });
  assert.deepEqual(EQUIPMENT_POSITIONS.map(p => p.capacity), [1, 1, 1, 1, 1, 1, 1, 2, 1, 4]);
  assert.equal(c.augmentationSlots.length, 6);
  assert.deepEqual(c.attachmentSockets, [{ id: "rifle:optic", ownerId: "rifle", label: "Optic" }]);
  assert.throws(() => installAugmentation(c, "rifle:optic", { id: "a", category: "force" }), /not found/);
});

test("rejects duplicate identities, wrong categories, and implicit moves", () => {
  assert.throws(() => createSlotConfiguration({ expansionSlots: [{ id: "body:force", ownerId: "x", category: "force" }] }),
    /Duplicate/);
  assert.throws(() => createSlotConfiguration({ expansionSlots: [{ id: "x", ownerId: "x", category: "unknown" }] }),
    /Unknown/);
  const base = createSlotConfiguration();
  assert.throws(() => installAugmentation(base, "body:force", { id: "a", category: "sensory" }), /does not match/);
  const installed = installAugmentation(base, "body:force", { id: "a", category: "force" });
  assert.equal(base.augmentationSlots[0].augmentation, null);
  assert.throws(() => installAugmentation(installed, "body:force", { id: "b", category: "force" }), /occupied/);
  assert.throws(() => installAugmentation(installed, "body:mobility", { id: "a", category: "mobility" }),
    /already installed/);
});

test("removing one Cyberware source detaches only its occupants without migrating them", () => {
  let c = createSlotConfiguration({ expansionSlots: [
    { id: "neural:interface", ownerId: "neural", category: "interface" },
    { id: "neural:sensory", ownerId: "neural", category: "sensory" },
    { id: "legs:mobility", ownerId: "legs", category: "mobility" }
  ] });
  c = installAugmentation(c, "body:force", { id: "body-aug", category: "force" });
  c = installAugmentation(c, "neural:interface", { id: "neural-aug", category: "interface" });
  c = installAugmentation(c, "legs:mobility", { id: "leg-aug", category: "mobility" });
  const result = removeCyberware(c, "neural");
  assert.equal(c.augmentationSlots.length, 9);
  assert.equal(result.configuration.augmentationSlots.length, 7);
  assert.equal(result.configuration.augmentationSlots.find(s => s.id === "body:force").augmentation.id, "body-aug");
  assert.equal(result.configuration.augmentationSlots.find(s => s.id === "legs:mobility").augmentation.id, "leg-aug");
  assert.equal(result.configuration.augmentationSlots.find(s => s.id === "body:interface").augmentation, null);
  assert.deepEqual(result.detachedAugmentations,
    [{ id: "neural-aug", category: "interface", slotId: "neural:interface" }]);
  assert.equal(removeCyberware(c, "missing").configuration.augmentationSlots.length, 9);
});
