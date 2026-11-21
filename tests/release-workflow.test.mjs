import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflowPath = path.join(root, ".github", "workflows", "release.yml");
const workflow = load(fs.readFileSync(workflowPath, "utf8"));
const releaseInputs = workflow.on.workflow_dispatch.inputs;

test("serializes release runs and never cancels an active publication", () => {
  assert.equal(workflow.concurrency.group, "neon-requiem-release");
  assert.equal(workflow.concurrency["cancel-in-progress"], false);
  assert.equal(workflow.permissions.contents, "read");
  assert.equal(workflow.jobs.publish.permissions.contents, "write");
});

test("requires Foundry and provenance confirmations before publication", () => {
  const confirmations = [
    "foundry_smoke_test_passed",
    "foundry_version_comparison_verified",
    "asset_provenance_reviewed"
  ];
  const validationStep = workflow.jobs["validate-and-package"].steps.find(step => step.id === "release-metadata");

  for ( const name of confirmations ) {
    assert.equal(releaseInputs[name].required, true);
    assert.equal(releaseInputs[name].default, false);
  }
  assert.match(validationStep.run, /FOUNDRY_SMOKE_TEST_PASSED/);
  assert.match(validationStep.run, /FOUNDRY_VERSION_COMPARISON_VERIFIED/);
  assert.match(validationStep.run, /ASSET_PROVENANCE_REVIEWED/);
});
