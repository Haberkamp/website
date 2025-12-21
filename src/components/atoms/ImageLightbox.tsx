import { useRef, useId } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
}

export function ImageLightbox({ src, alt, loading = "lazy" }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);
  const dialogImgRef = useRef<HTMLImageElement>(null);
  const id = useId();
  const transitionName = `lightbox${id.replace(/:/g, "-")}`;

  const open = () => {
    document.body.style.overflow = "hidden";
    if (!document.startViewTransition) {
      dialogRef.current?.showModal();
      return;
    }

    // Set transition name on thumbnail before transition starts
    thumbRef.current!.style.viewTransitionName = transitionName;

    const transition = document.startViewTransition(() => {
      // Swap: remove from thumb, add to dialog image
      thumbRef.current!.style.viewTransitionName = "";
      dialogImgRef.current!.style.viewTransitionName = transitionName;
      dialogRef.current?.showModal();
    });

    // Clean up after transition
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

    // Set transition name on dialog image before transition starts
    dialogImgRef.current!.style.viewTransitionName = transitionName;

    const transition = document.startViewTransition(() => {
      // Swap: remove from dialog image, add to thumb
      dialogImgRef.current!.style.viewTransitionName = "";
      thumbRef.current!.style.viewTransitionName = transitionName;
      dialogRef.current?.close();
    });

    // Clean up after transition
    transition.finished.then(() => {
      thumbRef.current!.style.viewTransitionName = "";
    });
  };

  return (
    <>
      <img
        ref={thumbRef}
        src={src}
        alt={alt}
        onClick={open}
        loading={loading}
        className="cursor-zoom-in"
      />
      <dialog
        ref={dialogRef}
        onClick={close}
        className="not-prose cursor-zoom-out backdrop:bg-black/80 bg-transparent max-w-[90vw] md:max-w-[60vw] max-h-[90vh] p-0 m-auto outline-none"
      >
        <img
          loading={loading}
          ref={dialogImgRef}
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </dialog>
    </>
  );
}
