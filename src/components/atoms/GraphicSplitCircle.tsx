import { motion } from "motion/react";

export function GraphicSplitCircle({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate={{
          y: isHovered ? -12.5 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M50 50C22.3858 50 0 72.3858 0 100H100C100 72.3858 77.6142 50 50 50Z"
        style={{
          fill: "var(--graphic-positive)",
          fillOpacity: 1,
        }}
      />

      <motion.path
        animate={{
          y: isHovered ? 12.5 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M50 50C77.6142 50 100 27.6142 100 0H0C0 27.6142 22.3858 50 50 50Z"
        style={{
          fill: "var(--graphic-positive)",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}
