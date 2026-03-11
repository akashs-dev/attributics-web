import Block from "../../components/layout/Block";
import {careers} from "../../constants/careers";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll';
import { typography } from "../../constants/global";

const cultureTitleSize = "clamp(2.2rem, 1.4rem + 2.6vw, 3.4rem)";
const cultureBodySize = "clamp(1.2rem, 0.85rem + 0.4vw, 1.2rem)";

const Culture = () => {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'start', dragFree: true },
        [AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })]
    );

    const carouselImages = [...careers.carouselImgs, ...careers.carouselImgs];

    return (
        <>
            <Block xpad="medium" topMargin="none">
            {/* Teams/Culture Section */}
            <section className="w-full h-full">
                <div className="text-center mb-16">
                    <h2
                        className="section-title mb-4"
                        style={typography.title.XXL}
                    >
                        Our Teams & <span className="highlight">Culture</span>
                    </h2>
                    <p
                        className="section-description max-w-2xl mx-auto"
                        style={typography.desc.Normal}
                    >
                        Discover the people behind the product. We foster a culture of innovation, collaboration, and continuous learning.
                    </p>
                </div>
        
                <div className="relative w-full flex overflow-hidden group">
                    <div
                        ref={emblaRef}
                        className="embla mask-fade-x"
                        style={{ "--fade": "12px" }}
                    >
                    <div className="embla__container items-center gap-6">
                    {carouselImages.map((img, idx) => (
                        <div 
                            key={idx}
                            className="relative rounded-2xl overflow-hidden h-80 w-[280px] md:w-[400px] flex-shrink-0"
                        >
                            <img src={img} alt="TEAM IMAGE" className="w-full h-full object-cover" />
                        </div>
                    ))}
                    </div>
                    </div>
                </div>
            </section>
            </Block>
        </>
    );
};

export default Culture;
