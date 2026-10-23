import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const { redirects } = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".cfg": "application/octet-stream",
  ".bat": "application/octet-stream",
};

export const server = createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const redirect = redirects.find((rule) => rule.source === path);
    if (redirect) {
      response.writeHead(301, { Location: redirect.destination });
      response.end();
      return;
    }
    let file = resolve(root, "." + path);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    const info = await stat(file).catch(() => null);
    if (!info?.isFile()) file = resolve(root, "index.html");
    const data = await readFile(file);
    const headers = {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-cache",
    };
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Math.min(
        range[2] ? Number(range[2]) : data.length - 1,
        data.length - 1,
      );
      if (start > end || start >= data.length) {
        response.writeHead(416, { "Content-Range": `bytes */${data.length}` });
        response.end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${data.length}`,
        "Content-Length": end - start + 1,
      });
      response.end(
        request.method === "HEAD" ? undefined : data.subarray(start, end + 1),
      );
    } else {
      response.writeHead(200, { ...headers, "Content-Length": data.length });
      response.end(request.method === "HEAD" ? undefined : data);
    }
  } catch {
    response.writeHead(500);
    response.end("Build the site with npm run build before starting preview.");
  }
});

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const port = Number(process.env.PORT || 4173);
  server.listen(port, "127.0.0.1", () =>
    process.stdout.write(`Local: http://127.0.0.1:${port}\n`),
  );
}
