import { motion } from "framer-motion";

const logoData = [
  {
    name: "Upgrad",
    style: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    className: "text-xl sm:text-2xl md:text-3xl"
  },
  {
    name: "Zouk",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 900,
      letterSpacing: "0.1em",
    },
    className: "text-xl sm:text-2xl md:text-3xl uppercase"
  },
  {
    name: "NETFLIX",
    style: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: 900,
      letterSpacing: "0.15em",
    },
    className: "text-lg sm:text-xl md:text-2xl uppercase"
  },
  {
    name: "Hindustan Unilever",
    style: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    className: "text-base sm:text-lg md:text-xl"
  },
  {
    name: "GQ",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 900,
      letterSpacing: "-0.05em",
    },
    className: "text-2xl sm:text-3xl md:text-4xl"
  },
  {
    name: "Tira Beauty",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 400,
      fontStyle: "italic" as const,
      letterSpacing: "0.05em",
    },
    className: "text-xl sm:text-2xl md:text-3xl"
  },
  {
    name: "Donear",
    style: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: 700,
      letterSpacing: "0.2em",
    },
    className: "text-lg sm:text-xl md:text-2xl uppercase"
  },
  {
    name: "Wedding Affairs Magazine",
    style: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 400,
      letterSpacing: "0.02em",
    },
    className: "text-base sm:text-lg md:text-xl"
  },
  {
    name: "Miss Universe",
    style: {
      fontFamily: "'Bodoni Moda', serif",
      fontWeight: 600,
      letterSpacing: "0.1em",
    },
    className: "text-lg sm:text-xl md:text-2xl uppercase"
  }
];

// Repeat logos to support seamless infinite loop
const repeatedLogos = [...logoData, ...logoData, ...logoData, ...logoData];

export function LogoMarquee() {
  return (
    <section className="w-full py-5 md:py-8 overflow-hidden bg-transparent">
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
              className="flex items-center justify-center min-w-[120px] sm:min-w-[150px] md:min-w-[200px] px-5 md:px-8"
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


