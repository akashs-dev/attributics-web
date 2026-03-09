import Block from '../../../components/layout/Block/Block';
import Calendar from '../../../components/Calendar/Calendar';
import { CheckCircle2 } from '../../../components/Icons/Icons';
import { motion } from 'motion/react';
import { cta } from '../../../constants/home';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay },
    }),
};

const ctaTitleSize = 'clamp(2.4rem, 1.2rem + 3.8vw, 4.2rem)';
const ctaChecklistHeadlineSize = 'clamp(0.95rem, 0.84rem + 0.45vw, 1.2rem)';
const ctaChecklistItemSize = 'clamp(0.92rem, 0.84rem + 0.35vw, 1rem)';

const CTA = () => {
    return (
        <Block xpad='large'>
            <section className="grid grid-cols-1 lg:grid-cols-[6fr_8fr] gap-10 sm:gap-12 lg:gap-16 items-center">

                {/* Left: Text */}
                <div className="flex flex-col">
                    <motion.p
                        className="section-eyebrow mb-3 sm:mb-4"
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {cta.eyebrow}
                    </motion.p>

                    <motion.h1
                        className="section-title mb-5 sm:mb-6"
                        style={{ fontSize: ctaTitleSize, fontWeight: 600, lineHeight: 1.1 }}
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {cta.headline}
                        <br />
                        <span className="highlight">{cta.highlighted}</span>
                    </motion.h1>

                    <motion.p
                        className="section-description mb-4"
                        style={{ fontWeight: 600}}
                        variants={fadeUp}
                        custom={0.25}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {cta.checklist.headline}
                    </motion.p>

                    <div
                        className=" flex flex-col gap-3 sm:gap-4"
                    >
                        {cta.checklist.items.map((item, i) => (
                            <motion.span
                                key={i}
                                className="section-description flex flex-row gap-2 items-start"
                                variants={fadeUp}
                                custom={0.3 + i * 0.07}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <CheckCircle2 className="shrink-0 mt-0.5" />
                                {item}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Right: Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full"
                >
                    <Calendar />
                </motion.div>

            </section>
        </Block>
    );
};

export default CTA;
