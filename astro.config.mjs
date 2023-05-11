import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bioinfoclass.com",
  integrations: [tailwind(), mdx(), image(), react(), sitemap()],
  adapter: vercel({}),
});
