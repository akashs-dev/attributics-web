import { team } from '../../../constants/about';
import Block from '../../../components/layout/Block';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import WheelGestures from 'embla-carousel-wheel-gestures';

const teamTitleSize = 'clamp(2.4rem, 1.25rem + 3vw, 3.2rem)';
const teamMemberNameSize = 'clamp(1.2rem, 1.06rem + 0.6vw, 1.5rem)';
const teamMemberRoleSize = 'clamp(0.75rem, 0.69rem + 0.22vw, 0.8rem)';

const Team = () => {
    return (
        <Block xpad='large'>
            <section className="bg-white relative">
                <motion.div
                    initial={{ opacity: 0.8, y: 2, x: 0 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.p
                        className="section-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {team.eyebrow}
                    </motion.p>
                    <motion.h1
                        className='section-title'
                        style={{ fontSize: teamTitleSize, fontWeight: 600, lineHeight: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {team.headline}{' '}
                        <span className='highlight'>{team.highlighted}</span>
                    </motion.h1>
                </motion.div>

                <motion.div
                    className='overflow-x-hidden flex h-full mt-6'
                    style={{ '--fade': '0px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <LeadershipTeam teamMembers={team.members} />
                </motion.div>
            </section>
        </Block>
    );
};

function LeadershipTeam({ teamMembers }) {
    const [emblaRef] = useEmblaCarousel(
        {
            align: 'start',
            loop: false,
            dragFree: false,
        },
        [
            Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
            WheelGestures({ forceWheelAxis: 'x', wheelSpeed: 1 }),
        ]
    );

    return (
        <div className="overflow-hidden w-full  mask-fade-x" ref={emblaRef}  style={{"--fade": "10px"}}>
            {/* lt-cards */}
            <div className="flex flex-row gap-4 pb-[32px] pt-[32px]">
                {teamMembers.map((member, idx) => (
                    // lt-card
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="min-w-[280px] md:min-w-[320px] h-[420px] snap-center shrink-0 bg-[#F5F2EB] rounded-[2rem] p-8 flex flex-col relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start z-10 relative">
                            <h3 className="section-title text-slate-900 w-1/2 leading-tight" style={{ fontSize: teamMemberNameSize, fontWeight: 600 }}>
                                {member.name}
                            </h3>
                            <span className="section-eyebrow text-slate-500" style={{ fontSize: teamMemberRoleSize, fontWeight: 600 }}>
                                {member.role}
                            </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 top-20">
                        <img 
                            src={member.img} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-top mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-500"
                            referrerPolicy="no-referrer"
                        />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Team;
