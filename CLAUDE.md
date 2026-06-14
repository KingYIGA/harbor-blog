@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000 (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint v9 (flat config: eslint.config.mjs)
```

No test framework is configured yet.

## Architecture

This is a **Next.js 16 blog** using the App Router (Turbopack bundler, Tailwind CSS v4, TypeScript, React 19).

### Styling

- **Tailwind CSS v4** — uses `@import "tailwindcss"` in CSS (not the v3 `@tailwind` directives). Theme variables are defined with `@theme inline`.
- **PostCSS** via `postcss.config.mjs` with `@tailwindcss/postcss` plugin.
- Geist Sans and Geist Mono fonts loaded via `next/font/google` in the root layout.
- Dark mode is supported via `prefers-color-scheme`.
- `<html lang="zh-CN">` — this is a Chinese-language blog.

### MDX blog pipeline

Blog posts live in `content/blog/*.mdx` with YAML frontmatter (via `gray-matter`). Two layers work together:

1. **`lib/mdx.ts`** — reads `.mdx` files from `content/blog/` at build time using `fs` + `gray-matter`. Exports `getAllPosts()` (all posts with slug/meta/content) and `getPostBySlug(slug)`.

2. **`next-mdx-remote/rsc`** — renders MDX content on the server. The `MDXRemote` component from this package is used in the blog detail page to turn raw MDX strings into React at runtime.

### Route structure

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage with link to blog |
| `/blog` | `app/blog/page.tsx` | Post list (calls `getAllPosts`) |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Post detail (calls `getPostBySlug` + `MDXRemote`) |

### Key Next.js 16 differences

- `params` is a **Promise** — must be awaited (`const { slug } = await params`).
- `searchParams` is also a Promise.
- Turbopack is the default bundler; there is no webpack config.
- Next.js 16 docs live in `node_modules/next/dist/docs/`.

### MDX dual setup

The project uses **both** `@next/mdx` (for `.mdx` page extension support) and `next-mdx-remote` (for runtime MDX rendering from file content). The `@next/mdx` plugin is configured in `next.config.ts` and is needed to resolve `.mdx` imports. The actual blog rendering uses `next-mdx-remote` with `gray-matter` for frontmatter parsing.

### Adding a blog post

1. Create `content/blog/<slug>.mdx` with frontmatter (`title`, `date`, `tags`).
2. That's it — `getAllPosts()` and `generateStaticParams()` discover it automatically.
