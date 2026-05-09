import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { cacheGet, cacheSet } from '../lib/cache'
import SEOHead from '../components/SEOHead'
import DOMPurify from 'dompurify'

function SectionRenderer({ section, fallback }) {
  if (!section) return fallback || null
  if (section.content_type === 'html') {
    return (
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content) }} />
    )
  }
  if (section.content_type === 'image') {
    return <img src={section.content} alt={section.title} className="w-full rounded-xl" loading="lazy" />
  }
  return fallback || null
}

export default function Home() {
  const [sections, setSections] = useState({})
  const [faqs, setFaqs] = useState([])
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const cachedSections = cacheGet('home_sections')
    const cachedFaqs = cacheGet('faqs')
    if (cachedSections) setSections(cachedSections)
    if (cachedFaqs) setFaqs(cachedFaqs)
    if (cachedSections && cachedFaqs) return

    const [{ data: sectionsData }, { data: faqsData }] = await Promise.all([
      supabase.from('site_sections').select('*'),
      supabase.from('faqs').select('*').order('sort_order')
    ])

    const sectionMap = {}
    sectionsData?.forEach(s => { sectionMap[s.id] = s })
    setSections(sectionMap)
    setFaqs(faqsData || [])
    cacheSet('home_sections', sectionMap)
    cacheSet('faqs', faqsData || [])
  }

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'

  return (
    <>
      <SEOHead />

      {/* HERO */}
      <section className="min-h-screen pt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center">
        <div className="container-xl py-20 text-white">
          <SectionRenderer section={sections.hero} fallback={
            <div className="max-w-3xl">
              <div className="inline-block bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6">
                India's Leading Workbench Manufacturer
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Transform Your <span className="text-amber-400">Workspace</span>
              </h1>
              <p className="text-xl text-blue-200 mb-8 max-w-2xl">
                Premium custom workbench solutions built for professionals who demand the best. Engineered to last, designed to inspire.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/#workbench" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors">
                  🔧 Customize Workbench
                </a>
                <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello! I want to enquire about your workbenches.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-colors">
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          } />
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white border-b">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['500+', 'Projects Delivered'], ['20+', 'Years Experience'], ['50+', 'Industries Served'], ['5 yr', 'Warranty']].map(([num, label]) => (
              <div key={label}>
                <div className="text-4xl font-bold text-amber-500">{num}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container-xl">
          <SectionRenderer section={sections.about} fallback={
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">About Us</span>
                <h2 className="section-title mt-2">Precision Built for Professionals</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With over 20 years of experience, TMCI is India's leading manufacturer of precision workbenches for industrial and professional use.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We combine engineering excellence with ergonomic design to deliver workbenches that improve productivity and last a lifetime.
                </p>
                <a href="/#contact" className="btn-primary">Get In Touch</a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['🔧', 'Fully Customizable', 'Every dimension to your spec'], ['💪', 'Industrial Grade', 'Built to last decades'], ['⚡', 'Fast Delivery', '3-4 week turnaround'], ['🛡️', '5yr Warranty', 'Backed by our guarantee']].map(([icon, title, desc]) => (
                  <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-3xl mb-3">{icon}</div>
                    <div className="font-semibold text-gray-800 text-sm">{title}</div>
                    <div className="text-xs text-gray-500 mt-1">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          } />
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Our Products</span>
            <h2 className="section-title mt-2">Workbench Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From light-duty assembly benches to heavy industrial stations — we build it all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏗️', title: 'Industrial Workbenches', desc: 'Heavy-duty steel frame benches for factory floors and manufacturing units. Rated up to 1000kg capacity.' },
              { icon: '🔬', title: 'Lab & ESD Benches', desc: 'Anti-static ESD compliant workbenches for electronics labs, clean rooms and testing environments.' },
              { icon: '🛠️', title: 'Custom Workstations', desc: 'Fully bespoke configurations with drawers, shelves, power strips, monitor mounts and more.' }
            ].map(p => (
              <div key={p.title} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow hover:border-blue-200">
                <div className="text-5xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKBENCH CUSTOMIZER */}
      <section id="workbench" className="py-20 bg-blue-900 text-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Configurator</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Customize Your Workbench</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Tell us your requirements and we'll build the perfect workbench. Start a WhatsApp conversation with our experts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              ['📐', 'Dimensions', 'Custom width, depth & height'],
              ['🪵', 'Work Surface', 'Wood, steel, ESD laminate & more'],
              ['🗄️', 'Add-ons', 'Drawers, shelves, power, monitor arms']
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-blue-800 rounded-2xl p-5 text-center border border-blue-700">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="font-semibold text-white">{title}</div>
                <div className="text-blue-300 text-sm mt-1">{desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello! I want to customize a workbench. Can you help me get started?')}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg inline-block transition-colors">
              💬 Start Customizing on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">Got Questions?</span>
            <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <span className={`text-blue-900 text-xl transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-20 bg-white">
        <div className="container-xl">
          <SectionRenderer section={sections.cta} fallback={
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-12 text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-200 mb-8 text-lg max-w-xl mx-auto">Contact us today for a free quote and consultation. Our experts are ready to help.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hello!')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-colors">
                  💬 Chat on WhatsApp
                </a>
                <a href="mailto:info@tmci.in"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-colors">
                  ✉️ Email Us
                </a>
              </div>
            </div>
          } />
        </div>
      </section>
    </>
  )
}
