'use client'
import { useState } from 'react'

export default function WorkbenchWidget() {
  const [expanded, setExpanded] = useState(false)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919742944306'
  const waMsg = encodeURIComponent('Hello TMCI! I want to configure a custom workbench. Can you help me get started?')

  return (
    <div style={{ position: 'fixed', right: 24, bottom: 88, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      {expanded && (
        <div style={{
          background: '#0D1117',
          border: '1px solid rgba(0,191,165,0.2)',
          borderRadius: 14, padding: '18px 20px', width: 260,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          animation: 'fadeUp 0.2s ease'
        }}>
          <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-lt)', marginBottom: 8 }}>
            🔧 Customize Workbench
          </div>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 14 }}>
            Build your exact bench configuration — size, material, modules and add-ons. Get a quote instantly on WhatsApp.
          </p>
          <a href="#workbench" onClick={() => setExpanded(false)}
            style={{ display: 'block', background: 'var(--primary)', color: '#fff', textAlign: 'center', padding: '9px 16px', borderRadius: 7, fontSize: 12.5, fontWeight: 700, marginBottom: 8, textDecoration: 'none' }}>
            Open Configurator →
          </a>
          <a href={`https://wa.me/${waNumber}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: 'rgba(37,211,102,0.85)', padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
            💬 Chat on WhatsApp
          </a>
          <button onClick={() => setExpanded(false)}
            style={{ display: 'block', width: '100%', marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            Close
          </button>
        </div>
      )}

      <button onClick={() => setExpanded(!expanded)}
        style={{
          background: expanded ? 'var(--primary-dk)' : 'var(--primary)',
          color: '#fff', border: 'none',
          borderRadius: 50, padding: '11px 18px',
          boxShadow: '0 4px 20px rgba(0,137,123,0.4)',
          cursor: 'pointer', fontFamily: 'var(--ff)',
          fontSize: 13, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8,
          transition: 'all 0.2s',
          whiteSpace: 'nowrap'
        }}
        aria-label="Customize Workbench">
        🔧 <span>Workbench</span>
      </button>
    </div>
  )
}
