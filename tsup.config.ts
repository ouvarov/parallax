import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
  sourcemap: false,
  target: "es2020",
  external: ["react", "react/jsx-runtime"],
});
