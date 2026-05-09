import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ question:'', answer:'', category:'' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('faqs').select('*').order('sort_order')
    setFaqs(data || [])
  }

  async function save() {
    setSaving(true)
    if (editing === 'new') await supabase.from('faqs').insert({ ...form, published: true, sort_order: faqs.length + 1 })
    else await supabase.from('faqs').update(form).eq('id', editing.id)
    cacheClear('faqs'); setEditing(null); setSaving(false); load()
  }

  async function del(faq) {
    if (!confirm(`Delete this FAQ?`)) return
    await supabase.from('faqs').delete().eq('id', faq.id)
    cacheClear('faqs'); load()
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>FAQs</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{faqs.length} questions · shown on homepage</p>
        </div>
        <button onClick={() => { setForm({ question:'', answer:'', category:'' }); setEditing('new') }}
          style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--ff)' }}>
          + Add FAQ
        </button>
      </div>

      {editing && (
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>{editing==='new'?'New FAQ':'Edit FAQ'}</h2>
          {[['question','Question','text'],['answer','Answer','textarea'],['category','Category (optional)','text']].map(([key,label,type]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 5 }}>{label}</label>
              {type==='textarea' ? (
                <textarea value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} rows={4}
                  style={{ width:'100%', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', fontSize:13, fontFamily:'var(--ff)', outline:'none', resize:'vertical', boxSizing:'border-box' }} />
              ) : (
                <input type="text" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                  style={{ width:'100%', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', fontSize:13, fontFamily:'var(--ff)', outline:'none', boxSizing:'border-box' }} />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} disabled={saving||!form.question||!form.answer}
              style={{ background:'var(--primary)', color:'#fff', border:'none', padding:'9px 20px', borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'var(--ff)', opacity:saving?0.7:1 }}>
              {saving?'Saving...':'Save FAQ'}
            </button>
            <button onClick={() => setEditing(null)} style={{ background:'none', border:'1px solid var(--border)', color:'var(--mid)', padding:'9px 16px', borderRadius:8, cursor:'pointer', fontFamily:'var(--ff)', fontSize:13 }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {faqs.map((faq, i) => (
          <div key={faq.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12, flex: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i+1}</div>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 13, marginBottom: 4 }}>{faq.question}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{faq.answer.substring(0,120)}{faq.answer.length>120?'...':''}</p>
                {faq.category && <span style={{ fontSize: 10, fontWeight: 700, background: '#F3F4F6', color: 'var(--mid)', padding: '2px 8px', borderRadius: 4, marginTop: 6, display: 'inline-block' }}>{faq.category}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <button onClick={() => { setForm({ question:faq.question, answer:faq.answer, category:faq.category||'' }); setEditing(faq) }} style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ff)' }}>Edit</button>
              <button onClick={() => del(faq)} style={{ fontSize: 12, color: '#DC2626', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ff)' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}