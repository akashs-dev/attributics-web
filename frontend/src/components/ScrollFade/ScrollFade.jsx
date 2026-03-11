import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ScrollFade = ({
  targetRef,
  fadeSize = 20,
  orientation = "horizontal",
}) => {
  const [showStartFade, setShowStartFade] = useState(false);
  const [showEndFade, setShowEndFade] = useState(false);

  const isHorizontal = orientation === "horizontal";

  const updateFade = () => {
    const el = targetRef?.current;
    if (!el) return;

    if (isHorizontal) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowStartFade(scrollLeft > 4);
      setShowEndFade(scrollLeft + clientWidth < scrollWidth - 4);
    } else {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowStartFade(scrollTop > 4);
      setShowEndFade(scrollTop + clientHeight < scrollHeight - 4);
    }
  };

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    updateFade();
    el.addEventListener("scroll", updateFade);
    window.addEventListener("resize", updateFade);

    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [targetRef]);

  const gradientStart = isHorizontal
    ? `linear-gradient(to right, white, transparent)`
    : `linear-gradient(to bottom, white, transparent)`;

  const gradientEnd = isHorizontal
    ? `linear-gradient(to left, white, transparent)`
    : `linear-gradient(to top, white, transparent)`;

  return (
    <>
      {/* START */}
      <AnimatePresence>
        {showStartFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: gradientStart,
              width: isHorizontal ? fadeSize : "100%",
              height: isHorizontal ? "100%" : fadeSize,
            }}
            className={`pointer-events-none absolute z-20 ${
              isHorizontal ? "left-0 top-0 bottom-0" : "top-0 left-0 right-0"
            }`}
          />
        )}
      </AnimatePresence>

      {/* END */}
      <AnimatePresence>
        {showEndFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: gradientEnd,
              width: isHorizontal ? fadeSize : "100%",
              height: isHorizontal ? "100%" : fadeSize,
            }}
            className={`pointer-events-none absolute z-20 ${
              isHorizontal ? "right-0 top-0 bottom-0" : "bottom-0 left-0 right-0"
            }`}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollFade;