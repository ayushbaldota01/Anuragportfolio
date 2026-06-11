import React from "react";
import { motion } from "framer-motion";

export function FeaturedWork() {
  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: custom * 0.15, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <div className="bg-transparent text-white font-inter w-full pb-20 overflow-hidden">
      <section className="w-full px-5 py-8 md:px-8 md:py-10 lg:px-10 xl:px-12 2xl:px-16">
        <motion.header 
          className="mb-14 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-oswald text-[64px] leading-none tracking-tight text-white sm:text-[76px] md:text-[92px] lg:text-[104px] xl:text-[112px]">FEATURED WORK</h1>
        </motion.header>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12" aria-label="Featured work portfolio grid">
          <motion.a 
            id="featured-work-lululemon-link" 
            href="#" 
            className="group block lg:col-span-5 lg:row-span-1"
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>1</span><span>/</span><span>LULULEMON</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80" alt="Lululemon project preview" className="h-[320px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[360px] lg:h-[420px]" />
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-mission-fed-link" 
            href="#" 
            className="group block lg:col-span-4 lg:row-span-1"
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>2</span><span>/</span><span>MISSION FED</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80" alt="Mission Fed project preview" className="h-[260px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[290px] lg:h-[310px]" />
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-intuit-link" 
            href="#" 
            className="group block lg:col-span-3 lg:row-span-1"
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>3</span><span>/</span><span>INTUIT</span>
            </div>
            <div className="grid gap-6">
              <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
                <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" alt="Intuit project preview top" className="h-[220px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[240px] lg:h-[155px]" />
                </div>
              </div>
              <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
                <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                  <img src="https://images.unsplash.com/photo-1516321310766-61f5f74f0a7d?auto=format&fit=crop&w=900&q=80" alt="Intuit project preview bottom" className="h-[220px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[240px] lg:h-[155px]" />
                </div>
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-cutwater-link" 
            href="#" 
            className="group block lg:col-span-3 lg:row-span-1 lg:mt-10"
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>4</span><span>/</span><span>CUTWATER</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80" alt="Cutwater project preview" className="h-[260px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[280px] lg:h-[280px]" />
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-lafayette-link" 
            href="#" 
            className="group block lg:col-span-6 lg:row-span-1 lg:mt-10"
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>5</span><span>/</span><span>THE LAFAYETTE HOTEL &amp; SWIM CLUB</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80" alt="The Lafayette Hotel and Swim Club project preview" className="h-[320px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[360px] lg:h-[420px]" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="px-6 text-center text-sm font-medium uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">The Lafayette Hotel &amp; Swim Club</span>
                </div>
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-illumina-link" 
            href="#" 
            className="group block lg:col-span-3 lg:row-span-1 lg:mt-10"
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>6</span><span>/</span><span>ILLUMINA</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80" alt="Illumina project preview" className="h-[260px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[280px] lg:h-[280px]" />
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-vuori-link" 
            href="#" 
            className="group block lg:col-span-4 lg:row-span-1 lg:mt-6"
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>7</span><span>/</span><span>VUORI</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" alt="Vuori project preview" className="h-[250px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[280px] lg:h-[280px]" />
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-ricoh-link" 
            href="#" 
            className="group block lg:col-span-5 lg:row-span-1 lg:mt-6"
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>8</span><span>/</span><span>RICOH</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" alt="Ricoh project preview" className="h-[320px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[380px] lg:h-[425px]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-6">
                  <span className="text-center font-serif text-[20px] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-[24px]">and those who build what they need.</span>
                </div>
              </div>
            </div>
          </motion.a>

          <motion.a 
            id="featured-work-bulleit-link" 
            href="#" 
            className="group block lg:col-span-3 lg:row-span-1 lg:mt-6"
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={itemVariants}
          >
            <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
              <span>9</span><span>/</span><span>BULLEIT FRONTIER WHISKEY</span>
            </div>
            <div className="relative p-2 sm:p-3 md:p-4 bg-white/[0.03] border border-white/10 rounded-[6px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-white/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden rounded-[2px] bg-neutral-900 relative">
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" alt="Bulleit Frontier Whiskey project preview" className="h-[250px] w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-[280px] lg:h-[280px]" />
              </div>
            </div>
          </motion.a>
        </main>
      </section>
    </div>
  );
}
