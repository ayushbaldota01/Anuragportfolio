import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { projects } from '../featured-work';

export function TransitionGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slow horizontal scroll mapping
  const x1 = useTransform(scrollYProgress, [0, 1], ["5vw", "-25vw"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25vw", "5vw"]);

  // We only want 4-5 images per line
  const topRow = projects.slice(0, 5);
  const bottomRow = projects.slice(5, 10);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-transparent">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center gap-6 md:gap-10 bg-transparent">
        
        {/* Top Row: Glides Right to Left */}
        <motion.div 
          style={{ x: x1, willChange: "transform" }}
          className="flex gap-6 md:gap-10 w-max px-[5vw]"
        >
          {topRow.map((project, i) => (
            <div 
              key={`top-${i}`} 
              className="relative w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[26vw] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/70 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-serif leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Row: Glides Left to Right */}
        <motion.div 
          style={{ x: x2, willChange: "transform" }}
          className="flex gap-6 md:gap-10 w-max px-[5vw]"
        >
          {bottomRow.map((project, i) => (
            <div 
              key={`bottom-${i}`} 
              className="relative w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[26vw] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/70 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-serif leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
