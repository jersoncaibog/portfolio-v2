"use client";

import Image from "next/image";
import { useState } from "react";
import type { WorkImage } from "@/lib/profile";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { ImagePlaceholder, cx } from "./ui";

export function Gallery({ images, className }: { images: WorkImage[]; className?: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className={cx("rounded-[10px] border border-line bg-surface p-2.5", className)}>
        <ImagePlaceholder label="screenshot" className="aspect-16/10 rounded-md" />
      </div>
    );
  }

  const go = (n: number) => setIndex((n + images.length) % images.length);
  const current = images[index];
  const many = images.length > 1;

  return (
    <div className={cx("flex flex-col gap-2.5 rounded-[10px] border border-line bg-surface p-2.5", className)}>
      <div className="relative aspect-16/10 overflow-hidden rounded-md border border-line bg-inset">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1200px) 780px, (min-width: 768px) 66vw, 100vw"
          className="object-cover"
          priority={index === 0}
        />
        {many && (
          <>
            <span className="absolute top-3 right-3 rounded-md border border-line-strong bg-bg/85 px-2 py-1 font-mono text-xs text-fg-3">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg border border-line-strong bg-bg/85 text-fg hover:border-accent/60"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg border border-line-strong bg-bg/85 text-fg hover:border-accent/60"
            >
              <ChevronRightIcon size={18} />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${i + 1}${image.caption ? `: ${image.caption}` : ""}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cx(
                "relative aspect-16/10 overflow-hidden rounded-[5px] bg-inset transition-opacity",
                i === index ? "border-2 border-accent" : "border border-line-strong opacity-70 hover:opacity-100",
              )}
            >
              <Image src={image.src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {current.caption && <p className="px-0.5 text-[13px] text-muted">{current.caption}</p>}
    </div>
  );
}
