import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portfolio-chrome";
import { ClientVault } from "../components/ClientVault";
import FloatingAnimation from "../components/ui/floating-animation";

export const Route = createFileRoute("/vault")({
  component: VaultPage,
});

function VaultPage() {
  return (
    <PageShell noPadding>
      <div className="min-h-[100dvh] w-full flex items-center justify-center px-4 relative overflow-hidden">
        
        {/* The floating animation blob backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <FloatingAnimation 
            amplitude={1.5}
            blend={0.5}
            speed={0.8}
          />
        </div>

        {/* Existing background glow */}
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="z-20 relative w-full flex justify-center">
          <ClientVault />
        </div>
      </div>
    </PageShell>
  );
}
