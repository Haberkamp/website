import { motion } from "motion/react";

export function GraphicArrows({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clipArrows">
          <rect width="200" height="200" />
        </clipPath>
      </defs>
      <g clipPath="url(#clipArrows)">
      <motion.g
        animate={{
          y: isHovered ? -100 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
          bounce: 0,
        }}
      >
        <path
          d="M200.001 100L100 0L0 100H100H200.001Z"
          style={{
            fill: "var(--graphic-positive)",
            fillOpacity: 1,
          }}
        />
      </motion.g>

      <motion.g
        animate={{
          y: isHovered ? -100 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
          bounce: 0,
        }}
      >
        <path
          d="M100 100L0 200H200.001L100 100Z"
          style={{
            fill: "var(--graphic-positive)",
            fillOpacity: 1,
          }}
        />
      </motion.g>

      <motion.g
        animate={{
          y: isHovered ? -100 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
          bounce: 0,
        }}
      >
        <path
          d="M200.001 300L100 200L0 300H100H200.001Z"
          style={{
            fill: "var(--graphic-positive)",
            fillOpacity: 1,
          }}
        />
      </motion.g>
      </g>
    </svg>
  );
}

