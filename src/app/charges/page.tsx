// app/(dashboard)/charge/page.tsx
// Design-only: no data fetching, no actions, just Tailwind UI
"use client";
import AppBar from "@/components/mobile/app_bar/AppBar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Category,
  getChargePageItems,
  GroupItem,
  type ChargeItem,
} from "@/lib/api/charge";
import SeeMoreCard from "@/components/SeeMoreCard";

export default function ChargeScreen() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getChargePageItems,
  });
  const todos = (data ?? []) as GroupItem[];
  const ordered = [...todos].sort(
    (a, b) => (a.order ?? 9999) - (b.order ?? 9999)
  );

  if (isLoading)
    return (
      <div className="mx-auto flex w-full max-w-xl items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  if (isError)
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 rounded border px-3 py-1"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-xl sm:p-6 space-y-6">
      <AppBar title="Marketplace" />

      {/* Hero / Apple card */}

      {ordered.map((item) =>
        "type" in item && item.type === "group" ? (
          <Section key={item.id} title={item.name}>
            <div className="grid grid-cols-2 gap-4">
              {item.categories.map((cat: Category) => (
                <ImageCard
                  key={cat.id}
                  bg={`url('https://staging.bedelportal.com/${
                    cat.image_path
                  }')`}
                  title=""
                />
              ))}
              <SeeMoreCard groupId={item.id} categories={item.categories} />
            </div>
          </Section>
        ) : (
          <div
            className="rounded-3xl border p-4 sm:p-6 bg-[length:100%_100%]"
            style={{
              backgroundImage: `url('https://staging.bedelportal.com/${
                (item as any).image_path
              }')`,
            }}
          >
            <div className="aspect-[16/9] w-full rounded-2xl p-5 sm:p-7 relative overflow-hidden">
              {/* Apple logo placeholder */}
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>
          </div>
        )
      )}
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
