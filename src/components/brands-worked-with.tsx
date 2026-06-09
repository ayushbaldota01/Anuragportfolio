"use client";

import { useRef, useState, useEffect } from "react";
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
  const outerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const isLockedRef = useRef(false);
  const lastUnlockedRef = useRef(0);
  const touchStartY = useRef(0);

  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track the scroll progress of the inner container, not the window
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 items mean 4 scroll intervals. So latest * 4 gives the index.
    const newIndex = Math.min(Math.round(latest * 4), 4);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const lockScroll = (targetY: number) => {
    if (isLockedRef.current) return;
    
    // Cooldown check (prevent immediate re-locking right after unlocking)
    if (Date.now() - lastUnlockedRef.current < 1000) return;

    // Calculate scrollbar width to prevent visual layout shifts
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    isLockedRef.current = true;
    setIsLocked(true);

    window.scrollTo(0, targetY);

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  };

  const unlockScroll = (scrollOffset: number) => {
    if (!isLockedRef.current) return;
    isLockedRef.current = false;
    setIsLocked(false);
    lastUnlockedRef.current = Date.now();

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.paddingRight = "";

    window.scrollBy(0, scrollOffset);
  };

  // Autoplay (auto-rolling) logic
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const clientHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Calculate current index and loop back to start if at the end
      const currentIndex = Math.min(Math.round(scrollTop / clientHeight), 4);
      const nextIndex = (currentIndex + 1) % brandExamples.length;

      container.scrollTo({
        top: nextIndex * clientHeight,
        behavior: "smooth",
      });
    }, 3000); // auto-rolls every 3 seconds
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const resetAutoplayTimer = () => {
    stopAutoplay();
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    // Resume autoplay after 4 seconds of inactivity
    interactionTimeoutRef.current = setTimeout(() => {
      if (isLockedRef.current) {
        startAutoplay();
      }
    }, 4000);
  };

  // Window scroll listener: locks page when section enters viewport
  useEffect(() => {
    const handleWindowScroll = () => {
      if (isLockedRef.current) return;

      const outer = outerRef.current;
      const container = containerRef.current;
      if (!outer || !container) return;

      const rect = outer.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      // Check if section top is close to viewport top
      if (rect.top >= -50 && rect.top <= 50) {
        const sectionTop = window.scrollY + rect.top;

        if (rect.top > 0) {
          // Entering from above (scrolling down), should lock if container is at top
          if (scrollTop <= 5) {
            lockScroll(sectionTop);
          }
        } else {
          // Entering from below (scrolling up), should lock if container is at bottom
          if (scrollTop >= maxScroll - 5) {
            lockScroll(sectionTop);
          }
        }
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  // Event listeners on inner scroll container to handle boundary scrolling and pause autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isLockedRef.current) return;

      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      // Scrolling up at the top: unlock page and scroll up
      if (scrollTop <= 2 && e.deltaY < 0) {
        e.preventDefault();
        unlockScroll(-70);
      }
      // Scrolling down at the bottom: unlock page and scroll down
      else if (scrollTop >= maxScroll - 5 && e.deltaY > 0) {
        e.preventDefault();
        unlockScroll(70);
      }

      resetAutoplayTimer();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      resetAutoplayTimer();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLockedRef.current) return;

      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY; // positive = scroll down, negative = scroll up

      // Scrolling up at the top: unlock page and scroll up
      if (scrollTop <= 2 && deltaY < 0) {
        unlockScroll(-70);
      }
      // Scrolling down at the bottom: unlock page and scroll down
      else if (scrollTop >= maxScroll - 5 && deltaY > 0) {
        unlockScroll(70);
      }

      resetAutoplayTimer();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Manage Autoplay life cycle based on locking state
  useEffect(() => {
    if (isLocked) {
      startAutoplay();
    } else {
      stopAutoplay();
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    }
    return () => {
      stopAutoplay();
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [isLocked]);

  // Clean up global styles when component is unmounted
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  return (
    <div ref={outerRef} className="h-screen w-full bg-transparent overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
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
