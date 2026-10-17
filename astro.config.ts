import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site: SITE.url,
  base,
  outDir: process.env.OUT_DIR || "./dist",
  compressHTML: true,
  vite: {
    build: {
      minify: "esbuild",
      cssMinify: true,
      sourcemap: false,
      reportCompressedSize: false,
    },
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
      defaultColor: false,
      wrap: false,
    },
  },
});
