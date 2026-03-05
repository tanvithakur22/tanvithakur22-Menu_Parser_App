import React, { useState, useEffect, useRef } from "react";

export default function ImageSlider({ images = [] }) {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const hasImages = safeImages.length > 0;
  const onlyOne = safeImages.length === 1;

  /* =========================
     SWIPE SUPPORT
  ========================= */
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const MIN_SWIPE_DISTANCE = 50;

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (isAnimating) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < MIN_SWIPE_DISTANCE) return;

    if (distance > 0) {
      next(); // swipe left → next
    } else {
      prev(); // swipe right → prev
    }
  };

  /* =========================
     RESET WHEN IMAGES CHANGE
  ========================= */
  useEffect(() => {
    setCurrentIndex(0);
    setPrevIndex(null);
    setIsAnimating(false);
  }, [images]);

  /* =========================
     NAVIGATION
  ========================= */
  const next = () => {
    if (!hasImages || onlyOne || isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    setPrevIndex(currentIndex);
    setCurrentIndex((i) => (i + 1) % safeImages.length);
  };

  const prev = () => {
    if (!hasImages || onlyOne || isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    setPrevIndex(currentIndex);
    setCurrentIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  };

  /* =========================
     ANIMATION END
  ========================= */
  const handleAnimationEnd = () => {
    setPrevIndex(null);
    setIsAnimating(false);
  };

  if (!hasImages) {
    return <div className="image-placeholder muted">No images found</div>;
  }

  return (
    <div
      className="image-slider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Previous image (slides out) */}
      {prevIndex !== null && (
        <img
          key={`prev-${prevIndex}-${direction}`}
          src={safeImages[prevIndex]}
          className={`slider-image-large slide-out ${direction}`}
          onAnimationEnd={handleAnimationEnd}
          alt=""
        />
      )}

      {/* Current image (slides in) */}
      <img
        key={`current-${currentIndex}-${direction}`}
        src={safeImages[currentIndex]}
        className={`slider-image-large slide-in ${direction}`}
        alt=""
      />

      {!onlyOne && (
        <>
          <button
            className="slider-arrow left"
            onClick={prev}
            aria-label="Previous image"
          >
            <span style={{ fontSize: "30px" }}>←</span>
          </button>

          <button
            className="slider-arrow right"
            onClick={next}
            aria-label="Next image"
          >
            <span style={{ fontSize: "30px" }}>→</span>
          </button>

          <div className="slider-dots">
            {safeImages.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
