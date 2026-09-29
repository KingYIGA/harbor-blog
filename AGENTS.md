<!-- BEGIN:nextjs-agent-rules -->
# 这不是你认识的 Next.js

当前版本有破坏性变更 — API、约定和文件结构都可能与你训练数据中的不同。在编写任何代码之前，请先阅读 `node_modules/next/dist/docs/` 中的相关指南。注意废弃提示。
<!-- END:nextjs-agent-rules -->

# Harbor Blog 项目指南

## 技术栈

- Next.js 16 App Router、React 19、TypeScript。
- Tailwind CSS v4，通过 `@tailwindcss/postcss` 集成。
- 使用 pnpm；遵循现有 `pnpm-lock.yaml`，不要切换包管理器。
- 开发和构建默认使用 Turbopack。

## 常用命令

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

项目当前没有配置自动化测试框架。修改后优先运行与改动相关的最小检查；涉及路由、构建配置或 MDX 管线时，视风险补充运行 `pnpm build`。

## 项目结构

- `app/`：App Router 页面、布局和路由。
- `content/blog/`、`content/notes/`、`content/timeline/`：MDX 内容。
- `lib/mdx.ts`：读取 MDX 文件并解析 frontmatter。
- `components/mdx.tsx`：MDX 元素的 React 组件映射。
- `scripts/build-search-index.mjs`：生成 `public/search-index.json`。

## 实施约定

- Next.js 16 中的 `params` 和 `searchParams` 是 Promise，使用前必须 `await`。
- 博客详情通过 `next-mdx-remote/rsc` 在服务端渲染；`next.config.ts` 中的 `transpilePackages` 用于确保 Turbopack 正确打包该依赖。
- 新增 MDX 内容时沿用现有 frontmatter 字段和文件命名方式。
- `public/search-index.json` 是生成产物；内容变化后通过现有脚本更新，不手工维护其数据。
- 不编辑或提交 `.next/` 中的生成文件。
