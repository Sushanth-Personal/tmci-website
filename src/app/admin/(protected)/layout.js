'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '../../../store/adminStore'
import AdminLayout from '../../../admin/AdminLayout'

export default function ProtectedAdminLayout({ children }) {
  const { session, loading, init } = useAdminStore()
  const router = useRouter()

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/admin/login')
    }
  }, [loading, session])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ width: 40, height: 40, border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!session) return null

  return <AdminLayout>{children}</AdminLayout>
}
