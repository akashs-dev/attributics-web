import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";
import ScrollFade from "../../components/ScrollFade/ScrollFade";
import { useRef } from "react";

const featuredTitleSize = "clamp(2.4rem, 1.4rem + 3vw, 3.4rem)";
const featuredBodySize = "clamp(1.2rem, 0.85rem + 0.45vw, 1.2rem)";
const cardTitleSize = "clamp(1.4rem, 1.1rem + 1.2vw, 2rem)";

const featuredResources = [
  {
    id: 1,
    type: "ARTICLE",
    title: "Understanding the Mobile Delivery Gap",
    action: "Read Article"
  },
  {
    id: 2,
    type: "CASE STUDY",
    title: "Building the new Marketwatch app",
    action: "See the Case Study"
  },
  {
    id: 3,
    type: "ARTICLE",
    title: "The Future of Lifecycle Marketing",
    action: "Read Article"
  },
  {
    id: 4,
    type: "ARTICLE",
    title: "Mastering Customer Retention in 2024",
    action: "Read Article"
  },
  {
    id: 5,
    type: "CASE STUDY",
    title: "AI-Driven Personalization Strategies",
    action: "See the Case Study"
  }
];

const Featured = () => {
    const scrollRef = useRef(null);
    
    return (
        <>
            <Block xpad="medium" topMargin="large">
            <section className="container mb-16">
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
                >
                <h1
                    className="section-title mb-3"
                    style={typography.title.XXL}
                >
                    Resource <span className="highlight">Center</span>
                </h1>
                <p
                    className="section-description "
                    style={typography.desc.Normal}
                >
                    Learn about everything from customer success stories, product info, to viewpoints from the core team.
                </p>
                </motion.div>
            </section>
        
            <section className="container relative">
                <ScrollFade targetRef={scrollRef} fadeSize={32} />
                
                <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {featuredResources.map((resource, idx) => (
                    <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-[300px] md:w-[400px] shrink-0 snap-center relative rounded-[2rem] overflow-hidden h-[320px] group cursor-pointer bg-[#FFF6F4] border border-[#FFE8E2] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                    <div className="relative z-10 p-8 flex flex-col h-full">
                        <span className="section-eyebrow text-xs font-bold tracking-widest uppercase !mb-4 !text-[#FF5A36]">
                            {resource.type}
                        </span>
                        <h3
                            className="section-title font-display font-bold leading-tight mb-auto text-slate-900"
                            style={{ fontSize: cardTitleSize }}
                        >
                            {resource.title}
                        </h3>
                        <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm self-start shadow-sm border border-[#FFE8E2] group-hover:border-[#FF5A36] group-hover:text-[#FF5A36] transition-all duration-300 flex items-center gap-2">
                            {resource.action} <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                    </motion.div>
                ))}
                </div>
            </section>
            </Block>
        </>
    );
};

export default Featured;
