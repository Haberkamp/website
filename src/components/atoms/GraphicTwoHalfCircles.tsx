import { motion } from "motion/react";

export function GraphicTwoHalfCircles({ isHovered }: { isHovered: boolean }) {
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
          x: isHovered ? -25 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M62.5 89C83.2107 89 100 71.9868 100 51H25C25 71.9868 41.7893 89 62.5 89Z"
        style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
      />
      <motion.path
        animate={{
          x: isHovered ? 25 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        d="M37.5 11C16.7893 11 0 28.0132 0 49H75C75 28.0132 58.2107 11 37.5 11Z"
        style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
      />
    </svg>
  );
}
