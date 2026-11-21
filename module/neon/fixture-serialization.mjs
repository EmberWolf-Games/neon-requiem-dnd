/** Fixture-only candidate encoding. This module never accesses Foundry or writes documents. */
import { AUGMENTATION_CATEGORIES, EQUIPMENT_POSITIONS } from "./slots.mjs";

const validId = value => typeof value === "string" && value.trim().length > 0;
const categories = new Set(AUGMENTATION_CATEGORIES.map(category => category.id));
const positions = new Map(EQUIPMENT_POSITIONS.map(position => [position.id, position.capacity]));

/** Validate a proposed JSON fixture without discarding the supplied input.
 * @param {object} value Candidate JSON fixture.
 * @returns {string[]} Human-readable validation errors.
 */
export function validateFixture(value) {
  const errors = [];
  if ( !value || typeof value !== "object" || Array.isArray(value) ) return ["Fixture must be an object"];
  if ( value.schemaVersion !== 1 ) errors.push("Unsupported schema version");
  if ( !validId(value.actorId) ) errors.push("Missing actor ID");
  if ( !Array.isArray(value.ownedItemIds) || !Array.isArray(value.assignments)
    || !Array.isArray(value.slots) || !Array.isArray(value.attachments) ) return [...errors, "Missing required arrays"];
  const owned = new Set();
  for ( const id of value.ownedItemIds ) {
    if ( !validId(id) || owned.has(id) ) errors.push("Invalid or duplicate owned item ID");
    owned.add(id);
  }
  const assigned = new Set();
  const counts = new Map();
  for ( const assignment of value.assignments ) {
    if ( !assignment || !owned.has(assignment.itemId) || assigned.has(assignment.itemId) ) {
      errors.push("Unknown or duplicate assigned item");
      continue;
    }
    assigned.add(assignment.itemId);
    if ( !Array.isArray(assignment.positions) || !assignment.positions.length
      || new Set(assignment.positions).size !== assignment.positions.length ) {
      errors.push("Invalid positions");
      continue;
    }
    for ( const position of assignment.positions ) {
      const count = (counts.get(position) ?? 0) + 1;
      counts.set(position, count);
      if ( !positions.has(position) || count > positions.get(position) ) errors.push("Unknown or full position");
    }
  }
  const slotIds = new Set();
  const bodyCategories = new Set();
  const occupants = new Set();
  for ( const slot of value.slots ) {
    if ( !slot || !validId(slot.id) || slotIds.has(slot.id) ) { errors.push("Invalid or duplicate slot ID"); continue; }
    slotIds.add(slot.id);
    if ( !categories.has(slot.category) ) errors.push("Unknown slot category");
    if ( slot.source === "body" ) {
      if ( slot.ownerId !== null || bodyCategories.has(slot.category) ) errors.push("Invalid body slot ownership");
      bodyCategories.add(slot.category);
    } else if ( slot.source !== "cyberware" || !owned.has(slot.ownerId) ) errors.push("Unknown Cyberware owner");
    if ( slot.occupant !== null ) {
      const occupant = slot.occupant;
      if ( !occupant || !owned.has(occupant.itemId) || occupant.category !== slot.category
        || occupants.has(occupant.itemId) ) errors.push("Invalid augmentation occupant");
      else occupants.add(occupant.itemId);
    }
  }
  if ( bodyCategories.size !== categories.size || [...categories].some(category => !bodyCategories.has(category)) ) {
    errors.push("Six body categories required");
  }
  const attachmentIds = new Set();
  const sockets = new Set();
  for ( const relation of value.attachments ) {
    const socketKey = relation ? JSON.stringify([relation.ownerId, relation.socketId]) : "";
    if ( !relation || !validId(relation.socketId) || !owned.has(relation.ownerId) || !owned.has(relation.itemId)
      || relation.ownerId === relation.itemId || attachmentIds.has(relation.itemId) || sockets.has(socketKey) ) {
      errors.push("Invalid attachment");
    } else { attachmentIds.add(relation.itemId); sockets.add(socketKey); }
  }
  return errors;
}

/** Produce an isolated dry-run with a reversible before snapshot, or preserve input on failure.
 * @param {object} before Original fixture.
 * @param {object} proposed Proposed fixture.
 * @returns {object} Dry-run result and untouched snapshots.
 */
export function previewFixtureChange(before, proposed) {
  const errors = [...validateFixture(before).map(e => `Before: ${e}`),
    ...validateFixture(proposed).map(e => `Proposed: ${e}`)];
  if ( errors.length ) return { ok: false, errors };
  return { ok: true, before: structuredClone(before), after: structuredClone(proposed),
    changed: JSON.stringify(before) !== JSON.stringify(proposed) };
}

/** Encode only valid plain fixtures in deterministic key order.
 * @param {object} fixture Candidate.
 * @returns {string} Encoded fixture.
 */
export function encodeFixture(fixture) {
  const errors = validateFixture(fixture);
  if ( errors.length ) throw new Error(errors.join("; "));
  const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object"
    ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
  return JSON.stringify(canonical(fixture));
}

/** Decode and validate fixture JSON; invalid input is never modified.
 * @param {string} json JSON string.
 * @returns {object} Validated fixture.
 */
export function decodeFixture(json) {
  const result = JSON.parse(json);
  const errors = validateFixture(result);
  if ( errors.length ) throw new Error(errors.join("; "));
  return result;
}

/** Remap a clone fixture explicitly; IDs without a supplied mapping fail closed.
 * @param {object} fixture Original fixture.
 * @param {string} actorId New actor ID.
 * @param {object} itemIds Old to new owned item ID mapping.
 * @returns {object} Independent validated fixture.
 */
export function remapFixture(fixture, actorId, itemIds) {
  const copy = decodeFixture(encodeFixture(fixture));
  if ( !validId(actorId) || !itemIds || typeof itemIds !== "object" ) throw new Error("Invalid remap");
  const remap = id => {
    if ( !Object.hasOwn(itemIds, id) || !validId(itemIds[id]) ) throw new Error(`Missing remap for ${id}`);
    return itemIds[id];
  };
  copy.actorId = actorId;
  copy.ownedItemIds = copy.ownedItemIds.map(remap);
  for ( const assignment of copy.assignments ) assignment.itemId = remap(assignment.itemId);
  for ( const slot of copy.slots ) {
    if ( slot.source === "cyberware" ) slot.ownerId = remap(slot.ownerId);
    if ( slot.occupant ) slot.occupant.itemId = remap(slot.occupant.itemId);
  }
  for ( const attachment of copy.attachments ) {
    attachment.ownerId = remap(attachment.ownerId);
    attachment.itemId = remap(attachment.itemId);
  }
  const errors = validateFixture(copy);
  if ( errors.length ) throw new Error(errors.join("; "));
  return copy;
}
