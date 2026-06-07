import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "../components/portfolio-chrome";

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
            <a 
              className="font-serif text-2xl sm:text-3xl md:text-4xl transition-colors hover:text-muted-foreground text-foreground block duration-300" 
              href="mailto:cloxxmedia@gmail.com"
            >
              cloxxmedia@gmail.com
            </a>
          </div>

          <div className="border-t border-border/30 pt-6">
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground block mb-2 font-sans">Phone</span>
            <div className="flex flex-col gap-2">
              <a 
                className="font-serif text-xl sm:text-2xl transition-colors hover:text-muted-foreground text-foreground block duration-300" 
                href="tel:+919867467671"
              >
                +91 98674 67671
              </a>
              <a 
                className="font-serif text-xl sm:text-2xl transition-colors hover:text-muted-foreground text-foreground block duration-300" 
                href="tel:+917219044171"
              >
                +91 72190 44171
              </a>
            </div>
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
