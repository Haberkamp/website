import { motion, useAnimate } from "motion/react";
import { TextEffect } from "../atoms/TextEffect";
import { useEffect, useState, useRef } from "react";
import { Duration } from "duri";

export function Hero({
  skipAnimation,
  initialRotation = 0,
}: {
  skipAnimation: boolean;
  initialRotation?: number;
}) {
  const [showButton, setShowButton] = useState(skipAnimation);
  const [animationCompleted, setAnimationCompleted] = useState(skipAnimation);
  const [blinkScope, blinkAnimate] = useAnimate();
  const [scaleScope, scaleAnimate] = useAnimate();
  const [rotateScope, rotateAnimate] = useAnimate();
  const [currentRotation, setCurrentRotation] = useState(initialRotation);
  const rotationStartTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const shapes = [
    ShapeSquare,
    Checkboard,
    Triangle,
    ShapeCircleWithSquare,
    TiltedSquare,
    Star,
  ];
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const colors = [
    "#000000", // Black (start)
    "#EB4D35",
    "#3679EB",
    "#7B1AF9",
    "#43CC27",
    "#F32A2A",
    "#000000", // Black (end)
  ];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Watch for screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    setIsMobile(!mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Set cookie when animation completes
  useEffect(() => {
    if (skipAnimation) return;

    const animationCompleteTime = Duration.seconds(6.5).toSeconds() * 1000;
    const timer = window.setTimeout(() => {
      document.cookie = "watched-animation=true; path=/; max-age=31536000";
      setAnimationCompleted(true);
    }, animationCompleteTime);

    return () => clearTimeout(timer);
  }, [skipAnimation]);

  // Store rotation value in cookie
  useEffect(() => {
    const updateRotationCookie = () => {
      document.cookie = `rotation=${currentRotation.toFixed(
        2
      )}; path=/; max-age=60`;
    };

    // Update cookie immediately when rotation changes
    updateRotationCookie();

    // Also update cookie periodically to ensure it stays fresh
    const interval = setInterval(updateRotationCookie, 1000);

    return () => clearInterval(interval);
  }, [currentRotation]);

  // Track rotation value using requestAnimationFrame
  useEffect(() => {
    if (!rotateScope.current) return;

    const checkRotation = () => {
      if (rotationStartTimeRef.current === null) {
        // Check if rotation has started by looking at the element's transform
        const element = rotateScope.current as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        const transform = computedStyle.transform;

        if (
          transform &&
          transform !== "none" &&
          transform !== "matrix(1, 0, 0, 1, 0, 0)"
        ) {
          rotationStartTimeRef.current = Date.now();
        } else {
          animationFrameRef.current = requestAnimationFrame(checkRotation);
          return;
        }
      }

      const trackRotation = () => {
        if (!rotateScope.current) return;

        const element = rotateScope.current as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        const transform = computedStyle.transform;

        if (transform && transform !== "none") {
          const matrix = new DOMMatrix(transform);
          const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
          const normalizedAngle = angle >= 0 ? angle : angle + 360;
          setCurrentRotation(normalizedAngle);
        }

        animationFrameRef.current = requestAnimationFrame(trackRotation);
      };

      trackRotation();
    };

    animationFrameRef.current = requestAnimationFrame(checkRotation);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rotateScope]);

  // Blink animation sequence
  useEffect(() => {
    if (!blinkScope.current) return;
    if (skipAnimation) {
      blinkAnimate(blinkScope.current, { opacity: 1 }, { duration: 0 });
      return;
    }

    const timers: number[] = [];
    const blinkSteps = [
      { opacity: 0, time: 0.5 },
      { opacity: 1, time: 1 },
      { opacity: 0, time: 1.5 },
      { opacity: 1, time: 2 },
      { opacity: 0, time: 2.5 },
      { opacity: 1, time: 3 },
    ];

    blinkSteps.forEach((step) => {
      const timer = window.setTimeout(() => {
        blinkAnimate(
          blinkScope.current,
          { opacity: step.opacity },
          { duration: 0 }
        );
      }, step.time * 1000);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [blinkScope, blinkAnimate, skipAnimation]);

  // Scale + shape + color + rotate animation sequence
  useEffect(() => {
    if (!scaleScope.current || !rotateScope.current) return;

    if (skipAnimation) {
      scaleAnimate(scaleScope.current, { scale: 1 }, { duration: 0 });
      setCurrentShapeIndex(0);
      setCurrentColorIndex(0);
      rotationStartTimeRef.current = Date.now();
      const startRotation = initialRotation % 360;
      rotateAnimate(
        rotateScope.current,
        { rotate: [startRotation, startRotation + 360] },
        {
          ease: "linear",
          duration: 200,
          repeat: Infinity,
        }
      );
      return;
    }

    const startDelay = Duration.seconds(3).toSeconds();
    const swapInterval = 0.15;
    const totalSwaps = shapes.length;
    const colorSwapInterval = 0.2;
    const scaleDuration = Duration.seconds(1.25).toSeconds();

    // Scale animation
    const scaleControls = scaleAnimate(
      scaleScope.current,
      { scale: 1 },
      {
        type: "spring",
        stiffness: 150,
        velocity: 0,
        duration: scaleDuration,
        delay: startDelay,
      }
    );

    // Shape swaps using setTimeout coordinated with animation
    const shapeTimers: number[] = [];
    for (let i = 0; i < totalSwaps; i++) {
      const timer = window.setTimeout(() => {
        setCurrentShapeIndex((prev) => (prev + 1) % shapes.length);
      }, (startDelay + i * swapInterval) * 1000);
      shapeTimers.push(timer);
    }

    // Color swaps
    const colorTimers: number[] = [];
    const colorCount = Math.floor(scaleDuration / colorSwapInterval);
    for (let i = 0; i < colorCount; i++) {
      const timer = window.setTimeout(() => {
        setCurrentColorIndex((prev) => (prev + 1) % colors.length);
      }, (startDelay + i * colorSwapInterval) * 1000);
      colorTimers.push(timer);
    }

    // Rotation starts after shape swaps complete
    const rotateStartTime = startDelay + totalSwaps * swapInterval;
    const rotateTimer = window.setTimeout(() => {
      rotationStartTimeRef.current = Date.now();
      const startRotation = initialRotation % 360;
      rotateAnimate(
        rotateScope.current,
        { rotate: [startRotation, startRotation + 360] },
        {
          ease: "linear",
          duration: 200,
          repeat: Infinity,
        }
      );
    }, rotateStartTime * 1000);

    return () => {
      scaleControls.stop();
      shapeTimers.forEach(clearTimeout);
      colorTimers.forEach(clearTimeout);
      clearTimeout(rotateTimer);
    };
  }, [
    scaleScope,
    rotateScope,
    scaleAnimate,
    rotateAnimate,
    shapes.length,
    colors.length,
    skipAnimation,
    initialRotation,
  ]);

  const handleReplay = () => {
    document.cookie = "watched-animation=; path=/; max-age=0";
    document.cookie = "rotation=; path=/; max-age=0";
    window.location.reload();
  };

  return (
    <div className="w-full min-h-screen grid place-items-center">
      {(skipAnimation || animationCompleted) && (
        <motion.button
          onClick={handleReplay}
          initial={{ opacity: skipAnimation ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={skipAnimation ? { duration: 0 } : { duration: 0.3 }}
          className="absolute cursor-pointer top-4 right-4 capped-text-base text-gray-600 hover:text-black transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
        >
          Replay animation
        </motion.button>
      )}

      <motion.ul
        className="flex items-center gap-3 absolute top-4 left-4"
        initial={{ opacity: skipAnimation ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={
          skipAnimation
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 150,
                velocity: 0,
                duration: Duration.seconds(1.25).toSeconds(),
                delay: Duration.seconds(6.5).toSeconds(),
              }
        }
      >
        <li>
          <a
            href="https://x.com/n_haberkamp"
            className="text-gray-600 hover:text-black capped-text-base transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
          >
            Twitter
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/nils-haberkamp/"
            className="text-gray-600 hover:text-black capped-text-base transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2 hover:text-neutral-1200 transition-colors duration-200 ease-out-expo"
          >
            LinkedIn
          </a>
        </li>
      </motion.ul>

      <motion.div className="flex flex-col md:flex-row items-center gap-16 px-4">
        <div ref={blinkScope} aria-hidden="true" className="size-[200px]">
          <div
            ref={scaleScope}
            style={{ transform: skipAnimation ? "scale(1)" : "scale(0.1)" }}
          >
            <div
              ref={rotateScope}
              style={
                skipAnimation && initialRotation !== 0
                  ? { transform: `rotate(${initialRotation}deg)` }
                  : undefined
              }
            >
              {(() => {
                const CurrentShape = shapes[currentShapeIndex];
                return <CurrentShape color={colors[currentColorIndex]} />;
              })()}
            </div>
          </div>
        </div>

        <motion.div
          layout="preserve-aspect"
          transition={{
            visualDuration: Duration.seconds(0.15).toSeconds(),
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.div
            className="max-w-[300px]"
            initial={
              skipAnimation
                ? isMobile
                  ? { height: "auto", width: 300 }
                  : { width: 300, height: "auto" }
                : isMobile
                ? { height: 0, width: 300 }
                : { width: 0, height: "auto" }
            }
            animate={
              isMobile
                ? { height: "auto", width: 300 }
                : { width: 300, height: "auto" }
            }
            transition={
              skipAnimation
                ? { duration: 0 }
                : {
                    ease: "easeInOut",
                    delay: Duration.seconds(4.5).toSeconds(),
                  }
            }
            style={{ overflow: showButton ? "visible" : "hidden" }}
          >
            {skipAnimation ? (
              <>
                <p
                  className="text-2xl font-medium text-balance"
                  style={{ width: 300 }}
                >
                  Hi, I'm Nils.
                </p>
                <p className="text-pretty mt-1" style={{ width: 300 }}>
                  I work at Shopware as a Design Engineer. Where I maintain the
                  Meteor Design System. I love to build user interfaces that
                  look and feel great.
                </p>
              </>
            ) : (
              <>
                <TextEffect
                  delay={Duration.seconds(4.65).toSeconds()}
                  speedReveal={1.5}
                  className="text-2xl font-medium text-balance"
                  style={{ width: 300 }}
                >
                  Hi, I'm Nils.
                </TextEffect>

                <TextEffect
                  delay={Duration.seconds(5).toSeconds()}
                  speedReveal={6}
                  className="text-pretty mt-1"
                  style={{ width: 300 }}
                  onAnimationComplete={() => setShowButton(true)}
                >
                  I work at Shopware as a Design Engineer. Where I maintain the
                  Meteor Design System. I love to build user interfaces that
                  look and feel great.
                </TextEffect>
              </>
            )}

            {showButton && (
              <motion.a
                initial={{
                  opacity: skipAnimation ? 1 : 0,
                  y: skipAnimation ? 0 : 10,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  skipAnimation
                    ? { duration: 0 }
                    : {
                        visualDuration: Duration.seconds(0.15).toSeconds(),
                        type: "spring",
                        stiffness: 100,
                      }
                }
                className="inline-flex items-center ease-out-expo justify-center hover:bg-neutral-600 cursor-pointer transition-colors duration-200 mt-4 bg-black text-white min-h-11 px-6 outline-offset-2 focus-visible:outline-2 outline-red-500"
                href="#projects"
              >
                See my work
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ShapeSquare({ color }: { color: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="200"
        height="200"
        fill={color}
        style={{
          fill: color,
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function ShapeCircleWithSquare({ color }: { color: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM155 49C155 46.7909 153.209 45 151 45H49C46.7909 45 45 46.7909 45 49V151C45 153.209 46.7909 155 49 155H151C153.209 155 155 153.209 155 151V49Z"
        fill={color}
        style={{
          fill: color,
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function Triangle({ color }: { color: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 13L200 187H0L100 13Z"
        fill={color}
        style={{
          fill: color,
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function TiltedSquare({ color }: { color: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_308_212)">
        <path
          d="M100 0L200 100L100 200.001L-0.000488281 100L100 0Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_308_212">
          <rect
            width="200"
            height="200"
            fill="white"
            style={{
              fill: "white",
              fillOpacity: 1,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function Star({ color }: { color: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M91.3175 6.79954C91.3334 6.74311 91.3414 6.71489 91.3451 6.70182C93.8287 -2.00738 106.171 -2.00738 108.655 6.70182C108.659 6.71489 108.667 6.74311 108.683 6.79954C108.725 6.94825 108.745 7.0226 108.765 7.09241C120.306 47.8439 152.156 79.6943 192.907 91.2346C192.977 91.2544 193.052 91.2753 193.2 91.3173C193.257 91.3332 193.285 91.3411 193.298 91.3448C202.007 93.8284 202.007 106.171 193.298 108.655C193.285 108.659 193.257 108.666 193.2 108.682C193.052 108.724 192.977 108.745 192.907 108.765C152.156 120.305 120.306 152.156 108.765 192.907C108.745 192.977 108.725 193.051 108.683 193.2C108.667 193.257 108.659 193.285 108.655 193.298C106.171 202.007 93.8287 202.007 91.3451 193.298C91.3414 193.285 91.3334 193.257 91.3175 193.2C91.2756 193.051 91.2546 192.977 91.2349 192.907C79.6945 152.156 47.8442 120.305 7.09265 108.765C7.02284 108.745 6.94849 108.724 6.79978 108.682C6.74335 108.666 6.71513 108.659 6.70207 108.655C-2.00713 106.171 -2.00713 93.8284 6.70207 91.3448C6.71513 91.3411 6.74335 91.3332 6.79979 91.3173C6.94849 91.2753 7.02284 91.2544 7.09265 91.2346C47.8442 79.6943 79.6945 47.8439 91.2349 7.09241C91.2546 7.0226 91.2756 6.94825 91.3175 6.79954Z"
        fill={color}
        style={{
          fill: color,
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function Checkboard({ color }: { color: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_308_180)">
        <path
          d="M0 0H40V40H0V0Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M40 40H80V80H40V40Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M0 80H40V120H0V80Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M40 120H80V160H40V120Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M120 40H160V80H120V40Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M80 80H120V120H80V80Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M0 160H40V200H0V160Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M160 80H200V120H160V80Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M80 0H120V40H80V0Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M120 120H160V160H120V120Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M80 160H120V200H80V160Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M160 0H200V40H160V0Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
        <path
          d="M160 160H200V200H160V160Z"
          fill={color}
          style={{
            fill: color,
            fillOpacity: 1,
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_308_180">
          <rect
            width="200"
            height="200"
            fill="white"
            style={{
              fill: "white",
              fillOpacity: 1,
            }}
          />
        </clipPath>
      </defs>
    </svg>
  );
}
