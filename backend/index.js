require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const multer = require("multer");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://attributics-demo.vercel.app"
  ]
}));
app.set("trust proxy", 1);
app.use(express.json({ limit: "2mb" }));

// ─── Shared Helpers ───────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Blogs ────────────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(__dirname, "content", "blogs");

const previewStore = {
  content: null,  // parsed HTML
  meta: null,     // frontmatter data
  slug: null,     // auto-generated slug
  storedAt: null, // timestamp
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

// GET /api/blogs/featured — get all featured blogs
app.get("/api/blogs/featured", (req, res) => {
  try {
    const blogs = getBlogs();
    const featured = blogs.filter(
      (b) => b.featured === true || b.featured === "true"
    );

    if (featured.length === 0) {
      return res.status(404).json({ error: "No featured blogs found" });
    }

    res.json(featured);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load featured blogs" });
  }
});

// GET /api/blogs/recent — return the 3 most recently published blogs
// NOTE: must be defined before /api/blogs/:slug so Express doesn't
// treat "recent" as a slug parameter.
app.get("/api/blogs/recent", (req, res) => {
  try {
    const blogs = getBlogs();

    const recent = blogs
      .filter((b) => b.publishedAt)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);


    if (recent.length === 0) {
      return res.status(404).json({ error: "No published blogs found" });
    }

    res.json(recent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load recent blogs" });
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

// ─── Case Studies ─────────────────────────────────────────────────────────────

const CASE_STUDY_DIR = path.join(__dirname, "content", "caseStudies");

/**
 * caseStudyCache maps slug → { data, mtime }
 *   data  — the full parsed CaseStudy object with slug injected
 *   mtime — last-modified time of the source file (ms), used for invalidation
 */
const caseStudyCache = new Map();

/**
 * Reads and parses a single .json file.
 * Returns { slug, data } or throws on malformed JSON / missing title.
 */
function parseCaseStudyFile(filename) {
  const filePath = path.join(CASE_STUDY_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  if (!data.title) {
    throw new Error(`Case study file "${filename}" is missing a required "title" field.`);
  }

  const slug = slugify(data.title);
  return { slug, data: { ...data, slug } };
}

/**
 * Builds a fresh slug → { data, mtime } map from all .json files in the dir.
 * Called on first request and whenever a change is detected.
 */
function buildCaseStudyCache() {
  caseStudyCache.clear();

  const files = fs.readdirSync(CASE_STUDY_DIR).filter((f) => f.endsWith(".json"));

  for (const filename of files) {
    const filePath = path.join(CASE_STUDY_DIR, filename);

    try {
      const { mtime } = fs.statSync(filePath);
      const { slug, data } = parseCaseStudyFile(filename);
      caseStudyCache.set(slug, { data, mtime: mtime.getTime() });
    } catch (err) {
      console.error(`[case-studies] Skipping "${filename}": ${err.message}`);
    }
  }
}

/**
 * Checks every cached file's mtime against disk.
 * Also detects new files (present on disk but not in cache) and
 * deleted files (in cache but no longer on disk).
 * Returns true if anything changed.
 */
function isCaseStudyCacheStale() {
  let diskFiles;
  try {
    diskFiles = fs.readdirSync(CASE_STUDY_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return false; // directory gone — don't crash, just serve stale
  }

  const diskSet = new Set();

  for (const filename of diskFiles) {
    const filePath = path.join(CASE_STUDY_DIR, filename);

    try {
      const { mtime } = fs.statSync(filePath);
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);
      if (!data.title) continue;

      const slug = slugify(data.title);
      diskSet.add(slug);

      const cached = caseStudyCache.get(slug);
      if (!cached || cached.mtime !== mtime.getTime()) return true;
    } catch {
      return true; // unreadable / malformed — treat as changed
    }
  }

  // Check for deleted files
  for (const slug of caseStudyCache.keys()) {
    if (!diskSet.has(slug)) return true;
  }

  return false;
}

/**
 * Ensures the cache is fresh before serving any request.
 * Rebuilds if empty or stale.
 */
function ensureFreshCaseStudyCache() {
  if (caseStudyCache.size === 0 || isCaseStudyCacheStale()) {
    buildCaseStudyCache();
  }
}

// Shared summary shape for case study list responses
function caseStudySummary(data) {
  return {
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle,
    client: data.client,
    industry: data.industry,
    timeline: data.timeline,
    platform: data.platform,
    heroImage: data.heroImage,
    role: data.role,
    featured: data.featured || false,
    publishedAt: data.publishedAt,
  };
}

// GET /api/case-studies — list all case studies (summary fields only)
app.get("/api/case-studies", (req, res) => {
  try {
    ensureFreshCaseStudyCache();

    const list = Array.from(caseStudyCache.values()).map(({ data }) =>
      caseStudySummary(data)
    );

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load case studies" });
  }
});

// GET /api/case-studies/featured — list all featured case studies
// NOTE: must be defined before /api/case-studies/:slug so Express doesn't
// treat "featured" as a slug parameter.
app.get("/api/case-studies/featured", (req, res) => {
  try {
    ensureFreshCaseStudyCache();

    const list = Array.from(caseStudyCache.values())
      .filter(({ data }) => data.featured === true || data.featured === "true")
      .map(({ data }) => caseStudySummary(data));

    if (list.length === 0) {
      return res.status(404).json({ error: "No featured case studies found" });
    }

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load featured case studies" });
  }
});

// GET /api/case-studies/:slug — full case study detail
app.get("/api/case-studies/:slug", (req, res) => {
  try {
    ensureFreshCaseStudyCache();

    const { slug } = req.params;
    const entry = caseStudyCache.get(slug);

    if (!entry) {
      return res.status(404).json({ error: "Case study not found" });
    }

    res.json(entry.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch case study" });
  }
});
// ─── Forms Submission ────────────────────────────────────────────────────────


// ─── Attachment config ────────────────────────────────────────────────────────

const MAX_ATTACHMENT_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB per file
const MAX_ATTACHMENTS = 5;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "text/plain",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

// Multer: store uploads in memory so we can attach them to emails directly.
// Files exceeding the size limit are rejected before reaching the route handler.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_ATTACHMENT_SIZE_BYTES,
    files: MAX_ATTACHMENTS,
  },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type "${file.mimetype}" is not allowed.`));
    }
  },
});

// ─── Email adapters ───────────────────────────────────────────────────────────
// To swap providers, replace `activeMailer` with a different adapter.
// Each adapter must implement: sendFormEmail({ formId, fields, submittedAt, attachments, recipientEmail })
// `attachments` is an array of multer file objects (may be empty).

const smtpMailer = {
  name: "smtp",
  async sendFormEmail({ formId, fields, submittedAt, attachments = [], recipientEmail }) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE, // true for 465, false for 587
      family: 4,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fieldLines = Object.entries(fields)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    // Map multer file objects → nodemailer attachment format
    const emailAttachments = attachments.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));

    await transporter.sendMail({
      from: `"Attributics Forms" <${process.env.SMTP_FROM}>`,
      to: recipientEmail,
      subject: `New ${formId} submission`,
      text: `New submission from form: ${formId}\nSubmitted at: ${submittedAt}\n\n${fieldLines}`,
      html: buildEmailHtml(formId, fields, submittedAt, attachments),
      attachments: emailAttachments,
    });
  },
};


// Swap this to resendMailer, postmarkMailer, etc. when ready
const activeMailer = smtpMailer;

// ─── Email HTML builder ───────────────────────────────────────────────────────

function buildEmailHtml(formId, fields, submittedAt, attachments = []) {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 16px;background:#f8f8f8;border-radius:6px;font-weight:600;color:#555;font-size:13px;text-transform:capitalize;white-space:nowrap">${k}</td>
        <td style="padding:10px 16px;color:#111;font-size:14px">${String(v).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("<tr><td colspan='2' style='height:6px'></td></tr>");

  const attachmentSection =
    attachments.length > 0
      ? `
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#888">
          Attachments (${attachments.length})
        </p>
        <ul style="margin:0;padding:0;list-style:none">
          ${attachments
            .map(
              (f) => `
            <li style="padding:6px 0;font-size:13px;color:#555">
              📎 ${f.originalname}
              <span style="color:#aaa;font-size:11px;margin-left:8px">${(f.size / 1024).toFixed(1)} KB · ${f.mimetype}</span>
            </li>`
            )
            .join("")}
        </ul>
      </div>`
      : "";

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff">
      <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #FF5A36">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#FF5A36">Attributics</p>
        <h1 style="margin:6px 0 0;font-size:20px;color:#111">New <strong>${formId}</strong> submission</h1>
      </div>
      <table style="width:100%;border-collapse:separate;border-spacing:0 4px">
        ${rows}
      </table>
      ${attachmentSection}
      <p style="margin-top:32px;font-size:11px;color:#aaa">Submitted at ${submittedAt}</p>
      <p style="margin-top:32px;font-size:15px;color:#aaa">All attachments are unverified. Please be aware of fishing attacks.</p>
    </div>
  `;
}

// ─── Rate limiter ─────────────────────────────────────────────────────────────

const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUBMISSIONS_DIR = path.join(process.cwd(), "submissions");
const FORM_RECIPIENTS = {
  career: process.env.FORMS_CAREER_RECIPIENT,
  audit: process.env.FORMS_AUDIT_RECIPIENT,
};

function ensureFormDir(formId) {
  const dir = path.join(SUBMISSIONS_DIR, formId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function saveSubmission(formId, data, attachments = []) {
  const dir = ensureFormDir(formId);
  const timestamp = Date.now();

  // Save metadata JSON (same as before, with attachment filenames recorded)
  const meta = {
    ...data,
    attachments: attachments.map((f) => ({
      originalname: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
      savedAs: `${timestamp}_${f.originalname}`,
    })),
  };
  fs.writeFileSync(path.join(dir, `${timestamp}.json`), JSON.stringify(meta, null, 2));

  // Save each attachment buffer to disk alongside the JSON
  for (const file of attachments) {
    fs.writeFileSync(path.join(dir, `${timestamp}_${file.originalname}`), file.buffer);
  }
}

// ─── Multer error handler ─────────────────────────────────────────────────────

function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: `Attachment exceeds the 2 MB size limit.` });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ error: `Too many attachments (max ${MAX_ATTACHMENTS}).` });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    // fileFilter rejections land here
    return res.status(400).json({ error: err.message });
  }
  next();
}

// ─── Route ────────────────────────────────────────────────────────────────────

app.use("/api/forms", formLimiter);

app.post(
  "/api/forms/:formId",
  upload.any(),
  handleMulterError,
  async (req, res) => {
    try {
      const { formId } = req.params;
      const { _honeypot, ...fields } = req.body;
      const attachments = req.files ?? [];
      const recipientEmail = FORM_RECIPIENTS[formId];

      if (!recipientEmail) {
        console.log(`[forms] unknown formId rejected → ${formId}`);
        return res.status(404).json({ error: "Unknown form id." });
      }

      console.log(`[forms] incoming submission → formId=${formId}`);
      console.log(`[forms] ip=${req.ip}`);
      console.log(`[forms] fields received:`, Object.keys(fields));
      console.log(
        `[forms] attachments:`,
        attachments.map((f) => f.originalname)
      );

      // Honeypot
      if (_honeypot) {
        console.log("[forms] honeypot triggered — likely bot");
        return res.json({ success: true });
      }

      // Payload checks
      if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
        console.log("[forms] invalid payload structure");
        return res.status(400).json({ error: "Invalid payload." });
      }

      if (Object.keys(fields).length === 0 && attachments.length === 0) {
        console.log("[forms] empty submission");
        return res
          .status(400)
          .json({ error: "No fields or attachments provided." });
      }

      if (Object.keys(fields).length > 20) {
        console.log("[forms] too many fields");
        return res.status(400).json({ error: "Too many fields." });
      }

      for (const key of Object.keys(fields)) {
        if (String(fields[key]).length > 2000) {
          console.log(`[forms] field too large → ${key}`);
          return res
            .status(400)
            .json({ error: `Field "${key}" exceeds maximum length.` });
        }
      }

      const submittedAt = new Date().toISOString();

      const submission = {
        formId,
        fields,
        ip: req.ip,
        userAgent: req.headers["user-agent"] || null,
        submittedAt,
      };

      console.log(`[forms] saving submission → ${formId}`);
      saveSubmission(formId, submission, attachments);

      // EMAIL DEBUGGING
      console.log(`[forms] attempting to send email → ${formId}`);

      activeMailer
        .sendFormEmail({
          formId,
          fields,
          submittedAt,
          attachments,
          recipientEmail,
        })
        .then((result) => {
          console.log(`[forms] email sent successfully → ${formId}`);
          console.log(`[forms] mailer response:`, result);
        })
        .catch((err) => {
          console.error(`[forms] email failed → ${formId}`);
          console.error(`[forms] reason:`, err);
        });

      console.log(
        `[forms] submission accepted → ${formId} | fields=${Object.keys(fields).length} | attachments=${attachments.length}`
      );

      res.json({ success: true });

    } catch (err) {
      console.error("[forms] fatal error:", err);
      res.status(500).json({ error: "Failed to submit form." });
    }
  }
);

// ─── Start ────────────────────────────────────────────────────────────────────
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
