import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from 'next'
import { mdxComponents } from '@/components/mdx'
import { extractTOC } from '@/lib/toc'
import { TableOfContents } from '@/components/TableOfContents'
import { TagBadge } from '@/components/TagBadge'
import { GiscusComments } from '@/components/GiscusComments'

export async function generateStaticParams() {
  const posts = getAllPosts('blog')
  return posts.map((post) => ({ slug: post.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('blog', slug)
  return {
    title: post.meta.title,
    description: post.meta.description ?? `${post.meta.title} — technical article`,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
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

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('blog', slug)
  const toc = extractTOC(post.content)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="flex gap-8 justify-center">
        <article className="min-w-0 flex-1 max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {post.meta.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <time className="text-sm text-muted-foreground">
                {formatDate(post.meta.date)}
              </time>
              {post.meta.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.meta.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="prose">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <GiscusComments />
        </article>

        <TableOfContents items={toc} />
      </div>
    </div>
  )
}
