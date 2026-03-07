import { useState, useMemo, useEffect } from 'react';
import Block from '../../../components/layout/Block/Block';
import { motion, AnimatePresence } from 'motion/react';

import {
    sortBlogs,
    filterBlogs,
    searchBlogs
} from "../blogs";

const API_URL = import.meta.env.VITE_API_URL;

const Local = () => {
    const [localBlogs, setLocalBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadLocalBlogs() {
            try {
                const res = await fetch(`${API_URL}/api/blogs`);
                const data = await res.json();

                console.log(data);
    
                setLocalBlogs(data.map(blog => ({
                    ...blog,
                    title: blog.title || "",
                    description: blog.subtitle || "",
                    category: blog.category || "General",
                    type: "blog",
                })));
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        }
    
        loadLocalBlogs();
    }, []);

    const allResources = useMemo(() => {
        return sortBlogs(localBlogs);
    }, [localBlogs]);

    const filters = useMemo(() => {
        const set = new Set();
    
        allResources.forEach((blog) => {
            if (blog.category && blog.category !== "General") {
                set.add(blog.category);
            }
        });
    
        return ["All", ...Array.from(set)];
    }, [allResources]);
    
    // Get the featured item
    const featuredItem = useMemo(() => {
        return allResources.find((item) => item.featured);
    }, [allResources]);

    const filteredResources = useMemo(() => {
        let items = allResources;
    
        items = filterBlogs(items, activeFilter);
        items = searchBlogs(items, searchQuery);
    
        return items.filter(item => item.featured !== true && item.featured !== "true");
    }, [allResources, activeFilter, searchQuery, featuredItem]);
    
    const commonMB = 'lg:pb-10 pb-6'; 

    return (
        <>
            {/* Filters + Search */}
            <Block xpad='large' topMargin='small'>
                <motion.section 
                    className={`${commonMB}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1 
                        className="section-title mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Case Studies
                    </motion.h1>

                    <motion.div 
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2">
                            {filters.map((filter, index) => (
                                <motion.button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-200 cursor-pointer ${
                                        activeFilter === filter
                                            ? 'bg-[#131212] text-white'
                                            : 'bg-[#F5F5F5] text-[#666] hover:bg-[#E8E8E8]'
                                    }`}
                                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {filter}
                                </motion.button>
                            ))}
                        </div>

                        {/* Search */}
                        <motion.div 
                            className="relative w-full sm:w-70"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#D1D5DB] rounded-full focus:outline-none focus:border-[#131212] transition-colors"
                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            </Block>

            <AnimatePresence mode="wait">
                {loading && <ResourcesGridSkeleton key="skeleton" />}
                {!loading && featuredItem && 
                    <>
                        {/* Resources Grid */}
                        <Block xpad='large'>
                            <section className={`${commonMB}`}>
                                {filteredResources.length > 0 ? (
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.08
                                                }
                                            }
                                        }}
                                    >
                                        {filteredResources.map((item, index) => (
                                            <motion.a 
                                                key={`${item.slug}-${index}`}
                                                href={`/resources/${item.slug}`} 
                                                className="group block"
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 }
                                                }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                whileHover={{ y: -4 }}
                                            >
                                                <article className="h-full flex flex-col rounded-[10px] border border-[#E8E8E8] overflow-hidden hover:border-[#C0C0C0] hover:shadow-lg transition-all duration-300">
                                                    {/* Card Image */}
                                                    <div className="relative h-50 overflow-hidden">
                                                        <img
                                                            src={item.heroImage}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                        />
                                                        
                                                        {/* Type Badge */}
                                                        <span
                                                            className="absolute top-3 left-3 px-2.5 py-1 text-[9px] uppercase tracking-widest font-medium rounded-full bg-white/90 backdrop-blur-sm text-[#131212]"
                                                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                                        >
                                                            {item.type === 'blog' ? 'Blog' : 'Case Study'}
                                                        </span>
                                                        {/* Result Badge for Case Studies */}
                                                        {item.result && (
                                                            <span
                                                                className="absolute top-3 right-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.05em] font-semibold rounded-full bg-[#F5614D] text-white"
                                                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                                            >
                                                                {item.result}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="flex-1 flex flex-col p-5">
                                                        {/* Category */}
                                                        <span className="resources-category mb-2">
                                                            {item.category}
                                                        </span>

                                                        {/* Title */}
                                                        <h3 className="resources-title">
                                                            {item.title}
                                                        </h3>

                                                        {/* Description */}
                                                        <p className="resources-description">
                                                            {item.description}
                                                        </p>

                                                        {/* Meta */}
                                                        <div className="resources-meta">
                                                            <span>{featuredItem.author.name}</span>
                                                            <span>•</span>
                                                            <span>{item.publishedAt}</span>
                                                            <span>•</span>
                                                            <span>{item.readTime}</span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        className="text-center py-16"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <p
                                            className="text-lg text-[#999]"
                                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                        >
                                            No resources found matching your criteria.
                                        </p>
                                        <motion.button
                                            onClick={() => {
                                                setActiveFilter('All');
                                                setSearchQuery('');
                                            }}
                                            className="mt-4 text-sm text-[#F5614D] hover:underline cursor-pointer"
                                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Clear filters
                                        </motion.button>
                                    </motion.div>
                                )}
                            </section>
                        </Block>
                    </>
                }
            </AnimatePresence>
        </>
    );
};

const ResourcesGridSkeleton = () => {
    const skeletonItems = Array.from({ length: 3 });
  
    return (
      <Block xpad="large">
        <motion.section 
            className="lg:pb-10 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
            {skeletonItems.map((_, index) => (
              <motion.div
                key={index}
                className="h-full flex flex-col rounded-[10px] border border-[#E8E8E8] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Image Skeleton */}
                <div className="h-50 bg-gray-300" />
  
                {/* Content Skeleton */}
                <div className="flex-1 flex flex-col p-5 space-y-3">
                  <div className="h-3 w-16 bg-gray-300 rounded" /> {/* category */}
                  <div className="h-5 w-3/4 bg-gray-300 rounded" /> {/* title */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded" />
                    <div className="h-4 w-5/6 bg-gray-300 rounded" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                    <div className="h-4 w-10 bg-gray-300 rounded" />
                    <div className="h-4 w-14 bg-gray-300 rounded" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </Block>
    );
};

export default Local;