'use client'
import { useState, useEffect, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const MODULES = {
  toolbar: [
    [{ header: [1,2,3,false] }],
    ['bold','italic','underline','strike'],
    [{ color:[] },{ background:[] }],
    [{ list:'ordered' },{ list:'bullet' }],
    [{ align:[] }],
    ['link','image','video'],
    ['blockquote','code-block'],
    ['clean']
  ]
}

function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/(^-|-$)/g,'') }

export default function AdminBlogEdit() {
  const params = useParams()
  const id = params.id
  const router = useRouter()
  const isNew = !id
  const [form, setForm] = useState({ title:'', slug:'', excerpt:'', content:'', cover_image:'', author:'TMCI Technology', tags:'', published:false, seo_title:'', seo_description:'' })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (!isNew) loadBlog() }, [id])

  async function loadBlog() {
    const { data } = await supabase.from('blogs').select('*').eq('id', id).single()
    if (data) setForm({ ...data, tags: data.tags?.join(', ') || '' })
    setLoading(false)
  }

  async function save(publish) {
    if (!form.title.trim() || !form.content.trim()) { alert('Title and content are required'); return }
    setSaving(true)
    const payload = { title: form.title.trim(), slug: slugify(form.slug || form.title), excerpt: form.excerpt.trim(), content: form.content, cover_image: form.cover_image.trim(), author: form.author.trim(), tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean), published: publish, seo_title: form.seo_title.trim(), seo_description: form.seo_description.trim(), updated_at: new Date().toISOString() }
    const { error } = isNew ? await supabase.from('blogs').insert(payload) : await supabase.from('blogs').update(payload).eq('id', id)
    if (!error) { cacheClear('blogs_list'); if (!isNew) cacheClear(`blog_${form.slug}`); router.push('/admin/blogs') }
    else alert('Error: ' + error.message)
    setSaving(false)
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
          <Link href="/admin/blogs" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>← Back to posts</Link>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => save(false)} disabled={saving} style={{ border: '1px solid var(--border)', background: '#fff', color: 'var(--mid)', padding: '9px 18px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--ff)' }}>Save Draft</button>
          <button onClick={() => save(true)} disabled={saving} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--ff)', opacity: saving?0.7:1 }}>🚀 {saving?'Saving...':'Publish'}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Title *</label>
              <input type="text" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value,slug:isNew?slugify(e.target.value):f.slug}))}
                style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 17, fontWeight: 700, fontFamily: 'var(--ff)', outline: 'none', boxSizing: 'border-box' }} placeholder="Post title..." />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>URL Slug *</label>
              <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <span style={{ background: '#F9FAFB', padding: '10px 12px', fontSize: 13, color: 'var(--muted)', borderRight: '1px solid var(--border)' }}>/blogs/</span>
                <input type="text" value={form.slug} onChange={e=>setForm(f=>({...f,slug:slugify(e.target.value)}))}
                  style={{ flex:1, border:'none', padding:'10px 12px', fontSize:13, fontFamily:'var(--ff)', outline:'none' }} />
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>Content *</label>
            <ReactQuill theme="snow" value={form.content} onChange={content=>setForm(f=>({...f,content}))} modules={MODULES} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { title: 'Post Details', fields: [['author','Author','text','TMCI Technology'],['tags','Tags (comma separated)','text','Calibration, Tips'],['cover_image','Cover Image URL','url','https://res.cloudinary.com/...']] },
            { title: 'Excerpt', fields: [['excerpt','Short summary for listing','textarea','']] },
            { title: '🔍 SEO Settings', fields: [['seo_title','SEO Title (optional)','text',''],['seo_description','Meta Description','textarea','']] }
          ].map(section => (
            <div key={section.title} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>{section.title}</h3>
              {section.fields.map(([key, label, type, placeholder]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 5 }}>{label}</label>
                  {type === 'textarea' ? (
                    <textarea value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} rows={3}
                      style={{ width:'100%', border:'1px solid var(--border)', borderRadius:7, padding:'8px 12px', fontSize:13, fontFamily:'var(--ff)', outline:'none', resize:'vertical', boxSizing:'border-box' }} placeholder={placeholder} />
                  ) : (
                    <input type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                      style={{ width:'100%', border:'1px solid var(--border)', borderRadius:7, padding:'8px 12px', fontSize:13, fontFamily:'var(--ff)', outline:'none', boxSizing:'border-box' }} placeholder={placeholder} />
                  )}
                  {key === 'cover_image' && form.cover_image && <img src={form.cover_image} alt="" style={{ marginTop:8, width:'100%', height:100, objectFit:'cover', borderRadius:7 }} />}
                  {key === 'seo_description' && <p style={{ fontSize:11, color: form.seo_description.length>160?'#DC2626':'var(--muted)', marginTop:4 }}>{form.seo_description.length}/160</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}