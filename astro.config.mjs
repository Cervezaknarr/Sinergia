import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://sinergiavalores.com",
  image: {
    domains: ["images.unsplash.com"],
  },
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
        },
      },
    }),
    starlight({
      title: "Sinergia Valores S.A",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Español",
          lang: "es",
        },
        es: {
          label: "Español",
          lang: "es",
        },
      },
      disable404Route: true,
      customCss: ["./src/styles/global.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
      },
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    react(),
  ],
  output: "server",

  adapter: vercel(),
});
