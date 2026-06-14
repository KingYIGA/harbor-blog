import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>My Tech Blog</h1>
      <Link href="/blog">进入博客</Link>
    </div>
  )
}