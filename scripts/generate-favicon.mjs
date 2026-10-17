import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";

const config = await readFile(new URL("../src/config.ts", import.meta.url), "utf8");
const authorBlock = config.match(/export const AUTHOR = \{([\s\S]*?)\} as const;/)?.[1];
const faviconText = authorBlock?.match(/favicon:\s*"([^"]*)"/)?.[1]?.trim();

if (!faviconText) {
  throw new Error('Set AUTHOR.favicon in src/config.ts to the short text you want in your favicon.');
}
if (faviconText.length > 3) {
  throw new Error("AUTHOR.favicon should be 1–3 characters so the favicon remains legible.");
}

// Use a known cursive font and convert its glyphs into SVG paths. The final
// favicon does not depend on fonts installed on the visitor's device.
const fontUrl = "https://raw.githubusercontent.com/google/fonts/main/ofl/dancingscript/DancingScript%5Bwght%5D.ttf";
const response = await fetch(fontUrl);
if (!response.ok) {
  throw new Error("Unable to download the Dancing Script font (" + response.status + ").");
}
const fontData = await response.arrayBuffer();

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        width: "64px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        backgroundColor: "#faf8f5",
        color: "#1a1a1a",
        fontFamily: "Dancing Script",
        fontSize: faviconText.length === 1 ? "38px" : faviconText.length === 2 ? "30px" : "23px",
        fontWeight: 600,
        lineHeight: 1,
      },
      children: faviconText,
    },
  },
  {
    width: 64,
    height: 64,
    fonts: [{ name: "Dancing Script", data: fontData, weight: 600, style: "normal" }],
  },
);

if (!svg.includes("<path")) {
  throw new Error("Generated favicon SVG did not contain path outlines; refusing to write a font-dependent favicon.");
}

await writeFile(new URL("../dist/favicon.svg", import.meta.url), svg);
console.log('Generated self-contained dist/favicon.svg from Dancing Script paths using AUTHOR.favicon="' + faviconText + '".');
