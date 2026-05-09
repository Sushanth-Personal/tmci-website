import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '../store/adminStore'

const ATTEMPTS_KEY = 'tmci_login_attempts'
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

function getAttempts() {
  try {
    const stored = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{"count":0,"since":0}')
    if (Date.now() - stored.since > LOCKOUT_MS) return { count: 0, since: Date.now() }
    return stored
  } catch { return { count: 0, since: Date.now() } }
}

function recordAttempt() {
  const a = getAttempts()
  const updated = { count: a.count + 1, since: a.count === 0 ? Date.now() : a.since }
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated))
  return updated
}

function resetAttempts() {
  localStorage.removeItem(ATTEMPTS_KEY)
}

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [locked, setLocked] = useState(false)
  const [lockRemaining, setLockRemaining] = useState(0)
  const { login, session, init } = useAdminStore()
  const navigate = useNavigate()

  useEffect(() => {
    init()
    const a = getAttempts()
    if (a.count >= MAX_ATTEMPTS) {
      const remaining = LOCKOUT_MS - (Date.now() - a.since)
      if (remaining > 0) { setLocked(true); setLockRemaining(remaining) }
    }
  }, [])

  useEffect(() => {
    if (session) navigate('/admin', { replace: true })
  }, [session])

  useEffect(() => {
    if (!locked) return
    const interval = setInterval(() => {
      const a = getAttempts()
      const remaining = LOCKOUT_MS - (Date.now() - a.since)
      if (remaining <= 0) { setLocked(false); resetAttempts(); clearInterval(interval) }
      else setLockRemaining(remaining)
    }, 1000)
    return () => clearInterval(interval)
  }, [locked])

  async function handleSubmit(e) {
    e.preventDefault()
    if (locked) return

    const a = getAttempts()
    if (a.count >= MAX_ATTEMPTS) {
      setLocked(true); setLockRemaining(LOCKOUT_MS - (Date.now() - a.since)); return
    }

    setLoading(true); setError('')
    try {
      await login(email, password)
      resetAttempts()
      navigate('/admin', { replace: true })
    } catch {
      const updated = recordAttempt()
      if (updated.count >= MAX_ATTEMPTS) {
        setLocked(true); setLockRemaining(LOCKOUT_MS)
        setError('Too many failed attempts. Locked for 15 minutes.')
      } else {
        setError(`Invalid credentials. ${MAX_ATTEMPTS - updated.count} attempt${MAX_ATTEMPTS - updated.count !== 1 ? 's' : ''} remaining.`)
      }
    } finally {
      setLoading(false)
    }
  }

  const minutes = Math.ceil(lockRemaining / 60000)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">TMCI Website Management</p>
        </div>

        {locked ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <p className="text-red-700 font-bold text-lg">Account Locked</p>
            <p className="text-red-600 text-sm mt-2">
              Too many failed attempts. Try again in <strong>{minutes} minute{minutes !== 1 ? 's' : ''}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                ⚠️ {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="admin@tmci.in" autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password" required value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="••••••••" autoComplete="current-password"
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        <p className="text-xs text-center text-gray-400 mt-6">
          🔐 Restricted area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
