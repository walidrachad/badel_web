// app/(dashboard)/charge/page.tsx
// Design-only: no data fetching, no actions, just Tailwind UI

import AppBar from "@/components/mobile/app_bar/AppBar";
import Link from "next/link";
import { title } from "process";

export default function ChargeScreen() {
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6 space-y-6">
  
      <AppBar title="Charge"/>

      {/* Hero / Apple card */}
      <div className="rounded-3xl p-4 sm:p-6"
           style={{
             background: "linear-gradient(135deg,#0081ff 0%,#0041c4 100%)"
           }}>
        <div className="aspect-[16/9] w-full rounded-2xl p-5 sm:p-7 relative overflow-hidden">
          {/* Apple logo placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
              {/* simple Apple icon (placeholder shape) */}
              <svg viewBox="0 0 24 24" width="42" height="42" aria-hidden className="text-black">
                <path fill="currentColor" d="M16.365 13.803c.03 3.273 2.862 4.363 2.893 4.377-.024.077-.452 1.546-1.493 3.064-.899 1.298-1.83 2.592-3.299 2.62-1.444.026-1.906-.848-3.558-.848-1.652 0-2.159.82-3.517.874-1.412.054-2.487-1.403-3.39-2.7-1.846-2.638-3.26-7.45-1.365-10.706.94-1.625 2.618-2.653 4.447-2.68 1.387-.026 2.695.936 3.558.936.863 0 2.454-1.155 4.134-.985.704.029 2.698.284 3.97 2.138-0.103.063-2.37 1.385-2.28 4.91zM14.23 3.92c.756-.915 1.269-2.195 1.132-3.47-1.094.044-2.418.728-3.2 1.644-.704.81-1.319 2.111-1.155 3.36 1.223.094 2.467-.623 3.223-1.534z"/>
              </svg>
            </div>
          </div>

          {/* icon pill */}
          <div className="absolute left-5 right-5 bottom-5 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 backdrop-blur shadow-sm">
            <span className="text-xl">🎵</span>
            <span className="text-xl">🤖</span>
            <span className="text-xl">☁️</span>
            <span className="text-xl">👻</span>
            <span className="ml-auto text-sm text-gray-700">And more…</span>
          </div>
        </div>
      </div>

      {/* Gaming */}
      <Section title="Gaming">
        <div className="grid grid-cols-2 gap-4">
          <ImageCard title="PUBG Mobile" badge="UG" bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop')" />
          <ImageCard title="PlayStation Store" flag="🇬🇧" bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop')" />
          <ImageCard title="PlayStation Store" flag="🇬🇧" bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop')" />
          <SeeMoreCard />
        </div>
      </Section>

      {/* Entertainment */}
      <Section title="Entertainment">
        <div className="grid grid-cols-2 gap-4">
          <ImageCard title="PlayStation Store" flag="🇬🇧" bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop')" />
          <ImageCard title="PlayStation Store" flag="🇬🇧" bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop')" />
          <ImageCard title="PlayStation Store" flag="🇬🇧" bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop')" />
          <SeeMoreTile />
        </div>
      </Section>
    </div>
  );
}

/* ---------- small design-only atoms ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function ImageCard({
  bg,
}: { title: string; flag?: string; badge?: string; bg: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border bg-muted/10">
      <div
        className="aspect-[16/10] w-full bg-cover bg-center"
        style={{ backgroundImage: bg }}
      />
    </div>
  );
}

function SeeMoreCard() {
  return (
    <Link href={`/charges/gaming`} className="block hover:bg-accent/30">
     <div className="rounded-2xl aspect-[16/10] bg-muted/40 flex flex-col items-center justify-center border">
      <div className="h-8 w-8 rounded-full border flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-foreground">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">See more</p>
    </div>
    </Link>
  );
}

function SeeMoreTile() {
  return (
    <div className="rounded-2xl aspect-[16/10] bg-muted/40 border flex items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>See more</span>
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-muted-foreground">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
