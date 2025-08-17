// SeeMoreCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "@/lib/api/charge";

export default function SeeMoreCard({
  href = "/charges/gaming",
  groupId,
  categories,
}: {
  href?: string;
  groupId: number;
  categories: Category[];
}) {
  const router = useRouter();
  const qc = useQueryClient();

  function go() {
    qc.setQueryData<Category[]>(["groupCategories", groupId], categories);
    router.push(`${href}?groupId=${groupId}`);
  }

  return (
    <button onClick={go} className="block w-full hover:bg-accent/30">
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border bg-[#F0F0F3]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>See more</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="text-foreground"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
