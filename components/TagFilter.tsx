'use client'

import { TagBadge } from './TagBadge'

interface TagFilterProps {
  tags: { tag: string; count: number }[]
  activeTag?: string
  basePath: string
}

export function TagFilter({ tags, activeTag, basePath }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <TagBadge
        tag="All"
        active={!activeTag}
        count={tags.reduce((sum, t) => sum + t.count, 0)}
        href={basePath}
      />
      {tags.map(({ tag, count }) => (
        <TagBadge
          key={tag}
          tag={tag}
          count={count}
          active={tag === activeTag}
          href={`${basePath}?tag=${encodeURIComponent(tag)}`}
        />
      ))}
    </div>
  )
}
