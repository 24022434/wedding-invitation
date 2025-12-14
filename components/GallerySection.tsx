import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const GallerySection: React.FC = () => {
  // Create extended images array for infinite loop: [Last, ...Originals, First]
  const extendedImages = [
    GALLERY_IMAGES[GALLERY_IMAGES.length - 1],
    ...GALLERY_IMAGES,
    GALLERY_IMAGES[0]
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real image
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayInterval = 1000;
  const totalRealImages = GALLERY_IMAGES.length;

  // Handle transition end to snap back for infinite loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    // If we're at the clone of the last image (index 0), snap to real last image
    if (currentIndex === 0) {
      setCurrentIndex(totalRealImages);
    }
    // If we're at the clone of the first image (index N+1), snap to real first image
    else if (currentIndex === totalRealImages + 1) {
      setCurrentIndex(1);
    }
  };

  // Move to next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  // Move to prev slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  // Jump to specific slide (from dots/thumbs)
  const goToSlide = (realIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(realIndex + 1); // Map real index (0..N-1) to infinite index (1..N)
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlay, isDragging, nextSlide]);

  // Pause on interaction
  const handleInteraction = (action: () => void) => {
    setIsAutoPlay(false);
    action();
  };

  // Touch/Mouse handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isTransitioning) return;
    setIsAutoPlay(false);
    setIsDragging(true);
    // @ts-ignore
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    // @ts-ignore
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setCurrentTranslate(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Threshold to change slide
    if (currentTranslate < -50) {
      nextSlide();
    } else if (currentTranslate > 50) {
      prevSlide();
    }

    setCurrentTranslate(0);
  };

  // Calculate generic index for display (0 to N-1)
  const getDisplayIndex = () => {
    if (currentIndex === 0) return totalRealImages - 1;
    if (currentIndex === totalRealImages + 1) return 0;
    return currentIndex - 1;
  };

  return (
    <section id="gallery" className="py-20 bg-wedding-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-script text-5xl text-wedding-gold mb-2">Album Hình Cưới</h2>
          <p className="font-sans text-gray-400 tracking-widest uppercase text-sm">Khoảnh khắc hạnh phúc</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel Window */}
          <div
            className="relative overflow-hidden rounded-xl shadow-lg bg-[#F8F7F6] aspect-[3/4] md:aspect-[4/3] cursor-grab active:cursor-grabbing border border-wedding-gold/20"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={() => isDragging && handleTouchEnd()}
          >
            {/* Sliding Track */}
            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${currentTranslate}px))`,
                transition: isDragging || (!isTransitioning && (currentIndex === 0 || currentIndex === totalRealImages + 1))
                  ? 'none'
                  : 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              {extendedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="min-w-full h-full flex items-center justify-center p-2"
                  style={{ userSelect: 'none' }}
                >
                  <img
                    src={img}
                    alt={`Wedding ${idx}`}
                    className="max-h-full max-w-full object-contain rounded-lg pointer-events-none drop-shadow-sm"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows (Desktop & Mobile) */}
            <button
              onClick={() => handleInteraction(prevSlide)}
              className="group absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-white/80 hover:text-wedding-gold hover:shadow-md transition-all flex z-10"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => handleInteraction(nextSlide)}
              className="group absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-white/80 hover:text-wedding-gold hover:shadow-md transition-all flex z-10"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-white/50 z-10 transition-opacity hover:opacity-100 opacity-80">
              <span className="text-gray-500 text-xs font-semibold font-sans w-12 text-center tracking-wider">
                {getDisplayIndex() + 1} / {totalRealImages}
              </span>
              <div className="h-4 w-[1px] bg-gray-300"></div>
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-gray-500 hover:text-wedding-gold transition-colors flex items-center justify-center"
              >
                {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Swipe Hint (Mobile) */}
          <div className="md:hidden text-center mt-3 text-wedding-gold/60 text-[10px] uppercase tracking-widest animate-pulse">
            Vuốt để xem ảnh
          </div>

          {/* Thumbnails */}
          <div className="mt-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-3 justify-center px-4" style={{ minWidth: 'min-content' }}>
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleInteraction(() => goToSlide(idx))}
                  className={`relative flex-shrink-0 w-16 h-20 rounded-md overflow-hidden transition-all duration-500 ${idx === getDisplayIndex()
                    ? 'border-2 border-wedding-gold shadow-md scale-105 opacity-100'
                    : 'opacity-70 hover:opacity-100 border border-transparent'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className={`w-full h-full object-cover transition-all duration-500 ${idx !== getDisplayIndex() ? 'blur-[1px] hover:blur-none' : ''
                      }`}
                    loading="lazy"
                  />
                  {/* Overlay for inactive */}
                  {idx !== getDisplayIndex() && (
                    <div className="absolute inset-0 bg-[#F8F7F6]/20 mix-blend-overlay"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
