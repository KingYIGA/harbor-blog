import { AUTHOR } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {AUTHOR.name}</p>
        <div className="flex items-center gap-4">
          <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={`mailto:${AUTHOR.email}`} className="hover:text-foreground transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
