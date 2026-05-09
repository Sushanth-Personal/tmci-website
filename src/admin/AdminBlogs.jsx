import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'
import { format } from 'date-fns'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadBlogs() }, [])

  async function loadBlogs() {
    const { data } = await supabase
      .from('blogs')
      .select('id,slug,title,published,author,created_at,tags')
      .order('created_at', { ascending: false })
    setBlogs(data || [])
    setLoading(false)
  }

  async function togglePublish(blog) {
    await supabase.from('blogs').update({ published: !blog.published }).eq('id', blog.id)
    cacheClear('blogs_list')
    cacheClear(`blog_${blog.slug}`)
    loadBlogs()
  }

  async function deleteBlog(blog) {
    if (!confirm(`Delete "${blog.title}"?\n\nThis action cannot be undone.`)) return
    await supabase.from('blogs').delete().eq('id', blog.id)
    cacheClear('blogs_list')
    cacheClear(`blog_${blog.slug}`)
    loadBlogs()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm">{blogs.length} total · {blogs.filter(b => b.published).length} published</p>
        </div>
        <Link to="/admin/blogs/new"
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-500 font-medium mb-4">No blog posts yet</p>
          <Link to="/admin/blogs/new" className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-bold">
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden lg:table-cell">Author</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr key={blog.id} className={`border-b last:border-0 hover:bg-gray-50/50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900 line-clamp-1">{blog.title}</div>
                    <div className="text-xs text-gray-400">/blogs/{blog.slug}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">{blog.author}</td>
                  <td className="py-3 px-4 text-gray-500 hidden md:table-cell">
                    {format(new Date(blog.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => togglePublish(blog)}
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${blog.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
                      {blog.published ? '● Published' : '○ Draft'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <Link to={`/admin/blogs/edit/${blog.id}`}
                        className="text-blue-700 hover:text-blue-900 font-semibold text-xs">
                        Edit
                      </Link>
                      {blog.published && (
                        <Link to={`/blogs/${blog.slug}`} target="_blank"
                          className="text-gray-500 hover:text-gray-700 font-semibold text-xs">
                          View ↗
                        </Link>
                      )}
                      <button onClick={() => deleteBlog(blog)}
                        className="text-red-500 hover:text-red-700 font-semibold text-xs">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
