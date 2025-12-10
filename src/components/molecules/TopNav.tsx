import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function TopNav({ skipAnimation }: { skipAnimation: boolean }) {
  const [animationCompleted, setAnimationCompleted] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) return;

    const checkCookie = () => {
      const cookies = document.cookie.split(";");
      const watched = cookies.some((c) => c.trim().startsWith("watched-animation=true"));
      if (watched) {
        setAnimationCompleted(true);
      }
    };

    checkCookie();
    const interval = setInterval(checkCookie, 100);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setAnimationCompleted(true);
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [skipAnimation]);

  const handleReplay = () => {
    document.cookie = "watched-animation=; path=/; max-age=0";
    document.cookie = "rotation=; path=/; max-age=0";
    window.location.reload();
  };

  return (
    <>
      {(skipAnimation || animationCompleted) && (
        <motion.button
          onClick={handleReplay}
          initial={{ opacity: skipAnimation ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={skipAnimation ? { duration: 0 } : { duration: 0.3 }}
          className="absolute cursor-pointer top-4 right-4 text-base text-gray-600 hover:text-black transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
        >
          Replay animation

          <span className="h-12 w-full min-w-12 absolute top-1/2 right-0 -translate-y-1/2 [@media(pointer:fine)]:hidden" />
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
            className="relative text-gray-600 hover:text-black text-base transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
          >
            Twitter

            <span className="h-12 w-full min-w-12 absolute top-1/2 left-0 -translate-y-1/2 [@media(pointer:fine)]:hidden" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/nils-haberkamp/"
            className="relative text-gray-600 hover:text-black text-base transition-colors duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-red-500 outline-offset-2"
          >
            LinkedIn

            <span className="h-12 w-full min-w-12 absolute top-1/2 left-0 -translate-y-1/2 [@media(pointer:fine)]:hidden" />
          </a>
        </li>
      </motion.ul>
    </>
  );
}

