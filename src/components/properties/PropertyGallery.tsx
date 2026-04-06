"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

type PropertyGalleryProps = {
  images: string[];
};

const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleThumbnailKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveIndex(index);
      }
      if (e.key === "ArrowRight" && index < images.length - 1) {
        setActiveIndex(index + 1);
      }
      if (e.key === "ArrowLeft" && index > 0) {
        setActiveIndex(index - 1);
      }
    },
    [images.length]
  );

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={images[activeIndex]}
          alt={`Property photo ${activeIndex + 1} of ${images.length}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          priority={activeIndex === 0}
        />
      </div>

      <div
        className="flex gap-2 overflow-x-auto py-2 px-1"
        role="tablist"
        aria-label="Property image thumbnails"
      >
        {images.map((image, index) => (
          <button
            key={image}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`View photo ${index + 1} of ${images.length}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => handleThumbnailClick(index)}
            onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
            className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a847] focus:ring-offset-2 sm:h-20 sm:w-28 ${
              index === activeIndex
                ? "ring-2 ring-[#d4a847] ring-offset-2 opacity-100"
                : "opacity-60 hover:opacity-90"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="112px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
