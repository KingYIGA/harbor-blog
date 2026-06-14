import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug
  }))
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return (
    <article>
      <h1>{post.meta.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  )
}
