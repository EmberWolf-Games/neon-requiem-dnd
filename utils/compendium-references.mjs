/** Adapt references to packs that are actually bundled with this derivative.
 * The source data is retained unchanged; unrelated modules and unknown packs are untouched.
 * @param {unknown} value A compendium source value.
 * @param {Set<string>} localPacks The names of packs declared by the system manifest.
 * @returns {unknown} A copy with local pack UUIDs adapted.
 */
export function adaptCompendiumReferences(value, localPacks) {
  if ( typeof value === "string" ) {
    return value.replace(/Compendium\.dnd5e\.([\w-]+)(?=\.|\]|\}|$)/g, (match, pack) =>
      localPacks.has(pack) ? `Compendium.neon-requiem-dnd.${pack}` : match
    );
  }
  if ( Array.isArray(value) ) return value.map(entry => adaptCompendiumReferences(entry, localPacks));
  if ( value && (typeof value === "object") ) {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) =>
      [key, adaptCompendiumReferences(entry, localPacks)]
    ));
  }
  return value;
}
