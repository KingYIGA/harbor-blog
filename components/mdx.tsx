import type { JSX } from 'react'
import { slugify } from '@/lib/toc'

function headingLink(level: 2 | 3, props: JSX.IntrinsicElements['h2' | 'h3']) {
  const { children, ...rest } = props
  const text = typeof children === 'string' ? children : String(children ?? '')
  const id = slugify(text)
  return (
    <a href={`#${id}`} id={id} className="group relative no-underline!">
      <span aria-hidden className="absolute -left-6 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 text-sm">
        #
      </span>
      {children}
    </a>
  )
}

export const mdxComponents = {
  h1: (props: JSX.IntrinsicElements['h1']) => (
    <h1 className="text-2xl font-bold mt-10 mb-4 tracking-tight sm:text-3xl" {...props} />
  ),
  h2: (props: JSX.IntrinsicElements['h2']) => (
    <h2 className="text-xl font-semibold mt-8 mb-3 tracking-tight sm:text-2xl">
      {headingLink(2, props)}
    </h2>
  ),
  h3: (props: JSX.IntrinsicElements['h3']) => (
    <h3 className="text-lg font-semibold mt-6 mb-2 tracking-tight sm:text-xl">
      {headingLink(3, props)}
    </h3>
  ),
  p: (props: JSX.IntrinsicElements['p']) => (
    <p className="text-foreground/85 leading-7 mb-4" {...props} />
  ),
  a: (props: JSX.IntrinsicElements['a']) => (
    <a
      className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: JSX.IntrinsicElements['ul']) => (
    <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props: JSX.IntrinsicElements['ol']) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props: JSX.IntrinsicElements['li']) => (
    <li className="text-foreground/85 leading-7" {...props} />
  ),
  blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
    <blockquote
      className="border-l-[3px] border-accent pl-4 py-1 my-6 bg-muted rounded-r-lg italic text-muted-foreground"
      {...props}
    />
  ),
  pre: (props: JSX.IntrinsicElements['pre']) => (
    <pre
      className="bg-zinc-900 text-zinc-100 rounded-xl p-4 overflow-x-auto my-6 text-sm leading-relaxed dark:bg-zinc-950"
      {...props}
    />
  ),
  code: (props: JSX.IntrinsicElements['code']) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-[0.875em] font-mono"
      {...props}
    />
  ),
  img: (props: JSX.IntrinsicElements['img']) => (
    <img className="rounded-xl max-w-full h-auto my-6" alt={props.alt ?? ''} {...props} />
  ),
  table: (props: JSX.IntrinsicElements['table']) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: JSX.IntrinsicElements['th']) => (
    <th className="border border-border px-3 py-2 text-left font-semibold bg-muted" {...props} />
  ),
  td: (props: JSX.IntrinsicElements['td']) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
  hr: (props: JSX.IntrinsicElements['hr']) => (
    <hr className="border-border my-8" {...props} />
  ),
}
