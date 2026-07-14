import { strict as assert } from "node:assert";
import { after, test } from "node:test";
import type { JobDeps } from "../jobs.js";
import { job } from "./gcp-metrics-pull.js";

const originalProjectId = process.env.GCP_INTEGRATION_PROJECT_ID;
const originalSecretsKey = process.env.AGENT_SECRETS_KEY;

after(() => {
  if (originalProjectId === undefined)
    Reflect.deleteProperty(process.env, "GCP_INTEGRATION_PROJECT_ID");
  else process.env.GCP_INTEGRATION_PROJECT_ID = originalProjectId;
  if (originalSecretsKey === undefined) Reflect.deleteProperty(process.env, "AGENT_SECRETS_KEY");
  else process.env.AGENT_SECRETS_KEY = originalSecretsKey;
});

test("the GCP metrics job stays disabled without the integration-secrets key", () => {
  process.env.GCP_INTEGRATION_PROJECT_ID = "superlog-observability";
  Reflect.deleteProperty(process.env, "AGENT_SECRETS_KEY");

  assert.equal(job.create({} as JobDeps), null);
});
