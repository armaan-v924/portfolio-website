import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

import { VitePluginRadar } from "vite-plugin-radar"

export default defineConfig({
  plugins: [react(), svgr(),
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
})
