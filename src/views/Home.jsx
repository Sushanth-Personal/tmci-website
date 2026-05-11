'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { cacheGet, cacheSet } from "../lib/cache";
import DOMPurify from "dompurify";

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────

function SectionRenderer({ section, fallback }) {
  if (!section) return fallback || null;
  if (section.content_type === "html") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(section.content),
        }}
      />
    );
  }
  if (section.content_type === "image") {
    return (
      <img
        src={section.content}
        alt={section.title}
        style={{ width: "100%", borderRadius: 8 }}
        loading="lazy"
      />
    );
  }
  return fallback || null;
}

// ─────────────────────────────────────────────
// COMPONENT: BENCH SVG ILLUSTRATION
// Used in: Section 5 (Why TMCI), Blog preview
// ─────────────────────────────────────────────

function BenchSVG() {
  return (
    <svg
      viewBox="0 0 320 260"
      width="300"
      height="244"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="benchTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2D4A3E" />
          <stop offset="100%" stopColor="#1A3028" />
        </linearGradient>
        <linearGradient id="benchFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3530" />
          <stop offset="100%" stopColor="#0D1F1A" />
        </linearGradient>
        <linearGradient id="benchSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#152820" />
          <stop offset="100%" stopColor="#0A1812" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="160" cy="250" rx="130" ry="10" fill="rgba(0,0,0,.4)" />
      <rect x="68" y="200" width="12" height="48" rx="2" fill="#0A1510" />
      <rect x="240" y="200" width="12" height="48" rx="2" fill="#0A1510" />
      <rect x="100" y="215" width="10" height="33" rx="2" fill="#0A1510" />
      <rect x="210" y="215" width="10" height="33" rx="2" fill="#0A1510" />
      <polygon points="50,140 270,140 290,120 70,120" fill="url(#benchTop)" />
      <polygon points="50,140 270,140 270,205 50,205" fill="url(#benchFace)" />
      <polygon
        points="270,140 290,120 290,185 270,205"
        fill="url(#benchSide)"
      />
      <rect
        x="60"
        y="148"
        width="200"
        height="50"
        rx="3"
        fill="#0E2018"
        stroke="#1E3830"
        strokeWidth="1"
      />
      <rect x="70" y="154" width="50" height="30" rx="2" fill="#071510" />
      <rect
        x="72"
        y="156"
        width="46"
        height="26"
        rx="1"
        fill="#00BFA5"
        opacity=".85"
      />
      <text
        x="95"
        y="166"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="8"
        fill="#fff"
        fontWeight="700"
      >
        23.4°C
      </text>
      <text
        x="95"
        y="175"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="6"
        fill="rgba(255,255,255,.5)"
      >
        TEMP
      </text>
      <rect x="130" y="154" width="50" height="30" rx="2" fill="#071510" />
      <rect x="132" y="156" width="46" height="26" rx="1" fill="#001A14" />
      <text
        x="155"
        y="166"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="8"
        fill="#00BFA5"
        fontWeight="700"
      >
        4.000
      </text>
      <text
        x="155"
        y="175"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="6"
        fill="rgba(0,191,165,.5)"
      >
        mA LOOP
      </text>
      <circle
        cx="200"
        cy="164"
        r="7"
        fill="#0A1A14"
        stroke="#1E3830"
        strokeWidth="1"
      />
      <circle cx="200" cy="164" r="4" fill="#122018" />
      <line
        x1="200"
        y1="157"
        x2="200"
        y2="160"
        stroke="#4DD0C4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="218"
        cy="164"
        r="7"
        fill="#0A1A14"
        stroke="#1E3830"
        strokeWidth="1"
      />
      <circle cx="218" cy="164" r="4" fill="#122018" />
      <line
        x1="218"
        y1="157"
        x2="220"
        y2="159"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="236"
        cy="164"
        r="7"
        fill="#0A1A14"
        stroke="#1E3830"
        strokeWidth="1"
      />
      <circle cx="236" cy="164" r="4" fill="#122018" />
      <line
        x1="236"
        y1="157"
        x2="234"
        y2="159"
        stroke="#4DD0C4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="70"
        y="188"
        width="8"
        height="5"
        rx="1"
        fill="#4DD0C4"
        opacity=".7"
      />
      <rect
        x="82"
        y="188"
        width="8"
        height="5"
        rx="1"
        fill="#4DD0C4"
        opacity=".7"
      />
      <rect
        x="94"
        y="188"
        width="8"
        height="5"
        rx="1"
        fill="#F59E0B"
        opacity=".7"
      />
      <circle
        cx="248"
        cy="191"
        r="4"
        fill="#22C55E"
        filter="url(#glow)"
        opacity=".9"
      />
      <rect
        x="80"
        y="105"
        width="38"
        height="28"
        rx="3"
        fill="#1A2E26"
        stroke="#2D4A3E"
        strokeWidth="1"
      />
      <rect x="84" y="109" width="30" height="14" rx="1" fill="#071510" />
      <text
        x="99"
        y="119"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7"
        fill="#4DD0C4"
        fontWeight="700"
      >
        12.34V
      </text>
      <circle
        cx="185"
        cy="122"
        r="18"
        fill="#1A2E26"
        stroke="#2D4A3E"
        strokeWidth="1"
      />
      <circle cx="185" cy="122" r="13" fill="#071510" />
      <line
        x1="185"
        y1="111"
        x2="185"
        y2="114"
        stroke="#4DD0C4"
        strokeWidth="1"
        opacity=".6"
      />
      <line
        x1="194"
        y1="117"
        x2="192"
        y2="119"
        stroke="#4DD0C4"
        strokeWidth="1"
        opacity=".6"
      />
      <line
        x1="185"
        y1="122"
        x2="190"
        y2="115"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <circle cx="185" cy="122" r="2" fill="#4DD0C4" />
      <ellipse
        cx="160"
        cy="140"
        rx="90"
        ry="8"
        fill="rgba(0,191,165,.06)"
        filter="url(#softglow)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: WORKBENCH CONFIGURATOR
// Used in: Section 4 (Customize Workbench)
// Steps: 0=Intent, 1=BenchType, 2=Addons, 3=Contact, 4=Success
// ─────────────────────────────────────────────

function WorkbenchConfigurator() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    intent: null,
    benchType: null,
    addons: [],
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919742944306";

  // 4a. Intent options
  const intentOptions = [
    {
      val: "blank",
      icon: "🏗️",
      title: "Starting from scratch",
      desc: "Empty space or new lab. Need to figure out what we need.",
    },
    {
      val: "upgrade",
      icon: "🔄",
      title: "Upgrading existing setup",
      desc: "We have equipment but it's outdated or insufficient.",
    },
    {
      val: "specific",
      icon: "📋",
      title: "I have a specific requirement",
      desc: "I know what I need — just want to confirm TMCI can build it.",
    },
    {
      val: "comparing",
      icon: "⚖️",
      title: "Evaluating vendors",
      desc: "Comparing options before making a decision.",
    },
  ];

  // 4b. Bench type options
  const benchTypes = [
    {
      val: "calibration",
      icon: "🎛️",
      title: "Calibration bench",
      desc: "Temperature, pressure, loop, electronic signal calibration in-house.",
    },
    {
      val: "esd",
      icon: "⚡",
      title: "ESD workstation",
      desc: "Anti-static workspace for electronics assembly and sensitive device handling.",
    },
    {
      val: "pressure",
      icon: "🔵",
      title: "Pressure / pneumatic",
      desc: "High-pressure testing and pneumatic calibration for industrial process instruments.",
    },
    {
      val: "electronic",
      icon: "📡",
      title: "Electronic test bench",
      desc: "Signal testing, power supply rigs, oscilloscopes, DMMs — general electronics QA.",
    },
    {
      val: "gas",
      icon: "💨",
      title: "Gas analysis station",
      desc: "Toxic, combustible, O₂ or multi-gas monitoring for safety compliance.",
    },
    {
      val: "unsure",
      icon: "❓",
      title: "Not sure yet",
      desc: "Tell us your application — our engineers will suggest the right configuration.",
    },
  ];

  // 4c. Add-on options
  const addonOptions = [
    "Electronic signal module",
    "Temperature module",
    "Pressure module",
    "Loop calibrator",
    "DC Power supply",
    "Oscilloscope",
    "DMM",
    "PC workstation",
    "Overhead cabinet",
    "ESD grounding",
  ];

  function buildWhatsAppMessage() {
    return encodeURIComponent(
      [
        "🔧 *TMCI Workbench Enquiry*",
        "",
        `*Intent:* ${intentOptions.find((i) => i.val === selections.intent)?.title || "-"}`,
        `*Bench Type:* ${benchTypes.find((b) => b.val === selections.benchType)?.title || "-"}`,
        `*Add-ons:* ${selections.addons.length ? selections.addons.join(", ") : "None selected"}`,
        `*Name:* ${selections.name}`,
        `*Company:* ${selections.company}`,
        `*Email:* ${selections.email}`,
        `*Phone:* ${selections.phone}`,
        "",
        "Please contact me with a quote.",
      ].join("\n"),
    );
  }

  // 4d. Reusable card renderer for steps 0 and 1
  const OptionCard = ({ selected, onClick, icon, title, desc, iconColor }) => (
    <div
      onClick={onClick}
      style={{
        background: selected ? "var(--selected-bg)" : "var(--glass)",
        border: `1px solid ${selected ? "var(--selected-border)" : "var(--border-dark)"}`,
        borderRadius: 12,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1.5px solid ${selected ? "var(--primary-md)" : "var(--border-dark)"}`,
          background: selected ? "var(--primary-md)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected && (
          <span style={{ color: "#fff", fontSize: 9, fontWeight: 900 }}>✓</span>
        )}
      </div>
      <div
        style={{
          fontSize: 20,
          marginBottom: 10,
          color: iconColor || "inherit",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text-1)",
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.55 }}>
        {desc}
      </div>
    </div>
  );

  // 4e. Nav row (Back + Continue buttons)
  const NavRow = ({
    backFn,
    nextFn,
    nextDisabled,
    nextLabel = "Continue →",
  }) => (
    <div
      style={{
        display: "flex",
        justifyContent: backFn ? "space-between" : "flex-end",
        paddingTop: 20,
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {backFn && (
        <button
          onClick={backFn}
          style={{
            background: "none",
            border: "1px solid var(--border-dark)",
            color: "var(--text-2)",
            padding: "9px 18px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "var(--ff)",
            transition: "all 0.18s",
          }}
        >
          ← Back
        </button>
      )}
      <button
        disabled={nextDisabled}
        onClick={nextFn}
        style={{
          background: "var(--primary)",
          border: "none",
          color: "#fff",
          padding: "10px 24px",
          borderRadius: 8,
          cursor: nextDisabled ? "not-allowed" : "pointer",
          fontSize: 13.5,
          fontWeight: 700,
          fontFamily: "var(--ff)",
          opacity: nextDisabled ? 0.35 : 1,
          transition: "all 0.18s",
        }}
      >
        {nextLabel}
      </button>
    </div>
  );

  return (
    <div className="wb-root" style={{ maxWidth: 680, margin: "0 auto" }}>
      <div className="wb-glow" />
      <div className="wb-glow2" />
      <div
        style={{ position: "relative", zIndex: 2, padding: "32px 32px 28px" }}
      >
        {/* Progress bar */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 32,
            alignItems: "center",
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 3,
                flex: 1,
                borderRadius: 2,
                background:
                  i < step
                    ? "var(--primary-md)"
                    : i === step
                      ? "linear-gradient(90deg,var(--primary),var(--primary-lt))"
                      : "rgba(255,255,255,0.1)",
                transition: "background 0.4s",
              }}
            />
          ))}
          <span
            style={{
              fontSize: 11,
              color: "var(--text-3)",
              whiteSpace: "nowrap",
              marginLeft: 8,
            }}
          >
            Step {step + 1} of 4
          </span>
        </div>

        {/* Step 0 — Intent */}
        {step === 0 && (
          <div>
            <div className="overline">Let's start here</div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-1)",
                lineHeight: 1.25,
                letterSpacing: -0.4,
                marginBottom: 6,
              }}
            >
              What brings you to us today?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              We build every bench to specification — but first, help us
              understand where you're starting from.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {intentOptions.map((opt) => (
                <OptionCard
                  key={opt.val}
                  selected={selections.intent === opt.val}
                  onClick={() =>
                    setSelections((s) => ({ ...s, intent: opt.val }))
                  }
                  icon={opt.icon}
                  title={opt.title}
                  desc={opt.desc}
                />
              ))}
            </div>
            <NavRow
              nextFn={() => setStep(1)}
              nextDisabled={!selections.intent}
            />
          </div>
        )}

        {/* Step 1 — Bench type */}
        {step === 1 && (
          <div>
            <div className="overline">What you're working on</div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-1)",
                lineHeight: 1.25,
                letterSpacing: -0.4,
                marginBottom: 6,
              }}
            >
              What kind of bench are you building?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Select the type that best fits your application.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {benchTypes.map((opt) => (
                <OptionCard
                  key={opt.val}
                  selected={selections.benchType === opt.val}
                  onClick={() =>
                    setSelections((s) => ({ ...s, benchType: opt.val }))
                  }
                  icon={opt.icon}
                  iconColor="var(--primary-lt)"
                  title={opt.title}
                  desc={opt.desc}
                />
              ))}
            </div>
            <NavRow
              backFn={() => setStep(0)}
              nextFn={() => setStep(2)}
              nextDisabled={!selections.benchType}
            />
          </div>
        )}

        {/* Step 2 — Add-ons */}
        {step === 2 && (
          <div>
            <div className="overline">Configuration</div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-1)",
                lineHeight: 1.25,
                letterSpacing: -0.4,
                marginBottom: 6,
              }}
            >
              Which modules do you need?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Select all that apply. Don't worry if you're unsure — we'll work
              it out together.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {addonOptions.map((addon) => (
                <div
                  key={addon}
                  onClick={() =>
                    setSelections((s) => ({
                      ...s,
                      addons: s.addons.includes(addon)
                        ? s.addons.filter((a) => a !== addon)
                        : [...s.addons, addon],
                    }))
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    border: `1px solid ${selections.addons.includes(addon) ? "var(--selected-border)" : "var(--border-dark)"}`,
                    borderRadius: 20,
                    cursor: "pointer",
                    fontSize: 12.5,
                    color: selections.addons.includes(addon)
                      ? "var(--primary-lt)"
                      : "var(--text-2)",
                    background: selections.addons.includes(addon)
                      ? "var(--selected-bg)"
                      : "var(--glass)",
                    transition: "all 0.18s",
                    userSelect: "none",
                  }}
                >
                  {selections.addons.includes(addon) && (
                    <span style={{ fontSize: 10 }}>✓</span>
                  )}
                  {addon}
                </div>
              ))}
            </div>
            <NavRow backFn={() => setStep(1)} nextFn={() => setStep(3)} />
          </div>
        )}

        {/* Step 3 — Contact */}
        {step === 3 && (
          <div>
            <div className="overline">Almost there</div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-1)",
                lineHeight: 1.25,
                letterSpacing: -0.4,
                marginBottom: 6,
              }}
            >
              Where should we send the quote?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Our engineers will review your requirements and get back within 24
              hours.
            </p>
            <div
              style={{
                background: "rgba(201,152,58,0.08)",
                border: "1px solid rgba(201,152,58,0.22)",
                borderRadius: 8,
                padding: "14px 16px",
                marginBottom: 20,
                display: "flex",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18, color: "#F0C060" }}>⚡</span>
              <div
                style={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.65,
                }}
              >
                <strong style={{ color: "#F0C060" }}>
                  We respond within 24 hours.
                </strong>{" "}
                For urgent requirements, use the WhatsApp option after
                submitting.
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              {[
                ["name", "Your Name", "text"],
                ["company", "Company / Organisation", "text"],
                ["email", "Email Address", "email"],
                ["phone", "Phone Number", "tel"],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-3)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={selections[key]}
                    onChange={(e) =>
                      setSelections((s) => ({ ...s, [key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-dark)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "var(--text-1)",
                      fontFamily: "var(--ff)",
                      outline: "none",
                    }}
                    placeholder={label}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => setStep(2)}
                style={{
                  background: "none",
                  border: "1px solid var(--border-dark)",
                  color: "var(--text-2)",
                  padding: "9px 18px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "var(--ff)",
                }}
              >
                ← Back
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href={`https://wa.me/${waNumber}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(37,211,102,0.12)",
                    border: "1px solid rgba(37,211,102,0.3)",
                    color: "rgba(37,211,102,0.9)",
                    padding: "10px 18px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "var(--ff)",
                    textDecoration: "none",
                  }}
                >
                  💬 WhatsApp
                </a>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selections.name || !selections.email}
                  style={{
                    background: "var(--cta)",
                    border: "none",
                    color: "#fff",
                    padding: "10px 24px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 13.5,
                    fontWeight: 700,
                    fontFamily: "var(--ff)",
                    opacity: selections.name && selections.email ? 1 : 0.4,
                  }}
                >
                  Send Enquiry →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Success */}
        {step === 4 && (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,191,165,0.12)",
                border: "2px solid var(--primary-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-1)",
                marginBottom: 6,
              }}
            >
              Enquiry received, {selections.name.split(" ")[0]}!
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                lineHeight: 1.7,
                maxWidth: 380,
                margin: "0 auto 28px",
              }}
            >
              Our engineers will review your configuration and reach out within
              24 hours with a detailed quote.
            </p>
            <a
              href={`https://wa.me/${waNumber}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.3)",
                color: "rgba(37,211,102,0.9)",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--ff)",
                textDecoration: "none",
              }}
            >
              💬 Also send on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────

export default function Home() {
  const [sections, setSections] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919742944306";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const cachedSections = cacheGet("home_sections");
    const cachedFaqs = cacheGet("faqs");
    if (cachedSections) setSections(cachedSections);
    if (cachedFaqs) setFaqs(cachedFaqs);
    if (cachedSections && cachedFaqs) return;
    const [{ data: sectionsData }, { data: faqsData }] = await Promise.all([
      supabase.from("site_sections").select("*"),
      supabase.from("faqs").select("*").order("sort_order"),
    ]);
    const map = {};
    sectionsData?.forEach((s) => {
      map[s.id] = s;
    });
    setSections(map);
    setFaqs(faqsData || []);
    cacheSet("home_sections", map);
    cacheSet("faqs", faqsData || []);
  }

  return (
    <>
      {/* ════════════════════════════════════════
          SECTION 1 — HERO
          1a. Background (grid + glow orbs)
          1b. Left column (eyebrow, headline, subheadline, CTAs, stats)
          1c. Right column (bench product image)
          1d. Bottom bar (client mentions)
          1e. Animations (tmci-blink keyframe)
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "#060F0D",
          fontFamily: "'DM Sans', sans-serif",
          overflow: "hidden",
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 1a. Background layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,191,140,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,140,0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(0,191,140,0.13) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: 200,
            width: 380,
            height: 380,
            background:
              "radial-gradient(ellipse, rgba(0,140,191,0.07) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        {/* Hero grid — 1b (left) + 1c (right) */}
        {/* ↓ CHANGE 1: added className="tmci-hero-grid" */}
        <div
          className="tmci-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 700px",
            flex: 1,
            position: "relative",
            zIndex: 2,
            height: "calc(100vh - 52px)",
          }}
        >
          {/* 1b. Left column */}
          {/* ↓ CHANGE 2: added className="tmci-hero-left" */}
          <div
            className="tmci-hero-left"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "100px 56px 56px 64px",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--primary-md)",
                  animation: "tmci-blink 2.2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--primary-md)",
                }}
              >
                Manufacturer & Exporter
              </span>
              <div
                style={{
                  width: 1,
                  height: 12,
                  background: "rgba(0,191,140,0.3)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--primary-md)",
                }}
              >
                Bengaluru · Est. 2012
              </span>
            </div>

            {/* Headline — edit text here */}
            <SectionRenderer
              section={null}
              fallback={
                <h1
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    fontSize: "clamp(32px, 3.8vw, 48px)",
                    lineHeight: 1.08,
                    color: "#ffffff",
                    margin: "0 0 8px 0",
                    display: "block",
                  }}
                >
                  Your workspace
                  <br />
                  should be something
                  <br />
                  you're{" "}
                  <span style={{ color: "var(--primary-md)" }}>
                    proud to show.
                  </span>
                </h1>
              }
            />

            {/* Rule */}
            <div
              style={{
                width: 40,
                height: 2,
                background: "var(--primary)",
                opacity: 0.5,
                borderRadius: 2,
                margin: "24px 0",
              }}
            />

            {/* Subheadline — edit text here */}
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.72,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 440,
                margin: "0 0 40px 0",
              }}
            >
              TMCI modernizes industrial labs with custom calibration benches,
              ESD workstations and test systems.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 52,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--cta)",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "13px 26px",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "background 0.18s, transform 0.18s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "var(--cta-hover)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "var(--cta)";
                  e.currentTarget.style.transform = "";
                }}
              >
                See Our Products &nbsp;→
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello! I want to talk to an engineer about a custom bench.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "12px 22px",
                  borderRadius: 8,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.14)",
                  transition: "all 0.18s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Talk to an Engineer
              </a>
            </div>

            {/* Stats row — edit values here */}
            {/* ↓ CHANGE 5: added className="tmci-stats-row" */}
            <div
              className="tmci-stats-row"
              style={{
                display: "flex",
                gap: 0,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: 28,
              }}
            >
              {[
                ["13", "+", "Years Manufacturing"],
                ["11", "+", "Industry Sectors"],
                ["100", "%", "Custom Built"],
                ["↗", "INT", "Ships Internationally"],
              ].map(([val, sup, label], i, arr) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    paddingRight: i < arr.length - 1 ? 16 : 0,
                    borderRight:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "none",
                    marginRight: i < arr.length - 1 ? 16 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "#fff",
                      letterSpacing: "0px",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {val}
                    <span style={{ color: "var(--primary-md)" }}>{sup}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.38)",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1c. Right column — product image
              TO CHANGE IMAGE: update the backgroundImage URL below
              TO ADJUST POSITION: change backgroundPosition (e.g. "75% 30%")
              TO ADJUST SIZE: change backgroundSize (e.g. "160%")
          */}
          {/* ↓ CHANGE 3: added className="tmci-hero-right" */}
          <div
            className="tmci-hero-right"
            style={{
              position: "relative",
              overflow: "hidden",
              backgroundImage: `url(https://res.cloudinary.com/dkhmnkxzo/image/upload/v1778324996/hero-bench_oq3kb0.png)`,
              backgroundSize: "150%",
              backgroundPosition: "75% 40%",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "lighten",
              filter: "brightness(1.4) saturate(1.1) contrast(1.05)",
            }}
          >
            {/* Left fade — blends image into dark bg */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: "linear-gradient(90deg, #060F0D 40%, transparent)",
                zIndex: 3,
              }}
            />
            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                background: "linear-gradient(transparent, #060F0D)",
                zIndex: 3,
              }}
            />
          </div>
        </div>

        {/* 1d. Bottom bar — client mentions
            TO ADD/REMOVE CLIENTS: edit the spans below
        */}
        {/* ↓ CHANGE 4: added className="tmci-hero-bottom" */}
        <div
          className="tmci-hero-bottom"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "14px 64px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            position: "relative",
            zIndex: 3,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.02em",
              fontWeight: 400,
            }}
          >
            Supplied to{" "}
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              Indian Navy
            </span>
            {" · "}
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              ISRO
            </span>
            {" · "}
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              BPCL
            </span>
            {" · "}
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              NTPC
            </span>
            {" · "}
            <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              Tata Steel
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>
              and more, across India and internationally
            </span>
          </div>
        </div>

        {/* 1e. Animations */}
        <style>{`@keyframes tmci-blink { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.3; transform:scale(1.6); } }`}</style>
      </div>

      {/* ════════════════════════════════════════
          SECTION 2 — TICKER
          Edit ticker items array to change text
      ════════════════════════════════════════ */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[
            "Calibration Test Benches · Made in Bengaluru",
            "Supplied to ISRO · NTPC · BPCL · Tata Steel · Siemens",
            "ISO 9001:2015 Certified · CE · ROHS · BIFMA",
            "ESD Workstations · Pressure Benches · Gas Analyzers",
            "13+ Years · 11+ Industries · Ships Internationally",
            "Authorized Dealer — Fluke & Karogic",
            "Calibration Test Benches · Made in Bengaluru",
            "Supplied to ISRO · NTPC · BPCL · Tata Steel · Siemens",
            "ISO 9001:2015 Certified · CE · ROHS · BIFMA",
            "ESD Workstations · Pressure Benches · Gas Analyzers",
            "13+ Years · 11+ Industries · Ships Internationally",
            "Authorized Dealer — Fluke & Karogic",
          ].map((t, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-dot" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 3 — WHAT WE MAKE (Products)
          3a. Section header
          3b. Product mosaic grid (6 tiles)
          3c. IMAGE PLACEHOLDER — add product photos here
          TO ADD IMAGES: add a cloudinary URL to each tile
      ════════════════════════════════════════ */}
      <div id="products" style={{ background: "var(--white)" }}>
        <div className="sec">
          <SectionRenderer
            section={sections.products}
            fallback={
              <>
                {/* 3a. Header */}
                <div className="sec-hd">
                  <div className="overline">What We Make</div>
                  <h2>
                    Custom instrumentation for every industrial application
                  </h2>
                  <p>
                    Every TMCI product is engineered from scratch — no generic
                    solutions. Material, size, modules, power source and layout
                    are all configured to your exact requirements.
                  </p>
                </div>

                {/* 3b. Product tiles
                  TO REORDER: move objects in the array
                  TO EDIT: change title, desc, tag values
              */}
                <div className="product-mosaic">
                  {[
                    {
                      accent: true,
                      title: "Calibration Test Benches & Systems",
                      desc: "Temperature, pressure, electrical and electronic calibration benches. Modular consoles with ergonomic workspaces for on-site and lab calibration. Our flagship product.",
                      tag: "Core product · Most ordered",
                      /* 3c. IMAGE: add imageUrl: "https://..." to show product photo */
                    },
                    {
                      title: "ESD Workstations & Tables",
                      desc: "Electrostatic discharge-safe modular workstations in aluminium or mild steel. Essential for electronics assembly, sensitive device handling, and ESD-controlled environments.",
                      tag: "₹1,00,000 onwards",
                    },
                    {
                      title: "Pneumatic & Pressure Test Benches",
                      desc: "SS-grade pressure calibration systems. Customisable signal, temperature, loop, and pressure modules for demanding industrial applications.",
                      tag: "Custom config",
                    },
                    {
                      title: "Test & Measurement Instruments",
                      desc: "Analytical test instruments, portable calibrators, power packs, DMMs, oscilloscopes, and digital stopwatches for precision measurement at bench or field.",
                      tag: "Full range",
                    },
                    {
                      title: "Gas Analyzers & Monitors",
                      desc: "Process and portable gas analysis for safety, compliance, and quality monitoring. Covers toxic gas, O₂, combustible, and multi-gas configurations.",
                      tag: "Safety critical",
                    },
                    {
                      title: "Predictive Maintenance Systems",
                      desc: "Condition monitoring solutions to detect equipment degradation before failures occur — reducing unplanned downtime and repair costs.",
                      tag: "Reduce downtime",
                    },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className={`pm-tile${p.accent ? " accent" : ""}`}
                    >
                      {/* Product image placeholder — uncomment when image URL is available */}
                      {/* {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6, marginBottom: 12 }} />} */}
                      <div className="pm-title">{p.title}</div>
                      <div className="pm-desc">{p.desc}</div>
                      <div className="pm-tag">{p.tag}</div>
                      <div className="pm-arrow">↗</div>
                    </div>
                  ))}
                </div>
              </>
            }
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 4 — WHY OUR PRODUCTS
          4a. Left — benefits text
          4b. Right — IMAGE PLACEHOLDER (add product photo)
          Content from catalogue "Why Test Bench" page
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--surface)" }}>
        <div className="sec" style={{ maxWidth: 1200 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* 4a. Benefits */}
            <div>
              <div className="overline">Why Our Products</div>
              <h2
                style={{
                  fontSize: "clamp(22px,2.8vw,34px)",
                  fontWeight: 800,
                  letterSpacing: -1,
                  lineHeight: 1.18,
                  color: "var(--ink)",
                  marginBottom: 14,
                }}
              >
                Integration. Efficiency. Space Optimisation.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--mid)",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                A properly built test bench does more than hold instruments — it
                transforms how your lab operates. Centralising your instruments
                into a single, configured platform minimises variability,
                enhances repeatability, and ensures seamless workflows.
              </p>
              {/* Benefits list — edit items here */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {[
                  [
                    "Space optimisation",
                    "Compact, modular systems consolidate multiple instruments — reducing clutter and improving organisation across your lab floor.",
                  ],
                  [
                    "Safety built in",
                    "Emergency stops, overload protection, ESD safeguards and ergonomic layouts ensure secure, comfortable operation even in high-stakes testing.",
                  ],
                  [
                    "Automation ready",
                    "Modern test benches support software integration for real-time data acquisition, automated testing, and compliance with industry standards like ISO/IEC 17025.",
                  ],
                  [
                    "Fully modular",
                    "Accommodates customisation at any stage — add modules, swap instruments, reconfigure layout as your requirements evolve.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "var(--primary-pale-solid)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 900,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      ✓
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "var(--mid)",
                        lineHeight: 1.6,
                      }}
                    >
                      <strong style={{ color: "var(--ink)", fontWeight: 700 }}>
                        {title}.{" "}
                      </strong>
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4b. IMAGE PLACEHOLDER
                Replace the div below with an <img> tag when product photo is ready
                Suggested: a clean shot of the calibration bench from the catalogue page 3
                Upload to Cloudinary first, then use:
                <img src="YOUR_CLOUDINARY_URL" alt="TMCI Calibration Test Bench" style={{ width: "100%", borderRadius: 12, boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }} />
            */}
            <div
              style={{
                background: "var(--ink2)",
                borderRadius: 14,
                aspectRatio: "4/3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,137,123,0.25) 0%, transparent 70%)",
                  bottom: -80,
                  right: -60,
                  pointerEvents: "none",
                }}
              />
              {/* Placeholder content — remove when image is added */}
              <div
                style={{
                  textAlign: "center",
                  color: "rgba(255,255,255,0.2)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  PRODUCT PHOTO
                  <br />
                  Add from Cloudinary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 5 — IS THIS FOR YOU?
          5a. Section header
          5b. Scenario checklist (self-identification)
          5c. Right side — quick facts card
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--white)" }}>
        <div className="sec" style={{ maxWidth: 1200 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* 5a + 5b. Left — who this is for */}
            <div>
              <div className="overline">Is This For You?</div>
              <h2
                style={{
                  fontSize: "clamp(22px,2.8vw,34px)",
                  fontWeight: 800,
                  letterSpacing: -1,
                  lineHeight: 1.18,
                  color: "var(--ink)",
                  marginBottom: 14,
                }}
              >
                You might need a TMCI bench if...
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--mid)",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                Whether you're setting up a new lab from scratch or replacing an
                improvised setup — TMCI builds the bench that fits your exact
                process.
              </p>
              {/* 5b. Scenario checklist — edit scenarios here */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  "You're setting up a new calibration or test lab",
                  "Your instruments go out for calibration every month to a third-party lab",
                  "Your team works on benches assembled from multiple vendors with no unified workspace",
                  "You need an NABL-ready, audit-compliant workstation",
                  "You're an OEM or systems integrator needing integrated test solutions",
                  "Your current bench doesn't meet ESD, safety or ergonomic standards",
                  "You want to bring calibration capability fully in-house",
                ].map((scenario) => (
                  <div
                    key={scenario}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      padding: "12px 16px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "var(--primary-pale-solid)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 900,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "var(--mid)",
                        lineHeight: 1.5,
                      }}
                    >
                      {scenario}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5c. Right — quick facts + CTA */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingTop: 8,
              }}
            >
              {/* Fact cards — edit facts here */}
              {[
                {
                  icon: "🏭",
                  label: "Manufacturer",
                  value:
                    "Direct from our Bengaluru facility — no middlemen, no resellers.",
                },
                {
                  icon: "🔧",
                  label: "100% Custom",
                  value:
                    "Every bench is built to your specification. No off-the-shelf compromise.",
                },
                {
                  icon: "🌏",
                  label: "Ships Internationally",
                  value:
                    "Delivered across India and to international locations including Saudi Arabia and South Africa.",
                },
                {
                  icon: "📋",
                  label: "ISO 9001:2015",
                  value:
                    "Quality management certified. CE, ROHS, BIFMA, ANSI-ESD and more.",
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "16px 18px",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    background: "var(--white)",
                  }}
                >
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--primary)",
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--mid)",
                        lineHeight: 1.6,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
              {/* CTA inside section */}
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello! I want to discuss a requirement for a test bench.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "13px 24px",
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
                Talk to an Engineer →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 6 — WHY TMCI
          6a. Left — checklist (manufacturer advantages)
          6b. Right — bench SVG illustration
          (replace SVG with real image when available)
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--surface)" }}>
        <div className="sec" style={{ maxWidth: 1200 }}>
          <SectionRenderer
            section={sections.why}
            fallback={
              <div className="solution-grid">
                {/* 6a. Left — why TMCI */}
                <div>
                  <div className="overline">Why TMCI</div>
                  <h2
                    style={{
                      fontSize: "clamp(22px,2.8vw,34px)",
                      fontWeight: 800,
                      letterSpacing: -1,
                      lineHeight: 1.18,
                      color: "var(--ink)",
                      marginBottom: 14,
                    }}
                  >
                    When precision matters, generic solutions aren't good
                    enough.
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--mid)",
                      lineHeight: 1.8,
                      marginBottom: 24,
                    }}
                  >
                    Off-the-shelf instruments rarely meet the exact signal,
                    pressure, temperature, or safety requirements of your
                    process. TMCI's engineers work directly with you to design
                    and build instruments configured precisely to your
                    operation.
                  </p>
                  {/* 6a. Checklist — edit items here */}
                  <div className="checklist">
                    {[
                      [
                        "Fully customised to your spec.",
                        "Material, size, display type, power source — all configurable.",
                      ],
                      [
                        "Direct from the manufacturer.",
                        "No middlemen — faster delivery, better pricing, direct support.",
                      ],
                      [
                        "Cross-industry expertise.",
                        "From Defence to Food Processing — we understand your compliance needs.",
                      ],
                      [
                        "Manufacturer + Exporter + Supplier.",
                        "Full supply chain capability in one partner. Ships internationally.",
                      ],
                      [
                        "Installation & AMC services.",
                        "We stay with you after delivery — annual maintenance contracts and site support available.",
                      ],
                    ].map(([title, desc]) => (
                      <div key={title} className="ch-item">
                        <div className="ch-ic">✓</div>
                        <div className="ch-tx">
                          <strong>{title}</strong> {desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6b. Right — illustration
                  REPLACE with real photo:
                  <img src="YOUR_URL" alt="TMCI bench" style={{ width: "100%", borderRadius: 12 }} />
              */}
                <div className="bench-3d-wrap">
                  <div className="bench-glow-inner" />
                  <BenchSVG />
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 7 — WHO WE SERVE (Industries)
          7a. Section header
          7b. Industry grid (8 sectors)
          TO ADD/REMOVE: edit the array below
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--white)" }}>
        <div className="sec" style={{ maxWidth: 1200 }}>
          <div className="sec-hd ctr">
            <div className="overline">Who We Serve</div>
            <h2>Built for India's most demanding industrial sectors</h2>
            <p>
              Our solutions meet the rigorous standards of safety, precision,
              and reliability required across 11+ sectors.
            </p>
          </div>
          {/* 7b. Industry grid — edit sectors here */}
          <div className="ind-grid">
            {[
              [
                "🛡️",
                "Defence & Aerospace",
                "Mission-critical instrumentation for precision applications",
              ],
              [
                "⛽",
                "Oil, Gas & Petrochemical",
                "Reliable testing for high-pressure, hazardous environments",
              ],
              [
                "⚡",
                "Power Generation",
                "Conventional and renewable energy testing solutions",
              ],
              [
                "🚢",
                "Shipbuilding & Marine",
                "Naval and commercial marine instrumentation",
              ],
              [
                "💊",
                "Pharma & Biotech",
                "Compliance-driven testing and lab automation",
              ],
              [
                "🚗",
                "Automotive & EV",
                "Quality and safety testing for next-gen mobility",
              ],
              [
                "🍞",
                "Food Processing",
                "Compliance and hygiene-grade testing solutions",
              ],
              [
                "🎓",
                "Education & R&D Labs",
                "Trainer kits and lab instruments for institutions",
              ],
            ].map(([icon, name, sub]) => (
              <div key={name} className="ind-card">
                <div className="ind-ic">{icon}</div>
                <div className="ind-name">{name}</div>
                <div className="ind-sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS
          8a. Section header
          8b. Certification badges grid
          TO ADD: add to the certs array below
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--surface)", padding: "56px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="overline">Certifications & Compliance</div>
            <h2
              style={{
                fontSize: "clamp(20px,2.5vw,30px)",
                fontWeight: 800,
                letterSpacing: -1,
                color: "var(--ink)",
              }}
            >
              Built to international standards
            </h2>
          </div>
          {/* 8b. Cert grid — edit certifications here */}
          {/* ↓ CHANGE 6: added className="tmci-certs-grid" */}
          <div
            className="tmci-certs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {[
              { name: "ISO 9001:2015", desc: "Quality Management" },
              { name: "ISO 14001:2015", desc: "Environmental Management" },
              { name: "ISO 45001:2018", desc: "Occupational Health & Safety" },
              { name: "CE Certified", desc: "European Conformity" },
              { name: "ROHS", desc: "Restriction of Hazardous Substances" },
              { name: "BIFMA", desc: "Furniture & Safety Standards" },
              { name: "ANSI-ESD S20.20", desc: "Electrostatic Discharge" },
              { name: "IEC 61340-5-1", desc: "ESD Protection" },
              { name: "Make in India", desc: "Manufactured in Bengaluru" },
              {
                name: "MSME Registered",
                desc: "Micro, Small & Medium Enterprise",
              },
            ].map(({ name, desc }) => (
              <div
                key={name}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "16px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: "var(--muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 9 — AUTHORIZED DEALER & BRANDS
          9a. Authorized dealer strip
          9b. Brands we work with
          TO ADD BRANDS: edit the arrays below
      ════════════════════════════════════════ */}
      <div className="brands-band">
        <div className="bb-lbl">Authorized Dealer & Brands We Work With</div>
        <div className="bb-logos">
          {/* 9a. Authorized dealer highlighted */}
          {[
            "Fluke ★ Authorized Dealer",
            "Karogic ★ Authorized Dealer",
            "Yokogawa",
            "Endress+Hauser",
            "Beamex",
            "WIKA",
          ].map((b) => (
            <div key={b} className="bb-logo">
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 10 — SOCIAL PROOF
          10a. Stats row
          10b. Testimonials grid (3 cards)
          TO EDIT: change quotes, authors, locations below
      ════════════════════════════════════════ */}
      <div className="proof-band">
        <div className="proof-inner">
          <div className="proof-overline">Trusted by Industry</div>
          {/* 10a. Stats — edit values here */}
          <div className="proof-stats">
            {[
              ["13+", "Years manufacturing"],
              ["11+", "Industries served"],
              ["INT'L", "Exported to Saudi Arabia & more"],
              ["100%", "Custom-configured"],
            ].map(([v, l]) => (
              <div key={l} className="ps-item">
                <div className="ps-val">{v}</div>
                <div className="ps-lbl">{l}</div>
              </div>
            ))}
          </div>
          {/* 10b. Testimonials — edit quotes here */}
          <div className="proof-grid">
            {[
              [
                '"The calibration test bench was delivered exactly to our specifications. Excellent build quality and the team was responsive throughout the process."',
                "Nitin Williams",
                "Kerala · May 2019",
              ],
              [
                '"We needed a pressure test bench that could handle our specific marine application. TMCI engineered exactly what we needed — no compromises."',
                "Marine Engineering Facility",
                "Kochi · 2022",
              ],
              [
                '"Our Oil & Gas team uses the TMCI bench daily. The modular setup has transformed our calibration workflow."',
                "Process Instrumentation Lead",
                "Refinery, Gujarat · 2023",
              ],
            ].map(([quote, author, loc], i) => (
              <div key={i} className="proof-card">
                <div className="proof-stars">★★★★★</div>
                <div className="proof-quote">"{quote}"</div>
                <div className="proof-author">
                  {author} <span>· {loc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 11 — CUSTOMIZE WORKBENCH
          Configurator component (4-step form)
          See WorkbenchConfigurator component above
      ════════════════════════════════════════ */}
      <section
        id="workbench"
        style={{ background: "var(--ink)", padding: "72px 40px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="overline" style={{ color: "var(--primary-lt)" }}>
              Configurator
            </div>
            <h2
              style={{
                fontSize: "clamp(22px,3vw,36px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: -1,
                lineHeight: 1.13,
                marginBottom: 10,
              }}
            >
              Customize Your Workbench
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Tell us your requirements — our engineers will design exactly what
              you need.
            </p>
          </div>
          <WorkbenchConfigurator />
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 12 — FAQ
          Loaded from Supabase (admin managed)
          Add FAQs via admin panel → FAQ Manager
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--white)", padding: "72px 40px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="sec-hd ctr" style={{ marginBottom: 40 }}>
            <div className="overline">Got Questions?</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <div
                key={faq.id}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: "var(--ink)",
                      fontSize: 14,
                      paddingRight: 16,
                    }}
                  >
                    {faq.question}
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
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 20px 16px",
                      fontSize: 13.5,
                      color: "var(--mid)",
                      lineHeight: 1.7,
                      borderTop: "1px solid var(--border)",
                      paddingTop: 14,
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 13 — BLOG PREVIEW
          Shows 3 latest articles
          Actual blogs loaded from /blogs page
      ════════════════════════════════════════ */}
      <div className="sec-alt" style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 32,
            }}
          >
            <div>
              <div className="overline">Knowledge Hub</div>
              <h2
                style={{
                  fontSize: "clamp(22px,3vw,36px)",
                  fontWeight: 800,
                  letterSpacing: -1,
                  color: "var(--ink)",
                  lineHeight: 1.13,
                }}
              >
                Latest from TMCI
              </h2>
            </div>
            <Link
              href="/blogs"
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              View all articles →
            </Link>
          </div>
          <div className="news-grid">
            <div className="nc lg">
              <div
                className="nc-img"
                style={{
                  background: "linear-gradient(135deg,#081520,#0C2E28)",
                }}
              >
                <BenchSVG />
              </div>
              <div className="nc-body">
                <div className="nc-tag">Product Spotlight</div>
                <div className="nc-title">
                  How our Calibration Test Bench is used by Oil & Gas testing
                  facilities
                </div>
                <div className="nc-desc">
                  The TMCI team works closely with each customer to define exact
                  end-user requirements. Modules cover electronic signal,
                  temperature, loop, and pressure applications.
                </div>
                <div className="nc-meta">📅 2024 · Product Overview</div>
              </div>
            </div>
            {[
              {
                tag: "Export",
                title:
                  "TMCI ships calibration systems internationally — including Saudi Arabia",
                date: "2023",
                icon: "🌍",
              },
              {
                tag: "New Product",
                title:
                  "Trainer kits and lab workstations now available for educational institutions",
                date: "2024",
                icon: "🎓",
              },
            ].map((n) => (
              <div key={n.tag} className="nc">
                <div
                  className="nc-img"
                  style={{
                    background: "linear-gradient(135deg,#1C2B38,#0F3040)",
                    fontSize: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {n.icon}
                </div>
                <div className="nc-body">
                  <div className="nc-tag">{n.tag}</div>
                  <div className="nc-title">{n.title}</div>
                  <div className="nc-meta">📅 {n.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 14 — CTA BANNER
          Final conversion section
          Edit headline, body, button text below
      ════════════════════════════════════════ */}
      <div className="cta-banner">
        <div className="cta-inner">
          <div>
            <h2>Need a custom calibration or test solution?</h2>
            <p>
              Tell us your requirement and our engineers will design a system
              built precisely to your specification — at a competitive price,
              delivered on time.
            </p>
          </div>
          <div className="cta-btns">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello! I want to request a quote for a custom calibration/test bench.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cw"
            >
              Request a Quote →
            </a>
            <a href="tel:+919742944306" className="btn-co">
              Call +91 97429 44306
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
