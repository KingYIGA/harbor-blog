import Link from 'next/link'
import type { Post } from '@/lib/types'
import { TagBadge } from './TagBadge'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface PostCardProps {
  post: Post
  href: string
}

export function PostCard({ post, href }: PostCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/40 hover:bg-card-hover hover:-translate-y-0.5"
    >
      <time className="text-xs text-muted-foreground">{formatDate(post.meta.date)}</time>
      <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">
        {post.meta.title}
      </h2>
      {post.meta.description && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {post.meta.description}
        </p>
      )}
      {post.meta.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.meta.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </Link>
  )
}
