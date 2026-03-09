import { useState } from 'react';
import Block from '../../../components/layout/Block';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { metrics } from '../../../constants/home';
import { motion } from 'motion/react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay },
});

const metricHeadlineSize = 'clamp(2.4rem, 1.1rem + 3vw, 3rem)';
const metricStatSize = 'clamp(2rem, 1.25rem + 2.8vw, 3.5rem)';
const metricCardTitleSize = 'clamp(1rem, 0.8rem + 1.1vw, 1.5rem)';

const MetricCard = ({
        study,
        index,
        expandedCard,
        setExpandedCard,
        isMobile = false,
    }) => {
        const isExpanded = isMobile || expandedCard === index;
  
    return (
      <div
        onMouseEnter={!isMobile ? () => setExpandedCard(index) : undefined}
        className={`
          relative rounded-md border border-[#747474] bg-white
          overflow-hidden p-2 flex transition-all duration-700 ease-in-out h-70 lg:h-75
          ${isMobile ? 'w-full' : isExpanded ? 'lg:flex-[2]' : 'flex-[1]'}
        `}
      >
        {/* Image */}
        <div
          className="relative rounded-sm overflow-hidden shrink-0 transition-[width] duration-700 ease-in-out"
          style={{
            width: isMobile ? '100px' : isExpanded ? '35%' : '100%'
          }}
        >
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
          />
  
          {/* Overlay (desktop collapsed only) */}
          {!isMobile && (
            <div
              className={`absolute top-0 right-0 bottom-0 left-3/8 bg-white/80 backdrop-blur-md p-3 flex flex-col transition-opacity duration-500`}
              style={{ opacity: isExpanded ? 0 : 1 }}
            >
              <h3 className="section-title"><span className=''>{study.stat}</span></h3>
              <h3 className="section-description mt-1" style={{color: 'black'}}>{study.title}</h3>
            </div>
          )}
        </div>
  
        {/* Content */}
        <div
            className="flex-1 flex flex-col justify-between pl-5 transition-all duration-1000"
            style={{
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? 'translateX(0)' : 'translateX(20px)',
            }}
        >
          <div className="flex flex-col h-full">
            <div>
              <h2 className="section-title" style={{ fontSize: metricStatSize }}>
                <span className="highlight">{study.stat}</span>
              </h2>

              <h2 className="section-title" style={{ fontSize: metricCardTitleSize }}>
                {study.title}
              </h2>

              <p className="content-description mt-2" style={{ color: 'black' }}>
                {study.description}
              </p>
            </div>

            <a className="mt-4" href={study.readMoreLink}>
              <p className="content-title" style={{ color: 'black' }}>
                Read more →
              </p>
            </a>
          </div>
        </div>
        </div>
    );
};
  
const Metrics = () => {
    const [expandedCard, setExpandedCard] = useState(0);

    const [emblaRef] = useEmblaCarousel(
        { 
            align: 'start',
            loop: false,
            dragFree: false,
            breakpoints: {
              '(min-width: 1450px)': {
                slidesToScroll: 3,
              },
            },
        },
        [Autoplay({ delay: 3500, stopOnInteraction: true })]
    );
      
    return (
        <Block xpad='medium'>
        <section id="about" className="h-full w-full flex flex-col">

          {/* Headline */}
          <motion.div
            className="flex-[4] text-center flex justify-center items-center lg:max-w-[60%] mx-auto mb-8"
            {...fadeUp(0)}
          >
            <h2 className='section-title' style={{ fontSize: metricHeadlineSize }}>
              {metrics.headline}{' '}
              <span className="highlight">{metrics.highlightedText}</span>
            </h2>
          </motion.div>

          <div className="flex-[6] w-full flex relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] lg:items-center lg:justify-center pt-12" style={{ '--fade': '15px'}}>

              {/* Mobile carousel */}
              <div ref={emblaRef} className="overflow-hidden lg:hidden">
                  <div className="flex gap-4">
                      {metrics.cards.map((study, index) => (
                      <div key={index} className="flex-[0_0_90%]">
                          <MetricCard study={study} isMobile />
                      </div>
                      ))}
                  </div>
              </div>

              {/* Desktop layout */}
              <motion.div
                className="hidden lg:flex justify-center gap-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                  {metrics.cards.map((study, index) => (
                      <MetricCard
                        key={index}
                        study={study}
                        index={index}
                        expandedCard={expandedCard}
                        setExpandedCard={setExpandedCard}
                      />
                  ))}
              </motion.div>
          </div>
        </section>
        </Block>
    );
};

export default Metrics;
