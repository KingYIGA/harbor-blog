import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <h1>博客</h1>

      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            {post.meta.title}
          </Link>
        </div>
      ))}
    </div>
  )
}