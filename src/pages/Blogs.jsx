import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import BlogCard from '../components/BlogCard'
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
      .from('blogs')
      .select('id,slug,title,excerpt,cover_image,author,tags,created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })

    setBlogs(data || [])
    setLoading(false)
    extractTags(data || [])
    cacheSet('blogs_list', data || [])
  }

  function extractTags(blogs) {
    const tags = new Set()
    blogs.forEach(b => b.tags?.forEach(t => tags.add(t)))
    setAllTags([...tags])
  }

  return (
    <>
      <SEOHead
        title="Blog — Workbench Tips & Industry Insights"
        description="Expert articles on workbench design, industrial ergonomics, maintenance tips and more from TMCI."
      />
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container-xl">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Knowledge Hub</span>
            <h1 className="text-4xl font-bold text-blue-900 mt-2 mb-3">Our Blog</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Expert insights on workbench design, maintenance, and workplace productivity</p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="search"
              placeholder="🔍 Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
            />
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSelectedTag('')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!selectedTag ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-900'}`}>
                All
              </button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selectedTag === tag ? 'bg-blue-900 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-900'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-2">Try a different search term or tag</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(blog => <BlogCard key={blog.id} blog={blog} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
