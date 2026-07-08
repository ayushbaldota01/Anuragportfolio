import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";

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
    link: "https://youtu.be/_wfZiewOmek?si=R7gyhhGiuA3qELJO",
  },
  {
    id: "netflix",
    title: "NETFLIX Murder Mubarak",
    category: "Promo",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    link: "https://youtube.com/shorts/r3TeKesHISk?si=zL-HjUJqLISgXQnc",
  },
  {
    id: "jw-marriott",
    title: "JW Marriott Saviour Series",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
    link: "https://youtube.com/shorts/bKx8orCjPK0?si=VhMNE6q1jlQ8ANwa",
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
    link: "https://youtu.be/Ne6kB9pRHTA?si=orXTioEZb95dLU24",
  }
];

function ProjectItem({ project, index, total, scrollIndex, onClick }: any) {
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
      <div 
        onClick={() => project.link && onClick && onClick(project)}
        className={`relative w-[70vw] sm:w-[50vw] md:w-[32vw] min-w-[220px] max-w-[420px] aspect-[4/5] overflow-hidden rounded-xl bg-black pointer-events-auto transition-shadow duration-300 ${
          project.link 
            ? "cursor-pointer group/card hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            : ""
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
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
  const [activeVideo, setActiveVideo] = useState<{ url: string; isShort: boolean } | null>(null);

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

  const getEmbedUrl = (link?: string) => {
    if (!link) return null;
    
    if (link.includes("youtu.be/")) {
      const id = link.split("youtu.be/")[1]?.split("?")[0];
      return { type: "youtube", url: `https://www.youtube.com/embed/${id}?autoplay=1`, isShort: false };
    }
    
    if (link.includes("youtube.com/")) {
      if (link.includes("/shorts/")) {
        const id = link.split("/shorts/")[1]?.split("?")[0];
        return { type: "youtube", url: `https://www.youtube.com/embed/${id}?autoplay=1`, isShort: true };
      }
      if (link.includes("watch?v=")) {
        const id = link.split("watch?v=")[1]?.split("&")[0];
        return { type: "youtube", url: `https://www.youtube.com/embed/${id}?autoplay=1`, isShort: false };
      }
    }

    if (link.includes("instagram.com/")) {
      return { type: "instagram", url: link, isShort: true };
    }

    return null;
  };

  const handleProjectClick = (project: any) => {
    if (!project.link) return;
    const embed = getEmbedUrl(project.link);
    if (embed) {
      if (embed.type === "youtube") {
        setActiveVideo({ url: embed.url, isShort: embed.isShort });
      } else {
        // Open Instagram in new tab (since embedding is restricted by Instagram)
        window.open(project.link, "_blank");
      }
    }
  };

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
                className={`w-full flex flex-col items-center group ${project.link ? 'cursor-pointer' : ''}`}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4 + (idx % 3), ease: "easeInOut", delay: idx * 0.2 }}
                whileHover={{ y: -24, transition: { duration: 0.4, ease: "easeOut" } }}
                onClick={() => handleProjectClick(project)}
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
              onClick={handleProjectClick}
            />
          ))}

        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 pointer-events-auto"
            onClick={() => setActiveVideo(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors p-2 text-2xl z-55 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black border border-white/10 ${
                activeVideo.isShort 
                  ? "max-w-[380px] aspect-[9/16]" 
                  : "max-w-5xl aspect-video"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo.url}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
