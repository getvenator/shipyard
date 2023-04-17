import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint"
import { resolve } from 'path'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Shipyard',
      fileName: 'shipyard',
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom"
      ],
      output: {
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
        }
      }
    }
  }
})
