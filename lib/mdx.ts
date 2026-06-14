import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import type { ContentType, Post, PostMeta } from '@/lib/types'

function getContentPath(type: ContentType): string {
  return path.join(process.cwd(), 'content', type)
}

function readMdxFile(type: ContentType, filePath: string): Post {
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  return {
    slug: path.basename(filePath, '.mdx'),
    meta: data as PostMeta,
    content,
  }
}

export function getAllPosts(type: ContentType): Post[] {
  const dirPath = getContentPath(type)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => readMdxFile(type, path.join(dirPath, file)))
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
}

export function getPostBySlug(type: ContentType, slug: string): Post {
  const filePath = path.join(getContentPath(type), `${slug}.mdx`)
  return readMdxFile(type, filePath)
}

export function getAllTags(type: ContentType): { tag: string; count: number }[] {
  const posts = getAllPosts(type)
  const tagCount = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.meta.tags ?? []) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(type: ContentType, tag: string): Post[] {
  return getAllPosts(type).filter((post) => post.meta.tags?.includes(tag))
}

export function getAllContent(): { type: ContentType; post: Post }[] {
  const types: ContentType[] = ['blog', 'notes', 'timeline']
  return types.flatMap((type) => getAllPosts(type).map((post) => ({ type, post })))
}
