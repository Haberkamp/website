import { useEffect, useRef } from 'react';

interface SpriteAnimationProps {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
  className?: string;
  isPlaying?: boolean;
  isReversed?: boolean;
}

export default function SpriteAnimation({
  spriteSheet,
  frameCount,
  frameWidth,
  frameHeight,
  fps = 10,
  className = '',
  isPlaying = true,
  isReversed = false,
}: SpriteAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPlaying) return;

    const frameDuration = 1000 / fps;

    const animate = () => {
      if (!container) return;
      
      const xOffset = -(currentFrameRef.current * frameWidth);
      container.style.backgroundPosition = `${xOffset}px 0`;
      
      if (isReversed) {
        currentFrameRef.current = (currentFrameRef.current - 1 + frameCount) % frameCount;
      } else {
        currentFrameRef.current = (currentFrameRef.current + 1) % frameCount;
      }
    };

    const intervalId = setInterval(animate, frameDuration);

    return () => clearInterval(intervalId);
  }, [frameCount, frameWidth, fps, isPlaying, isReversed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${spriteSheet})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 0',
        imageRendering: 'pixelated',
      }}
    />
  );
}

