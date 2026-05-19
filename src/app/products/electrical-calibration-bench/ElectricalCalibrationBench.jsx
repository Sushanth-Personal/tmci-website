"use client";
import { useState } from "react";
import "./ElectricalCalibrationBench.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATALOGUE = [
  {
    cat: "Power & Protection",
    items: [
      {
        id: "main-ac",
        name: "Main AC Power Supply",
        desc: "230V single phase or 415V three phase, RCCB, line indicators, VAF meter, emergency stop",
        brands: ["Schneider", "ABB", "Siemens", "L&T"],
      },
      {
        id: "mcb",
        name: "MCB — Per Facility Protection",
        desc: "Independent miniature circuit breaker for each facility so one fault doesn't take down the whole bench",
        brands: ["Schneider", "ABB", "L&T", "Havells"],
      },
      {
        id: "rccb",
        name: "RCCB — Full System Protection",
        desc: "Residual current circuit breaker protecting the entire bench",
        brands: ["Schneider", "ABB", "Legrand", "Havells"],
      },
      {
        id: "epb",
        name: "Emergency Push Button",
        desc: "Immediate power cutoff, always within arm's reach",
        brands: ["Schneider", "ABB", "Siemens"],
      },
      {
        id: "stabilizer",
        name: "Voltage Stabilizer",
        desc: "3KVA or 5KVA input stabilisation for the entire bench",
        brands: ["TPC", "Servokon", "V-Guard", "Liyod"],
      },
    ],
  },
  {
    cat: "AC Power Sources",
    items: [
      {
        id: "230v-sockets",
        name: "230V AC Power Sockets",
        desc: "230V 5A / 15A switch and socket with on/off indication",
        brands: ["Anchor", "Havells", "Legrand", "Simon"],
      },
      {
        id: "110v-facility",
        name: "110V AC Facility",
        desc: "110V 5A switch and socket via stepdown transformer, MCB protected",
        brands: ["Anchor", "Havells", "Reputed"],
      },
      {
        id: "variable-ac",
        name: "Single Phase Variable AC Supply",
        desc: "0–270V AC, configurable current rating, panel meters, banana sockets",
        brands: ["Variac", "Powerpack", "Crown", "Regvolt"],
      },
      {
        id: "3phase-ac",
        name: "Three Phase Variable AC Supply",
        desc: "0–415V three phase variable supply with protection and metering",
        brands: ["Powerpack", "Crown", "Regvolt"],
      },
      {
        id: "prog-ac",
        name: "Programmable AC Power Supply",
        desc: "Fully programmable single or three phase AC for automated test sequences",
        brands: ["Chroma", "Keysight", "Pacific Power"],
      },
    ],
  },
  {
    cat: "DC Power Sources",
    items: [
      {
        id: "fixed-24v",
        name: "Fixed DC Supply — 24V",
        desc: "Regulated 24V fixed DC, DIN channel mounted inside console, panel meter for V and A indication",
        brands: ["Multispan", "Aplab", "Phoenix Contact"],
      },
      {
        id: "fixed-5v",
        name: "Fixed DC Supply — 5V",
        desc: "Regulated 5V fixed DC supply",
        brands: ["Multispan", "Aplab", "Mastech"],
      },
      {
        id: "var-dc",
        name: "Variable DC Supply — 0–30V",
        desc: "SMPS based, CV/CC, fully variable, adjustable OVP/OCP/OPP, LED meters",
        brands: ["Vartech", "Aplab", "Keysight", "TMCI"],
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
    cat: "Signal & Measurement",
    items: [
      {
        id: "4-20ma",
        name: "4–20 mA Source and Measure",
        desc: "Panel mounted signal generator and measure unit for loop calibration",
        brands: ["Probots ProMax CSG01", "Multispan PI-38", "Masibus"],
      },
      {
        id: "func-gen",
        name: "Function / Waveform Generator",
        desc: "Sine, square, triangle, ramp, pulse, noise — configurable frequency range",
        brands: ["GW Instek", "Rigol", "Keysight", "Siglent"],
      },
      {
        id: "osc",
        name: "Digital Oscilloscope",
        desc: "Configurable channel count and bandwidth, minimum 1GSa/s sampling rate",
        brands: ["Rigol", "Keysight", "Tektronix", "Siglent"],
      },
      {
        id: "spectrum",
        name: "Spectrum Analyzer",
        desc: "RF spectrum analysis for signal integrity and EMC testing",
        brands: ["Rigol", "Keysight", "Harogic"],
      },
    ],
  },
  {
    cat: "Calibration Instruments",
    items: [
      {
        id: "multifunction-cal",
        name: "Multifunction Calibrator",
        desc: "AC/DC voltage, current, resistance, and frequency source for instrument calibration",
        brands: ["Eurotron MicroCal 200", "Fluke 5522A", "Fluke 5502A"],
      },
      {
        id: "loop-cal",
        name: "Loop Calibrator",
        desc: "0–24 mA source and measure, built-in 24V loop power, HART compatible",
        brands: [
          "Fluke 707",
          "Fluke 709H",
          "Masibus iCAL LC12",
          "Druck DPI 620",
        ],
      },
      {
        id: "pressure-cal",
        name: "Pressure Calibrator",
        desc: "Range -12 to 30 psi, up to three pressures simultaneously, 0.001% FS precision",
        brands: ["Druck Pace 1000", "Mensor CPC4000", "Fluke 729"],
      },
      {
        id: "temp-cal",
        name: "Temperature Calibrator — Dry Bath",
        desc: "Draw-out type provision for dry bath temperature calibrator",
        brands: ["R&D 650 ATC", "Fluke 914X", "Isotech"],
      },
      {
        id: "clamp-cal",
        name: "Clamp Meter Calibrator",
        desc: "AC/DC current source for calibrating clamp meters",
        brands: ["Fluke", "Yokogawa", "Kyoritsu"],
      },
    ],
  },
  {
    cat: "Electrical Test Instruments",
    items: [
      {
        id: "dmm-ref",
        name: "Digital Multimeter — Reference Grade",
        desc: "High-accuracy handheld or benchtop DMM with traceability certificate",
        brands: ["Fluke 101", "Fluke 287", "Fluke 8846A", "Keysight 34461A"],
      },
      {
        id: "insulation-tester",
        name: "Insulation Resistance Tester",
        desc: "Megohm meter for insulation testing of cables and equipment",
        brands: ["Fluke 1555", "Megger MIT1025", "Kyoritsu 3128"],
      },
      {
        id: "hipot",
        name: "HIPOT Tester",
        desc: "High voltage dielectric strength tester for safety compliance",
        brands: ["Chroma", "Kikusui", "HV Hipot"],
      },
      {
        id: "power-analyzer",
        name: "Power Meter / Power Analyzer",
        desc: "True RMS power, harmonics, power factor measurement",
        brands: ["Fluke 435", "Hioki PW3360", "Yokogawa WT310E"],
      },
      {
        id: "hart",
        name: "HART Communicator — Docking Provision",
        desc: "Clamp mount provision for portable HART and device communicators",
        brands: ["Emerson 475", "AMS Trex", "TMCI mount"],
      },
    ],
  },
  {
    cat: "Workbench Add-ons",
    items: [
      {
        id: "led-bar",
        name: "LED Work Light Bar",
        desc: "Overhead LED lighting for proper workspace illumination",
        brands: ["Anchor", "Philips", "Syska", "Wipro"],
      },
      {
        id: "esd-kit",
        name: "ESD Kit — Mat, Wrist Strap, Grounding Cord",
        desc: "CPG kit, wristband and grounding cords for the full workspace",
        brands: ["Bondline", "ACL Staticide", "Desco", "3M"],
      },
      {
        id: "soldering",
        name: "Soldering & Desoldering Station",
        desc: "ESD-safe, configurable wattage and temperature range",
        brands: ["Weller", "Hakko", "JBC", "Ersa"],
      },
      {
        id: "drawer",
        name: "Movable Drawer Unit — 3 Step",
        desc: "Lockable drawer pedestal on castors for tool and document storage",
        brands: ["TMCI", "Godrej", "Duratuf"],
      },
      {
        id: "master-gauge",
        name: "Master Pressure Gauge",
        desc: "0–10000 mmWC and 0–16 kg/cm² analog master pressure gauges with panel mount pressure ports",
        brands: ["Precision Mass", "Haumer", "Wika"],
      },
    ],
  },
];

const DEFAULT_CONFIG = [
  {
    id: "main-ac",
    name: "Main AC Power Supply",
    desc: "230V Single Phase — RCCB, line indicators, VAF meter, emergency stop",
    brand: "Schneider",
  },
  {
    id: "230v-sockets",
    name: "230V AC Power Sockets",
    desc: "5A / 15A switch and socket with indication",
    brand: "Anchor",
  },
  {
    id: "110v-facility",
    name: "110V AC Facility",
    desc: "Stepdown transformer, MCB protected",
    brand: "Reputed",
  },
  {
    id: "fixed-24v",
    name: "Fixed DC Supply — 24V",
    desc: "DIN mounted, panel meter for V and A, banana socket output",
    brand: "Multispan",
  },
  {
    id: "var-dc",
    name: "Variable DC Supply — 0–30V",
    desc: "SMPS based, CV/CC, fully variable, LED meters",
    brand: "Vartech",
  },
  {
    id: "4-20ma",
    name: "4–20 mA Source and Measure",
    desc: "Panel mounted signal generator and measure",
    brand: "Probots ProMax CSG01",
  },
  {
    id: "multifunction-cal",
    name: "Multifunction Calibrator",
    desc: "Provision for mounting — instrument supplied by customer or TMCI",
    brand: "Eurotron MicroCal 200",
  },
  {
    id: "loop-cal",
    name: "Loop Calibrator",
    desc: "Clamp mount provision — 0–24 mA HART compatible",
    brand: "Fluke 707",
  },
  {
    id: "dmm-ref",
    name: "Digital Multimeter",
    desc: "Handheld, clamp mount provision",
    brand: "Fluke 101",
  },
  {
    id: "osc",
    name: "Digital Oscilloscope",
    desc: "Configurable bandwidth and channels",
    brand: "Rigol",
  },
  {
    id: "led-bar",
    name: "LED Work Light Bar",
    desc: "Overhead illumination for workspace",
    brand: "Anchor",
  },
  {
    id: "esd-kit",
    name: "ESD Kit",
    desc: "CPG kit, wristband, grounding cords, ESD mat for full workspace",
    brand: "Bondline",
  },
];

const CLIENTS = [
  { name: "ISRO · VSSC", hi: true },
  { name: "NTPC", hi: true },
  { name: "Tata Steel", hi: true },
  { name: "BHEL", hi: true },
  { name: "ONGC", hi: true },
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
  { name: "Travancore Cochin Chemicals", hi: false },
  { name: "Indian Navy · WED", hi: false },
  { name: "GTRE · DRDO", hi: false },
  { name: "Saint-Gobain", hi: false },
  { name: "Murata", hi: false },
];

const FAQS = [
  {
    q: "We already have our instruments. Can TMCI build the bench around them?",
    a: "Yes — that's actually the most common way we work. Send us your instrument list and your bay dimensions. We design the console layout around exactly what you have, fabricate the bench, and integrate everything during commissioning at your site.",
  },
  {
    q: "Does the bench come with calibration certificates?",
    a: "The bench itself is structural equipment — it doesn't carry a calibration certificate. The instruments in it do, either from the OEM or from an NABL-accredited laboratory. When instruments are part of our supply scope, we coordinate all of that.",
  },
  {
    q: "How long does it take to get delivered?",
    a: "Four to six weeks from confirmed order and approved drawings. That covers fabrication, instrument integration, wiring, factory acceptance testing and dispatch. We don't ship until it passes our internal checks.",
  },
  {
    q: "Is installation included?",
    a: "Yes, for Bengaluru and major metros. For other locations it's quoted separately. Either way, our team does operator familiarisation at handover so your technicians know exactly what they're working with.",
  },
  {
    q: "We're setting up a new lab from scratch. Can TMCI handle the whole thing?",
    a: "Yes. We've delivered complete labs as a single project — electrical calibration benches, pressure benches, ESD workstations, instrument storage, cable management, the lot. Tell us the scope and we'll put a plan together.",
  },
  {
    q: "Which standard does the bench design follow?",
    a: "Primarily ISO/IEC 17025:2017 for labs seeking or maintaining NABL accreditation. For in-house calibration under a QMS, ISO 9001:2015 clause 7.1.5. For ESD-sensitive work, ANSI/ESD S20.20. We design to whichever standard your lab is audited against — just tell us.",
  },
  {
    q: "Can we specify our own preferred instrument brands?",
    a: "Yes. Use the configurator on this page to set your preferred brands. If you have a specific make and model in mind, just tell us and we'll accommodate it.",
  },
];

const waNumber = "919742944306";
const waMsg = encodeURIComponent(
  "Hello! I'd like a quote for a custom electrical calibration bench.",
);

// ─── COMPONENT ───────────────────────────────────────────────────────────────

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
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="cb-hero">
        <div className="cb-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="cb-overline">
                Calibration Bench Systems · Bengaluru, India
              </span>
              <h1 className="cb-h1">
                Electrical Calibration
                <br />
                <em>Test Bench</em>
              </h1>
              <p className="cb-hero-sub">
                Tell us what you calibrate. We'll build around that.
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
                  href={`https://wa.me/${waNumber}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  }}
                >
                  Get a Quote →
                </a>
                <a
                  href="#configurator"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 13.5,
                    textDecoration: "none",
                  }}
                >
                  Configure your bench ↓
                </a>
              </div>
            </div>
            <div>
              <div className="cb-stat-grid">
                <div className="cb-stat-box">
                  <span className="cb-stat-num">100%</span>
                  <span className="cb-stat-label">Custom Built</span>
                </div>
                <div className="cb-stat-box">
                  <span className="cb-stat-num">350+</span>
                  <span className="cb-stat-label">Clients Served</span>
                </div>
                <div className="cb-stat-box">
                  <span className="cb-stat-num">13+</span>
                  <span className="cb-stat-label">Years Manufacturing</span>
                </div>
                <div className="cb-stat-box">
                  <span className="cb-stat-num">INT'L</span>
                  <span className="cb-stat-label">Ships Internationally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <div className="cb-trust">
        <div className="cb-trust-inner">
          <span className="cb-trust-label">Trusted by</span>
          {[
            "ISRO · VSSC",
            "NTPC",
            "Tata Steel",
            "BHEL",
            "ONGC",
            "BPCL",
            "Siemens",
            "Indian Navy",
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

      {/* ── OVERVIEW + ILLUSTRATION ──────────────────────────────────────── */}
      <section className="cb-sec" style={{ background: "var(--white)" }}>
        <div className="cb-inner">
          <span className="cb-overline">What It Is</span>
          <h2 className="cb-sec-title">
            Custom electrical calibration test bench — built to your
            requirement.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--mid)",
              maxWidth: 620,
              marginBottom: 36,
              lineHeight: 1.8,
            }}
          >
            Most benches you'll find come in fixed configurations. You pick the
            closest one and spend the next few months working around what
            doesn't fit. We just don't think that's a great way to start.
          </p>

          {/* BENCH ILLUSTRATION */}
          <div className="cb-bench-wrap">
            <svg
              width="100%"
              viewBox="0 0 680 500"
              role="img"
              aria-label="TMCI Electrical Calibration Test Bench — four facility zones: power and protection, DC power and signal, calibration instruments, test instruments. Frame: CRCA steel powder coated. Worktop: 25mm ESD Prelam board on MDF core."
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="cb-arr"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M2 1L8 5L2 9"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>

              {/* ── LEGS ── */}
              <rect
                x="192"
                y="334"
                width="14"
                height="108"
                rx="3"
                fill="#dde3ea"
                stroke="#c8d0da"
                strokeWidth="0.5"
              />
              <rect
                x="474"
                y="334"
                width="14"
                height="108"
                rx="3"
                fill="#dde3ea"
                stroke="#c8d0da"
                strokeWidth="0.5"
              />
              <rect
                x="192"
                y="406"
                width="296"
                height="10"
                rx="2"
                fill="#cdd5de"
                stroke="#c0c8d2"
                strokeWidth="0.5"
              />
              <rect
                x="186"
                y="438"
                width="26"
                height="7"
                rx="2"
                fill="#bcc6d2"
                stroke="#aab4c0"
                strokeWidth="0.5"
              />
              <rect
                x="468"
                y="438"
                width="26"
                height="7"
                rx="2"
                fill="#bcc6d2"
                stroke="#aab4c0"
                strokeWidth="0.5"
              />

              {/* ── WORKTOP — 25mm ESD Prelam board (MDF core) ── */}
              <rect
                x="180"
                y="316"
                width="320"
                height="22"
                rx="3"
                fill="#d8ead8"
                stroke="#a8c8a8"
                strokeWidth="1"
              />
              <rect
                x="180"
                y="316"
                width="320"
                height="5"
                rx="2"
                fill="#c4dcc4"
                stroke="none"
              />

              {/* ── CONSOLE OUTER SHELL ── */}
              <rect
                x="180"
                y="62"
                width="320"
                height="256"
                rx="5"
                fill="#f5f7fa"
                stroke="#dde3ea"
                strokeWidth="1.5"
              />
              <rect
                x="180"
                y="62"
                width="320"
                height="16"
                rx="4"
                fill="#2d3748"
                stroke="none"
              />
              <rect
                x="180"
                y="302"
                width="320"
                height="16"
                rx="0"
                fill="#2d3748"
                stroke="none"
              />

              {/* ── FACILITY DIVIDERS ── */}
              <line
                x1="260"
                y1="78"
                x2="260"
                y2="302"
                stroke="#dde3ea"
                strokeWidth="0.8"
                strokeDasharray="3,2"
              />
              <line
                x1="340"
                y1="78"
                x2="340"
                y2="302"
                stroke="#dde3ea"
                strokeWidth="0.8"
                strokeDasharray="3,2"
              />
              <line
                x1="420"
                y1="78"
                x2="420"
                y2="302"
                stroke="#dde3ea"
                strokeWidth="0.8"
                strokeDasharray="3,2"
              />

              {/* ═══ FACILITY 1 ═══ */}
              <text
                x="220"
                y="92"
                fontFamily="Inter,sans-serif"
                fontSize="8.5"
                fontWeight="700"
                fill="#00a07a"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                FACILITY 1
              </text>
              <text
                x="220"
                y="103"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#64748b"
                textAnchor="middle"
              >
                Power &amp; protection
              </text>
              <rect
                x="188"
                y="108"
                width="66"
                height="15"
                rx="7"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="221"
                y="119"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                230V · 50Hz
              </text>
              <circle
                cx="194"
                cy="136"
                r="5"
                fill="#22c55e"
                stroke="#16a34a"
                strokeWidth="0.5"
              />
              <circle
                cx="208"
                cy="136"
                r="5"
                fill="#ef4444"
                stroke="#dc2626"
                strokeWidth="0.5"
              />
              <text
                x="220"
                y="140"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#64748b"
              >
                R/G
              </text>
              <rect
                x="188"
                y="150"
                width="20"
                height="26"
                rx="3"
                fill="#e0f2fe"
                stroke="#7dd3fc"
                strokeWidth="0.8"
              />
              <rect
                x="190"
                y="154"
                width="16"
                height="8"
                rx="1"
                fill="#0ea5e9"
              />
              <text
                x="213"
                y="161"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#475569"
              >
                RCCB
              </text>
              <text
                x="213"
                y="171"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#94a3b8"
              >
                full system
              </text>
              <rect
                x="188"
                y="186"
                width="11"
                height="20"
                rx="2"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
              <rect
                x="189"
                y="189"
                width="9"
                height="6"
                rx="1"
                fill="#94a3b8"
              />
              <rect
                x="203"
                y="186"
                width="11"
                height="20"
                rx="2"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
              <rect
                x="204"
                y="189"
                width="9"
                height="6"
                rx="1"
                fill="#94a3b8"
              />
              <rect
                x="218"
                y="186"
                width="11"
                height="20"
                rx="2"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
              <rect
                x="219"
                y="189"
                width="9"
                height="6"
                rx="1"
                fill="#f59e0b"
              />
              <text
                x="220"
                y="220"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#64748b"
                textAnchor="middle"
              >
                MCB × facility
              </text>
              <circle
                cx="220"
                cy="260"
                r="14"
                fill="#fee2e2"
                stroke="#fca5a5"
                strokeWidth="1"
              />
              <circle cx="220" cy="260" r="10" fill="#dc2626" />
              <text
                x="220"
                y="264"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#fff"
                textAnchor="middle"
                fontWeight="700"
              >
                STOP
              </text>
              <text
                x="220"
                y="284"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#94a3b8"
                textAnchor="middle"
              >
                Emergency stop
              </text>

              {/* ═══ FACILITY 2 ═══ */}
              <text
                x="300"
                y="92"
                fontFamily="Inter,sans-serif"
                fontSize="8.5"
                fontWeight="700"
                fill="#00a07a"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                FACILITY 2
              </text>
              <text
                x="300"
                y="103"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#64748b"
                textAnchor="middle"
              >
                DC power &amp; signal
              </text>
              <rect
                x="266"
                y="108"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="300"
                y="119"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Fixed DC — 24V
              </text>
              <rect
                x="272"
                y="122"
                width="36"
                height="10"
                rx="5"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="290"
                y="130"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                24.00 V
              </text>
              <rect
                x="266"
                y="146"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="300"
                y="157"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Variable DC — 30V
              </text>
              <rect
                x="272"
                y="160"
                width="36"
                height="10"
                rx="5"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="290"
                y="168"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                15.50 V
              </text>
              <circle
                cx="328"
                cy="165"
                r="5"
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <circle cx="328" cy="165" r="2" fill="#f59e0b" />
              <rect
                x="266"
                y="184"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="300"
                y="195"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                4–20 mA source
              </text>
              <rect
                x="272"
                y="198"
                width="36"
                height="10"
                rx="5"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="290"
                y="206"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                12.00 mA
              </text>
              <circle
                cx="272"
                cy="230"
                r="5"
                fill="#f8fafc"
                stroke="#0ea5e9"
                strokeWidth="1"
              />
              <circle
                cx="284"
                cy="230"
                r="5"
                fill="#f8fafc"
                stroke="#0ea5e9"
                strokeWidth="1"
              />
              <circle
                cx="296"
                cy="230"
                r="5"
                fill="#f8fafc"
                stroke="#f59e0b"
                strokeWidth="1"
              />
              <circle
                cx="308"
                cy="230"
                r="5"
                fill="#f8fafc"
                stroke="#f59e0b"
                strokeWidth="1"
              />
              <circle
                cx="320"
                cy="230"
                r="5"
                fill="#f8fafc"
                stroke="#dde3ea"
                strokeWidth="1"
              />
              <circle
                cx="332"
                cy="230"
                r="5"
                fill="#f8fafc"
                stroke="#dde3ea"
                strokeWidth="1"
              />
              <text
                x="300"
                y="248"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#94a3b8"
                textAnchor="middle"
              >
                Banana sockets
              </text>
              <rect
                x="266"
                y="256"
                width="68"
                height="15"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="300"
                y="267"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#94a3b8"
                textAnchor="middle"
              >
                110V stepdown
              </text>

              {/* ═══ FACILITY 3 ═══ */}
              <text
                x="380"
                y="92"
                fontFamily="Inter,sans-serif"
                fontSize="8.5"
                fontWeight="700"
                fill="#00a07a"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                FACILITY 3
              </text>
              <text
                x="380"
                y="103"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#64748b"
                textAnchor="middle"
              >
                Calibration instruments
              </text>
              <rect
                x="346"
                y="108"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="380"
                y="119"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Multifunction cal.
              </text>
              <rect
                x="352"
                y="122"
                width="44"
                height="10"
                rx="5"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="374"
                y="130"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                4.000 mA
              </text>
              <rect
                x="346"
                y="146"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="380"
                y="157"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Loop calibrator
              </text>
              <rect
                x="352"
                y="160"
                width="44"
                height="10"
                rx="5"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="374"
                y="168"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                12.00 mA
              </text>
              <rect
                x="346"
                y="184"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="380"
                y="195"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Pressure calibrator
              </text>
              <rect
                x="352"
                y="198"
                width="44"
                height="10"
                rx="5"
                fill="#e6f7f2"
                stroke="#a0d8c8"
                strokeWidth="0.5"
              />
              <text
                x="374"
                y="206"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#00a07a"
                textAnchor="middle"
                fontWeight="600"
              >
                14.50 psi
              </text>
              <rect
                x="346"
                y="222"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="380"
                y="233"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Temp. calibrator
              </text>
              <rect
                x="352"
                y="236"
                width="44"
                height="10"
                rx="5"
                fill="#fff7ed"
                stroke="#fed7aa"
                strokeWidth="0.5"
              />
              <text
                x="374"
                y="244"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#ea580c"
                textAnchor="middle"
                fontWeight="600"
              >
                150.0 °C
              </text>
              <rect
                x="346"
                y="260"
                width="68"
                height="28"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="380"
                y="271"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Master gauge
              </text>
              <text
                x="380"
                y="282"
                fontFamily="Inter,sans-serif"
                fontSize="7"
                fill="#94a3b8"
                textAnchor="middle"
              >
                0–10000 mmWC
              </text>

              {/* ═══ FACILITY 4 ═══ */}
              <text
                x="460"
                y="92"
                fontFamily="Inter,sans-serif"
                fontSize="8.5"
                fontWeight="700"
                fill="#00a07a"
                textAnchor="middle"
                letterSpacing="0.05em"
              >
                FACILITY 4
              </text>
              <text
                x="460"
                y="103"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#64748b"
                textAnchor="middle"
              >
                Test instruments
              </text>
              <rect
                x="426"
                y="108"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="460"
                y="119"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Digital multimeter
              </text>
              <rect
                x="432"
                y="122"
                width="44"
                height="10"
                rx="5"
                fill="#fefce8"
                stroke="#fde68a"
                strokeWidth="0.5"
              />
              <text
                x="454"
                y="130"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#b45309"
                textAnchor="middle"
                fontWeight="600"
              >
                230.5 V AC
              </text>
              <rect
                x="426"
                y="146"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="460"
                y="157"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                Oscilloscope
              </text>
              <path
                d="M432 168 Q438 161 444 168 Q450 175 456 165 Q462 156 468 165 Q474 174 480 165 Q486 157 492 165"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="0.8"
              />
              <rect
                x="426"
                y="184"
                width="68"
                height="30"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="460"
                y="195"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                HART communicator
              </text>
              <text
                x="460"
                y="207"
                fontFamily="Inter,sans-serif"
                fontSize="7"
                fill="#94a3b8"
                textAnchor="middle"
              >
                Docking provision
              </text>
              <rect
                x="426"
                y="222"
                width="68"
                height="18"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="460"
                y="234"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                LED work light
              </text>
              <rect
                x="434"
                y="236"
                width="52"
                height="4"
                rx="2"
                fill="#fde68a"
              />
              <rect
                x="426"
                y="248"
                width="68"
                height="28"
                rx="3"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="0.8"
              />
              <text
                x="460"
                y="259"
                fontFamily="Inter,sans-serif"
                fontSize="7.5"
                fill="#64748b"
                textAnchor="middle"
              >
                ESD kit
              </text>
              <text
                x="460"
                y="270"
                fontFamily="Inter,sans-serif"
                fontSize="7"
                fill="#94a3b8"
                textAnchor="middle"
              >
                Mat · strap · cord
              </text>

              {/* ── ALL CALLOUTS ON RIGHT SIDE — safe x values ── */}
              <line
                x1="502"
                y1="327"
                x2="540"
                y2="327"
                stroke="#94a3b8"
                strokeWidth="0.8"
                strokeDasharray="3,2"
                markerEnd="url(#cb-arr)"
              />
              <text
                x="544"
                y="320"
                fontFamily="Inter,sans-serif"
                fontSize="11"
                fontWeight="600"
                fill="#1e293b"
                textAnchor="start"
              >
                Worktop
              </text>
              <text
                x="544"
                y="333"
                fontFamily="Inter,sans-serif"
                fontSize="9.5"
                fill="#64748b"
                textAnchor="start"
              >
                25mm ESD Prelam board
              </text>
              <text
                x="544"
                y="344"
                fontFamily="Inter,sans-serif"
                fontSize="9.5"
                fill="#94a3b8"
                textAnchor="start"
              >
                (MDF core, anti-static laminate)
              </text>

              <line
                x1="502"
                y1="400"
                x2="540"
                y2="400"
                stroke="#94a3b8"
                strokeWidth="0.8"
                strokeDasharray="3,2"
                markerEnd="url(#cb-arr)"
              />
              <text
                x="544"
                y="393"
                fontFamily="Inter,sans-serif"
                fontSize="11"
                fontWeight="600"
                fill="#1e293b"
                textAnchor="start"
              >
                Frame
              </text>
              <text
                x="544"
                y="407"
                fontFamily="Inter,sans-serif"
                fontSize="9.5"
                fill="#64748b"
                textAnchor="start"
              >
                CRCA steel, powder coated
              </text>

              <line
                x1="502"
                y1="185"
                x2="540"
                y2="185"
                stroke="#94a3b8"
                strokeWidth="0.8"
                strokeDasharray="3,2"
                markerEnd="url(#cb-arr)"
              />
              <text
                x="544"
                y="178"
                fontFamily="Inter,sans-serif"
                fontSize="11"
                fontWeight="600"
                fill="#1e293b"
                textAnchor="start"
              >
                Console
              </text>
              <text
                x="544"
                y="192"
                fontFamily="Inter,sans-serif"
                fontSize="9.5"
                fill="#64748b"
                textAnchor="start"
              >
                Pre-wired &amp; tested
              </text>

              <line
                x1="502"
                y1="442"
                x2="540"
                y2="442"
                stroke="#94a3b8"
                strokeWidth="0.8"
                strokeDasharray="3,2"
                markerEnd="url(#cb-arr)"
              />
              <text
                x="544"
                y="435"
                fontFamily="Inter,sans-serif"
                fontSize="11"
                fontWeight="600"
                fill="#1e293b"
                textAnchor="start"
              >
                Levellers
              </text>
              <text
                x="544"
                y="449"
                fontFamily="Inter,sans-serif"
                fontSize="9.5"
                fill="#64748b"
                textAnchor="start"
              >
                Height adjustable
              </text>

              {/* ── CERT STRIP ── */}
              <rect
                x="180"
                y="460"
                width="320"
                height="22"
                rx="3"
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <text
                x="224"
                y="474"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#94a3b8"
                textAnchor="middle"
              >
                ISO 9001:2015
              </text>
              <line
                x1="260"
                y1="466"
                x2="260"
                y2="476"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <text
                x="296"
                y="474"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#94a3b8"
                textAnchor="middle"
              >
                CE · ROHS
              </text>
              <line
                x1="328"
                y1="466"
                x2="328"
                y2="476"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <text
                x="360"
                y="474"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#94a3b8"
                textAnchor="middle"
              >
                BIFMA
              </text>
              <line
                x1="392"
                y1="466"
                x2="392"
                y2="476"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
              <text
                x="436"
                y="474"
                fontFamily="Inter,sans-serif"
                fontSize="8"
                fill="#94a3b8"
                textAnchor="middle"
              >
                IEC 61000
              </text>
            </svg>
          </div>

          {/* FEATURE CARDS */}
          <div className="cb-feature-grid">
            {[
              {
                title: "Everything in one place, properly powered",
                body: "How many times has someone spent ten minutes tracing a cable just to figure out which socket is live? Every circuit here is labeled, every socket is where you'd expect it. So all your team has to do is just sit down and get to work.",
              },
              {
                title: "Safe to leave running",
                body: "Overloads, earth leakage, motor faults — each has its own protection built in. There's an emergency stop within arm's reach. Once it's set up, you honestly don't have to think about it.",
              },
              {
                title: "A worktop that suits what you handle",
                body: "25mm ESD Prelam board as standard — properly grounded, with a CPG kit, wrist strap and ESD mat for the full workspace. The surface your technicians work on is matched to what they handle.",
              },
              {
                title: "Instruments — yours or ours",
                body: (
                  <>
                    Already have instruments? We mount and wire them in. Need to
                    source? We're authorized dealers for{" "}
                    <a
                      href="https://www.fluke.com/en-in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cb-ext-link"
                    >
                      Fluke
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.harogic.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cb-ext-link"
                    >
                      Harogic
                    </a>
                    . Either way it arrives assembled, tested and ready to go.
                  </>
                ),
              },
              {
                title: "Built to hold up under audit",
                body: "Same build standard that went into labs at ISRO, NTPC and the Indian Navy. If it works for their auditors, it'll work for yours.",
              },
              {
                title: "Ships ready to calibrate",
                body: "Fully assembled, wired, labeled and factory tested before dispatch. Not a kit. Your team walks in and calibrates on day one.",
              },
            ].map((card, i) => (
              <div key={i} className="cb-feature-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>

          {/* STANDARDS */}
          <div className="cb-std-note">
            <strong style={{ color: "var(--ink)" }}>On compliance:</strong> The
            bench layout, power distribution and instrument mounting are
            designed with{" "}
            <a
              href="https://www.iso.org/standard/66912.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cb-ext-link"
            >
              ISO/IEC 17025:2017
            </a>{" "}
            in mind — what{" "}
            <a
              href="https://www.nabcb.gov.in/accreditation/accreditation_cal.php"
              target="_blank"
              rel="noopener noreferrer"
              className="cb-ext-link"
            >
              NABL
            </a>{" "}
            uses to assess calibration laboratories in India. If your lab runs
            under ISO 9001 rather than formal accreditation, it satisfies{" "}
            <a
              href="https://www.iso.org/standard/62085.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cb-ext-link"
            >
              clause 7.1.5
            </a>{" "}
            for monitoring and measuring resources.
            <div className="cb-std-links">
              <a
                href="https://www.iso.org/standard/66912.html"
                target="_blank"
                rel="noopener noreferrer"
                className="cb-std-link"
              >
                ISO/IEC 17025 ↗
              </a>
              <a
                href="https://www.nabcb.gov.in/accreditation/accreditation_cal.php"
                target="_blank"
                rel="noopener noreferrer"
                className="cb-std-link"
              >
                NABL ↗
              </a>
              <a
                href="https://www.iso.org/standard/62085.html"
                target="_blank"
                rel="noopener noreferrer"
                className="cb-std-link"
              >
                ISO 9001:2015 ↗
              </a>
              <a
                href="https://www.bipm.org/en/measurement-units/"
                target="_blank"
                rel="noopener noreferrer"
                className="cb-std-link"
              >
                BIPM traceability ↗
              </a>
              <a
                href="https://www.esda.org/standards/esd-standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="cb-std-link"
              >
                ANSI/ESD S20.20 ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONFIGURATOR ─────────────────────────────────────────────────── */}
      <section
        className="cb-sec"
        style={{ background: "var(--surface)" }}
        id="configurator"
      >
        <div className="cb-inner">
          <span className="cb-overline">
            Configure Your Electrical Calibration Bench
          </span>
          <h2 className="cb-sec-title">
            What goes into an electrical calibration bench
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--mid)",
              maxWidth: 560,
              marginBottom: 32,
              lineHeight: 1.75,
            }}
          >
            Add or remove facilities below. Click any brand to change it to one
            you prefer. When you're done, send us the list and we'll build a
            quote around it.
          </p>
          <div className="cb-config-wrap">
            <div className="cb-config-header">
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
                href={`https://wa.me/${waNumber}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
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
                <div key={i} className="cb-config-item">
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
                  <button className="cb-brand-btn" onClick={() => openBrand(i)}>
                    {f.brand || "Set Brand"}
                  </button>
                  <button
                    className="cb-remove-btn"
                    onClick={() => removeFacility(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              className="cb-add-btn"
              onClick={() => setShowAddModal(true)}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add a
              facility
            </button>
            <div className="cb-config-footer">
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
          <div className="cb-std-note" style={{ marginTop: 16 }}>
            <strong style={{ color: "var(--ink)" }}>
              This is a starting point, not a final list.
            </strong>{" "}
            Our engineers will review your configuration, ask about your lab
            layout and instrument list, and refine it before quoting. Nothing is
            locked in at this stage.
          </div>
        </div>
      </section>

      {/* ── CLIENTS ──────────────────────────────────────────────────────── */}
      <section className="cb-sec" style={{ background: "var(--white)" }}>
        <div className="cb-inner">
          <span className="cb-overline">
            Who Uses TMCI Electrical Calibration Benches
          </span>
          <h2 className="cb-sec-title">
            Electrical calibration benches supplied to 350+ organisations across
            India.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--mid)",
              maxWidth: 560,
              lineHeight: 1.75,
            }}
          >
            TMCI calibration benches are working in labs, maintenance workshops
            and quality departments across these organisations — across India
            and internationally.
          </p>
          <div className="cb-clients-grid">
            {CLIENTS.map((c, i) => (
              <div key={i} className={`cb-client-cell${c.hi ? " hi" : ""}`}>
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────────────────── */}
      <section
        className="cb-sec"
        style={{ background: "var(--surface)" }}
        id="quote"
      >
        <div className="cb-inner">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="cb-overline">
              How to Order an Electrical Calibration Bench
            </span>
            <h2 className="cb-sec-title">
              How to order an electrical calibration bench from TMCI
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--mid)",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              No lengthy forms, no commitments at this stage. Just tell us what
              you need and our engineers take it from there.
            </p>
          </div>
          <div className="cb-steps">
            {[
              {
                num: "01",
                title: "Tell us your requirement",
                desc: "Instrument list, lab dimensions, audit standard. WhatsApp, email or phone — whatever is easiest.",
              },
              {
                num: "02",
                title: "We design your bench",
                desc: "Our engineers review your requirement and come back with a configuration and questions. Usually within 48 hours.",
              },
              {
                num: "03",
                title: "You approve the drawings",
                desc: "We share fabrication drawings. You review, request changes, and sign off. Nothing goes into production without your approval.",
              },
              {
                num: "04",
                title: "We build, install and hand over",
                desc: "4–6 weeks build time. We deliver, install, commission and hand over across India. Operator familiarisation included.",
              },
            ].map((step, i) => (
              <div key={i} className="cb-step">
                <div className="cb-step-num">{step.num}</div>
                <div className="cb-step-title">{step.title}</div>
                <div className="cb-step-desc">{step.desc}</div>
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
              }}
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
              marginTop: 14,
              fontSize: 13,
              color: "var(--muted)",
            }}
          >
            Or email{" "}
            <a href="mailto:info@tazkmazter.com" className="cb-ext-link">
              info@tazkmazter.com
            </a>{" "}
            · Bengaluru · Pan India delivery and installation
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        className="cb-sec"
        style={{ background: "var(--white)", paddingTop: 40 }}
      >
        <div className="cb-inner" style={{ maxWidth: 820 }}>
          <span className="cb-overline">
            Electrical Calibration Bench — Common Questions
          </span>
          <h2 className="cb-sec-title">Electrical calibration bench FAQ</h2>
          <div style={{ marginTop: 24 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="cb-faq-item">
                <button
                  className="cb-faq-btn"
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
                {openFaq === i && <div className="cb-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="cb-final">
        <div className="cb-final-inner">
          <span
            className="cb-overline"
            style={{ display: "block", marginBottom: 14 }}
          >
            Get a Quote for Your Electrical Calibration Bench
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
            Tell us what you calibrate.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 15,
              marginBottom: 36,
              lineHeight: 1.8,
              maxWidth: 480,
              margin: "0 auto 36px",
            }}
          >
            Instrument list, bay size, audit standard. Send us what you have and
            we'll come back with a quote built to your requirement. No lengthy
            forms, no commitments.
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
              }}
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
              }}
            >
              Call +91 97429 44306
            </a>
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            We respond within 24 hours. Our engineers read every enquiry
            personally.
          </p>
        </div>
      </section>

      {/* ── ADD FACILITY MODAL ───────────────────────────────────────────── */}
      {showAddModal && (
        <div
          className="cb-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div className="cb-modal">
            <div className="cb-modal-head">
              <h3
                style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}
              >
                Add a Facility
              </h3>
              <button
                className="cb-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="cb-modal-body">
              {CATALOGUE.map((cat) => (
                <div key={cat.cat} style={{ marginBottom: 24 }}>
                  <div className="cb-modal-cat-title">{cat.cat}</div>
                  {cat.items.map((item) => {
                    const added = addedIds.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`cb-modal-item${added ? " added" : ""}`}
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
                          <div style={{ fontSize: 11.5, color: "var(--mid)" }}>
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BRAND MODAL ──────────────────────────────────────────────────── */}
      {showBrandModal && targetItem && (
        <div
          className="cb-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBrandModal(false);
          }}
        >
          <div className="cb-modal cb-modal-sm">
            <div className="cb-modal-head">
              <h3
                style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}
              >
                Brand — {targetItem.name}
              </h3>
              <button
                className="cb-modal-close"
                onClick={() => setShowBrandModal(false)}
              >
                ×
              </button>
            </div>
            <div className="cb-modal-body">
              {targetBrands.map((b) => (
                <div
                  key={b}
                  className="cb-brand-opt"
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
