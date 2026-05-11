'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', paddingTop: 60 }}>
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 120, fontWeight: 800, color: 'var(--primary)', opacity: 0.1, lineHeight: 1 }}>404</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: 'var(--mid)', marginBottom: 32, fontSize: 15 }}>The page you're looking for doesn't exist.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/" style={{ background: 'var(--primary)', color: '#fff', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>← Back to Home</Link>
          <Link href="/blogs" style={{ border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Browse Blog</Link>
        </div>
      </div>
    </div>
  )
}