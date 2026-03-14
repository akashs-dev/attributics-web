import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { hero } from "../../constants/services";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";

import AuditModal from "../../sections/Other/FreeAuditModal";

const infoTitleSize = "clamp(1.15rem, 0.95rem + 0.8vw, 1.4rem)";
const infoDescSize = "clamp(1.1rem, 0.95rem + 0.8vw, 1.1rem)";
const infoEyebrowSize = "clamp(1rem, 0.95rem + 0.8vw, 1rem)";
const serviceTitleSize = "clamp(1.6rem, 1.2rem + 1.8vw, 2.4rem)";

const Hero = () => {
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const cardRefs = useRef([]);
    const visibilityRef = useRef(new Map());

    const [isOpen, setIsOpen] = useState(false);
  
    const bgColors = [
      "bg-orange-50",
      "bg-cyan-50",
      "bg-amber-50",
      "bg-blue-50",
      "bg-rose-50"
    ];

    useEffect(() => {
      if (typeof window === "undefined") return;
      const mq = window.matchMedia("(max-width: 767px)");
      const update = () => setIsMobile(mq.matches);
      update();
      if (mq.addEventListener) {
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
      }
      mq.addListener(update);
      return () => mq.removeListener(update);
    }, []);

    useEffect(() => {
      if (!isMobile) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = Number(entry.target.dataset.index);
            if (Number.isNaN(idx)) return;
            visibilityRef.current.set(idx, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          let bestIndex = hoveredIndex;
          let bestRatio = -1;
          for (const [idx, ratio] of visibilityRef.current.entries()) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestIndex = idx;
            }
          }
          if (bestRatio > 0 && bestIndex !== hoveredIndex) {
            setHoveredIndex(bestIndex);
          }
        },
        { threshold: [0.2, 0.4, 0.6, 0.8] }
      );

      cardRefs.current.forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, [isMobile, hoveredIndex]);
  
    return (
      <>
      <Block xpad="none" topMargin="none">
      <div className="min-h-screen pt-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-48 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <svg className="absolute w-full h-full min-w-[1440px]" preserveAspectRatio="none" viewBox="0 0 1440 400">
              <defs>
                <linearGradient id="ribbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5A36" stopOpacity="0.04" />
                  <stop offset="50%" stopColor="#FF5A36" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#FF5A36" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="ribbon2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF5A36" stopOpacity="0.06" />
                  <stop offset="50%" stopColor="#FF5A36" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FF5A36" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <motion.path 
                fill="url(#ribbon1)"
                animate={{
                  d: [
                    "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100 L1440,400 L0,400 Z",
                    "M0,200 C320,0 420,300 720,200 C1020,100 1120,300 1440,200 L1440,400 L0,400 Z",
                    "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100 L1440,400 L0,400 Z"
                  ]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path 
                fill="url(#ribbon2)"
                animate={{
                  d: [
                    "M0,250 C200,100 500,350 800,200 C1100,50 1300,250 1440,150 L1440,400 L0,400 Z",
                    "M0,150 C200,300 500,50 800,150 C1100,250 1300,50 1440,250 L1440,400 L0,400 Z",
                    "M0,250 C200,100 500,350 800,200 C1100,50 1300,250 1440,150 L1440,400 L0,400 Z"
                  ]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path 
                fill="none"
                stroke="rgba(255, 90, 54, 0.2)"
                strokeWidth="1"
                animate={{
                  d: [
                    "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100",
                    "M0,200 C320,0 420,300 720,200 C1020,100 1120,300 1440,200",
                    "M0,100 C320,300 420,0 720,100 C1020,200 1120,0 1440,100"
                  ]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path 
                fill="none"
                stroke="rgba(255, 90, 54, 0.15)"
                strokeWidth="2"
                animate={{
                  d: [
                    "M0,250 C200,100 500,350 800,200 C1100,50 1300,250 1440,150",
                    "M0,150 C200,300 500,50 800,150 C1100,250 1300,50 1440,250",
                    "M0,250 C200,100 500,350 800,200 C1100,50 1300,250 1440,150"
                  ]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>
  
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-title"
              style={typography.title.MAX}
            >
              Our <span className="highlight">Services</span>
            </motion.h1>
          </div>
        </section>
  
        <div className="bg-[#FAFAFA] relative pb-22 border-t border-slate-100">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <section className="relative z-20 -mt-32 mb-12">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {hero.infoCards.map((card, idx) => {
                  const spacingClass =
                    idx === 0
                      ? "pt-0 md:pt-0 md:pr-8"
                      : idx === 1
                      ? "pt-8 md:pt-0 md:px-8"
                      : "pt-8 md:pt-0 md:pl-8";

                  return (
                    <div key={card.id} className={spacingClass}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#FF5A36]" />
                        <span className="text-sm font-bold text-slate-400 section-eyebrow text-center !my-0">{card.eyebrow}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3 section-title" style={{ fontSize: infoTitleSize }}>
                        {card.title}
                      </h3>
                      <p className="!text-slate-500 leading-relaxed section-description" style={{ fontSize: infoDescSize }}>{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
  
        <section className="py-12 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
              {hero.services.map((service, idx) => (
                <div 
                  key={service.id}
                  data-index={idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`border-b border-slate-100 last:border-b-0 transition-colors duration-500 cursor-pointer ${hoveredIndex === idx ? bgColors[idx] : 'bg-white'}`}
                  onMouseEnter={() => {
                    if (!isMobile) setHoveredIndex(idx);
                  }}
                >
                  <div className="px-6 md:px-16 py-8 md:py-14 flex flex-col md:flex-row gap-4 md:gap-24">
                    <div className="text-slate-400 font-mono text-sm md:pt-2 section-eyebrow">
                      0{idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2
                        className="section-title font-display font-medium text-slate-900 mb-3"
                        style={{ fontSize: serviceTitleSize }}
                      >
                        {service.title}
                      </h2>

                      {/* Desktop: wrapping list with dot separators */}
                      <div className="hidden md:flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        {service.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-3" style={{ fontSize: infoEyebrowSize }}>
                            <span>{cap}</span>
                            {i < service.capabilities.length - 1 && (
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Mobile: first capability only */}
                      <div className="flex md:hidden">
                        <span className="text-xs font-medium text-slate-500 bg-slate-90 rounded-full">
                          {service.capabilities[0]}
                        </span>
                       
                      </div>
                      
                      <AnimatePresence>
                        {hoveredIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-8">
                              <p style={{ fontSize: infoDescSize }} className="section-description text-slate-600 leading-relaxed max-w-3xl mb-8">
                                {service.description}
                              </p>


                              <button 
                                onClick={() => setIsOpen(true)}
                                className="border border-slate-900 text-slate-900 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-colors"
                              >
                                Discuss Project
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
      </div>
      <AuditModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Block>
      </>
    );
};



export default Hero;