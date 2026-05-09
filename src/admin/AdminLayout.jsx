import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAdminStore } from '../store/adminStore'
import { cacheClearAll } from '../lib/cache'
import { useState } from 'react'

const MENU = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/sections', label: 'Website Sections', icon: '🖥️' },
  { href: '/admin/blogs', label: 'Blog Posts', icon: '📝' },
  { href: '/admin/faqs', label: 'FAQs', icon: '❓' },
  { href: '/admin/workbench', label: 'Workbench Options', icon: '🔧' },
]

export default function AdminLayout() {
  const { logout } = useAdminStore()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    cacheClearAll()
    await logout()
  }

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-blue-900 font-bold">T</span>
          </div>
          <div>
            <div className="font-bold text-white">TMCI Admin</div>
            <div className="text-xs text-blue-300">Website Manager</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3">
        {MENU.map(item => {
          const active = item.exact
            ? location.pathname === item.href
            : location.pathname.startsWith(item.href)
          return (
            <Link key={item.href} to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors
                ${active ? 'bg-white/20 text-white' : 'text-blue-300 hover:bg-white/10 hover:text-white'}`}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-blue-800 space-y-1">
        <Link to="/" target="_blank"
          className="flex items-center gap-2 text-xs text-blue-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
          🌐 View Live Website ↗
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left">
          🚪 Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <aside className="w-60 bg-blue-900 flex-shrink-0 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-blue-900 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-1">
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>
          <span className="font-bold text-blue-900">TMCI Admin</span>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
