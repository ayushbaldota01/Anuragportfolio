import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
import { BrandsWorkedWith } from "../components/brands-worked-with";
import { LogoMarquee } from "../components/ui/logo-marquee";
import { motion } from "framer-motion";

const works = [
  ["The Mirror™", "A guide to seeing your brand, and yourself, clearly.", "Book", "work-visual-a"],
  ["Wonderland", "A journey into light, colour and truth.", "Album", "work-visual-b"],
  ["Pots & Pithoi", "A world of earthy elegance and quiet prestige.", "Direction", "work-visual-c"],
  ["The Art of Becoming", "A space for thoughtful conversations.", "Podcast", "work-visual-d"],
  ["Lucy Nolan", "Where virtuosity meets visual presence.", "Direction", "work-visual-e"],
  ["Presence", "A quiet moment of clarity.", "Film", "work-visual-f"],
];

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
        <div className="relative z-10 w-full max-w-5xl mx-auto text-left pointer-events-none px-[5vw]">
          <h1 className="font-serif text-[clamp(1.5rem,5.5vw,5.8rem)] font-bold leading-[1.05] tracking-tight text-white select-none flex flex-col items-start justify-center drop-shadow-lg">
            <span className="whitespace-nowrap">Where Creativity Meets</span>
            <span 
              className="bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(158,127,255,0.2)] select-none whitespace-nowrap"
              style={{
                backgroundImage: "linear-gradient(to right, #589cff 0%, #9e7fff 35%, #e07eff 70%, #ffd2e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Cinematic Storytelling
            </span>
          </h1>
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

      <section className="page-container max-w-[1569px] mx-auto grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20 xl:gap-x-[120px] md:gap-y-20 lg:gap-y-[100px] pb-8">
        {works.map(([title, description, type, visual], index) => {
          const isMirrorStyle = index % 2 === 0;
          
          return (
            <motion.article 
              className={`group ${index % 2 ? "md:mt-40 lg:mt-[160px] xl:mt-[200px]" : ""}`} 
              key={title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.6, delay: (index % 2) * 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/" className="block">
                <div className={`work-visual ${visual}`}>
                  <span className="view-pill">View work</span>
                  {/* Thumbnail Text (For Wonderland style) */}
                  {!isMirrorStyle && (
                    <span className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(2rem,3.5vw,2.8rem)] leading-tight text-black z-10 uppercase text-center px-4 tracking-[0.02em]">
                      {title}
                    </span>
                  )}
                  {isMirrorStyle && (
                    <span className="mock-title opacity-0 group-hover:opacity-100 transition-opacity duration-300">{title}</span>
                  )}
                </div>
                {isMirrorStyle && (
                  <div className="mt-4 md:mt-5 flex flex-col gap-3">
                    <div>
                      <h2 className="font-sans text-[13px] md:text-[14px] font-extrabold uppercase tracking-[0.08em] leading-tight text-foreground">{title}</h2>
                      <p className="font-sans text-[12px] md:text-[13px] font-normal leading-relaxed text-muted-foreground mt-1 md:mt-1.5">{description}</p>
                    </div>
                    <div>
                      <span className="inline-block border border-white/15 rounded-[2px] px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
                        {type}
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            </motion.article>
          );
        })}
      </section>

      <div className="mt-40 mb-20 md:mt-64 md:mb-40">
        <BrandsWorkedWith />
      </div>
      
      <LogoMarquee />
    </PageShell>
  );
}
