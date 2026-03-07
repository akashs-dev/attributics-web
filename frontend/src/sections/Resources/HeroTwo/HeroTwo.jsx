import React, { useState, useEffect } from 'react';
import Block from '../../../components/layout/Block';
import { resourcesData } from '../../../constants/resources';
import { motion, AnimatePresence } from 'motion/react';

const API_URL = import.meta.env.VITE_API_URL || "localhost:5000";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const HeroSkeleton = () => (
    <motion.div
        className="rounded-2xl overflow-hidden animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        {/* Mobile skeleton */}
        <div className="lg:hidden flex flex-col">
            <div className="w-full bg-gray-200" style={{ aspectRatio: '16/9' }} />
            <div className="bg-white p-5 space-y-3">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-300 rounded w-4/5" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="flex items-center gap-2 pt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-300 shrink-0" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-14 bg-gray-200 rounded" />
                </div>
                <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
        </div>

        {/* Desktop skeleton */}
        <div className="hidden lg:block relative bg-gray-200" style={{ minHeight: '560px' }}>
            <div className="absolute top-0 left-0 bg-white rounded-br-2xl p-6 w-[40%] space-y-3">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-300 rounded w-full" />
                <div className="h-6 bg-gray-300 rounded w-4/5" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="absolute bottom-0 right-0 bg-white rounded-tl-2xl p-6 w-[40%] space-y-3">
                <div className="h-6 bg-gray-300 rounded w-full" />
                <div className="h-6 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 shrink-0" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-14 bg-gray-200 rounded" />
                </div>
                <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
        </div>
    </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const HeroTwo = () => {
    const { hero } = resourcesData;

    const [featuredBlog, setFeaturedBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        async function loadFeaturedBlog() {
            try {
                const res = await fetch(`${API_URL}/api/blogs/featured`);
                const data = await res.json();
                setFeaturedBlog(data);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        }
        loadFeaturedBlog();
    }, []);

    useEffect(() => {
        if (!featuredBlog?.heroImage) return;
        const img = new Image();
        img.src = featuredBlog.heroImage;
        img.onload = () => setImageLoaded(true);
    }, [featuredBlog]);

    const showContent = !loading && featuredBlog && imageLoaded;

    return (
        <Block xpad='medium' topMargin='small'>
            <AnimatePresence mode="wait">
                {!showContent ? (
                    <HeroSkeleton key="skeleton" />
                ) : (
                    <motion.div
                        key="content"
                        className="rounded-2xl overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* ── Mobile & Tablet (< lg): stacked ── */}
                        <div className="lg:hidden flex flex-col gap-5 pb-4">
                            {/* Section header */}
                            <motion.div
                                className="flex flex-col gap-2"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="section-eyebrow">{hero.eyebrow}</p>
                                <p style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', fontWeight: 600, lineHeight: 1.15 }}>
                                    {hero.headline}
                                </p>
                                <p className="section-description" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
                                    {hero.description}
                                </p>
                            </motion.div>

                            {/* Featured post */}
                            <motion.div
                                className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="w-full" style={{ aspectRatio: '16/9' }}>
                                    <img
                                        src={featuredBlog.heroImage}
                                        alt={featuredBlog.title}
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </div>

                                <div className="p-5 sm:p-7 flex flex-col gap-3">
                                    <p style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.6rem)', fontWeight: 600, lineHeight: 1.2 }}>
                                        {featuredBlog.title}
                                    </p>
                                    <p className="section-description" style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
                                        {featuredBlog.description}
                                    </p>

                                    <div className="flex items-center gap-2 flex-wrap text-sm text-gray-500">
                                        <img
                                            src={featuredBlog.author.avatar}
                                            alt={featuredBlog.author.name}
                                            className="w-6 h-6 rounded-full object-cover shrink-0"
                                        />
                                        <span className="text-gray-700">{featuredBlog.author.name}</span>
                                        <span className="text-gray-300">•</span>
                                        <span>{featuredBlog.publishedAt}</span>
                                        <span className="text-gray-300">•</span>
                                        <span>{featuredBlog.readTime}</span>
                                    </div>

                                    <a
                                        href={`/resources/${featuredBlog.slug}`}
                                        className="text-sm font-semibold hover:underline self-start"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Desktop (≥ lg): overlay ── */}
                        <div className="hidden lg:block relative" style={{ minHeight: '560px' }}>
                            <img
                                src={featuredBlog.heroImage}
                                alt={featuredBlog.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                            />

                            {/* Top-left: site eyebrow + tagline */}
                            <motion.div
                                className="absolute top-0 left-0 bg-white rounded-br-2xl p-6 xl:p-8 w-[42%] xl:w-[38%]"
                                initial={{ opacity: 0, x: -32 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="section-eyebrow mb-2">{hero.eyebrow}</p>
                                <p className="mb-2" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 600, lineHeight: 1.2 }}>
                                    {hero.headline}
                                </p>
                                <p className="section-description" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>
                                    {hero.description}
                                </p>
                            </motion.div>

                            {/* Bottom-right: blog card */}
                            <motion.div
                                className="absolute bottom-0 right-0 bg-white rounded-tl-2xl p-6 xl:p-8 w-[42%] xl:w-[38%]"
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="mb-2" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.7rem)', fontWeight: 600, lineHeight: 1.2 }}>
                                    {featuredBlog.title}
                                </p>
                                <p className="section-description mb-3" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>
                                    {featuredBlog.description}
                                </p>

                                <div className="flex items-center gap-1.5 flex-wrap mb-3" style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)' }}>
                                    <img
                                        src={featuredBlog.author.avatar}
                                        alt={featuredBlog.author.name}
                                        className="w-5 h-5 rounded-full object-cover shrink-0"
                                    />
                                    <span className="text-gray-700">{featuredBlog.author.name}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">{featuredBlog.publishedAt}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">{featuredBlog.readTime}</span>
                                </div>

                                <a
                                    href={`/resources/${featuredBlog.slug}`}
                                    className="font-semibold hover:underline"
                                    style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)' }}
                                >
                                    Read More →
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Block>
    );
};

export default HeroTwo;