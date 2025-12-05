import { motion, animate } from "motion/react";
import { TextEffect } from "../atoms/TextEffect";
import { useEffect, useState, useRef } from "react";

export function Hero({
  skipAnimation,
  initialRotation = 0,
}: {
  skipAnimation: boolean;
  initialRotation?: number;
}) {
  const blinkRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);

  const [showButton, setShowButton] = useState(skipAnimation);
  const [animationCompleted, setAnimationCompleted] = useState(skipAnimation);
  const [currentRotation, setCurrentRotation] = useState(initialRotation);
  const animationFrameRef = useRef<number | null>(null);

  const shapes = [ShapeSquare, Checkboard, Triangle, ShapeCircleWithSquare, TiltedSquare, Star];
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const colors = ["#000000", "#EB4D35", "#3679EB", "#7B1AF9", "#43CC27", "#F32A2A", "#000000"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const h = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    setIsMobile(!mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Main animation
  useEffect(() => {
    const blink = blinkRef.current;
    const scale = scaleRef.current;
    const rotate = rotateRef.current;
    if (!blink || !scale || !rotate) return;

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      if (skipAnimation) {
        await animate(blink, { opacity: 1 }, { duration: 0 });
        await animate(scale, { scale: 1 }, { duration: 0 });
        const start = initialRotation % 360;
        animate(rotate, { rotate: [start, start + 360] }, { ease: "linear", duration: 200, repeat: Infinity });
        return;
      }

      // Blink sequence t=0.5,1.0,1.5,2.0,2.5,3.0
      await wait(500);
      await animate(blink, { opacity: 0 }, { duration: 0 });
      await wait(500);
      await animate(blink, { opacity: 1 }, { duration: 0 });
      await wait(500);
      await animate(blink, { opacity: 0 }, { duration: 0 });
      await wait(500);
      await animate(blink, { opacity: 1 }, { duration: 0 });
      await wait(500);
      await animate(blink, { opacity: 0 }, { duration: 0 });
      await wait(500);
      await animate(blink, { opacity: 1 }, { duration: 0 });

      // t=3.0: scale + shape swaps + color swaps (parallel)
      for (let i = 0; i < 6; i++) {
        setTimeout(() => setCurrentShapeIndex((p) => (p + 1) % 6), i * 150);
      }
      for (let i = 0; i < 6; i++) {
        setTimeout(() => setCurrentColorIndex((p) => (p + 1) % 7), i * 200);
      }
      animate(scale, { scale: 1 }, { type: "spring", stiffness: 150, velocity: 0, duration: 1.25 });

      // t=3.9: rotation starts
      await wait(900);
      const start = initialRotation % 360;
      animate(rotate, { rotate: [start, start + 360] }, { ease: "linear", duration: 200, repeat: Infinity });

      // t=6.5: complete
      await wait(2600);
      document.cookie = "watched-animation=true; path=/; max-age=31536000";
      setAnimationCompleted(true);
    };

    run();
  }, [skipAnimation, initialRotation]);

  // Track rotation
  useEffect(() => {
    const el = rotateRef.current;
    if (!el) return;

    const track = () => {
      const t = window.getComputedStyle(el).transform;
      if (t && t !== "none") {
        const m = new DOMMatrix(t);
        const a = Math.atan2(m.b, m.a) * (180 / Math.PI);
        setCurrentRotation(a >= 0 ? a : a + 360);
      }
      animationFrameRef.current = requestAnimationFrame(track);
    };
    animationFrameRef.current = requestAnimationFrame(track);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Rotation cookie
  useEffect(() => {
    const update = () => {
      document.cookie = `rotation=${currentRotation.toFixed(2)}; path=/; max-age=60`;
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [currentRotation]);

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
          className="absolute cursor-pointer top-4 right-4 text-base text-gray-600 hover:text-black transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
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
            : { type: "spring", stiffness: 150, velocity: 0, duration: 1.25, delay: 6.5 }
        }
      >
        <li>
          <a
            href="https://x.com/n_haberkamp"
            className="text-gray-600 hover:text-black text-base transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/nils-haberkamp/"
            className="text-gray-600 hover:text-black text-base transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
          >
            LinkedIn
          </a>
        </li>
      </motion.ul>

      <motion.div className="flex flex-col md:flex-row items-center gap-16 px-4">
        <div ref={blinkRef} aria-hidden="true" className="size-[200px]">
          <div ref={scaleRef} style={{ transform: skipAnimation ? "scale(1)" : "scale(0.1)" }}>
            <div
              ref={rotateRef}
              style={skipAnimation && initialRotation !== 0 ? { transform: `rotate(${initialRotation}deg)` } : undefined}
            >
              {(() => {
                const Shape = shapes[currentShapeIndex];
                return <Shape color={colors[currentColorIndex]} />;
              })()}
            </div>
          </div>
        </div>

        <motion.div
          layout="preserve-aspect"
          transition={{ visualDuration: 0.15, type: "spring", stiffness: 100 }}
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
            animate={isMobile ? { height: "auto", width: 300 } : { width: 300, height: "auto" }}
            transition={skipAnimation ? { duration: 0 } : { ease: "easeInOut", delay: 4.5 }}
            style={{ overflow: showButton ? "visible" : "hidden" }}
          >
            {skipAnimation ? (
              <>
                <p className="text-2xl font-medium text-balance" style={{ width: 300 }}>
                  Hi, I'm Nils.
                </p>
                <p className="text-pretty mt-1" style={{ width: 300 }}>
                  I work at Shopware as a Design Engineer. Where I maintain the Meteor Design System. I love to build
                  user interfaces that look and feel great.
                </p>
              </>
            ) : (
              <>
                <TextEffect delay={4.65} speedReveal={1.5} className="text-2xl font-medium text-balance" style={{ width: 300 }}>
                  Hi, I'm Nils.
                </TextEffect>
                <TextEffect
                  delay={5}
                  speedReveal={6}
                  className="text-pretty mt-1"
                  style={{ width: 300 }}
                  onAnimationComplete={() => setShowButton(true)}
                >
                  I work at Shopware as a Design Engineer. Where I maintain the Meteor Design System. I love to build
                  user interfaces that look and feel great.
                </TextEffect>
              </>
            )}

            {showButton && (
              <motion.a
                initial={{ opacity: skipAnimation ? 1 : 0, y: skipAnimation ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={skipAnimation ? { duration: 0 } : { visualDuration: 0.15, type: "spring", stiffness: 100 }}
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
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill={color} style={{ fill: color, fillOpacity: 1 }} />
    </svg>
  );
}

function ShapeCircleWithSquare({ color }: { color: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM155 49C155 46.7909 153.209 45 151 45H49C46.7909 45 45 46.7909 45 49V151C45 153.209 46.7909 155 49 155H151C153.209 155 155 153.209 155 151V49Z"
        fill={color}
        style={{ fill: color, fillOpacity: 1 }}
      />
    </svg>
  );
}

function Triangle({ color }: { color: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 13L200 187H0L100 13Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
    </svg>
  );
}

function TiltedSquare({ color }: { color: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_308_212)">
        <path d="M100 0L200 100L100 200.001L-0.000488281 100L100 0Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
      </g>
      <defs>
        <clipPath id="clip0_308_212">
          <rect width="200" height="200" fill="white" style={{ fill: "white", fillOpacity: 1 }} />
        </clipPath>
      </defs>
    </svg>
  );
}

function Star({ color }: { color: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M91.3175 6.79954C91.3334 6.74311 91.3414 6.71489 91.3451 6.70182C93.8287 -2.00738 106.171 -2.00738 108.655 6.70182C108.659 6.71489 108.667 6.74311 108.683 6.79954C108.725 6.94825 108.745 7.0226 108.765 7.09241C120.306 47.8439 152.156 79.6943 192.907 91.2346C192.977 91.2544 193.052 91.2753 193.2 91.3173C193.257 91.3332 193.285 91.3411 193.298 91.3448C202.007 93.8284 202.007 106.171 193.298 108.655C193.285 108.659 193.257 108.666 193.2 108.682C193.052 108.724 192.977 108.745 192.907 108.765C152.156 120.305 120.306 152.156 108.765 192.907C108.745 192.977 108.725 193.051 108.683 193.2C108.667 193.257 108.659 193.285 108.655 193.298C106.171 202.007 93.8287 202.007 91.3451 193.298C91.3414 193.285 91.3334 193.257 91.3175 193.2C91.2756 193.051 91.2546 192.977 91.2349 192.907C79.6945 152.156 47.8442 120.305 7.09265 108.765C7.02284 108.745 6.94849 108.724 6.79978 108.682C6.74335 108.666 6.71513 108.659 6.70207 108.655C-2.00713 106.171 -2.00713 93.8284 6.70207 91.3448C6.71513 91.3411 6.74335 91.3332 6.79979 91.3173C6.94849 91.2753 7.02284 91.2544 7.09265 91.2346C47.8442 79.6943 79.6945 47.8439 91.2349 7.09241C91.2546 7.0226 91.2756 6.94825 91.3175 6.79954Z"
        fill={color}
        style={{ fill: color, fillOpacity: 1 }}
      />
    </svg>
  );
}

function Checkboard({ color }: { color: string }) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_308_180)">
        <path d="M0 0H40V40H0V0Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M40 40H80V80H40V40Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M0 80H40V120H0V80Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M40 120H80V160H40V120Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M120 40H160V80H120V40Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M80 80H120V120H80V80Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M0 160H40V200H0V160Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M160 80H200V120H160V80Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M80 0H120V40H80V0Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M120 120H160V160H120V120Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M80 160H120V200H80V160Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M160 0H200V40H160V0Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
        <path d="M160 160H200V200H160V160Z" fill={color} style={{ fill: color, fillOpacity: 1 }} />
      </g>
      <defs>
        <clipPath id="clip0_308_180">
          <rect width="200" height="200" fill="white" style={{ fill: "white", fillOpacity: 1 }} />
        </clipPath>
      </defs>
    </svg>
  );
}
