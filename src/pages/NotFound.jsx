import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="text-center px-4">
          <div className="text-9xl font-bold text-blue-900 opacity-10 mb-4 select-none">404</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md">The page you're looking for doesn't exist or may have been moved.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">← Back to Home</Link>
            <Link to="/blogs" className="btn-secondary">Browse Blog</Link>
          </div>
        </div>
      </div>
    </>
  )
}
