import Block from "../../../components/layout/Block";
import { getstarted } from "../../../constants/about";
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const getStartedTitleSize = 'clamp(2.2rem, 1.2rem + 3vw, 3rem)';

const GetStarted = () => {
    return (
        <Block xpad='large'>
            <AuditCTA />
        </Block>
    )
};

const AuditCTA = () => {
    return (
        <section className="w-full">
            <motion.div
                className="
                    border
                    border-[#CFCFCF]
                    rounded-[30px] sm:rounded-[40px] lg:rounded-[55px]
                    px-5 py-8
                    sm:px-10 sm:py-12
                    lg:px-32 lg:py-20
                    flex
                    flex-col
                    gap-5 sm:gap-6
                    items-center
                    text-center
                    relative
                    shadow-[0_22px_52px_-12px_rgba(0,0,0,0.08)]
                    sm:max-w-[80vw] lg:max-w-[50vw]
                    mx-auto
                "
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="w-full flex relative flex-col text-center">
                    <motion.p
                        className="section-eyebrow mb-3 sm:mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {getstarted.eyebrow}
                    </motion.p>

                    <motion.div
                        className="mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <SwitchingHeadline />
                    </motion.div>

                    <motion.h3
                        className="section-description mt-2 sm:mt-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {getstarted.description}
                    </motion.h3>
                </div>

                {/* CTA Button */}
                <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Link to="/contact">
                        <Button>
                            <p className="section-description" style={{ color: 'white' }}>
                                {getstarted.ctaText}{' '}
                                <span>→</span>
                            </p>
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

const SwitchingHeadline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);
    const measureRef = useRef(null);
    const switchTime = 2500;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % getstarted.highlighted.length);
        }, switchTime);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!measureRef.current) return;

        const widths = getstarted.highlighted.map(word => {
            measureRef.current.textContent = word;
            return measureRef.current.offsetWidth;
        });

        setMaxWidth(Math.max(...widths));
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div>
                <h1 className="section-title text-center" style={{ fontSize: getStartedTitleSize, fontWeight: 600, lineHeight: 1.1 }}>
                    {getstarted.headline[0]}
                    <br />
                    {getstarted.headline[1]}{' '}
                    <span
                        className="inline-block relative text-start"
                        style={{ width: maxWidth > 0 ? `${maxWidth}px` : 'auto' }}
                    >
                        <span
                            key={currentIndex}
                            ref={measureRef}
                            className="switching-word highlight"
                        >
                            {getstarted.highlighted[currentIndex]}.
                        </span>
                    </span>
                </h1>
            </div>

            <style>{`
                @keyframes fadeSlideIn {
                    0%   { opacity: 0; transform: translateY(-20px); }
                    20%  { opacity: 1; transform: translateY(0);     }
                    80%  { opacity: 1; transform: translateY(0);     }
                    100% { opacity: 0; transform: translateY(20px);  }
                }

                .switching-word {
                    animation: fadeSlideIn 3s ease-in-out;
                    display: inline-block;
                    text-align: left;
                    top: 0;
                }
            `}</style>
        </div>
    );
};

export default GetStarted;
