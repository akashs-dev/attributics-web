import { motion } from "motion/react";
import { Clock } from "lucide-react";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";

const recentsTitleSize = "clamp(2.4rem, 1.35rem + 2.4vw, 3.4rem)";
const recentsBodySize = "clamp(1.2rem, 0.85rem + 0.4vw, 1.2rem)";
const recentsCardTitleSize = "clamp(1.4rem, 1rem + 0.9vw, 1.5rem)";

const recentArticles = [
  {
    id: 1,
    title: "What is a UI Kit? Examples and Why you need one",
    excerpt: "Our documentation for Base Components and Core Elements is now complete.",
    author: "Bessie Cooper",
    date: "Jan 06, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 2,
    title: "Is the Future of Finance Decentralized?",
    excerpt: "Our documentation for Base Components and Core Elements is now complete.",
    author: "Brooklyn Simmons",
    date: "Jan 06, 2024",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 3,
    title: "Fintech Fails and Lessons Learned",
    excerpt: "Our documentation for Base Components and Core Elements is now complete.",
    author: "Leslie Alexander",
    date: "Jan 06, 2024",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
  }
];

const Recents = () => {
    return (
        <section className="bg-[#f7f7f7] pt-24 pb-42 border-t border-slate-100">
        <Block xpad="large" topMargin="none">
        <div className="">
                <div className="mb-16">
                    <h2
                        className="section-title mb-4"
                        style={typography.title.XXL}
                    >
                    Recently <span className="highlight">Added</span>
                    </h2>
                    <p
                        className="section-description"
                        style={typography.desc.Normal}
                    >
                    We provide tips and resources from industry leaders. For real.
                    </p>
                </div>

            <div className="grid md:grid-cols-3 gap-8">
                {recentArticles.map((article, idx) => (
                <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                >
                    <div className="h-48 overflow-hidden">
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    </div>
                    <div className="p-6 md:p-8">
                    <h3
                        className="font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#FF5A36] transition-colors"
                        style={{ fontSize: recentsCardTitleSize }}
                    >
                        {article.title}
                    </h3>
                    <p
                        className="text-slate-500 mb-8 line-clamp-2"
                        style={{ fontSize: recentsBodySize }}
                    >
                        {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                        <img src={article.authorAvatar} alt={article.author} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900" style={{ fontSize: recentsBodySize }}>
                                {article.author}
                            </span>
                            <span className="text-[10px] text-slate-500">Regional Marketing Developer</span>
                        </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#FF5A36]/10 text-[#FF5A36] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        <Clock size={10} />
                        {article.date}
                        </div>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
            </div>
            </Block>
            </section>
    );
};

export default Recents;
