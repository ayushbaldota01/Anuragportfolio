import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";

export const projects = [
  {
    id: "jw-marriott",
    title: "JW Marriott Saviour Series",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
    link: "https://youtube.com/shorts/bKx8orCjPK0?si=VhMNE6q1jlQ8ANwa",
    video: "/videos/gq-savior.mp4",
  },
  {
    id: "asian-paints",
    title: "Asian Paints AD Design Show",
    category: "Exhibition",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
    link: "https://youtu.be/_wfZiewOmek?si=R7gyhhGiuA3qELJO",
    video: "/videos/asian-paints.mp4",
  },
  {
    id: "netflix",
    title: "NETFLIX Murder Mubarak",
    category: "Promo",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    link: "https://youtube.com/shorts/r3TeKesHISk?si=zL-HjUJqLISgXQnc",
    video: "/videos/murder-mubarak.mp4",
  },
  {
    id: "gq-varun",
    title: "GQ x Varun Dhawan",
    category: "Brand Campaign",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "tira-beauty",
    title: "Tira Beauty x Kareena Kapoor",
    category: "Beauty Campaign",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
    video: "/videos/tira.mp4",
  },
  {
    id: "wedding-affairs",
    title: "Wedding Affairs x Urvashi",
    category: "Fashion & Wedding",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    link: "https://www.instagram.com/reel/DU3Pif8CCek/?igsh=MTNuczE2aTZ1ZThhNQ==",
  },
  {
    id: "sunny-leone",
    title: "Sunny Leone x Times of India",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    video: "/videos/sunny-leone.mp4",
  },
  {
    id: "zouk",
    title: "Zouk",
    category: "Brand Campaign",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    video: "/videos/zouk.mp4",
  },
  {
    id: "adds-karigars",
    title: "ADDS x Karigars",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
    link: "https://youtu.be/Ne6kB9pRHTA?si=orXTioEZb95dLU24",
    video: "/videos/karigars.mp4",
  }
];

export const photographyProjects = [
  {
    id: "p1",
    title: "Portrait Series",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "p2",
    title: "Editorial Fashion",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p3",
    title: "Product Shoot",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p4",
    title: "Landscape Captures",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p5",
    title: "Wedding Highlights",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "p6",
    title: "Street Photography",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p7",
    title: "Abstract Art",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p8",
    title: "Architecture",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p9",
    title: "Nature Trails",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const CardMedia = ({ project, className }: { project: any, className: string }) => {
  const [src, setSrc] = useState(() => {
    if (!project.link) return project.image;
    
    // Check if it's a YouTube link
    const ytMatch = project.link.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
    }
    
    // Fallback to Microlink screenshot for other links (like Instagram)
    return `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`;
  });
  const [errorStage, setErrorStage] = useState(0);

  return (
    <img
      src={src}
      alt={project.title}
      className={className}
      onError={() => {
        // If maxresdefault fails for YouTube, try hqdefault, then fallback to original project image
        const ytMatch = project.link?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
        
        if (errorStage === 0 && ytMatch && ytMatch[1]) {
          setSrc(`https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`);
          setErrorStage(1);
        } else if (errorStage < 2) {
          setSrc(project.image);
          setErrorStage(2);
        }
      }}
    />
  );
};

// ── ThumbnailImage (fallback for non-YouTube links) ─────────────────────────
const ThumbnailImage = ({ project, className }: { project: any; className: string }) => {
  const [src, setSrc] = useState(() => {
    if (!project.link) return project.image;
    return `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`;
  });
  const [errorStage, setErrorStage] = useState(0);

  return (
    <img
      src={src}
      alt={project.title}
      className={className}
      onError={() => {
        if (errorStage < 1) {
          setSrc(project.image);
          setErrorStage(1);
        }
      }}
    />
  );
};

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

  const pointerEvents = useTransform(scrollIndex, (latest: number) => {
    return (latest > index + 0.2 || latest < index - 1) ? "none" : "auto";
  });

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 ${project.link ? 'cursor-pointer' : ''}`}
      onClick={() => project.link && window.open(project.link, '_blank')}
      style={{
        x,
        y,
        scale,
        opacity,
        pointerEvents,
        zIndex: total - index,
        willChange: "transform, opacity",
      }}
    >
      <div className="relative w-[70vw] sm:w-[50vw] md:w-[32vw] min-w-[220px] max-w-[420px] aspect-[4/5] overflow-hidden rounded-xl bg-black">
        <CardMedia project={project} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
        className="absolute top-[105%] left-1/2 -translate-x-1/2 w-[90vw] md:w-[150%] text-center pointer-events-none px-4"
      >
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white break-words">
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
  const [activeTab, setActiveTab] = useState<'videography' | 'photography'>('videography');
  const activeProjects = activeTab === 'videography' ? projects : photographyProjects;

  const containerRef = useRef<HTMLDivElement>(null);
  const total = activeProjects.length;

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
      <div className="relative w-full px-4 sm:px-5 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-32 z-30">
        <h2 className="font-serif text-[clamp(2.2rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-md pointer-events-none">
          FEATURED WORK
        </h2>
        <p className="mt-3 sm:mt-4 text-white/50 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium drop-shadow-md pointer-events-none">
          Scroll to explore
        </p>

        {/* Toggle Button */}
        <div className="mt-8 sm:mt-12 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 w-max">
          <button
            onClick={() => setActiveTab('videography')}
            className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors z-10 ${
              activeTab === 'videography' ? 'text-black' : 'text-white/60 hover:text-white'
            }`}
          >
            Videography
            {activeTab === 'videography' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('photography')}
            className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors z-10 ${
              activeTab === 'photography' ? 'text-black' : 'text-white/60 hover:text-white'
            }`}
          >
            Photography
            {activeTab === 'photography' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* 3x3 Grid Intro Section */}
      <div className="w-full min-h-[60vh] sm:min-h-[80vh] flex flex-col items-center justify-center pt-12 sm:pt-24 pb-16 sm:pb-32 z-20 relative bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 w-full max-w-[1400px] px-4 sm:px-8"
          >
            {activeProjects.slice(0, 9).map((project, idx) => (
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
                    {!(project as any).video ? (
                      <CardMedia project={project} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <video
                        src={(project as any).video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                      />
                    )}
                  </div>
                  <div className="mt-4 sm:mt-6 text-center px-2 w-full">
                    <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-white break-words">{project.title}</h4>
                    <p className="text-white/50 text-[9px] sm:text-[10px] tracking-widest uppercase mt-1.5 sm:mt-2">{project.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tunnel Animation Section */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${total * 100}vh` }}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
          
          {/* Project Frames */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {activeProjects.map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  total={total}
                  scrollIndex={scrollIndex}
                />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </section>
  );
}
