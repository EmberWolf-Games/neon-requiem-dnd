/** Approved design metadata; no Foundry documents or mechanics are created. */
export { AUGMENTATION_CATEGORIES } from "./slots.mjs";

export const PLAYABLE_RACES = Object.freeze([
  Object.freeze({ name: "Human", startingCyberware: 1 }),
  Object.freeze({ name: "Synth", startingCyberware: 2 })
]);

export const SUBCLASS_MILESTONES = Object.freeze([3, 7, 11, 15, 19, 23, 27, 31, 35, 39]);
export const BASE_CLASSES = Object.freeze([
  Object.freeze({ name: "Vanguard", subclasses: Object.freeze(["Juggernaut", "Reaver", "Warden"]) }),
  Object.freeze({ name: "Deadeye", subclasses: Object.freeze(["Longshot", "Gunslinger", "Demolitionist"]) }),
  Object.freeze({ name: "Ghost", subclasses: Object.freeze(["Phantom", "Blade Dancer", "Saboteur"]) }),
  Object.freeze({ name: "Cipher", subclasses: Object.freeze(["Intruder", "Puppeteer", "Handler"]) }),
  Object.freeze({ name: "Engineer", subclasses: Object.freeze(["Rigger", "Fabricator", "Architect"]) }),
  Object.freeze({ name: "Lifeline", subclasses: Object.freeze(["Trauma Tech", "Nanomedic", "Combat Responder"]) })
]);
export const RIPPERDOC = Object.freeze({
  name: "Ripperdoc", classPrerequisites: Object.freeze({ Engineer: 5, Lifeline: 5 }),
  abilityPrerequisites: Object.freeze({ Intelligence: 13, Wisdom: 13 }),
  toolProficiencies: Object.freeze(["medical tools", "engineering tools"]),
  toolNamesPending: true
});
export const TEST_BACKGROUNDS = Object.freeze([
  "Blockborn", "Corporate Exile", "Convoy Runner", "Contract Laborer", "Security Washout", "Clinic Hand",
  "Signal Pirate", "Syndicate Courier", "Street Journalist", "Scrap Diver", "Lab Subject", "Arcology Resident"
]);
