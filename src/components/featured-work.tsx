import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

export const projects = [
  {
    id: "gq-varun",
    title: "GQ x Varun Dhawan",
    category: "Brand Campaign",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "asian-paints",
    title: "Asian Paints AD Design Show",
    category: "Exhibition",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "netflix",
    title: "NETFLIX Murder Mubarak",
    category: "Promo",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jw-marriott",
    title: "JW Marriott Saviour Series",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tira-beauty",
    title: "Tira Beauty x Kareena Kapoor",
    category: "Beauty Campaign",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "wedding-affairs",
    title: "Wedding Affairs x Urvashi",
    category: "Fashion & Wedding",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    link: "https://www.instagram.com/reel/DU3Pif8CCek/?igsh=MTNuczE2aTZ1ZThhNQ==",
  },
  {
    id: "food-photography",
    title: "Food Photography",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.instagram.com/p/DJJ9HC5Sb58/?igsh=MWk4YmU1bmhsdG1xMA==",
  },
  {
    id: "sunny-leone",
    title: "Sunny Leone x Times of India",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "adds-karigars",
    title: "ADDS x Karigars",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
  }
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
      <div className="relative w-[70vw] sm:w-[50vw] md:w-[32vw] min-w-[220px] max-w-[420px] aspect-[4/5] overflow-hidden rounded-xl bg-black">
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
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white whitespace-nowrap">
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
      <div className="relative w-full px-4 sm:px-5 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-32 z-30 pointer-events-none">
        <h2 className="font-serif text-[clamp(2.2rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-md">
          FEATURED WORK
        </h2>
        <p className="mt-3 sm:mt-4 text-white/50 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium drop-shadow-md">
          Scroll to explore
        </p>
      </div>

      {/* 3x3 Grid Intro Section */}
      <div className="w-full min-h-[60vh] sm:min-h-[80vh] flex flex-col items-center justify-center pt-12 sm:pt-24 pb-16 sm:pb-32 z-20 relative bg-transparent">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-[1400px] px-4 sm:px-8"
        >
          {projects.slice(0, 9).map((project, idx) => (
            <motion.div 
              key={project.id}
              variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } } }}
              className="flex flex-col items-center w-full max-w-[320px] sm:max-w-[380px] mx-auto"
            >
              <motion.div 
                className="w-full flex flex-col items-center cursor-pointer group"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4 + (idx % 3), ease: "easeInOut", delay: idx * 0.2 }}
                whileHover={{ y: -24, transition: { duration: 0.4, ease: "easeOut" } }}
                onClick={() => (project as any).link && window.open((project as any).link, '_blank')}
              >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-500">
                  <img src={project.image} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt={project.title} />
                </div>
                <div className="mt-4 sm:mt-6 text-center">
                  <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">{project.title}</h4>
                  <p className="text-white/50 text-[9px] sm:text-[10px] tracking-widest uppercase mt-1.5 sm:mt-2">{project.category}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
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
