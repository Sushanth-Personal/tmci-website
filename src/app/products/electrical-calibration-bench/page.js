"use client";
import { useState } from "react";
import Link from "next/link";

const CATALOGUE = [
  {
    cat: "Power Distribution & Protection",
    items: [
      {
        id: "main-ac",
        name: "Main AC Power Supply",
        desc: "230V / 415V single or three phase, RCCB, line indicators, emergency stop, VIF meter",
        brands: ["Schneider", "ABB", "Siemens", "L&T"],
      },
      {
        id: "rccb",
        name: "RCCB System Protection",
        desc: "Residual current circuit breaker for entire bench system protection",
        brands: ["Schneider", "ABB", "Legrand", "Havells"],
      },
      {
        id: "mcb",
        name: "MCB Individual Facility Protection",
        desc: "Miniature circuit breakers for each facility independently",
        brands: ["Schneider", "ABB", "L&T", "Havells"],
      },
      {
        id: "stabilizer",
        name: "Voltage Stabilizer",
        desc: "3KVA or 5KVA input stabilisation for entire bench",
        brands: ["TPC", "Servokon", "V-Guard", "Liyod"],
      },
      {
        id: "epb",
        name: "Emergency Push Button",
        desc: "Emergency stop for immediate power cutoff",
        brands: ["Schneider", "ABB", "Siemens"],
      },
    ],
  },
  {
    cat: "AC Power Sources",
    items: [
      {
        id: "230v-sockets",
        name: "230V AC Power Sockets",
        desc: "230V 5/15A switch and socket with on/off indication",
        brands: ["Anchor", "Havells", "Legrand", "Simon"],
      },
      {
        id: "110v-facility",
        name: "110V AC Facility via Stepdown",
        desc: "110V 5A switch & socket via stepdown transformer",
        brands: ["Anchor", "Havells", "Reputed"],
      },
      {
        id: "variable-ac",
        name: "Single Phase Variable AC Supply",
        desc: "0–270V AC, configurable current rating, via variac with panel meters and banana sockets",
        brands: ["Variac", "Powerpack", "Crown", "Regvolt"],
      },
      {
        id: "3phase-ac",
        name: "Three Phase Variable AC Supply",
        desc: "0–415V three phase variable AC supply with protection and metering",
        brands: ["Powerpack", "Crown", "Regvolt"],
      },
      {
        id: "prog-ac",
        name: "Programmable AC Power Supply",
        desc: "Fully programmable single/three phase AC for automated test sequences",
        brands: ["Chroma", "Keysight", "Pacific Power"],
      },
    ],
  },
  {
    cat: "DC Power Sources",
    items: [
      {
        id: "var-dc-low",
        name: "Variable DC Supply · Low Voltage Range",
        desc: "Continuously variable DC, configurable voltage and current to your spec",
        brands: ["TMCI", "Aplab", "Keysight"],
      },
      {
        id: "var-dc-high",
        name: "Variable DC Supply · High Voltage Range",
        desc: "Continuously variable DC, higher voltage range, configurable current",
        brands: ["TMCI", "Aplab", "Keysight"],
      },
      {
        id: "fixed-5v",
        name: "Fixed DC Supply · 5V",
        desc: "Regulated 5V fixed DC supply",
        brands: ["TMCI", "Aplab", "Mastech"],
      },
      {
        id: "fixed-24v",
        name: "Fixed DC Supply · 24V",
        desc: "Regulated 24V DC supply for loop and transmitter powering",
        brands: ["TMCI", "Aplab", "Phoenix Contact"],
      },
      {
        id: "prog-dc",
        name: "Programmable DC Supply",
        desc: "Software-controllable DC supply for automated calibration sequences",
        brands: ["Keysight", "Rigol", "Chroma", "BK Precision"],
      },
    ],
  },
  {
    cat: "Reference Instruments",
    items: [
      {
        id: "dmm-ref",
        name: "Digital Multimeter — Reference Grade",
        desc: "High-accuracy handheld or benchtop DMM with traceability certificate",
        brands: [
          "Fluke 287",
          "Fluke 8846A",
          "Keysight 34461A",
          "Agilent 34401A",
        ],
      },
      {
        id: "loop-cal",
        name: "Portable Loop Calibrator",
        desc: "mA range 0–24mA, V range 0–12V, built-in 24V loop power supply",
        brands: ["Masibus iCAL LC12", "Fluke 709H", "Druck DPI 620", "ISCO"],
      },
      {
        id: "lcr-meter",
        name: "LCR Meter — Benchtop",
        desc: "Inductance, capacitance, resistance measurement for component calibration",
        brands: ["Keysight E4980A", "GW Instek LCR-8100G", "Hioki IM3523"],
      },
      {
        id: "multifunction-cal",
        name: "Multifunction Calibrator",
        desc: "AC/DC voltage, current, resistance, and frequency source for instrument calibration",
        brands: ["Fluke 5522A", "Fluke 5502A", "Mensor CPC4000"],
      },
    ],
  },
  {
    cat: "Test & Measurement Instruments",
    items: [
      {
        id: "osc",
        name: "Digital Oscilloscope",
        desc: "Configurable channel count and bandwidth, minimum 1GSa/s sampling rate",
        brands: ["Rigol", "Keysight", "Tektronix", "Siglent"],
      },
      {
        id: "func-gen",
        name: "Function / Waveform Generator",
        desc: "Sine, square, triangle, ramp, pulse, noise — configurable frequency range",
        brands: ["GW Instek", "Rigol", "Keysight", "Siglent"],
      },
      {
        id: "power-analyzer",
        name: "Power Meter / Power Analyzer",
        desc: "True RMS power, harmonics, power factor measurement",
        brands: ["Fluke 435", "Hioki PW3360", "Yokogawa WT310E"],
      },
      {
        id: "insulation-tester",
        name: "Insulation Resistance Tester",
        desc: "Megohm meter for insulation testing of cables and equipment",
        brands: ["Fluke 1555", "Megger MIT1025", "Kyoritsu 3128"],
      },
    ],
  },
  {
    cat: "Workbench Facilities",
    items: [
      {
        id: "soldering",
        name: "Soldering & Desoldering Station",
        desc: "ESD-safe, configurable wattage and temperature range",
        brands: ["Weller", "Hakko", "JBC", "Ersa"],
      },
      {
        id: "vif-meter",
        name: "VIF Meter — Voltage, Current, Frequency",
        desc: "Panel-mounted meter displaying bench main supply parameters",
        brands: ["Elmeasure", "Schneider", "L&T", "Yokogawa"],
      },
      {
        id: "led-bar",
        name: "LED Work Light Bar",
        desc: "Overhead LED lighting for proper workspace illumination",
        brands: ["Anchor", "Philips", "Syska", "Wipro"],
      },
      {
        id: "esd-mat",
        name: "ESD Workbench Mat + Wrist Strap",
        desc: "Anti-static mat for safe handling of sensitive electronics",
        brands: ["Bondline", "ACL Staticide", "Desco", "3M"],
      },
    ],
  },
];

const DEFAULT_CONFIG = [
  {
    id: "main-ac",
    name: "Main AC Power Supply",
    desc: "230V Single Phase with RCCB, line indicators, emergency stop",
    brand: "Schneider",
  },
  {
    id: "230v-sockets",
    name: "230V AC Power Sockets",
    desc: "5/15A switch and socket with On/Off indication",
    brand: "Anchor",
  },
  {
    id: "110v-facility",
    name: "110V AC Facility",
    desc: "Stepdown transformer, MCB protected",
    brand: "Reputed",
  },
  {
    id: "soldering",
    name: "Soldering & Desoldering Station",
    desc: "ESD-safe, configurable wattage",
    brand: "Weller",
  },
  {
    id: "var-dc-low",
    name: "Variable DC Supply · Low Voltage",
    desc: "Continuously variable, MCB protected",
    brand: "TMCI",
  },
  {
    id: "func-gen",
    name: "Function / Waveform Generator",
    desc: "Sine/Square/Triangle/Ramp/Pulse/Noise, LAN & USB",
    brand: "GW Instek",
  },
  {
    id: "osc",
    name: "Digital Oscilloscope",
    desc: "Configurable channels and bandwidth, USB/LAN",
    brand: "Rigol",
  },
  {
    id: "var-dc-high",
    name: "Variable DC Supply · High Voltage",
    desc: "Continuously variable, MCB protected",
    brand: "TMCI",
  },
  {
    id: "variable-ac",
    name: "Single Phase Variable AC Supply",
    desc: "0–270V, configurable current, banana sockets, panel meters",
    brand: "Variac",
  },
  {
    id: "dmm-ref",
    name: "Digital Multimeter — Reference Grade",
    desc: "50mV–1000V AC/DC, current, resistance, frequency",
    brand: "Fluke 287",
  },
  {
    id: "loop-cal",
    name: "Portable Loop Calibrator",
    desc: "0–24mA / 0–12V, 0.001mA resolution, 24V DC loop power",
    brand: "Masibus iCAL LC12",
  },
  {
    id: "stabilizer",
    name: "Voltage Stabilizer",
    desc: "System-level input stabilisation, size per load requirements",
    brand: "TPC",
  },
];

const CLIENTS = [
  { name: "ISRO · VSSC", hi: true },
  { name: "NTPC", hi: true },
  { name: "Tata Steel", hi: true },
  { name: "BHEL", hi: true },
  { name: "ONGC", hi: false },
  { name: "Siemens", hi: false },
  { name: "BPCL", hi: false },
  { name: "SAIL", hi: false },
  { name: "Indian Oil", hi: false },
  { name: "Kochi Metro", hi: false },
  { name: "CMRL", hi: false },
  { name: "Keltron", hi: false },
  { name: "TÜV Rheinland", hi: false },
  { name: "Yokogawa", hi: false },
  { name: "TVS", hi: false },
];

const FAQS = [
  {
    q: "Is this a standard product or built to order?",
    a: "Fully built to order — every single time. There is no catalogue size or fixed configuration. You tell us what instruments you calibrate, what power ranges you need, and the physical constraints of your space. We design the bench around that. Use the configurator on this page as a starting point.",
  },
  {
    q: "What dimensions can you build to?",
    a: "Any dimensions you specify. Length, height, depth, tabletop material, drawer configuration, cable management, and surface finish are all determined by your lab drawing and workflow. We work from your drawings or help you determine the right dimensions based on how your team works.",
  },
  {
    q: "Do the instruments come with calibration certificates?",
    a: "Yes. All reference instruments are supplied with manufacturer-issued calibration certificates traceable to national standards — the traceability documentation your auditors require under ISO 9001 and ISO/IEC 17025.",
  },
  {
    q: "Can we specify our own preferred instrument brands?",
    a: "Yes. The configurator shows our typical recommended brands. You can change any brand or model to one you prefer or already have experience with. If you have a preferred make, just tell us.",
  },
  {
    q: "What's the typical build and delivery time?",
    a: "Typically 6–10 weeks from confirmed order and approved drawings. We handle delivery, on-site installation, commissioning, and technical handover across India.",
  },
  {
    q: "What instruments can this bench calibrate?",
    a: "Voltmeters, ammeters, watt meters, frequency meters, multimeters, clamp meters, megohm meters, power factor meters, oscilloscopes, and 4–20mA loop instruments. The scope expands with the facilities you specify.",
  },
  {
    q: "Do you provide installation and training?",
    a: "Yes — on-site installation, commissioning, and technical handover are standard. We install across India from our Bengaluru headquarters.",
  },
];

const waNumber = "919742944306";
const waMsg = encodeURIComponent(
  "Hello! I'd like a quote for a custom electrical calibration bench.",
);

export default function ElectricalCalibrationBenchPage() {
  const [configured, setConfigured] = useState(
    DEFAULT_CONFIG.map((f) => ({ ...f })),
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brandTarget, setBrandTarget] = useState(null);
  const [customBrand, setCustomBrand] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const addedIds = new Set(configured.map((f) => f.id));

  function removeFacility(i) {
    setConfigured((p) => p.filter((_, idx) => idx !== i));
  }

  function addFacility(item) {
    if (addedIds.has(item.id)) return;
    setConfigured((p) => [
      ...p,
      { id: item.id, name: item.name, desc: item.desc, brand: item.brands[0] },
    ]);
  }

  function openBrand(i) {
    setBrandTarget(i);
    setCustomBrand("");
    setShowBrandModal(true);
  }

  function selectBrand(b) {
    setConfigured((p) =>
      p.map((f, i) => (i === brandTarget ? { ...f, brand: b } : f)),
    );
    setShowBrandModal(false);
  }

  const targetItem = brandTarget !== null ? configured[brandTarget] : null;
  let targetBrands = [];
  if (targetItem) {
    for (const cat of CATALOGUE) {
      const found = cat.items.find((i) => i.id === targetItem.id);
      if (found) {
        targetBrands = found.brands;
        break;
      }
    }
  }

  return (
    <>
      <style>{`
        .p-hero{background:#060F0D;position:relative;overflow:hidden;padding:80px clamp(1.5rem,5vw,4rem) 64px}
        .p-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 75% 50%,color-mix(in srgb,var(--primary-md) 12%,transparent) 0%,transparent 65%);pointer-events:none}
        .p-hero::after{content:'';position:absolute;inset:0;background-image:linear-gradient(color-mix(in srgb,var(--primary-md) 4%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--primary-md) 4%,transparent) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}
        .p-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
        .p-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
        .p-overline{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--primary-md);display:block;margin-bottom:14px}
        .p-h1{font-size:clamp(2.2rem,5vw,3.2rem);font-weight:800;color:#fff;line-height:1.1;letter-spacing:-1px;margin-bottom:18px}
        .p-h1 em{font-style:normal;color:var(--primary-md)}
        .p-hero-sub{font-size:15.5px;color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:28px;max-width:480px}
        .p-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden}
        .p-stat-box{background:rgba(255,255,255,0.03);padding:22px;text-align:center}
        .p-stat-num{font-size:1.9rem;font-weight:800;color:#fff;line-height:1;display:block;margin-bottom:5px;font-family:var(--mono)}
        .p-stat-label{font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em}
        .p-trust{background:var(--surface);border-bottom:1px solid var(--border);padding:14px clamp(1.5rem,5vw,4rem)}
        .p-trust-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
        .p-trust-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap}
        .p-sec{padding:72px clamp(1.5rem,5vw,4rem)}
        .p-sec-title{font-size:clamp(1.6rem,3.5vw,2.3rem);font-weight:800;letter-spacing:-0.8px;line-height:1.2;color:var(--ink);margin-bottom:16px}
        .p-sec-title em{font-style:normal;color:var(--primary)}
        .p-two-col{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
        .p-diagram{background:#060F0D;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px}
        .p-diagram-title{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:14px;font-family:var(--mono)}
        .p-f-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05)}
        .p-f-row:last-child{border-bottom:none}
        .p-f-name{font-size:12px;color:rgba(255,255,255,0.72)}
        .p-f-brand{font-size:11px;color:var(--primary-md);font-family:var(--mono)}
        .p-for-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:24px}
        .p-for-card{background:var(--white);padding:24px;transition:background 0.15s;cursor:default}
        .p-for-card:hover{background:var(--surface)}
        .p-for-icon{font-size:22px;margin-bottom:12px}
        .p-for-title{font-size:14px;font-weight:800;color:var(--ink);margin-bottom:6px}
        .p-for-desc{font-size:12.5px;color:var(--mid);line-height:1.65}
        .p-why-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
        .p-why-points{display:flex;flex-direction:column;gap:24px}
        .p-why-point{display:flex;gap:16px}
        .p-why-icon{width:40px;height:40px;background:var(--primary-pale-solid);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;margin-top:2px}
        .p-why-callout{background:#060F0D;border-radius:16px;padding:36px 32px;position:relative;overflow:hidden}
        .p-why-callout::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:radial-gradient(circle,color-mix(in srgb,var(--primary-md) 10%,transparent) 0%,transparent 70%);pointer-events:none}
        .p-config-wrap{border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--white)}
        .p-config-header{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;background:var(--surface)}
        .p-config-item{display:flex;align-items:center;gap:12px;padding:13px 24px;border-bottom:1px solid var(--border)}
        .p-config-item:last-child{border-bottom:none}
        .p-brand-btn{font-size:11px;font-weight:700;background:var(--primary-pale-solid);color:var(--primary-dk);padding:4px 10px;border-radius:4px;border:none;cursor:pointer;font-family:var(--ff);white-space:nowrap;transition:all 0.15s}
        .p-brand-btn:hover{background:var(--primary);color:#fff}
        .p-remove-btn{width:26px;height:26px;border-radius:50%;background:var(--surface);border:1px solid var(--border);cursor:pointer;font-size:14px;color:var(--mid);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s}
        .p-remove-btn:hover{background:#fee2e2;border-color:#fecaca;color:#b91c1c}
        .p-add-btn{display:flex;align-items:center;gap:8px;padding:14px 24px;font-size:13px;font-weight:600;color:var(--primary);background:transparent;border:none;cursor:pointer;border-top:1px solid var(--border);width:100%;font-family:var(--ff);transition:background 0.15s}
        .p-add-btn:hover{background:var(--primary-pale)}
        .p-config-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:var(--surface)}
        .p-clients-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .p-client-cell{background:var(--white);padding:16px;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:700;color:var(--mid);text-align:center;min-height:54px;transition:background 0.15s}
        .p-client-cell:hover{background:var(--surface)}
        .p-client-cell.hi{color:var(--primary-dk)}
        .p-faq-item{background:var(--white);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:8px}
        .p-faq-btn{width:100%;text-align:left;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;background:none;border:none;cursor:pointer;font-family:var(--ff)}
        .p-faq-ans{padding:0 20px 18px;font-size:13.5px;color:var(--mid);line-height:1.75;border-top:1px solid var(--border);padding-top:14px}
        .p-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:32px}
        .p-step{background:var(--white);padding:24px 20px}
        .p-step-num{font-size:11px;font-weight:700;color:var(--primary);font-family:var(--mono);margin-bottom:12px}
        .p-step-title{font-size:13.5px;font-weight:800;color:var(--ink);margin-bottom:6px}
        .p-step-desc{font-size:12px;color:var(--mid);line-height:1.6}
        .p-final{background:#060F0D;padding:72px clamp(1.5rem,5vw,4rem);position:relative;overflow:hidden}
        .p-final::before{content:'';position:absolute;inset:0;background-image:linear-gradient(color-mix(in srgb,var(--primary-md) 3%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--primary-md) 3%,transparent) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}
        .p-final-inner{max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:2}
        .p-certs-grid{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
        .p-cert-badge{display:flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-weight:600;color:var(--mid);background:var(--surface)}
        .p-cert-badge::before{content:'✓';color:var(--primary);font-weight:800}
        .p-ext-link{color:var(--primary);text-decoration:underline;text-underline-offset:3px;font-weight:500}
        .p-note-box{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--primary);border-radius:0 8px 8px 0;padding:14px 18px;font-size:13px;color:var(--mid);line-height:1.65}
        .p-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
        .p-modal{background:var(--white);border-radius:16px;width:100%;max-width:680px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 80px rgba(0,0,0,0.35)}
        .p-modal-sm{max-width:420px}
        .p-modal-head{padding:18px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
        .p-modal-close{background:none;border:none;cursor:pointer;font-size:22px;color:var(--mid);line-height:1;padding:4px}
        .p-modal-body{overflow-y:auto;padding:20px 24px;flex:1}
        .p-modal-cat-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--border)}
        .p-modal-item{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:8px;cursor:pointer;transition:background 0.12s;margin-bottom:2px}
        .p-modal-item:hover{background:var(--surface)}
        .p-modal-item.added{background:var(--primary-pale);cursor:default}
        .p-brand-opt{padding:10px 14px;border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:13px;transition:all 0.12s;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;background:var(--white)}
        .p-brand-opt:hover{border-color:var(--primary);background:var(--primary-pale);color:var(--primary-dk)}
        @media(max-width:900px){
          .p-hero-grid,.p-two-col,.p-why-grid{grid-template-columns:1fr}
          .p-for-grid{grid-template-columns:1fr 1fr}
          .p-steps{grid-template-columns:1fr 1fr}
          .p-clients-grid{grid-template-columns:repeat(3,1fr)}
        }
        @media(max-width:600px){
          .p-for-grid,.p-steps{grid-template-columns:1fr}
          .p-clients-grid{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="p-hero">
        <div className="p-inner">
          <div className="p-hero-grid">
            <div>
              <span className="p-overline">
                Electrical Calibration Bench · Custom Manufacturer · Bengaluru,
                India
              </span>
              <h1 className="p-h1">
                Your In-House
                <br />
                <em>Electrical Calibration</em>
                <br />
                Lab. Built to Your Spec.
              </h1>
              <p className="p-hero-sub">
                Every dimension, every instrument, every facility — configured
                exactly to your lab layout, instrument list, and calibration
                workflow. No catalogue. No compromise.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <a
                  href="#quote"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--cta)",
                    color: "#fff",
                    padding: "12px 26px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "background 0.18s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "var(--cta-hover)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "var(--cta)")
                  }
                >
                  Get a Custom Quote →
                </a>
                <a
                  href="#configurator"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13.5,
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  Configure your bench ↓
                </a>
              </div>
            </div>
            <div>
              <div className="p-stat-grid">
                <div className="p-stat-box">
                  <span className="p-stat-num">100%</span>
                  <span className="p-stat-label">Built to Your Spec</span>
                </div>
                <div className="p-stat-box">
                  <span className="p-stat-num">350+</span>
                  <span className="p-stat-label">Clients Served</span>
                </div>
                <div className="p-stat-box">
                  <span className="p-stat-num">13+</span>
                  <span className="p-stat-label">Years Manufacturing</span>
                </div>
                <div className="p-stat-box">
                  <span className="p-stat-num">INT'L</span>
                  <span className="p-stat-label">Ships Internationally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="p-trust">
        <div className="p-trust-inner">
          <span className="p-trust-label">Trusted by</span>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              "ISRO · VSSC",
              "NTPC",
              "Tata Steel",
              "BHEL",
              "ONGC",
              "Siemens",
              "BPCL",
              "TVS",
            ].map((n) => (
              <span
                key={n}
                style={{ fontSize: 12, fontWeight: 600, color: "var(--mid)" }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO IS THIS FOR ── */}
      <section className="p-sec" style={{ background: "var(--white)" }}>
        <div className="p-inner">
          <span className="p-overline">Who This Is For</span>
          <h2 className="p-sec-title">
            Built for labs that can't afford inaccurate results.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--mid)",
              maxWidth: 620,
              marginBottom: 36,
              lineHeight: 1.75,
            }}
          >
            If your team calibrates electrical instruments in-house — or wants
            to — and you need a workspace that's organised, protected, and
            traceable, this is built for you.
          </p>
          <div className="p-for-grid">
            {[
              {
                icon: "🏭",
                title: "Quality & Metrology Labs",
                desc: "In-house calibration of voltmeters, multimeters, clamp meters, loop instruments, and oscilloscopes. Replaces improvised setups with a purpose-built, auditor-ready workstation.",
              },
              {
                icon: "⚡",
                title: "Defence & Aerospace",
                desc: "Mission-critical applications where measurement drift isn't acceptable. Built to exacting specifications with full traceability documentation for DRDO, ISRO, and naval facilities.",
              },
              {
                icon: "🔋",
                title: "Power & Energy Plants",
                desc: "Relay testing, PLC calibration, panel instrument verification. Benches for NTPC, SAIL, and IndianOil-scale environments with three-phase options available.",
              },
              {
                icon: "🔬",
                title: "R&D & Test Facilities",
                desc: "Electronics test and measurement setups for development, qualification, and production QA. Oscilloscopes, function generators, power supplies — all in one engineered workspace.",
              },
              {
                icon: "🛢️",
                title: "Oil, Gas & Petrochemical",
                desc: "Pressure transmitter and temperature instrument calibration alongside electrical signal verification. Built for demanding industrial environments.",
              },
              {
                icon: "🎓",
                title: "Engineering Institutions",
                desc: "Training labs for engineering colleges and technical institutes. Properly designed workstations that teach good lab practice from day one.",
              },
            ].map((card, i) => (
              <div key={i} className="p-for-card">
                <div className="p-for-icon">{card.icon}</div>
                <div className="p-for-title">{card.title}</div>
                <div className="p-for-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IT IS ── */}
      <section className="p-sec" style={{ background: "var(--surface)" }}>
        <div className="p-inner">
          <div className="p-two-col">
            <div>
              <span className="p-overline">What It Is</span>
              <h2 className="p-sec-title">
                Every facility your electrical calibration workflow needs — in
                one pre-wired workstation.
              </h2>
              <div
                style={{ color: "var(--mid)", lineHeight: 1.85, fontSize: 15 }}
              >
                <p style={{ marginBottom: 16 }}>
                  An electrical calibration bench consolidates your power
                  sources, reference instruments, and protection circuits into
                  one structure. Pre-wired. Labelled. Every facility
                  independently MCB-protected. Ready for a full calibration
                  shift from day one.
                </p>
                <p style={{ marginBottom: 16 }}>
                  Instead of separate power supplies, transformers, and
                  instruments from different racks — each with their own
                  earthing issues, cabling, and protection — the bench brings it
                  all together with single-point earthing architecture that
                  eliminates the ground loops that corrupt readings in
                  improvised setups.
                </p>
                <p style={{ marginBottom: 20 }}>
                  Reference instruments are supplied with calibration
                  certificates traceable to national standards — the
                  documentation your{" "}
                  <a
                    href="https://www.iso.org/iso-iec-17025-testing-and-calibration-laboratories.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-ext-link"
                  >
                    ISO/IEC 17025 ↗
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.nablindia.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-ext-link"
                  >
                    NABL ↗
                  </a>{" "}
                  auditors will ask for.
                </p>
                <div className="p-note-box">
                  <strong style={{ color: "var(--ink)" }}>
                    Nothing about this bench is fixed.
                  </strong>{" "}
                  Dimensions, tabletop material, instrument selection, cable
                  management, drawer configuration — all determined by your lab
                  layout and workflow. The sample configuration shown here is
                  illustrative only.
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <a
                  href={`https://wa.me/${waNumber}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "11px 24px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 13.5,
                    textDecoration: "none",
                  }}
                >
                  Talk to a Technical Engineer →
                </a>
              </div>
            </div>
            <div>
              <div className="p-diagram">
                <p className="p-diagram-title">
                  Sample configuration — illustrative. Everything adjustable.
                </p>
                {[
                  {
                    name: "Main AC Power Supply · 230V Single Phase",
                    brand: "Schneider",
                  },
                  {
                    name: "230V AC Power Sockets + RCCB Protection",
                    brand: "Anchor",
                  },
                  {
                    name: "110V AC Facility via Stepdown Transformer",
                    brand: "Reputed",
                  },
                  {
                    name: "Soldering & Desoldering Station · ESD-safe",
                    brand: "Weller WR 2000D",
                  },
                  {
                    name: "Variable DC Power Supply · configurable range",
                    brand: "TMCI",
                  },
                  {
                    name: "Function Generator · configurable frequency",
                    brand: "GW Instek",
                  },
                  {
                    name: "Digital Oscilloscope · configurable bandwidth",
                    brand: "Rigol",
                  },
                  {
                    name: "Single Phase Variable AC · 0–270V",
                    brand: "Variac",
                  },
                  {
                    name: "Digital Multimeter — Reference Grade",
                    brand: "Fluke 287",
                  },
                  {
                    name: "Portable Loop Calibrator · 0–24mA",
                    brand: "Masibus iCAL LC12",
                  },
                  {
                    name: "Voltage Stabilizer · sized to your load",
                    brand: "TPC",
                  },
                ].map((f, i) => (
                  <div key={i} className="p-f-row">
                    <span className="p-f-name">{f.name}</span>
                    <span className="p-f-brand">{f.brand}</span>
                  </div>
                ))}
                <p
                  style={{
                    fontSize: 10.5,
                    color: "rgba(255,255,255,0.22)",
                    marginTop: 12,
                    fontFamily: "var(--mono)",
                  }}
                >
                  Every item replaceable · Brand preferences accommodated · Add
                  or remove any facility
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TMCI ── */}
      <section className="p-sec" style={{ background: "var(--white)" }}>
        <div className="p-inner">
          <div className="p-why-grid">
            <div className="p-why-points">
              <span className="p-overline">Why TMCI</span>
              <h2 className="p-sec-title">
                What you get that you won't get from a generic supplier.
              </h2>
              {[
                {
                  icon: "🔧",
                  title: "Designed around your workflow, not a catalogue",
                  desc: "Every bench starts with your requirements — instrument list, power ranges, lab dimensions, cable routing, storage needs. We design it around how your team actually works, not what's easiest to manufacture.",
                },
                {
                  icon: "⚡",
                  title: "Single-point earthing eliminates ground loops",
                  desc: "Improvised multi-source setups introduce ground loops that shift readings invisibly. A properly designed bench eliminates this with a unified earthing architecture — protecting your measurements before you start.",
                },
                {
                  icon: "🔒",
                  title: "Independent MCB protection on every facility",
                  desc: "A fault on one facility stays isolated. Your oscilloscope doesn't go down because the soldering station tripped. Each circuit is independently protected and clearly labelled.",
                },
                {
                  icon: "📋",
                  title: "Full traceability documentation",
                  desc: "Every bench ships with a documented BOM showing make, model, and calibration certificate for every reference instrument — the chain your ISO 9001 and ISO/IEC 17025 auditors will look for.",
                },
                {
                  icon: "🚚",
                  title: "Installation and commissioning included",
                  desc: "We deliver, install, commission, and hand over across India. Your team doesn't troubleshoot a bench they didn't build. We power it up and sign off together.",
                },
              ].map((pt, i) => (
                <div key={i} className="p-why-point">
                  <div className="p-why-icon">{pt.icon}</div>
                  <div>
                    <h4
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ink)",
                        marginBottom: 5,
                      }}
                    >
                      {pt.title}
                    </h4>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--mid)",
                        lineHeight: 1.7,
                      }}
                    >
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-why-callout">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--primary-lt)",
                  marginBottom: 14,
                }}
              >
                13 years. 350+ labs built.
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.3,
                  marginBottom: 14,
                  letterSpacing: "-0.4px",
                }}
              >
                We've built benches for ISRO, NTPC, ONGC, BHEL, and over 350
                organisations across India.
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                Each one was different. Defence labs with strict traceability
                requirements. Oil & gas facilities needing three-phase builds.
                R&D labs needing programmable sources and automated test
                capability. That range of experience goes into every new bench
                we quote.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <a
                  href={`https://wa.me/${waNumber}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "11px 22px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 13.5,
                    textDecoration: "none",
                    width: "fit-content",
                  }}
                >
                  Talk to an Engineer →
                </a>
                <a
                  href="#configurator"
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Or configure your bench first ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONFIGURATOR ── */}
      <section
        className="p-sec"
        style={{ background: "var(--surface)" }}
        id="configurator"
      >
        <div className="p-inner">
          <span className="p-overline">Build Your Bench</span>
          <h2 className="p-sec-title">Your facilities. Your configuration.</h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--mid)",
              maxWidth: 580,
              marginBottom: 32,
              lineHeight: 1.75,
            }}
          >
            Add or remove facilities below. Click any brand to change it or
            enter your preferred make and model. When you're done, send us the
            list and we'll build a quote around it.
          </p>
          <div className="p-config-wrap">
            <div className="p-config-header">
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}
                >
                  Electrical Calibration Bench — Facility Configurator
                </div>
                <div
                  style={{ fontSize: 12.5, color: "var(--mid)", marginTop: 3 }}
                >
                  Click brand to change · Remove what you don't need · Add what
                  you do
                </div>
              </div>
              <a
                href="#quote"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontWeight: 700,
                  fontSize: 12.5,
                  textDecoration: "none",
                }}
              >
                Get This Quoted →
              </a>
            </div>
            <div>
              {configured.map((f, i) => (
                <div key={i} className="p-config-item">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      {f.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "var(--mid)",
                        marginTop: 2,
                      }}
                    >
                      {f.desc}
                    </div>
                  </div>
                  <button className="p-brand-btn" onClick={() => openBrand(i)}>
                    {f.brand || "Set Brand"}
                  </button>
                  <button
                    className="p-remove-btn"
                    onClick={() => removeFacility(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button className="p-add-btn" onClick={() => setShowAddModal(true)}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add a
              facility
            </button>
            <div className="p-config-footer">
              <p style={{ fontSize: 13, color: "var(--mid)" }}>
                <strong style={{ color: "var(--ink)" }}>
                  {configured.length}
                </strong>{" "}
                facilities configured
              </p>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello! I've configured a bench on your website and would like a quote. Configuration: " + configured.map((f) => f.name + " (" + f.brand + ")").join(", "))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--cta)",
                  color: "#fff",
                  padding: "8px 18px",
                  borderRadius: 7,
                  fontWeight: 700,
                  fontSize: 12.5,
                  textDecoration: "none",
                }}
              >
                Quote This Configuration →
              </a>
            </div>
          </div>
          <div className="p-note-box" style={{ marginTop: 16 }}>
            <strong style={{ color: "var(--ink)" }}>
              This is a starting point, not a final list.
            </strong>{" "}
            Our engineers will review your configuration, ask about your lab
            layout and instrument list, and refine it before quoting. Nothing is
            locked in at this stage.
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="p-sec" style={{ background: "var(--white)" }}>
        <div className="p-inner">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="p-overline">Our Clients</span>
            <h2 className="p-sec-title">
              When measurement accuracy is non-negotiable.
            </h2>
          </div>
          <div className="p-clients-grid">
            {CLIENTS.map((c, i) => (
              <div key={i} className={`p-client-cell${c.hi ? " hi" : ""}`}>
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTS ── */}
      <section
        className="p-sec"
        style={{
          background: "var(--surface)",
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <div className="p-inner">
          <span className="p-overline">Certifications</span>
          <h2 className="p-sec-title" style={{ maxWidth: 560 }}>
            Certifications your procurement team will recognise.
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--mid)", marginBottom: 4 }}>
            All independently audited. Standards referenced:{" "}
            <a
              href="https://www.iso.org/iso-9001-quality-management.html"
              target="_blank"
              rel="noopener noreferrer"
              className="p-ext-link"
            >
              ISO 9001 ↗
            </a>{" "}
            ·{" "}
            <a
              href="https://www.iso.org/iso-iec-17025-testing-and-calibration-laboratories.html"
              target="_blank"
              rel="noopener noreferrer"
              className="p-ext-link"
            >
              ISO/IEC 17025 ↗
            </a>{" "}
            ·{" "}
            <a
              href="https://www.nablindia.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-ext-link"
            >
              NABL ↗
            </a>{" "}
            ·{" "}
            <a
              href="https://www.iec.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-ext-link"
            >
              IEC ↗
            </a>
          </p>
          <div className="p-certs-grid">
            {[
              "ISO 9001:2015 Quality Management",
              "ISO 14001:2015 Environmental",
              "ISO 45001:2018 Occupational Safety",
              "IEC 61340-5-1 ESD Protection",
              "ANSI ESD S20.20-2021",
              "DIN EN 13150 Workbench Safety",
              "CE · RoHS · BIFMA",
              "Make in India · MSME Registered",
            ].map((c) => (
              <div key={c} className="p-cert-badge">
                {c}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13.5, color: "var(--mid)" }}>
            Authorised dealer for{" "}
            <a
              href="https://www.fluke.com/en-in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-ext-link"
            >
              Fluke India ↗
            </a>{" "}
            and{" "}
            <a
              href="https://www.harogic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-ext-link"
            >
              Harogic ↗
            </a>
            . Instruments supplied with traceability certificates.
          </p>
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section
        className="p-sec"
        style={{ background: "var(--white)" }}
        id="quote"
      >
        <div className="p-inner">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="p-overline">How to Order</span>
            <h2 className="p-sec-title">Simple process. No surprises.</h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--mid)",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              No lengthy forms, no commitments at this stage. Just tell us what
              you need and our engineers take it from there.
            </p>
          </div>
          <div className="p-steps">
            {[
              {
                num: "01",
                title: "Tell us your requirement",
                desc: "Send us your instrument list, lab dimensions, and what standards you're audited to. WhatsApp, email, or phone — whatever is easiest.",
              },
              {
                num: "02",
                title: "We design your bench",
                desc: "Our engineers review your requirement and come back with a configuration, any questions, and a rough layout. Usually within 48 hours.",
              },
              {
                num: "03",
                title: "You approve the drawings",
                desc: "We share detailed fabrication drawings. You review, request changes, and sign off. Nothing goes into production without your approval.",
              },
              {
                num: "04",
                title: "We build, install, and hand over",
                desc: "6–10 weeks build time. We deliver, install, commission, and hand over across India. On-site training included.",
              },
            ].map((step, i) => (
              <div key={i} className="p-step">
                <div className="p-step-num">{step.num}</div>
                <div className="p-step-title">{step.title}</div>
                <div className="p-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.25)",
                color: "#16a34a",
                padding: "18px 24px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                transition: "all 0.18s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(37,211,102,0.15)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(37,211,102,0.08)")
              }
            >
              💬 Chat on WhatsApp
            </a>
            <a
              href="tel:+919742944306"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--ink)",
                padding: "18px 24px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              📞 +91 97429 44306
            </a>
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            Or email{" "}
            <a href="mailto:info@tazkmazter.com" className="p-ext-link">
              info@tazkmazter.com
            </a>{" "}
            · Bengaluru · Pan India delivery & installation
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="p-sec"
        style={{ background: "var(--surface)", paddingTop: 40 }}
      >
        <div className="p-inner" style={{ maxWidth: 820 }}>
          <span className="p-overline">FAQ</span>
          <h2 className="p-sec-title">
            Questions we get asked before every order.
          </h2>
          <div style={{ marginTop: 24 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="p-faq-item">
                <button
                  className="p-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--ink)",
                      paddingRight: 16,
                      lineHeight: 1.4,
                      textAlign: "left",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      color: "var(--primary)",
                      fontSize: 20,
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && <div className="p-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="p-final">
        <div className="p-final-inner">
          <span
            className="p-overline"
            style={{ display: "block", marginBottom: 14 }}
          >
            Get Started
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem,4vw,2.6rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 16,
              letterSpacing: "-0.8px",
            }}
          >
            Ready to bring electrical calibration in-house?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 15,
              marginBottom: 36,
              lineHeight: 1.8,
              maxWidth: 540,
              margin: "0 auto 36px",
            }}
          >
            Tell us what you calibrate, your lab dimensions, and what standards
            you're audited to. We'll respond with a configuration and indicative
            pricing within 48 hours.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--primary)",
                color: "#fff",
                padding: "13px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "background 0.18s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "var(--primary-dk)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--primary)")
              }
            >
              💬 WhatsApp Enquiry
            </a>
            <a
              href="tel:+919742944306"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                padding: "13px 28px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.18s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
              }}
            >
              Call +91 97429 44306
            </a>
          </div>
        </div>
      </section>

      {/* ── ADD FACILITY MODAL ── */}
      {showAddModal && (
        <div
          className="p-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div className="p-modal">
            <div className="p-modal-head">
              <h3
                style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}
              >
                Add a Facility
              </h3>
              <button
                className="p-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-modal-body">
              {CATALOGUE.map((cat) => (
                <div key={cat.cat} style={{ marginBottom: 24 }}>
                  <div className="p-modal-cat-title">{cat.cat}</div>
                  <div>
                    {cat.items.map((item) => {
                      const added = addedIds.has(item.id);
                      return (
                        <div
                          key={item.id}
                          className={`p-modal-item${added ? " added" : ""}`}
                          onClick={() => {
                            if (!added) addFacility(item);
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--ink)",
                              }}
                            >
                              {item.name}
                            </div>
                            <div
                              style={{ fontSize: 11.5, color: "var(--mid)" }}
                            >
                              {item.desc}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: added ? "var(--muted)" : "var(--primary)",
                              whiteSpace: "nowrap",
                              marginLeft: 16,
                              flexShrink: 0,
                            }}
                          >
                            {added ? "Added ✓" : "+ Add"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BRAND MODAL ── */}
      {showBrandModal && targetItem && (
        <div
          className="p-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBrandModal(false);
          }}
        >
          <div className="p-modal p-modal-sm">
            <div className="p-modal-head">
              <h3
                style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}
              >
                Brand — {targetItem.name}
              </h3>
              <button
                className="p-modal-close"
                onClick={() => setShowBrandModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-modal-body">
              {targetBrands.map((b) => (
                <div
                  key={b}
                  className="p-brand-opt"
                  onClick={() => selectBrand(b)}
                >
                  <span>{b}</span>
                  {b === targetItem.brand && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--primary)",
                        fontWeight: 700,
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <p
                  style={{ fontSize: 12, color: "var(--mid)", marginBottom: 8 }}
                >
                  Or enter your preferred brand / model:
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customBrand.trim())
                        selectBrand(customBrand.trim());
                    }}
                    placeholder="e.g. Keysight 34401A"
                    style={{
                      flex: 1,
                      padding: "9px 12px",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 13,
                      fontFamily: "var(--ff)",
                      outline: "none",
                      color: "var(--ink)",
                      background: "var(--white)",
                    }}
                  />
                  <button
                    onClick={() => {
                      if (customBrand.trim()) selectBrand(customBrand.trim());
                    }}
                    style={{
                      padding: "9px 16px",
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "var(--ff)",
                    }}
                  >
                    Use
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
