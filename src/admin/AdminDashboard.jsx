import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    { label: 'Total Blog Posts', value: stats.blogs, icon: '📝', href: '/admin/blogs', color: 'bg-blue-50 border-blue-200' },
    { label: 'Published Posts', value: stats.published, icon: '✅', href: '/admin/blogs', color: 'bg-green-50 border-green-200' },
    { label: 'Total FAQs', value: stats.faqs, icon: '❓', href: '/admin/faqs', color: 'bg-amber-50 border-amber-200' },
    { label: 'Site Sections', value: 3, icon: '🖥️', href: '/admin/sections', color: 'bg-purple-50 border-purple-200' },
  ]

  const quickActions = [
    { label: 'Write New Blog Post', icon: '✍️', href: '/admin/blogs/new', color: 'bg-blue-900 hover:bg-blue-800' },
    { label: 'Edit Website Sections', icon: '🖥️', href: '/admin/sections', color: 'bg-blue-700 hover:bg-blue-600' },
    { label: 'Manage FAQs', icon: '❓', href: '/admin/faqs', color: 'bg-amber-500 hover:bg-amber-600' },
    { label: 'View Live Website', icon: '🌐', href: '/', color: 'bg-gray-700 hover:bg-gray-600', target: '_blank' },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Manage your TMCI website from here.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <Link key={card.label} to={card.href}
            className={`${card.color} border rounded-xl p-5 hover:shadow-md transition-shadow`}>
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-3xl font-bold text-gray-900">{card.value}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{card.label}</div>
          </Link>
        ))}
      </div>

      <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map(action => (
          <Link key={action.label} to={action.href} target={action.target}
            className={`${action.color} text-white rounded-xl p-5 text-center transition-colors`}>
            <div className="text-3xl mb-2">{action.icon}</div>
            <div className="text-xs font-semibold leading-tight">{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
