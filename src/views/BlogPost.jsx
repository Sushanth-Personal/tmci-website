'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import DOMPurify from 'dompurify'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919742944306'

  useEffect(() => { loadBlog() }, [slug])

  async function loadBlog() {
    const key = `blog_${slug}`
    const cached = cacheGet(key)
    if (cached) { setBlog(cached); setLoading(false); return }
    const { data, error } = await supabase
      .from('blogs').select('*').eq('slug', slug).eq('published', true).single()
    if (error || !data) { setNotFound(true); setLoading(false); return }
    setBlog(data)
    setLoading(false)
    cacheSet(key, data)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (notFound) { router.replace('/blogs'); return null }

  return (
    <>
      <div style={{ paddingTop: 80, paddingBottom: 64, minHeight: '100vh' }}>
        <article style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <nav style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/blogs" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>{blog.title}</span>
          </nav>

          {blog.tags?.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {blog.tags.map(tag => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 700, background: 'var(--primary-pale-solid)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 4 }}>{tag}</span>
              ))}
            </div>
          )}

          <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>{blog.title}</h1>

          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
            <span>By <strong style={{ color: 'var(--mid)' }}>{blog.author}</strong></span>
            <span>·</span>
            <span>{new Date(blog.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</span>
          </div>

          {blog.cover_image && (
            <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', borderRadius: 12, marginBottom: 40, maxHeight: 400, objectFit: 'cover' }} />
          )}

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />

          <div style={{ marginTop: 48, padding: 32, background: 'var(--ink)', borderRadius: 16, textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Interested in Our Workbenches?</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Chat with us on WhatsApp for a free consultation and quote</p>
            <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello! I just read your blog and I\'m interested in your workbenches.')}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              💬 Chat on WhatsApp
            </a>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href="/blogs" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>← Back to all articles</Link>
          </div>
        </article>
      </div>
    </>
  )
}