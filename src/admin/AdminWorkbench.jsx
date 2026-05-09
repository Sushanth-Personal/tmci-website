import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminWorkbench() {
  const [options, setOptions] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ category: '', name: '', image_url: '', description: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('workbench_options').select('*').order('category').order('sort_order')
    setOptions(data || [])
  }

  async function save() {
    setSaving(true)
    if (editing === 'new') {
      await supabase.from('workbench_options').insert({ ...form, sort_order: options.length + 1 })
    } else {
      await supabase.from('workbench_options').update(form).eq('id', editing.id)
    }
    setEditing(null)
    setSaving(false)
    load()
  }

  async function del(opt) {
    if (!confirm(`Delete "${opt.name}"?`)) return
    await supabase.from('workbench_options').delete().eq('id', opt.id)
    load()
  }

  const grouped = options.reduce((acc, o) => {
    if (!acc[o.category]) acc[o.category] = []
    acc[o.category].push(o)
    return acc
  }, {})

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workbench Options</h1>
          <p className="text-gray-500 text-sm">Manage customization choices shown to customers</p>
        </div>
        <button
          onClick={() => { setForm({ category: '', name: '', image_url: '', description: '' }); setEditing('new') }}
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          + Add Option
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4">
            {editing === 'new' ? 'New Option' : 'Edit Option'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['category', 'Category', 'e.g. Size, Material, Surface, Add-ons'],
              ['name', 'Name', 'e.g. 1200mm Wide, Steel Top'],
              ['image_url', 'Image URL (Cloudinary etc.)', 'https://res.cloudinary.com/...'],
              ['description', 'Description', 'Short description of this option']
            ].map(([key, label, placeholder]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                <input type="text" value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder={placeholder} />
              </div>
            ))}
          </div>
          {form.image_url && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Image Preview:</p>
              <img src={form.image_url} alt="Preview" className="h-24 rounded-lg object-contain border" />
            </div>
          )}
          <div className="flex gap-3 mt-5">
            <button onClick={save} disabled={saving || !form.category || !form.name}
              className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-bold disabled:opacity-60 transition-colors">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setEditing(null)}
              className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Grouped options */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-4xl mb-3">🔧</div>
          <p className="text-gray-500 font-medium mb-4">No workbench options yet</p>
          <button
            onClick={() => { setForm({ category: '', name: '', image_url: '', description: '' }); setEditing('new') }}
            className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-bold">
            Add First Option
          </button>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="font-bold text-gray-700 text-base mb-3 pb-2 border-b border-gray-200">
              {category} <span className="text-gray-400 font-normal text-sm">({items.length})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {items.map(opt => (
                <div key={opt.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  {opt.image_url && (
                    <img src={opt.image_url} alt={opt.name}
                      className="w-full h-24 object-cover rounded-lg mb-3 bg-gray-50" />
                  )}
                  <p className="font-bold text-sm text-gray-800">{opt.name}</p>
                  {opt.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{opt.description}</p>}
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => { setForm(opt); setEditing(opt) }}
                      className="text-xs text-blue-700 hover:text-blue-900 font-semibold">Edit</button>
                    <button onClick={() => del(opt)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
