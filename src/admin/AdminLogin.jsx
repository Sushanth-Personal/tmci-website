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
function resetAttempts() { localStorage.removeItem(ATTEMPTS_KEY) }

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

  useEffect(() => { if (session) navigate('/admin', { replace: true }) }, [session])

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
    if (a.count >= MAX_ATTEMPTS) { setLocked(true); return }
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
        setError(`Invalid credentials. ${MAX_ATTEMPTS - updated.count} attempts remaining.`)
      }
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #060E18, #0A1E2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 40, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: 'var(--primary)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 18, fontWeight: 800, color: '#fff' }}>TM</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', letterSpacing: -0.5 }}>Admin Panel</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>TMCI Website Management</p>
        </div>

        {locked ? (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
            <p style={{ fontWeight: 700, color: '#DC2626' }}>Account Locked</p>
            <p style={{ fontSize: 13, color: '#EF4444', marginTop: 6 }}>Try again in <strong>{Math.ceil(lockRemaining / 60000)} minute(s)</strong></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: 13, borderRadius: 8, padding: '10px 14px' }}>⚠️ {error}</div>}
            {[['Email','email',email,setEmail,'admin@tmci.in','username'],['Password','password',password,setPassword,'••••••••','current-password']].map(([label,type,val,setter,ph,ac]) => (
              <div key={label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mid)', display: 'block', marginBottom: 6 }}>{label}</label>
                <input type={type} value={val} onChange={e => setter(e.target.value)} required placeholder={ph} autoComplete={ac}
                  style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: 'var(--ff)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <button type="submit" disabled={loading}
              style={{ background: loading ? 'var(--muted)' : 'var(--primary)', color: '#fff', border: 'none', padding: '12px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--ff)', marginTop: 4 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}
        <p style={{ fontSize: 11, textAlign: 'center', color: 'var(--muted)', marginTop: 20 }}>🔐 Restricted area. Unauthorized access prohibited.</p>
      </div>
    </div>
  )
}