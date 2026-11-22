import fs from "node:fs";
import path from "node:path";
import * as YAML from "js-yaml";
import { extractPack } from "@foundryvtt/foundryvtt-cli";

const root = "packs/_source";
const upstream = process.argv[2];
if ( !upstream ) throw new Error("Usage: node scripts/audit-core-versions.mjs <upstream packs/_source>");
const records = [];
const scan = (value, key = "$") => {
  if ( !value || typeof value !== "object" ) return [];
  const markers = value._stats?.coreVersion === "14.370" ? [{ path: key, id: value._id ?? null }] : [];
  for ( const [field, child] of Object.entries(value) ) {
    if ( field !== "_stats" ) markers.push(...scan(child, `${key}.${field}`));
  }
  return markers;
};
const walk = directory => {
  for ( const entry of fs.readdirSync(directory, { withFileTypes: true }) ) {
    const file = path.join(directory, entry.name);
    if ( entry.isDirectory() ) walk(file);
    else if ( /\.ya?ml$/i.test(file) ) {
      const data = YAML.load(fs.readFileSync(file, "utf8"));
      const markers = scan(data);
      if ( markers.length ) records.push({ file: path.relative(root, file).replaceAll("\\", "/"),
        id: data?._id ?? null, name: data?.name ?? null, markers });
    }
  }
};
walk(root);
let same = 0;
let different = 0;
let missing = 0;
for ( const record of records ) {
  const file = path.join(upstream, record.file);
  if ( !fs.existsSync(file) ) { missing++; continue; }
  const markers = scan(YAML.load(fs.readFileSync(file, "utf8")));
  if ( JSON.stringify(markers) === JSON.stringify(record.markers) ) same++;
  else different++;
}
const packs = {};
for ( const record of records ) {
  const pack = record.file.split("/")[0];
  packs[pack] ??= { files: 0, rootMarkers: 0, embeddedMarkers: 0 };
  packs[pack].files++;
  packs[pack].rootMarkers += record.markers.filter(marker => marker.path === "$").length;
  packs[pack].embeddedMarkers += record.markers.filter(marker => marker.path !== "$").length;
}
const packageAudit = {};
if ( process.argv[3] ) {
  for ( const pack of Object.keys(packs).sort() ) {
    const expected = new Map(records.filter(record => record.file.startsWith(`${pack}/`))
      .map(record => [record.id, record]));
    const found = [];
    await extractPack(path.join(process.argv[3], "packs", pack), path.join(process.argv[4] ?? "audit-output", pack), {
      transformEntry: entry => {
        if ( expected.has(entry._id) ) found.push({ id: entry._id, markers: scan(entry) });
        return false;
      }
    });
    const matches = found.filter(entry =>
      JSON.stringify(entry.markers) === JSON.stringify(expected.get(entry.id).markers));
    packageAudit[pack] = { expected: expected.size, found: found.length, markersMatch: matches.length };
  }
}
let serverLog = null;
if ( process.argv[5] ) {
  const lines = fs.readFileSync(process.argv[5], "utf8").trim().split(/\r?\n/).map(line => JSON.parse(line));
  const failures = lines.filter(line => line.message?.includes("Documents from a core version newer"));
  const keys = failures.map(line => {
    const id = line.message.match(/record \[([^\]]+)\]/)?.[1];
    const pack = line.message.match(/database "neon-requiem-dnd\.([^"]+)"/)?.[1];
    return `${pack}:${id}`;
  });
  const expected = new Set(records.map(record => `${record.file.split("/")[0]}:${record.id}`));
  serverLog = { failures: failures.length, uniqueDocuments: new Set(keys).size,
    sourceMatches: keys.filter(key => expected.has(key)).length, unmatched: keys.filter(key => !expected.has(key)) };
}
console.log(JSON.stringify({ files: records.length, packs, upstream: { same, different, missing },
  packageAudit, serverLog, records }, null, 2));
