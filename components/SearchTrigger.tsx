'use client'

export function SearchTrigger() {
  return (
    <button
      type="button"
      onClick={() => document.dispatchEvent(new CustomEvent('open-search'))}
      className="ml-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="搜索文章"
    >
      ⌘K
    </button>
  )
}
