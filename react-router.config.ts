import type { Config } from "@react-router/dev/config"

export default {
  // Config options...

  // 自动将路由模块拆分为更小的 chunk (默认 true)
  // splitRouteModules: true,

  // 或强制要求所有路由都可拆分
  // splitRouteModules: "enforce",

  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config
