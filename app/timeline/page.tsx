import { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { TimelineEntry } from '@/components/TimelineEntry'

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'Weekly reports and project milestones',
}

export default function TimelinePage() {
  const posts = getAllPosts('timeline')

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Timeline</h1>
        <p className="text-muted-foreground mb-8">Weekly reports, project milestones, and reflections.</p>

        {posts.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No entries yet.</p>
        ) : (
          <div className="mt-8">
            {posts.map((post) => (
              <TimelineEntry key={post.slug} post={post} href={`/timeline/${post.slug}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
