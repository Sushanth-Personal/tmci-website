import "./globals.css";
import Providers from "../components/Providers";
import ThemeLoader from "../components/ThemeLoader";

export const metadata = {
  title: {
    default: "TMCI Technology — Calibration Bench Manufacturer, Bengaluru",
    template: "%s | TMCI Technology",
  },
  description:
    "Custom calibration benches, ESD workstations and test systems built to specification. Supplied to ISRO, Indian Navy, BPCL, NTPC and 350+ clients. ISO 9001:2015 certified manufacturer since 2012. Bengaluru, India.",
  keywords: [
    "calibration bench manufacturer",
    "calibration test bench",
    "ESD workstation",
    "test bench manufacturer India",
    "calibration bench Bengaluru",
    "temperature calibration bench",
    "pressure calibration bench",
    "laboratory workbench",
    "TMCI Technology",
    "ISO 17025 calibration bench",
  ],
  authors: [
    { name: "TMCI Technology Private Limited" },
    { name: "Sushanth P", url: "https://www.linkedin.com/in/sushanth-p" },
  ],
  creator: "Sushanth P",
  metadataBase: new URL("https://tmcisystems.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TMCI Technology — Calibration Bench Manufacturer, Bengaluru",
    description:
      "Custom calibration benches, ESD workstations and test systems. Supplied to ISRO, Indian Navy, BPCL and 350+ clients across India and internationally.",
    url: "https://tmcisystems.com",
    siteName: "TMCI Technology",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMCI Technology — Calibration Bench Manufacturer",
    description:
      "Custom calibration benches, ESD workstations and test systems. ISO 9001:2015 certified. Bengaluru, India.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tmcisystems.com/#organization",
      name: "TMCI Technology Private Limited",
      url: "https://tmcisystems.com",
      foundingDate: "2012",
      description:
        "Manufacturer, Exporter and Supplier of Calibration Benches, ESD Workstations, Test Benches and Test & Measurement Instruments. ISO 9001:2015 certified.",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "#66 Ground Floor, 2nd Cross, L Narayana Reddy Main Road, Vignan Nagar",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560075",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-97429-44306",
          contactType: "sales",
          availableLanguage: ["English", "Hindi", "Kannada"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-80-4895-7300",
          contactType: "customer service",
        },
      ],
      email: "info@tazkmazter.com",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://tmcisystems.com/#localbusiness",
      name: "TMCI Technology Private Limited",
      image:
        "https://res.cloudinary.com/dkhmnkxzo/image/upload/v1778324996/hero-bench_oq3kb0.png",
      url: "https://tmcisystems.com",
      telephone: "+919742944306",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "#66 Ground Floor, 2nd Cross, L Narayana Reddy Main Road, Vignan Nagar",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560075",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716, // ← update with exact coordinates from Google Maps
        longitude: 77.5946, // ← update with exact coordinates from Google Maps
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://tmcisystems.com/#website",
      url: "https://tmcisystems.com",
      name: "TMCI Technology",
      publisher: { "@id": "https://tmcisystems.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <ThemeLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
