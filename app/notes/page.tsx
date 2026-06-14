import { Metadata } from 'next'
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/mdx'
import { TagFilter } from '@/components/TagFilter'
import { NoteCard } from '@/components/NoteCard'

interface Props {
  searchParams: Promise<{ tag?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { tag } = await searchParams
  const title = tag ? `${tag} — Notes` : 'Notes'
  return { title, description: 'Short notes and quick thoughts' }
}

export default async function NotesPage({ searchParams }: Props) {
  const { tag } = await searchParams
  const tags = getAllTags('notes')
  const posts = tag ? getPostsByTag('notes', tag) : getAllPosts('notes')

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Notes</h1>
        <p className="text-muted-foreground mb-8">Quick thoughts, snippets, and micro-notes.</p>

        <TagFilter tags={tags} activeTag={tag} basePath="/notes" />

        {posts.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No notes yet.</p>
        ) : (
          <div className="divide-y divide-border border-t border-border">
            {posts.map((post) => (
              <NoteCard key={post.slug} post={post} href={`/notes/${post.slug}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
