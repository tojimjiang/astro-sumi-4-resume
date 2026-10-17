import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

export default defineConfig({
  site: SITE.url,
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
