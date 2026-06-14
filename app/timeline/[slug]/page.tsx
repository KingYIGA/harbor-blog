import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from 'next'
import { mdxComponents } from '@/components/mdx'
import { TagBadge } from '@/components/TagBadge'

export async function generateStaticParams() {
  return getAllPosts('timeline').map((post) => ({ slug: post.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('timeline', slug)
  return {
    title: post.meta.title,
    description: post.meta.summary ?? post.meta.description ?? post.meta.title,
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      type: 'article',
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function TimelineDetail({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('timeline', slug)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <article className="mx-auto max-w-2xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">{post.meta.title}</h1>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <time className="text-sm text-muted-foreground">{formatDate(post.meta.date)}</time>
            {post.meta.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.meta.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} href={`/timeline?tag=${encodeURIComponent(tag)}`} />
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="prose">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </div>
  )
}
