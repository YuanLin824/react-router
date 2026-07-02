# React Router 全栈模板

基于 React Router v8 (SSR 模式) 的全栈应用模板，集成 TypeScript、Tailwind CSS v4、PostgreSQL、Redis 等现代技术栈，开箱即用。

## 技术栈

| 类别         | 技术                                        |
| ------------ | ------------------------------------------- |
| **框架**     | React Router v8 (SSR) + React 19            |
| **构建**     | Vite 8 + `@react-router/dev`                |
| **语言**     | TypeScript 5 (strict, ES2022)               |
| **样式**     | Tailwind CSS v4 + `next-themes` (亮/暗主题) |
| **数据库**   | PostgreSQL 16                               |
| **缓存**     | Redis 7                                     |
| **代码质量** | ESLint 10 + Prettier 3 + Husky              |
| **提交规范** | Conventional Commits (commitlint + czg)     |
| **容器化**   | Docker Compose (开发) + Dockerfile (生产)   |

## 快速开始

### 前置要求

- **Node.js** >= 22
- **npm** >= 10
- **Docker Desktop** (可选，用于本地 PostgreSQL + Redis)

### 安装

```bash
npm install
```

### 启动开发环境

```bash
# 1. 启动基础设施 (PostgreSQL + Redis)
npm run docker

# 2. 启动开发服务器
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`。

### 生产构建

```bash
npm run build
npm run start
```

## 项目结构

```
react-router/
├── app/                          # 应用源码
│   ├── routes.ts                 # 路由配置 (flat routes)
│   ├── root.tsx                  # 根布局 (ThemeProvider + ErrorBoundary)
│   ├── app.css                   # Tailwind 入口 + CSS 变量设计 token
│   ├── routes/                   # 路由模块
│   │   └── home.tsx              # 首页 (/)
│   └── libs/
│       └── utils.ts              # cn() 工具函数 (clsx + tailwind-merge)
├── docker/                       # Docker 初始化脚本
│   ├── postgres.sh               # PostgreSQL 初始化
│   └── redis.sh                  # Redis 初始化
├── public/                       # 静态资源
├── docker-compose.yml            # 开发环境 Docker Compose 配置
├── Dockerfile                    # 生产环境多阶段构建
├── react-router.config.ts        # React Router 配置
├── vite.config.ts                # Vite 配置 (含 Tailwind 插件)
├── tsconfig.json                 # TypeScript 配置
├── eslint.config.mjs             # ESLint 配置
├── .prettierrc.cjs               # Prettier 配置
├── commitlint.config.cjs         # Commitlint + czg 配置
├── .editorconfig                 # 编辑器统一配置
├── .env                          # 服务端环境变量 (JWT 等)
├── .env.development              # 开发环境变量 (数据库连接)
└── .env.production               # 生产环境变量 (数据库连接)
```

## 可用脚本

| 命令                 | 说明                                     |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | 启动 Vite 开发服务器 (HMR)               |
| `npm run build`      | 生产构建 (客户端 + 服务端)               |
| `npm run start`      | 运行生产构建产物 (`react-router-serve`)  |
| `npm run typecheck`  | 生成路由类型定义 + TypeScript 类型检查   |
| `npm run lint`       | 全量 ESLint 检查                         |
| `npm run format`     | Prettier 格式化 `./app` 目录             |
| `npm run format:all` | Prettier 格式化整个项目                  |
| `npm run docker`     | 启动 Docker Compose (PostgreSQL + Redis) |
| `npm run commit`     | 交互式提交 (czg，含 emoji 提示)          |

## 环境变量

### `.env` — 服务端专用 (仅 Node.js 可访问)

| 变量名                   | 说明                 | 默认值                  |
| ------------------------ | -------------------- | ----------------------- |
| `JWT_SECRET_KEY`         | JWT 签名密钥         | `jwt-access-secret-key` |
| `JWT_EXPIRES_IN`         | Access Token 有效期  | `15m`                   |
| `JWT_REFRESH_EXPIRES_IN` | Refresh Token 有效期 | `7d`                    |
| `AUTH_MAX_DEVICES`       | 最大登录设备数       | `5`                     |

### `.env.development` / `.env.production` — 数据库连接

| 变量名              | 说明              | 开发默认值        |
| ------------------- | ----------------- | ----------------- |
| `POSTGRES_HOST`     | PostgreSQL 主机   | `localhost`       |
| `POSTGRES_PORT`     | PostgreSQL 端口   | `20031`           |
| `POSTGRES_USERNAME` | PostgreSQL 用户名 | `react_router`    |
| `POSTGRES_PASSWORD` | PostgreSQL 密码   | `postgres123`     |
| `POSTGRES_DATABASE` | PostgreSQL 数据库 | `react_router_db` |
| `REDIS_HOST`        | Redis 主机        | `localhost`       |
| `REDIS_PORT`        | Redis 端口        | `20032`           |
| `REDIS_USERNAME`    | Redis 用户名      | `react_router`    |
| `REDIS_PASSWORD`    | Redis 密码        | `redis123`        |
| `REDIS_DB`          | Redis 数据库编号  | `0`               |
| `REDIS_KEY_PREFIX`  | Redis Key 前缀    | `react_router:`   |

## Docker 部署

### 开发环境

```bash
# 启动 PostgreSQL 16 + Redis 7
npm run docker

# 查看运行状态
docker compose ps

# 停止服务
docker compose down
```

Docker Compose 会自动创建两个数据卷 (`postgres_data`, `redis_data`) 持久化数据，并执行 `docker/` 目录下的初始化脚本创建应用数据库和用户。

### 生产环境

项目包含一个多阶段构建的 `Dockerfile`：

```bash
# 构建镜像
docker build -t react-router-app .

# 运行容器
docker run -p 3000:3000 --env-file .env.production react-router-app
```

## 路径别名

`~/` 映射到 `./app/`，在 `tsconfig.json` 和 `vite.config.ts` 中统一配置。

```typescript
import { cn } from "~/libs/utils"
```

## 代码规范

- **格式化**: Prettier (`printWidth: 100`, 无分号, 双引号, ES5 尾逗号)，集成 `organize-imports`、`packagejson`、`tailwindcss`、`css-order` 插件
- **提交**: Conventional Commits，支持 `feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `chore` / `revert` / `build` / `ci` / `types` 等类型
- **Git Hooks**: Husky 管理，pre-commit 自动格式化，commit-msg 校验提交信息
- **编辑器**: `.editorconfig` 统一缩进/换行/编码设置

## 许可

MIT License — 详见 [LICENSE](./LICENSE)
