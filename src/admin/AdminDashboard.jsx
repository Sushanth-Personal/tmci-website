'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, published: 0, faqs: 0 })

  useEffect(() => {
    async function load() {
      const [{ count: total }, { count: published }, { count: faqs }] = await Promise.all([
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('faqs').select('*', { count: 'exact', head: true })
      ])
      setStats({ blogs: total || 0, published: published || 0, faqs: faqs || 0 })
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Blog Posts', value: stats.blogs, icon: '📝', href: '/admin/blogs', bg: '#EFF6FF', border: '#BFDBFE' },
    { label: 'Published Posts', value: stats.published, icon: '✅', href: '/admin/blogs', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: 'Total FAQs', value: stats.faqs, icon: '❓', href: '/admin/faqs', bg: '#FFFBEB', border: '#FDE68A' },
    { label: 'Site Sections', value: 3, icon: '🖥️', href: '/admin/sections', bg: '#F5F3FF', border: '#DDD6FE' },
  ]

  const actions = [
    { label: 'Write New Blog Post', icon: '✍️', href: '/admin/blogs/new', bg: 'var(--primary)' },
    { label: 'Edit Website Sections', icon: '🖥️', href: '/admin/sections', bg: 'var(--primary-dk)' },
    { label: 'Change Theme & Colours', icon: '🎨', href: '/admin/theme', bg: '#7C3AED' },
    { label: 'View Live Website', icon: '🌐', href: '/', bg: '#374151', target: '_blank' },
  ]

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Welcome back! Manage your TMCI website.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
        {cards.map(card => (
          <Link key={card.label} href={card.href} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: 12, padding: 20, textDecoration: 'none', transition: 'transform 0.15s' }}
            onMouseOver={e => e.currentTarget.style.transform='translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform=''}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>{card.value}</div>
            <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4, fontWeight: 500 }}>{card.label}</div>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {actions.map(action => (
          <Link key={action.label} href={action.href} target={action.target} style={{ background: action.bg, color: '#fff', borderRadius: 12, padding: '18px 16px', textAlign: 'center', textDecoration: 'none', transition: 'opacity 0.15s' }}
            onMouseOver={e => e.currentTarget.style.opacity='0.85'}
            onMouseOut={e => e.currentTarget.style.opacity='1'}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{action.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}