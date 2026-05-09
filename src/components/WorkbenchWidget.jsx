import { useState } from 'react'

export default function WorkbenchWidget() {
  const [expanded, setExpanded] = useState(false)
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
  const waMsg = encodeURIComponent('Hello! I want to customize a workbench. Please help me get started.')

  return (
    <div className="fixed right-6 bottom-24 z-40 flex flex-col items-end gap-2">
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl p-5 w-64 border border-gray-100">
          <h3 className="font-bold text-blue-900 text-base mb-3">🔧 Customize Workbench</h3>
          <p className="text-sm text-gray-600 mb-4">
            Build your perfect workbench. Choose size, material, add-ons and get an instant quote via WhatsApp.
          </p>
          <a
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full text-sm text-center block">
            Start on WhatsApp →
          </a>
          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-gray-400 mt-3 w-full text-center hover:text-gray-600">
            Close
          </button>
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="bg-blue-900 text-white rounded-full px-4 py-3 shadow-xl hover:bg-blue-800 transition-all duration-200 flex items-center gap-2 font-semibold text-sm"
        aria-label="Customize Workbench">
        🔧 <span className="hidden sm:inline">Workbench</span>
      </button>
    </div>
  )
}
