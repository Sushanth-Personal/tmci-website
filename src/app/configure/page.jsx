"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./configure.css";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const BENCH_TYPES = [
  {
    id: "calibration",
    label: "Calibration Test Bench",
    icon: "🎛️",
    desc: "In-house calibration of temperature, pressure, electrical and electronic instruments",
  },
  {
    id: "esd",
    label: "ESD Workstation",
    icon: "⚡",
    desc: "Static-controlled workspace for electronics assembly and sensitive device handling",
  },
  {
    id: "pressure",
    label: "Pressure / Pneumatic Bench",
    icon: "🔵",
    desc: "Calibration and testing of pressure devices, transmitters and pneumatic instruments",
  },
  {
    id: "electronic",
    label: "Electronic Test Bench",
    icon: "📡",
    desc: "Signal testing, power supply rigs, general electronics QA and measurement",
  },
  {
    id: "lab",
    label: "Lab / Work Table",
    icon: "🧪",
    desc: "Durable ergonomic workspace for research, education or industrial environments",
  },
  {
    id: "unsure",
    label: "Not sure yet",
    icon: "💬",
    desc: "Tell us your application — our engineers will suggest the right configuration",
  },
];

const MODULES = {
  calibration: [
    {
      id: "temp",
      icon: "🌡️",
      name: "Temperature Module",
      why: "Calibrate sensors, RTDs and thermocouples",
    },
    {
      id: "pressure",
      icon: "🔵",
      name: "Pressure Module",
      why: "Test and calibrate pressure transmitters and gauges",
    },
    {
      id: "loop",
      icon: "🔄",
      name: "Loop Calibrator",
      why: "Simulate and measure 4-20mA current loop signals",
    },
    {
      id: "signal",
      icon: "📶",
      name: "Electrical Signal Module",
      why: "Calibrate voltage, current and frequency signals",
    },
    {
      id: "dc_power",
      icon: "⚡",
      name: "DC Power Supply",
      why: "Power instruments during calibration",
    },
    {
      id: "dmm",
      icon: "🔢",
      name: "Digital Multimeter",
      why: "Precise voltage, current and resistance measurement",
    },
    {
      id: "oscilloscope",
      icon: "📊",
      name: "Oscilloscope",
      why: "Visualise and measure electrical signals",
    },
    {
      id: "pc",
      icon: "💻",
      name: "PC Workstation",
      why: "Data logging and calibration certificate generation",
    },
    {
      id: "cabinet",
      icon: "🗄️",
      name: "Overhead Cabinet",
      why: "Organised storage above the workspace",
    },
    {
      id: "esd",
      icon: "🛡️",
      name: "ESD Grounding",
      why: "Protect sensitive electronics from static discharge",
    },
    {
      id: "printer",
      icon: "🖨️",
      name: "Printer",
      why: "Print calibration certificates at the bench",
    },
  ],
  esd: [
    {
      id: "esd_mat",
      icon: "🟩",
      name: "ESD Work Surface Mat",
      why: "Anti-static surface that dissipates static safely to ground",
    },
    {
      id: "wrist_tester",
      icon: "✅",
      name: "Wrist Strap Tester",
      why: "Verify grounding before starting work",
    },
    {
      id: "grounding",
      icon: "🛡️",
      name: "Grounding System",
      why: "Central ground point for all ESD elements",
    },
    {
      id: "ionizer",
      icon: "💨",
      name: "Ionizing Blower",
      why: "Neutralise static on components that can't be grounded",
    },
    {
      id: "ac_power",
      icon: "🔌",
      name: "AC Power Sockets",
      why: "Safe, switched power at the bench",
    },
    {
      id: "dc_power",
      icon: "⚡",
      name: "DC Power Supply",
      why: "Stable DC voltage for powering PCBs and assemblies",
    },
    {
      id: "dmm",
      icon: "🔢",
      name: "Digital Multimeter",
      why: "Measure voltage, current and resistance",
    },
    {
      id: "soldering",
      icon: "🔧",
      name: "Soldering Station",
      why: "ESD-safe soldering for assembly and rework",
    },
    {
      id: "magnifier",
      icon: "🔍",
      name: "Magnifying Lamp",
      why: "Illuminated magnification for detailed inspection",
    },
    {
      id: "cabinet",
      icon: "🗄️",
      name: "Overhead Cabinet",
      why: "ESD-safe storage above the workspace",
    },
    {
      id: "bins",
      icon: "📦",
      name: "ESD Component Bins",
      why: "Static-safe storage for components in progress",
    },
    {
      id: "pc",
      icon: "💻",
      name: "PC Workstation",
      why: "Testing software and documentation at the station",
    },
  ],
  pressure: [
    {
      id: "pressure_ctrl",
      icon: "🎚️",
      name: "Pressure Controller",
      why: "Precisely control test pressure for calibration",
    },
    {
      id: "digital_gauge",
      icon: "📏",
      name: "Digital Pressure Gauge",
      why: "Reference standard for accurate pressure measurement",
    },
    {
      id: "hand_pump",
      icon: "🔵",
      name: "Pneumatic Hand Pump",
      why: "Generate controlled pressure manually",
    },
    {
      id: "deadweight",
      icon: "⚖️",
      name: "Deadweight Tester",
      why: "Primary standard for high-accuracy pressure calibration",
    },
    {
      id: "loop",
      icon: "🔄",
      name: "Loop Calibrator",
      why: "Simulate and measure 4-20mA from pressure transmitters",
    },
    {
      id: "signal",
      icon: "📶",
      name: "Electrical Signal Module",
      why: "Test electrical output from pressure instruments",
    },
    {
      id: "dc_power",
      icon: "⚡",
      name: "DC Power Supply",
      why: "Power pressure transmitters during calibration",
    },
    {
      id: "dmm",
      icon: "🔢",
      name: "Digital Multimeter",
      why: "Measure electrical output from pressure sensors",
    },
    {
      id: "pc",
      icon: "💻",
      name: "PC Workstation",
      why: "Data logging and certificate generation",
    },
    {
      id: "cabinet",
      icon: "🗄️",
      name: "Overhead Cabinet",
      why: "Storage for standards, fittings and accessories",
    },
  ],
  electronic: [
    {
      id: "dc_power",
      icon: "⚡",
      name: "DC Power Supply",
      why: "Stable adjustable DC for powering circuits under test",
    },
    {
      id: "ac_power",
      icon: "🔌",
      name: "AC Power Supply",
      why: "Variable AC for testing across different supply conditions",
    },
    {
      id: "oscilloscope",
      icon: "📊",
      name: "Oscilloscope",
      why: "Visualise and analyse electrical signals",
    },
    {
      id: "dmm",
      icon: "🔢",
      name: "Digital Multimeter",
      why: "Measure voltage, current, resistance and continuity",
    },
    {
      id: "signal_gen",
      icon: "〰️",
      name: "Signal / Function Generator",
      why: "Generate test signals for stimulating circuits",
    },
    {
      id: "lcr",
      icon: "🔁",
      name: "LCR Meter",
      why: "Measure inductance, capacitance and resistance of components",
    },
    {
      id: "eload",
      icon: "🔋",
      name: "Electronic Load",
      why: "Simulate real load conditions for power supply testing",
    },
    {
      id: "spectrum",
      icon: "📡",
      name: "Spectrum Analyser",
      why: "Analyse frequency content of signals",
    },
    {
      id: "esd",
      icon: "🛡️",
      name: "ESD Grounding",
      why: "Protect sensitive components from static damage",
    },
    {
      id: "pc",
      icon: "💻",
      name: "PC Workstation",
      why: "Test automation, data logging and reporting",
    },
    {
      id: "cabinet",
      icon: "🗄️",
      name: "Overhead Cabinet",
      why: "Storage for test leads, probes and accessories",
    },
  ],
  lab: [
    {
      id: "adjustable_height",
      icon: "↕️",
      name: "Adjustable Height",
      why: "Ergonomic working position for seated and standing use",
    },
    {
      id: "chemical_surface",
      icon: "🧪",
      name: "Chemical-Resistant Surface",
      why: "Laminated surface resistant to lab chemicals and solvents",
    },
    {
      id: "ac_power",
      icon: "🔌",
      name: "Power Sockets",
      why: "Switched AC power distribution along the bench",
    },
    {
      id: "overhead_shelf",
      icon: "📚",
      name: "Overhead Shelf",
      why: "Additional storage and instrument placement above workspace",
    },
    {
      id: "cabinet",
      icon: "🗄️",
      name: "Under-Bench Cabinet",
      why: "Lockable storage below the work surface",
    },
    {
      id: "lighting",
      icon: "💡",
      name: "LED Task Lighting",
      why: "Bright focused illumination over the work area",
    },
    {
      id: "cable_mgmt",
      icon: "🔗",
      name: "Cable Management",
      why: "Organised routing for power and data cables",
    },
    {
      id: "drawer",
      icon: "📥",
      name: "Drawers",
      why: "Quick-access storage for tools and small items",
    },
    {
      id: "esd",
      icon: "🛡️",
      name: "ESD Grounding",
      why: "Static protection for handling sensitive electronics",
    },
  ],
  unsure: [],
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const S = {
  page: {
    minHeight: "100vh",
    background: "#060F0D",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: "#fff",
  },
  topbar: {
    background: "rgba(6,15,13,0.95)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "14px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(12px)",
  },
  container: { maxWidth: 900, margin: "0 auto", padding: "48px 20px 80px" },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "24px 20px",
    cursor: "pointer",
    transition: "all 0.15s",
    position: "relative",
  },
  cardSelected: {
    background: "rgba(0,191,140,0.1)",
    border: "1px solid rgba(0,191,140,0.5)",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 14,
    color: "#fff",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.3)",
    display: "block",
    marginBottom: 8,
  },
  btnPrimary: {
    background: "var(--primary, #00897B)",
    border: "none",
    color: "#fff",
    padding: "13px 32px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    transition: "all 0.18s",
  },
  btnBack: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.6)",
    padding: "11px 24px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13.5,
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  btnWa: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(37,211,102,0.1)",
    border: "1px solid rgba(37,211,102,0.25)",
    color: "#4ade80",
    padding: "12px 20px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
  },
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function ConfigurePage() {
  const [step, setStep] = useState(1);
  const [benchType, setBenchType] = useState(null);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ name: "", company: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919742944306";
  const modules = benchType ? MODULES[benchType] || [] : [];
  const benchLabel = BENCH_TYPES.find((b) => b.id === benchType)?.label || "";
  const isValid = form.name.trim() && form.contact.trim();

  function toggleModule(id) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  }

  function buildWAMessage() {
    const selectedNames = selected
      .map((id) => modules.find((m) => m.id === id)?.name)
      .filter(Boolean);
    return encodeURIComponent(
      [
        "🔧 *TMCI Bench Configuration*",
        "",
        `*Bench Type:* ${benchLabel}`,
        `*Modules:* ${selectedNames.length ? selectedNames.join(", ") : "To be discussed"}`,
        "",
        `*Name:* ${form.name}`,
        `*Company:* ${form.company || "Not provided"}`,
        `*Contact:* ${form.contact}`,
        "",
        "Please get in touch with a quote.",
      ].join("\n"),
    );
  }

  // ── SUCCESS ──
  if (submitted) {
    return (
      <div style={S.page}>
        <div style={{ ...S.topbar }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#00897B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              TM
            </div>
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.3px",
              }}
            >
              TMCI Technology
            </span>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 60px)",
            padding: "40px 20px",
          }}
        >
          <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(0,191,140,0.12)",
                border: "2px solid #00BFA5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: 32,
              }}
            >
              ✓
            </div>
            <h1
              style={{
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-1px",
                marginBottom: 12,
              }}
            >
              Configuration sent, {form.name.split(" ")[0]}!
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                marginBottom: 32,
              }}
            >
              Our engineers will review your bench configuration and get back
              within 24 hours. Detailed specs and pricing confirmed on a call.
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
                href={`https://wa.me/${waNumber}?text=${buildWAMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                style={S.btnWa}
              >
                💬 Also send on WhatsApp
              </a>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,191,140,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,140,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(0,191,140,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Topbar */}
      <div style={{ ...S.topbar, position: "relative", zIndex: 50 }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#00897B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            TM
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            TMCI Technology
          </span>
        </Link>
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← Back to website
        </Link>
      </div>

      <div style={{ ...S.container, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#4DD0C4",
              marginBottom: 12,
            }}
          >
            Bench Configurator
          </div>
          <h1
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Build your bench, your way.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Select what you need. Detailed specs confirmed on a call — no
            commitment required at this stage.
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 48,
            alignItems: "center",
          }}
        >
          {["Bench Type", "Modules", "Your Details"].map((label, i) => (
            <React.Fragment key={label}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background:
                      step > i + 1
                        ? "#00897B"
                        : step === i + 1
                          ? "#00897B"
                          : "rgba(255,255,255,0.08)",
                    color: step >= i + 1 ? "#fff" : "rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      step === i + 1
                        ? "#fff"
                        : step > i + 1
                          ? "#4DD0C4"
                          : "rgba(255,255,255,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      step > i + 1 ? "#00897B" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 1 — Bench Type ── */}
        {step === 1 && (
          <div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 6,
                letterSpacing: "-0.5px",
              }}
            >
              What type of bench are you building?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 28,
              }}
            >
              Select the one that best fits your application.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
              className="cfg-bench-grid"
            >
              {BENCH_TYPES.map((bt) => {
                const isSelected = benchType === bt.id;
                return (
                  <div
                    key={bt.id}
                    onClick={() => setBenchType(bt.id)}
                    style={{
                      ...S.card,
                      ...(isSelected ? S.cardSelected : {}),
                      background: isSelected
                        ? "rgba(0,191,140,0.1)"
                        : "rgba(255,255,255,0.03)",
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#00897B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 900,
                          color: "#fff",
                        }}
                      >
                        ✓
                      </div>
                    )}
                    <div style={{ fontSize: 28, marginBottom: 12 }}>
                      {bt.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 6,
                        lineHeight: 1.3,
                        paddingRight: isSelected ? 24 : 0,
                      }}
                    >
                      {bt.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.55,
                      }}
                    >
                      {bt.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => benchType && setStep(2)}
                disabled={!benchType}
                style={{
                  ...S.btnPrimary,
                  opacity: benchType ? 1 : 0.35,
                  cursor: benchType ? "pointer" : "not-allowed",
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 — Modules ── */}
        {step === 2 && (
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,191,140,0.1)",
                border: "1px solid rgba(0,191,140,0.25)",
                borderRadius: 20,
                padding: "4px 14px",
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "#4DD0C4" }}>
                {benchLabel}
              </span>
            </div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 6,
                letterSpacing: "-0.5px",
              }}
            >
              What do you need on your bench?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 28,
              }}
            >
              Select all that apply. Not sure? Skip it — we'll go through it
              together.
            </p>

            {benchType === "unsure" ? (
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "40px",
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  No problem — just fill in your details in the next step and
                  tell us about your application. Our engineers will suggest the
                  right setup.
                </p>
              </div>
            ) : (
              <>
                {/* Module grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                    marginBottom: 20,
                  }}
                  className="cfg-module-grid"
                >
                  {modules.map((mod) => {
                    const isSel = selected.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        style={{
                          background: isSel
                            ? "rgba(0,191,140,0.1)"
                            : "rgba(255,255,255,0.03)",
                          border: `1.5px solid ${isSel ? "rgba(0,191,140,0.5)" : "rgba(255,255,255,0.07)"}`,
                          borderRadius: 10,
                          padding: "18px 16px",
                          cursor: "pointer",
                          transition: "all 0.15s",
                          position: "relative",
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: `1.5px solid ${isSel ? "#00897B" : "rgba(255,255,255,0.15)"}`,
                            background: isSel ? "#00897B" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s",
                          }}
                        >
                          {isSel && (
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 10,
                                fontWeight: 900,
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 22, marginBottom: 8 }}>
                          {mod.icon}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                            paddingRight: 20,
                            lineHeight: 1.3,
                          }}
                        >
                          {mod.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: "rgba(255,255,255,0.4)",
                            lineHeight: 1.55,
                          }}
                        >
                          {mod.why}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected count */}
                {selected.length > 0 && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "#4DD0C4",
                      fontWeight: 600,
                      marginBottom: 16,
                    }}
                  >
                    {selected.length} module{selected.length > 1 ? "s" : ""}{" "}
                    selected
                  </div>
                )}
              </>
            )}

            {/* Note */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: "3px solid #00897B",
                borderRadius: "0 8px 8px 0",
                padding: "12px 16px",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "rgba(255,255,255,0.7)" }}>
                  Detailed configuration
                </strong>{" "}
                — materials, dimensions, power specs — confirmed with our
                engineer on a call.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => {
                  setStep(1);
                  setSelected([]);
                }}
                style={S.btnBack}
              >
                ← Back
              </button>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={() => {
                    setSelected([]);
                    setStep(3);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    textDecoration: "underline",
                  }}
                >
                  Skip — I'll discuss on a call
                </button>
                <button onClick={() => setStep(3)} style={S.btnPrimary}>
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Contact ── */}
        {step === 3 && (
          <div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 6,
                letterSpacing: "-0.5px",
              }}
            >
              Almost there — where should we send the quote?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 28,
              }}
            >
              Our engineers will get back within 24 hours.
            </p>

            {/* Config summary */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "16px 20px",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: 10,
                }}
              >
                Your configuration
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "rgba(0,191,140,0.12)",
                    border: "1px solid rgba(0,191,140,0.3)",
                    color: "#4DD0C4",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 20,
                  }}
                >
                  {benchLabel}
                </span>
                {selected.map((id) => {
                  const mod = modules.find((m) => m.id === id);
                  return mod ? (
                    <span
                      key={id}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: 12,
                        fontWeight: 500,
                        padding: "4px 12px",
                        borderRadius: 20,
                      }}
                    >
                      {mod.name}
                    </span>
                  ) : null;
                })}
                {selected.length === 0 && (
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.25)",
                      fontStyle: "italic",
                    }}
                  >
                    No modules selected — we'll work it out together
                  </span>
                )}
              </div>
            </div>

            {/* Form */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                maxWidth: 560,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
                className="cfg-form-2col"
              >
                <div>
                  <label style={S.label}>Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Rahul Sharma"
                    style={S.input}
                    onFocus={(e) => (e.target.style.borderColor = "#00BFA5")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.09)")
                    }
                  />
                </div>
                <div>
                  <label style={S.label}>Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, company: e.target.value }))
                    }
                    placeholder="Acme Industries"
                    style={S.input}
                    onFocus={(e) => (e.target.style.borderColor = "#00BFA5")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.09)")
                    }
                  />
                </div>
              </div>
              <div>
                <label style={S.label}>Phone or Email *</label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contact: e.target.value }))
                  }
                  placeholder="+91 98765 43210 or name@company.com"
                  style={S.input}
                  onFocus={(e) => (e.target.style.borderColor = "#00BFA5")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.09)")
                  }
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 28,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <button onClick={() => setStep(2)} style={S.btnBack}>
                ← Back
              </button>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${waNumber}?text=${buildWAMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={S.btnWa}
                >
                  💬 Send on WhatsApp
                </a>
                <button
                  onClick={() => isValid && setSubmitted(true)}
                  disabled={!isValid}
                  style={{
                    ...S.btnPrimary,
                    background: isValid ? "#F59E0B" : "rgba(255,255,255,0.08)",
                    color: isValid ? "#fff" : "rgba(255,255,255,0.3)",
                    cursor: isValid ? "pointer" : "not-allowed",
                    opacity: 1,
                  }}
                >
                  Send Configuration →
                </button>
              </div>
            </div>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.25)",
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              Detailed specs — materials, dimensions, power requirements —
              confirmed with our engineer on a call. No commitment required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
