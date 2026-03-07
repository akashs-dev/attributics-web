const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const BLOG_DIR = path.join(__dirname, "content", "blogs");

// ─── In-memory preview store ──────────────────────────────────────────────────

const previewStore = {
  content: null,   // parsed HTML
  meta: null,      // frontmatter data
  slug: null,      // auto-generated slug
  storedAt: null,  // timestamp
};

const PREVIEW_TTL_MS = 30 * 60 * 1000; // 30 minutes
const PREVIEW_SLUG_PREFIX = "_preview-";

function isPreviewStale() {
  if (!previewStore.storedAt) return true;
  return Date.now() - previewStore.storedAt > PREVIEW_TTL_MS;
}

function clearPreview() {
  previewStore.content = null;
  previewStore.meta = null;
  previewStore.slug = null;
  previewStore.storedAt = null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildSlugMap() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const slugMap = {};

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    if (data.title) {
      const slug = slugify(data.title);
      slugMap[slug] = filename;
    }
  }

  return slugMap;
}

function getBlogs() {
  const slugMap = buildSlugMap();

  return Object.entries(slugMap).map(([slug, filename]) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title || "Untitled",
      subtitle: data.subtitle || "",
      author: data.author || { name: "Unknown", avatar: "" },
      publishedAt: data.publishedAt || "",
      readTime: data.readTime || "",
      heroImage: data.heroImage || "",
      featured: data.featured || false,
      category: data.category || "General",
      meta: data.meta || "blog",
    };
  });
}

// ─── Blog routes ──────────────────────────────────────────────────────────────

// GET /api/blogs — list all blogs
app.get("/api/blogs", (req, res) => {
  try {
    const blogs = getBlogs();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load blogs" });
  }
});

// GET /api/blogs/featured — get featured blog
app.get("/api/blogs/featured", (req, res) => {
  try {
    const blogs = getBlogs();
    const featured = blogs.find(
      (b) => b.featured === true || b.featured === "true"
    );

    if (!featured) {
      return res.status(404).json({ error: "No featured blog found" });
    }

    res.json(featured);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load featured blog" });
  }
});

// GET /api/blogs/:slug
// If slug starts with "_preview-{slug}", serve from in-memory preview store.
// Otherwise serve from filesystem as normal.
app.get("/api/blogs/:slug", (req, res) => {
  const { slug } = req.params;

  // ── Preview path ──
  if (slug.startsWith(PREVIEW_SLUG_PREFIX)) {
    const previewSlug = slug.slice(PREVIEW_SLUG_PREFIX.length);

    if (!previewStore.content || isPreviewStale()) {
      clearPreview();
      return res.status(404).json({
        error: "No preview available or preview has expired. POST to /api/preview first.",
      });
    }

    if (previewStore.slug !== previewSlug) {
      return res.status(404).json({
        error: `Preview slug mismatch. Current preview is for '${previewStore.slug}'.`,
      });
    }

    return res.json({
      slug: previewSlug,
      ...previewStore.meta,
      content: previewStore.content,
      _preview: true,
    });
  }

  // ── Normal filesystem path ──
  try {
    const slugMap = buildSlugMap();
    const filename = slugMap[slug];

    if (!filename) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const html = marked.parse(content);

    res.json({
      slug,
      ...data,
      content: html,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// ─── Preview routes ───────────────────────────────────────────────────────────

// POST /api/preview
// Body: { markdown: "---\ntitle: ...\n---\n\n## Content" }
app.post("/api/preview", (req, res) => {
  const { markdown } = req.body;

  if (!markdown || typeof markdown !== "string" || markdown.trim() === "") {
    return res.status(400).json({
      error: "Request body must include a non-empty 'markdown' string",
    });
  }

  try {
    const { data, content } = matter(markdown);

    if (!data.title) {
      return res.status(422).json({
        error: "Frontmatter must include a 'title' field",
      });
    }

    const html = marked.parse(content);
    const slug = slugify(data.title);

    previewStore.content = html;
    previewStore.meta = data;
    previewStore.slug = slug;
    previewStore.storedAt = Date.now();

    res.json({
      message: "Preview stored successfully",
      slug,
      previewSlug: `${PREVIEW_SLUG_PREFIX}${slug}`,
      title: data.title,
      expiresIn: "30 minutes",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to parse markdown" });
  }
});

// GET /api/preview — raw preview (same shape as /api/blogs/:slug)
app.get("/api/preview", (req, res) => {
  if (!previewStore.content || isPreviewStale()) {
    clearPreview();
    return res.status(404).json({
      error: "No preview available. POST markdown to /api/preview first.",
    });
  }

  const { meta, content, slug } = previewStore;

  res.json({
    slug,
    ...meta,
    content,
    _preview: true,
  });
});

// DELETE /api/preview — manually clear the stored preview
app.delete("/api/preview", (req, res) => {
  clearPreview();
  res.json({ message: "Preview cleared" });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});