"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { cacheClear } from "../lib/cache";

const SECTIONS = [
  {
    id: "hero",
    label: "Hero Banner",
    desc: "Main banner at top of homepage",
    icon: "🏠",
  },
  {
    id: "about",
    label: "About / Why TMCI",
    desc: "Company info and checklist section",
    icon: "ℹ️",
  },
  {
    id: "products",
    label: "Products Section",
    desc: "Product mosaic grid",
    icon: "🔧",
  },
  { id: "cta", label: "Call To Action", desc: "Bottom CTA banner", icon: "📢" },
];

export default function AdminSections() {
  const [sections, setSections] = useState({});
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ content: "", content_type: "html" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [catalogueUrl, setCatalogueUrl] = useState("");
  const [catalogueUploading, setCatalogueUploading] = useState(false);
  const [catalogueSaved, setCatalogueSaved] = useState(false);
  const [catalogueDeleting, setCatalogueDeleting] = useState(false);
  const catalogueFileRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("site_sections").select("*");
    const map = {};
    data?.forEach((s) => {
      map[s.id] = s;
    });
    setSections(map);
    if (map["catalogue"]?.content) setCatalogueUrl(map["catalogue"].content);
  }

  function startEdit(section) {
    const existing = sections[section.id] || {};
    setForm({
      content: existing.content || "",
      content_type: existing.content_type || "html",
    });
    setEditing(section);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    await supabase.from("site_sections").upsert({
      id: editing.id,
      title: editing.label,
      content_type: form.content_type,
      content: form.content,
      updated_at: new Date().toISOString(),
    });
    cacheClear("home_sections");
    await load();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleCatalogueSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert("File too large. Maximum 20MB.");
      return;
    }
    setCatalogueUploading(true);
    const path = `catalogue/tmci-catalogue-${Date.now()}.pdf`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true, contentType: "application/pdf" });
    if (error) {
      alert("Upload failed: " + error.message);
      setCatalogueUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);
    const url = urlData?.publicUrl;
    if (url) {
      await supabase.from("site_sections").upsert({
        id: "catalogue",
        title: "Catalogue PDF",
        content_type: "file",
        content: url,
        updated_at: new Date().toISOString(),
      });
      setCatalogueUrl(url);
      setCatalogueSaved(true);
      setTimeout(() => setCatalogueSaved(false), 3000);
    }
    setCatalogueUploading(false);
    e.target.value = "";
  }

  async function handleCatalogueDelete() {
    if (
      !confirm(
        "Remove the catalogue? The Download button in the navbar will be hidden.",
      )
    )
      return;
    setCatalogueDeleting(true);
    await supabase.from("site_sections").upsert({
      id: "catalogue",
      title: "Catalogue PDF",
      content_type: "file",
      content: "",
      updated_at: new Date().toISOString(),
    });
    setCatalogueUrl("");
    setCatalogueDeleting(false);
  }

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>
          Website Sections
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
          Edit each section of your homepage. Changes go live instantly.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 28 }}>{section.icon}</span>
              {sections[section.id] && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: "#F0FDF4",
                    color: "#16A34A",
                    padding: "2px 8px",
                    borderRadius: 10,
                  }}
                >
                  Live
                </span>
              )}
            </div>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: 4,
              }}
            >
              {section.label}
            </h3>
            <p
              style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}
            >
              {section.desc}
            </p>
            <button
              onClick={() => startEdit(section)}
              style={{
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: 7,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--ff)",
                width: "100%",
              }}
            >
              Edit Section
            </button>
          </div>
        ))}
      </div>

      {/* CATALOGUE SECTION */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 24,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 24 }}>📄</span>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
            Product Catalogue
          </h2>
          {catalogueUrl && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "#F0FDF4",
                color: "#16A34A",
                padding: "2px 8px",
                borderRadius: 10,
              }}
            >
              Live
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: 12.5,
            color: "var(--muted)",
            marginBottom: 20,
            maxWidth: 520,
          }}
        >
          Upload your catalogue PDF. The "Download Catalogue" button in the
          navbar links directly to this file and is hidden automatically when no
          file is uploaded.
        </p>

        {catalogueUrl ? (
          <div
            style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#15803D" }}
                >
                  Catalogue is live
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#166534",
                    wordBreak: "break-all",
                    maxWidth: 360,
                  }}
                >
                  {catalogueUrl}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href={catalogueUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#16A34A",
                  color: "#fff",
                  padding: "7px 14px",
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Preview ↗
              </a>
              <button
                onClick={handleCatalogueDelete}
                disabled={catalogueDeleting}
                style={{
                  background: "none",
                  border: "1px solid #FECACA",
                  color: "#DC2626",
                  padding: "7px 14px",
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {catalogueDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 16,
              fontSize: 12.5,
              color: "#854D0E",
            }}
          >
            No catalogue uploaded — the Download Catalogue button is hidden in
            the navbar.
          </div>
        )}

        <div
          onClick={() => catalogueFileRef.current?.click()}
          style={{
            border: "2px dashed #D1D5DB",
            borderRadius: 10,
            padding: "28px 20px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "#00897B";
            e.currentTarget.style.background = "#F0FDFA";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "#D1D5DB";
            e.currentTarget.style.background = "#fff";
          }}
        >
          {catalogueUploading ? (
            <>
              <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
                Uploading...
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: 4,
                }}
              >
                {catalogueUrl
                  ? "Upload a new catalogue"
                  : "Upload your catalogue PDF"}
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                Click to browse · PDF only · Max 20MB
              </div>
            </>
          )}
        </div>

        <input
          type="file"
          ref={catalogueFileRef}
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleCatalogueSelect}
        />

        {catalogueSaved && (
          <div
            style={{
              marginTop: 12,
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              color: "#15803D",
              fontWeight: 600,
            }}
          >
            Catalogue uploaded and live — the navbar Download button is now
            active.
          </div>
        )}
      </div>

      {editing && (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
              Editing: {editing.label}
            </h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setEditing(null)}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "var(--mid)",
                  padding: "8px 16px",
                  borderRadius: 7,
                  cursor: "pointer",
                  fontFamily: "var(--ff)",
                  fontSize: 13,
                }}
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                style={{
                  background: saved ? "#16A34A" : "var(--primary)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: 7,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--ff)",
                  fontSize: 13,
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {[
              ["html", "HTML Code"],
              ["image", "Image URL"],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setForm((f) => ({ ...f, content_type: val }))}
                style={{
                  padding: "8px 16px",
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--ff)",
                  border: `2px solid ${form.content_type === val ? "var(--primary)" : "var(--border)"}`,
                  background:
                    form.content_type === val ? "rgba(0,137,123,0.08)" : "#fff",
                  color:
                    form.content_type === val ? "var(--primary)" : "var(--mid)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {form.content_type === "html" ? (
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              rows={14}
              style={{
                width: "100%",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: 13,
                fontFamily: "monospace",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
              }}
              placeholder="<h1>Your HTML here</h1>"
            />
          ) : (
            <div>
              <input
                type="url"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                style={{
                  width: "100%",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontFamily: "var(--ff)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="https://res.cloudinary.com/..."
              />
              {form.content && (
                <img
                  src={form.content}
                  alt="Preview"
                  style={{
                    marginTop: 12,
                    maxHeight: 180,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
