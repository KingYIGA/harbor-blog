import Link from 'next/link'
import type { Post } from '@/lib/types'
import { TagBadge } from './TagBadge'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface TimelineEntryProps {
  post: Post
  href: string
}

export function TimelineEntry({ post, href }: TimelineEntryProps) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* vertical line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-px bg-border last:hidden" />
      {/* dot */}
      <div className="absolute left-[4px] top-2 h-4 w-4 rounded-full border-2 border-accent bg-background" />

      <Link
        href={href}
        className="group block rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-accent/40 hover:bg-card-hover"
      >
        <time className="text-xs text-muted-foreground">{formatDate(post.meta.date)}</time>
        <h3 className="mt-1 text-base font-semibold group-hover:text-accent transition-colors">
          {post.meta.title}
        </h3>
        {post.meta.summary && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {post.meta.summary}
          </p>
        )}
        {post.meta.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.meta.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </Link>
    </div>
  )
}
