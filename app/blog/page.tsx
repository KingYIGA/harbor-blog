import { Metadata } from 'next'
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/mdx'
import { TagFilter } from '@/components/TagFilter'
import { PostCard } from '@/components/PostCard'

interface Props {
  searchParams: Promise<{ tag?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { tag } = await searchParams
  const title = tag ? `${tag} — Blog` : 'Blog'
  return { title, description: 'Long-form technical articles on frontend engineering' }
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams
  const tags = getAllTags('blog')
  const posts = tag ? getPostsByTag('blog', tag) : getAllPosts('blog')

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground mb-8">Technical articles on frontend engineering.</p>

        <TagFilter tags={tags} activeTag={tag} basePath="/blog" />

        {posts.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No posts yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} href={`/blog/${post.slug}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
