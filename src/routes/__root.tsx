import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { OpeningCurtain, PortfolioFooter, PortfolioNav, CursorGlow, AuroraField } from "../components/portfolio-chrome";
import { useState } from "react";
import { motion } from "framer-motion";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="page-root">
      <CursorGlow />
      <AuroraField />
      <PortfolioNav />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
      <PortfolioFooter />
    </main>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Anurag — Portfolio" },
      { name: "description", content: "Premium videography, photography & creative marketing for brands, businesses and creators. Cinematic storytelling that drives attention and delivers results." },
      { name: "author", content: "Anurag" },
      { property: "og:title", content: "Anurag — Portfolio" },
      { property: "og:description", content: "Premium videography, photography & creative marketing for brands, businesses and creators. Cinematic storytelling that drives attention and delivers results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@anurag" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/jpeg",
        sizes: "any",
        href: "/favicon.jpg?v=3",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Check if intro was already seen this session
  const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('intro_seen') === '1';
  const [introDone, setIntroDone] = useState(alreadySeen);

  const ease = [0.25, 1, 0.5, 1] as const;

  return (
    <main className="page-root">
      {!alreadySeen && (
        <OpeningCurtain onComplete={() => {
          sessionStorage.setItem('intro_seen', '1');
          setIntroDone(true);
        }} />
      )}
      <CursorGlow />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 2.2, delay: 0, ease: "easeOut" }}
      >
        <AuroraField />
      </motion.div>

      {/* Top blur overlay — separate from nav so it renders consistently across browsers */}
      <motion.div
        className="top-blur-overlay"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
      />

      <motion.div
        className="fixed top-0 left-0 w-full z-50 pointer-events-none [&>*]:pointer-events-auto flex items-start justify-center pt-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: introDone ? 1 : 0, 
          y: introDone ? 0 : -20
        }}
        transition={{ duration: 1.2, delay: 1.2, ease }}
      >
        <PortfolioNav />
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: introDone ? 1 : 0, 
          y: introDone ? 0 : 20
        }}
        transition={{ duration: 1.2, delay: 1.2, ease }}
      >
        <div className="bottom-blur-overlay" aria-hidden="true" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={introDone ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.95, y: 40, filter: "blur(20px)" },
          visible: { 
            opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 1.6, delay: 0, ease: [0.25, 1, 0.5, 1] } 
          }
        }}
        style={{
          isolation: 'isolate',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity, filter',
        }}
      >
        <Outlet />
      </motion.div>

      <motion.div
        className="relative z-[60]"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ 
          opacity: introDone ? 1 : 0,
          y: introDone ? 0 : 20,
          filter: introDone ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 1.4, delay: 0, ease }}
      >
        <PortfolioFooter />
      </motion.div>
    </main>
  );
}
