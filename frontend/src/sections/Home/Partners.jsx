import Block from '../../components/layout/Block';
import { typography } from '../../constants/global';
import { partners } from '../../constants/home';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];
const DUR  = 0.65;
const partnersTitleSize = 'clamp(2.4rem, 1.2rem + 3.8vw, 4.2rem)';

const fadeUp = (delay = 0) => ({
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, amount: 0.25 },
    transition:  { duration: DUR, ease: EASE, delay },
});

// ─── Partners ─────────────────────────────────────────────────────────────────
const Partners = () => {
    return (
        <Block xpad='none'>
            <section className="relative w-full overflow-hidden">

                {/* Grid background */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundColor: 'rgb(244, 240, 240)',
                        backgroundImage: 'linear-gradient(to right, #80808018 1px, transparent 1px), linear-gradient(to bottom, #80808018 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <Block xpad='large'>
                    <div className="relative z-10 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row gap-10 lg:gap-8 xl:gap-16 items-center">

                        {/* ── Left: text ── */}
                        <div className="flex flex-col justify-center w-full lg:w-1/2">
                            <motion.p className="section-eyebrow mb-3 sm:mb-4" {...fadeUp(0)}>
                                {partners.eyebrow}
                            </motion.p>

                            <motion.h2
                                className="section-title mb-3 sm:mb-4"
                                style={typography.title.XXL}
                                {...fadeUp(0.08)}
                            >
                                <span className="highlight">{partners.headline}</span>
                                {" "}{partners.highlighted}
                            </motion.h2>

                            <motion.p
                                className="section-description"
                                style={typography.desc.Normal}
                                {...fadeUp(0.16)}
                            >
                                {partners.description}
                            </motion.p>
                        </div>

                        {/* ── Right: card ── */}
                        <motion.div
                            className="relative flex justify-center isolate w-full lg:w-1/2"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: DUR, ease: EASE, delay: 0.22 }}
                        >
                            <div
                                className="relative w-full flex flex-col items-center justify-center z-30"
                                style={{
                                    borderRadius: 'clamp(1.5rem, 3vw, 3.5rem)',
                                    background: 'rgb(255, 255, 255)',
                                    boxShadow: '0 18px 22px rgba(0,0,0,0.05)',
                                }}
                            >
                                {/* Accent glows */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(ellipse 100% 100% at 10% 15%, rgba(245,97,77,0.35) 0%, transparent 100%)',
                                        borderRadius: 'inherit',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(ellipse 70% 80% at 90% 85%, rgba(150,77,245,0.15) 0%, transparent 100%)',
                                        borderRadius: 'inherit',
                                    }}
                                />

                                <PartnersLogoGrid />
                            </div>
                        </motion.div>

                    </div>
                </Block>
            </section>
        </Block>
    );
};

// ─── Logo grid ────────────────────────────────────────────────────────────────
const PartnersLogoGrid = () => (
    <div className="w-full grid grid-cols-2 flex items-center justify gap-4 sm:gap-6 lg:gap-8 p-5 sm:p-8 lg:p-12">
        {partners.logos.map((logo, i) => {
            const isOddLastLogo =
                partners.logos.length % 2 === 1 && i === partners.logos.length - 1;

            return (
                <motion.div
                    key={i}
                    className={`aspect-[7/3] rounded-2xl sm:rounded-3xl shadow-md flex items-center justify-center z-10 bg-white ${isOddLastLogo ? 'col-span-2 justify-self-center w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(50%-1rem)]' : 'w-full'}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        duration: DUR,
                        ease: EASE,
                        delay: 0.28 + i * 0.06,
                    }}
                    whileHover={{
                        y: -4,
                        boxShadow: '0 12px 28px rgba(0,0,0,0.10)',
                        transition: { duration: 0.25, ease: 'easeOut' },
                    }}
                >
                    <img
                        src={logo}
                        alt={`Partner logo ${i + 1}`}
                        className="object-contain"
                        style={{
                            maxHeight: 'clamp(1.5rem, 3vw, 2.5rem)',
                            maxWidth: '65%',
                        }}
                    />
                </motion.div>
            );
        })}
    </div>
);

export default Partners;
