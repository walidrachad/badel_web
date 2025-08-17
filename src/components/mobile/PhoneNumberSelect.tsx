"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

export default function PhoneNumberSelect({
  label = "Bankily phone number",
  items,
  value,
  onChange,
  onAddNew,
  className = "",
}: {
  label?: string;
  items: Item[];
  value?: string | null; // selected id
  onChange?: (id: string) => void;
  onAddNew?: () => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  const selected = items.find((i) => i.id === value) ?? null;

  // close on outside click / escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !popRef.current?.contains(t)) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-bold text-[#000]">
        {label}
      </label>

      {/* trigger */}
      {/* trigger */}
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={[
          "w-full rounded-2xl px-4 py-3 text-left flex items-center justify-between",
          "focus-visible:outline-none transition",
          open
            ? "border-2 border-[#000]" // when open -> thicker orange border
            : "border border-gray-300", // default border
        ].join(" ")}
      >
        <span className="truncate">{selected?.label ?? "Select a phone"}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={`transition ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* popover */}
      {open && (
        <div ref={popRef} role="listbox" className="relative z-50">
          <div className="mt-2 w-full rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
            {/* numbers */}
            <ul className="max-h-64 overflow-auto py-1">
              {items.map((item) => {
                const isSel = item.id === value;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSel}
                      onClick={() => {
                        onChange?.(item.id);
                        setOpen(false);
                      }}
                      className="flex w-full items-center text-[#000] justify-between px-4 py-3 text-left hover:bg-black/[0.03]"
                    >
                      <span className="truncate">{item.label}</span>
                      {isSel && (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="text-black"
                        >
                          <path
                            d="M6 12l4 4 8-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* divider */}
            <div className="h-px w-full bg-black/5" />

            {/* add new */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onAddNew?.();
              }}
              className="flex w-full items-center font-semibold justify-between px-4 py-3 hover:bg-black/[0.03] text-[#000]"
            >
              <span>Add new phone number</span>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
