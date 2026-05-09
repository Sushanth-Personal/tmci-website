import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import SEOHead from '../components/SEOHead'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [loading, setLoading] = useState(true)
  const [allTags, setAllTags] = useState([])

  useEffect(() => { loadBlogs() }, [])

  useEffect(() => {
    let result = blogs
    if (search) result = result.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase())
    )
    if (selectedTag) result = result.filter(b => b.tags?.includes(selectedTag))
    setFiltered(result)
  }, [search, selectedTag, blogs])

  async function loadBlogs() {
    const cached = cacheGet('blogs_list')
    if (cached) { setBlogs(cached); setLoading(false); extractTags(cached); return }
    const { data } = await supabase
      .from('blogs').select('id,slug,title,excerpt,cover_image,author,tags,created_at')
      .eq('published', true).order('created_at', { ascending: false })
    setBlogs(data || [])
    setLoading(false)
    extractTags(data || [])
    cacheSet('blogs_list', data || [])
  }

  function extractTags(list) {
    const tags = new Set()
    list.forEach(b => b.tags?.forEach(t => tags.add(t)))
    setAllTags([...tags])
  }

  return (
    <>
      <SEOHead title="Blog — Workbench Tips & Industry Insights" />
      <div style={{ paddingTop: 80, paddingBottom: 64, minHeight: '100vh', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline">Knowledge Hub</div>
            <h1 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: -1, marginTop: 8 }}>Our Blog</h1>
            <p style={{ color: 'var(--mid)', marginTop: 8, fontSize: 15 }}>Expert insights on workbench design, calibration, and workplace productivity</p>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            <input type="search" placeholder="🔍 Search articles..." value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontFamily: 'var(--ff)', outline: 'none', background: '#fff' }} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['', ...allTags].map(tag => (
                <button key={tag || 'all'} onClick={() => setSelectedTag(tag)}
                  style={{ padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--ff)', border: `1px solid ${selectedTag === tag ? 'var(--primary)' : 'var(--border)'}`, background: selectedTag === tag ? 'var(--primary)' : '#fff', color: selectedTag === tag ? '#fff' : 'var(--mid)', transition: 'all 0.15s' }}>
                  {tag || 'All'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[1,2,3,4,5,6].map(i => <div key={i} style={{ background: '#fff', borderRadius: 12, height: 280, animation: 'pulse 1.5s ease-in-out infinite', opacity: 0.6 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--mid)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
              <p style={{ fontSize: 16, fontWeight: 600 }}>No articles found</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {filtered.map(blog => (
                <Link key={blog.id} to={`/blogs/${blog.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                    onMouseOver={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.08)' }}
                    onMouseOut={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
                    {blog.cover_image && <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} loading="lazy" />}
                    <div style={{ padding: 20 }}>
                      {blog.tags?.length > 0 && (
                        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                          {blog.tags.slice(0,3).map(tag => (
                            <span key={tag} style={{ fontSize: 10, fontWeight: 700, background: 'var(--primary-pale-solid)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 4 }}>{tag}</span>
                          ))}
                        </div>
                      )}
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 8 }}>{blog.title}</h3>
                      {blog.excerpt && <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.excerpt}</p>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
                        <span>{blog.author}</span>
                        <span>{new Date(blog.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}