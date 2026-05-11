import './globals.css'
import Providers from '../components/Providers'
import ThemeLoader from '../components/ThemeLoader'

export const metadata = {
  title: 'TMCI Technology — Calibration & Test Bench Solutions',
  description:
    'TMCI Technology — Manufacturer & Exporter of Calibration Test Benches, ESD Workstations and Test & Measurement Instruments from Bengaluru, India.',
  authors: [{ name: 'Sushanth' }],
  openGraph: {
    type: 'website',
    siteName: 'TMCI Technology',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <ThemeLoader />
          {children}
        </Providers>
      </body>
    </html>
  )
}
