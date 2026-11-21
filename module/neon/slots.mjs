/**
 * In-memory slot topology for the read-only prototype. No Foundry documents,
 * inventory, token appearance, or media are read or updated here.
 */
export const AUGMENTATION_CATEGORIES = Object.freeze([
  Object.freeze({ id: "force", label: "Force", color: "#D94D58", colorName: "Red" }),
  Object.freeze({ id: "mobility", label: "Mobility", color: "#E5A93E", colorName: "Amber" }),
  Object.freeze({ id: "interface", label: "Interface", color: "#36BBD8", colorName: "Cyan" }),
  Object.freeze({ id: "sensory", label: "Sensory", color: "#A27BE8", colorName: "Violet" }),
  Object.freeze({ id: "recovery", label: "Recovery", color: "#41B88A", colorName: "Green" }),
  Object.freeze({ id: "defense", label: "Defense", color: "#598BE4", colorName: "Blue" })
]);

export const EQUIPMENT_POSITIONS = Object.freeze([
  Object.freeze({ id: "head", label: "Head", capacity: 1 }),
  Object.freeze({ id: "face", label: "Face", capacity: 1 }),
  Object.freeze({ id: "body-armor", label: "Body Armor", capacity: 1 }),
  Object.freeze({ id: "tactical-rig", label: "Tactical Rig", capacity: 1 }),
  Object.freeze({ id: "back", label: "Back", capacity: 1 }),
  Object.freeze({ id: "left-hand", label: "Left Hand", capacity: 1 }),
  Object.freeze({ id: "right-hand", label: "Right Hand", capacity: 1 }),
  Object.freeze({ id: "sidearm-holster", label: "Sidearm Holster", capacity: 2 }),
  Object.freeze({ id: "long-gun-sling", label: "Long-Gun Sling", capacity: 1 }),
  Object.freeze({ id: "quick-access", label: "Quick-Access", capacity: 4 })
]);

const CATEGORIES = new Set(AUGMENTATION_CATEGORIES.map(category => category.id));

/** Copy the known prototype model so later mutations remain isolated.
 * @param {object} configuration Current configuration.
 * @returns {object} Independent copy.
 */
function copyConfiguration(configuration) {
  return {
    augmentationSlots: configuration.augmentationSlots.map(slot => ({
      ...slot, augmentation: slot.augmentation ? { ...slot.augmentation } : null
    })),
    equipmentPositions: configuration.equipmentPositions.map(position => ({ ...position })),
    attachmentSockets: configuration.attachmentSockets.map(socket => ({ ...socket }))
  };
}

/** Validate a stable identifier.
 * @param {unknown} value Candidate identifier.
 * @param {string} name Identifier description.
 * @returns {string} Valid identifier.
 */
function requiredId(value, name) {
  if ( (typeof value !== "string") || !value.trim() ) throw new TypeError(`${name} must be a nonempty string`);
  return value;
}

/**
 * Create a standalone, in-memory configuration. Expansion IDs are supplied
 * by the caller rather than inferred from an item's position in a list.
 * @param {object} [options] Prototype inputs.
 * @param {object[]} [options.expansionSlots] Item-owned slot definitions.
 * @param {object[]} [options.attachmentSockets] Equipment-owned sockets.
 * @returns {object} A new active configuration.
 */
export function createSlotConfiguration({ expansionSlots = [], attachmentSockets = [] } = {}) {
  const slots = AUGMENTATION_CATEGORIES.map(({ id }) => ({
    id: `body:${id}`, category: id, source: "body", ownerId: null, augmentation: null
  }));
  const ids = new Set(slots.map(slot => slot.id));
  for ( const slot of expansionSlots ) {
    requiredId(slot.id, "Slot ID");
    requiredId(slot.ownerId, "Cyberware owner ID");
    if ( !CATEGORIES.has(slot.category) ) throw new RangeError(`Unknown category: ${slot.category}`);
    if ( ids.has(slot.id) ) throw new Error(`Duplicate slot ID: ${slot.id}`);
    ids.add(slot.id);
    slots.push({ id: slot.id, category: slot.category, source: "cyberware", ownerId: slot.ownerId,
      augmentation: null });
  }
  const socketIds = new Set();
  const sockets = attachmentSockets.map(socket => {
    requiredId(socket.id, "Socket ID");
    requiredId(socket.ownerId, "Equipment owner ID");
    if ( socketIds.has(socket.id) || ids.has(socket.id) ) throw new Error(`Duplicate socket ID: ${socket.id}`);
    socketIds.add(socket.id);
    return { id: socket.id, ownerId: socket.ownerId, label: requiredId(socket.label, "Socket label") };
  });
  return { augmentationSlots: slots, equipmentPositions: EQUIPMENT_POSITIONS.map(position => ({ ...position })),
    attachmentSockets: sockets };
}

/**
 * Install one prototype augmentation in a particular empty, compatible slot.
 * @param {object} configuration Current configuration.
 * @param {string} slotId Exact destination slot.
 * @param {object} augmentation Example augmentation with id and category.
 * @returns {object} A new configuration.
 */
export function installAugmentation(configuration, slotId, augmentation) {
  requiredId(slotId, "Slot ID");
  requiredId(augmentation?.id, "Augmentation ID");
  if ( !CATEGORIES.has(augmentation.category) ) throw new RangeError("Unknown augmentation category");
  const target = configuration.augmentationSlots.find(slot => slot.id === slotId);
  if ( !target ) throw new Error("Augmentation slot not found");
  if ( target.category !== augmentation.category ) throw new Error("Augmentation category does not match slot");
  if ( target.augmentation ) throw new Error("Augmentation slot is occupied");
  if ( configuration.augmentationSlots.some(slot => slot.augmentation?.id === augmentation.id) ) {
    throw new Error("Augmentation is already installed");
  }
  const result = copyConfiguration(configuration);
  result.augmentationSlots.find(slot => slot.id === slotId).augmentation = {
    id: augmentation.id, category: augmentation.category
  };
  return result;
}

/**
 * Physically remove one Cyberware source from the active example configuration.
 * No disposition is assigned to detached augmentations.
 * @param {object} configuration Current configuration.
 * @param {string} ownerId Cyberware item ID.
 * @returns {object} New configuration and detached augmentations.
 */
export function removeCyberware(configuration, ownerId) {
  requiredId(ownerId, "Cyberware owner ID");
  const removed = configuration.augmentationSlots.filter(slot => slot.source === "cyberware" && slot.ownerId === ownerId);
  const result = copyConfiguration(configuration);
  result.augmentationSlots = result.augmentationSlots.filter(slot =>
    !(slot.source === "cyberware" && slot.ownerId === ownerId)
  );
  return {
    configuration: result,
    detachedAugmentations: removed.filter(slot => slot.augmentation)
      .map(slot => ({ ...slot.augmentation, slotId: slot.id }))
  };
}

/**
 * Assign an item to explicitly supplied physical positions in an isolated loadout.
 * The caller determines which positions an item needs; no item rules are inferred.
 * @param {object[]} assignments Existing assignments.
 * @param {object} item Assignment with itemId and distinct position IDs.
 * @returns {object[]} A new validated loadout.
 */
export function assignEquipment(assignments, item) {
  requiredId(item?.itemId, "Equipment item ID");
  if ( !Array.isArray(assignments) ) throw new TypeError("Assignments must be an array");
  if ( !Array.isArray(item.positions) || !item.positions.length ) {
    throw new Error("At least one position is required");
  }
  if ( new Set(item.positions).size !== item.positions.length ) throw new Error("Duplicate position on item");
  const positions = new Map(EQUIPMENT_POSITIONS.map(position => [position.id, position.capacity]));
  const occupancy = new Map();
  const itemIds = new Set();
  for ( const assignment of [...assignments, item] ) {
    requiredId(assignment?.itemId, "Equipment item ID");
    if ( itemIds.has(assignment.itemId) ) throw new Error("Duplicate item assignment");
    itemIds.add(assignment.itemId);
    if ( !Array.isArray(assignment.positions) || !assignment.positions.length
      || (new Set(assignment.positions).size !== assignment.positions.length) ) {
      throw new Error("Invalid position assignment");
    }
    for ( const position of assignment.positions ) {
      if ( !positions.has(position) ) throw new RangeError(`Unsupported equipment position: ${position}`);
      const count = (occupancy.get(position) ?? 0) + 1;
      if ( count > positions.get(position) ) throw new Error(`Equipment capacity exceeded: ${position}`);
      occupancy.set(position, count);
    }
  }
  return [...assignments, item].map(assignment => ({
    itemId: assignment.itemId, positions: [...assignment.positions]
  }));
}
