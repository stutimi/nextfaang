import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    svgr(),
    react({
      include: "**/*.{jsx,tsx}",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
