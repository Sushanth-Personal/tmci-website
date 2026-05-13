"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { cacheClear } from "../lib/cache";

const DEFAULT_CATEGORIES = [
  {
    id: "calibration",
    icon: "🎛️",
    label: "Calibration Benches",
    headline: "Calibration Bench Systems",
    accent: true,
    tagline:
      "Our flagship product line — built for in-house calibration of every parameter",
    products: [
      {
        name: "Electrical & Electronics Calibration Test Bench",
        desc: "Modular ergonomic platform for precise testing, calibration, and maintenance of electrical and electronic equipment.",
        tag: "Most ordered",
        image: "",
      },
      {
        name: "Temperature Calibration Test Bench",
        desc: "Specialized platform for accurate calibration of temperature instruments — sensors, transmitters, and controllers.",
        tag: "ISO/IEC 17025 ready",
        image: "",
      },
      {
        name: "Pressure & Pneumatic Calibration Test Bench",
        desc: "Advanced modular solution for calibration and testing of pressure devices.",
        tag: "SS grade",
        image: "",
      },
      {
        name: "Mobile Testing & Calibration Van",
        desc: "Compact, fully equipped mobile lab for on-site calibration across industrial locations.",
        tag: "Field deployment",
        image: "",
      },
      {
        name: "Instruments & Calibration Rack",
        desc: "Modular system for organized housing, management, and operation of calibration instruments.",
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
        desc: "Advanced modular system for testing, calibration, and evaluation of motors and drive systems.",
        tag: "Automation ready",
        image: "",
      },
      {
        name: "Electric Vehicle (EV) Test Bench",
        desc: "Specialized modular platform for testing EV components and systems.",
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
        desc: "Contamination-free, static-controlled environment for precision tasks.",
        tag: "ANSI-ESD S20.20",
        image: "",
      },
      {
        name: "ESD Clean Room & Accessories",
        desc: "Modular workstations for safe handling of sensitive electronic components.",
        tag: "IEC 61340 compliant",
        image: "",
      },
      {
        name: "ESD Workstation — Full Configuration",
        desc: "Complete ESD workstation with power, RCCB, MCCB, and all required accessories.",
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
        desc: "Built with mild steel frames and chemical-resistant surfaces.",
        tag: "Education · R&D · Industrial",
        image: "",
      },
      {
        name: "Heavy Duty Industrial Bench",
        desc: "Robust industrial benches designed for demanding environments.",
        tag: "Custom load rating",
        image: "",
      },
      {
        name: "Aluminium Profile Workstation",
        desc: "Lightweight yet strong aluminium profile frame system.",
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
      "Authorised dealer for Fluke and Harogic — full range of precision instruments",
    products: [
      {
        name: "Gas Analyzers & Monitors",
        desc: "Process and portable gas analysis for safety, compliance, and quality monitoring.",
        tag: "Safety critical",
        image: "",
      },
      {
        name: "Portable Calibrators & DMMs",
        desc: "Handheld and benchtop digital multimeters, loop calibrators, and multifunction calibrators.",
        tag: "Fluke Authorized Dealer",
        image: "",
      },
      {
        name: "Power Supplies & Signal Sources",
        desc: "Fixed and variable AC/DC power supplies and signal generators.",
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

const ICONS = [
  "🎛️",
  "🔬",
  "⚡",
  "🧪",
  "📡",
  "💻",
  "🔧",
  "🏭",
  "📊",
  "🛠️",
  "🔩",
  "⚙️",
  "🔌",
  "📐",
  "🧲",
  "🖥️",
];
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─────────────────────────────────────────────
// IMAGE EDITOR — drag to reposition, zoom to crop
// ─────────────────────────────────────────────
function ImageEditor({ src, onSave, onCancel }) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgEl, setImgEl] = useState(null);
  const [saving, setSaving] = useState(false);
  const W = 600,
    H = 400;

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImgEl(img);
      const fitScale = Math.max(W / img.width, H / img.height);
      setScale(fitScale);
      setPos({
        x: (W - img.width * fitScale) / 2,
        y: (H - img.height * fitScale) / 2,
      });
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(
      imgEl,
      pos.x,
      pos.y,
      imgEl.width * scale,
      imgEl.height * scale,
    );
  }, [imgEl, pos, scale]);

  const onMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setDragging(false);
  const onTouchStart = (e) => {
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ x: t.clientX - pos.x, y: t.clientY - pos.y });
  };
  const onTouchMove = (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    setPos({ x: t.clientX - dragStart.x, y: t.clientY - dragStart.y });
  };

  async function handleSave() {
    setSaving(true);
    onSave(canvasRef.current.toDataURL("image/jpeg", 0.92));
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          maxWidth: 680,
          width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#111" }}>
              Adjust Image
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
              Drag to reposition · Zoom to crop · Output: 600×400px
            </div>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#6B7280",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ position: "relative", background: "#F3F4F6" }}>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            style={{
              display: "block",
              width: "100%",
              cursor: dragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "33.3% 33.3%",
            }}
          />
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #E5E7EB" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                whiteSpace: "nowrap",
              }}
            >
              Zoom
            </span>
            <input
              type="range"
              min={0.1}
              max={5}
              step={0.01}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: "#00897B" }}
            />
            <span style={{ fontSize: 12, color: "#6B7280", minWidth: 44 }}>
              {Math.round(scale * 100)}%
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              onClick={onCancel}
              style={{
                background: "none",
                border: "1px solid #E5E7EB",
                color: "#6B7280",
                padding: "9px 20px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: saving ? "#9CA3AF" : "#111827",
                color: "#fff",
                border: "none",
                padding: "9px 24px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              {saving ? "Saving..." : "Use This Image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN ADMIN PAGE
// ─────────────────────────────────────────────
export default function AdminProducts() {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    desc: "",
    tag: "",
    image: "",
  });
  const [catForm, setCatForm] = useState({
    icon: "🎛️",
    label: "",
    headline: "",
    tagline: "",
    accent: false,
  });
  const [uploading, setUploading] = useState(false);
  const [editorSrc, setEditorSrc] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("site_sections")
      .select("content")
      .eq("id", "products")
      .single();
    if (data?.content) {
      try {
        const parsed = JSON.parse(data.content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(
            parsed.map((c) => ({
              ...c,
              products: (c.products || []).map((p) => ({ image: "", ...p })),
            })),
          );
          setExpandedCat(parsed[0]?.id || null);
          return;
        }
      } catch {}
    }
    setCategories(DEFAULT_CATEGORIES);
    setExpandedCat(DEFAULT_CATEGORIES[0]?.id || null);
  }

  async function save() {
    setSaving(true);
    await supabase
      .from("site_sections")
      .upsert({
        id: "products",
        title: "Product Categories",
        content_type: "json",
        content: JSON.stringify(categories),
        updated_at: new Date().toISOString(),
      });
    cacheClear("home_sections");
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function uploadBase64(dataUrl) {
    setUploading(true);
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const path = `products/${uid()}.jpg`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, blob, { upsert: true, contentType: "image/jpeg" });
    setUploading(false);
    if (error) {
      alert("Upload failed: " + error.message);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);
    return urlData?.publicUrl || null;
  }

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setEditorSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function handleEditorSave(croppedDataUrl) {
    setEditorSrc(null);
    const url = await uploadBase64(croppedDataUrl);
    if (url) setProductForm((f) => ({ ...f, image: url }));
  }

  // Category CRUD
  function startAddCategory() {
    setCatForm({
      icon: "🎛️",
      label: "",
      headline: "",
      tagline: "",
      accent: false,
    });
    setEditingCat("__new__");
  }
  function startEditCategory(cat) {
    setCatForm({
      icon: cat.icon,
      label: cat.label,
      headline: cat.headline,
      tagline: cat.tagline,
      accent: !!cat.accent,
    });
    setEditingCat(cat.id);
  }
  function cancelCatEdit() {
    setEditingCat(null);
  }
  function saveCategoryEdit() {
    if (!catForm.label.trim()) return;
    if (editingCat === "__new__") {
      const nc = { id: uid(), ...catForm, products: [] };
      setCategories((p) => [...p, nc]);
      setExpandedCat(nc.id);
    } else
      setCategories((p) =>
        p.map((c) => (c.id === editingCat ? { ...c, ...catForm } : c)),
      );
    setEditingCat(null);
  }
  function deleteCategory(catId) {
    if (!confirm("Delete this category and all its products?")) return;
    setCategories((p) => p.filter((c) => c.id !== catId));
  }
  function moveCat(catId, dir) {
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === catId);
      const arr = [...prev];
      const t = idx + dir;
      if (t < 0 || t >= arr.length) return prev;
      [arr[idx], arr[t]] = [arr[t], arr[idx]];
      return arr;
    });
  }

  // Product CRUD
  function startAddProduct(catId) {
    setProductForm({ name: "", desc: "", tag: "", image: "" });
    setEditingProduct({ catId, index: -1 });
  }
  function startEditProduct(catId, idx, product) {
    setProductForm({
      name: product.name,
      desc: product.desc,
      tag: product.tag || "",
      image: product.image || "",
    });
    setEditingProduct({ catId, index: idx });
  }
  function cancelProductEdit() {
    setEditingProduct(null);
  }
  function saveProductEdit() {
    if (!productForm.name.trim()) return;
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== editingProduct.catId) return c;
        const products = [...c.products];
        const p = {
          name: productForm.name.trim(),
          desc: productForm.desc.trim(),
          tag: productForm.tag.trim(),
          image: productForm.image.trim(),
        };
        if (editingProduct.index === -1) products.push(p);
        else products[editingProduct.index] = p;
        return { ...c, products };
      }),
    );
    setEditingProduct(null);
  }
  function deleteProduct(catId, idx) {
    if (!confirm("Delete this product?")) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id !== catId
          ? c
          : { ...c, products: c.products.filter((_, i) => i !== idx) },
      ),
    );
  }
  function moveProduct(catId, idx, dir) {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== catId) return c;
        const products = [...c.products];
        const t = idx + dir;
        if (t < 0 || t >= products.length) return c;
        [products[idx], products[t]] = [products[t], products[idx]];
        return { ...c, products };
      }),
    );
  }

  const isEditingThisProduct = (catId, idx) =>
    editingProduct?.catId === catId && editingProduct?.index === idx;

  return (
    <div style={{ padding: 28, maxWidth: 960 }}>
      {editorSrc && (
        <ImageEditor
          src={editorSrc}
          onSave={handleEditorSave}
          onCancel={() => setEditorSrc(null)}
        />
      )}

      {/* Header */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>
            Products Manager
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
            Manage product categories and items shown on the home page.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a
            href="/#products"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12.5, color: "#6B7280" }}
          >
            View on site ↗
          </a>
          <button
            onClick={save}
            disabled={saving}
            style={{
              background: saving ? "#9CA3AF" : saved ? "#16A34A" : "#111827",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13.5,
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {saving ? "Saving..." : saved ? "✓ Saved!" : "Save All Changes"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          background: "#F0F9FF",
          border: "1px solid #BAE6FD",
          borderRadius: 8,
          padding: "10px 16px",
          marginBottom: 20,
          fontSize: 12.5,
          color: "#0369A1",
        }}
      >
        💡 Upload an image — the <strong>crop tool</strong> opens automatically
        so you can reposition and zoom before saving. Product list mirrors how
        it looks on the homepage.
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {categories.map((cat, catIdx) => (
          <div
            key={cat.id}
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* Category header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                cursor: "pointer",
                background: expandedCat === cat.id ? "#F9FAFB" : "#fff",
              }}
              onClick={() =>
                setExpandedCat(expandedCat === cat.id ? null : cat.id)
              }
            >
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                  {cat.products.length} product
                  {cat.products.length !== 1 ? "s" : ""}
                  {cat.accent ? " · Accent enabled" : ""}
                </div>
              </div>
              <div
                style={{ display: "flex", gap: 6, alignItems: "center" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => moveCat(cat.id, -1)}
                  disabled={catIdx === 0}
                  style={{
                    background: "none",
                    border: "1px solid #E5E7EB",
                    borderRadius: 5,
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#6B7280",
                    opacity: catIdx === 0 ? 0.3 : 1,
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveCat(cat.id, 1)}
                  disabled={catIdx === categories.length - 1}
                  style={{
                    background: "none",
                    border: "1px solid #E5E7EB",
                    borderRadius: 5,
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#6B7280",
                    opacity: catIdx === categories.length - 1 ? 0.3 : 1,
                  }}
                >
                  ↓
                </button>
                <button
                  onClick={() => startEditCategory(cat)}
                  style={{
                    background: "none",
                    border: "1px solid #E5E7EB",
                    borderRadius: 5,
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#374151",
                    fontFamily: "inherit",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  style={{
                    background: "none",
                    border: "1px solid #FECACA",
                    borderRadius: 5,
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#DC2626",
                    fontFamily: "inherit",
                  }}
                >
                  Delete
                </button>
              </div>
              <span style={{ color: "#9CA3AF", fontSize: 12 }}>
                {expandedCat === cat.id ? "▲" : "▼"}
              </span>
            </div>

            {editingCat === cat.id && (
              <CatEditForm
                form={catForm}
                setForm={setCatForm}
                onSave={saveCategoryEdit}
                onCancel={cancelCatEdit}
              />
            )}

            {expandedCat === cat.id && (
              <div
                style={{
                  borderTop: "1px solid #F3F4F6",
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {cat.products.map((product, pIdx) => (
                  <div key={pIdx}>
                    {isEditingThisProduct(cat.id, pIdx) ? (
                      <ProductEditForm
                        form={productForm}
                        setForm={setProductForm}
                        onSave={saveProductEdit}
                        onCancel={cancelProductEdit}
                        uploading={uploading}
                        fileRef={fileRef}
                        onFileSelect={handleFileSelect}
                        onReEdit={() => {
                          if (productForm.image)
                            setEditorSrc(productForm.image);
                        }}
                      />
                    ) : (
                      /* ── Product row — mirrors homepage layout ── */
                      <div
                        style={{
                          display: "flex",
                          gap: 0,
                          border: "1px solid #E5E7EB",
                          borderRadius: 8,
                          overflow: "hidden",
                          background: "#fff",
                        }}
                      >
                        {/* Left — info (matches homepage left panel) */}
                        <div
                          style={{
                            flex: 1,
                            padding: "12px 14px",
                            borderRight: "1px solid #F3F4F6",
                          }}
                        >
                          {product.tag && (
                            <div
                              style={{
                                fontSize: 9.5,
                                fontWeight: 700,
                                color: "#00897B",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: 4,
                              }}
                            >
                              {product.tag}
                            </div>
                          )}
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 13,
                              color: "#111",
                              marginBottom: 3,
                              lineHeight: 1.3,
                            }}
                          >
                            {product.name}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "#6B7280",
                              lineHeight: 1.5,
                            }}
                          >
                            {product.desc}
                          </div>
                        </div>

                        {/* Right — image preview (matches homepage right panel) */}
                        <div
                          style={{
                            width: 130,
                            flexShrink: 0,
                            background: "#F9FAFB",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                minHeight: 88,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                minHeight: 88,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 22,
                                opacity: 0.2,
                              }}
                            >
                              📷
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            padding: "8px 10px",
                            borderLeft: "1px solid #F3F4F6",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <button
                            onClick={() => moveProduct(cat.id, pIdx, -1)}
                            disabled={pIdx === 0}
                            style={{
                              background: "none",
                              border: "1px solid #E5E7EB",
                              borderRadius: 4,
                              padding: "2px 7px",
                              cursor: "pointer",
                              fontSize: 11,
                              color: "#6B7280",
                              opacity: pIdx === 0 ? 0.3 : 1,
                            }}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveProduct(cat.id, pIdx, 1)}
                            disabled={pIdx === cat.products.length - 1}
                            style={{
                              background: "none",
                              border: "1px solid #E5E7EB",
                              borderRadius: 4,
                              padding: "2px 7px",
                              cursor: "pointer",
                              fontSize: 11,
                              color: "#6B7280",
                              opacity:
                                pIdx === cat.products.length - 1 ? 0.3 : 1,
                            }}
                          >
                            ↓
                          </button>
                          <button
                            onClick={() =>
                              startEditProduct(cat.id, pIdx, product)
                            }
                            style={{
                              background: "none",
                              border: "1px solid #E5E7EB",
                              borderRadius: 4,
                              padding: "3px 8px",
                              cursor: "pointer",
                              fontSize: 11,
                              color: "#374151",
                              fontFamily: "inherit",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(cat.id, pIdx)}
                            style={{
                              background: "none",
                              border: "1px solid #FECACA",
                              borderRadius: 4,
                              padding: "3px 8px",
                              cursor: "pointer",
                              fontSize: 11,
                              color: "#DC2626",
                              fontFamily: "inherit",
                            }}
                          >
                            Del
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isEditingThisProduct(cat.id, -1) ? (
                  <ProductEditForm
                    form={productForm}
                    setForm={setProductForm}
                    onSave={saveProductEdit}
                    onCancel={cancelProductEdit}
                    uploading={uploading}
                    fileRef={fileRef}
                    onFileSelect={handleFileSelect}
                    onReEdit={() => {
                      if (productForm.image) setEditorSrc(productForm.image);
                    }}
                    isNew
                  />
                ) : (
                  <button
                    onClick={() => startAddProduct(cat.id)}
                    style={{
                      background: "none",
                      border: "1.5px dashed #D1D5DB",
                      borderRadius: 8,
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#9CA3AF",
                      fontFamily: "inherit",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    + Add Product
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {editingCat === "__new__" ? (
        <div
          style={{
            marginTop: 12,
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <CatEditForm
            form={catForm}
            setForm={setCatForm}
            onSave={saveCategoryEdit}
            onCancel={cancelCatEdit}
            isNew
          />
        </div>
      ) : (
        <button
          onClick={startAddCategory}
          style={{
            marginTop: 12,
            background: "none",
            border: "1.5px dashed #D1D5DB",
            borderRadius: 12,
            padding: "14px",
            cursor: "pointer",
            fontSize: 13.5,
            color: "#9CA3AF",
            fontFamily: "inherit",
            width: "100%",
            textAlign: "center",
          }}
        >
          + Add Category
        </button>
      )}

      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: 12,
          alignItems: "center",
          borderTop: "1px solid #E5E7EB",
          paddingTop: 20,
        }}
      >
        <button
          onClick={save}
          disabled={saving}
          style={{
            background: saving ? "#9CA3AF" : saved ? "#16A34A" : "#111827",
            color: "#fff",
            border: "none",
            padding: "11px 28px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            cursor: saving ? "not-allowed" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {saving
            ? "Saving..."
            : saved
              ? "✓ Saved to live site!"
              : "Save All Changes"}
        </button>
        <span style={{ fontSize: 12.5, color: "#9CA3AF" }}>
          Changes go live after saving
        </span>
      </div>
    </div>
  );
}

function CatEditForm({ form, setForm, onSave, onCancel, isNew }) {
  return (
    <div
      style={{
        padding: "18px 18px",
        borderTop: "1px solid #F3F4F6",
        background: "#FAFAFA",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#111",
          marginBottom: 14,
        }}
      >
        {isNew ? "➕ New Category" : "✏️ Edit Category"}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 1fr",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <label style={labelStyle}>Icon</label>
          <select
            value={form.icon}
            onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
            style={inputStyle}
          >
            {ICONS.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tab Label</label>
          <input
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            placeholder="e.g. Calibration Benches"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Section Headline</label>
          <input
            value={form.headline}
            onChange={(e) =>
              setForm((f) => ({ ...f, headline: e.target.value }))
            }
            placeholder="e.g. Calibration Bench Systems"
            style={inputStyle}
          />
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Tagline</label>
        <input
          value={form.tagline}
          onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          placeholder="Short description shown below headline"
          style={{ ...inputStyle, width: "100%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <input
          type="checkbox"
          id="accent-toggle"
          checked={form.accent}
          onChange={(e) => setForm((f) => ({ ...f, accent: e.target.checked }))}
        />
        <label
          htmlFor="accent-toggle"
          style={{ fontSize: 12.5, color: "#374151", cursor: "pointer" }}
        >
          Accent — highlights first product with brand color
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onSave}
          style={{
            background: "#111827",
            color: "#fff",
            border: "none",
            padding: "8px 20px",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {isNew ? "Add Category" : "Save"}
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "1px solid #E5E7EB",
            color: "#6B7280",
            padding: "8px 16px",
            borderRadius: 7,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ProductEditForm({
  form,
  setForm,
  onSave,
  onCancel,
  uploading,
  fileRef,
  onFileSelect,
  onReEdit,
  isNew,
}) {
  return (
    <div
      style={{
        background: "#F9FAFB",
        border: "1.5px solid #D1D5DB",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#111",
          marginBottom: 12,
        }}
      >
        {isNew ? "➕ New Product" : "✏️ Edit Product"}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Product Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Electrical & Electronics Calibration Test Bench"
            style={{ ...inputStyle, width: "100%" }}
          />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            placeholder="Short product description (2–3 sentences)"
            rows={3}
            style={{
              ...inputStyle,
              width: "100%",
              resize: "vertical",
              lineHeight: 1.5,
            }}
          />
        </div>
        <div>
          <label style={labelStyle}>Badge / Tag</label>
          <input
            value={form.tag}
            onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
            placeholder="e.g. Most ordered"
            style={{ ...inputStyle, width: "100%" }}
          />
        </div>
        <div>
          <label style={labelStyle}>Image</label>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              placeholder="Paste URL or upload →"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                background: "#374151",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {uploading ? "Uploading..." : "📁 Upload"}
            </button>
          </div>
          {form.image && (
            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    height: 80,
                    width: 130,
                    objectFit: "cover",
                    borderRadius: 6,
                    border: "1px solid #E5E7EB",
                    display: "block",
                  }}
                />
                <button
                  onClick={() => setForm((f) => ({ ...f, image: "" }))}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#EF4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    cursor: "pointer",
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  ×
                </button>
              </div>
              <button
                onClick={onReEdit}
                style={{
                  background: "#fff",
                  border: "1.5px solid #00897B",
                  color: "#00897B",
                  padding: "6px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "inherit",
                }}
              >
                ✂️ Crop / Adjust
              </button>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onSave}
          style={{
            background: "#111827",
            color: "#fff",
            border: "none",
            padding: "8px 20px",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {isNew ? "Add Product" : "Save"}
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "1px solid #E5E7EB",
            color: "#6B7280",
            padding: "8px 16px",
            borderRadius: 7,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#374151",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
const inputStyle = {
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  padding: "7px 10px",
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  background: "#fff",
  color: "#111",
  boxSizing: "border-box",
};
