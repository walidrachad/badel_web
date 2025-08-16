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
          color="#000000"
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

      {/* Center: title (stays centered because left/right have equal width) */}
      <h1 className="flex-1 px-2 text-center text-xl font-semibold tracking-tight">
        {title}
      </h1>

      {/* Right: actions (fixed width to mirror left) */}
      <div className="flex h-9 w-9 items-center justify-center">{children}</div>
    </div>
  );
}
