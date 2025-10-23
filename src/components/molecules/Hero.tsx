import { motion, useMotionValue } from "motion/react";
import { TextEffect } from "../atoms/TextEffect";
import { useEffect, useState } from "react";
import { Duration } from "duri";

export function Hero() {
  const [showButton, setShowButton] = useState(false);
  const blinkOpacity = useMotionValue(1);
  const shapes = [
    ShapeSquare,
    Triangle,
    Star,
    ShapeCircleWithSquare,
    TiltedSquare,
    Checkboard,
  ];
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [shouldRotate, setShouldRotate] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(
      () => blinkOpacity.set(0),
      Duration.seconds(0.5).toMilliseconds()
    );
    const t2 = setTimeout(
      () => blinkOpacity.set(1),
      Duration.seconds(1).toMilliseconds()
    );
    const t3 = setTimeout(
      () => blinkOpacity.set(0),
      Duration.seconds(1.5).toMilliseconds()
    );
    const t4 = setTimeout(
      () => blinkOpacity.set(1),
      Duration.seconds(2).toMilliseconds()
    );
    const t5 = setTimeout(
      () => blinkOpacity.set(0),
      Duration.seconds(2.5).toMilliseconds()
    );
    const t6 = setTimeout(
      () => blinkOpacity.set(1),
      Duration.seconds(3).toMilliseconds()
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  // Swap shapes while the scale animation is running
  useEffect(() => {
    const startDelayMs = Duration.seconds(3).toMilliseconds();
    const scaleDurationMs = Duration.seconds(1.25).toMilliseconds();
    const swapIntervalMs = 150; // tweak as desired

    let intervalId: number | null = null;

    const startTimer = window.setTimeout(() => {
      setCurrentShapeIndex((prev) => (prev + 1) % shapes.length);
      intervalId = window.setInterval(() => {
        setCurrentShapeIndex((prev) => (prev + 1) % shapes.length);
      }, swapIntervalMs);
    }, startDelayMs);

    const stopTimer = window.setTimeout(() => {
      if (intervalId !== null) window.clearInterval(intervalId);
      setShouldRotate(true);
    }, startDelayMs + scaleDurationMs);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(stopTimer);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <motion.div className="flex items-center gap-8" layout>
        <motion.div>
          <motion.div
            aria-hidden="true"
            className="size-[200px]"
            style={{ opacity: blinkOpacity }}
            initial={{ scale: 0.1 }}
            animate={{ scale: [0.1, 1.1, 1] }}
            transition={{
              ease: "easeInOut",
              duration: Duration.seconds(1.25).toSeconds(),
              delay: Duration.seconds(3).toSeconds(),
            }}
          >
            <motion.div
              animate={shouldRotate ? { rotate: 360 } : { rotate: 0 }}
              transition={
                shouldRotate
                  ? { ease: "linear", duration: 200, repeat: Infinity }
                  : undefined
              }
            >
              {(() => {
                const CurrentShape = shapes[currentShapeIndex];
                return <CurrentShape />;
              })()}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div layout="preserve-aspect">
          <motion.div
            className="max-w-[300px]"
            initial={{ width: 0 }}
            animate={{
              width: [0, 300],
            }}
            transition={{ delay: Duration.seconds(4.5).toSeconds() }}
            style={{ overflow: showButton ? "visible" : "hidden" }}
          >
            <TextEffect
              delay={Duration.seconds(4.65).toSeconds()}
              speedReveal={1.5}
              className="text-2xl font-medium text-balance"
              style={{ width: 300 }}
            >
              Some headline with weird content
            </TextEffect>

            <TextEffect
              delay={Duration.seconds(5).toSeconds()}
              speedReveal={2}
              className="text-pretty mt-1"
              style={{ width: 300 }}
              onAnimationComplete={() => setShowButton(true)}
            >
              This is the actual body copy for my life. While this might be
              interesting. I just don't fucking know.
            </TextEffect>

            {showButton && (
              <motion.button className="hover:bg-neutral-600 cursor-pointer transition-colors duration-300s mt-4 bg-black text-white min-h-11 px-6 outline-offset-2 focus-visible:outline-2 outline-red-500">
                See my work
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ShapeSquare() {
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
        fill="#000000"
        style={{
          fill: "#000000",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function ShapeCircleWithSquare() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM155 49C155 46.7909 153.209 45 151 45H49C46.7909 45 45 46.7909 45 49V151C45 153.209 46.7909 155 49 155H151C153.209 155 155 153.209 155 151V49Z"
        fill="#000000"
        style={{
          fill: "#000000",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function Triangle() {
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
        fill="#000000"
        style={{
          fill: "#000000",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function TiltedSquare() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_308_212)">
        <path
          d="M100 0L200 100L100 200.001L-0.000488281 100L100 0Z"
          fill="#000000"
          style={{
            fill: "#000000",
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

function Star() {
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
        fill="#000000"
        style={{
          fill: "#000000",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}

function Checkboard() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_308_180)">
        <path
          d="M0 0H40V40H0V0Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M40 40H80V80H40V40Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M0 80H40V120H0V80Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M40 120H80V160H40V120Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M120 40H160V80H120V40Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M80 80H120V120H80V80Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M0 160H40V200H0V160Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M160 80H200V120H160V80Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M80 0H120V40H80V0Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M120 120H160V160H120V120Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M80 160H120V200H80V160Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M160 0H200V40H160V0Z"
          fill="#000000"
          style={{
            fill: "#000000",
            fillOpacity: 1,
          }}
        />
        <path
          d="M160 160H200V200H160V160Z"
          fill="#000000"
          style={{
            fill: "#000000",
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
