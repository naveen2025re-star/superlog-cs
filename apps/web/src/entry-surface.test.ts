import assert from "node:assert/strict";
import test from "node:test";
import { surfaceForPath } from "./entry-surface.ts";

test("marketing and product URLs boot independent client surfaces", () => {
  for (const path of [
    "/",
    "/pricing",
    "/blog",
    "/blog/update",
    "/team",
    "/missing-page",
    "/application",
    "/activation",
    "/designer",
  ]) {
    assert.equal(surfaceForPath(path), "marketing", path);
  }

  for (const path of [
    "/app",
    "/app/org/acme/project/default/incidents",
    "/org/acme/project/default/incidents",
    "/activate",
    "/accept-invitation",
    "/oauth/consent",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/connect/vercel",
    "/feedback/pr/acme/repo/1",
    "/design",
  ]) {
    assert.equal(surfaceForPath(path), "product", path);
  }
});

test("the legacy GitHub installation callback still boots the product surface", () => {
  assert.equal(surfaceForPath("/", "?installation_id=123&state=signed"), "product");
  assert.equal(surfaceForPath("/", "?installation_id=123"), "marketing");
});
