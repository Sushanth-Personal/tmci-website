import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import SEOHead from '../components/SEOHead'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'

export default function BlogPost() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => { loadBlog() }, [slug])

  async function loadBlog() {
    const key = `blog_${slug}`
    const cached = cacheGet(key)
    if (cached) { setBlog(cached); setLoading(false); return }

    const { data, error } = await supabase
      .from('blogs').select('*').eq('slug', slug).eq('published', true).single()

    if (error || !data) { setNotFound(true); setLoading(false); return }
    setBlog(data)
    setLoading(false)
    cacheSet(key, data)
  }

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full" />
    </div>
  )

  if (notFound) return <Navigate to="/blogs" replace />

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'

  return (
    <>
      <SEOHead
        title={blog.seo_title || blog.title}
        description={blog.seo_description || blog.excerpt}
        image={blog.cover_image}
        type="article"
      />
      <div className="pt-24 pb-16 min-h-screen">
        <article className="container-xl max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
            <Link to="/" className="hover:text-blue-900">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-blue-900">Blog</Link>
            <span>/</span>
            <span className="text-gray-700 line-clamp-1">{blog.title}</span>
          </nav>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {blog.tags.map(tag => (
                <Link key={tag} to={`/blogs`}
                  className="text-xs bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b">
            <span>By <strong className="text-gray-700">{blog.author}</strong></span>
            <span>•</span>
            <span>{format(new Date(blog.created_at), 'MMMM d, yyyy')}</span>
          </div>

          {blog.cover_image && (
            <img src={blog.cover_image} alt={blog.title}
              className="w-full rounded-2xl mb-10 max-h-96 object-cover" />
          )}

          {/* Blog Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-blue-900 rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-2">Interested in Our Workbenches?</h3>
            <p className="text-blue-200 mb-4">Chat with us on WhatsApp for a free consultation and quote</p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello! I just read your blog and I\'m interested in your workbenches. Can you help me?')}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold inline-block transition-colors">
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Back */}
          <div className="mt-8 text-center">
            <Link to="/blogs" className="text-blue-700 hover:text-blue-900 font-medium">
              ← Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}
