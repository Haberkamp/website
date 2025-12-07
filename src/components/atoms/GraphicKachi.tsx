import { motion } from "motion/react";

export function GraphicKachi({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {/* Top-left → Center-left */}
      <motion.rect
        initial={false}
        animate={{
          y: isHovered ? 100 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        x="0"
        width="100"
        height="100"
        style={{ fill: "var(--graphic-positive)" }}
      />

      {/* Top-right → Top-center */}
      <motion.rect
        initial={false}
        animate={{
          x: isHovered ? 100 : 200,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        y="0"
        width="100"
        height="100"
        style={{ fill: "var(--graphic-positive)" }}
      />

      {/* Center stays */}
      <rect
        x="100"
        y="100"
        width="100"
        height="100"
        style={{ fill: "var(--graphic-positive)" }}
      />

      {/* Bottom-left → Bottom-center */}
      <motion.rect
        initial={false}
        animate={{
          x: isHovered ? 100 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        y="200"
        width="100"
        height="100"
        style={{ fill: "var(--graphic-positive)" }}
      />

      {/* Bottom-right → Center-right */}
      <motion.rect
        initial={false}
        animate={{
          y: isHovered ? 100 : 200,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        x="200"
        width="100"
        height="100"
        style={{ fill: "var(--graphic-positive)" }}
      />
    </svg>
  );
}

