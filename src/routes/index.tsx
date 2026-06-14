import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
import { LogoMarquee } from "../components/ui/logo-marquee";
import { FeaturedWork } from "../components/featured-work";
import { motion } from "framer-motion";

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
      <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-transparent">
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center pointer-events-none px-[5vw]">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.25,
                  delayChildren: 0.15,
                }
              }
            }}
            className="font-serif text-[clamp(1.6rem,6vw,6.5rem)] font-bold leading-[1.05] tracking-tight text-white select-none flex flex-col items-center justify-center drop-shadow-lg"
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
              <span 
                className="bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(158,127,255,0.2)] select-none"
                style={{
                  backgroundImage: "linear-gradient(to right, #589cff 0%, #9e7fff 35%, #e07eff 70%, #ffd2e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Storytelling
              </span>
            </motion.span>
          </motion.h1>
        </div>
        
        {/* Tender Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.7, transition: { delay: 1.6, duration: 1.5, ease: "easeOut" } }
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

      <FeaturedWork />

      <LogoMarquee />
    </PageShell>
  );
}
