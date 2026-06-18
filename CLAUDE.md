@AGENTS.md

# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 常用命令

```bash
pnpm dev          # 启动开发服务器，访问 localhost:3000（使用 Turbopack）
pnpm build        # 生产环境构建
pnpm start        # 启动生产服务器
pnpm lint         # 运行 ESLint v9（扁平配置：eslint.config.mjs）
```

当前尚未配置测试框架。

## 架构概览

这是一个基于 **Next.js 16 的博客**，使用 App Router（Turbopack 打包、Tailwind CSS v4、TypeScript、React 19）。

### 样式方案

- **Tailwind CSS v4** — CSS 中使用 `@import "tailwindcss"`（而非 v3 的 `@tailwind` 指令）。主题变量通过 `@theme inline` 定义。
- **PostCSS** 通过 `postcss.config.mjs` 配合 `@tailwindcss/postcss` 插件使用。
- Geist Sans 和 Geist Mono 字体通过根布局中的 `next/font/google` 加载。
- 通过 `prefers-color-scheme` 支持暗色模式。
- `<html lang="zh-CN">` — 这是一个中文博客。

### MDX 博客管线

博客文章存放在 `content/blog/*.mdx` 中，使用 YAML 前置元数据（通过 `gray-matter` 解析）。两层机制协同工作：

1. **`lib/mdx.ts`** — 在构建期使用 `fs` + `gray-matter` 从 `content/blog/` 读取 `.mdx` 文件。导出 `getAllPosts()`（获取所有文章，包含 slug/元数据/内容）和 `getPostBySlug(slug)`。

2. **`next-mdx-remote/rsc`** — 在服务端渲染 MDX 内容。来自该包的 `MDXRemote` 组件在博客详情页中将原始 MDX 字符串转换为 React。

### 路由结构

| 路由 | 文件 | 用途 |
|---|---|---|
| `/` | `app/page.tsx` | 首页，含博客链接 |
| `/blog` | `app/blog/page.tsx` | 文章列表（调用 `getAllPosts`） |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | 文章详情（调用 `getPostBySlug` + `MDXRemote`） |

### Next.js 16 关键差异

- `params` 是一个 **Promise** — 必须 await（`const { slug } = await params`）。
- `searchParams` 同样是一个 Promise。
- 默认打包工具为 Turbopack；不存在 webpack 配置。
- Next.js 16 文档位于 `node_modules/next/dist/docs/`。

### MDX 双重配置说明

项目同时使用 **`@next/mdx`**（用于 `.mdx` 页面扩展支持）和 **`next-mdx-remote`**（用于从文件内容运行时渲染 MDX）。`@next/mdx` 插件在 `next.config.ts` 中配置，用于解析 `.mdx` 导入。实际的博客渲染使用 `next-mdx-remote` 配合 `gray-matter` 进行前置元数据解析。

### 添加博客文章

1. 在 `content/blog/<slug>.mdx` 中创建文件，填入前置元数据（`title`、`date`、`tags`）。
2. 完成 — `getAllPosts()` 和 `generateStaticParams()` 会自动发现新文章。
