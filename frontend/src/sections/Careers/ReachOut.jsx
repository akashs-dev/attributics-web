import { ArrowRight, Send } from "lucide-react";
import { typography } from "../../constants/global";
import {Sparkles} from "lucide-react";
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ReachOut = () => {
    return (
        <>
            {/* CTA Section */}
            <section className="container mx-auto px-6 max-w-4xl mb-20 text-center">
                <span className="section-eyebrow mb-6 block">
                    WORK WITH US
                </span>
                <h2
                    className="section-title font-display font-extrabold tracking-tight text-slate-900 mb-2"
                    style={typography.title.XXL}
                >
                    Build the <span className="text-[#FF5A36]">Intelligence Layer</span> for Modern Retention.
                </h2>
                <p
                    className="section-description mb-10 max-w-2xl mx-auto"
                    style={typography.desc.Normal}
                >
                    Build high-performance backend systems, APIs, and scalable infrastructure powering enterprise-grade solutions.
                </p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="lg" className="group relative overflow-hidden transition-all hover:pr-12">
                            <p className="section-description relative z-10 flex items-center gap-2" style={{color: 'white'}}>
                                <Send size={18} className="text-brand" />
                                Reach Out To Us
                            </p>
                            <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </>
    );
};

export default ReachOut;
