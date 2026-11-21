import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isDerivativeMigrationVersion, registerLegacyFlagScope } from "../module/neon-compatibility.mjs";

test("preserves existing active scopes and registers the inherited namespace once", () => {
  const scopes = ["core", "world", "neon-requiem-dnd"];
  const database = { getFlagScopes: () => scopes };
  registerLegacyFlagScope(database);
  registerLegacyFlagScope(database);
  assert.deepEqual(scopes, ["core", "world", "neon-requiem-dnd", "dnd5e"]);
});

test("distinguishes derivative versions from upstream migration versions", () => {
  assert.equal(isDerivativeMigrationVersion("0.1.1.000"), true);
  assert.equal(isDerivativeMigrationVersion("0.2.3.009"), true);
  assert.equal(isDerivativeMigrationVersion("6.1.1"), false);
  assert.equal(isDerivativeMigrationVersion("0.1.1.00"), false);
  assert.equal(isDerivativeMigrationVersion(undefined), false);
});

test("adapted configuration UUIDs target packs in the system manifest", () => {
  const manifest = JSON.parse(readFileSync(new URL("../system.json", import.meta.url), "utf8"));
  const packs = new Set(manifest.packs.map(pack => pack.name));
  for ( const file of ["config.mjs", "config-legacy.mjs", "module-registration.mjs"] ) {
    const source = readFileSync(new URL(`../module/${file}`, import.meta.url), "utf8");
    for ( const [, pack] of source.matchAll(/Compendium\.neon-requiem-dnd\.([\w-]+)/g) ) {
      assert.ok(packs.has(pack), `${file} refers to missing pack ${pack}`);
    }
    assert.doesNotMatch(source, /Compendium\.dnd5e\./);
  }
});
