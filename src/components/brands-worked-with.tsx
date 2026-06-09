"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const brandExamples = [
  {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    author: "Vogue",
    link: "#",
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    author: "Spotify",
    link: "#",
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    author: "Nike",
    link: "#",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    author: "Apple",
    link: "#",
  },
  {
    url: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2070&auto=format&fit=crop",
    author: "LVMH",
    link: "#",
  },
];

export function BrandsWorkedWith() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of the inner container, not the window
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 items mean 4 scroll intervals. So latest * 4 gives the index.
    const newIndex = Math.min(Math.round(latest * 4), 4);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <div className="h-screen w-full bg-transparent overflow-hidden relative">
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar"
      >
        <div className="w-full h-[500vh] relative">
          {/* Visual Presentation (Fixed within the scrollable container) */}
          <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 px-6 sm:px-12 md:px-20 pointer-events-none">
            
            {/* Left: Interactive Image Preview */}
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={brandExamples[activeIndex].url}
                    alt={brandExamples[activeIndex].author}
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Brand Text Presentation */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left pointer-events-auto">
              <p className="eyebrow text-[0.62rem] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 font-sans">
                Brands We've Worked With
              </p>
              
              <div className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] relative flex items-center justify-center md:justify-start w-full">
                <AnimatePresence mode="wait">
                  <motion.a
                    key={activeIndex}
                    href={brandExamples[activeIndex].link}
                    initial={{ y: 35, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -35, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground font-bold tracking-tight absolute left-0 right-0 mx-auto text-center md:text-left md:mx-0 md:right-auto hover:text-muted-foreground transition-colors duration-300"
                  >
                    {brandExamples[activeIndex].author}
                  </motion.a>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Snap points to ensure exact stops at each brand */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col">
            {brandExamples.map((_, i) => (
              <div key={i} className="w-full h-screen snap-center snap-always" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

