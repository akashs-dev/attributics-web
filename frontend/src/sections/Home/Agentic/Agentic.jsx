import Block from '../../../components/layout/Block/Block';
import { agentic } from '../../../constants/home';
import { motion } from 'motion/react';
import { Sparkles, Target, BrainCircuit, Send, LineChart } from "lucide-react";

const agenticHeadlineSize = 'clamp(2.4rem, 1.2rem + 4vw, 4.2rem)';

const Agentic = () => {
    return (
        <Block xpad='none'>
            <FlowSection />
        </Block>
    );
};

const steps = [
    {
      id: 1,
      title: "Strategy & Goals",
      description: "Define your baseline and targets. Set the rules of engagement and budget constraints.",
      tags: ["Revenue +10%", "Who is eligible", "Budget limits"],
      icon: Target,
      orderClass: "order-1 md:order-1",
    },
    {
      id: 2,
      title: "AI Decision Engine",
      description: "The core intelligence that determines the perfect combination of variables for each user.",
      tags: ["1-to-1 AI decision", "Channel, Offer, Time", "Offers Creatives"],
      icon: BrainCircuit,
      orderClass: "order-2 md:order-2",
    },
    {
      id: 3,
      title: "Omnichannel Execution",
      description: "Automated delivery through your existing marketing stack with precision timing.",
      tags: ["Netcore, Braze, MoEngage", "Execution Agent", "Right message, time, channel"],
      icon: Send,
      orderClass: "order-3 md:order-4",
    },
    {
      id: 4,
      title: "Analytics & Feedback",
      description: "Measure real-world performance and feed data back to continuously improve.",
      tags: ["Opens, Clicks, Leads", "AI + Humans", "Real outcomes", "Plan next campaigns"],
      icon: LineChart,
      orderClass: "order-4 md:order-3",
    },
];

const FlowSection = () => {
    return (
      <section style={{backgroundColor: 'rgb(244, 240, 240)'}} className="text-gray-900 font-sans selection:bg-[#FF5A36] selection:text-white py-20 relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
  
        <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          
          {/* Headline Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="section-eyebrow">
              {agentic.eyebrow}
            </h2>
            <h1 className="section-title" style={{ fontSize: agenticHeadlineSize, fontWeight: '600' }}>
              {agentic.headline}
              <br />
              <span className='highlight'>{agentic.highlighted}</span>
            </h1>
            <p className="mt-8 section-description lg:max-w-[60%] mx-auto">
              {agentic.description}
            </p>
          </motion.div>
  
          {/* Flow Section */}
          <div className="relative max-w-4xl mx-auto">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF5A36]/5 blur-[100px] rounded-full pointer-events-none" />
  
            {/* Animated SVG Track (Desktop Only) */}
            <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] z-0 hidden md:block pointer-events-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Base dashed track */}
                <rect 
                  width="100%" 
                  height="100%" 
                  rx="48" 
                  fill="none" 
                  stroke="#E5E7EB" 
                  strokeWidth="2" 
                  strokeDasharray="8 8" 
                />
                
                {/* Animated data packet */}
                <motion.rect 
                  width="100%" 
                  height="100%" 
                  rx="48" 
                  fill="none" 
                  stroke="#FF5A36" 
                  strokeWidth="4" 
                  strokeDasharray="15 85" 
                  pathLength="100" 
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  filter="url(#glow)"
                />
              </svg>
            </div>
  
            {/* Center AI Brain Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1], 
                  filter: [
                    "drop-shadow(0 0 0px rgba(255,90,54,0))", 
                    "drop-shadow(0 0 20px rgba(255,90,54,0.6))", 
                    "drop-shadow(0 0 0px rgba(255,90,54,0))"
                  ] 
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border border-[#FF5A36]/30 animate-ping" style={{ animationDuration: '3s' }} />
                <Sparkles className="w-12 h-12 text-[#FF5A36]" />
              </motion.div>
            </div>
  
            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
              {steps.map((step, index) => {
                // Calculate delay based on the line's position (3s total duration)
                // Top-Left (0) -> Top-Right (1) -> Bottom-Right (2) -> Bottom-Left (3)
                const delays = [0, 0.75, 1.5, 2.25];
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    animate={{
                      borderColor: ["#1f2937", "#FF5A36", "#1f2937", "#1f2937"],
                      boxShadow: [
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
                        "0 0 30px rgba(255, 90, 54, 0.2)", 
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      ]
                    }}
                    transition={{ 
                      opacity: { duration: 0.5, delay: index * 0.1 },
                      y: { duration: 0.5, delay: index * 0.1 },
                      borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.3, 1], delay: delays[index] },
                      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.3, 1], delay: delays[index] }
                    }}
                    className={`bg-[#0A0A0A] rounded-[2rem] p-6 md:p-8 shadow-2xl border border-gray-800 flex flex-col h-full transition-colors duration-300 ${step.orderClass}`}
                  >
                    <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center mb-6 border border-gray-700/50">
                      <step.icon className="w-7 h-7 text-[#FF5A36]" />
                    </div>
                    
                    <h3 className="section-title mb-3" style={{color: 'white', fontSize: '1.6rem'}}>{step.title}</h3>
                    <p className="content-description mb-6 flex-grow" style={{color: 'grey', fontSize: '1rem'}}>{step.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {step.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2.5 py-1 bg-gray-800/80 content-description rounded-lg border border-gray-700/50"
                          style={{color: 'grey', fontSize: '0.8rem'}}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
  
          </div>
        </div>
      </section>
    );
};
  

export default Agentic;
