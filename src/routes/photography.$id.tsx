import { createFileRoute, Link } from "@tanstack/react-router";
import { getSeriesById } from "../data/photography";
import { motion } from "framer-motion";
import { useState } from "react";

function ImageWithRetry({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);
  const maxRetries = 5;

  const handleError = () => {
    if (errorCount < maxRetries) {
      setTimeout(() => {
        setErrorCount((prev) => prev + 1);
        setCurrentSrc(`${src}?retry=${Date.now()}`);
      }, 1000 * (errorCount + 1));
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}

export const Route = createFileRoute("/photography/$id")({
  component: PhotographyGallery,
});

function PhotographyGallery() {
  const { id } = Route.useParams();
  const series = getSeriesById(id);

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-white mb-4">Series Not Found</h1>
          <Link to="/" className="text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-32 px-4 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto mb-12 sm:mb-16"
      >
        <Link
          to="/"
          hash="featured-work"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-xs mb-6 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Featured Work
        </Link>
        <h1 className="font-serif text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white">
          {series.title}
        </h1>
        <p className="mt-3 text-white/50 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium">
          {series.category} — {series.images.length} Images
        </p>
      </motion.div>

      {/* Dynamic Grid Layout */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 sm:gap-6"
      >
        {series.images.map((image, idx) => {
          // Keep aspect ratios purely portrait or square
          const aspectClasses = [
            "aspect-[3/4]", // Classic portrait
            "aspect-[4/5]", // Shorter portrait
            "aspect-[2/3]", // Tall portrait
            "aspect-[3/4]",
            "aspect-square", // Occasional square for flavor
          ];
          const aspectClass = aspectClasses[idx % aspectClasses.length];

          // Determine row structure using a 12-column grid
          // Desktop: 4 items (span-3), 3 items (span-4), 2 items (span-6), 4 items (span-3)
          const normalizedIdx = idx % 13;
          let colSpanClass = "";
          
          if (normalizedIdx < 4) {
            // Row 1: 4 items (Desktop: span-3 | Mobile: 2 per row -> span-6)
            colSpanClass = "col-span-6 sm:col-span-3";
          } else if (normalizedIdx < 7) {
            // Row 2: 3 items (Desktop: span-4 | Mobile: 1 full width, 2 half width)
            colSpanClass = normalizedIdx === 4 ? "col-span-12 sm:col-span-4" : "col-span-6 sm:col-span-4";
          } else if (normalizedIdx < 9) {
            // Row 3: 2 items (Desktop: span-6 | Mobile: 1 per row -> span-12)
            colSpanClass = "col-span-12 sm:col-span-6";
          } else {
            // Row 4: 4 items (Desktop: span-3 | Mobile: 2 per row -> span-6)
            colSpanClass = "col-span-6 sm:col-span-3";
          }

          return (
            <motion.a
              key={image.id}
              href={image.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className={`block group cursor-pointer ${colSpanClass}`}
            >
              <div className={`relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 shadow-2xl ${aspectClass}`}>
                <ImageWithRetry
                  src={image.previewUrl}
                  alt={`${series.title} — Image ${idx + 1}`}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/20">
                    <span className="text-white text-xs sm:text-sm font-medium uppercase tracking-wider">
                      View Full Size ↗
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* View All on Drive CTA & Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-[1400px] mx-auto mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
      >
        <a
          href={series.driveFolder}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-medium w-full sm:w-auto"
        >
          View Full Collection on Drive
          <span>↗</span>
        </a>
        <Link
          to="/"
          hash="featured-work"
          onClick={() => {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('portfolio_tab', 'photography');
            }
          }}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-medium w-full sm:w-auto"
        >
          <span>←</span>
          Back to Photography
        </Link>
      </motion.div>
    </div>
  );
}
