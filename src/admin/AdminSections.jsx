import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

const SECTIONS = [
  { id: 'hero', label: 'Hero Banner', desc: 'Main banner shown at the top of the homepage', icon: '🏠' },
  { id: 'about', label: 'About Us', desc: 'Company information and story section', icon: 'ℹ️' },
  { id: 'cta', label: 'Call To Action', desc: 'Bottom contact/enquiry section', icon: '📢' },
]

export default function AdminSections() {
  const [sections, setSections] = useState({})
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ content: '', content_type: 'html' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { loadSections() }, [])

  async function loadSections() {
    const { data } = await supabase.from('site_sections').select('*')
    const map = {}
    data?.forEach(s => { map[s.id] = s })
    setSections(map)
  }

  function startEdit(section) {
    const existing = sections[section.id] || {}
    setForm({
      content: existing.content || '',
      content_type: existing.content_type || 'html',
    })
    setEditing(section)
    setSaved(false)
  }

  async function saveSection() {
    setSaving(true)
    await supabase.from('site_sections').upsert({
      id: editing.id,
      title: editing.label,
      content_type: form.content_type,
      content: form.content,
      updated_at: new Date().toISOString()
    })
    cacheClear('home_sections')
    await loadSections()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Website Sections</h1>
        <p className="text-gray-500 text-sm mt-1">Edit each section of your homepage. Paste HTML code or an image URL. Changes go live instantly.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {SECTIONS.map(section => (
          <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="text-3xl">{section.icon}</div>
              {sections[section.id] && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Live</span>
              )}
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{section.label}</h3>
            <p className="text-sm text-gray-500 mb-4">{section.desc}</p>
            <button
              onClick={() => startEdit(section)}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white text-sm py-2 rounded-lg font-semibold transition-colors">
              ✏️ Edit Section
            </button>
          </div>
        ))}
      </div>

      {/* Editor panel */}
      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Editing: {editing.label}</h2>
              <p className="text-sm text-gray-500">Choose HTML for rich content, or Image URL for a banner image</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(null)}
                className="text-sm text-gray-600 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={saveSection} disabled={saving}
                className={`text-sm px-5 py-2 rounded-lg font-bold transition-colors disabled:opacity-60 ${saved ? 'bg-green-500 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white'}`}>
                {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type</label>
            <div className="flex gap-3">
              {[['html', '📄 HTML Code'], ['image', '🖼️ Image URL']].map(([val, label]) => (
                <button key={val}
                  onClick={() => setForm(f => ({ ...f, content_type: val }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${form.content_type === val ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {form.content_type === 'html' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">HTML Content</label>
              <textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={16}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-900 resize-y"
                placeholder={'<div>\n  <h1>Your Heading Here</h1>\n  <p>Your content here...</p>\n  <a href="#contact">Get a Quote</a>\n</div>'}
              />
              <p className="text-xs text-gray-400 mt-2">💡 Tip: You can paste full HTML with inline styles, Tailwind classes, or any content.</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="https://res.cloudinary.com/your-cloud/image/upload/v1234/banner.jpg"
              />
              <p className="text-xs text-gray-400 mt-2">💡 Paste a Cloudinary, Unsplash, or any direct image URL.</p>
              {form.content && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Preview:</p>
                  <img src={form.content} alt="Preview" className="max-h-48 rounded-lg object-contain border border-gray-200" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
