import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {blog.cover_image && (
        <Link to={`/blogs/${blog.slug}`}>
          <img
            src={blog.cover_image}
            alt={blog.title}
            loading="lazy"
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-5">
        {blog.tags?.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {blog.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          <Link to={`/blogs/${blog.slug}`} className="hover:text-blue-900 transition-colors">
            {blog.title}
          </Link>
        </h3>
        {blog.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{blog.author}</span>
          <span>{format(new Date(blog.created_at), 'MMM d, yyyy')}</span>
        </div>
        <Link to={`/blogs/${blog.slug}`}
          className="mt-4 inline-block text-blue-700 font-semibold text-sm hover:text-blue-900">
          Read More →
        </Link>
      </div>
    </article>
  )
}
