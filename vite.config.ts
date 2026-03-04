import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

import { VitePluginRadar } from "vite-plugin-radar"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePluginRadar({
      analytics: {
        id: "G-P0S724ZBJ6"
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Keep output compatible with older Firefox versions.
    target: "es2020",
    cssTarget: "firefox115",
  },
})
