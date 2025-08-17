// src/app/charges/category/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChargePageItems, GroupItem, type Category } from "@/lib/api/charge";
import AppBar from "@/components/mobile/app_bar/AppBar";
import { useMemo, useState } from "react";
import { Select } from "@/components/FormElements/select";
import { GlobeIcon } from "@/assets/icons";
import {
  uniqueCountriesFromGiftcards,
  codeToFlagEmoji,
  codeToName,
} from "@/lib/country";
import { GiftCard, GiftcardGrid } from "./GiftcardGrid";
const fullUrl = (p?: string | null) =>
  p ? new URL(p, "https://staging.bedelportal.com/").toString() : null;

function flattenCategories(items: GroupItem[]): Category[] {
  const out: Category[] = [];
  for (const it of items) {
    if ("type" in it && it.type === "group") out.push(...it.categories);
    else out.push(it as unknown as Category);
  }
  return out;
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const qc = useQueryClient();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedGC, setSelectedGC] = useState<GiftCard | null>(null);

  const cached = qc.getQueryData<Category>(["category", id]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      if (cached) return cached;
      const items = await getChargePageItems();
      const cat = flattenCategories(items).find((c) => c.id === id);
      return cat ?? null;
    },
    initialData: cached ?? null,
    staleTime: 60_000,
  });

  // UI guards
  if (isLoading)
    return (
      <div className="mx-auto flex w-full max-w-xl items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="p-6">
        <p className="text-red-600">Category not found.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 rounded border px-3 py-1"
        >
          Retry
        </button>
      </div>
    );

  const cat = data as Category;
  const heroSrc =
    fullUrl(cat.small_image) ??
    fullUrl(cat.image_path) ??
    "/images/demo/fallback.png";
  const giftcards = cat.giftcards ?? [];
  const countryCodes = uniqueCountriesFromGiftcards(cat.giftcards ?? []);
  const selectItems = countryCodes.map((code) => ({
    label: `${codeToFlagEmoji(code)} ${codeToName(code)}`, // e.g. "🇺🇸 United States"
    value: code, // "US"
  }));

  const filteredGiftcards = useMemo(() => {
    if (!selectedCountry) return cat.giftcards ?? [];
    return (cat.giftcards ?? []).filter(
      (gc) => gc.country?.toUpperCase() === selectedCountry.toUpperCase()
    );
  }, [cat.giftcards, selectedCountry]);

  const priceText = useMemo(() => {
    if (!selectedGC) return "";
    const num = Number(selectedGC.amount_after_fee ?? selectedGC.amount ?? 0);
    return num ? `${num.toLocaleString("fr-FR")} MRU` : "";
  }, [selectedGC]);
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6 space-y-6">
      <AppBar title={cat.name}>
        <CircleIcon>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
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
      {/* Hero banner from category image */}
      <div
        className="mt-2 rounded-3xl p-4 sm:p-5 bg-[length:100%_100%]"
        style={{ backgroundImage: `url('${heroSrc}')` }}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl" />
      </div>
      {/* Description */}
      {(cat.description || cat.description_fr || cat.description_ar) && (
        <section className="mt-5 space-y-2">
          <h2 className="text-base font-semibold">{cat.name}</h2>
          <p className="text-sm text-muted-foreground">
            {cat.description ?? cat.description_fr ?? cat.description_ar}
          </p>
          {/* Learn more -> bottom sheet */}
          <button
            type="button"
            className="text-xs text-amber-600 hover:underline"
            onClick={() => setSheetOpen(true)}
          >
            Learn more
          </button>
        </section>
      )}
      <>
        {cat.type !== "none" ? (
          <div className="relative">
            <Select
              label={
                cat.type === "country"
                  ? "Your account region"
                  : "Your account type"
              }
              items={selectItems}
              defaultValue={selectItems[0]?.value}
              prefixIcon={<GlobeIcon />}
              onValueChange={(val) => setSelectedCountry(val)}
            />
          </div>
        ) : (
          <div></div>
        )}
      </>
      {/* Giftcards grid (design-only) */}
      {/* <section className="mt-6 space-y-3">
        <h3 className="text-base font-semibold">Choose Card Value</h3>
        {filteredGiftcards.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No giftcards for this country.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filteredGiftcards.map((g) => (
              <button
                key={g.id}
                className="relative flex flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center hover:bg-accent/40"
              >
                <div className="text-base font-semibold">
                  {g.output || g.name}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {(g.amount_after_fee ?? g.amount)
                    ? `${Number(g.amount_after_fee ?? g.amount).toLocaleString("fr-FR")} MRU`
                    : ""}
                </div>
              </button>
            ))}
          </div>
        )}
      </section> */}
      <GiftcardGrid
        giftcards={filteredGiftcards /* or cat.giftcards */}
        defaultId={filteredGiftcards[0]?.id}
        onChange={(gc) => setSelectedGC(gc)}
      />
      <div className="h-24" />

      {/* Sticky footer CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 p-4">
          <button
            type="button"
            disabled={!selectedGC}
            aria-disabled={!selectedGC}
            className={[
              "flex-1 rounded-2xl px-4 py-3 text-center text-sm font-semibold shadow-sm transition",
              selectedGC
                ? "bg-orange-600 text-white hover:opacity-95"
                : "cursor-not-allowed bg-gray-100 text-gray-400",
            ].join(" ")}
            onClick={() => {
              if (!selectedGC) return;
              // navigate to checkout with selected card id
              // router.push(`/charges/category/${cat.id}/checkout?gift=${selectedGC.id}`);
            }}
          >
            {selectedGC ? `Proceed • ${priceText}` : "Select an amount"}
          </button>
        </div>
      </div>

      {/* Bottom sheet (iOS style) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          sheetOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSheetOpen(false)}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] transform-gpu overflow-y-auto rounded-t-3xl border-t bg-white shadow-[0_-16px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-300 dark:bg-neutral-950 dark:ring-white/10 ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-muted" />
        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between">
            <h2 className="text-2xl font-semibold">Clarification</h2>
            <button
              className="rounded-full p-1 hover:bg-muted"
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
          <div className="space-y-4 text-sm leading-relaxed text-foreground">
            <p>
              {cat.desclaimer ?? cat.desclaimer_fr ?? cat.desclaimer_ar ?? "—"}
            </p>
          </div>
          <div className="mt-6">
            <button
              className="w-full rounded-2xl border px-4 py-3 text-center text-base font-semibold hover:bg-accent/40"
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

/* small atom fallback */
function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow-sm">
      {children}
    </div>
  );
}
