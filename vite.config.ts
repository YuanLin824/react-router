import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"

export default defineConfig((envConfig) => {
  const env = loadEnv(envConfig.mode, __dirname)
  console.log(env)

  return {
    plugins: [
      // 集成 tailwindcss
      tailwindcss(),
      reactRouter(),
    ],

    // 路径
    resolve: { tsconfigPaths: true },

    // 打包优化
    build: {
      // 启用压缩 (默认 true, 生产环境自动开启)
      // minify: true,

      // 或指定压缩器: 'esbuild' | 'terser' | false
      // minify: 'terser',

      // 如需 terser 额外配置, 需先安装 terser
      // terserOptions: { ... }

      // target: "es2022",

      rolldownOptions: {
        output: {
          entryFileNames: "js/[name]_[hash].js",
          chunkFileNames: "js/[name]_[hash].js",
          assetFileNames: "[ext]/[name]_[hash].[ext]",
        },
      },
    },
  }
})
