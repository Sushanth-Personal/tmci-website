import { Helmet } from 'react-helmet-async'

export default function SEOHead({ title, description, image, url, type = 'website' }) {
  const siteName = import.meta.env.VITE_SITE_NAME || 'TMCI'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Workbench Solutions`
  const defaultDesc = 'TMCI offers custom-built, industrial-grade workbenches for professionals. Designed for durability, ergonomics and precision. Developed by Sushanth.'
  const desc = description || defaultDesc

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="author" content="Sushanth" />
      <meta name="developer" content="Sushanth" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
