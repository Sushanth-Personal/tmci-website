"use client";
import React, { useState, useEffect } from "react";
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
// COMPONENT: WHAT WE MAKE — PRODUCT CATEGORIES
// Place this above the Home() export, below BenchSVG
// ─────────────────────────────────────────────

const PRODUCT_CATEGORIES = [
  {
    id: "calibration",
    icon: "🎛️",
    label: "Calibration Benches",
    headline: "Calibration Bench Systems",
    tagline:
      "Our flagship product line — built for in-house calibration of every parameter",
    accent: true,
    products: [
      {
        name: "Electrical & Electronics Calibration Test Bench",
        desc: "Modular ergonomic platform for precise testing, calibration, and maintenance of electrical and electronic equipment. Integrates multimeters, oscilloscopes, LCR meters, and power analyzers.",
        tag: "Most ordered",
      },
      {
        name: "Temperature Calibration Test Bench",
        desc: "Specialized platform for accurate calibration of temperature instruments — sensors, transmitters, and controllers. Equipped with dry block calibrators, liquid baths, and reference thermometers.",
        tag: "ISO/IEC 17025 ready",
      },
      {
        name: "Pressure & Pneumatic Calibration Test Bench",
        desc: "Advanced modular solution for calibration and testing of pressure devices used in oil & gas, manufacturing, and power sectors. Features pressure controllers, digital gauges, and pneumatic pumps.",
        tag: "SS grade",
      },
      {
        name: "Mobile Testing & Calibration Van",
        desc: "Compact, fully equipped mobile lab for on-site calibration across industrial locations. Outfitted with multifunction testers, calibrators, and portable analyzers for high-precision field operations.",
        tag: "Field deployment",
      },
      {
        name: "Instruments & Calibration Rack",
        desc: "Modular system for organized housing, management, and operation of calibration and testing instruments. Adjustable racks, power distribution units, and cooling systems.",
        tag: "Custom config",
      },
    ],
  },
  {
    id: "testbench",
    icon: "🔬",
    label: "Test Bench Systems",
    headline: "Test Bench Systems",
    tagline:
      "Purpose-built test systems for motors, drives, EVs, relays and electronics",
    products: [
      {
        name: "Electrical & Electronics Test Bench",
        desc: "Modular ergonomic platform for testing, calibration, and maintenance of electrical and electronic equipment. Precision tools include multimeters, oscilloscopes, power analyzers, and signal generators.",
        tag: "R&D · Manufacturing · Training",
      },
      {
        name: "Motor & Drive Test Bench",
        desc: "Advanced modular system for testing, calibration, and evaluation of motors and drive systems — AC, DC, servo, and stepper motors. Integrated with dynamometers, VFDs, and torque transducers.",
        tag: "Automation ready",
      },
      {
        name: "Electric Vehicle (EV) Test Bench",
        desc: "Specialized modular platform for testing EV components and systems — motors, inverters, BMS, and power electronics. Features motor dynamometers, battery simulators, and regenerative power supplies.",
        tag: "EV · R&D",
      },
      {
        name: "Relay & PLC Test Bench",
        desc: "Configurable test system for testing, calibration, and maintenance of protective relays and PLC systems. Advanced relay test sets, multimeters, and insulation testers for power plants and substations.",
        tag: "Power · Substation",
      },
    ],
  },
  {
    id: "esd",
    icon: "⚡",
    label: "ESD Workstations",
    headline: "ESD Table Systems",
    tagline:
      "Static-controlled workspaces for electronics assembly and sensitive device handling",
    products: [
      {
        name: "ESD Tables & Benches",
        desc: "Contamination-free, static-controlled environment for precision tasks — PCB assembly, semiconductor handling, and testing. ESD-safe flooring, mats, grounding systems, and ionizing blowers.",
        tag: "ANSI-ESD S20.20",
      },
      {
        name: "ESD Clean Room & Accessories",
        desc: "Modular workstations for safe handling of sensitive electronic components. Built with aluminium or mild steel frames, ESD-safe laminations, anti-static surfaces, and adjustable ergonomic layouts.",
        tag: "IEC 61340 compliant",
      },
      {
        name: "ESD Workstation — Full Configuration",
        desc: "Complete ESD workstation with 230V/415V power, RCCB, MCCB, VAF meter, banana sockets, AC/DC power supplies, signal generators, oscilloscopes, and optional PC and printer.",
        tag: "Full fit-out",
      },
    ],
  },
  {
    id: "lab",
    icon: "🧪",
    label: "Laboratory Tables",
    headline: "Laboratory Tables & Benches",
    tagline:
      "Durable, ergonomic, customizable workspaces for research, education, and industrial labs",
    products: [
      {
        name: "Laboratory Work Tables",
        desc: "Built with mild steel frames and chemical-resistant surfaces. Adjustable heights, ample storage, and optional accessories including lighting and cable management. Clean room-compatible designs.",
        tag: "Education · R&D · Industrial",
      },
      {
        name: "Heavy Duty Industrial Bench",
        desc: "Robust industrial benches designed for demanding environments. Heavy-gauge steel construction with customizable surface materials, load ratings, and integrated tool storage.",
        tag: "Custom load rating",
      },
      {
        name: "Aluminium Profile Workstation",
        desc: "Lightweight yet strong aluminium profile frame system. Modular assembly allows rapid reconfiguration. Ideal for electronics assembly lines, cleanrooms, and precision workspaces.",
        tag: "Modular · Lightweight",
      },
    ],
  },
  {
    id: "instruments",
    icon: "📡",
    label: "Instruments",
    headline: "Test & Measurement Instruments",
    tagline:
      "Authorised dealer for Fluke and Karogic — full range of precision instruments",
    products: [
      {
        name: "Gas Analyzers & Monitors",
        desc: "Process and portable gas analysis for safety, compliance, and quality monitoring. Covers toxic gas, O₂, combustible, and multi-gas configurations for industrial safety and environmental compliance.",
        tag: "Safety critical",
      },
      {
        name: "Portable Calibrators & DMMs",
        desc: "Handheld and benchtop digital multimeters, loop calibrators, clamp meters, and multifunction calibrators. Fluke authorized dealer — full range of precision handheld instruments.",
        tag: "Fluke Authorized Dealer",
      },
      {
        name: "Power Supplies & Signal Sources",
        desc: "Fixed and variable AC/DC power supplies — 5V to 220V DC, single and three phase AC. Signal generators, waveform generators, and function generators for bench and field use.",
        tag: "Full range",
      },
      {
        name: "Predictive Maintenance Systems",
        desc: "Condition monitoring solutions to detect equipment degradation before failures occur — vibration analysis, thermal imaging, and ultrasonic testing to reduce unplanned downtime.",
        tag: "Reduce downtime",
      },
    ],
  },
  {
    id: "software",
    icon: "💻",
    label: "Software & Services",
    headline: "Testing & Calibration Software",
    tagline:
      "Automate calibration workflows, maintain records, and generate compliance reports",
    products: [
      {
        name: "Testing & Calibration Software",
        desc: "Automates data capture, calibration, and report generation in compliance with ISO/IEC 17025. Streamlines workflows, maintains calibration records, sets reminders, and ensures result traceability.",
        tag: "ISO/IEC 17025",
      },
      {
        name: "Installation & Commissioning",
        desc: "On-site installation and commissioning services for all TMCI products. Our engineers travel to your facility to set up, configure, and validate every system.",
        tag: "Pan India · International",
      },
      {
        name: "Annual Maintenance Contract (AMC)",
        desc: "Ongoing maintenance and support services to keep your systems running at peak precision. Scheduled servicing, emergency callouts, and calibration renewals — all under a single contract.",
        tag: "AMC available",
      },
    ],
  },
];

function WhatWeMakeSection() {
  const [activeTab, setActiveTab] = React.useState("calibration");
  const active = PRODUCT_CATEGORIES.find((c) => c.id === activeTab);

  return (
    <div>
      {/* Category tab strip */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 32,
          borderBottom: "2px solid var(--border)",
          paddingBottom: 0,
        }}
      >
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 18px",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--ff)",
              cursor: "pointer",
              border: "none",
              borderBottom:
                activeTab === cat.id
                  ? "2px solid var(--primary)"
                  : "2px solid transparent",
              marginBottom: -2,
              background: "none",
              color: activeTab === cat.id ? "var(--primary)" : "var(--mid)",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 16 }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Active category content */}
      {active && (
        <div>
          {/* Category headline */}
          <div style={{ marginBottom: 28 }}>
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: -0.5,
                marginBottom: 6,
              }}
            >
              {active.headline}
            </h3>
            <p style={{ fontSize: 14, color: "var(--mid)", lineHeight: 1.7 }}>
              {active.tagline}
            </p>
          </div>

          {/* Product cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
            className="wmm-grid"
          >
            {active.products.map((p, i) => (
              <div
                key={p.name}
                style={{
                  background:
                    i === 0 && active.accent
                      ? "var(--primary)"
                      : "var(--white)",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 200,
                  cursor: "pointer",
                  transition: "background 0.18s",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  if (!(i === 0 && active.accent))
                    e.currentTarget.style.background = "var(--primary-pale)";
                }}
                onMouseOut={(e) => {
                  if (!(i === 0 && active.accent))
                    e.currentTarget.style.background = "var(--white)";
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: i === 0 && active.accent ? "#fff" : "var(--ink)",
                    marginBottom: 8,
                    lineHeight: 1.3,
                    paddingRight: 24,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color:
                      i === 0 && active.accent
                        ? "rgba(255,255,255,0.75)"
                        : "var(--mid)",
                    lineHeight: 1.65,
                    flex: 1,
                  }}
                >
                  {p.desc}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    background:
                      i === 0 && active.accent
                        ? "rgba(255,255,255,0.18)"
                        : "var(--primary-pale-solid)",
                    color:
                      i === 0 && active.accent
                        ? "rgba(255,255,255,0.9)"
                        : "var(--primary-dk)",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: 4,
                    width: "fit-content",
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontSize: 13,
                    color:
                      i === 0 && active.accent
                        ? "rgba(255,255,255,0.5)"
                        : "var(--primary)",
                    opacity: 0,
                    transition: "all 0.18s",
                  }}
                  className="wmm-arrow"
                >
                  ↗
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            style={{
              marginTop: 20,
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, color: "var(--mid)" }}>
              <strong style={{ color: "var(--ink)" }}>
                Need a custom configuration?
              </strong>{" "}
              Every product is built to your exact specification — size,
              modules, power, materials.
            </div>
            <a
              href="#workbench"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--primary)",
                color: "#fff",
                padding: "9px 20px",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 0.18s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "var(--primary-dk)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--primary)")
              }
            >
              Configure Yours →
            </a>
          </div>
        </div>
      )}
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
                ["350", "+", "Clients Served"],
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
                    <span style={{ color: "#fff" }}>{sup}</span>{" "}
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
            "13+ Years · 350+ Industries · Ships Internationally",
            "Authorized Dealer — Fluke & Karogic",
            "Calibration Test Benches · Made in Bengaluru",
            "Supplied to ISRO · NTPC · BPCL · Tata Steel · Siemens",
            "ISO 9001:2015 Certified · CE · ROHS · BIFMA",
            "ESD Workstations · Pressure Benches · Gas Analyzers",
            "13+ Years · 350+ Industries · Ships Internationally",
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
          3b. Category tabs
          3c. Product grid per category
      ════════════════════════════════════════ */}
      <div id="products" style={{ background: "var(--white)" }}>
        <div className="sec">
          {/* 3a. Header */}
          <div className="sec-hd" style={{ marginBottom: 48 }}>
            <div className="overline">What We Make</div>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                letterSpacing: "-2px",
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              Six product lines. One promise.
              <br />A lab your team is proud to work in.
            </h2>
            <p
              style={{
                fontSize: 16,
                maxWidth: 620,
                lineHeight: 1.7,
                color: "var(--mid)",
              }}
            >
              From a single ESD workstation to a fully equipped test facility.
              <br />
              TMCI makes it, ships it, and installs it. Everything configured to
              how your team actually works.
            </p>
          </div>

          {/* 3b+3c. Category groups */}
          <WhatWeMakeSection />
        </div>
      </div>
      {/* ════════════════════════════════════════
          SECTION 4 — WHY OUR PRODUCTS
          Emotional copy — dark dramatic treatment
          Full width CTA bar at bottom
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "#060F0D",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,191,140,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,140,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            background:
              "radial-gradient(ellipse, rgba(0,191,140,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -60,
            width: 400,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(0,140,191,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="sec"
          style={{ maxWidth: 1100, position: "relative", zIndex: 2 }}
        >
          {/* Overline */}
          <div
            className="overline"
            style={{ color: "var(--primary-lt)", marginBottom: 24 }}
          >
            Why Our Products
          </div>

          {/* Main headline */}
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: "#fff",
              maxWidth: 780,
              marginBottom: 48,
            }}
          >
            There's a difference between a lab that works and a lab that{" "}
            <span style={{ color: "var(--primary-md)" }}>
              commands respect.
            </span>
          </h2>

          {/* Two column grid */}
          <div
            className="why-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
          >
            {/* Left — main copy */}
            <div>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: 28,
                }}
              >
                One gets the job done. The other tells every client, every
                auditor, every new hire that you take your work seriously.
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 28,
                }}
              >
                Most labs don't get there in one step. They start with
                whatever's available. Instruments on folding tables, cables
                taped down, equipment borrowed from other departments. It works,
                until it doesn't. Until an audit flags it. Until a new client
                visits. Until a good engineer leaves because the setup isn't
                worth their time.
              </p>

              {/* Highlighted statement */}
              <div
                style={{
                  borderLeft: "3px solid var(--primary-md)",
                  paddingLeft: 20,
                  marginBottom: 28,
                }}
              >
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.6,
                  }}
                >
                  TMCI exists for the moment you decide to fix that permanently.
                </p>
              </div>
            </div>

            {/* Right — proof card only */}
            <div>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,191,140,0.15)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow inside card */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 200,
                    height: 200,
                    background:
                      "radial-gradient(circle, rgba(0,191,140,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  The labs that trust us don't just perform better.
                </p>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 24,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  ISRO doesn't compromise on its workspace. Neither does the
                  Indian Navy. Neither does Kochi Metro. Not because they had
                  budget to spare, but because the people who run those
                  facilities understand that precision starts before the
                  instrument is even switched on.
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 24,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  It starts with the environment you create around it.
                </p>

                {/* Client tags */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {[
                    "ISRO",
                    "Indian Navy",
                    "Kochi Metro",
                    "NTPC",
                    "BPCL",
                    "Tata Steel",
                  ].map((name) => (
                    <div
                      key={name}
                      style={{
                        background: "rgba(0,191,140,0.08)",
                        border: "1px solid rgba(0,191,140,0.2)",
                        color: "var(--primary-lt)",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: 20,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full width CTA bar */}
          <div
            style={{
              marginTop: 64,
              borderTop: "1px solid rgba(0,191,140,0.15)",
              paddingTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.5,
                maxWidth: 560,
              }}
            >
              When you're ready to build that lab, we're ready to build it with
              you.
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexShrink: 0,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#workbench"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "13px 26px",
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
                Configure Your Bench →
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello! I want to discuss building a proper lab setup.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  padding: "12px 22px",
                  borderRadius: 8,
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.18s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Talk to an Engineer
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ════════════════════════════════════════
          SECTION 5 — IS THIS FOR YOU?
          Emotional — speaks to mental load of testing
          No checklist, no specs, just feeling
      ════════════════════════════════════════ */}
      <div style={{ background: "var(--white)" }}>
        <div className="sec" style={{ maxWidth: 1100 }}>
          {/* Overline */}
          <div className="overline" style={{ marginBottom: 24 }}>
            Is This For You?
          </div>

          {/* Two column layout */}
          <div
            className="isfor-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left — emotional copy */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 42px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.15,
                  color: "var(--ink)",
                  marginBottom: 32,
                }}
              >
                Most of our customers didn't plan to call us. Something made
                them.
              </h2>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "var(--mid)",
                  marginBottom: 22,
                }}
              >
                Testing and calibration is already demanding work. You're making
                precision judgments that affect everything downstream.
              </p>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "var(--mid)",
                  marginBottom: 22,
                }}
              >
                The last thing you need is your workspace adding to that load.
                Improvised setups do exactly that. Every loose connection is a
                question mark. Every unlabelled socket is a risk. Every
                workaround is something else to hold in your head while you're
                trying to concentrate.
              </p>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.85,
                  color: "var(--mid)",
                  marginBottom: 36,
                }}
              >
                A TMCI bench takes that away. Safety is built in. Connections
                are organised. Everything is where it should be. You sit down
                and do the work.
              </p>

              {/* Closing question — bold, pulled out */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--primary)",
                  borderRadius: "0 8px 8px 0",
                  padding: "20px 24px",
                  marginBottom: 36,
                }}
              >
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.6,
                  }}
                >
                  Is that the kind of lab you're running right now?
                </p>
              </div>

              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello! I want to discuss my lab setup requirements.")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "13px 26px",
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

            {/* Right — who specifically this is for */}
            <div style={{ paddingTop: 8 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1.3px",
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                We work with people who
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  {
                    title: "Run calibration labs",
                    desc: "In-house calibration of temperature, pressure, electrical and electronic instruments. You need a setup that's reliable, organised and audit-ready.",
                  },
                  {
                    title: "Handle sensitive electronics",
                    desc: "PCB assembly, semiconductor testing, electronics manufacturing. One static discharge can cost more than a proper ESD workstation ever would.",
                  },
                  {
                    title: "Set up new facilities",
                    desc: "New lab, new plant, new department. You want to do it right from day one instead of spending years fixing an improvised setup.",
                  },
                  {
                    title: "Upgrade existing setups",
                    desc: "You've outgrown what you have. The old bench was fine once. Now it's holding your team back.",
                  },
                  {
                    title: "Need field calibration",
                    desc: "Your instruments go where the work is. You need a mobile setup that's as capable as a permanent lab.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "20px 24px",
                      borderRadius:
                        i === 0 ? "8px 8px 0 0" : i === 4 ? "0 0 8px 8px" : 0,
                      border: "1px solid var(--border)",
                      borderTop: i === 0 ? "1px solid var(--border)" : "none",
                      background: "var(--white)",
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "var(--surface)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "var(--white)")
                    }
                  >
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ink)",
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--mid)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 7 — WHO WE SERVE
          Dark theme — matches Why Our Products
          Real proof points per sector, no emojis
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "#060F0D",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,191,140,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,140,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(0,191,140,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 400,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(0,140,191,0.05) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="sec"
          style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}
        >
          {/* Header */}
          <div className="sec-hd ctr" style={{ marginBottom: 56 }}>
            <div className="overline" style={{ color: "var(--primary-lt)" }}>
              Who We Serve
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 42px)",
                letterSpacing: "-1px",
                color: "#fff",
              }}
            >
              Your industry has specific standards.
              <br />
              We know them.
            </h2>
            <p style={{ marginTop: 12, color: "rgba(255,255,255,0.45)" }}>
              Thirteen years supplying calibration and test systems to India's
              most regulated industries — defence, energy, marine, and more.
            </p>
          </div>

          {/* Primary sectors — 3 column */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 2,
            }}
            className="ind-primary-grid"
          >
            {[
              {
                sector: "Defence & Aerospace",
                desc: "Precision calibration and test benches for mission-critical applications. Built to withstand defence-grade quality assurance.",
                clients: ["ISRO", "Indian Navy", "DRDO"],
              },
              {
                sector: "Oil, Gas & Petrochemical",
                desc: "Pressure, temperature and signal calibration for high-stakes process environments where instrument failure is not an option.",
                clients: ["BPCL", "ONGC", "NTPC"],
              },
              {
                sector: "Power Generation",
                desc: "Test and calibration systems for conventional and renewable energy facilities. Built for continuous, demanding operation.",
                clients: ["NTPC", "SAIL", "IndianOil"],
              },
              {
                sector: "Shipbuilding & Marine",
                desc: "Naval and commercial marine instrumentation built to withstand the demands of marine environments and compliance requirements.",
                clients: ["Kochi Metro", "WED", "Naval facilities"],
              },
              {
                sector: "Pharma & Biotech",
                desc: "GMP-compliant calibration workstations for pharmaceutical manufacturing and biotech research facilities.",
                clients: ["Compliance driven", "GMP ready", "Audit friendly"],
              },
              {
                sector: "Automotive & EV",
                desc: "Quality and safety testing for next-generation mobility. Motor test benches, EV component testing and electronics QA.",
                clients: ["TVS", "ATC Tyres", "EV manufacturers"],
              },
            ].map((item, i) => (
              <div
                key={item.sector}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "background 0.2s",
                  cursor: "default",
                  minHeight: 220,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(0,191,140,0.06)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                }
              >
                {/* Sector number */}
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--primary-md)",
                    letterSpacing: "1px",
                    fontFamily: "var(--mono)",
                    marginBottom: 4,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Sector name */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.25,
                  }}
                >
                  {item.sector}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {item.desc}
                </div>

                {/* Client tags */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {item.clients.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: "var(--primary-lt)",
                        background: "rgba(0,191,140,0.08)",
                        border: "1px solid rgba(0,191,140,0.18)",
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary sectors — compact strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "20px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.25)",
                whiteSpace: "nowrap",
              }}
            >
              Also serving
            </span>
            {[
              "Food Processing",
              "Education & R&D",
              "Mining & Metallurgy",
              "Construction",
              "Mineral Processing",
            ]
              .map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))
              .reduce(
                (acc, el, i) =>
                  i === 0
                    ? [el]
                    : [
                        ...acc,
                        <span
                          key={`dot-${i}`}
                          style={{
                            color: "rgba(255,255,255,0.15)",
                            fontSize: 10,
                          }}
                        >
                          ·
                        </span>,
                        el,
                      ],
                [],
              )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 8 — CERTIFICATIONS
          Light background — contrast after dark sections
          Explains what each cert means in plain language
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="sec" style={{ maxWidth: 1200 }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
              marginBottom: 56,
            }}
            className="cert-header-grid"
          >
            <div>
              <div className="overline" style={{ marginBottom: 16 }}>
                Certifications
              </div>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 42px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.15,
                  color: "var(--ink)",
                  marginBottom: 16,
                }}
              >
                These aren't just badges.
                <br />
                They're proof.
              </h2>
              <p style={{ fontSize: 15, color: "var(--mid)", lineHeight: 1.8 }}>
                Every certification TMCI holds was earned through independent
                third-party audits. Not self-declared. Not inherited. Audited,
                verified, and renewed. When you buy from a certified
                manufacturer, you're not taking their word for it.
              </p>
            </div>
            <div style={{ paddingTop: 8 }}>
              <div
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--primary)",
                  borderRadius: "0 8px 8px 0",
                  padding: "20px 24px",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: 8,
                  }}
                >
                  Why this matters when you're choosing a manufacturer{" "}
                </p>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--mid)",
                    lineHeight: 1.7,
                  }}
                >
                  A certification means a third-party auditor walked through
                  TMCI's facility, reviewed every process, checked every record,
                  and confirmed it meets international standards. That same
                  auditor comes back every year. If TMCI slips, they lose the
                  certification. That accountability is what you're buying into.
                </p>
              </div>
            </div>
          </div>

          {/* Certification cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginBottom: 32,
            }}
            className="cert-grid"
          >
            {[
              {
                code: "ISO 9001:2015",
                name: "Quality Management",
                color: "var(--primary)",
                what: "The world's most recognised quality standard. Over 1 million companies in 170 countries hold it.",
                means:
                  "Every TMCI product goes through a documented, audited quality process. Not just checked at the end — verified at every stage of manufacturing. If something goes wrong, there's a traceable record and a process to fix it.",
                matters:
                  "Your procurement team can approve TMCI as a vendor without hesitation. Many defence and government tenders require this.",
              },
              {
                code: "ISO 14001:2015",
                name: "Environmental Management",
                color: "#16A34A",
                what: "International standard for how a company manages its environmental impact.",
                means:
                  "TMCI monitors and reduces the environmental footprint of its manufacturing operations. Waste, energy use, emissions — all tracked and controlled.",
                matters:
                  "Required for export to European markets and increasingly demanded by large Indian corporates with ESG commitments.",
              },
              {
                code: "ISO 45001:2018",
                name: "Occupational Health & Safety",
                color: "#D97706",
                what: "International standard for workplace safety management.",
                means:
                  "TMCI's facility meets international safety standards. The people building your bench work in a safe, regulated environment — which directly affects the quality and consistency of what they make.",
                matters:
                  "Signals operational maturity. Companies that manage safety well manage quality well.",
              },
              {
                code: "CE Certified",
                name: "European Conformity",
                color: "#2563EB",
                what: "Mandatory marking for products sold in the European Economic Area.",
                means:
                  "TMCI products meet European safety, health and environmental requirements. Products have been tested and verified against EU directives.",
                matters:
                  "Required if your facility operates to European standards or if you're an OEM exporting to Europe. Also signals that TMCI builds to international — not just local — safety standards.",
              },
              {
                code: "ROHS",
                name: "Restriction of Hazardous Substances",
                color: "#7C3AED",
                what: "Restricts the use of specific hazardous materials in electrical and electronic equipment.",
                means:
                  "No lead, mercury, cadmium, or other harmful substances in TMCI products. Safe for the people who use them and for disposal at end of life.",
                matters:
                  "Required for electronics export. Increasingly required in pharma and food processing environments. Shows TMCI takes long-term product safety seriously.",
              },
              {
                code: "BIFMA",
                name: "Furniture Safety Standard",
                color: "#0891B2",
                what: "Business and Institutional Furniture Manufacturers Association standard for strength, durability and safety.",
                means:
                  "TMCI's workbenches and lab tables have been tested for structural integrity, load capacity, and stability. They won't flex, tip, or fail under the loads they're rated for.",
                matters:
                  "Critical for lab tables and ESD workstations. A bench that isn't structurally certified is a liability — especially in a calibration or electronics environment.",
              },
              {
                code: "ANSI-ESD S20.20",
                name: "Electrostatic Discharge Control",
                color: "#DC2626",
                what: "American National Standard for developing ESD control programs.",
                means:
                  "TMCI's ESD workstations meet the specific requirements for controlling electrostatic discharge in electronics manufacturing and handling environments.",
                matters:
                  "Non-negotiable for anyone handling PCBs, semiconductors, or sensitive electronic components. One discharge without proper ESD protection can destroy components worth more than the bench itself.",
              },
              {
                code: "Make in India",
                name: "Government of India Initiative",
                color: "#B45309",
                what: "Government recognition that the product is designed, developed and manufactured in India.",
                means:
                  "Every TMCI bench is built at their Bengaluru facility by Indian engineers. Not assembled from imported parts — manufactured.",
                matters:
                  "Eligible for government and PSU tenders that mandate Make in India compliance. Also means faster delivery, easier support, and no import dependency.",
              },
              {
                code: "MSME Registered",
                name: "Micro, Small & Medium Enterprise",
                color: "#047857",
                what: "Government of India registration for qualifying manufacturing businesses.",
                means:
                  "TMCI is a registered MSME manufacturer — a classification that requires verified turnover, investment and manufacturing credentials.",
                matters:
                  "Preferred vendor status in many government and PSU procurement processes. Eligible for MSME-reserved tender categories.",
              },
            ].map((cert) => (
              <div
                key={cert.code}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "box-shadow 0.18s, transform 0.18s",
                  cursor: "default",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {/* Cert code */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 4,
                      height: 32,
                      borderRadius: 2,
                      background: cert.color,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: "var(--ink)",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {cert.code}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        fontWeight: 500,
                        marginTop: 1,
                      }}
                    >
                      {cert.name}
                    </div>
                  </div>
                </div>

                {/* What it is */}
                <p
                  style={{
                    fontSize: 12.5,
                    color: "var(--mid)",
                    lineHeight: 1.65,
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 12,
                  }}
                >
                  {cert.what}
                </p>

                {/* What it means for you */}
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: cert.color,
                      marginBottom: 5,
                    }}
                  >
                    What it means for you
                  </div>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "var(--mid)",
                      lineHeight: 1.65,
                    }}
                  >
                    {cert.means}
                  </p>
                </div>

                {/* Why it matters */}
                <div
                  style={{
                    background: "var(--surface)",
                    borderRadius: 6,
                    padding: "10px 12px",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--muted)",
                      marginBottom: 4,
                    }}
                  >
                    Why it matters
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--mid)",
                      lineHeight: 1.6,
                    }}
                  >
                    {cert.matters}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: 10,
            }}
          >
            <p style={{ fontSize: 13.5, color: "var(--mid)", lineHeight: 1.7 }}>
              All certifications are independently audited and renewed annually.{" "}
              <strong style={{ color: "var(--ink)" }}>
                Copies available on request.
              </strong>
            </p>
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
              ["350+", "Clients served"],
              ["11", "Industry sectors"],
              ["INT'L", "Exported internationally"],
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
