// src/components/mobile/app_bar/AppBar.tsx
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AppBar({
  title,
  children, // right-side actions
}: {
  title: string;
  children?: ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      className="
        fixed inset-x-0 top-0 z-40
        bg-white/90 backdrop-blur pt-3
      "
    >
      <div className="mx-auto max-w-xl px-4">
        <div className="flex h-12 items-center justify-between">
          {/* Left: back button */}
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-[#F0F0F3]"
            aria-label="Back"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-foreground"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Center: title */}
          <h1 className="flex-1 px-2 text-center text-xl font-semibold tracking-tight">
            {title}
          </h1>

          {/* Right: actions (same width as left) */}
          <div className="flex h-9 w-9 items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Place this once below <AppBar /> in pages to offset the fixed header. */
export function AppBarSpacer() {
  // height = safe-area-top + 12px bar + 1px border ≈ handled by fixed header; give 12 + small extra
  return (
    <div className="pt-[calc(env(safe-area-inset-top)+3.25rem)]" aria-hidden />
  );
}
