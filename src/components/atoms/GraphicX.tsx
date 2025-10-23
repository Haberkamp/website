import { motion } from "motion/react";

export function GraphicX({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="100"
        height="100"
        className="transition-colors ease-out-expo duration-200"
        style={{
          fill: "var(--graphic-positive)",
        }}
      />
      <motion.path
        animate={{
          y: isHovered ? 18 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M66.793 99.5H33.207L50 82.707L66.793 99.5Z"
        style={{
          fill: "var(--graphic-negative)",
          stroke: "var(--graphic-negative)",
        }}
      />

      <motion.path
        animate={{
          x: isHovered ? -18 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M0.5 64.793V31.207L17.293 48L0.5 64.793Z"
        style={{
          fill: "var(--graphic-negative)",
          stroke: "var(--graphic-negative)",
        }}
      />

      <motion.path
        animate={{
          y: isHovered ? -18 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M33.207 0.5H66.793L50 17.293L33.207 0.5Z"
        style={{
          fill: "var(--graphic-negative)",
          stroke: "var(--graphic-negative)",
        }}
      />

      <motion.path
        animate={{
          x: isHovered ? 18 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M99.5 33.207V66.793L82.707 50L99.5 33.207Z"
        style={{
          fill: "var(--graphic-negative)",
          stroke: "var(--graphic-negative)",
        }}
      />
    </svg>
  );
}
