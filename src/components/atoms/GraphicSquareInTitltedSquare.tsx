import { motion } from "motion/react";

export function GraphicSquareInTitltedSquare({
  isHovered,
}: {
  isHovered: boolean;
}) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        x="50"
        y="50"
        initial={{
          rotate: 45,
        }}
        animate={{
          rotate: isHovered ? 0 : 45,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        width="70.7107"
        height="70.7107"
        style={{
          fill: "var(--graphic-positive)",
          fillOpacity: 1,
          translate: "-50% -50%",
        }}
      />
      <motion.rect
        animate={{
          rotate: isHovered ? 45 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
        x="32.3223"
        y="31.5659"
        width="35.3553"
        height="35.3553"
        style={{ fill: "var(--graphic-negative)", fillOpacity: 1 }}
      />
    </svg>
  );
}
