"use client";

import AppBar from "@/components/mobile/app_bar/AppBar";
import { useRouter } from "next/navigation";
// app/(dashboard)/charge/apple/page.tsx
// Design-only: iOS-style bottom sheet opened by "Learn more"

import { useState } from "react";

export default function AppleChargePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-2xl sm:p-6">
      <AppBar title="Apple Charge">
        <CircleIcon>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            color="#000000"
            className="text-foreground/70"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="8" r="1.2" fill="currentColor" />
            <path d="M11.2 11.5h1.6v5h-1.6z" fill="currentColor" />
          </svg>
        </CircleIcon>
      </AppBar>

      {/* Hero card */}
      <HeroAppleCard />

      {/* Body copy */}
      <section className="mt-5 space-y-2">
        <h2 className="text-base font-semibold">Apple Charge</h2>
        <p className="text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor
          metus a diam accumsan lobortis. Curabitur euismod, purus at vestibulum
          convallis, justo lectus fringilla ipsum, ac convallis lorem quam et
          turpis. Suspendisse consequat felis justo, interdum ullamcorper magna
          eleifend nec.
        </p>
      </section>

      {/* Region select */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Your account region</p>
          <button
            type="button"
            className="text-xs text-amber-600 hover:underline"
            onClick={() => setSheetOpen(true)}
          >
            Learn more
          </button>
        </div>

        <div className="relative">
          <SelectField
            labelIcon={<Flag country="us" />}
            label="United States"
          />
        </div>
      </div>

      {/* Choose value */}
      <section className="mt-6 space-y-3">
        <h3 className="text-base font-semibold">Choose Card Value</h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ValueButton primary="$5" secondary="240 MRU" />
          <ValueButton primary="$10" secondary="460 MRU" />
          <ValueButton primary="$20" secondary="960 MRU" />
          <ValueButton primary="$50" secondary="2 400 MRU" />
          <ValueButton primary="$100" secondary="4 800 MRU" selected />
          <ValueButton primary="$150" secondary="7 180 MRU" />
          <ValueButton primary="$200" secondary="9 600 MRU" />
          <ValueButton primary="$250" secondary="12 000 MRU" />
          <ValueButton primary="$300" secondary="14 400 MRU" />
          <ValueButton primary="$500" secondary="24 000 MRU" />
        </div>
      </section>

      {/* Spacer for sticky CTA */}
      <div className="h-24" />

      {/* Sticky footer CTA */}
      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 p-4">
          <button
            onClick={() => {
              router.push("/charges/gaming/1/checkout"); // go to /orders page
            }}
            className="flex-1 rounded-2xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            Proceed • 4 800 MRU
          </button>
        </div>
      </div>

      {/* ===== iOS-style Bottom Sheet ===== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          sheetOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSheetOpen(false)}
      />

      {/* Sheet container */}
      <div
        className={`border-border fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] transform-gpu overflow-y-auto rounded-t-3xl border-t bg-white shadow-[0_-16px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-300 dark:bg-neutral-950 dark:ring-white/10 ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle */}
        <div className="bg-muted mx-auto mt-2 h-1.5 w-10 rounded-full" />
        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between">
            <h2 className="text-2xl font-semibold">Clarification</h2>
            <button
              className="hover:bg-muted rounded-full p-1"
              onClick={() => setSheetOpen(false)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Warning line */}
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-600">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className="shrink-0"
            >
              <path
                d="M12 2l10 18H2L12 2z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M12 8v5m0 3h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Caution when choosing a region</span>
          </div>

          {/* Body text */}
          <div className="text-foreground space-y-4 text-sm leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse volutpat dui et tincidunt fermentum. Proin facilisis
              sollicitudin tellus quis convallis.
            </p>
            <p>
              Fusce porta congue faucibus. Praesent eget leo eleifend libero
              pretium elementum ac ac tortor. Vivamus scelerisque risus
              vehicula, feugiat dolor eu, malesuada quam.
            </p>
            <p>
              Mauris eu libero egestas, consequat ex quis, vehicula lacus. Sed
              tincidunt sapien urna, vel viverra lectus maximus ac. Morbi
              facilisis scelerisque tortor.
            </p>
          </div>

          {/* Bottom action */}
          <div className="mt-6">
            <button
              className="hover:bg-accent/40 w-full rounded-2xl border px-4 py-3 text-center text-base font-semibold"
              onClick={() => setSheetOpen(false)}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== small atoms (design only) ===================== */

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-[#F0F0F3] shadow-sm">
      {children}
    </div>
  );
}

function HeroAppleCard() {
  return (
    <div
      className="mt-2 rounded-3xl p-4 sm:p-5"
      style={{ background: "linear-gradient(135deg,#0a84ff 0%,#0041c4 100%)" }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-white/95 shadow-lg sm:h-24 sm:w-24" />
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
          <span className="text-xl">🎵</span>
          <span className="text-xl">🤖</span>
          <span className="text-xl">☁️</span>
          <span className="text-xl">👻</span>
          <span className="ml-auto text-xs text-gray-700">And more…</span>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  labelIcon,
  label,
}: {
  labelIcon?: React.ReactNode;
  label: string;
}) {
  return (
    <div className="bg-background flex items-center justify-between rounded-2xl border px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        {labelIcon}
        <span className="truncate text-sm">{label}</span>
      </div>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className="text-muted-foreground"
      >
        <path
          d="M6 9l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Flag({
  country,
}: {
  country: "us" | "ca" | "es" | "fr" | "tr" | "de" | "sa";
}) {
  const map: Record<string, string> = {
    us: "#B22234",
    ca: "#D52B1E",
    es: "#AA151B",
    fr: "#002395",
    tr: "#E30A17",
    de: "#000000",
    sa: "#006C35",
  };
  return (
    <span className="mr-1 inline-flex h-4 w-6 items-center justify-center overflow-hidden rounded">
      <span className="h-full w-full" style={{ background: map[country] }} />
    </span>
  );
}

function ValueButton({
  primary,
  secondary,
  selected,
}: {
  primary: string;
  secondary: string;
  selected?: boolean;
}) {
  return (
    <button
      className={[
        "relative flex flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center",
        selected
          ? "border-orange-500 ring-2 ring-orange-100"
          : "hover:bg-accent/40",
      ].join(" ")}
    >
      <div className="text-base font-semibold">{primary}</div>
      <div className="text-muted-foreground mt-0.5 text-xs">{secondary}</div>
      {selected && (
        <span className="pointer-events-none absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-orange-500" />
      )}
    </button>
  );
}
