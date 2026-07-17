import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Cloxx Media" },
      { name: "description", content: "Learn more about our agency and our team." },
    ],
  }),
  component: About,
});

import { MechanicalOdometerCounter } from "../components/ui/odometer-counter";


function About() {
  return (
    <PageShell>
      {/* Hero Section - Centered layout to match inspiration */}
      <section className="flex flex-col items-center text-center mt-12 md:mt-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight mb-6 sm:mb-8">About Us</h1>
        <div className="max-w-2xl space-y-7 text-lg leading-8 text-muted-foreground">
          <p>CLOXX MEDIA is a creative production studio specializing in cinematic videography, photography, and visual storytelling.</p>
        </div>
      </section>

      {/* Mission Section - Image on left, text on right, specific text styling */}
      <section className="mt-16 sm:mt-24 md:mt-32 grid gap-8 sm:gap-12 md:grid-cols-2 items-center">
        <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group order-last md:order-first">
           <img src="/about-image.jpg" alt="About" className="w-full h-full object-cover object-bottom grayscale transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="pl-0 md:pl-8 lg:pl-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-[1.1]">
            We craft stories <span className="text-white/40 block mt-2">through visuals</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>Founded by Anurag Patil, Cloxx Media combines creativity with technical excellence to deliver high quality visuals across fashion, lifestyle, hospitality, interiors, food, events, and commercial campaigns.</p>
            <p>Every project is approached with a strong focus on storytelling, aesthetics, and brand identity.</p>
          </div>
        </div>
      </section>

      {/* Stats Section with Rolling Numbers */}
      <section className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
        <div className="py-8 sm:py-12 px-4 sm:px-6 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
          <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 text-white flex justify-center items-center">
            <MechanicalOdometerCounter to={100} />+
          </h3>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-muted-foreground">Projects delivered</p>
        </div>
        <div className="py-8 sm:py-12 px-4 sm:px-6 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
          <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 text-white flex justify-center items-center">
            <MechanicalOdometerCounter to={50} />+
          </h3>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-muted-foreground">Brands Collaborated</p>
        </div>
        <div className="py-8 sm:py-12 px-4 sm:px-6 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
          <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 text-white flex justify-center items-center">
            <MechanicalOdometerCounter to={5} />+
          </h3>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-muted-foreground">Years of Creative Experience</p>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="mt-16 sm:mt-24 md:mt-32 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Take a virtual tour</h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">Explore how we work and see the impact of our designs through our engaging virtual tour.</p>
        <div className="aspect-video bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </section>


    </PageShell>
  );
}
