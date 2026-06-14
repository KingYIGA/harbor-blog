'use client'

import { useEffect, useRef } from 'react'

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || container.querySelector('script')) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    const attrs: Record<string, string> = {
      'data-repo': process.env.NEXT_PUBLIC_GISCUS_REPO ?? '',
      'data-repo-id': process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? '',
      'data-category': process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? '',
      'data-category-id': process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? '',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'zh-CN',
      'data-loading': 'lazy',
    }

    for (const [key, value] of Object.entries(attrs)) {
      script.setAttribute(key, value)
    }

    container.innerHTML = ''
    container.appendChild(script)
  }, [])

  return (
    <div className="mt-16 border-t border-border pt-8">
      <div ref={containerRef} />
    </div>
  )
}
