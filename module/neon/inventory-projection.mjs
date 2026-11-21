/** Project explicitly visible, sanitized embedded-item snapshots without writes.
 * @param {object[]} snapshot Sanitized item snapshots.
 * @returns {object[]} Independent display records.
 */
export function projectInventory(snapshot) {
  if ( !Array.isArray(snapshot) ) return [];
  const seen = new Set();
  const items = [];
  for ( const item of snapshot ) {
    if ( !item || item.visible !== true || typeof item.id !== "string" || !item.id.trim()
      || typeof item.name !== "string" || !item.name.trim() || seen.has(item.id) ) continue;
    seen.add(item.id);
    items.push({
      id: item.id,
      name: item.name,
      type: typeof item.type === "string" && item.type.trim() ? item.type : "other",
      containerId: typeof item.containerId === "string" ? item.containerId : null,
      quantity: Number.isFinite(item.quantity) && item.quantity >= 0 ? item.quantity : null,
      equipped: typeof item.equipped === "boolean" ? item.equipped : null
    });
  }
  const containers = new Map(items.filter(item => item.type === "container").map(item => [item.id, item.name]));
  for ( const item of items ) {
    item.containerName = containers.get(item.containerId) ?? null;
    delete item.containerId;
  }
  return items.sort((a, b) => a.name.localeCompare(b.name, "en") || a.id.localeCompare(b.id, "en"));
}
