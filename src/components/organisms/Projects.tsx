import { GraphicFlower } from "../atoms/GraphicFlower";
import { GraphicSplitCircle } from "../atoms/GraphicSplitCircle";
import { GraphicSquareInSquare } from "../atoms/GraphicSquareInSquare";
import { GraphicX } from "../atoms/GraphicX";
import { ProjectCard } from "../molecules/ProjectCard";

export function Projects() {
  return (
    <div className="max-w-[1100px] w-full grid grid-cols-[repeat(auto-fit,250px)] gap-4 justify-center">
      <ProjectCard
        logo={({ isHovered }) => <GraphicX isHovered={isHovered} />}
        number="01"
        title="Cappy"
        href="https://cappy.haberkamp.dev/"
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicSplitCircle isHovered={isHovered} />}
        number="02"
        title="vijf"
        href="https://github.com/Haberkamp/vijf"
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicX isHovered={isHovered} />}
        number="03"
        title="TypedStorage"
        href="https://github.com/Haberkamp/typed-storage"
      />

      <ProjectCard
        logo={({ isHovered }) => (
          <GraphicSquareInSquare isHovered={isHovered} />
        )}
        number="04"
        title="Roving Focus"
        href="https://github.com/Haberkamp/roving-focus"
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicX isHovered={isHovered} />}
        number="05"
        title="Stable Spin"
        href="https://github.com/Haberkamp/stable-spin"
      />

      <ProjectCard
        logo={({ isHovered }) => <GraphicFlower isHovered={isHovered} />}
        number="06"
        title="Dur"
        href="https://github.com/Haberkamp/stable-spin"
      />
    </div>
  );
}
