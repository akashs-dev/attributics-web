import Block from '../../../components/layout/Block';
import { motion } from 'motion/react';
import FlowChart from './FlowChart';
import Metrics from './Metrics';

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
                        className="section-title text-center lg:!text-[2.2rem]"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Sustainable Growth is built on{" "}
                        <span className="highlight">Data</span>,
                        powered by <span className="highlight">Automation</span>,
                        and scaled through{" "}
                        <span className="highlight">Lifecycle Intelligence</span>.
                    </motion.h3>

                    <motion.div
                    className='h-[30vh] w-full flex'
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <FlowChart />
                    </motion.div>
                </div>

                <Metrics />
            </motion.div>
        </section>
        </Block>
    );
};

export default Statement;