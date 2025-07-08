"use client";
import * as React from "react";
import { MapPin } from "lucide-react";
import { ShoppingBag, Clock } from "lucide-react";

interface ExploreShoppingsProps {
  items: {
    image?: string;
    title?: string;
    state?: string;
    stores?: number;
    hours?: string;
  }[];
  titleHeader?: string;
  subtitleHeader?: string;
}

const ExploreShoppings: React.FC<ExploreShoppingsProps> = ({ items, titleHeader, subtitleHeader }) => {
  const [playing, setPlaying] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);
  const [repeatCount, setRepeatCount] = React.useState(2);

  // Calculate how many times to repeat items to fill at least 2x container width
  React.useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    // Estimate width of one item
    const item = container.querySelector('.marquee-item') as HTMLElement;
    if (!item) return;
    const itemWidth = item.offsetWidth;
    const containerWidth = container.offsetWidth;
    // Minimum: enough items to fill 2x container width
    const minItems = Math.ceil((containerWidth * 2) / itemWidth);
    setRepeatCount(Math.max(2, Math.ceil(minItems / items.length)));
  }, [items.length]);

  // Animation loop for marquee effect
  React.useEffect(() => {
    if (!playing) return;
    let frame: number;
    const step = () => {
      setOffset((prev) => {
        // Move left by 1px per frame, reset if scrolled past all items
        const container = containerRef.current;
        if (!container) return prev;
        const totalWidth = container.scrollWidth / repeatCount;
        if (Math.abs(prev) >= totalWidth) {
          return 0;
        }
        return prev - 1;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, repeatCount]);

  // Repeat items enough times to fill the marquee
  const marqueeItems = Array.from({ length: repeatCount }, () => items).flat();

  // Add manual slide controls
  const handleNext = () => {
    if (!containerRef.current) return;
    const item = containerRef.current.querySelector('.marquee-item') as HTMLElement;
    if (!item) return;
    setOffset((prev) => {
      const container = containerRef.current;
      if (!container) return prev;
      const totalWidth = container.scrollWidth / repeatCount;
      const newOffset = prev - item.offsetWidth - 24;
      // If we've scrolled past the end, loop to start
      if (Math.abs(newOffset) >= totalWidth) {
        return 0;
      }
      return newOffset;
    });
  };
  const handlePrev = () => {
    if (!containerRef.current) return;
    const item = containerRef.current.querySelector('.marquee-item') as HTMLElement;
    if (!item) return;
    setOffset((prev) => {
      const container = containerRef.current;
      if (!container) return prev;
      const totalWidth = container.scrollWidth / repeatCount;
      // If we're at the start, jump to the end
      if (prev >= 0) {
        return -totalWidth + item.offsetWidth + 24;
      }
      return prev + item.offsetWidth + 24;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-1 pt-8">
      <div className=" text-left">
      <h2 className="text-2xl md:text-4xl  font-bold border-gray-200 pt-2 ">{titleHeader}</h2>
     

        {/*  <p className="text-2xl md:text-2xl font-thin text-gray-900  px-60 pt-2 ">
      {subtitleHeader}
      </p> Gradient overlay */}
      </div>
     
      <div className="flex justify-end items-center mb-2 pr-8">
        <button
          className="rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white transition w-9 h-9 flex items-center justify-center mr-6 mb-6"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Stop" : "Play"}
        >
          {playing ? (
            // Stop icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
            </svg>
          ) : (
            // Play icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <polygon points="8,5 19,12 8,19" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <div className="overflow-hidden w-full relative">
        <div
          ref={containerRef}
          className="flex gap-6"
          style={{
            transform: `translateX(${offset}px)`,
            transition: playing ? "none" : "transform 0.3s",
            willChange: "transform",
          }}
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="marquee-item flex-shrink-0 w-[420px] h-[280px] flex items-center justify-center group">
              <div className="relative w-full h-full rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-gray-800/30 transition-opacity duration-500 group-hover:opacity-80" />
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">Em Destaque</span>
                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full justify-between p-8">
                  <div>
                    <h2 className="text-3xl  font-bold text-white mb-2 mt-2 drop-shadow">{item.title}</h2>
                    <div className="flex items-center text-white/90 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-base font-medium">{item.state || "São Paulo, SP"}</span>

                    </div>
                    <div className="flex items-center text-white/90 mb-2">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      <span className="text-base font-medium">{item.stores || 280} episódios</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full mt-4">
                    <div className="flex items-center text-white/90">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-base font-medium">{item.hours|| "10h - 22h"}</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 hover:bg-white text-purple-700 font-semibold shadow text-base transition">
                      Explorar episódios
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Arrow controls at bottom right when stopped */}
      {!playing && (
        <div className="w-full flex justify-end mt-6 pr-12 gap-2">
          <button
            className="rounded-full bg-black text-white p-2 shadow transition hover:bg-gray-900 disabled:opacity-50"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="rounded-full bg-black text-white p-2 shadow transition hover:bg-gray-900 disabled:opacity-50"
            onClick={handleNext}
            aria-label="Próximo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreShoppings; 