'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminStore } from '../store/adminStore'
import { cacheClearAll } from '../lib/cache'
import { useState } from 'react'

const MENU = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/sections', label: 'Website Sections', icon: '🖥️' },
  { href: '/admin/blogs', label: 'Blog Posts', icon: '📝' },
  { href: '/admin/faqs', label: 'FAQs', icon: '❓' },
  { href: '/admin/workbench', label: 'Workbench Options', icon: '🔧' },
  { href: '/admin/theme', label: 'Theme & Colours', icon: '🎨' },   // ← NEW
]

export default function AdminLayout({ children }) {
  const { logout } = useAdminStore()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    cacheClearAll()
    await logout()
  }

  const SidebarContent = () => (
    <>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>TM</div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>TMCI Admin</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>Website Manager</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '16px 10px' }}>
        {MENU.map(item => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 7, marginBottom: 2,
                fontSize: 13, fontWeight: 500,
                color: active ? 'var(--primary-lt)' : 'rgba(255,255,255,0.45)',
                background: active ? 'rgba(0,191,165,0.12)' : 'transparent',
                transition: 'all 0.15s', textDecoration: 'none'
              }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
              {/* Highlight theme item as new */}
              {item.href === '/admin/theme' && !active && (
                <span style={{ marginLeft: 'auto', fontSize: 9, background: 'var(--primary)', color: '#fff', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>NEW</span>
              )}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" target="_blank"
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'rgba(255,255,255,0.3)', padding: '7px 12px', borderRadius: 6, transition: 'all 0.15s', textDecoration: 'none', marginBottom: 2 }}>
          🌐 View Live Website ↗
        </Link>
        <button onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'rgba(239,68,68,0.7)', padding: '7px 12px', borderRadius: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'left' }}>
          🚪 Logout
        </button>
      </div>
    </>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6', display: 'flex' }}>
      {/* Desktop sidebar */}
      <aside style={{ width: 220, background: '#0D1117', flexShrink: 0, display: 'flex', flexDirection: 'column' }}
        className="hidden-mobile">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
          <aside style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 220, background: '#0D1117', display: 'flex', flexDirection: 'column' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Mobile header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 18, height: 2, background: '#374151' }} />
            <div style={{ width: 18, height: 2, background: '#374151' }} />
            <div style={{ width: 18, height: 2, background: '#374151' }} />
          </button>
          <span style={{ fontWeight: 700, color: '#0D1117', fontSize: 14 }}>TMCI Admin</span>
        </div>
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
