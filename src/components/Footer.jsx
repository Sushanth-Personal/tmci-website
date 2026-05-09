import { Link } from 'react-router-dom'

export default function Footer() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
  const waMsg = encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hello TMCI!')

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">TMCI</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Premium workbench solutions built for professionals.
              Every bench is crafted with precision and care.
            </p>
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              💬 Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {[['Home', '/'], ['About', '/#about'], ['Products', '/#products'], ['Blogs', '/blogs'], ['FAQ', '/#faq'], ['Contact', '/#contact']].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>📍 Your Address Here</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@tmci.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs text-blue-300">
          <p>© {new Date().getFullYear()} TMCI. All rights reserved.</p>
          <p>Developed by <span className="text-white font-semibold">Sushanth</span></p>
        </div>
      </div>
    </footer>
  )
}
