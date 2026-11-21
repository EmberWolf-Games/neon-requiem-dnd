/** Register the inherited flag namespace in Foundry's active flag scopes.
 * @param {object} database The Foundry client database backend.
 */
export function registerLegacyFlagScope(database) {
  const scopes = database.getFlagScopes();
  if ( !scopes.includes("dnd5e") ) scopes.push("dnd5e");
}

/** Distinguish Neon Requiem's four-part versions from upstream migration versions.
 * @param {unknown} version The stored migration version.
 * @returns {boolean} Whether the value follows the derivative's version format.
 */
export function isDerivativeMigrationVersion(version) {
  return typeof version === "string" && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)\.\d{3}$/.test(version);
}
