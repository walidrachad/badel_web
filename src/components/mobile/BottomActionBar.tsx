// src/components/BottomActionBar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

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
          <Image src="/icons/Vector.svg" alt="Menu" width={22} height={22} />
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
          <Image src="/icons/Package.svg" alt="Menu" width={20} height={20} />
          <span>My orders</span>
        </Link>

        {/* Right circular */}
        <SideBtn href={settingsHref} onClick={onSettingsClick}>
          <Image src="/icons/GearSix.svg" alt="Menu" width={22} height={22} />
        </SideBtn>
      </div>
    </div>
  );
}
