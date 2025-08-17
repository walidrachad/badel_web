// app/(dashboard)/gaming/page.tsx
// Design-only: no data, no actions. Tailwind UI only.

import AppBar from "@/components/mobile/app_bar/AppBar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function GamingScreen() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-5 sm:p-6">
      <AppBar title="Gaming" />
      <div className="relative w-full">
        {/* Left Icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-dark-6 dark:text-gray-400">
          {/* Example: search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            color="#000"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </span>

        {/* Input */}
        <input
          placeholder="Search for Gaming..."
          className={cn(
            "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-[#000] disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-[#000] dark:border-dark-3 dark:bg-dark-2 dark:focus:border-[#000] dark:disabled:bg-dark dark:data-[active=true]:border-[#000]",
            "pl-10 pr-5 py-3 text-dark placeholder:text-dark dark:text-white"
          )}
        />
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {/* PUBG image card */}
        <ImageCard
          rounded="rounded-3xl"
          bg="url('/images/demo/frame_275_2.png')"
          title="" // design-only, no overlay title in mock
          className="h-60"
        />
        <ImageCard
          rounded="rounded-3xl"
          bg="url('/images/demo/frame_275.png')"
          title="" // design-only, no overlay title in mock
          className="h-60"
        />
        <ImageCard
          rounded="rounded-3xl"
          bg="url('/images/demo/image_1.png')"
          title=""
          className="h-60"
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
