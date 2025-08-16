// app/(dashboard)/gaming/page.tsx
// Design-only: no data, no actions. Tailwind UI only.

import AppBar from "@/components/mobile/app_bar/AppBar";
import Link from "next/link";

export default function GamingScreen() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-5 sm:p-6">
      <AppBar title="Gaming" />
      {/* Search */}
      <div className="bg-background rounded-2xl border px-4 py-2.5 shadow-sm">
        <div className="text-muted-foreground flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            className="placeholder:text-muted-foreground h-6 flex-1 bg-transparent text-sm outline-none"
            placeholder="Search for Gaming..."
          />
        </div>
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {/* PUBG image card */}
        <ImageCard
          rounded="rounded-3xl"
          bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop')"
          title="" // design-only, no overlay title in mock
          className="h-44 sm:h-52"
        />
        <ImageCard
          rounded="rounded-3xl"
          bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop')"
          title="" // design-only, no overlay title in mock
          className="h-44 sm:h-52"
        />
        <ImageCard
          rounded="rounded-3xl"
          bg="url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop')"
          title="" // design-only, no overlay title in mock
          className="h-44 sm:h-52"
        />
      </div>
    </div>
  );
}

/* --------- atoms (reuse from previous screen if you already have them) --------- */

function ImageCard({
  bg,
  title,
  rounded = "rounded-xl",
  className = "",
}: {
  bg: string;
  title?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <Link href={`/charges/gaming/1`} className="hover:bg-accent/30 block">
      <div className={`${rounded} overflow-hidden border shadow-sm`}>
        <div
          className={`w-full bg-cover bg-center ${className || "h-44"}`}
          style={{ backgroundImage: bg }}
        />
        {title ? (
          <div className="px-4 py-3 text-sm font-medium">{title}</div>
        ) : null}
      </div>
    </Link>
  );
}
