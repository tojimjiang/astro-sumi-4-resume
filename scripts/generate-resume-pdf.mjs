import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = path.resolve("dist");
const output = path.join(root, "resume.pdf");
const chrome = process.env.CHROME_PATH || "google-chrome";
const base = (process.env.BASE_PATH || "/").replace(/^\/+|\/+$/g, "");
const prefix = base ? `/${base}` : "";
const url = `http://127.0.0.1:4178${prefix}/resume/`;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const withoutBase = prefix && pathname.startsWith(`${prefix}/`)
      ? pathname.slice(prefix.length)
      : pathname;
    const requested = path.resolve(root, `.${withoutBase === "/" ? "/index.html" : withoutBase}`);
    if (!requested.startsWith(root + path.sep) && requested !== root) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(requested);
    const file = info.isDirectory() ? path.join(requested, "index.html") : requested;
    response.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await new Promise((resolve) => server.listen(4178, "127.0.0.1", resolve));
try {
  await new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-pdf-header-footer",
      "--virtual-time-budget=3000",
      `--print-to-pdf=${output}`,
      url,
    ], { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`Chrome exited with code ${code}`)));
  });
  const pdfInfo = await stat(output);
  if (pdfInfo.size < 1000) throw new Error(`Generated PDF is unexpectedly small (${pdfInfo.size} bytes)`);
  console.log(`Generated ${output} (${pdfInfo.size} bytes)`);
} finally {
  server.close();
}
