import test from "node:test";
import assert from "node:assert/strict";
import { groupInventory, projectInventory } from "../module/neon/inventory-projection.mjs";

test("projects only explicit visible owned snapshots, sorted without mutation", () => {
  const source = [
    { id: "b", name: "Rope", type: "loot", visible: true, quantity: 2, equipped: false, containerId: "a" },
    { id: "a", name: "Rope", type: "container", visible: true },
    { id: "secret", name: "Hidden", visible: false },
    { id: "unknown", name: "Unknown visibility" }, null, { id: "", name: "bad", visible: true }
  ];
  const before = structuredClone(source);
  const result = projectInventory(source);
  assert.deepEqual(result.map(i => i.id), ["a", "b"]);
  assert.equal(result[0].type, "container");
  assert.equal(result[1].equipped, false);
  assert.equal(result[1].containerName, "Rope");
  assert.deepEqual(groupInventory(result).map(group => group.type), ["container", "loot"]);
  assert.equal(result[0].quantity, null);
  result[0].name = "changed";
  assert.deepEqual(source, before);
  assert.deepEqual(projectInventory([]), []);
  assert.deepEqual(projectInventory(null), []);
  assert.deepEqual(projectInventory([{ id: "other", name: "Other", visible: true }]).map(i => i.id), ["other"]);
});

test("ignores duplicate IDs, rejects malformed visibility and never invents placement", () => {
  const output = projectInventory([{ id: "x", name: "Item", visible: true, quantity: -1 },
    { id: "x", name: "duplicate", visible: true }, { id: "y", name: "No", visible: 1 }]);
  assert.equal(output.length, 1);
  assert.equal(output[0].quantity, null);
  assert.equal("slot" in output[0], false);
});
