import { useEffect, useRef } from "react";
import { LineChart } from "lucide-react";
import { animate, motion, useReducedMotion } from "motion/react";

const cardTitleSize = "clamp(1.25rem, 1.05rem + 0.9vw, 1.6rem)";
const cardBodySize = "clamp(1.1rem, 0.84rem + 0.35vw, 1rem)";
const cardMetaSize = "clamp(0.9rem, 0.69rem + 0.22vw, 0.8rem)";

// ─── Counter ──────────────────────────────────────────────────────────────────
const Counter = ({ from, to, prefix, suffix, start }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const node = nodeRef.current;
    if (!node) return;

    node.textContent = `${prefix}${from}${suffix}`;

    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value)}${suffix}`;
      },
    });
  }, [start]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
};

// ─── Shared animation variants ────────────────────────────────────────────────
const fadeUp = {
  hidden: (delay = 0) => ({
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1], delay: 0 },
  }),
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── ProblemCard ──────────────────────────────────────────────────────────────
const ProblemCard = ({ data, isActive }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={data.id}
      initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
      animate={
        isActive
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: -28, scale: 0.97 }
      }
      transition={
        isActive
          ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.45, ease: [0.4, 0, 1, 1] }
      }
      className="
        w-full
        bg-white
        rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]
        p-5 sm:p-7 lg:p-10
        shadow-[0_15px_40px_rgb(0,0,0,0.1)]
        border border-white
        relative overflow-hidden
      "
    >
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Heading */}
      <motion.h3
        className="section-title mb-3 sm:mb-4 lg:mb-6"
        style={{ fontSize: cardTitleSize, fontWeight: 600, lineHeight: 1.25 }}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0.08}
      >
        {data.problem}
      </motion.h3>

      {/* Body text */}
      <motion.p
        className="content-description mb-5 sm:mb-7 lg:mb-10"
        style={{ fontSize: cardBodySize, lineHeight: 1.4, color: "#666666" }}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0.16}
      >
        {data.solution}
      </motion.p>

      {/* Metric box */}
      <motion.div
        className="
          relative overflow-hidden
          rounded-2xl sm:rounded-3xl
          bg-gradient-to-br from-[#FF5A36]/10 to-transparent
          p-4 sm:p-6 lg:p-7
          border border-[#FF5A36]/20
        "
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0.24}
      >
        <div className="absolute inset-0 bg-[#FF5A36]/5 blur-2xl" />

        <div className="relative z-10 flex flex-row items-center gap-4 justify-between">
          {/* Number + label */}
          <div className="min-w-0">
            <div
              className="font-display font-extrabold text-[#FF5A36] tracking-tighter mb-1 leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              <Counter
                from={0}
                to={data.metricValue}
                prefix={data.metricPrefix}
                suffix={data.metricSuffix}
                start={isActive}
              />
            </div>

            <div
              className="content-description uppercase !text-brand"
              style={{ fontSize: cardMetaSize }}
            >
              {data.metricLabel}
            </div>
          </div>

          {/* Icon bubble */}
          <div
            className="rounded-full bg-white flex items-center justify-center shadow-sm shrink-0"
            style={{ width: "clamp(2.5rem, 4vw, 4rem)", height: "clamp(2.5rem, 4vw, 4rem)" }}
          >
            <LineChart
              className="text-[#FF5A36]"
              style={{ width: "clamp(1.2rem, 2vw, 2rem)", height: "clamp(1.2rem, 2vw, 2rem)" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProblemCard;
