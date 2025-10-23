import { motion, useMotionValue } from "motion/react";
import { TextEffect } from "../atoms/TextEffect";
import { useEffect, useState } from "react";
import { Duration } from "duri";

export function Hero() {
  const [showButton, setShowButton] = useState(false);
  const blinkOpacity = useMotionValue(1);

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

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <motion.div className="flex items-center gap-8" layout>
        <motion.div>
          <motion.div
            aria-hidden="true"
            className="size-[200px] bg-blue-500"
            style={{ opacity: blinkOpacity }}
            initial={{ scale: 0.1 }}
            animate={{ scale: [0.1, 1.1, 1] }}
            transition={{
              ease: "easeInOut",
              duration: Duration.seconds(1.25).toSeconds(),
              delay: Duration.seconds(3).toSeconds(),
            }}
          />
        </motion.div>

        <motion.div layout="preserve-aspect">
          <motion.div
            className="max-w-[300px]"
            initial={{ width: 0 }}
            animate={{
              width: [0, 300],
            }}
            transition={{ delay: Duration.seconds(4.25).toSeconds() }}
            style={{ overflow: showButton ? "visible" : "hidden" }}
          >
            <TextEffect
              delay={Duration.seconds(4.4).toSeconds()}
              speedReveal={1.5}
              className="text-2xl font-medium text-balance"
              style={{ width: 300 }}
            >
              Some headline with weird content
            </TextEffect>

            <TextEffect
              delay={Duration.seconds(4.75).toSeconds()}
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
