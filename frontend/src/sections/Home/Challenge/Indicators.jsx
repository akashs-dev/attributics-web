import { motion, AnimatePresence } from "motion/react";

// ─── StepIndicator2 — Style 1 ─────────────────────────────────────────────────
// A shared sliding background pill (layoutId) that glides between badges.
// The smoothest possible feel — one continuous pill moving, not each badge
// independently growing/shrinking.
export const StepIndicator2Style1 = ({ problems, activeIndex }) => (
  <div className="mt-10 flex items-center gap-1">
    {problems.map((p, i) => {
      const isActive = i === activeIndex;
      const isPast = i < activeIndex;

      return (
        <div key={i} className="flex items-center gap-1">
          <div className="relative">
            {/* Sliding background — same layoutId means ONE element moves across */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-[#FF5A36]/10 border border-[#FF5A36]/30"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
            )}

            <div
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 transition-none`}
            >
              {/* Number */}
              <motion.span
                animate={{
                  color: isActive ? "#FF5A36" : isPast ? "#FF5A36" : "#CBD5E1",
                  opacity: isPast ? 0.45 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-[11px] font-bold leading-none tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>

              {/* Label clips in/out via max-width */}
              <motion.span
                animate={{
                  maxWidth: isActive ? 120 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[11px] font-semibold text-[#FF5A36] whitespace-nowrap overflow-hidden leading-none"
                style={{ display: "block" }}
              >
                {p.problem}
              </motion.span>
            </div>
          </div>

          {/* Connector */}
          {i < problems.length - 1 && (
            <motion.div
              className="h-px w-4 rounded-full shrink-0"
              animate={{ backgroundColor: isPast ? "#FF5A36" : "#E2E8F0", opacity: isPast ? 0.5 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>
      );
    })}
  </div>
);


// ─── StepIndicator2 — Style 2 ─────────────────────────────────────────────────
// Minimal dots only — no text at all. A larger glowing dot slides between
// positions via layoutId. Pairs of dots connected by a filling line.
export const StepIndicator2Style2 = ({ problems, activeIndex }) => (
  <div className="mt-10 flex items-center gap-0">
    {problems.map((_, i) => {
      const isActive = i === activeIndex;
      const isPast = i < activeIndex;

      return (
        <div key={i} className="flex items-center">
          {/* Dot */}
          <div className="relative flex items-center justify-center w-5 h-5">
            {/* Glow ring on active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="ring"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "rgba(255,90,54,0.15)" }}
                />
              )}
            </AnimatePresence>

            {/* The dot itself */}
            <motion.div
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? "#FF5A36" : isPast ? "#FF5A36" : "#CBD5E1",
                opacity: isPast ? 0.4 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="rounded-full"
            />
          </div>

          {/* Filling line between dots */}
          {i < problems.length - 1 && (
            <div className="relative w-10 h-px bg-slate-200 mx-0.5">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-[#FF5A36]"
                animate={{ width: isPast ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
);


// ─── StepIndicator2 — Style 3 ─────────────────────────────────────────────────
// Stacked vertical pills — each step is a short vertical bar. The active
// one stretches tall and brightens; past ones are medium; future ones are short
// and dim. Purely abstract, visually distinctive.
export const StepIndicator2Style3 = ({ problems, activeIndex }) => (
  <div className="mt-10 flex items-end gap-1.5">
    {problems.map((_, i) => {
      const isActive = i === activeIndex;
      const isPast = i < activeIndex;

      return (
        <motion.div
          key={i}
          animate={{
            height: isActive ? 32 : isPast ? 16 : 10,
            backgroundColor: isActive ? "#FF5A36" : isPast ? "#FF5A36" : "#E2E8F0",
            opacity: isActive ? 1 : isPast ? 0.4 : 0.6,
            borderRadius: 99,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          style={{ width: 4, borderRadius: 99 }}
        />
      );
    })}
  </div>
);