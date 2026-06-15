import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: custom * 0.15, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const projects = [
  {
    id: "lululemon",
    number: "1",
    title: "LULULEMON",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80"],
    span: "lg:col-span-5",
    height: "h-[320px] sm:h-[360px] lg:h-[420px]"
  },
  {
    id: "mission-fed",
    number: "2",
    title: "MISSION FED",
    images: ["https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-4",
    height: "h-[260px] sm:h-[290px] lg:h-[310px]"
  },
  {
    id: "intuit",
    number: "3",
    title: "INTUIT",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516321310766-61f5f74f0a7d?auto=format&fit=crop&w=900&q=80"
    ],
    span: "lg:col-span-3",
    height: "h-[220px] sm:h-[240px] lg:h-[155px]"
  },
  {
    id: "cutwater",
    number: "4",
    title: "CUTWATER",
    images: ["https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80"],
    span: "lg:col-span-3 lg:mt-10",
    height: "h-[260px] sm:h-[280px] lg:h-[280px]"
  },
  {
    id: "lafayette",
    number: "5",
    title: "THE LAFAYETTE HOTEL & SWIM CLUB",
    images: ["https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"],
    span: "lg:col-span-6 lg:mt-10",
    height: "h-[320px] sm:h-[360px] lg:h-[420px]",
    overlayText: "The Lafayette Hotel & Swim Club"
  },
  {
    id: "illumina",
    number: "6",
    title: "ILLUMINA",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"],
    span: "lg:col-span-3 lg:mt-10",
    height: "h-[260px] sm:h-[280px] lg:h-[280px]"
  },
  {
    id: "vuori",
    number: "7",
    title: "VUORI",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-4 lg:mt-6",
    height: "h-[250px] sm:h-[280px] lg:h-[280px]"
  },
  {
    id: "ricoh",
    number: "8",
    title: "RICOH",
    images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"],
    span: "lg:col-span-5 lg:mt-6",
    height: "h-[320px] sm:h-[380px] lg:h-[425px]",
    overlayTextBottom: "and those who build what they need."
  },
  {
    id: "bulleit",
    number: "9",
    title: "BULLEIT FRONTIER WHISKEY",
    images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-3 lg:mt-6",
    height: "h-[250px] sm:h-[280px] lg:h-[280px]"
  },
  {
    id: "nike",
    number: "10",
    title: "NIKE",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-4 lg:mt-8",
    height: "h-[260px] sm:h-[300px] lg:h-[340px]"
  },
  {
    id: "sony",
    number: "11",
    title: "SONY",
    images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-5 lg:mt-8",
    height: "h-[300px] sm:h-[340px] lg:h-[400px]"
  },
  {
    id: "apple",
    number: "12",
    title: "APPLE",
    images: ["https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-3 lg:mt-8",
    height: "h-[240px] sm:h-[280px] lg:h-[300px]"
  },
  {
    id: "samsung",
    number: "13",
    title: "SAMSUNG",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-3 lg:mt-6",
    height: "h-[240px] sm:h-[260px] lg:h-[280px]"
  },
  {
    id: "adidas",
    number: "14",
    title: "ADIDAS",
    images: ["https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-3 lg:mt-6",
    height: "h-[240px] sm:h-[260px] lg:h-[280px]"
  },
  {
    id: "porsche",
    number: "15",
    title: "PORSCHE",
    images: ["https://images.unsplash.com/photo-1503376712351-1c22d42ca0fa?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-6 lg:mt-6",
    height: "h-[320px] sm:h-[360px] lg:h-[420px]",
    overlayText: "Porsche Carrera GT"
  },
  {
    id: "rolex",
    number: "16",
    title: "ROLEX",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-5 lg:mt-10",
    height: "h-[300px] sm:h-[350px] lg:h-[400px]"
  },
  {
    id: "gucci",
    number: "17",
    title: "GUCCI",
    images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-4 lg:mt-10",
    height: "h-[260px] sm:h-[300px] lg:h-[320px]"
  },
  {
    id: "tesla",
    number: "18",
    title: "TESLA",
    images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-3 lg:mt-10",
    height: "h-[240px] sm:h-[260px] lg:h-[280px]"
  },
  {
    id: "redbull",
    number: "19",
    title: "RED BULL",
    images: ["https://images.unsplash.com/photo-1525421308233-0bd9f150495f?auto=format&fit=crop&w=1200&q=80"],
    span: "lg:col-span-12 lg:mt-8",
    height: "h-[350px] sm:h-[450px] lg:h-[550px]"
  }
];

export function FeaturedWork() {
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
          <h1 className="font-serif text-[64px] leading-none tracking-tight text-white sm:text-[76px] md:text-[92px] lg:text-[104px] xl:text-[112px]">
            FEATURED WORK
          </h1>
        </motion.header>

        <main className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-12" aria-label="Featured work portfolio grid">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              id={`featured-work-${project.id}-link`}
              href="#"
              className={`group block ${project.span}`}
              custom={index % 3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={itemVariants}
            >
              <div className="mb-4 flex items-center gap-3 text-[14px] font-medium uppercase tracking-tight text-white/60">
                <span>{project.title}</span>
              </div>
              <div className={`grid gap-3 md:gap-4 ${project.images.length > 1 ? '' : 'h-auto'}`}>
                {project.images.map((imgSrc, imgIndex) => (
                  <div key={imgIndex} className="relative w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                    {/* Ambilight Background Glow */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                      <img 
                        src={imgSrc} 
                        alt="" 
                        aria-hidden="true" 
                        className="absolute inset-0 h-full w-full object-cover blur-[48px] saturate-[1.5] brightness-[1.2] scale-[1.1] opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-60 rounded-xl"
                      />
                    </div>
                    {/* Main Image Layer */}
                    <div className="overflow-hidden rounded-xl relative z-10 w-full h-full bg-neutral-900">
                      <img 
                        src={imgSrc} 
                        alt={`${project.title} project preview`} 
                        className={`${project.height} w-full object-cover transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`} 
                      />
                      {project.overlayText && imgIndex === 0 && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <span className="px-6 text-center text-sm font-medium uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                            {project.overlayText}
                          </span>
                        </div>
                      )}
                      {project.overlayTextBottom && imgIndex === 0 && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-6">
                          <span className="text-center font-serif text-[20px] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-[24px]">
                            {project.overlayTextBottom}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.a>
          ))}
        </main>
      </section>
    </div>
  );
}
