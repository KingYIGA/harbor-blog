import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const BLOG_PATH = path.join(process.cwd(), 'content/blog')

export function getAllPosts() {
  const files = fs.readdirSync(BLOG_PATH)

  return files.map((file) => {
    const filePath = path.join(BLOG_PATH, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(source)

    return {
      slug: file.replace('.mdx', ''),
      meta: data,
      content
    }
  })
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf-8')

  const { data, content } = matter(source)

  return {
    meta: data,
    content
  }
}