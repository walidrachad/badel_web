// app/(dashboard)/charge/page.tsx
// Design-only: no data fetching, no actions, just Tailwind UI

import AppBar from "@/components/mobile/app_bar/AppBar";
import Link from "next/link";
import { title } from "process";

export default function ChargeScreen() {
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6 space-y-6">
      <AppBar title="Charge" />

      {/* Hero / Apple card */}
      <div
        className="rounded-3xl p-4 sm:p-6 bg-[length:100%_100%]"
        style={{
          backgroundImage: "url('/images/demo/frame_275_3.png')",
        }}
      >
        <div className="aspect-[16/9] w-full rounded-2xl p-5 sm:p-7 relative overflow-hidden">
          {/* Apple logo placeholder */}
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>
      </div>

      {/* Gaming */}
      <Section title="Gaming">
        <div className="grid grid-cols-2 gap-4">
          <ImageCard
            title="PUBG Mobile"
            badge="UG"
            bg="url('/images/demo/image_1.png')"
          />
          <ImageCard
            title="PlayStation Store"
            flag="🇬🇧"
            bg="url('/images/demo/frame_275_2.png')"
          />
          <ImageCard
            title="PlayStation Store"
            flag="🇬🇧"
            bg="url('/images/demo/frame_275.png')"
          />
          <SeeMoreCard />
        </div>
      </Section>

      {/* Entertainment */}
      <Section title="Entertainment">
        <div className="grid grid-cols-2 gap-4">
          <ImageCard
            title="PUBG Mobile"
            badge="UG"
            bg="url('/images/demo/image_1.png')"
          />
          <ImageCard
            title="PlayStation Store"
            flag="🇬🇧"
            bg="url('/images/demo/frame_275_2.png')"
          />
          <ImageCard
            title="PlayStation Store"
            flag="🇬🇧"
            bg="url('/images/demo/frame_275.png')"
          />
          <SeeMoreCard />
        </div>
      </Section>
    </div>
  );
}

/* ---------- small design-only atoms ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function ImageCard({
  bg,
}: {
  title: string;
  flag?: string;
  badge?: string;
  bg: string;
}) {
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
      <div className="rounded-2xl aspect-[16/10] bg-[#F0F0F3] flex flex-col items-center justify-center border">
        <div className="h-8 w-8 rounded-full flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            color="#000"
            className="text-foreground"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">See more</p>
      </div>
    </Link>
  );
}
