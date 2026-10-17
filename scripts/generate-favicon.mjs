import { readFile, writeFile } from "node:fs/promises";

const config = await readFile(new URL("../src/config.ts", import.meta.url), "utf8");
const authorBlock = config.match(/export const AUTHOR = \{([\s\S]*?)\} as const;/)?.[1];
const faviconText = authorBlock?.match(/favicon:\s*"([^"]*)"/)?.[1]?.trim();

if (!faviconText) {
  throw new Error('Set AUTHOR.favicon in src/config.ts to the short text you want in your favicon.');
}

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const text = escapeXml(faviconText);
const fontSize = faviconText.length > 2 ? 17 : faviconText.length === 2 ? 21 : 26;
const svg = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
  '  <style>',
  '    .paper { fill: #faf8f5 }',
  '    .ink { fill: #1a1a1a }',
  '    @media (prefers-color-scheme: dark) {',
  '      .paper { fill: #0b0c0e }',
  '      .ink { fill: #e9e7e1 }',
  '    }',
  '  </style>',
  '  <rect class="paper" width="64" height="64" rx="12" />',
  '  <text class="ink" x="32" y="44" text-anchor="middle"',
  '    font-family="Segoe Script, Brush Script MT, URW Chancery L, cursive"',
  '    font-size="' + fontSize + '" font-style="italic" font-weight="600">' + text + '</text>',
  '</svg>',
  '',
].join("\n");

await writeFile(new URL("../dist/favicon.svg", import.meta.url), svg);
console.log('Generated dist/favicon.svg with favicon text "' + faviconText + '".');
