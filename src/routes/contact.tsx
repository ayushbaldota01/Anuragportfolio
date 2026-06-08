import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "../components/portfolio-chrome";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anurag" },
      { name: "description", content: "Contact details and enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section className="grid gap-14 md:grid-cols-[1fr_.9fr]">
        <PageHeader eyebrow="Enquiries" title="Contact" />
        <div className="space-y-8">
          <div className="border-t border-border/30 pt-6">
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground block mb-2 font-sans">Email</span>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <a 
                className="font-sans font-light tracking-wide text-2xl sm:text-3xl md:text-4xl transition-colors hover:text-muted-foreground text-foreground block duration-300" 
                href="mailto:cloxxmedia@gmail.com"
              >
                cloxxmedia@gmail.com
              </a>
            </motion.div>
          </div>

          <div className="border-t border-border/30 pt-6">
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground block mb-2 font-sans">Phone</span>
            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <a 
                className="font-sans font-light tracking-wide text-xl sm:text-2xl transition-colors hover:text-muted-foreground text-foreground block duration-300" 
                href="tel:+919867467671"
              >
                +91 98674 67671
              </a>
              <a 
                className="font-sans font-light tracking-wide text-xl sm:text-2xl transition-colors hover:text-muted-foreground text-foreground block duration-300" 
                href="tel:+917219044171"
              >
                +91 72190 44171
              </a>
              <div className="pt-2">
                <a 
                  className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-foreground bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-full transition-all duration-300 w-fit font-sans" 
                  href="https://wa.me/919867467671"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-border/30 pt-6">
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground block mb-2 font-sans">Address</span>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-md">
              Shree Swami Samarth Nagar,<br />
              Lokhandwala complex, Andheri West,<br />
              Mumbai 400053
            </p>
          </div>

          <div className="border-t border-border/30 pt-6">
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground block mb-3 font-sans">Socials</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a 
                className="nav-link text-xs tracking-widest uppercase font-medium" 
                href="https://www.instagram.com/cloxxmedia?igsh=eXE4dWtsaTlnMWw2&utm_source=qr"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a className="nav-link text-xs tracking-widest uppercase font-medium" href="#">LinkedIn</a>
              <a className="nav-link text-xs tracking-widest uppercase font-medium" href="#">Newsletter</a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
