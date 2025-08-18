// src/app/charges/[name]/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChargePageItems, type Category } from "@/lib/api/charge";
import AppBar from "@/components/mobile/app_bar/AppBar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";

/* ---------- helpers ---------- */
const fullUrl = (p?: string | null) =>
  p ? new URL(p, "https://staging.bedelportal.com/").toString() : null;

const byOrder = <T extends { order?: number }>(a: T, b: T) =>
  (a.order ?? 9_999_999) - (b.order ?? 9_999_999);

/* ---------- small atom ---------- */
function ImageCard({
  src,
  title,
  rounded = "rounded-xl",
  className = "",
  href = "/charges/gaming/1",
}: {
  src: string; // plain URL
  title?: string;
  rounded?: string;
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="block hover:bg-accent/30">
      <div className={`${rounded} overflow-hidden border shadow-sm`}>
        <div
          className={`w-full bg-center bg-[length:100%_100%] ${className || "h-44"}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
        {title ? (
          <div className="px-4 py-3 text-sm font-medium">{title}</div>
        ) : null}
      </div>
    </Link>
  );
}

/* ---------- page ---------- */
export default function GamingCategoriesPage() {
  const sp = useSearchParams();
  const groupId = String(sp.get("groupId"));
  const qc = useQueryClient();

  const cached =
    qc.getQueryData<Category[]>(["groupCategories", groupId]) ?? [];

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["groupCategories", groupId],
    queryFn: async () => {
      if (cached.length) return cached;
      const items = await getChargePageItems();
      const group: any = items.find(
        (it: any) => it.type === "group" && it.id === groupId
      );
      return group ? (group.categories as Category[]) : [];
    },
    initialData: cached,
    select: (arr) => [...arr].sort(byOrder),
    staleTime: 60_000,
  });

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
    <div className="mx-auto w-full max-w-xl p-4 space-y-6">
      <AppBar title={groupId} />

      {/* Search with left icon */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-dark-6 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
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

        <input
          placeholder="Search for Gaming..."
          className={cn(
            "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-[#000] disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-[#000] dark:border-dark-3 dark:bg-dark-2 dark:focus:border-[#000] dark:disabled:bg-dark dark:data-[active=true]:border-[#000]",
            "pl-10 pr-5 py-3 text-dark placeholder:text-dark dark:text-white"
          )}
        />
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No categories found.</p>
      ) : (
        <div className="space-y-4">
          {data.map((cat) => {
            const src =
              fullUrl(cat.small_image) ??
              fullUrl(cat.image_path) ??
              "/images/demo/fallback.png"; // safe fallback
            return (
              <CategoryTile cat={cat}>
                <ImageCard
                  key={cat.id}
                  rounded="rounded-3xl"
                  src={src}
                  title=""
                  className="h-60"
                  href={`/charges/category/${cat.id}`}
                />
              </CategoryTile>
            );
          })}
        </div>
      )}
    </div>
  );
}
