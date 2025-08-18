// src/components/BottomActionBar.tsx
"use client";

import Link from "next/link";

type Props = {
  onHomeClick?: () => void;
  onOrdersClick?: () => void;
  onSettingsClick?: () => void;
  homeHref?: string;
  ordersHref?: string;
  settingsHref?: string;
};

export default function BottomActionBar({
  onHomeClick,
  onOrdersClick,
  onSettingsClick,
  homeHref = "/",
  ordersHref = "/orders",
  settingsHref = "/settings",
}: Props) {
  const SideBtn = ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <Link
      href={href}
      onClick={onClick}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
    >
      {children}
    </Link>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/90 backdrop-blur">
      <div
        className="
          mx-auto flex max-w-xl items-center justify-between gap-6 px-4 pt-3
          pb-[max(14px,env(safe-area-inset-bottom))]  /* respect iOS home indicator */
        "
      >
        {/* Left circular */}
        <SideBtn href={homeHref} onClick={onHomeClick}>
          {/* Home icon */}
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              d="M3 10.5l9-7 9 7V20a2 2 0 0 1-2 2h-5v-7H10v7H5a2 2 0 0 1-2-2v-9.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SideBtn>

        {/* Center pill */}
        <Link
          href={ordersHref}
          onClick={onOrdersClick}
          className="
            flex items-center gap-2 rounded-full bg-[#CC4B00] px-6 py-3 text-white
            font-semibold shadow-[0_10px_28px_rgba(204,75,0,0.35)]
            hover:opacity-95 transition
          "
        >
          {/* Box icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
            <path
              d="M21 7.5l-9-4.5-9 4.5 9 4.5 9-4.5ZM12 12v9M3 7.5V17l9 4.5 9-4.5V7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>My orders</span>
        </Link>

        {/* Right circular */}
        <SideBtn href={settingsHref} onClick={onSettingsClick}>
          {/* Settings icon */}
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8-3.5a7.9 7.9 0 0 0-.11-1.3l2.01-1.57-2-3.46-2.42.68a8.1 8.1 0 0 0-2.27-1.32l-.36-2.47H11.1l-.36 2.47a8.1 8.1 0 0 0-2.27 1.32l-2.42-.68-2 3.46 2.01 1.57A8.2 8.2 0 0 0 4 12c0 .44.04.87.11 1.3L2.1 14.87l2 3.46 2.42-.68c.66.56 1.43 1.01 2.27 1.32l.36 2.47h3.9l.36-2.47c.84-.31 1.61-.76 2.27-1.32l2.42.68 2-3.46-2.01-1.57c.07-.43.11-.86.11-1.3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SideBtn>
      </div>
    </div>
  );
}
