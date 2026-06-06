import { motion } from "framer-motion";

const logoData = [
  {
    name: "WIRED",
    style: {
      fontFamily: "Courier New, Courier, monospace",
      fontWeight: 900,
      letterSpacing: "-0.05em",
    },
    className: "text-2xl sm:text-3xl md:text-4xl"
  },
  {
    name: "billboard",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 900,
      letterSpacing: "-0.06em",
    },
    className: "text-2xl sm:text-3xl md:text-4xl lowercase"
  },
  {
    name: "COMPLEX",
    style: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: 900,
      letterSpacing: "0.15em",
    },
    className: "text-lg sm:text-xl md:text-2xl uppercase"
  },
  {
    name: "Forbes",
    style: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    className: "text-2xl sm:text-3xl md:text-4xl"
  },
  {
    name: "Rolling Stone",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 900,
      fontStyle: "italic" as const,
      letterSpacing: "-0.05em",
    },
    className: "text-2xl sm:text-3xl md:text-4xl"
  },
  {
    name: "VARIETY",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 400,
      letterSpacing: "0.25em",
    },
    className: "text-xl sm:text-2xl md:text-3xl uppercase"
  },
  {
    name: "W",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 900,
      letterSpacing: "-0.08em",
    },
    className: "text-3xl sm:text-4xl md:text-5xl uppercase"
  }
];

// Repeat logos to support seamless infinite loop
const repeatedLogos = [...logoData, ...logoData, ...logoData, ...logoData];

export function LogoMarquee() {
  return (
    <section className="w-full py-10 md:py-16 overflow-hidden bg-linear-to-b from-amber-500/[0.03] via-transparent to-transparent border-t border-border/10">
      <div 
        className="relative flex w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 10%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.9) 42%, black 50%, rgba(0, 0, 0, 0.9) 58%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0.05) 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 10%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.9) 42%, black 50%, rgba(0, 0, 0, 0.9) 58%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0.05) 90%, transparent 100%)"
        }}
      >
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 80 // Significantly increased duration to lower the speed
          }}
        >
          {repeatedLogos.map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] md:min-w-[240px] px-6 md:px-10"
            >
              <span 
                style={logo.style}
                className={`${logo.className} text-white/90 hover:text-white transition-colors duration-300 cursor-default select-none`}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

