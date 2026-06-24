import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

export const projects = [
  {
    id: "lululemon",
    title: "LULULEMON",
    category: "Brand Campaign",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "mission-fed",
    title: "MISSION FED",
    category: "Digital Experience",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "intuit",
    title: "INTUIT",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cutwater",
    title: "CUTWATER",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lafayette",
    title: "THE LAFAYETTE",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "illumina",
    title: "ILLUMINA",
    category: "Corporate Identity",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vuori",
    title: "VUORI",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nike",
    title: "NIKE",
    category: "Campaign",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sony",
    title: "SONY",
    category: "Product Launch",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "porsche",
    title: "PORSCHE",
    category: "Luxury Automotive",
    image: "https://images.unsplash.com/photo-1503376712351-1c22d42ca0fa?auto=format&fit=crop&w=1200&q=80",
  },
];

function ProjectItem({ project, index, total, scrollIndex }: any) {
  const isLeft = index % 2 === 0;

  const scale = useTransform(
    scrollIndex,
    [index - 2, index - 1, index, index + 1],
    [0.1, 0.4, 1.15, 5]
  );

  const opacity = useTransform(
    scrollIndex,
    [index - 2, index - 1, index, index + 0.4, index + 1],
    [0, 0.3, 1, 0, 0]
  );

  const xOffset = useTransform(
    scrollIndex,
    [index - 2, index - 1, index, index + 1],
    [0, isLeft ? -12 : 12, isLeft ? -28 : 28, isLeft ? -80 : 80]
  );

  const x = useMotionTemplate`calc(-50% + ${xOffset}vw)`;
  const y = useMotionTemplate`calc(-50% + 0vh)`;

  const textOpacity = useTransform(
    scrollIndex,
    [index - 0.4, index, index + 0.2],
    [0, 1, 0]
  );
  
  const textY = useTransform(
    scrollIndex,
    [index - 0.4, index, index + 0.2],
    [20, 0, -20]
  );

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex: total - index,
        willChange: "transform, opacity",
      }}
    >
      <div className="relative w-[32vw] min-w-[260px] max-w-[420px] aspect-[4/5] overflow-hidden rounded-xl bg-black">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
        className="absolute top-[105%] left-1/2 -translate-x-1/2 w-[200%] text-center pointer-events-none"
      >
        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white whitespace-nowrap">
          {project.title}
        </h3>
        <p className="text-white/60 uppercase tracking-[0.25em] text-xs mt-3">
          {project.category}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 90,
    mass: 0.1,
  });

  const scrollIndex = useTransform(smoothProgress, [0, 1], [0, total - 1]);

  return (
    <section className="relative w-full bg-transparent flex flex-col">
      
      {/* Normal Header for the FeaturedWork section */}
      <div className="relative w-full px-5 md:px-8 lg:px-12 xl:px-16 pt-24 md:pt-32 z-30 pointer-events-none">
        <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-md">
          FEATURED WORK
        </h2>
        <p className="mt-4 text-white/50 uppercase tracking-[0.2em] text-xs font-medium drop-shadow-md">
          Scroll to explore
        </p>
      </div>

      {/* 3-Image Intro Section */}
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-32 z-20 relative bg-transparent">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
          }}
          className="flex flex-row items-start justify-center gap-6 md:gap-10 lg:gap-16 w-full max-w-[1400px] px-4"
        >
          
          {/* Left Card */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } }}
            className="flex flex-col items-center w-1/3 max-w-[380px]"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <img src={projects[0].image} className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500" alt={projects[0].title} />
            </div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } } }}
              className="mt-6 text-center"
            >
              <h4 className="font-serif text-2xl md:text-3xl text-white">{projects[0].title}</h4>
              <p className="text-white/50 text-[10px] tracking-widest uppercase mt-2">{projects[0].category}</p>
            </motion.div>
          </motion.div>
          
          {/* Center Card */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } }}
            className="flex flex-col items-center w-1/3 max-w-[380px]"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <img src={projects[1].image} className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500" alt={projects[1].title} />
            </div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } } }}
              className="mt-6 text-center"
            >
              <h4 className="font-serif text-2xl md:text-3xl text-white">{projects[1].title}</h4>
              <p className="text-white/50 text-[10px] tracking-widest uppercase mt-2">{projects[1].category}</p>
            </motion.div>
          </motion.div>

          {/* Right Card */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } }}
            className="flex flex-col items-center w-1/3 max-w-[380px]"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <img src={projects[2].image} className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500" alt={projects[2].title} />
            </div>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } } }}
              className="mt-6 text-center"
            >
              <h4 className="font-serif text-2xl md:text-3xl text-white">{projects[2].title}</h4>
              <p className="text-white/50 text-[10px] tracking-widest uppercase mt-2">{projects[2].category}</p>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* Tunnel Animation Section */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${total * 100}vh` }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
          
          {/* Project Frames */}
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              total={total}
              scrollIndex={scrollIndex}
            />
          ))}

        </div>
      </div>

    </section>
  );
}
