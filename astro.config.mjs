import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), image(), react()],
  adapter: vercel({})
});