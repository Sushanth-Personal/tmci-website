'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (lastScrollY.current - currentY > 10) {
        setVisible(true);
      } else if (currentY - lastScrollY.current > 5) {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkColor = "rgba(255,255,255,0.78)";
  const navLinkHover = "#ffffff";

  return (
    <>
      {/* TOPBAR */}
      <div
        className="tmci-topbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 502,
          background: "#060F0D",
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          fontSize: 11.5,
          color: "rgba(255,255,255,0.4)",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a
            href="tel:+919742944306"
            style={{
              color: "var(--primary-md)",
              fontWeight: 600,
              fontSize: 12,
              textDecoration: "none",
            }}
          >
            +91 97429 44306
          </a>
          <a
            href="tel:+918048957300"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            +91 80 4895 7300
          </a>
          <a
            href="mailto:info@tazkmazter.com"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            info@tazkmazter.com
          </a>
        </div>
        <div className="tmci-topbar-badges" style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              background: "rgba(0,137,123,0.3)",
              border: "1px solid rgba(0,191,165,0.25)",
              color: "#4DD0C4",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 10px",
              borderRadius: 20,
              letterSpacing: "0.5px",
            }}
          >
            ISO 9001:2015 Certified
          </div>
          <div
            style={{
              background: "rgba(0,137,123,0.3)",
              border: "1px solid rgba(0,191,165,0.25)",
              color: "#4DD0C4",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 10px",
              borderRadius: 20,
              letterSpacing: "0.5px",
            }}
          >
            Manufacturer · Exporter · Est. 2012
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav
        style={{
          position: "fixed",
          top: 34,
          left: 0,
          right: 0,
          zIndex: 501,
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          background: "rgba(6,15,13,0.92)",
          borderBottom: "1px solid rgba(0,191,140,0.08)",
          backdropFilter: "blur(12px)",
          transform: visible ? "translateY(0)" : "translateY(-128px)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginRight: 32,
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.5px",
              flexShrink: 0,
            }}
          >
            TM
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.4px",
              }}
            >
              TMCI Technology
            </div>
            <div
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              Calibration & Test Solutions
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            height: 64,
            flex: 1,
          }}
          className="tmci-desktop-nav"
        >
          {/* Products mega */}
          <div style={{ position: "relative" }} className="mega-parent">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "0 13px",
                height: 64,
                fontSize: 13,
                fontWeight: 600,
                color: navLinkColor,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
              className="nl-trigger"
            >
              Products
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 3.5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              className="mega-menu"
              style={{
                position: "absolute",
                top: 63,
                left: -20,
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderTop: "2px solid var(--primary)",
                borderRadius: "0 0 12px 12px",
                padding: 24,
                minWidth: 580,
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
                zIndex: 100,
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 0.15s",
              }}
            >
              {[
                {
                  title: "Calibration",
                  links: [
                    "Temperature Calibration Bench",
                    "Electrical Calibration Bench",
                    "Pressure & Pneumatic Bench",
                    "Electronic Test Bench",
                  ],
                },
                {
                  title: "Workstations",
                  links: [
                    "ESD Workstation",
                    "Aluminium Profile Workstation",
                    "Laboratory Work Station",
                    "Heavy Duty Industrial Bench",
                  ],
                },
                {
                  title: "Instruments",
                  links: [
                    "Gas Analyzers & Monitors",
                    "Test & Measurement Instruments",
                    "Portable Calibrators",
                    "Predictive Maintenance",
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <div
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.3px",
                      color: "var(--primary)",
                      marginBottom: 10,
                      paddingBottom: 7,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {col.title}
                  </div>
                  {col.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      style={{
                        display: "block",
                        padding: "6px 8px",
                        borderRadius: 6,
                        fontSize: 12.5,
                        color: "#4A5568",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "all 0.12s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#F4FBFA";
                        e.currentTarget.style.color = "var(--primary-dk)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "";
                        e.currentTarget.style.color = "#4A5568";
                      }}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Industries mega */}
          <div style={{ position: "relative" }} className="mega-parent">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "0 13px",
                height: 64,
                fontSize: 13,
                fontWeight: 600,
                color: navLinkColor,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
              className="nl-trigger"
            >
              Industries
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 3.5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              className="mega-menu"
              style={{
                position: "absolute",
                top: 63,
                left: -20,
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderTop: "2px solid var(--primary)",
                borderRadius: "0 0 12px 12px",
                padding: 24,
                minWidth: 380,
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                zIndex: 100,
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 0.15s",
              }}
            >
              {[
                {
                  title: "Core Sectors",
                  links: [
                    "Defence & Aerospace",
                    "Oil, Gas & Petrochemical",
                    "Power Generation",
                    "Shipbuilding & Marine",
                  ],
                },
                {
                  title: "Other Sectors",
                  links: [
                    "Pharma & Biotech",
                    "Automotive & EV",
                    "Food Processing",
                    "Education & R&D",
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <div
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.3px",
                      color: "var(--primary)",
                      marginBottom: 10,
                      paddingBottom: 7,
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {col.title}
                  </div>
                  {col.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      style={{
                        display: "block",
                        padding: "6px 8px",
                        borderRadius: 6,
                        fontSize: 12.5,
                        color: "#4A5568",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "all 0.12s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#F4FBFA";
                        e.currentTarget.style.color = "var(--primary-dk)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "";
                        e.currentTarget.style.color = "#4A5568";
                      }}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {["Services", "Downloads", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 13px",
                fontSize: 13,
                fontWeight: 600,
                color: navLinkColor,
                textDecoration: "none",
                transition: "color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = navLinkHover)}
              onMouseOut={(e) => (e.currentTarget.style.color = navLinkColor)}
            >
              {item}
            </a>
          ))}

          <Link
            href="/blogs"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 13px",
              fontSize: 13,
              fontWeight: 600,
              color:
                pathname === "/blogs"
                  ? "var(--primary-md)"
                  : navLinkColor,
              textDecoration: "none",
              transition: "color 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = "var(--primary-md)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.color =
                pathname === "/blogs"
                  ? "var(--primary-md)"
                  : navLinkColor)
            }
          >
            Blog
          </Link>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginLeft: 16,
          }}
          className="tmci-desktop-nav"
        >
          <a
            href="/configure"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(0,191,140,0.12)",
              color: "var(--primary-md)",
              border: "1px solid rgba(0,191,140,0.3)",
              padding: "7px 14px",
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--primary)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "var(--primary)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(0,191,140,0.12)";
              e.currentTarget.style.color = "var(--primary-md)";
              e.currentTarget.style.borderColor = "rgba(0,191,140,0.3)";
            }}
          >
            🔧 Customize Workbench
          </a>

          <a
            href="#catalogue"
            style={{
              display: "flex",
              alignItems: "center",
              background: "transparent",
              color: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.14)",
              padding: "7px 14px",
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            Download Catalogue
          </a>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919742944306"}?text=${encodeURIComponent("Hello! I want to get a quote.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--cta)",
              color: "#fff",
              padding: "8px 18px",
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.18s",
              whiteSpace: "nowrap",
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
            Get a Quote →
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="tmci-burger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            marginLeft: "auto",
            flexDirection: "column",
            gap: 5,
            alignItems: "flex-end",
          }}
          aria-label="Menu"
        >
          <div
            style={{
              width: 22,
              height: 2,
              background: "#fff",
              borderRadius: 2,
              transition: "all 0.2s",
              transform: open ? "rotate(45deg) translate(4px, 5px)" : "none",
            }}
          />
          <div
            style={{
              width: 16,
              height: 2,
              background: "#fff",
              borderRadius: 2,
              opacity: open ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "#fff",
              borderRadius: 2,
              transition: "all 0.2s",
              transform: open ? "rotate(-45deg) translate(4px, -5px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 98,
            left: 0,
            right: 0,
            background: "#0D1A14",
            borderTop: "1px solid rgba(0,191,140,0.12)",
            padding: "8px 16px 20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            zIndex: 499,
            transform: visible ? "translateY(0)" : "translateY(-200%)",
            transition: "transform 0.3s ease",
          }}
        >
          {[
            ["/", "Home"],
            ["/#products", "Products"],
            ["/#industries", "Industries"],
            ["/blogs", "Blog"],
            ["/#contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="#workbench"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: 10,
              background: "var(--primary)",
              color: "#fff",
              padding: "13px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            🔧 Customize Workbench
          </a>
        </div>
      )}

      <style>{`
        .mega-parent:hover .mega-menu { opacity: 1 !important; pointer-events: all !important; }
        .mega-parent:hover .nl-trigger { color: var(--primary-md) !important; }
        @media (max-width: 1080px) { .tmci-desktop-nav { display: none !important; } .tmci-burger { display: flex !important; } }
        @media (max-width: 640px) { nav { padding: 0 16px !important; } }
      `}</style>
    </>
  );
}
