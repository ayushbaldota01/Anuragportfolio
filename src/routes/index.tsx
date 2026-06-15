import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
import { LogoMarquee } from "../components/ui/logo-marquee";
import { FeaturedWork } from "../components/featured-work";
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
      <div className="relative min-h-[100dvh] w-full grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden bg-transparent px-[5vw] pt-20 md:pt-0">
        
        {/* Left Side: Text */}
        <div className="relative z-10 w-full text-center md:text-left pointer-events-none md:pr-8 order-1 md:order-1">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 1.8,
                }
              }
            }}
            className="font-serif text-[clamp(2.5rem,5vw,6rem)] font-bold leading-[1.05] tracking-tight text-white select-none flex flex-col items-center md:items-start justify-center drop-shadow-lg"
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="whitespace-nowrap"
            >
              Where{" "}
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
                Storytelling
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Right Side: 3D Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-[5] w-full h-[60vh] md:h-[90vh] pointer-events-auto flex items-center justify-center order-2 md:order-2 md:translate-x-8 lg:translate-x-16"
        >
          <div className="w-full h-full md:scale-[1.15] lg:scale-[1.25]">
            <AbstractChipsSpline
              scene={CHIPS_SCENE_URL}
              className="w-full h-full"
            />
          </div>
        </motion.div>
        
        {/* Tender Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 2.8, duration: 1.5, ease: "easeOut" }}
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

      <FeaturedWork />

      <LogoMarquee />
    </PageShell>
  );
}
