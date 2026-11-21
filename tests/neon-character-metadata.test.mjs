import test from "node:test";
import assert from "node:assert/strict";
import { PLAYABLE_RACES, BASE_CLASSES, SUBCLASS_MILESTONES, RIPPERDOC, TEST_BACKGROUNDS,
  AUGMENTATION_CATEGORIES } from "../module/neon/character-metadata.mjs";

test("approved design metadata is internally consistent", () => {
  assert.deepEqual(PLAYABLE_RACES.map(r => [r.name, r.startingCyberware]), [["Human", 1], ["Synth", 2]]);
  assert.equal(BASE_CLASSES.length, 6);
  assert.deepEqual(BASE_CLASSES.map(c => c.name), ["Vanguard", "Deadeye", "Ghost", "Cipher", "Engineer", "Lifeline"]);
  assert.deepEqual(BASE_CLASSES.flatMap(c => c.subclasses), [
    "Juggernaut", "Reaver", "Warden", "Longshot", "Gunslinger", "Demolitionist", "Phantom", "Blade Dancer",
    "Saboteur", "Intruder", "Puppeteer", "Handler", "Rigger", "Fabricator", "Architect", "Trauma Tech",
    "Nanomedic", "Combat Responder"
  ]);
  assert.equal(new Set(BASE_CLASSES.flatMap(c => c.subclasses)).size, 18);
  assert.ok(BASE_CLASSES.every(c => c.subclasses.length === 3));
  assert.deepEqual(SUBCLASS_MILESTONES, [3, 7, 11, 15, 19, 23, 27, 31, 35, 39]);
  assert.deepEqual(RIPPERDOC.classPrerequisites, { Engineer: 5, Lifeline: 5 });
  assert.deepEqual(RIPPERDOC.abilityPrerequisites, { Intelligence: 13, Wisdom: 13 });
  assert.equal(RIPPERDOC.toolNamesPending, true);
  assert.equal(new Set(TEST_BACKGROUNDS).size, 12);
  assert.deepEqual(TEST_BACKGROUNDS, ["Blockborn", "Corporate Exile", "Convoy Runner", "Contract Laborer",
    "Security Washout", "Clinic Hand", "Signal Pirate", "Syndicate Courier", "Street Journalist", "Scrap Diver",
    "Lab Subject", "Arcology Resident"]);
  assert.equal(AUGMENTATION_CATEGORIES.length, 6);
});
