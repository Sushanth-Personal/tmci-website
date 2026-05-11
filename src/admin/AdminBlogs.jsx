'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('blogs').select('id,slug,title,published,author,created_at').order('created_at', { ascending: false })
    setBlogs(data || []); setLoading(false)
  }

  async function togglePublish(blog) {
    await supabase.from('blogs').update({ published: !blog.published }).eq('id', blog.id)
    cacheClear('blogs_list'); cacheClear(`blog_${blog.slug}`); load()
  }

  async function deleteBlog(blog) {
    if (!confirm(`Delete "${blog.title}"?`)) return
    await supabase.from('blogs').delete().eq('id', blog.id)
    cacheClear('blogs_list'); cacheClear(`blog_${blog.slug}`); load()
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Blog Posts</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{blogs.length} total · {blogs.filter(b=>b.published).length} published</p>
        </div>
        <Link href="/admin/blogs/new" style={{ background: 'var(--primary)', color: '#fff', padding: '9px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>+ New Post</Link>
      </div>

      {loading ? <div style={{ color: 'var(--muted)', fontSize: 14 }}>Loading...</div> :
       blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, border: '2px dashed var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No blog posts yet</p>
          <Link href="/admin/blogs/new" style={{ background: 'var(--primary)', color: '#fff', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>Create First Post</Link>
        </div>
       ) : (
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid var(--border)' }}>
                {['Title','Author','Date','Status','Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700, color: 'var(--mid)', fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr key={blog.id} style={{ borderBottom: '1px solid #F3F4F6', background: i%2===0?'#fff':'#FAFAFA' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{blog.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>/blogs/{blog.slug}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--mid)' }}>{blog.author}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{new Date(blog.created_at).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => togglePublish(blog)}
                      style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10, border: 'none', cursor: 'pointer', background: blog.published?'#F0FDF4':'#FFFBEB', color: blog.published?'#16A34A':'#D97706' }}>
                      {blog.published ? '● Published' : '○ Draft'}
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Link href={`/admin/blogs/edit/${blog.id}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 12, textDecoration: 'none' }}>Edit</Link>
                      {blog.published && <Link href={`/blogs/${blog.slug}`} target="_blank" style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 12, textDecoration: 'none' }}>View ↗</Link>}
                      <button onClick={() => deleteBlog(blog)} style={{ color: '#DC2626', fontWeight: 600, fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--ff)' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}
    </div>
  )
}