import {vision} from '../../constants/about';
import Block from '../../components/layout/Block';
import { motion } from 'motion/react';
import { typography } from '../../constants/global';

const introTitleSize = 'clamp(2.4rem, 1.2rem + 3.8vw, 4.2rem)';

const Intro = () => {
    return (
        <Block xpad='large' topMargin='medium'>
        <section id="about" className='h-full w-full'>
            {/* WHO ARE WE */}
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16 items-stretch">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl self-center"
                >
                    <span className="section-eyebrow mb-4 sm:mb-5 lg:mb-6 block">
                        {vision.whoAreWe.eyebrow}
                    </span>
                    <h1 className="mb-4 section-title" style={typography.title.XXL}>
                        {vision.whoAreWe.headline}
                        <br />
                        <span className="highlight">{vision.whoAreWe.highlightedText}</span>
                    </h1>
                    <div className='text-justify flex flex-col'>
                        {vision.whoAreWe.description.map((item, idx) => (
                            <motion.p 
                                key={idx} 
                                className="section-description mb-4 sm:mb-5 lg:mb-6"
                                style={typography.desc.Small}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + (idx * 0.05) }}
                            >
                                {item}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="items-center justify-center flex relative rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl h-full min-h-[240px]"
                >
                    <img 
                        src={vision.whoAreWe.image}
                        alt="Attributics Team" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                    />
                </motion.div>
            </div>
        </section>
        </Block>
    );
};

export default Intro;
