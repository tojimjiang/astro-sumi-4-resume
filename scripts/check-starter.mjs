import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const forbidden = [
  "jimjiang.com",
  "Jim Jiang",
  "Flagler Health",
  "Ria Health",
  "tojimjiang",
  "sumi-site-src",
];
const textExtensions = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".webmanifest"]);
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else files.push(full);
  }
}
await walk(root);
const textFiles = files.filter((file) => textExtensions.has(path.extname(file)));
const problems = [];
for (const file of textFiles) {
  const content = await readFile(file, "utf8");
  for (const marker of forbidden) {
    if (content.toLowerCase().includes(marker.toLowerCase())) problems.push(`${path.relative(root, file)} contains personal marker: ${marker}`);
  }
}
const homepage = await readFile(path.join(root, "index.html"), "utf8");
const resume = await readFile(path.join(root, "resume", "index.html"), "utf8");
if (!resume.includes("Print / Save PDF")) problems.push("Resume page is missing its print action.");
if (!resume.includes("Download PDF")) problems.push("Resume page is missing its PDF download link.");

const email = process.env.EMAIL_ADDRESS || "";
const payloadMatch = homepage.match(/data-email-payload="([0-9a-f]+)"/i);
if (email) {
  if (!payloadMatch) problems.push("EMAIL_ADDRESS is set but the homepage has no email payload.");
  else {
    const payload = payloadMatch[1];
    const decoded = (payload.match(/.{2}/g) || []).map((pair, index) =>
      String.fromCharCode(parseInt(pair, 16) ^ ((index * 17 + 41) % 127)),
    ).join("");
    if (decoded !== email) problems.push("Email payload did not round-trip to EMAIL_ADDRESS.");
    if (homepage.includes(email)) problems.push("Plaintext email address leaked into generated homepage HTML.");
    if (!homepage.includes("Unlock email") || !homepage.includes("Compose email")) {
      problems.push("Email unlock markup is missing one of its two deliberate actions.");
    }
  }
} else if (payloadMatch || homepage.includes("Unlock email")) {
  problems.push("Email unlock should not render when EMAIL_ADDRESS is unset.");
}
if (problems.length) {
  console.error("Starter output validation failed:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log(`Starter output validated: ${files.length} files scanned; email ${email ? "payload round-trip passed" : "not configured"}.`);
