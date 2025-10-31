import { motion } from "motion/react";

export function GraphicFlower({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="-8 -8 116 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        clipPath="url(#clip0_332_62)"
        animate={{
          x: isHovered ? -8 : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
      >
        <path
          d="M25 0C38.8071 1.81059e-06 50 11.1929 50 25C50 11.1929 61.1929 -5.85914e-07 75 0H100V25C100 38.8039 88.8124 49.9947 75.0098 50C88.8124 50.0053 100 61.1961 100 75V100H75C61.1929 100 50 88.8071 50 75C50 88.8071 38.8071 100 25 100H0V75C6.03528e-07 61.1929 11.1929 50 25 50C38.8071 50 50 61.1929 50 75C50 61.1961 61.1876 50.0053 74.9902 50C61.1876 49.9947 50 38.8039 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 6.43644e-06 38.8071 0 25V0H25Z"
          fill="black"
          style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
        />
      </motion.g>
      <motion.g
        clipPath="url(#clip1_332_62)"
        animate={{
          x: isHovered ? -8 : 0,
          y: isHovered ? 8 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
      >
        <path
          d="M25 0C38.8071 1.81059e-06 50 11.1929 50 25C50 11.1929 61.1929 -5.85914e-07 75 0H100V25C100 38.8039 88.8124 49.9947 75.0098 50C88.8124 50.0053 100 61.1961 100 75V100H75C61.1929 100 50 88.8071 50 75C50 88.8071 38.8071 100 25 100H0V75C6.03528e-07 61.1929 11.1929 50 25 50C38.8071 50 50 61.1929 50 75C50 61.1961 61.1876 50.0053 74.9902 50C61.1876 49.9947 50 38.8039 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 6.43644e-06 38.8071 0 25V0H25Z"
          fill="black"
          style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
        />
      </motion.g>
      <motion.g
        clipPath="url(#clip2_332_62)"
        animate={{
          x: isHovered ? 8 : 0,
          y: isHovered ? 8 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
      >
        <path
          d="M25 0C38.8071 1.81059e-06 50 11.1929 50 25C50 11.1929 61.1929 -5.85914e-07 75 0H100V25C100 38.8039 88.8124 49.9947 75.0098 50C88.8124 50.0053 100 61.1961 100 75V100H75C61.1929 100 50 88.8071 50 75C50 88.8071 38.8071 100 25 100H0V75C6.03528e-07 61.1929 11.1929 50 25 50C38.8071 50 50 61.1929 50 75C50 61.1961 61.1876 50.0053 74.9902 50C61.1876 49.9947 50 38.8039 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 6.43644e-06 38.8071 0 25V0H25Z"
          fill="black"
          style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
        />
      </motion.g>
      <motion.g
        clipPath="url(#clip3_332_62)"
        animate={{
          x: isHovered ? 8 : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{
          type: "spring",
          bounce: 0,
        }}
      >
        <path
          d="M25 0C38.8071 1.81059e-06 50 11.1929 50 25C50 11.1929 61.1929 -5.85914e-07 75 0H100V25C100 38.8039 88.8124 49.9947 75.0098 50C88.8124 50.0053 100 61.1961 100 75V100H75C61.1929 100 50 88.8071 50 75C50 88.8071 38.8071 100 25 100H0V75C6.03528e-07 61.1929 11.1929 50 25 50C38.8071 50 50 61.1929 50 75C50 61.1961 61.1876 50.0053 74.9902 50C61.1876 49.9947 50 38.8039 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 6.43644e-06 38.8071 0 25V0H25Z"
          fill="black"
          style={{ fill: "var(--graphic-positive)", fillOpacity: 1 }}
        />
      </motion.g>

      <defs>
        <clipPath id="clip0_332_62">
          <rect
            width="50"
            height="50"
            fill="white"
            style={{ fill: "red", fillOpacity: 1 }}
          />
        </clipPath>
        <clipPath id="clip1_332_62">
          <rect
            width="50"
            height="50"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
            transform="translate(0 50)"
          />
        </clipPath>
        <clipPath id="clip2_332_62">
          <rect
            width="50"
            height="50"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
            transform="translate(50 50)"
          />
        </clipPath>
        <clipPath id="clip3_332_62">
          <rect
            width="50"
            height="50"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
            transform="translate(50)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
