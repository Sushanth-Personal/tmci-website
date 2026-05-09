import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheClear } from '../lib/cache'

// ── PRESET THEMES ──
const PRESETS = [
  {
    name: 'Teal (Default)',
    preview: '#00897B',
    vars: {
      primary: '#00897B',
      primaryDk: '#00695C',
      primaryMd: '#00BFA5',
      primaryLt: '#4DD0C4',
      accent: '#F59E0B',
      accentLt: '#FCD34D',
    }
  },
  {
    name: 'Navy Blue',
    preview: '#1E3A5F',
    vars: {
      primary: '#1E3A5F',
      primaryDk: '#152B47',
      primaryMd: '#2E5C99',
      primaryLt: '#5B8DD9',
      accent: '#F59E0B',
      accentLt: '#FCD34D',
    }
  },
  {
    name: 'Deep Purple',
    preview: '#5B21B6',
    vars: {
      primary: '#5B21B6',
      primaryDk: '#4C1D95',
      primaryMd: '#7C3AED',
      primaryLt: '#A78BFA',
      accent: '#F59E0B',
      accentLt: '#FCD34D',
    }
  },
  {
    name: 'Slate & Orange',
    preview: '#334155',
    vars: {
      primary: '#334155',
      primaryDk: '#1E293B',
      primaryMd: '#475569',
      primaryLt: '#94A3B8',
      accent: '#EA580C',
      accentLt: '#FB923C',
    }
  },
  {
    name: 'Forest Green',
    preview: '#166534',
    vars: {
      primary: '#166534',
      primaryDk: '#14532D',
      primaryMd: '#16A34A',
      primaryLt: '#4ADE80',
      accent: '#CA8A04',
      accentLt: '#FDE047',
    }
  },
  {
    name: 'Steel & Red',
    preview: '#1C2A3A',
    vars: {
      primary: '#1C2A3A',
      primaryDk: '#111A25',
      primaryMd: '#2E4057',
      primaryLt: '#5B7FA6',
      accent: '#DC2626',
      accentLt: '#F87171',
    }
  },
]

const DEFAULT_THEME = PRESETS[0].vars

function applyThemeToDOM(vars) {
  const root = document.documentElement
  root.style.setProperty('--primary', vars.primary)
  root.style.setProperty('--primary-dk', vars.primaryDk)
  root.style.setProperty('--primary-md', vars.primaryMd)
  root.style.setProperty('--primary-lt', vars.primaryLt)
  root.style.setProperty('--primary-pale', `${vars.primaryMd}14`)
  root.style.setProperty('--primary-pale-solid', `${vars.primaryLt}22`)
  root.style.setProperty('--accent', vars.accent)
  root.style.setProperty('--accent-lt', vars.accentLt)
  root.style.setProperty('--glass-hover', `${vars.primaryMd}12`)
  root.style.setProperty('--selected-bg', `${vars.primaryMd}1F`)
  root.style.setProperty('--selected-border', `${vars.primaryMd}8C`)
}

export function loadThemeFromStorage() {
  try {
    const saved = localStorage.getItem('tmci_theme')
    if (saved) {
      const vars = JSON.parse(saved)
      applyThemeToDOM(vars)
    }
  } catch {}
}

export default function AdminTheme() {
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activePreset, setActivePreset] = useState(0)

  useEffect(() => {
    loadFromDB()
  }, [])

  async function loadFromDB() {
    const { data } = await supabase
      .from('site_sections')
      .select('content')
      .eq('id', 'theme')
      .single()

    if (data?.content) {
      try {
        const vars = JSON.parse(data.content)
        setTheme(vars)
        applyThemeToDOM(vars)
        // Check which preset matches
        const matchIndex = PRESETS.findIndex(p =>
          p.vars.primary.toLowerCase() === vars.primary?.toLowerCase()
        )
        if (matchIndex >= 0) setActivePreset(matchIndex)
        else setActivePreset(-1) // custom
      } catch {}
    }
  }

  function selectPreset(preset, index) {
    setTheme(preset.vars)
    setActivePreset(index)
    applyThemeToDOM(preset.vars)
  }

  function updateColor(key, value) {
    const updated = { ...theme, [key]: value }
    setTheme(updated)
    setActivePreset(-1) // now custom
    applyThemeToDOM(updated)
  }

  async function saveTheme() {
    setSaving(true)
    await supabase.from('site_sections').upsert({
      id: 'theme',
      title: 'Site Theme',
      content_type: 'json',
      content: JSON.stringify(theme),
      updated_at: new Date().toISOString()
    })
    // Also save to localStorage so it loads immediately on next visit
    localStorage.setItem('tmci_theme', JSON.stringify(theme))
    cacheClear('home_sections')
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function resetToDefault() {
    setTheme(DEFAULT_THEME)
    setActivePreset(0)
    applyThemeToDOM(DEFAULT_THEME)
  }

  const colorFields = [
    { key: 'primary', label: 'Primary', desc: 'Main brand colour — nav mark, buttons, links, accents' },
    { key: 'primaryDk', label: 'Primary Dark', desc: 'Hover state of primary — darker shade' },
    { key: 'primaryMd', label: 'Primary Medium', desc: 'Hero buttons, ticker background, CTA banner' },
    { key: 'primaryLt', label: 'Primary Light', desc: 'Light text on dark backgrounds, eyebrow tags' },
    { key: 'accent', label: 'Accent', desc: 'Star ratings, knob indicators, highlights' },
    { key: 'accentLt', label: 'Accent Light', desc: 'Hover state of accent colour' },
  ]

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>Theme Manager</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
          Change your entire website's colour scheme in one place. Changes apply live across all pages instantly.
        </p>
      </div>

      {/* Live preview bar */}
      <div style={{ background: '#111', borderRadius: 12, padding: '14px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>Live Preview</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { bg: theme.primary, label: 'Primary' },
            { bg: theme.primaryMd, label: 'Medium' },
            { bg: theme.primaryLt, label: 'Light' },
            { bg: theme.primaryDk, label: 'Dark' },
            { bg: theme.accent, label: 'Accent' },
          ].map(({ bg, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: bg, border: '1px solid rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{bg}</span>
            </div>
          ))}
        </div>
        {/* Mini nav preview */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 24, height: 24, borderRadius: 5, background: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>TM</div>
          <div style={{ background: theme.primary, color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Button</div>
          <div style={{ background: theme.primaryMd, color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>CTA</div>
          <div style={{ background: theme.accent, color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>Accent</div>
        </div>
      </div>

      {/* Preset themes */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Preset Themes</h3>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 16 }}>Click any preset to apply instantly — then fine-tune below if needed.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {PRESETS.map((preset, i) => (
            <button key={preset.name} onClick={() => selectPreset(preset, i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                border: activePreset === i ? `2px solid ${preset.vars.primary}` : '1.5px solid #E5E7EB',
                background: activePreset === i ? `${preset.vars.primary}0D` : '#F9FAFB',
                transition: 'all 0.15s'
              }}>
              {/* Colour swatches */}
              <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                {[preset.vars.primary, preset.vars.primaryMd, preset.vars.primaryLt, preset.vars.accent].map((c, ci) => (
                  <div key={ci} style={{ width: 12, height: 28, borderRadius: 3, background: c }} />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#111' }}>{preset.name}</div>
                {activePreset === i && <div style={{ fontSize: 10, color: preset.vars.primary, fontWeight: 700, marginTop: 2 }}>✓ Active</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom colour pickers */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
          Custom Colours {activePreset === -1 && <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>Custom theme</span>}
        </h3>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 20 }}>Fine-tune individual colours. Changes preview live on your website immediately.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {colorFields.map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 14px', border: '1px solid #F3F4F6', borderRadius: 8, background: '#FAFAFA' }}>
              {/* Colour picker */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: theme[key], border: '2px solid #E5E7EB', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                  <input type="color" value={theme[key]} onChange={e => updateColor(key, e.target.value)}
                    style={{ position: 'absolute', inset: -4, width: 'calc(100% + 8px)', height: 'calc(100% + 8px)', opacity: 0, cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151' }}>{label}</label>
                  <code style={{ fontSize: 10, color: '#6B7280', background: '#F3F4F6', padding: '2px 6px', borderRadius: 4 }}>{theme[key]}</code>
                </div>
                <p style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.5 }}>{desc}</p>
                {/* Hex input */}
                <input type="text" value={theme[key]}
                  onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) updateColor(key, e.target.value) }}
                  style={{ marginTop: 6, width: '100%', border: '1px solid #E5E7EB', borderRadius: 5, padding: '4px 8px', fontSize: 11, fontFamily: 'monospace', color: '#374151', outline: 'none', background: '#fff' }}
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 10 }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        <div style={{ fontSize: 12.5, color: '#92400E', lineHeight: 1.6 }}>
          <strong>Preview is live.</strong> Your current browser tab already shows the new colours. Click <strong>Save Theme</strong> to make it permanent for all visitors. Changes will apply across the entire website including nav, buttons, accents, and backgrounds.
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={saveTheme} disabled={saving}
          style={{
            background: saving ? '#9CA3AF' : saved ? '#16A34A' : theme.primary,
            color: '#fff', border: 'none', padding: '10px 28px',
            borderRadius: 8, fontWeight: 700, fontSize: 13.5, cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', fontFamily: 'inherit'
          }}>
          {saving ? 'Saving...' : saved ? '✓ Theme Saved!' : 'Save Theme'}
        </button>
        <button onClick={resetToDefault}
          style={{ background: 'none', border: '1.5px solid #E5E7EB', color: '#6B7280', padding: '10px 20px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          Reset to Default
        </button>
        <a href="/" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12.5, color: '#6B7280', marginLeft: 8 }}>
          View Live Site ↗
        </a>
      </div>
    </div>
  )
}
