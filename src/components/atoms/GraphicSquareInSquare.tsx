import { motion } from "motion/react";

export function GraphicSquareInSquare({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          bounce: 0,
          delay: isHovered ? 0.1 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        width="100"
        height="100"
        style={{
          fill: "var(--graphic-positive)",
          fillOpacity: 1,
        }}
      />
      <motion.rect
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          bounce: 0,
          delay: !isHovered ? 0.1 : 0,
        }}
        className="transition-colors ease-out-expo duration-200"
        x="25"
        y="25"
        width="50"
        height="50"
        style={{
          fill: "var(--graphic-negative)",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}
