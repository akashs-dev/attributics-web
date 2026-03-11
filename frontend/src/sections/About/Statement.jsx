import Block from '../../components/layout/Block';
import { motion } from 'motion/react';

const statementTitleSize = 'clamp(2.2rem, 1.05rem + 1.5vw, 2.2rem)';

const Statement = () => {
    return (
        <Block xpad='large'>
        <section id="about" className='h-full w-full'>
            {/* STATEMENT */}
            <motion.div 
                className="relative h-auto w-full hyphens-none flex flex-col items-center mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <div className=" mb-12 h-auto flex flex-col items-center lg:max-w-[80%]">
                   
                    <motion.h3
                        className="section-title text-center"
                        style={typography.title.MD}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Sustainable Growth Powered by{' '}
                        <span className="highlight">Data</span> and {' '}
                        <span className="highlight">Automation</span>.
                    </motion.h3>
                </div>

                <Metrics />
            </motion.div>
        </section>
        </Block>
    );
};

import { useState, useEffect, useRef } from 'react';
import { metricCards } from '../../constants/about';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { typography } from '../../constants/global';

const metricValueSize = 'clamp(2rem, 1.25rem + 2.2vw, 3rem)';
const metricUnitSize = 'clamp(1.15rem, 0.95rem + 1vw, 1.8rem)';
const metricLabelSize = 'clamp(1rem, 0.84rem + 0.35vw, 1rem)';
const metricArrowSize = 'clamp(1rem, 0.85rem + 0.55vw, 1.4rem)';

const Metrics = () => {
    const [animatedMetrics, setAnimatedMetrics] = useState(metricCards.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);
    const metricsRef = useRef(null);
    const timersRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    setIsVisible(true);

                    timersRef.current.forEach(clearInterval);
                    timersRef.current = [];

                    setAnimatedMetrics(metricCards.map(() => 0));

                    metricCards.forEach((card, index) => {
                        const steps = 60;
                        const increment = card.metric / steps;
                        let step = 0;

                        const timer = setInterval(() => {
                            step++;
                            setAnimatedMetrics((prev) => {
                                const copy = [...prev];
                                copy[index] = step >= steps ? card.metric : Math.floor(step * increment);
                                return copy;
                            });
                            if (step >= steps) clearInterval(timer);
                        }, 1000 / steps);

                        timersRef.current.push(timer);
                    });
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.3 }
        );

        if (metricsRef.current) observer.observe(metricsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
        <div ref={metricsRef} className="w-full flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center w-full">
                {metricCards.map((card, index) => (
                    <motion.div
                        key={`card-${index}`}
                        className={`z-10 py-4 px-4 sm:px-6 flex flex-col items-center text-center gap-2 ${index % 2 === 0 ? 'border-r border-slate-300' : ''} ${index < metricCards.length - 1 ? 'md:border-r md:border-slate-300' : 'md:border-r-0'}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            ease: "easeOut"
                        }}
                    >
                        <div className="flex items-center justify-center gap-1">
                            <h1 className="section-title" style={{ fontSize: metricValueSize, fontWeight: 600 }}>
                                {animatedMetrics[index]}
                            </h1>
                            <h1 className="section-title" style={{ fontSize: metricUnitSize }}>
                                {card.unit}
                            </h1>
                            <GrowthArrow positive={card.postive} />
                        </div>

                        <p className="section-description" >
                            {card.subheadline}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </>
    );
};

// ─── Arrow using Lucide TrendingUp / TrendingDown ─────────────────────────────
const GrowthArrow = ({ positive = true }) => {
    const Icon = positive ? TrendingUp : TrendingDown;

    return (
        <Icon
            className="shrink-0"
            style={{
                width: metricArrowSize,
                height: metricArrowSize,
                color: positive ? '#10b981' : '#f43f5e',
                strokeWidth: 2.5,
            }}
        />
    );
};

export default Statement;
