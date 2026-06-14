'use client'

import Link from 'next/link'

interface TagBadgeProps {
  tag: string
  active?: boolean
  count?: number
  href?: string
}

export function TagBadge({ tag, active, count, href }: TagBadgeProps) {
  const classes = `inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
    active
      ? 'bg-accent text-accent-foreground'
      : 'bg-muted text-muted-foreground hover:bg-card-hover hover:text-foreground'
  }`

  const content = (
    <>
      {tag}
      {count !== undefined && (
        <span className={active ? 'opacity-70' : 'opacity-50'}>{count}</span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return <span className={classes}>{content}</span>
}
