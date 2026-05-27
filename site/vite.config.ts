import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/scroll-parallax/",
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@ouvarov\/parallax\/style\.css$/, replacement: resolve(__dirname, "../style.css") },
      { find: /^@ouvarov\/parallax$/, replacement: resolve(__dirname, "../src/index.ts") },
    ],
  },
  build: {
    outDir: resolve(__dirname, "../docs"),
    emptyOutDir: true,
  },
});
