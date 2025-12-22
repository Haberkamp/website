import { useState } from 'react';
import SpriteAnimation from './SpriteAnimation';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2z" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M10 4H5v16h5zm9 0h-5v16h5z" />
  </svg>
);

const ForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 4v16h2V4zM4 11v2h8v2h-2v2h2v-2h2v-2h2v-2h-2V9h-2V7h-2v2h2v2z" />
  </svg>
);

const BackwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6 4v16H4V4zm14 7v2h-8v2h-2v-2H8v-2h2V9h2v2zm-8-2V7h2v2zm0 6h2v2h-2z" />
  </svg>
);

interface SpriteAnimationWithControlsProps {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
  className?: string;
}

export default function SpriteAnimationWithControls({
  spriteSheet,
  frameCount,
  frameWidth,
  frameHeight,
  fps = 10,
  className = '',
}: SpriteAnimationWithControlsProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReversed, setIsReversed] = useState(false);

  const buttonClass =
    'inline-flex items-center gap-2 ease-out-expo justify-center hover-device:hover:bg-black/10 hover-device:hover:transition-colors hover-device:hover:duration-200 active:bg-black/10 cursor-pointer bg-transparent text-black min-h-11 min-w-36 px-6 outline-offset-2 focus-visible:outline-2 outline-red-500';

  return (
    <div className="flex flex-col items-center gap-8 relative">
      <SpriteAnimation
        spriteSheet={spriteSheet}
        frameCount={frameCount}
        frameWidth={frameWidth}
        frameHeight={frameHeight}
        fps={fps}
        className={className}
        isPlaying={isPlaying}
        isReversed={isReversed}
      />
      
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-42 flex gap-3">
        <button
          type="button"
          className={buttonClass}
          onClick={() => setIsPlaying((p) => !p)}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => setIsReversed((r) => !r)}
        >
          {isReversed ? <BackwardIcon /> : <ForwardIcon />}
          {isReversed ? 'Reverse' : 'Forward'}
        </button>
      </div>
    </div>
  );
}

