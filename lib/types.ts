export interface PostMeta {
  title: string
  date: string
  tags: string[]
  description?: string
  summary?: string
  [key: string]: unknown
}

export interface Post {
  slug: string
  meta: PostMeta
  content: string
}

export type ContentType = 'blog' | 'notes' | 'timeline'
