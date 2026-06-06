import { motion } from "framer-motion";

const logos = [
  "Vogue", "Spotify", "Nike", "Apple", "LVMH", 
  "Netflix", "Google", "Amazon", "Tesla", "Adobe"
];

// We repeat the array so the marquee can scroll infinitely without gaps
// We need enough items so that 50% of the total width is wider than the screen
const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

export function LogoMarquee() {
  return (
    <section className="w-full py-20 md:py-32 overflow-hidden bg-transparent border-t border-border/20">
      <div className="flex flex-col items-center mb-10 md:mb-16">
        <p className="eyebrow text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">Selected Clients</p>
      </div>
      
      <div 
        className="relative flex w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40 // Adjust this for rolling speed
          }}
        >
          {repeatedLogos.map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center min-w-[150px] sm:min-w-[200px] md:min-w-[280px] px-4 md:px-8"
            >
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold opacity-30 hover:opacity-100 transition-opacity duration-300 text-foreground cursor-default select-none">
                {logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
