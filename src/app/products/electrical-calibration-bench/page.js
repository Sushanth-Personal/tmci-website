// src/app/products/electrical-calibration-bench/page.js
// ── SERVER COMPONENT — handles all SEO metadata and JSON-LD schema ──
// The client interactivity lives in ElectricalCalibrationBench.jsx

import ElectricalCalibrationBenchPage from "./ElectricalCalibrationBench";

// ── META TAGS ──────────────────────────────────────────────────────────────────
export const metadata = {
  title:
    "Electrical Calibration Test Bench | Custom Built in India — TMCI Technology",
  description:
    "Custom electrical calibration test bench built to your requirement. Covers multimeters, oscilloscopes, loop calibrators, clamp meter calibrators, insulation testers, power analyzers. ISO/IEC 17025 ready. Supplied to ISRO, NTPC, BPCL, Indian Navy. Manufactured in Bengaluru.",
  keywords:
    "electrical calibration bench, electrical calibration test bench, electronics calibration bench India, custom calibration bench Bengaluru, ISO 17025 calibration bench, NABL calibration bench, multifunction calibration bench, instrument calibration workstation India, calibration bench manufacturer India",
  openGraph: {
    title: "Electrical Calibration Test Bench — TMCI Technology, Bengaluru",
    description:
      "Custom electrical calibration test bench built to your requirement. ISO/IEC 17025 ready. 350+ clients including ISRO, NTPC, Indian Navy.",
    type: "website",
    locale: "en_IN",
    siteName: "TMCI Technology",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electrical Calibration Test Bench — TMCI Technology",
    description:
      "Custom electrical calibration test bench built to your requirement. ISO/IEC 17025 ready. Made in Bengaluru.",
  },
  alternates: {
    canonical: "https://www.tazkmazter.com/electrical-calibration-test-bench",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ── JSON-LD SCHEMA ─────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Electrical Calibration Test Bench",
      description:
        "Custom-built electrical calibration test bench configured to your instruments, bay size and audit requirement. Covers multimeters, oscilloscopes, loop calibrators, clamp meter calibrators, insulation testers, power analyzers and signal sources.",
      brand: { "@type": "Brand", name: "TMCI Technology" },
      manufacturer: {
        "@type": "Organization",
        name: "TMCI Technology Private Limited",
        url: "https://www.tazkmazter.com",
        logo: "https://www.tazkmazter.com/logo.png",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "#66, Ground Floor, 2nd Cross, Vignana Nagar, New Thippasandra Post",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560075",
          addressCountry: "IN",
        },
        telephone: "+91-97429-44306",
        email: "info@tazkmazter.com",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        areaServed: "IN",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Frame material",
          value: "CRCA steel, powder coated",
        },
        {
          "@type": "PropertyValue",
          name: "Worktop",
          value: "25mm ESD Prelam board",
        },
        {
          "@type": "PropertyValue",
          name: "Configuration",
          value: "100% custom built to requirement",
        },
        {
          "@type": "PropertyValue",
          name: "Lead time",
          value: "4 to 6 weeks",
        },
        {
          "@type": "PropertyValue",
          name: "Certifications",
          value: "ISO 9001:2015, CE, ROHS, BIFMA, IEC 61000, ANSI-ESD S20.20",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can TMCI build an electrical calibration bench around our existing instruments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Send us your instrument list and bay dimensions. We design the console layout around exactly what you have, fabricate the bench, and integrate everything during commissioning at your site.",
          },
        },
        {
          "@type": "Question",
          name: "Does the electrical calibration bench come with calibration certificates?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The bench is structural equipment and does not carry a calibration certificate. The instruments in it carry OEM certificates or certificates from an NABL-accredited laboratory. We coordinate this when instruments are in our supply scope.",
          },
        },
        {
          "@type": "Question",
          name: "What is the delivery time for an electrical calibration bench?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Four to six weeks from confirmed order and approved drawings. This covers fabrication, instrument integration, wiring, factory acceptance testing and dispatch.",
          },
        },
        {
          "@type": "Question",
          name: "What standard does the electrical calibration bench follow?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Primarily ISO/IEC 17025:2017 for labs seeking NABL accreditation. For in-house calibration under a QMS, ISO 9001:2015 clause 7.1.5. For ESD-sensitive work, ANSI/ESD S20.20.",
          },
        },
        {
          "@type": "Question",
          name: "Is installation of the electrical calibration bench included?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, for Bengaluru and major metros. For other locations it is quoted separately. Operator familiarisation is carried out at handover.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.tazkmazter.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Calibration Benches",
          item: "https://www.tazkmazter.com/calibration-benches",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Electrical Calibration Test Bench",
          item: "https://www.tazkmazter.com/electrical-calibration-test-bench",
        },
      ],
    },
  ],
};

// ── PAGE ───────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ElectricalCalibrationBenchPage />
    </>
  );
}
