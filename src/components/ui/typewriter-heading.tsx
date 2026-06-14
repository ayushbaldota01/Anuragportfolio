import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function TypewriterHeading({ text, className, as: Component = "h2" }: { text: string, className?: string, as?: any }) {
  const chars = text.split("");

  return (
    <Component className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          visible: { transition: { staggerChildren: 0.03 } },
          hidden: {}
        }}
        className="inline-flex flex-wrap items-center justify-center"
      >
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
}

const heroSegments = [
  { text: "Where ", gradient: false },
  { text: "Creativity", gradient: true },
  { text: " Meets\n", gradient: false },
  { text: "Cinematic ", gradient: false },
  { text: "Storytelling", gradient: true }
];

export function HeroTypewriterHeading() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const allChars: { char: string; isGradient: boolean; isBreak: boolean }[] = [];
  heroSegments.forEach(seg => {
    seg.text.split("").forEach(c => {
      allChars.push({ char: c, isGradient: seg.gradient, isBreak: c === "\n" });
    });
  });

  React.useEffect(() => {
    const totalChars = allChars.length;
    let current = 0;
    const intervalTime = 1500 / totalChars; // Total typing time 1.5s

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current++;
        setVisibleCount(current);
        if (current >= totalChars) {
          clearInterval(interval);
        }
      }, intervalTime);
      return () => clearInterval(interval);
    }, 400); // Start typing after 400ms

    return () => clearTimeout(timer);
  }, [allChars.length]);

  let currentLine: React.ReactNode[] = [];
  const lines: React.ReactNode[][] = [];

  allChars.forEach((item, idx) => {
    const isVisible = idx < visibleCount;
    const isCaretPosition = idx === visibleCount - 1;

    if (item.isBreak) {
      lines.push(currentLine);
      currentLine = [];
      return;
    }

    currentLine.push(
      <React.Fragment key={idx}>
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`inline-block whitespace-pre ${
            item.isGradient 
              ? "bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(158,127,255,0.2)]" 
              : "text-white"
          }`}
          style={item.isGradient ? {
            backgroundImage: "linear-gradient(to right, #589cff 0%, #9e7fff 35%, #e07eff 70%, #ffd2e9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          } : undefined}
        >
          {item.char}
        </motion.span>
        {isCaretPosition && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-white font-thin relative -ml-[0.05em] w-0 overflow-visible drop-shadow-none"
            style={{ WebkitTextFillColor: "white", WebkitBackgroundClip: "border-box" }}
          >
            |
          </motion.span>
        )}
      </React.Fragment>
    );
  });
  lines.push(currentLine);

  return (
    <motion.h1 
      ref={containerRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="font-serif text-[clamp(1.6rem,6vw,6.5rem)] font-bold leading-[1.05] tracking-tight select-none flex flex-col items-center justify-center drop-shadow-lg"
    >
      {lines.map((line, i) => (
        <span key={i} className="whitespace-nowrap">
          {line}
        </span>
      ))}
    </motion.h1>
  );
}
