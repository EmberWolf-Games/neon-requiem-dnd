import CharacterActorSheet from "./character-sheet.mjs";
import { filterVisibleInventory, groupInventory, projectInventory } from "../../neon/inventory-projection.mjs";

/** Opt-in presentation; retains inherited character actions and actor schema. */
export default class NeonCharacterSheet extends CharacterActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = { classes: ["neon-character-sheet"] };

  /** @override */
  static PARTS = {
    ...super.PARTS,
    inventory: {
      ...super.PARTS.inventory,
      template: "systems/neon-requiem-dnd/templates/actors/tabs/neon-character-inventory.hbs"
    }
  };

  /** @inheritDoc */
  async _prepareInventoryContext(context, options) {
    context = await super._prepareInventoryContext(context, options);
    const snapshot = Array.from(this.actor.items, item => ({
      id: item.id, name: item.name, type: item.type,
      visible: item.visible === true, physical: item.system?.isPhysical === true,
      sheetVisible: this._isItemVisible(item), isOwner: item.isOwner === true, identified: item.system?.identified,
      quantity: item.system?.quantity, equipped: item.system?.equipped, containerId: item.system?.container
    }));
    context.neonOwnedGroups = groupInventory(projectInventory(filterVisibleInventory(snapshot)));
    return context;
  }
}
