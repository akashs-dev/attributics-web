import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProblemCard from "./ProblemCard";
import { features } from "../../../constants/home";
import Block from "../../../components/layout/Block";
import {
  StepIndicator2Style1,
  StepIndicator2Style2,
  StepIndicator2Style3,
} from "./Indicators";

gsap.registerPlugin(ScrollTrigger);

const featuresTitleSize = "clamp(2.4rem, 1.2rem + 3.8vw, 4.2rem)";

// ─── Breakpoint hook ──────────────────────────────────────────────────────────
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
};

// ─── Mobile / tablet layout (no scroll-pin) ──────────────────────────────────
const MobileLayout = ({ problems }) => (
  <section className="py-12 sm:py-16">
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 sm:mb-12 px-1">
        <span className="block section-eyebrow mb-4 sm:mb-5">{features.eyebrow}</span>
        <h2
          className="section-title"
          style={{ fontSize: featuresTitleSize, fontWeight: 600, lineHeight: 1.1 }}
        >
          {features.headline}{" "}
          <span className="highlight">{features.highlighted}</span>
        </h2>
        <p
          className="mt-4 section-description"
        >
          {features.description}
        </p>
      </div>

      {/* Stacked cards */}
      <div className="flex flex-col gap-5 sm:gap-7">
        {problems.map((item, i) => (
          <div key={item.id}>
            <ProblemCard data={item} isActive={true} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Desktop layout (scroll-pinned) ──────────────────────────────────────────
const DesktopLayout = ({ problems }) => {
  const sectionRef = useRef(null);
  const panelWrapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const N = problems.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const SLACK = 0.3;
      const totalScreens = SLACK + (N - 1) + SLACK;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0,
          start: "top top",
          end: () => `+=${window.innerHeight * totalScreens}`,
          onUpdate: (self) => {
            const slackFrac = SLACK / totalScreens;
            const inner = Math.max(
              0,
              Math.min(
                1,
                (self.progress - slackFrac) / (1 - 2 * slackFrac)
              )
            );
            setActiveIndex(Math.min(N - 1, Math.floor(inner * N)));
          },
        },
      });

      tl.clear();
      tl.set({}, {}, 0)
        .to(
          panelWrapRef.current,
          {
            yPercent: -((N - 1) / N) * 100,
            ease: "none",
            duration: (N - 1) / totalScreens,
          },
          SLACK / totalScreens
        )
        .set({}, {}, 1);
    }, sectionRef);

    return () => ctx.revert();
  }, [N]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative h-screen flex items-center">
        <div className="container w-full flex mx-auto ">
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 4vw, 5rem)",
              alignItems: "center",
            }}
          >
            {/* ── LEFT: static ── */}
            <div className="shrink-0">
              <span className="block section-eyebrow mb-5 lg:mb-7">
                {features.eyebrow}
              </span>
              <h2
                className="section-title"
                style={{
                  fontSize: featuresTitleSize,
                  fontWeight: 600,
                  lineHeight: 1.1,
                }}
              >
                {features.headline}{" "}
                <br />
                <span className="highlight">{features.highlighted}</span>
              </h2>
              <p
                className="mt-5 section-description"
              >
                {features.description}
              </p>

              <StepIndicator2Style1
                problems={problems}
                activeIndex={activeIndex}
              />
            </div>

            {/* ── RIGHT: sliding card strip ── */}
            <div
              className="w-full z-10 flex justify-end"
              style={{
                height: "75vh",
                padding: "clamp(1rem, 2vw, 2.5rem)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)",
                overflow: "hidden",
              }}
            >
              <div
                ref={panelWrapRef}
                className="flex flex-col items-end"
                style={{ height: `${N * 100}%`, width: "100%" }}
              >
                {problems.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-end ml-auto"
                    style={{ height: `${100 / N}%`, width: "100%" }}
                  >
                    <div className="ml-auto">
                      <ProblemCard data={item} isActive={activeIndex === i} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const ProblemSolution = () => {
  const isDesktop = useIsDesktop();
  const problems = features.problems;

  return (
    <Block xpad="large">
      {isDesktop ? (
        <DesktopLayout problems={problems} />
      ) : (
        <MobileLayout problems={problems} />
      )}
    </Block>
  );
};

export default ProblemSolution;
