import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "../components/portfolio-chrome";
import { motion } from "framer-motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Anurag" },
      { name: "description", content: "Core services and creative capabilities." },
    ],
  }),
  component: Services,
});

const serviceList = [
  {
    num: "01",
    title: "Cinematic Direction",
    description: "Developing visual narratives that merge raw human emotion with high-fashion sensibilities. Translating brand identity into movement and atmosphere.",
    details: ["Film & Video Direction", "Concept & Treatment Design", "Cinematography & Framing", "Creative Guidance"]
  },
  {
    num: "02",
    title: "Editorial & Campaigns",
    description: "Creating high-impact editorial imagery and large-scale visual campaigns that command attention and define brands.",
    details: ["Creative Art Direction", "Editorial System Design", "Production Management", "Visual Strategy"]
  },
  {
    num: "03",
    title: "Color & Post-Production",
    description: "Crafting distinct visual tones and film-grade color grading. Bringing a unified texture and mood to stills and moving images alike.",
    details: ["Bespoke Color Styling", "Texture & Film Emulation", "Editing & Post Supervision", "VFX Supervision"]
  },
  {
    num: "04",
    title: "Digital & Book Design",
    description: "Designing physical publications, exhibition layouts, and curated digital experiences that preserve artistic intent.",
    details: ["Printed Book Editorial", "Exhibition Space Curation", "UI/UX & Digital Galleries", "Typography & Layout"]
  }
];

function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <PageShell>
      {/* Top section matching About page structure */}
      <section className="grid gap-16 md:grid-cols-[1.1fr_.9fr] items-start">
        <PageHeader eyebrow="Capabilities" title="Services" />
        <div className="max-w-2xl space-y-7 text-lg leading-8 text-muted-foreground">
          <p>Moving between cinematic film, high-end photography, and editorial design.</p>
          <p>Providing a unified, premium visual voice for forward-thinking brands and artists.</p>
        </div>
      </section>

      {/* Bottom section matching About page card style but with services details */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-5%" }}
        className="mt-28 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16"
      >
        {serviceList.map((service, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="py-6 transition-transform duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-[0.62rem] tracking-[0.2em] text-muted-foreground/60 uppercase">
                  Service {service.num}
                </span>
                <div className="h-[1px] w-6 bg-border/20" />
              </div>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-white">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground font-light">
                {service.description}
              </p>
            </div>

            {/* Subtle Pills for Details */}
            <div className="mt-6 flex flex-wrap gap-2">
              {service.details.map((detail, idx) => (
                <span 
                  key={idx} 
                  className="font-sans text-[0.62rem] uppercase tracking-wider text-muted-foreground/80 bg-white/5 border border-white/5 px-3 py-1 rounded-full transition-colors duration-300 hover:text-white"
                >
                  {detail}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.section>
    </PageShell>
  );
}
