"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 px-6 sm:px-12 md:px-20 overflow-hidden">
        
        {/* Left: Interactive Image Preview */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
            {brandExamples.map((brand, i) => {
              // Calculate dynamic scroll ranges for each item (5 items total)
              const start = (i - 0.5) / 4;
              const center = i / 4;
              const end = (i + 0.5) / 4;

              const opacity = useTransform(scrollYProgress, [start, center, end], [0, 1, 0]);
              const scale = useTransform(scrollYProgress, [start, center, end], [0.92, 1, 1.08]);
              const blur = useTransform(scrollYProgress, [start, center, end], ["blur(10px)", "blur(0px)", "blur(10px)"]);

              return (
                <motion.img
                  key={`img-${i}`}
                  src={brand.url}
                  alt={brand.author}
                  style={{ opacity, scale, filter: blur }}
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              );
            })}
          </div>
        </div>

        {/* Right: Brand Text Presentation */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left">
          <p className="eyebrow text-[0.62rem] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 font-sans">
            Brands We've Worked With
          </p>
          
          <div className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] relative flex items-center justify-center md:justify-start w-full">
            {brandExamples.map((brand, i) => {
              const start = (i - 0.5) / 4;
              const center = i / 4;
              const end = (i + 0.5) / 4;

              const y = useTransform(scrollYProgress, [start, center, end], [40, 0, -40]);
              const opacity = useTransform(scrollYProgress, [start, center, end], [0, 1, 0]);
              const blur = useTransform(scrollYProgress, [start, center, end], ["blur(4px)", "blur(0px)", "blur(4px)"]);

              return (
                <motion.a
                  key={`text-${i}`}
                  href={brand.link}
                  style={{ opacity, y, filter: blur }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground font-bold tracking-tight absolute left-0 right-0 text-center md:text-left md:right-auto hover:text-muted-foreground transition-colors duration-300"
                >
                  {brand.author}
                </motion.a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

