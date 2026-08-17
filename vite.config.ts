import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // Relative asset URLs work for both user and project GitHub Pages sites.
  base: "./",
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  build: {
    outDir: "dist",
  },
});
