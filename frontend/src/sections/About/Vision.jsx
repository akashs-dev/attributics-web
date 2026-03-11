import {vision} from '../../constants/about';
import Block from '../../components/layout/Block';
import { motion } from 'motion/react';
import {CheckCircle} from 'lucide-react';
import { typography } from '../../constants/global';

const visionHeadingSize = 'clamp(2.4rem, 1.12rem + 0.8vw, 2rem)';

const Vision = () => {
    return (
        <Block xpad='large'>
        <section id="about" className='h-full w-full'>
            {/* VISION & MISSION */}
                <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl h-[280px] sm:h-[380px] md:h-[480px] lg:h-[600px] order-2 lg:order-1"
                    >
                        <img 
                            src={vision.vissionMission.image}
                            alt="Team working" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl order-1 lg:order-2  text-justify"
                    >
                        <span
                            className="section-eyebrow mb-4 sm:mb-5 lg:mb-6 block"
                        >
                            {vision.vissionMission.eyebrow}
                        </span>
                        
                        <h3 className="section-title mb-3 sm:mb-4" style={typography.title.LG}>
                            {vision.vissionMission.vision.headline}
                        </h3>
                        <p className="mb-6 sm:mb-8 lg:mb-10 section-description" style={typography.desc.Small}>
                            {vision.vissionMission.vision.description}
                        </p>

                        <h3 className="section-title mb-3 sm:mb-4"  style={typography.title.LG}>
                            {vision.vissionMission.mission.headline}
                        </h3>
                        <p className="section-description mb-4 sm:mb-6"  style={typography.desc.Small}>
                            {vision.vissionMission.mission.description[0]}
                        </p>
                        <p className="section-description mb-4 sm:mb-6"  style={typography.desc.Small}>
                            {vision.vissionMission.mission.description[1]}
                        </p>
                        
                        <ul className="space-y-3 sm:space-y-4">
                        {vision.vissionMission.mission.points.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 sm:gap-3">
                                <CheckCircle className='text-brand shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5' style={{fontWeight: '900'}} />
                                <span className="section-description">{item}</span>
                            </li>
                        ))}
                        </ul>
                    </motion.div>
                </div>
        </section>
        </Block>
    );
};

export default Vision;
