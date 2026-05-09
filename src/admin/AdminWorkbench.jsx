import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminWorkbench() {
  const [options, setOptions] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ category:'', name:'', image_url:'', description:'' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('workbench_options').select('*').order('category').order('sort_order')
    setOptions(data || [])
  }

  async function save() {
    setSaving(true)
    if (editing === 'new') await supabase.from('workbench_options').insert({ ...form, sort_order: options.length + 1 })
    else await supabase.from('workbench_options').update(form).eq('id', editing.id)
    setEditing(null); setSaving(false); load()
  }

  async function del(opt) {
    if (!confirm(`Delete "${opt.name}"?`)) return
    await supabase.from('workbench_options').delete().eq('id', opt.id)
    load()
  }

  const grouped = options.reduce((acc, o) => { if (!acc[o.category]) acc[o.category]=[]; acc[o.category].push(o); return acc }, {})

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Workbench Options</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Manage the module/add-on options shown in the configurator</p>
        </div>
        <button onClick={() => { setForm({ category:'', name:'', image_url:'', description:'' }); setEditing('new') }}
          style={{ background:'var(--primary)', color:'#fff', border:'none', padding:'9px 18px', borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'var(--ff)' }}>
          + Add Option
        </button>
      </div>

      {editing && (
        <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:12, padding:24, marginBottom:24 }}>
          <h2 style={{ fontSize:16, fontWeight:700, marginBottom:16, color:'var(--ink)' }}>{editing==='new'?'New Option':'Edit Option'}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[['category','Category','e.g. Size, Material, Add-ons'],['name','Name','e.g. 1200mm Wide'],['image_url','Image URL','https://res.cloudinary.com/...'],['description','Description','Short description']].map(([key,label,ph]) => (
              <div key={key}>
                <label style={{ fontSize:11, fontWeight:600, color:'var(--muted)', display:'block', marginBottom:5 }}>{label}</label>
                <input type="text" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                  style={{ width:'100%', border:'1px solid var(--border)', borderRadius:8, padding:'9px 12px', fontSize:13, fontFamily:'var(--ff)', outline:'none', boxSizing:'border-box' }} placeholder={ph} />
              </div>
            ))}
          </div>
          {form.image_url && <img src={form.image_url} alt="" style={{ marginTop:12, height:80, borderRadius:8, objectFit:'cover' }} />}
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            <button onClick={save} disabled={saving} style={{ background:'var(--primary)', color:'#fff', border:'none', padding:'9px 20px', borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'var(--ff)' }}>{saving?'Saving...':'Save'}</button>
            <button onClick={()=>setEditing(null)} style={{ background:'none', border:'1px solid var(--border)', color:'var(--mid)', padding:'9px 16px', borderRadius:8, cursor:'pointer', fontFamily:'var(--ff)', fontSize:13 }}>Cancel</button>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize:13, fontWeight:700, color:'var(--mid)', marginBottom:12, textTransform:'uppercase', letterSpacing:'0.08em' }}>{category}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
            {items.map(opt => (
              <div key={opt.id} style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:10, padding:16 }}>
                {opt.image_url && <img src={opt.image_url} alt={opt.name} style={{ width:'100%', height:80, objectFit:'cover', borderRadius:7, marginBottom:10 }} />}
                <p style={{ fontWeight:700, fontSize:13, color:'var(--ink)', marginBottom:4 }}>{opt.name}</p>
                {opt.description && <p style={{ fontSize:11.5, color:'var(--muted)', lineHeight:1.5, marginBottom:10 }}>{opt.description}</p>}
                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={()=>{setForm(opt);setEditing(opt)}} style={{ fontSize:12, color:'var(--primary)', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'var(--ff)', padding:0 }}>Edit</button>
                  <button onClick={()=>del(opt)} style={{ fontSize:12, color:'#DC2626', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'var(--ff)', padding:0 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}