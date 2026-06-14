import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs'
import matter from 'gray-matter'
import { join, basename } from 'path'

const CONTENT_ROOT = join(process.cwd(), 'content')
const TYPES = ['blog', 'notes', 'timeline']

/**
 * Build a search index JSON file at public/search-index.json
 * Each entry contains: { type, slug, title, date, tags, excerpt }
 */
function buildSearchIndex() {
  const entries = []

  for (const type of TYPES) {
    const dirPath = join(CONTENT_ROOT, type)
    if (!existsSync(dirPath)) continue

    const files = readdirSync(dirPath).filter((f) => f.endsWith('.mdx'))
    for (const file of files) {
      const source = readFileSync(join(dirPath, file), 'utf-8')
      const { data, content } = matter(source)

      // Strip markdown for a plain-text excerpt (first ~200 chars)
      const plainText = content
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/[*_~`>#\[\]()|]/g, '')
        .replace(/\n+/g, ' ')
        .trim()

      entries.push({
        type,
        slug: basename(file, '.mdx'),
        title: data.title ?? basename(file, '.mdx'),
        date: data.date ?? null,
        tags: data.tags ?? [],
        excerpt: plainText.slice(0, 200),
      })
    }
  }

  const outPath = join(process.cwd(), 'public', 'search-index.json')
  writeFileSync(outPath, JSON.stringify(entries))
  console.log(`Search index built: ${entries.length} entries → public/search-index.json`)
}

buildSearchIndex()
