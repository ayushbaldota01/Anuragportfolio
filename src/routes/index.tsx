import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
import { LogoMarquee } from "../components/ui/logo-marquee";
import { FeaturedWork } from "../components/featured-work";
import { TransitionGallery } from "../components/ui/transition-gallery";
import { AbstractChipsSpline } from "../components/ui/abstract-chips-spline";
import { motion } from "framer-motion";

// Using the local exported file
// const CHIPS_SCENE_URL = "https://prod.spline.design/zdJmWpHDU0Kvr5gq/scene.splinecode";
const CHIPS_SCENE_URL = "/scene.splinecode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Works — Portfolio Gallery" },
      { name: "description", content: "A living portfolio gallery of selected creative work." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell noPadding>
      <div 
        className="relative min-h-[100vh] min-h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center md:justify-start overflow-hidden bg-transparent px-[5vw] pt-28 md:pt-0"
        style={{ isolation: 'isolate' }}
      >
        
        {/* Left Side: Text */}
        <div
          className="relative z-20 w-full md:w-[45%] flex-shrink-0 text-center md:text-left pointer-events-none mt-[5vh] md:mt-0 order-1 md:order-none"
          style={{
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.25,
                  delayChildren: 1.8,
                }
              }
            }}
            className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.08] tracking-tight text-white select-none flex flex-col items-center md:items-start justify-center drop-shadow-lg"
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="whitespace-nowrap"
            >
              Where
            </motion.span>
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="whitespace-nowrap"
            >
              <span 
                className="bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(158,127,255,0.2)] select-none"
                style={{
                  backgroundImage: "linear-gradient(to right, #589cff 0%, #9e7fff 35%, #e07eff 70%, #ffd2e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Creativity
              </span>{" "}
              Meets
            </motion.span>
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="whitespace-nowrap"
            >
              Cinematic{" "}
              <span className="select-none">
                Storytelling.
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Right Side: 3D Element */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: 0.8, duration: 1.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="relative md:absolute right-0 top-0 z-[5] w-full md:w-[58%] h-[55vh] md:h-full pointer-events-auto flex items-center justify-center order-2 md:order-none -mt-8 md:mt-0"
          style={{
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        >
          <div className="w-full h-full">
            <AbstractChipsSpline
              scene={CHIPS_SCENE_URL}
              className="w-full h-full"
            />
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-20"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 0.7, y: 0, transition: { delay: 2.8, duration: 1.5, ease: "easeOut" } }
          }}
        >
          <span className="font-sans font-bold text-[0.68rem] tracking-[0.18em] text-white/80 uppercase">
            scroll to discover
          </span>
          <div className="h-12 w-[1px] bg-white/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-white/80"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>

      <TransitionGallery />

      <div className="py-12 md:py-20 w-full relative z-30">
        <LogoMarquee />
      </div>

      <FeaturedWork />
    </PageShell>
  );
}
