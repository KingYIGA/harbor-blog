import { Metadata } from 'next'
import { AUTHOR } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
  description: `About ${AUTHOR.name} — frontend engineer`,
}

const skills = [
  'React', 'TypeScript', 'Next.js', 'Node.js',
  'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'Rust (learning)',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">About</h1>

        <div className="prose">
          <p>
            Hi, I&apos;m <strong>{AUTHOR.name}</strong> — a frontend engineer passionate
            about building fast, accessible, and delightful web experiences.
          </p>

          <h2>What I do</h2>
          <p>
            I focus on React and TypeScript ecosystems, with a strong interest in
            performance optimization, design systems, and developer tooling.
            Currently exploring Rust and systems programming.
          </p>

          <h2>Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2>Where to find me</h2>
          <ul>
            <li>
              <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${AUTHOR.email}`}>Email</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
