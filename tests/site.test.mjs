import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { server } from "../scripts/preview.mjs";
import { detectLanguage, detectTheme } from "../src/app/preferences.ts";
import { regions, regionUrl, parseCounts } from "../src/app/regions.ts";
import { copy } from "../src/app/translations.ts";

let base;
before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
const json = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

test("language follows the preferred browser language and remembers an explicit choice", () => {
  for (const language of ["zh-CN", "zh-TW", "zh-HK", "ZH"])
    assert.equal(detectLanguage(undefined, [language]), "zh");
  assert.equal(detectLanguage(undefined, ["en-US", "zh-CN"]), "en");
  assert.equal(detectLanguage(undefined, ["fr-FR"]), "en");
  assert.equal(detectLanguage(undefined, []), "en");
  assert.equal(detectLanguage({ getItem: () => "en" }, ["zh-CN"]), "en");
  assert.equal(detectLanguage({ getItem: () => "zh" }, ["en-US"]), "zh");
  assert.equal(detectLanguage({ getItem: () => "invalid" }, ["zh-TW"]), "zh");
  assert.equal(
    detectLanguage(
      {
        getItem: () => {
          throw new Error("Storage blocked");
        },
      },
      ["zh-CN"],
    ),
    "zh",
  );
  assert.deepEqual(Object.keys(copy.en).sort(), Object.keys(copy.zh).sort());
  assert.ok(Object.values(copy.zh).every((text) => text.length > 0));
});

test("theme follows the system until the visitor chooses a palette", () => {
  assert.equal(detectTheme(undefined, true), "dark");
  assert.equal(detectTheme(undefined, false), "light");
  assert.equal(detectTheme({ getItem: () => "light" }, true), "light");
  assert.equal(detectTheme({ getItem: () => "dark" }, false), "dark");
  assert.equal(detectTheme({ getItem: () => "invalid" }, true), "dark");
  assert.equal(
    detectTheme(
      {
        getItem: () => {
          throw new Error("Storage blocked");
        },
      },
      false,
    ),
    "light",
  );
});

test("all active region links match the downloadable configurations", async () => {
  const regionData = await json("../public/regioninfo.json");
  const pluginText = await readFile(
    new URL("../public/at.duikbo.regioninstall.cfg", import.meta.url),
    "utf8",
  );
  const pluginRegions = JSON.parse(pluginText.match(/^Regions = (.+)$/m)[1]);
  assert.deepEqual(pluginRegions, regionData);
  const removed = pluginText.match(/^RemoveRegions = (.+)$/m)[1].split(",");
  for (const region of regions) {
    const configured = regionData.Regions.find(
      (item) => item.Name === region.serverName,
    );
    assert.ok(configured, region.serverName);
    assert.equal(configured.Servers[0].Ip, `https://${region.host}`);
    assert.ok(!removed.includes(region.serverName));
    const url = new URL(regionUrl(region));
    assert.equal(url.protocol, "amongus:");
    assert.equal(url.searchParams.get("servername"), configured.Name);
    assert.equal(url.searchParams.get("serverip"), configured.Servers[0].Ip);
    assert.equal(
      Number(url.searchParams.get("serverport")),
      configured.Servers[0].Port,
    );
    assert.equal(
      url.searchParams.get("usedtls"),
      String(configured.Servers[0].UseDtls),
    );
  }
});

test("status accepts actual counts including zero and rejects malformed data", () => {
  assert.deepEqual(parseCounts({ players: 0, games: 0 }), {
    players: 0,
    games: 0,
  });
  assert.deepEqual(parseCounts({ players: 25, games: 3 }), {
    players: 25,
    games: 3,
  });
  for (const data of [
    null,
    {},
    { players: -1, games: 0 },
    { players: "5", games: 2 },
    { players: 2, games: NaN },
    { players: 0.5, games: 0 },
  ]) {
    assert.throws(() => parseCounts(data));
  }
});

test("all 15 policy sections are present in each language", async () => {
  const policy = await json("../src/app/policy-data.json");
  for (const language of ["en", "zh"]) {
    assert.deepEqual(
      policy[language].map((section) => section.number),
      Array.from({ length: 15 }, (_, i) => i + 1),
    );
    assert.ok(
      policy[language].every(
        (section) => section.title && section.html.includes("<p>"),
      ),
    );
  }
});

test("Netlify and Vercel redirects agree and the preview returns actual redirects", async () => {
  const vercel = await json("../vercel.json");
  const lines = (
    await readFile(new URL("../public/_redirects", import.meta.url), "utf8")
  )
    .trim()
    .split(/\r?\n/);
  const netlify = lines
    .filter((line) => !line.startsWith("/*"))
    .map((line) => line.split(/\s+/));
  assert.equal(netlify.length, vercel.redirects.length);
  for (const rule of vercel.redirects) {
    assert.ok(
      netlify.some(
        ([from, to, status]) =>
          from === rule.source && to === rule.destination && status === "301!",
      ),
    );
    const response = await fetch(base + rule.source, { redirect: "manual" });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), rule.destination);
  }
});

test("built assets retain their original content instead of receiving the SPA fallback", async () => {
  for (const file of [
    "regioninfo.json",
    "Setup_Custom_Server.bat",
    "at.duikbo.regioninstall.cfg",
    "mobile_guide.webm",
    "win-run.png",
    "fonts/ibm-plex-sans-latin.woff2",
  ]) {
    const response = await fetch(`${base}/${file}`);
    assert.equal(response.status, 200, file);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.deepEqual(
      bytes,
      await readFile(new URL(`../public/${file}`, import.meta.url)),
      file,
    );
    assert.notEqual(
      response.headers.get("content-type"),
      "text/html; charset=utf-8",
    );
  }
  const built = await readdir(new URL("../dist", import.meta.url));
  assert.ok(built.some((file) => /^main-.*\.js$/.test(file)));
  const fallback = await fetch(`${base}/some/deep/link`);
  assert.match(await fallback.text(), /<niko-app>/);
  const videoRange = await fetch(`${base}/mobile_guide.webm`, {
    headers: { Range: "bytes=0-99" },
  });
  assert.equal(videoRange.status, 206);
  assert.equal((await videoRange.arrayBuffer()).byteLength, 100);
});
