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

function RollingNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.round(v).toString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}

function About() {
  return (
    <PageShell>
      {/* Hero Section - Centered layout to match inspiration */}
      <section className="flex flex-col items-center text-center mt-12 md:mt-20">
        <h1 className="font-serif text-6xl md:text-8xl tracking-tight mb-8">About Us</h1>
        <div className="max-w-2xl space-y-7 text-lg leading-8 text-muted-foreground">
          <p>We are a subscription-based web design agency, delivering high-quality, scalable websites designed to drive results and grow your business.</p>
        </div>
      </section>

      {/* Mission Section - Image on left, text on right, specific text styling */}
      <section className="mt-32 grid gap-12 md:grid-cols-2 items-center">
        <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group order-last md:order-first">
           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-white/20 font-serif italic text-xl">Our Vision</span>
           </div>
        </div>
        <div className="pl-0 md:pl-8 lg:pl-16">
          <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-[1.1]">
            We help business <span className="text-white/40 block mt-2">grow online</span>
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>Our mission is to provide businesses with dedicated, scalable design teams that build high-converting websites, all through a simple subscription model.</p>
            <p>We strive for continuous innovation and exceptional quality in every project we complete.</p>
          </div>
        </div>
      </section>

      {/* Stats Section with Rolling Numbers */}
      <section className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="py-12 px-6 bg-white/5 border border-white/10 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
          <h3 className="font-serif text-5xl md:text-6xl mb-4 text-white">
            <RollingNumber value={500} />+
          </h3>
          <p className="text-sm tracking-widest uppercase text-muted-foreground">Projects delivered</p>
        </div>
        <div className="py-12 px-6 bg-white/5 border border-white/10 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
          <h3 className="font-serif text-5xl md:text-6xl mb-4 text-white">
            <RollingNumber value={99} />%
          </h3>
          <p className="text-sm tracking-widest uppercase text-muted-foreground">Customer satisfaction</p>
        </div>
        <div className="py-12 px-6 bg-white/5 border border-white/10 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
          <h3 className="font-serif text-5xl md:text-6xl mb-4 text-white">
            <RollingNumber value={24} />/7
          </h3>
          <p className="text-sm tracking-widest uppercase text-muted-foreground">Support availability</p>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="mt-32 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Take a virtual tour</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Explore how we work and see the impact of our designs through our engaging virtual tour.</p>
        <div className="aspect-video bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="mt-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Meet the team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our talented team of designers and developers are dedicated to bringing your vision to life.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {[
            { name: "John Smith", role: "Lead Designer" },
            { name: "James Turner", role: "Senior Web Developer" },
            { name: "Michael Johnson", role: "Project Manager" },
            { name: "David Miller", role: "UI/UX Specialist" },
            { name: "Robert White", role: "Front-End Developer" },
            { name: "William Harris", role: "Design Strategist" }
          ].map((member, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-3xl mb-6 transition-all duration-500 group-hover:bg-white/10 group-hover:-translate-y-2 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-serif text-2xl mb-1 text-white">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
