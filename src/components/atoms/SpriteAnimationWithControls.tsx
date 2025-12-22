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

const ReverseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2z" />
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
          <ReverseIcon />
          {isReversed ? 'Forward' : 'Reverse'}
        </button>
      </div>
    </div>
  );
}

