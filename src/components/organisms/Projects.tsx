import { useState, useEffect, useRef } from "react";
import { Cursor } from "../atoms/Cursor";
import { GraphicFlower } from "../atoms/GraphicFlower";
import { GraphicSplitCircle } from "../atoms/GraphicSplitCircle";
import { GraphicSquareInSquare } from "../atoms/GraphicSquareInSquare";
import { GraphicSquareInTitltedSquare } from "../atoms/GraphicSquareInTitltedSquare";
import { GraphicStar } from "../atoms/GraphicStar";
import { GraphicTwoHalfCircles } from "../atoms/GraphicTwoHalfCircles";
import { GraphicX } from "../atoms/GraphicX";
import { ProjectCard } from "../molecules/ProjectCard";

const ITEM_COUNT = 7;
const COL_WIDTH = 250;

export function Projects() {
  const [cursorText, setCursorText] = useState<string>("Cappy");
  const [fillers, setFillers] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () => {
      if (!ref.current) return;
      const width = ref.current.offsetWidth;
      const cols = Math.floor(width / COL_WIDTH);
      const rows = Math.ceil(ITEM_COUNT / cols);
      setFillers(cols * rows - ITEM_COUNT);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-[1100px] w-full grid grid-cols-[repeat(auto-fit,250px)] gap-4 justify-center"
    >
      <Cursor attachToParent>
        {cursorText && (
          <div className="bg-red-500 text-white py-2 px-4 max-w-[320px]">
            {cursorText}
          </div>
        )}
      </Cursor>

      <ProjectCard
        logo={({ isHovered }) => <GraphicX isHovered={isHovered} />}
        number="01"
        title="Cappy"
        description="Create captions for your videos"
        href="https://cappy.haberkamp.dev/"
        onHover={setCursorText}
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicSplitCircle isHovered={isHovered} />}
        number="02"
        title="vijf"
        description="An interval timer I built for my workouts"
        href="https://github.com/Haberkamp/vijf"
        onHover={setCursorText}
      />

      <ProjectCard
        logo={({ isHovered }) => (
          <GraphicTwoHalfCircles isHovered={isHovered} />
        )}
        number="03"
        title="TypedStorage"
        description="A type-safe way to access localStorage"
        href="https://github.com/Haberkamp/typed-storage"
        onHover={setCursorText}
      />

      <ProjectCard
        logo={({ isHovered }) => (
          <GraphicSquareInSquare isHovered={isHovered} />
        )}
        number="04"
        title="Roving Focus"
        description="A roving focus component for React"
        href="https://github.com/Haberkamp/roving-focus"
        onHover={setCursorText}
      />

      <ProjectCard
        logo={({ isHovered }) => (
          <GraphicSquareInTitltedSquare isHovered={isHovered} />
        )}
        number="05"
        title="Stable Spin"
        description="Make your app feel stable and polished by slowing down your app"
        href="https://github.com/Haberkamp/stable-spin"
        onHover={setCursorText}
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicFlower isHovered={isHovered} />}
        number="06"
        title="Duri"
        description="A tiny library for working with durations"
        href="https://github.com/Haberkamp/duri"
        onHover={setCursorText}
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicStar isHovered={isHovered} />}
        number="07"
        title="ts-redacted"
        description="Prevent secret values getting leaked in logs or API responses"
        href="https://github.com/Haberkamp/ts-redacted"
        onHover={setCursorText}
      />
      {Array.from({ length: fillers }).map((_, i) => (
        <div
          key={i}
          className="cursor-pointer w-[250px] h-full"
          onMouseEnter={() => setCursorText("")}
        />
      ))}
    </div>
  );
}
