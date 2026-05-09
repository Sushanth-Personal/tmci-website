import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ question: '', answer: '', category: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadFAQs() }, [])

  async function loadFAQs() {
    const { data } = await supabase.from('faqs').select('*').order('sort_order')
    setFaqs(data || [])
  }

  async function saveFAQ() {
    setSaving(true)
    if (editing === 'new') {
      await supabase.from('faqs').insert({
        ...form,
        published: true,
        sort_order: faqs.length + 1
      })
    } else {
      await supabase.from('faqs').update(form).eq('id', editing.id)
    }
    cacheClear('faqs')
    setEditing(null)
    setSaving(false)
    loadFAQs()
  }

  async function deleteFAQ(faq) {
    if (!confirm(`Delete this FAQ?\n"${faq.question}"`)) return
    await supabase.from('faqs').delete().eq('id', faq.id)
    cacheClear('faqs')
    loadFAQs()
  }

  async function togglePublish(faq) {
    await supabase.from('faqs').update({ published: !faq.published }).eq('id', faq.id)
    cacheClear('faqs')
    loadFAQs()
  }

  function startEdit(faq) {
    setForm({ question: faq.question, answer: faq.answer, category: faq.category || '' })
    setEditing(faq)
  }

  function startNew() {
    setForm({ question: '', answer: '', category: '' })
    setEditing('new')
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-500 text-sm">{faqs.length} questions · shown on homepage</p>
        </div>
        <button onClick={startNew}
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          + Add FAQ
        </button>
      </div>

      {/* Editor form */}
      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4">
            {editing === 'new' ? '➕ New FAQ' : '✏️ Edit FAQ'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Question</label>
              <input type="text" value={form.question}
                onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="e.g. What materials do you use?" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Answer</label>
              <textarea value={form.answer}
                onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 resize-y"
                placeholder="Write a helpful, detailed answer..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category (optional)</label>
              <input type="text" value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="e.g. Products, Shipping, Customization" />
            </div>
            <div className="flex gap-3">
              <button onClick={saveFAQ} disabled={saving || !form.question || !form.answer}
                className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save FAQ'}
              </button>
              <button onClick={() => setEditing(null)}
                className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ List */}
      {faqs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-4xl mb-3">❓</div>
          <p className="text-gray-500 font-medium mb-4">No FAQs yet</p>
          <button onClick={startNew} className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-bold">
            Add First FAQ
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.id}
              className={`bg-white rounded-xl border p-4 flex gap-4 ${faq.published ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{faq.question}</p>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{faq.answer}</p>
                {faq.category && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full mt-2 inline-block font-medium">
                    {faq.category}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => startEdit(faq)}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold">Edit</button>
                <button onClick={() => togglePublish(faq)}
                  className={`text-xs font-semibold ${faq.published ? 'text-green-600 hover:text-green-800' : 'text-yellow-600 hover:text-yellow-800'}`}>
                  {faq.published ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => deleteFAQ(faq)}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
