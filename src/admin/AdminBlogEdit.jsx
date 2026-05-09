import { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

const ReactQuill = lazy(() => import('react-quill'))

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'],
    ['clean']
  ]
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AdminBlogEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    cover_image: '', author: 'TMCI Team', tags: '',
    published: false, seo_title: '', seo_description: ''
  })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isNew) loadBlog()
  }, [id])

  async function loadBlog() {
    const { data } = await supabase.from('blogs').select('*').eq('id', id).single()
    if (data) {
      setForm({ ...data, tags: data.tags?.join(', ') || '' })
    }
    setLoading(false)
  }

  function handleTitleChange(e) {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: isNew ? slugify(title) : f.slug }))
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.slug.trim()) errs.slug = 'Slug is required'
    if (!form.content || form.content === '<p><br></p>') errs.content = 'Content cannot be empty'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function saveBlog(publishStatus) {
    if (!validate()) return
    setSaving(true)

    const payload = {
      title: form.title.trim(),
      slug: slugify(form.slug),
      excerpt: form.excerpt.trim(),
      content: form.content,
      cover_image: form.cover_image.trim(),
      author: form.author.trim() || 'TMCI Team',
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: publishStatus,
      seo_title: form.seo_title.trim(),
      seo_description: form.seo_description.trim(),
      updated_at: new Date().toISOString()
    }

    let error
    if (isNew) {
      const result = await supabase.from('blogs').insert(payload)
      error = result.error
    } else {
      const result = await supabase.from('blogs').update(payload).eq('id', id)
      error = result.error
    }

    if (!error) {
      cacheClear('blogs_list')
      if (!isNew) cacheClear(`blog_${form.slug}`)
      navigate('/admin/blogs')
    } else {
      alert('Error saving: ' + error.message)
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="p-8 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'New Blog Post' : 'Edit Blog Post'}
          </h1>
          <Link to="/admin/blogs" className="text-sm text-gray-500 hover:text-blue-900">
            ← Back to posts
          </Link>
        </div>
        <div className="flex gap-2">
          <button onClick={() => saveBlog(false)} disabled={saving}
            className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-60">
            Save as Draft
          </button>
          <button onClick={() => saveBlog(true)} disabled={saving}
            className="text-sm px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : '🚀 Publish'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor - takes 2 cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title + Slug */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text" value={form.title} onChange={handleTitleChange}
                className={`w-full border rounded-lg px-4 py-2.5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
                placeholder="Enter your blog post title..."
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">⚠️ {errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center border rounded-lg overflow-hidden ${errors.slug ? 'border-red-400' : 'border-gray-300'}`}>
                <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-500 border-r border-gray-300 select-none">/blogs/</span>
                <input
                  type="text" value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                  className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
              {errors.slug && <p className="text-xs text-red-500 mt-1">⚠️ {errors.slug}</p>}
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className={`bg-white rounded-xl border p-5 ${errors.content ? 'border-red-400' : 'border-gray-200'}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Content <span className="text-red-500">*</span>
            </label>
            <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-400 text-sm">Loading editor...</div>}>
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={content => setForm(f => ({ ...f, content }))}
                modules={QUILL_MODULES}
                placeholder="Write your blog post content here..."
              />
            </Suspense>
            {errors.content && <p className="text-xs text-red-500 mt-2">⚠️ {errors.content}</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Post Meta */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-4">Post Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Author</label>
                <input type="text" value={form.author}
                  onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Tags (comma separated)</label>
                <input type="text" value={form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Workbench, Tips, Industrial" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Cover Image URL</label>
                <input type="url" value={form.cover_image}
                  onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="https://res.cloudinary.com/..." />
                {form.cover_image && (
                  <img src={form.cover_image} alt="Cover preview"
                    className="mt-2 w-full h-28 object-cover rounded-lg border" />
                )}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-3">Excerpt</h3>
            <textarea
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
              placeholder="Short summary shown in the blog listing page..." />
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-3">🔍 SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">SEO Title</label>
                <input type="text" value={form.seo_title}
                  onChange={e => setForm(f => ({ ...f, seo_title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Leave blank to use post title" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Description</label>
                <textarea
                  value={form.seo_description}
                  onChange={e => setForm(f => ({ ...f, seo_description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                  placeholder="Leave blank to use excerpt" />
                <p className={`text-xs mt-1 ${form.seo_description.length > 160 ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                  {form.seo_description.length}/160 chars
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
