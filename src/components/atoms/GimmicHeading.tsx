"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils";

export type GimmicStage = {
  /**
   * Cursor distance (in px) at which this stage is active.
   * Stages are matched by the first stage where `distance <= maxDistance`.
   */
  maxDistance: number;
  fontFamily: string;
};

export const DEFAULT_GIMMICK_STAGES: readonly GimmicStage[] = [
  // Dramatic defaults: fewer steps + tighter thresholds (snappier pixelation).
  { maxDistance: 60, fontFamily: "Redaction_100" },
  { maxDistance: 120, fontFamily: "Redaction_50" },
  { maxDistance: 220, fontFamily: "Redaction_20" },
  // Farthest stage: keep it Redaction (non-pixelated) — never Inter for this component.
  { maxDistance: Number.POSITIVE_INFINITY, fontFamily: "Redaction" },
];

const getStageIndexForDistance = (distance: number, stages: readonly GimmicStage[]) => {
  for (let i = 0; i < stages.length; i++) {
    if (distance <= stages[i].maxDistance) return i;
  }
  return stages.length - 1;
};

export type GimmicHeadingProps<T extends React.ElementType = "h2"> = {
  as?: T;
  /**
   * Prefer passing text explicitly (especially from Astro) to avoid slot/children shape issues.
   */
  text?: string;
  children?: React.ReactNode;
  stages?: readonly GimmicStage[];
  disabled?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export function GimmicHeading<T extends React.ElementType = "h2">({
  as,
  text,
  children,
  stages,
  disabled = false,
  className,
  ...rest
}: GimmicHeadingProps<T>) {
  const Tag = (as ?? "h2") as React.ElementType;
  const stageList = stages ?? DEFAULT_GIMMICK_STAGES;

  const resolvedText = useMemo(() => {
    if (typeof text === "string") return text;
    if (typeof children === "string") return children;
    if (typeof children === "number") return String(children);
    if (Array.isArray(children) && children.every((c) => typeof c === "string" || typeof c === "number")) {
      return children.map(String).join("");
    }
    // Best-effort fallback (prevents a runtime crash that would result in no heading).
    return children == null ? "" : String(children);
  }, [text, children]);

  const chars = useMemo(() => Array.from(resolvedText), [resolvedText]);
  const containerRef = useRef<HTMLElement | null>(null);
  const spansRef = useRef<Array<HTMLSpanElement | null>>([]);
  const centersRef = useRef<Array<{ x: number; y: number }>>([]);
  const lastStageIndexRef = useRef<number[]>([]);
  const cursorRef = useRef<{ x: number; y: number }>({ x: -10_000, y: -10_000 });
  const rafRef = useRef<number | null>(null);
  const [charWidths, setCharWidths] = useState<number[]>([]);

  useEffect(() => {
    spansRef.current = spansRef.current.slice(0, chars.length);
    centersRef.current = centersRef.current.slice(0, chars.length);
    lastStageIndexRef.current = Array.from({ length: chars.length }, () => -1);
  }, [chars.length]);

  // Measure character widths on mount to prevent layout shift when font changes
  useLayoutEffect(() => {
    if (charWidths.length > 0) return; // Already measured
    const widths = spansRef.current.map((el) => {
      if (!el) return 0;
      return el.getBoundingClientRect().width;
    });
    if (widths.some((w) => w > 0)) {
      setCharWidths(widths);
    }
  }, [chars.length, charWidths.length]);

  useEffect(() => {
    if (disabled) return;

    const computeCenters = () => {
      centersRef.current = spansRef.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 + window.scrollX,
          y: r.top + r.height / 2 + window.scrollY,
        };
      });
    };

    computeCenters();

    const onResizeOrScroll = () => computeCenters();
    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, { passive: true });

    const ro =
      typeof ResizeObserver !== "undefined" && containerRef.current
        ? new ResizeObserver(() => computeCenters())
        : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll);
    };
  }, [disabled, chars.length]);

  useEffect(() => {
    if (disabled) return;

    const update = () => {
      rafRef.current = null;

      const cursor = cursorRef.current;
      const centers = centersRef.current;

      for (let i = 0; i < spansRef.current.length; i++) {
        const el = spansRef.current[i];
        if (!el) continue;

        const c = centers[i] ?? { x: 0, y: 0 };
        const dx = c.x - cursor.x;
        const dy = c.y - cursor.y;
        const dist = Math.hypot(dx, dy);

        const stageIndex = getStageIndexForDistance(dist, stageList);
        if (lastStageIndexRef.current[i] === stageIndex) continue;

        el.style.fontFamily = stageList[stageIndex].fontFamily;
        lastStageIndexRef.current[i] = stageIndex;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      cursorRef.current = {
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
      };

      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled, stageList]);

  return (
    <Tag
      ref={containerRef as unknown as React.Ref<HTMLElement>}
      className={cn("hyphens-manual", className)}
      {...rest}
    >
      {chars.map((ch, i) => {
        // Soft hyphen: render as raw text node wrapped in inline span for breaking
        if (ch === "\u00AD") {
          return (
            <React.Fragment key={`shy-${i}`}>
              <span
                ref={(el) => {
                  spansRef.current[i] = el;
                }}
                className="inline-block w-0"
              />
              {"\u00AD"}
            </React.Fragment>
          );
        }

        const width = charWidths[i];
        return (
          <span
            key={`${ch}-${i}`}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            className="inline-block text-center"
            style={{
              fontFamily: "Redaction",
              width: width ? `${width}px` : undefined,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </Tag>
  );
}


