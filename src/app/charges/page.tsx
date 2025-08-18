// app/(dashboard)/charge/page.tsx
// Design-only: no data fetching, no actions, just Tailwind UI
"use client";
import AppBar from "@/components/mobile/app_bar/AppBar";
import { useQuery } from "@tanstack/react-query";
import {
  Category,
  getChargePageItems,
  GroupItem,
  type ChargeItem,
} from "@/lib/api/charge";
import SeeMoreCard from "@/components/SeeMoreCard";
import CategoryTile from "@/components/CategoryTile";
import RecentActivities from "./RecentActivities";
import BottomActionBar from "@/components/mobile/BottomActionBar";

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
    <>
      <div
        className="
        fixed inset-x-0 top-0 z-40
        bg-white/90 backdrop-blur pt-3
      "
      >
        <div className="flex h-12 items-center justify-between">
          <h1 className="flex-1 px-2 text-center text-xl font-semibold tracking-tight">
            Marketplace
          </h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-xl p-4 space-y-6 pt-12">
        {/* Hero / Apple card */}
        <RecentActivities />
        {ordered.map((item) =>
          "type" in item && item.type === "group" ? (
            <Section key={item.id} title={item.name}>
              <div className="grid grid-cols-2 gap-4">
                {item.categories.map((cat: Category) => (
                  <CategoryTile cat={cat}>
                    <ImageCard
                      key={cat.id}
                      bg={`url('https://staging.bedelportal.com/${
                        cat.image_path
                      }')`}
                      title=""
                    />
                  </CategoryTile>
                ))}
                <SeeMoreCard groupId={item.name} categories={item.categories} />
              </div>
            </Section>
          ) : (
            <CategoryTile cat={item}>
              <div
                className="rounded-2xl border p-4 sm:p-6 bg-[length:100%_100%]"
                style={{
                  backgroundImage: `url('https://staging.bedelportal.com/${
                    (item as any).image_path
                  }')`,
                }}
              >
                <div className="aspect-[16/9] w-full rounded-2xl p-5 sm:p-7 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center"></div>
                </div>
              </div>
            </CategoryTile>
          )
        )}
      </div>
      <BottomActionBar
        homeHref="/"
        ordersHref="/orders"
        settingsHref="/settings"
      />
    </>
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
