import { useRef, useId } from "react";

interface ImageLightboxProps {
  children: React.ReactNode;
}

export function ImageLightbox({ children }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dialogImgRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const transitionName = `lightbox${id.replace(/:/g, "-")}`;

  const open = () => {
    document.body.style.overflow = "hidden";
    if (!document.startViewTransition) {
      dialogRef.current?.showModal();
      return;
    }

    thumbRef.current!.style.viewTransitionName = transitionName;

    const transition = document.startViewTransition(() => {
      thumbRef.current!.style.viewTransitionName = "";
      dialogImgRef.current!.style.viewTransitionName = transitionName;
      dialogRef.current?.showModal();
    });

    transition.finished.then(() => {
      dialogImgRef.current!.style.viewTransitionName = "";
    });
  };

  const close = () => {
    document.body.style.overflow = "";
    if (!document.startViewTransition) {
      dialogRef.current?.close();
      return;
    }

    dialogImgRef.current!.style.viewTransitionName = transitionName;

    const transition = document.startViewTransition(() => {
      dialogImgRef.current!.style.viewTransitionName = "";
      thumbRef.current!.style.viewTransitionName = transitionName;
      dialogRef.current?.close();
    });

    transition.finished.then(() => {
      thumbRef.current!.style.viewTransitionName = "";
    });
  };

  return (
    <>
      <div
        ref={thumbRef}
        onClick={open}
        className="cursor-zoom-in [&_img]:w-full"
      >
        {children}
      </div>
      <dialog
        ref={dialogRef}
        onClick={close}
        className="not-prose cursor-zoom-out backdrop:bg-black/80 bg-transparent max-w-none max-h-none p-0 m-auto outline-none"
      >
        <div ref={dialogImgRef} className="[&_img]:max-w-[60vw] [&_img]:max-h-[70vh] [&_img]:w-auto [&_img]:h-auto [&_img]:object-contain">
          {children}
        </div>
      </dialog>
    </>
  );
}
