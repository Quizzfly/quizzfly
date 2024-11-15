import * as path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      VueDevTools(),
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['./src/api', './src/composables'],
      }),
    ],
    // server: {
    //     port: parseInt(process.env.VITE_PORT as string),
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/main.scss";`,
        },
      },
    },
  })
}
