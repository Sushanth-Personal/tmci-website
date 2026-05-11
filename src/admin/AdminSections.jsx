'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

const SECTIONS = [
  { id: 'hero', label: 'Hero Banner', desc: 'Main banner at top of homepage', icon: '🏠' },
  { id: 'about', label: 'About / Why TMCI', desc: 'Company info and checklist section', icon: 'ℹ️' },
  { id: 'products', label: 'Products Section', desc: 'Product mosaic grid', icon: '🔧' },
  { id: 'cta', label: 'Call To Action', desc: 'Bottom CTA banner', icon: '📢' },
]

export default function AdminSections() {
  const [sections, setSections] = useState({})
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ content: '', content_type: 'html' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('site_sections').select('*')
    const map = {}
    data?.forEach(s => { map[s.id] = s })
    setSections(map)
  }

  function startEdit(section) {
    const existing = sections[section.id] || {}
    setForm({ content: existing.content || '', content_type: existing.content_type || 'html' })
    setEditing(section)
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    await supabase.from('site_sections').upsert({ id: editing.id, title: editing.label, content_type: form.content_type, content: form.content, updated_at: new Date().toISOString() })
    cacheClear('home_sections')
    await load()
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Website Sections</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Edit each section of your homepage. Paste HTML or an image URL. Changes go live instantly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 28 }}>
        {SECTIONS.map(section => (
          <div key={section.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{section.icon}</span>
              {sections[section.id] && <span style={{ fontSize: 10, fontWeight: 700, background: '#F0FDF4', color: '#16A34A', padding: '2px 8px', borderRadius: 10 }}>Live</span>}
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{section.label}</h3>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>{section.desc}</p>
            <button onClick={() => startEdit(section)}
              style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 7, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--ff)', width: '100%' }}>
              ✏️ Edit Section
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>Editing: {editing.label}</h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--mid)', padding: '8px 16px', borderRadius: 7, cursor: 'pointer', fontFamily: 'var(--ff)', fontSize: 13 }}>Cancel</button>
              <button onClick={save} disabled={saving}
                style={{ background: saved ? '#16A34A' : 'var(--primary)', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 7, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--ff)', fontSize: 13, opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {[['html','📄 HTML Code'],['image','🖼️ Image URL']].map(([val,label]) => (
              <button key={val} onClick={() => setForm(f => ({ ...f, content_type: val }))}
                style={{ padding: '8px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--ff)', border: `2px solid ${form.content_type === val ? 'var(--primary)' : 'var(--border)'}`, background: form.content_type === val ? 'rgba(0,137,123,0.08)' : '#fff', color: form.content_type === val ? 'var(--primary)' : 'var(--mid)' }}>
                {label}
              </button>
            ))}
          </div>

          {form.content_type === 'html' ? (
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={14}
              style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', fontSize: 13, fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              placeholder="<h1>Your HTML here</h1><p>Add any content...</p>" />
          ) : (
            <div>
              <input type="url" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 13, fontFamily: 'var(--ff)', outline: 'none', boxSizing: 'border-box' }}
                placeholder="https://res.cloudinary.com/your-cloud/image/upload/..." />
              {form.content && <img src={form.content} alt="Preview" style={{ marginTop: 12, maxHeight: 180, borderRadius: 8, border: '1px solid var(--border)', objectFit: 'contain' }} />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}