import { motion } from "motion/react";

export function GraphicStar({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        transition={{
          type: "spring",
          bounce: 0,
        }}
        y="80"
        width="200"
        height="40"
        style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
      />

      <motion.rect
        x="120"
        width="200"
        height="40"
        transform="rotate(90 120 0)"
        style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
      />

      <motion.rect
        initial={{ rotate: -45 }}
        animate={{
          rotate: isHovered ? 0 : -45,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        y="100"
        width="200"
        height="40"
        style={{
          fill: "var(--graphic-positive)",
          fillOpacity: 1,
          transformOrigin: "15.1475px 156.568px",
          translateY: "-50%",
        }}
      />

      <motion.rect
        initial={{ rotate: 45 }}
        animate={{
          rotate: isHovered ? 0 : 45,
        }}
        y="100"
        transition={{
          type: "spring",
          bounce: 0,
        }}
        width="200"
        height="40"
        style={{
          fill: "var(--graphic-positive)",
          fillOpacity: 1,
          transformOrigin: "43.4316px 15.147px",
          translateY: "-50%",
        }}
      />
    </svg>
  );
}
