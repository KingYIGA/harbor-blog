import Link from 'next/link'
import type { Post } from '@/lib/types'
import { TagBadge } from './TagBadge'

function shortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  })
}

interface NoteCardProps {
  post: Post
  href: string
}

export function NoteCard({ post, href }: NoteCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-muted"
    >
      <time className="shrink-0 text-xs text-muted-foreground tabular-nums w-16">
        {shortDate(post.meta.date)}
      </time>
      <span className="font-medium text-sm leading-snug group-hover:text-accent transition-colors truncate">
        {post.meta.title}
      </span>
      {post.meta.tags?.length > 0 && (
        <span className="hidden sm:flex items-center gap-1 shrink-0 ml-auto">
          {post.meta.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </span>
      )}
    </Link>
  )
}
