'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'

interface SearchEntry {
  type: string
  slug: string
  title: string
  date: string | null
  tags: string[]
  excerpt: string
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface SearchBarProps {
  onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const indexRef = useRef<SearchEntry[]>([])
  const fuseRef = useRef<Fuse<SearchEntry> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchEntry[]) => {
        indexRef.current = data
        fuseRef.current = new Fuse(data, {
          keys: ['title', 'tags', 'excerpt'],
          threshold: 0.3,
          includeMatches: false,
        })
      })
      .catch(() => {
        // Index not available (dev without prebuild)
      })
  }, [])

  const onSearch = useCallback((value: string) => {
    setQuery(value)
    if (!value.trim() || !fuseRef.current) {
      setResults([])
      return
    }
    const found = fuseRef.current.search(value.trim()).map((r) => r.item)
    setResults(found.slice(0, 8))
  }, [])

  const sectionLabel: Record<string, string> = {
    blog: 'Blog',
    notes: 'Notes',
    timeline: 'Timeline',
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-xl border border-border bg-card px-4 py-3 pl-10 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose()
          }}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {results.length > 0 && (
        <ul className="mt-4 space-y-1 overflow-y-auto">
          {results.map((entry) => (
            <li key={`${entry.type}/${entry.slug}`}>
              <Link
                href={`/${entry.type}/${entry.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
              >
                <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                  {sectionLabel[entry.type] ?? entry.type}
                </span>
                <span className="text-sm font-medium truncate">{entry.title}</span>
                {entry.date && (
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                    {formatDate(entry.date)}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query && results.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          No results for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  )
}
