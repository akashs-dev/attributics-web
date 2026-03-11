import { useState, useEffect, useRef } from "react";
import {typography} from '../../constants/global';
import {Sparkles, ArrowRight, TrendingUp} from "lucide-react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

const Hero = () => {
    const [index, setIndex] = useState(0);
    const phrases = [
      "Predict Customer Behavior",
      "Automate Journeys",
      "Optimize Engagement"
    ];
  
    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 3000);
      return () => clearInterval(timer);
    }, []);
  
    const containerRef = useRef(null);
    
    // Track scroll progress based on the window scroll instead of container
    const { scrollY } = useScroll();
  
    // Transform scroll position into parallax movements
    // These will move as the user scrolls down the page
    const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y4 = useTransform(scrollY, [0, 1000], [0, -300]);
  
    return (
      <>
      <Block xpad="none" topMargin="none">
      <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 grid-pattern z-0" />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-brand/35 to-indigo-100/40 animate-gradient" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/10 to-white/100" />
      
        <motion.div 
          style={{ y: y3 }}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-brand/15 rounded-3xl blur-3xl z-0"
        />
        <motion.div 
          style={{ y: y4 }}
          className="absolute bottom-1/4 -right-20 w-128 h-128 bg-indigo-500/3 rounded-full blur-3xl z-0"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-1/2 left-1/3 w-128 h-98 bg-brand/15 rounded-full blur-2xl z-0"
        />
        
        {/* Animated Grid Background (Evolved from original) - Removed dots as requested */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 right-0 h-[60vh] z-0 opacity-10 pointer-events-none overflow-hidden"
        >
          {/* Just a subtle gradient overlay now */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand/5 to-transparent" />
        </motion.div>
  
        <div className=" mx-auto px-6 max-w-5xl text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 !text-brand mb-4"
          >
            <TrendingUp size={18} />
            <p className="section-title uppercase" style={{color: 'var(--color-brand)', fontSize: '1rem'}}>Lifetime Value With Our AI Agent</p>
          </motion.div>
  
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 section-title" style={typography.title.XXL}
          >
            <h1>Autonomous AI Agents that</h1>
            <div className="h-[5.2rem] relative overflow-hidden flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute whitespace-wrap"
                >
                  <span className="highlight">{phrases[index]}</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>
  
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:max-w-[90%] mx-auto mb-12 leading-relaxed"
          >
            <p className="section-description" style={typography.desc.Normal}>
              Improve retention and LTV with real-time decisioning at scale. 
              <br />
              The next generation of martech is agentic.
            </p>
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="lg" className="group relative overflow-hidden transition-all hover:pr-12">
                    <p className="section-description relative z-10 flex items-center gap-2" style={{color: 'white'}}>
                        <Sparkles size={18} className="text-brand" />
                        Run a Free Audit
                    </p>
                    <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                </Button>
            </Link>
          </motion.div>
        </div>

       
      </section>
      </Block>
      <Block xpad="small">
        <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
              <p className="section-eyebrow">
                  {logoCloud.eyebrow}
              </p>

              <div className="w-full overflow-hidden mask-fade-x" style={{ '--fade': '20px', backgroundColor: '' }}
              >
                  {LogoMarqueeRow(logoCloud.clients)}
              </div>
          </div>
        </Block>
      </>
    );
  };

import { logoCloud } from '../../constants/home';
import Block from "../../components/layout/Block";

const renderLogoRow = (row) =>
  row.map((logo, index) => {
      return (
          <div
              key={`logo-${index}`}
              className="flex items-center lg:mx-14 mx-8"
          >
              <img src={logo} alt='' className="h-10 w-auto" />
          </div>
      );
});

const LogoMarqueeRow = (row) => (
  <div className="flex overflow-hidden">
      <div className="flex w-max items-center shrink-0 animate-marquee">
          {renderLogoRow(row)}
          {renderLogoRow(row)}
      </div>
  </div>
);

  
export default Hero;