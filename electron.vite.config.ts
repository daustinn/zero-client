import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@const': resolve('src/const'),
        '@utils': resolve('src/utils'),
        '@types': resolve('src/types'),
        '@database': resolve('src/main/database')
      }
    },
    assetsInclude: ['**/*.sql']
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@const': resolve('src/const'),
        '@utils': resolve('src/utils'),
        '@types': resolve('src/types')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@const': resolve('src/const'),
        '@main': resolve('src/main'),
        '@utils': resolve('src/utils'),
        '@types': resolve('src/types')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
