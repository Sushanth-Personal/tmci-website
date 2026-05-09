import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Products', href: '/#products' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="container-xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-blue-900">TMCI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.label} to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === link.href ? 'text-blue-900 bg-blue-50' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/#workbench"
              className="ml-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              🔧 Customize Workbench
            </Link>
          </div>

          {/* Mobile burger */}
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-gray-800 my-1.5 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-white border-t py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <Link key={link.label} to={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md mx-2">
                {link.label}
              </Link>
            ))}
            <Link to="/#workbench" onClick={() => setOpen(false)}
              className="block mx-2 mt-2 bg-amber-500 text-white text-center py-2.5 rounded-lg text-sm font-semibold">
              🔧 Customize Workbench
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
