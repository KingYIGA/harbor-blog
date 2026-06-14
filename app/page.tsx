import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { AUTHOR } from '@/lib/constants'
import { PostCard } from '@/components/PostCard'
import { NoteCard } from '@/components/NoteCard'
import { TimelineEntry } from '@/components/TimelineEntry'

export default function Home() {
  const blogPosts = getAllPosts('blog').slice(0, 3)
  const notes = getAllPosts('notes').slice(0, 5)
  const latestTimeline = getAllPosts('timeline').slice(0, 1)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      {/* Hero */}
      <section className="max-w-2xl mx-auto mb-20 text-center sm:text-left sm:mx-0">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{AUTHOR.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg">
          Frontend engineer. Writing about React, TypeScript, and software craftsmanship.
        </p>
        <div className="mt-6 flex items-center gap-3 justify-center sm:justify-start">
          <a
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${AUTHOR.email}`}
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* Blog section */}
      {blogPosts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Latest Blog Posts</h2>
            <Link href="/blog" className="text-sm text-accent hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <PostCard key={post.slug} post={post} href={`/blog/${post.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* Notes section */}
      {notes.length > 0 && (
        <section className="mb-20 max-w-2xl">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Recent Notes</h2>
            <Link href="/notes" className="text-sm text-accent hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="divide-y divide-border border-t border-border">
            {notes.map((post) => (
              <NoteCard key={post.slug} post={post} href={`/notes/${post.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* Timeline section */}
      {latestTimeline.length > 0 && (
        <section className="max-w-2xl">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Latest Timeline</h2>
            <Link href="/timeline" className="text-sm text-accent hover:underline">
              View all &rarr;
            </Link>
          </div>
          {latestTimeline.map((post) => (
            <TimelineEntry key={post.slug} post={post} href={`/timeline/${post.slug}`} />
          ))}
        </section>
      )}
    </div>
  )
}
