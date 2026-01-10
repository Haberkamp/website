// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel(),
  site: "https://www.haberkamp.dev",
  markdown: {
    shikiConfig: {
      theme:  'vitesse-light'
    }
  }
});