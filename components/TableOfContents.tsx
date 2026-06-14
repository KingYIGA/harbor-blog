'use client'

import { useEffect, useRef, useState } from 'react'
import type { TOCItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    headingElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="hidden xl:block sticky top-24 w-56 shrink-0 self-start ml-8">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </h4>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm py-1 transition-colors hover:text-foreground ${
                item.id === activeId
                  ? 'text-accent border-l-2 border-accent -ml-px pl-[calc(1rem-1px)]'
                  : 'text-muted-foreground border-l-2 border-transparent -ml-px pl-[calc(1rem-1px)]'
              }`}
              style={{ paddingLeft: item.level === 3 ? '1.5rem' : undefined }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
