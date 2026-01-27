import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/seal/', // <-- github pages base path (repo name)
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
