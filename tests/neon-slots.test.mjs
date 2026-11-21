import test from "node:test";
import assert from "node:assert/strict";
import { AUGMENTATION_CATEGORIES, EQUIPMENT_POSITIONS, createSlotConfiguration, installAugmentation,
  removeCyberware, assignEquipment } from "../module/neon/slots.mjs";

test("body owns exactly the six approved category slots", () => {
  const c = createSlotConfiguration();
  assert.deepEqual(c.augmentationSlots.map(s => s.category),
    ["force", "mobility", "interface", "sensory", "recovery", "defense"]);
  assert.equal(new Set(c.augmentationSlots.map(s => s.id)).size, 6);
  assert.ok(c.augmentationSlots.every(s => s.source === "body" && s.ownerId === null && s.augmentation === null));
  assert.deepEqual(AUGMENTATION_CATEGORIES.map(c => c.colorName), ["Red", "Amber", "Cyan", "Violet", "Green", "Blue"]);
});

test("loadouts enforce positions, capacity and item identity without mutating inputs", () => {
  const empty = [];
  const pistol = assignEquipment(empty, { itemId: "pistol", positions: ["left-hand"] });
  assert.deepEqual(empty, []);
  assert.throws(() => assignEquipment(pistol, { itemId: "pistol", positions: ["right-hand"] }), /Duplicate item/);
  assert.throws(() => assignEquipment(pistol, { itemId: "rifle", positions: ["left-hand", "right-hand"] }), /capacity/);
  assert.throws(() => assignEquipment(empty, { itemId: "x", positions: ["unsupported"] }), /Unsupported/);
  assert.throws(() => assignEquipment(empty, { itemId: "", positions: ["head"] }), /nonempty/);
  assert.throws(() => assignEquipment(empty, { itemId: "x", positions: [] }), /At least one/);
  const rifle = assignEquipment(empty, { itemId: "rifle", positions: ["left-hand", "right-hand"] });
  assert.throws(() => assignEquipment(rifle, { itemId: "shield", positions: ["right-hand"] }), /capacity/);
  const helmet = assignEquipment(rifle, { itemId: "helmet", positions: ["head", "face"] });
  assert.throws(() => assignEquipment(helmet, { itemId: "mask", positions: ["face"] }), /capacity/);
  const one = assignEquipment([], { itemId: "a", positions: ["sidearm-holster"] });
  const two = assignEquipment(one, { itemId: "b", positions: ["sidearm-holster"] });
  assert.throws(() => assignEquipment(two, { itemId: "c", positions: ["sidearm-holster"] }), /capacity/);
  two[0].positions.push("head");
  assert.deepEqual(one[0].positions, ["sidearm-holster"]);
  let quick = [];
  for ( let i = 0; i < 4; i++ ) quick = assignEquipment(quick, { itemId: `q${i}`, positions: ["quick-access"] });
  assert.throws(() => assignEquipment(quick, { itemId: "q4", positions: ["quick-access"] }), /capacity/);
});

test("physical capacities and attachment sockets remain separate from body slots", () => {
  const c = createSlotConfiguration({ attachmentSockets: [{ id: "rifle:optic", ownerId: "rifle", label: "Optic" }] });
  assert.deepEqual(EQUIPMENT_POSITIONS.map(p => p.capacity), [1, 1, 1, 1, 1, 1, 1, 2, 1, 4]);
  assert.equal(c.augmentationSlots.length, 6);
  assert.deepEqual(c.attachmentSockets, [{ id: "rifle:optic", ownerId: "rifle", label: "Optic" }]);
  assert.throws(() => installAugmentation(c, "rifle:optic", { id: "a", category: "force" }), /not found/);
  assert.throws(() => createSlotConfiguration({ attachmentSockets: [{ id: "x", ownerId: "", label: "Optic" }] }),
    /nonempty/);
  assert.throws(() => createSlotConfiguration({ attachmentSockets: [
    { id: "x", ownerId: "rifle", label: "Optic" }, { id: "x", ownerId: "armor", label: "Mount" }
  ] }), /Duplicate/);
});

test("rejects duplicate identities, wrong categories, and implicit moves", () => {
  assert.throws(() => createSlotConfiguration({ expansionSlots: [{ id: "body:force", ownerId: "x", category: "force" }] }),
    /Duplicate/);
  assert.throws(() => createSlotConfiguration({ expansionSlots: [{ id: "x", ownerId: "x", category: "unknown" }] }),
    /Unknown/);
  assert.throws(() => createSlotConfiguration({ expansionSlots: [{ id: "x", category: "force" }] }), /nonempty/);
  assert.throws(() => createSlotConfiguration({ expansionSlots: [
    { id: "same", ownerId: "a", category: "force" }, { id: "same", ownerId: "b", category: "mobility" }
  ] }), /Duplicate/);
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
  result.configuration.augmentationSlots.find(s => s.id === "body:force").augmentation.id = "changed";
  assert.equal(c.augmentationSlots.find(s => s.id === "body:force").augmentation.id, "body-aug");
  result.configuration.equipmentPositions[0].capacity = 99;
  assert.equal(c.equipmentPositions[0].capacity, 1);
  assert.throws(() => removeCyberware(c, ""), /nonempty/);
});
