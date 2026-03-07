import { useState, useRef } from "react";
const API_URL = import.meta.env.VITE_API_URL || "localhost:5000";

const PLACEHOLDER = `---
title: "My New Blog Post"
subtitle: "A short subtitle goes here"
publishedAt: "2025-07-23"
readTime: "4 min read"
author:
  name: "Your Name"
  avatar: https://example.com/avatar.jpg
heroImage: https://images.unsplash.com/photo-1492724441997-5dc865305da7
featured: false
category: "General"
meta: "blog"
---

## Introduction

Start writing your blog content here...
`;

export default function BlogPreviewInput() {
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState(null); // { type: "success"|"error", message }
  const [loading, setLoading] = useState(false);
  const [previewMeta, setPreviewMeta] = useState(null); // { slug, previewSlug, title }
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  async function handleSubmit() {
    if (!markdown.trim()) {
      setStatus({ type: "error", message: "Paste some markdown first." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_URL}/api/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
        setPreviewMeta(null);
      } else {
        setStatus({ type: "success", message: data.message });
        setPreviewMeta({
          slug: data.slug,
          previewSlug: data.previewSlug,
          title: data.title,
        });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Could not reach the server." });
      setPreviewMeta(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    try {
      await fetch(`${API_URL}/api/preview`, { method: "DELETE" });
    } catch (_) {}
    setMarkdown("");
    setStatus(null);
    setPreviewMeta(null);
  }

  function handleCopyTemplate() {
    navigator.clipboard.writeText(PLACEHOLDER.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Opens the blog as it would render in your actual frontend
  function handleOpenBlogPreview() {
    window.open(`/resources/${previewMeta.previewSlug}`, "_blank");
  }

  // Opens the raw JSON response
  function handleOpenJSON() {
    window.open(`${API_URL}/api/preview`, "_blank");
  }

  const lineCount = markdown ? markdown.split("\n").length : 0;

  return (
    <div style={styles.page}>
      <div style={styles.grain} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.dot} />
            <span style={styles.dot} />
            <span style={styles.dot} />
          </div>
          <p style={styles.headerTitle}>blog preview</p>
          <div style={styles.headerRight} />
        </div>

        {/* Title block */}
        <div style={styles.titleBlock}>
          <h1 style={styles.title}>Paste & Preview</h1>
          <p style={styles.subtitle}>
            Drop your <code style={styles.code}>.md</code> content below — frontmatter and all.
          </p>
        </div>

        {/* Editor area */}
        <div style={styles.editorWrapper}>
          <div style={styles.editorBar}>
            <span style={styles.editorLabel}>markdown</span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={handleCopyTemplate}
                style={styles.btnCopy}
                onMouseEnter={e => (e.currentTarget.style.color = "#9a8a6a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#3a3a3a")}
              >
                {copied ? "✦ copied" : "copy template"}
              </button>
              <span style={styles.lineCount}>{lineCount} lines</span>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            style={styles.textarea}
          />
        </div>

        {/* Status message */}
        {status && (
          <div
            style={{
              ...styles.statusBar,
              ...(status.type === "success" ? styles.statusSuccess : styles.statusError),
            }}
          >
            <span style={styles.statusIcon}>
              {status.type === "success" ? "✦" : "✕"}
            </span>
            {status.message}
          </div>
        )}

        {/* Preview meta pill */}
        {previewMeta && (
          <div style={styles.metaPill}>
            <span style={styles.metaLabel}>slug</span>
            <span style={styles.metaSlug}>{previewMeta.slug}</span>
          </div>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          <button
            onClick={handleClear}
            style={styles.btnSecondary}
            onMouseEnter={e => (e.currentTarget.style.background = "#2a2a2a")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            Clear
          </button>

          <div style={styles.actionsRight}>
            {previewMeta && (
              <>
                <button
                  onClick={handleOpenJSON}
                  style={styles.btnGhost}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#444")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2a2a2a")}
                >
                  JSON ↗
                </button>

                <button
                  onClick={handleOpenBlogPreview}
                  style={styles.btnGhost}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#e8e0d0")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2a2a2a")}
                >
                  Open Preview ↗
                </button>
              </>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                ...styles.btnPrimary,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#e8e0d0"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#f5f0e8"; }}
            >
              {loading ? "Parsing..." : "Store Preview →"}
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <p style={styles.hint}>
          Preview expires in 30 min · opens at{" "}
          <code style={styles.code}>/blog/_preview-{"{slug}"}</code>
        </p>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0e0e0e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Mono', 'Fira Mono', 'Courier New', monospace",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  grain: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "200px 200px",
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    width: "100%",
    maxWidth: "760px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "48px",
  },
  headerLeft: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  dot: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#2a2a2a",
    border: "1px solid #333",
  },
  headerTitle: {
    margin: 0,
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "#444",
    textTransform: "lowercase",
  },
  headerRight: { width: "52px" },

  titleBlock: {
    marginBottom: "32px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "clamp(28px, 5vw, 44px)",
    fontWeight: 400,
    color: "#f5f0e8",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    fontFamily: "'DM Serif Display', 'Georgia', serif",
  },
  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.6,
    letterSpacing: "0.01em",
  },
  code: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    padding: "1px 5px",
    borderRadius: "3px",
    fontSize: "12px",
    color: "#9a8a6a",
    fontFamily: "inherit",
  },

  editorWrapper: {
    border: "1px solid #222",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "16px",
  },
  editorBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 14px",
    background: "#141414",
    borderBottom: "1px solid #222",
  },
  editorLabel: {
    fontSize: "10px",
    letterSpacing: "0.15em",
    color: "#3a3a3a",
    textTransform: "uppercase",
  },
  lineCount: {
    fontSize: "10px",
    color: "#333",
    letterSpacing: "0.05em",
  },
  btnCopy: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "10px",
    letterSpacing: "0.15em",
    color: "#3a3a3a",
    textTransform: "uppercase",
    fontFamily: "'DM Mono', monospace",
    padding: 0,
    transition: "color 0.15s",
  },
  textarea: {
    width: "100%",
    minHeight: "360px",
    background: "#111",
    color: "#c8c0b0",
    border: "none",
    outline: "none",
    resize: "vertical",
    padding: "20px",
    fontSize: "13px",
    lineHeight: "1.75",
    fontFamily: "'DM Mono', 'Fira Mono', 'Courier New', monospace",
    letterSpacing: "0.02em",
    boxSizing: "border-box",
    caretColor: "#9a8a6a",
  },

  statusBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "4px",
    fontSize: "12px",
    letterSpacing: "0.03em",
    marginBottom: "12px",
  },
  statusSuccess: {
    background: "#0f1f0f",
    border: "1px solid #1a3a1a",
    color: "#4a8a4a",
  },
  statusError: {
    background: "#1f0f0f",
    border: "1px solid #3a1a1a",
    color: "#8a4a4a",
  },
  statusIcon: {
    fontSize: "10px",
  },

  metaPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#141414",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "5px 12px",
    marginBottom: "20px",
  },
  metaLabel: {
    fontSize: "9px",
    letterSpacing: "0.15em",
    color: "#3a3a3a",
    textTransform: "uppercase",
  },
  metaSlug: {
    fontSize: "12px",
    color: "#9a8a6a",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "24px",
  },
  actionsRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  btnPrimary: {
    background: "#f5f0e8",
    color: "#0e0e0e",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "12px",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "background 0.15s",
    fontWeight: 500,
  },
  btnSecondary: {
    background: "transparent",
    color: "#444",
    border: "1px solid #222",
    borderRadius: "4px",
    padding: "10px 16px",
    fontSize: "12px",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  btnGhost: {
    background: "transparent",
    color: "#555",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    padding: "10px 16px",
    fontSize: "12px",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "border-color 0.15s",
  },

  hint: {
    margin: 0,
    fontSize: "11px",
    color: "#2e2e2e",
    letterSpacing: "0.04em",
    textAlign: "center",
  },
};