import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "solar-logo-ticker.ts"),
      formats: ["es"],
      fileName: () => "solar-logo-ticker.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    minify: "terser",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
