import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
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
    title: "Cinematic Direction",
    description: "Developing visual narratives that merge raw emotion with refined storytelling."
  },
  {
    title: "Editorial & Campaigns",
    description: "Creating high-impact editorial imagery and campaigns that define brands."
  },
  {
    title: "Color & Post-Production",
    description: "Crafting distinct visual tones through color grading, retouching and post-production."
  },
  {
    title: "Digital & Book Design",
    description: "Designing books, layouts and digital experiences that preserve artistic intent."
  },
  {
    title: "Production Management",
    description: "End-to-end production support to bring ideas to life seamlessly."
  },
  {
    title: "Visual Strategy",
    description: "Building visual systems and strategies that communicate with clarity and impact."
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
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <PageShell>
      {/* Top Header Section */}
      <section className="grid gap-10 md:grid-cols-[1.2fr_.8fr] items-end pt-10 px-4 md:px-0 w-full">
        <div>
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] text-[#4ADE80] uppercase block mb-6">
            Services
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] text-white max-w-2xl">
            Crafting Visual<br />Stories That <i className="text-[#4ADE80] font-serif italic pr-2">Move.</i>
          </h1>
        </div>
        <div className="flex flex-col items-start md:pb-2">
          <p className="font-sans text-[13px] md:text-sm leading-relaxed text-white/70 max-w-md mb-8">
            Merging cinematic film, high-end photography, and editorial design to deliver powerful visual experiences for brands and artists.
          </p>
          <div className="w-12 h-[2px] bg-[#4ADE80] opacity-80" />
        </div>
      </section>

      {/* Grid Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-5%" }}
        className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0"
      >
        {serviceList.map((service, index) => {
          return (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -8, 0], 
                  rotate: [0, index % 2 === 0 ? 0.5 : -0.5, 0] 
                }}
                transition={{ 
                  duration: 4 + (index % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                className="h-full bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col justify-start hover:bg-white/10 transition-colors duration-300"
              >
                <h2 className="font-sans text-lg font-bold text-white mb-3">
                  {service.title}
                </h2>
                <p className="font-sans text-[13px] leading-relaxed text-white/60 font-light">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.section>
    </PageShell>
  );
}
