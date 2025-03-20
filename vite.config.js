import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/project-incense/" : "/",
  plugins: [react()],
  // 不顯示 css 的衝突錯誤
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "color-functions",
          "global-builtin",
          "import",
          "mixed-decls"
        ],
      },
    },
  },
});