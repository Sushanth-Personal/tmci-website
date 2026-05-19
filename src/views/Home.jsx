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
        opacity=".85"
        style={{ fill: "var(--primary-md)" }}
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
        fontWeight="700"
        style={{ fill: "var(--primary-md)" }}
      >
        4.000
      </text>
      <text
        x="155"
        y="175"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="6"
        style={{
          fill: "color-mix(in srgb, var(--primary-md) 50%, transparent)",
        }}
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
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ stroke: "var(--primary-lt)" }}
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
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ stroke: "var(--accent)" }}
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
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ stroke: "var(--primary-lt)" }}
      />
      <rect
        x="70"
        y="188"
        width="8"
        height="5"
        rx="1"
        opacity=".7"
        style={{ fill: "var(--primary-lt)" }}
      />
      <rect
        x="82"
        y="188"
        width="8"
        height="5"
        rx="1"
        opacity=".7"
        style={{ fill: "var(--primary-lt)" }}
      />
      <rect
        x="94"
        y="188"
        width="8"
        height="5"
        rx="1"
        opacity=".7"
        style={{ fill: "var(--accent)" }}
      />
      <circle
        cx="248"
        cy="191"
        r="4"
        filter="url(#glow)"
        opacity=".9"
        style={{ fill: "var(--primary-lt)" }}
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
        fontWeight="700"
        style={{ fill: "var(--primary-lt)" }}
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
        strokeWidth="1"
        opacity=".6"
        style={{ stroke: "var(--primary-lt)" }}
      />
      <line
        x1="194"
        y1="117"
        x2="192"
        y2="119"
        strokeWidth="1"
        opacity=".6"
        style={{ stroke: "var(--primary-lt)" }}
      />
      <line
        x1="185"
        y1="122"
        x2="190"
        y2="115"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#glow)"
        style={{ stroke: "var(--accent)" }}
      />
      <circle cx="185" cy="122" r="2" style={{ fill: "var(--primary-lt)" }} />
      <ellipse
        cx="160"
        cy="140"
        rx="90"
        ry="8"
        filter="url(#softglow)"
        style={{
          fill: "color-mix(in srgb, var(--primary-md) 6%, transparent)",
        }}
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
      desc: "I know what I need just want to confirm TMCI can build it.",
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
              We build every bench to specification but first, help us
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
              Select all that apply. Don't worry if you're unsure, we'll work it
              out together.
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
                background:
                  "color-mix(in srgb, var(--primary-md) 12%, transparent)",
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

const PRODUCT_CATEGORIES = [
  {
    id: "calibration",
    icon: "🎛️",
    label: "Calibration Benches",
    headline: "Calibration Bench Systems",
    accent: true,
    tagline:
      "Our flagship product line built for in-house calibration of every parameter",
    products: [
      {
        name: "Electrical & Electronics Calibration Test Bench",
        desc: "Modular ergonomic platform for precise testing, calibration, and maintenance of electrical and electronic equipment. Integrates multimeters, oscilloscopes, LCR meters, and power analyzers.",
        tag: "Most ordered",
        image: "",
        slug: "electrical-calibration-bench",
      },
      {
        name: "Temperature Calibration Test Bench",
        desc: "Specialized platform for accurate calibration of temperature instruments, sensors, transmitters, and controllers. Equipped with dry block calibrators, liquid baths, and reference thermometers.",
        tag: "ISO/IEC 17025 ready",
        image: "",
      },
      {
        name: "Pressure & Pneumatic Calibration Test Bench",
        desc: "Advanced modular solution for calibration and testing of pressure devices used in oil & gas, manufacturing, and power sectors.",
        tag: "SS grade",
        image: "",
      },
      {
        name: "Mobile Testing & Calibration Van",
        desc: "Compact, fully equipped mobile lab for on-site calibration across industrial locations. Outfitted with multifunction testers, calibrators, and portable analyzers.",
        tag: "Field deployment",
        image: "",
      },
      {
        name: "Instruments & Calibration Rack",
        desc: "Modular system for organized housing, management, and operation of calibration and testing instruments.",
        tag: "Custom config",
        image: "",
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
        desc: "Modular ergonomic platform for testing, calibration, and maintenance of electrical and electronic equipment.",
        tag: "R&D · Manufacturing · Training",
        image: "",
      },
      {
        name: "Motor & Drive Test Bench",
        desc: "Advanced modular system for testing, calibration, and evaluation of motors and drive systems - AC, DC, servo, and stepper motors.",
        tag: "Automation ready",
        image: "",
      },
      {
        name: "Electric Vehicle (EV) Test Bench",
        desc: "Specialized modular platform for testing EV components and systems - motors, inverters, BMS, and power electronics.",
        tag: "EV · R&D",
        image: "",
      },
      {
        name: "Relay & PLC Test Bench",
        desc: "Configurable test system for testing, calibration, and maintenance of protective relays and PLC systems.",
        tag: "Power · Substation",
        image: "",
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
        desc: "Contamination-free, static-controlled environment for precision tasks - PCB assembly, semiconductor handling, and testing.",
        tag: "ANSI-ESD S20.20",
        image: "",
      },
      {
        name: "ESD Clean Room & Accessories",
        desc: "Modular workstations for safe handling of sensitive electronic components. Built with ESD-safe laminations and anti-static surfaces.",
        tag: "IEC 61340 compliant",
        image: "",
      },
      {
        name: "ESD Workstation - Full Configuration",
        desc: "Complete ESD workstation with 230V/415V power, RCCB, MCCB, VAF meter, banana sockets, AC/DC power supplies, and optional PC.",
        tag: "Full fit-out",
        image: "",
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
        desc: "Built with mild steel frames and chemical-resistant surfaces. Adjustable heights, ample storage, and optional accessories.",
        tag: "Education · R&D · Industrial",
        image: "",
      },
      {
        name: "Heavy Duty Industrial Bench",
        desc: "Robust industrial benches designed for demanding environments. Heavy-gauge steel construction with customizable surface materials.",
        tag: "Custom load rating",
        image: "",
      },
      {
        name: "Aluminium Profile Workstation",
        desc: "Lightweight yet strong aluminium profile frame system. Modular assembly allows rapid reconfiguration.",
        tag: "Modular · Lightweight",
        image: "",
      },
    ],
  },
  {
    id: "instruments",
    icon: "📡",
    label: "Instruments",
    headline: "Test & Measurement Instruments",
    tagline:
      "Authorised dealer for Fluke and Harogic - full range of precision instruments",
    products: [
      {
        name: "Gas Analyzers & Monitors",
        desc: "Process and portable gas analysis for safety, compliance, and quality monitoring.",
        tag: "Safety critical",
        image: "",
      },
      {
        name: "Portable Calibrators & DMMs",
        desc: "Handheld and benchtop digital multimeters, loop calibrators, clamp meters, and multifunction calibrators. Fluke authorized dealer.",
        tag: "Fluke Authorized Dealer",
        image: "",
      },
      {
        name: "Power Supplies & Signal Sources",
        desc: "Fixed and variable AC/DC power supplies - 5V to 220V DC, single and three phase AC. Signal and function generators.",
        tag: "Full range",
        image: "",
      },
      {
        name: "Predictive Maintenance Systems",
        desc: "Condition monitoring solutions to detect equipment degradation before failures occur.",
        tag: "Reduce downtime",
        image: "",
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
        desc: "Automates data capture, calibration, and report generation in compliance with ISO/IEC 17025.",
        tag: "ISO/IEC 17025",
        image: "",
      },
      {
        name: "Installation & Commissioning",
        desc: "On-site installation and commissioning services for all TMCI products.",
        tag: "Pan India · International",
        image: "",
      },
      {
        name: "Annual Maintenance Contract (AMC)",
        desc: "Ongoing maintenance and support services to keep your systems running at peak precision.",
        tag: "AMC available",
        image: "",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// COMPONENT: WHAT WE MAKE — PRODUCT CATEGORIES
// Hero image RIGHT, product list LEFT
// Click product on left to switch hero image right
// ─────────────────────────────────────────────

function WhatWeMakeSection({ rawCategories }) {
  const categories = React.useMemo(() => {
    if (rawCategories) {
      try {
        const parsed = JSON.parse(rawCategories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge slugs from local data — Supabase won't have them
          return parsed.map((cat) => {
            const localCat = PRODUCT_CATEGORIES.find((c) => c.id === cat.id);
            return {
              ...cat,
              products: cat.products.map((p, i) => ({
                ...p,
                slug: p.slug || localCat?.products[i]?.slug || "",
              })),
            };
          });
        }
      } catch {}
    }
    return PRODUCT_CATEGORIES;
  }, [rawCategories]);

  const [activeTab, setActiveTab] = React.useState(
    categories[0]?.id || "calibration",
  );
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    if (!categories.find((c) => c.id === activeTab)) {
      setActiveTab(categories[0]?.id || "calibration");
    }
  }, [categories]);

  React.useEffect(() => {
    setActiveIdx(0);
  }, [activeTab]);

  const activeCategory = categories.find((c) => c.id === activeTab);
  const products = activeCategory?.products || [];
  const hero = products[activeIdx];

  return (
    <div>
      {/* Tab strip */}
      <div
        style={{
          display: "flex",
          gap: 0,
          flexWrap: "wrap",
          borderBottom: "2px solid var(--border)",
          marginBottom: 28,
        }}
      >
        {categories.map((cat) => (
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

      {/* Section headline */}
      {activeCategory && (
        <div style={{ marginBottom: 20 }}>
          <h3
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: -0.5,
              marginBottom: 6,
            }}
          >
            {activeCategory.headline}
          </h3>
          <p style={{ fontSize: 14, color: "var(--mid)", lineHeight: 1.7 }}>
            {activeCategory.tagline}
          </p>
        </div>
      )}

      {/* Main layout — left list + right hero */}
      {hero && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 2,
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
            minHeight: 480,
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          }}
          className="wmm-layout"
        >
          {/* LEFT — product list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              background: "var(--white)",
            }}
          >
            {products.map((product, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={product.name}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    borderBottom: "1px solid var(--border)",
                    background: isActive ? "var(--primary)" : "var(--white)",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "var(--primary-pale)";
                  }}
                  onMouseOut={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "var(--white)";
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: "60%",
                        background: "#fff",
                        borderRadius: "2px 0 0 2px",
                        opacity: 0.5,
                      }}
                    />
                  )}
                  {product.tag && (
                    <div
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: isActive
                          ? "rgba(255,255,255,0.7)"
                          : "var(--primary)",
                        marginBottom: 5,
                      }}
                    >
                      {product.tag}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: isActive ? "#fff" : "var(--ink)",
                      lineHeight: 1.3,
                      marginBottom: 4,
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: isActive ? "rgba(255,255,255,0.75)" : "var(--mid)",
                      lineHeight: 1.55,
                    }}
                  >
                    {product.desc}
                  </div>
                  {isActive && (
                    <>
                      {isActive && product.slug && (
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 6,
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.35)",
                            borderRadius: 5,
                            padding: "5px 12px",
                            textDecoration: "none",
                            width: "fit-content",
                          }}
                        >
                          View Details →
                        </Link>
                      )}
                      <a
                        href={`https://wa.me/919742944306?text=${encodeURIComponent("Hello! I'd like to enquire about this product.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          marginTop: 10,
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.35)",
                          borderRadius: 5,
                          padding: "5px 12px",
                          textDecoration: "none",
                          width: "fit-content",
                        }}
                      >
                        Enquire →
                      </a>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT — hero image */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "var(--surface)",
              minHeight: 480,
            }}
          >
            {hero.image ? (
              <img
                key={hero.name}
                src={hero.image}
                alt={hero.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  minHeight: 480,
                  transition: "opacity 0.2s",
                }}
                loading="lazy"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 480,
                  background: "var(--primary)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  opacity: 0.15,
                }}
              >
                <span style={{ fontSize: 48 }}>📷</span>
                <span style={{ fontSize: 12, color: "var(--ink)" }}>
                  Add image in admin
                </span>
              </div>
            )}

            {/* Product name overlay at bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 24px 18px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                {hero.name}
              </div>
              {hero.tag && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.65)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 3,
                  }}
                >
                  {hero.tag}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
          Every product is built to your exact specification — size, modules,
          power, materials.
        </div>
        <a
          href="/configure"
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
  );
}

// ─────────────────────────────────────────────
// COMPONENT: CERTIFICATION BADGES
// Place above Home() export
// Badge strip — hover reveals popover with explanation
// ─────────────────────────────────────────────

const CERTS = [
  {
    code: "ISO 9001:2015",
    name: "Quality Management",
    color: "#00897B",
    what: "The world's most recognised quality standard. Over 1 million companies in 170 countries hold it.",
    means:
      "Every TMCI product goes through a documented, audited quality process — verified at every stage of manufacturing. If something goes wrong, there's a traceable record and a process to fix it.",
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
      "TMCI products meet European safety, health and environmental requirements — tested and verified against EU directives.",
    matters:
      "Required if your facility operates to European standards or if you're an OEM exporting to Europe.",
  },
  {
    code: "ROHS",
    name: "Restriction of Hazardous Substances",
    color: "#7C3AED",
    what: "Restricts the use of specific hazardous materials in electrical and electronic equipment.",
    means:
      "No lead, mercury, cadmium, or other harmful substances in TMCI products. Safe for the people who use them and for disposal at end of life.",
    matters:
      "Required for electronics export. Increasingly required in pharma and food processing environments.",
  },
  {
    code: "BIFMA",
    name: "Furniture Safety Standard",
    color: "#0891B2",
    what: "Business and Institutional Furniture Manufacturers Association standard for strength, durability and safety.",
    means:
      "TMCI's workbenches and lab tables have been tested for structural integrity, load capacity, and stability.",
    matters:
      "Critical for lab tables and ESD workstations. A bench that isn't structurally certified is a liability in a calibration or electronics environment.",
  },
  {
    code: "ANSI-ESD S20.20",
    name: "Electrostatic Discharge Control",
    color: "#DC2626",
    what: "American National Standard for developing ESD control programs.",
    means:
      "TMCI's ESD workstations meet the specific requirements for controlling electrostatic discharge in electronics manufacturing and handling environments.",
    matters:
      "Non-negotiable for anyone handling PCBs, semiconductors, or sensitive electronic components.",
  },
  {
    code: "Make in India",
    name: "Government of India",
    color: "#B45309",
    what: "Government recognition that the product is designed, developed and manufactured in India.",
    means:
      "Every TMCI bench is built at their Bengaluru facility by Indian engineers. Not assembled from imported parts — manufactured.",
    matters:
      "Eligible for government and PSU tenders that mandate Make in India compliance.",
  },
  {
    code: "MSME Registered",
    name: "Micro, Small & Medium Enterprise",
    color: "#047857",
    what: "Government of India registration for qualifying manufacturing businesses.",
    means:
      "TMCI is a registered MSME manufacturer — verified turnover, investment and manufacturing credentials.",
    matters:
      "Preferred vendor status in many government and PSU procurement processes.",
  },
];

function CertificationBadges() {
  const [active, setActive] = React.useState(null);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const containerRef = React.useRef(null);

  function handleEnter(e, cert) {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom - containerRect.top + 8,
      left: Math.min(rect.left - containerRect.left, containerRect.width - 340),
    });
    setActive(cert);
  }

  function handleLeave() {
    setActive(null);
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Badge strip */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {CERTS.map((cert) => (
          <div
            key={cert.code}
            onMouseEnter={(e) => handleEnter(e, cert)}
            onMouseLeave={handleLeave}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              background: "var(--white)",
              border: `1.5px solid ${active?.code === cert.code ? cert.color : "var(--border)"}`,
              borderRadius: 8,
              cursor: "default",
              transition: "all 0.15s",
              boxShadow:
                active?.code === cert.code
                  ? `0 4px 16px ${cert.color}22`
                  : "none",
            }}
          >
            {/* Colored dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: cert.color,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: "var(--ink)",
                  letterSpacing: "-0.2px",
                }}
              >
                {cert.code}
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                {cert.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popover */}
      {active && (
        <div
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            width: 340,
            background: "var(--ink)",
            border: `1px solid ${active.color}44`,
            borderTop: `3px solid ${active.color}`,
            borderRadius: "0 0 10px 10px",
            padding: "20px 22px",
            zIndex: 50,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          {/* Code + name */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 2,
              }}
            >
              {active.code}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 500,
              }}
            >
              {active.name}
            </div>
          </div>

          {/* What it is */}
          <p
            style={{
              fontSize: 12.5,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {active.what}
          </p>

          {/* What it means */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: active.color,
                marginBottom: 5,
              }}
            >
              What it means for you
            </div>
            <p
              style={{
                fontSize: 12.5,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
              }}
            >
              {active.means}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENT: SIMPLE ENQUIRY FORM — Light theme
// Replace WorkbenchConfigurator with this
// Place above export default function Home()
// ─────────────────────────────────────────────

function SimpleEnquiryForm({ waNumber }) {
  const [form, setForm] = React.useState({
    name: "",
    company: "",
    requirement: "",
    contact: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function buildWhatsAppMessage() {
    return encodeURIComponent(
      [
        "🔧 *TMCI Enquiry*",
        "",
        `*Name:* ${form.name}`,
        `*Company:* ${form.company}`,
        `*Requirement:* ${form.requirement}`,
        `*Contact:* ${form.contact}`,
        "",
        "Please get in touch.",
      ].join("\n"),
    );
  }

  const isValid = form.name.trim() && form.contact.trim();

  const inputStyle = {
    width: "100%",
    background: "var(--white)", // change from "var(--surface)" to "var(--white)"
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "11px 14px",
    fontSize: 14,
    color: "var(--ink)",
    fontFamily: "var(--ff)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--ink)", // change from "var(--muted)" to "var(--ink)"
    display: "block",
    marginBottom: 8,
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--primary-pale-solid)",
            border: "2px solid var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 24,
            color: "var(--primary)",
            fontWeight: 900,
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "var(--ink)",
            marginBottom: 8,
          }}
        >
          Got it, {form.name.split(" ")[0]}!
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "var(--mid)",
            lineHeight: 1.7,
            maxWidth: 340,
            margin: "0 auto 24px",
          }}
        >
          Our engineers will review your requirement and get back within 24
          hours.
        </p>
        <a
          href={`https://wa.me/${waNumber}?text=${buildWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(37,211,102,0.1)",
            border: "1px solid rgba(37,211,102,0.3)",
            color: "#16a34a",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13.5,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          💬 Also send on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Name + Company */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        className="form-2col"
      >
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Rahul Sharma"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Acme Industries"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      {/* Requirement */}
      <div>
        <label style={labelStyle}>What are you looking to build? </label>
        <textarea
          value={form.requirement}
          onChange={(e) => update("requirement", e.target.value)}
          placeholder="e.g. We need a calibration bench for temperature and pressure instruments. Looking to set up an in-house lab at our Pune facility."
          rows={4}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Contact */}
      <div>
        <label style={labelStyle}>Phone or Email *</label>
        <input
          type="text"
          value={form.contact}
          onChange={(e) => update("contact", e.target.value)}
          placeholder="+91 98765 43210 or name@company.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => isValid && setSubmitted(true)}
          disabled={!isValid}
          style={{
            flex: 1,
            background: isValid ? "var(--cta)" : "var(--border)",
            border: "none",
            color: isValid ? "#fff" : "var(--muted)",
            padding: "13px 24px",
            borderRadius: 8,
            cursor: isValid ? "pointer" : "not-allowed",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "var(--ff)",
            transition: "all 0.18s",
            minWidth: 140,
          }}
          onMouseOver={(e) => {
            if (isValid) e.currentTarget.style.background = "var(--cta-hover)";
          }}
          onMouseOut={(e) => {
            if (isValid) e.currentTarget.style.background = "var(--cta)";
          }}
        >
          Send Enquiry →
        </button>
        <a
          href={`https://wa.me/${waNumber}?text=${buildWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(37,211,102,0.08)",
            border: "1px solid rgba(37,211,102,0.25)",
            color: "#16a34a",
            padding: "13px 20px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.18s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(37,211,102,0.15)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "rgba(37,211,102,0.08)")
          }
        >
          💬 WhatsApp
        </a>
      </div>

      <p style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.6 }}>
        We respond within 24 hours. Your details are only used to get in touch
        about your enquiry.
      </p>
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
  const [productCategories, setProductCategories] =
    useState(PRODUCT_CATEGORIES);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919742944306";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const cachedSections = cacheGet("home_sections");
    const cachedFaqs = cacheGet("faqs");
    if (cachedSections) {
      setSections(cachedSections);
      if (cachedSections.__products) {
        // Re-merge slugs in case cache is stale
        const merged = cachedSections.__products.map((cat) => {
          const localCat = PRODUCT_CATEGORIES.find((c) => c.id === cat.id);
          return {
            ...cat,
            products: cat.products.map((p, i) => ({
              ...p,
              slug: p.slug || localCat?.products[i]?.slug || "",
            })),
          };
        });
        setProductCategories(merged);
      }
    }
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
    const productsSection = map["products"];
    if (productsSection?.content) {
      try {
        const cats = JSON.parse(productsSection.content);
        if (Array.isArray(cats) && cats.length > 0) {
          // Merge slugs from local PRODUCT_CATEGORIES — Supabase data won't have them
          const merged = cats.map((cat) => {
            const localCat = PRODUCT_CATEGORIES.find((c) => c.id === cat.id);
            return {
              ...cat,
              products: cat.products.map((p, i) => ({
                ...p,
                slug: p.slug || localCat?.products[i]?.slug || "",
              })),
            };
          });
          setProductCategories(merged);
          map.__products = merged;
        }
      } catch {}
    }
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
              "linear-gradient(color-mix(in srgb, var(--primary-md) 4.5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--primary-md) 4.5%, transparent) 1px, transparent 1px)",
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
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-md) 13%, transparent) 0%, transparent 68%)",
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
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-lt) 7%, transparent) 0%, transparent 68%)",
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
                  background:
                    "color-mix(in srgb, var(--primary-md) 30%, transparent)",
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
       — WHAT WE MAKE (Products)
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
          <WhatWeMakeSection
            rawCategories={sections["products"]?.content}
          />{" "}
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
              "linear-gradient(color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px)",
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
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-md) 8%, transparent) 0%, transparent 65%)",
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
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-lt) 6%, transparent) 0%, transparent 65%)",
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
                  border:
                    "1px solid color-mix(in srgb, var(--primary-md) 15%, transparent)",
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
                      "radial-gradient(circle, color-mix(in srgb, var(--primary-md) 10%, transparent) 0%, transparent 70%)",
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
                        background:
                          "color-mix(in srgb, var(--primary-md) 8%, transparent)",
                        border:
                          "1px solid color-mix(in srgb, var(--primary-md) 20%, transparent)",
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
              borderTop:
                "1px solid color-mix(in srgb, var(--primary-md) 15%, transparent)",
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
                href={`https://wa.me/919742944306?text=${encodeURIComponent("Hello! I'd like to get a quote for a calibration/test bench setup.")}`}
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
                Get a Quote →
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
              "linear-gradient(color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-md) 7%, transparent) 0%, transparent 65%)",
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
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-lt) 5%, transparent) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="sec"
          style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}
        >
          {/* Header */}
          <div className="sec-hd ctr" style={{ marginBottom: 40 }}>
            <div className="overline" style={{ color: "var(--primary-lt)" }}>
              Who We Serve
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3.5vw, 42px)",
                letterSpacing: "-1px",
                color: "#fff",
              }}
            >
              Your industry has specific standards.
              <br />
              We know them.
            </h2>
            {/* Hide on mobile — className target */}
            <p
              className="who-serve-sub"
              style={{ marginTop: 12, color: "rgba(255,255,255,0.45)" }}
            >
              Thirteen years supplying calibration and test systems to India's
              most regulated industries — defence, energy, marine, and more.
            </p>
          </div>

          {/* Primary sectors grid */}
          <div
            className="ind-primary-grid"
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
                className="ind-sector-card"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transition: "background 0.2s",
                  cursor: "default",
                  minHeight: 220,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background =
                    "color-mix(in srgb, var(--primary-md) 6%, transparent)")
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
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Sector name */}
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.25,
                  }}
                >
                  {item.sector}
                </div>
                {/* Description — hidden on mobile */}
                <div
                  className="ind-sector-desc"
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {item.desc}
                </div>
                {/* Client tags — hidden on mobile */}
                <div
                  className="ind-sector-tags"
                  style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                >
                  {item.clients.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: "var(--primary-lt)",
                        background:
                          "color-mix(in srgb, var(--primary-md) 8%, transparent)",
                        border:
                          "1px solid color-mix(in srgb, var(--primary-md) 18%, transparent)",
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

          {/* Also serving strip — hidden on mobile */}
          <div
            className="also-serving"
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
          Light background
          Badge strip with hover popover
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
              marginBottom: 48,
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
                verified, and renewed annually.
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
                  Why this matters when choosing a manufacturer
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
                  and confirmed it meets international standards. That auditor
                  comes back every year. If TMCI slips, they lose the
                  certification. That accountability is what you're buying into.
                </p>
              </div>
            </div>
          </div>

          {/* Badge strip with popovers */}
          <CertificationBadges />

          {/* Bottom note */}
          <div
            style={{
              textAlign: "center",
              padding: "20px 24px",
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              marginTop: 24,
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
          SECTION 10 — SOCIAL PROOF
          Dark theme — stats + KMRL case study
          No fake testimonials
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
              "linear-gradient(color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-md) 7%, transparent) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 400,
            height: 400,
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-lt) 5%, transparent) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="sec"
          style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}
        >
          {/* Overline */}
          <div
            className="overline"
            style={{ color: "var(--primary-lt)", marginBottom: 24 }}
          >
            Trusted by Industry
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 40,
            }}
            className="proof-stats-grid"
          >
            {[
              {
                val: "13+",
                label: "Years Manufacturing",
                sub: "Est. 2012, Bengaluru",
              },
              {
                val: "350+",
                label: "Clients Served",
                sub: "Direct & through partners",
              },
              {
                val: "11",
                label: "Industry Sectors",
                sub: "Defence to Pharma",
              },
              {
                val: "INT'L",
                label: "Exports",
                sub: "Saudi Arabia, South Africa & more",
              },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                style={{
                  padding: "32px 28px",
                  borderRight:
                    i < arr.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Case study header */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.3px",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 12,
              }}
            >
              From the field
            </div>
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 32px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              A single static discharge can destroy ₹5 lakh worth of components.{" "}
              <span style={{ color: "var(--primary-md)" }}>
                Here's how Kochi Metro made sure that never happens.
              </span>
            </h3>
          </div>

          {/* KMRL Case study */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              background: "rgba(255,255,255,0.04)",
              border:
                "1px solid color-mix(in srgb, var(--primary-md) 12%, transparent)",
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 32,
            }}
            className="case-study-grid"
          >
            {/* Left — story */}
            <div
              style={{
                padding: "40px 36px",
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Client badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background:
                    "color-mix(in srgb, var(--primary-md) 8%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--primary-md) 20%, transparent)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--primary-md)",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--primary-lt)",
                    letterSpacing: "0.5px",
                  }}
                >
                  KOCHI METRO RAIL LIMITED
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  · Ernakulam, Kerala
                </span>
              </div>

              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.3,
                  marginBottom: 20,
                }}
              >
                Complete ESD-controlled laboratory for electronics maintenance
                operations
              </h4>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 20,
                }}
              >
                Kochi Metro needed a fully controlled electrostatic discharge
                environment for their electronics maintenance and assembly
                operations. The sensitivity of the components being handled
                meant that a standard workspace was not an option. Any
                uncontrolled static discharge risked damaging equipment worth
                significantly more than the lab itself.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 20,
                }}
              >
                TMCI designed and installed a complete ESD-proof laboratory.
                Every surface, every workstation, every accessory - flooring,
                mats, benches, grounding points, wrist strap testers configured
                to ANSI-ESD S20.20 standards.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Entry to the lab requires ESD shoes and protective coats. The
                environment is controlled from the moment you walk in. The lab
                has been operational since 2020 and remains in active daily use.
              </p>
            </div>

            {/* Right — specs */}
            <div
              style={{
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1.3px",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: 24,
                }}
              >
                Project details
              </div>

              {[
                { label: "Client", value: "Kochi Metro Rail Limited (KMRL)" },
                { label: "Location", value: "Ernakulam, Kerala" },
                {
                  label: "Project type",
                  value: "Complete ESD laboratory setup",
                },
                { label: "Standard", value: "ANSI-ESD S20.20 compliant" },
                { label: "Delivered", value: "2020" },
                { label: "Status", value: "Operational — active daily use" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    padding: "16px 0",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}

              {/* What was delivered */}
              <div
                style={{
                  marginTop: 24,
                  background:
                    "color-mix(in srgb, var(--primary-md) 6%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--primary-md) 15%, transparent)",
                  borderRadius: 8,
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    color: "var(--primary-lt)",
                    marginBottom: 10,
                  }}
                >
                  What was installed
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {[
                    "ESD workstations — full configuration",
                    "ESD flooring and grounding system",
                    "Wrist strap testers at every station",
                    "Ionizing equipment",
                    "ESD-safe storage and accessories",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "var(--primary-md)",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12.5,
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reference offer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 28px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                Want to speak with an existing customer before you decide?
              </strong>
              <br />
              We're confident enough in our work to put you in touch with people
              who've been through it.
            </p>
            <a
              href={`https://wa.me/${typeof waNumber !== "undefined" ? waNumber : "919742944306"}?text=${encodeURIComponent("Hello! I'd like to speak with one of your existing customers before making a decision.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13.5,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.18s",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              Request a Reference →
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 9 — AUTHORIZED DEALERS
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "#060F0D",
          padding: "56px 40px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div
            className="overline"
            style={{ color: "var(--primary-lt)", marginBottom: 8 }}
          >
            Authorized Dealers
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 40,
            }}
          >
            TMCI is an officially authorized dealer for these brands in India.
          </p>
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "Fluke",
                tag: "Authorized Dealer",
                logo: "https://res.cloudinary.com/dkhmnkxzo/image/upload/v1778578367/fluke-seeklogo_zrekcp.svg",
                logoHeight: 48,
              },
              {
                name: "Harogic",
                tag: "Authorized Dealer",
                logo: "https://res.cloudinary.com/dkhmnkxzo/image/upload/v1778578563/9c82e903-320d-4e78-847b-5ad5342c426c.png",
                logoHeight: 72,
              },
            ].map((b) => (
              <div
                key={b.name}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border:
                    "1px solid color-mix(in srgb, var(--primary-md) 20%, transparent)",
                  borderRadius: 12,
                  padding: "32px 48px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  width: 280,
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    style={{
                      maxWidth: 160,
                      height: b.logoHeight,
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    background: "rgba(255,255,255,0.07)",
                  }}
                />
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    color: "var(--primary-lt)",
                  }}
                >
                  {b.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 11 — GET IN TOUCH
          Light theme — simple lead capture
          Single form, under 30 seconds to fill
      ════════════════════════════════════════ */}
      <section
        id="workbench"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="sec" style={{ maxWidth: 900 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 16 }}>
              Get In Touch
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Tell us what you need.
              <br />
              We'll take it from there.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--mid)",
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              No lengthy forms. No commitments. Just tell us about your
              requirement and our engineers will get back within 24 hours.
            </p>
          </div>

          {/* Form card */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
            className="enquiry-grid"
          >
            {/* Left — form */}
            <div
              style={{
                padding: "40px 36px",
                background: "var(--white)",
                borderRight: "1px solid var(--border)",
              }}
            >
              <SimpleEnquiryForm waNumber={waNumber} />
            </div>

            {/* Right — what happens next */}
            <div
              style={{
                padding: "40px 36px",
                background: "var(--white)",
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    color: "var(--muted)",
                    marginBottom: 24,
                  }}
                >
                  What happens next
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  {[
                    {
                      step: "01",
                      title: "We review your requirement",
                      desc: "Our engineers read every enquiry personally. No automated responses.",
                    },
                    {
                      step: "02",
                      title: "We get back within 24 hours",
                      desc: "With questions, a rough spec, or a ballpark — whatever makes sense first.",
                    },
                    {
                      step: "03",
                      title: "We design it together",
                      desc: "One call or email thread is usually enough to nail down exactly what you need.",
                    },
                    {
                      step: "04",
                      title: "You get a clear quote",
                      desc: "Fixed price, clear scope, realistic timeline. No surprises.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--primary)",
                          fontFamily: "var(--mono)",
                          flexShrink: 0,
                          marginTop: 3,
                          minWidth: 20,
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 13.5,
                            fontWeight: 700,
                            color: "var(--ink)",
                            marginBottom: 3,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: 12.5,
                            color: "var(--mid)",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct contact */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--primary)",
                  borderRadius: "0 8px 8px 0",
                  padding: "16px 20px",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--primary)",
                    marginBottom: 10,
                  }}
                >
                  Prefer to call directly?
                </p>
                <a
                  href="tel:+919742944306"
                  style={{
                    display: "block",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--ink)",
                    textDecoration: "none",
                    marginBottom: 4,
                  }}
                >
                  +91 97429 44306
                </a>
                <a
                  href="tel:+918048957300"
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "var(--mid)",
                    textDecoration: "none",
                    marginBottom: 8,
                  }}
                >
                  +91 80 4895 7300
                </a>
                <a
                  href="mailto:info@tazkmazter.com"
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "var(--mid)",
                    textDecoration: "none",
                  }}
                >
                  info@tazkmazter.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 9 — AUTHORIZED DEALERS
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "#060F0D",
          padding: "56px 40px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div
            className="overline"
            style={{ color: "var(--primary-lt)", marginBottom: 8 }}
          >
            Authorized Dealers
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 40,
            }}
          >
            TMCI is an officially authorized dealer for these brands in India.
          </p>
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "Fluke",
                tag: "Authorized Dealer",
                logo: "https://res.cloudinary.com/dkhmnkxzo/image/upload/v1778578367/fluke-seeklogo_zrekcp.svg",
                logoHeight: 48,
              },
              {
                name: "Harogic",
                tag: "Authorized Dealer",
                logo: "https://res.cloudinary.com/dkhmnkxzo/image/upload/v1778578563/9c82e903-320d-4e78-847b-5ad5342c426c.png",
                logoHeight: 72,
              },
            ].map((b) => (
              <div
                key={b.name}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border:
                    "1px solid color-mix(in srgb, var(--primary-md) 20%, transparent)",
                  borderRadius: 12,
                  padding: "32px 48px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  width: 280,
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    style={{
                      maxWidth: 160,
                      height: b.logoHeight,
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    background: "rgba(255,255,255,0.07)",
                  }}
                />
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    color: "var(--primary-lt)",
                  }}
                >
                  {b.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
    SECTION 13 — FROM OUR ENGINEERS (Blog)
    Dark theme — #060F0D with grid bg
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
              "linear-gradient(color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--primary-md) 3%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-md) 7%, transparent) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 400,
            height: 400,
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary-lt) 5%, transparent) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="sec"
          style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div className="overline" style={{ color: "var(--primary-lt)" }}>
                From Our Engineers
              </div>
              <h2
                style={{
                  fontSize: "clamp(22px,3vw,36px)",
                  fontWeight: 800,
                  letterSpacing: -1,
                  color: "#fff",
                  lineHeight: 1.13,
                  marginBottom: 10,
                }}
              >
                Answers to questions we get asked every week.
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                Real answers from engineers who've built over 350 labs. No sales
                pitch — just what actually works.
              </p>
            </div>
            <Link
              href="/blogs"
              style={{
                color: "var(--primary-lt)",
                fontWeight: 700,
                fontSize: 13,
                whiteSpace: "nowrap",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              Read all articles →
            </Link>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              gap: 2,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 24,
            }}
            className="blog-grid"
          >
            {/* Featured article */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 180,
                  background: "linear-gradient(135deg,#081520,#0C2E28)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  overflow: "hidden",
                }}
              >
                <BenchSVG />
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--primary-lt)",
                  marginBottom: 10,
                }}
              >
                Lab Setup
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.45,
                  marginBottom: 10,
                }}
              >
                How to plan your first in-house calibration lab — what to get
                right before you buy anything
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                Most labs get the equipment right and the workspace wrong.
                Here's what 13 years of installations has taught us about what
                actually matters when setting up from scratch.
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 500,
                }}
              >
                📅 2024 · 6 min read
              </div>
            </div>

            {/* Article 2 */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 120,
                  background: "linear-gradient(135deg,#1C2B38,#0F3040)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  fontSize: 40,
                }}
              >
                🔧
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--primary-lt)",
                  marginBottom: 10,
                }}
              >
                Buying Guide
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.45,
                  marginBottom: 10,
                  flex: 1,
                }}
              >
                What to ask before buying a calibration bench — 6 questions most
                buyers forget
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 500,
                }}
              >
                📅 2024 · 4 min read
              </div>
            </div>

            {/* Article 3 */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 120,
                  background: "linear-gradient(135deg,#1C2438,#0F2840)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  fontSize: 40,
                }}
              >
                ⚡
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--primary-lt)",
                  marginBottom: 10,
                }}
              >
                ESD
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.45,
                  marginBottom: 10,
                  flex: 1,
                }}
              >
                ESD basics — what your lab actually needs vs what vendors tend
                to oversell
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 500,
                }}
              >
                📅 2024 · 5 min read
              </div>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div
            style={{
              padding: "20px 28px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "rgba(255,255,255,0.8)" }}>
                Have a question we haven't answered?
              </strong>{" "}
              Ask our engineers directly — no commitment, just a straight
              answer.
            </p>
            <a
              href={`https://wa.me/919742944306?text=${encodeURIComponent("Hello! I have a question about setting up my lab.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(37,211,102,0.1)",
                border: "1px solid rgba(37,211,102,0.25)",
                color: "rgba(37,211,102,0.9)",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              💬 Ask an Engineer
            </a>
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
              built precisely to your specification at a competitive price,
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
