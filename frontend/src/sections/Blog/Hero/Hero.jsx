import { useEffect, useState } from "react";
import Block from "../../../components/layout/Block/Block";

const API_URL = import.meta.env.VITE_API_URL;

// ─── Preview banner ───────────────────────────────────────────────────────────

const PreviewBanner = () => (
  <div style={{
    background: "#fefce8",
    borderBottom: "1px solid #fde68a",
    padding: "10px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#92400e",
    letterSpacing: "0.04em",
    fontFamily: "monospace",
  }}>
    <span style={{ fontSize: "10px" }}>◆</span>
    PREVIEW MODE — this post is not published
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const BlogSection = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${slug}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) return <BlogSkeleton />;
  if (!blog) return null;

  return (
    <>
      {blog._preview && <PreviewBanner />}

      <Block xpad="large" topMargin="small">
        <div className="blog-container">

          <div className="w-full mx-auto flex flex-col items-center">

            {/* HERO IMAGE */}
            {blog.heroImage && (
              <img
                src={blog.heroImage}
                alt={blog.title}
                className="w-full max-h-[26rem] object-cover rounded-[25px] mb-8"
              />
            )}

            {/* CATEGORY */}
            {blog.category && blog.category !== "General" && (
              <span className="section-eyebrow mb-3 px-3 py-1 border border-current rounded-full">
                {blog.category}
              </span>
            )}

            {/* TITLE */}
            <h1 className="section-title mb-3 text-center" style={{fontSize: '2.6rem'}}>
              {blog.title}
            </h1>

            {/* SUBTITLE */}
            {blog.subtitle && (
              <p className="section-description mb-6 text-center max-w-2xl">
                {blog.subtitle}
              </p>
            )}

            {/* DIVIDER */}
            <div className="w-8 h-px bg-current opacity-20 mb-6" />

            {/* META */}
            <div className="flex items-center gap-3 mb-10 flex-wrap justify-center">
              {blog.author?.avatar && (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              )}
              <span className="section-eyebrow">{blog.author?.name}</span>
              {blog.publishedAt && (
                <>
                  <span className="section-eyebrow opacity-30">·</span>
                  <span className="section-eyebrow">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
              {blog.readTime && (
                <>
                  <span className="section-eyebrow opacity-30">·</span>
                  <span className="section-eyebrow">{blog.readTime}</span>
                </>
              )}
            </div>

          </div>

          {/* BODY */}
          <div
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </div>
      </Block>
    </>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const BlogSkeleton = () => (
  <Block xpad="large" topMargin="small">
    <div className="w-full mx-auto flex flex-col items-center animate-pulse">

      {/* HERO IMAGE */}
      <div className="w-full h-[26rem] bg-gray-200 rounded-[25px] mb-8" />

      {/* CATEGORY */}
      <div className="h-5 w-20 bg-gray-200 rounded-full mb-3" />

      {/* TITLE */}
      <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-3" />
      <div className="h-10 w-1/2 bg-gray-200 rounded-lg mb-3" />

      {/* SUBTITLE */}
      <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
      <div className="h-5 w-1/2 bg-gray-200 rounded mb-6" />

      {/* DIVIDER */}
      <div className="w-8 h-px bg-gray-300 mb-6" />

      {/* META */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-7 h-7 rounded-full bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      {/* BODY LINES */}
      <div className="w-full space-y-3">
        {[100, 97, 91, 100, 95, 63, 100, 89, 76, 100, 83, 58].map((w, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

    </div>
  </Block>
);

export default BlogSection;