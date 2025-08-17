"use client";
import { useMemo, useState } from "react";

export type GiftCard = {
  id: number;
  output?: string | null; // "$100"
  amount?: string | null; // "4800.00"
  amount_after_fee?: string | null; // optional
  in_stock?: 0 | 1;
};

export function GiftcardGrid({
  giftcards,
  onChange,
  defaultId,
}: {
  giftcards: GiftCard[];
  onChange?: (gc: GiftCard | null) => void;
  defaultId?: number;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(
    defaultId ?? null
  );

  const items = useMemo(
    () =>
      [...giftcards].sort((a, b) => {
        const va = Number(String(a.output ?? "").replace(/[^\d.]/g, "")) || 0;
        const vb = Number(String(b.output ?? "").replace(/[^\d.]/g, "")) || 0;
        return va - vb;
      }),
    [giftcards]
  );

  function select(id: number) {
    setSelectedId(id);
    onChange?.(items.find((g) => g.id === id) ?? null);
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((g) => {
        const selected = g.id === selectedId;
        const disabled = g.in_stock === 0;

        const priceNum = Number(g.amount_after_fee ?? g.amount ?? 0);
        const priceText = priceNum
          ? `${priceNum.toLocaleString("fr-FR")} MRU`
          : "";

        return (
          <button
            key={g.id}
            type="button"
            disabled={disabled}
            onClick={() => select(g.id)}
            className={[
              "relative flex flex-col items-center justify-center rounded-[22px] px-3 py-5 text-center transition",
              "border shadow-sm",
              disabled ? "cursor-not-allowed opacity-50" : "hover:bg-accent/40",
              selected
                ? "border-[#D35400] bg-[#FFE8DD]"
                : "border-gray-300 bg-white dark:bg-transparent",
            ].join(" ")}
            aria-pressed={selected}
          >
            {/* amount (top) */}
            <div className="text-xl font-semibold tracking-tight">
              {g.output ?? "-"}
            </div>
            {/* MRU (bottom) */}
            <div className="mt-1 text-xs text-muted-foreground">
              {priceText}
            </div>

            {/* selected tick (top-right) */}
            {selected && (
              <span className="pointer-events-none absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D35400]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 12l4 4 8-8"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
