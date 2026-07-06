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
    title: "VIDEOGRAPHY",
    description: "Creating films that people remember, not just videos they watch."
  },
  {
    title: "PHOTOGRAPHY",
    description: "Images that add value to every brand and story."
  },
  {
    title: "BRAND CAMPAIGNS",
    description: "Built around ideas that leave a lasting impact."
  },
  {
    title: "SOCIAL MEDIA CONTENT",
    description: "Made to grab attention and drive engagement."
  },
  {
    title: "COMMERCIAL PRODUCTION",
    description: "Premium visuals designed for modern businesses."
  },
  {
    title: "CREATIVE DIRECTION",
    description: "Bringing clarity and purpose to every creative decision."
  },
  {
    title: "EDITING & POST PRODUCTION",
    description: "Where raw footage becomes something worth revisiting."
  },
  {
    title: "EVENT COVERAGE",
    description: "Capturing experiences beyond the moment itself."
  },
  {
    title: "DRONE CINEMATOGRAPHY",
    description: "A fresh perspective changes everything."
  },
  {
    title: "FASHION & LIFESTYLE",
    description: "Visuals that feel as premium as the brand."
  },
  {
    title: "FOOD & HOSPITALITY",
    description: "Content that makes people want to experience more."
  },
  {
    title: "INTERIORS & ARCHITECTURE",
    description: "Showcasing spaces with depth and character."
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
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <PageShell>
      {/* Top Header Section */}
      <section className="grid gap-8 sm:gap-10 md:grid-cols-[1.2fr_.8fr] items-end pt-6 sm:pt-10 px-4 sm:px-6 md:px-12 lg:px-16 w-full">
        <div>
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] text-[#4ADE80] uppercase block mb-6">
            Services
          </span>
          <h1 className="font-serif text-[clamp(3.2rem,6vw,5.5rem)] font-medium leading-[1.02] text-white max-w-3xl">
            Crafting Visual<br />Stories That <i className="text-[#4ADE80] font-serif italic pr-2">Move.</i>
          </h1>
        </div>
        <div className="flex flex-col items-start md:pb-2">
          <p className="font-sans text-[12px] md:text-[13px] leading-relaxed text-white/60 max-w-sm mb-8">
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
        className="mt-12 sm:mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 lg:px-16"
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
                className="h-full bg-white/5 border border-white/10 rounded-xl p-5 sm:p-8 flex flex-col justify-start hover:bg-white/10 transition-colors duration-300"
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
