import Link from "next/link";
import { ORDERS, Order, OrderStatus } from "./mock";
import AppBar from "@/components/mobile/app_bar/AppBar";
import CircleIcon from "@/components/mobile/CircleIcon";
import Image from "next/image";

// util: format amount with spaces like "4 200 MRU"
function formatMRU(n: number) {
  return `${n.toLocaleString("fr-FR").replace(/\u00A0/g, " ")} MRU`;
}

export default function OrdersPage() {
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6">
      {/* Header */}
      <AppBar title="My orders">
        <CircleIcon>
          <Image
            src="/icons/filter_icon.svg"
            alt="Menu"
            width={16}
            height={16}
          />
        </CircleIcon>
      </AppBar>

      {/* List */}
      <div className="divide-y rounded-2xl bg-card text-card-foreground">
        {ORDERS.map((o) => (
          <OrderRow key={o.id} order={o} />
        ))}
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const created = new Date(order.createdAt);
  const dateText = `${created.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} ${created.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`;

  return (
    <Link href={`/orders/${order.id}`} className="block hover:bg-accent/30">
      <div className="flex gap-3 px-4 py-3">
        <BrandThumb brand={order.brand} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 truncate text-[15px] font-semibold">
              {order.title}
            </p>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className="shrink-0 text-muted-foreground"
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

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Pill className="bg-neutral-900 text-white">
              {formatMRU(order.amountMRU)}
            </Pill>
            <StatusPill status={order.status} />
          </div>

          <p className="mt-1 text-xs text-muted-foreground">{dateText}</p>
        </div>
      </div>
    </Link>
  );
}

/* ---------- tiny UI helpers ---------- */

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { bg: string; text: string; label: string }> =
    {
      [OrderStatus.Completed]: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        label: "Completed",
      },
      [OrderStatus.Pending]: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        label: "Pending",
      },
      [OrderStatus.Canceled]: {
        bg: "bg-rose-100",
        text: "text-rose-700",
        label: "Canceled",
      },
    };
  const t = map[status];
  return <Pill className={`${t.bg} ${t.text}`}>{t.label}</Pill>;
}

function BrandThumb({ brand }: { brand: "apple" | "netflix" | "playstation" }) {
  if (brand === "apple") {
    return (
      <div
        className="h-16 w-28 shrink-0 rounded-2xl p-2"
        style={{
          background: "linear-gradient(135deg,#0a84ff 0%,#0041c4 100%)",
        }}
      >
        <div className="relative h-full w-full rounded-xl">
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95" />
          <div className="absolute inset-x-2 bottom-1 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] shadow-sm">
            <span>🎵</span>
            <span>🤖</span>
            <span>☁️</span>
            <span>👻</span>
          </div>
        </div>
      </div>
    );
  }
  if (brand === "netflix") {
    return (
      <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-2xl bg-gray-100">
        <span className="text-2xl font-black text-red-600">N</span>
      </div>
    );
  }
  // playstation
  return (
    <div
      className="flex h-16 w-28 shrink-0 items-center justify-center rounded-2xl"
      style={{ background: "#0a66ff" }}
    >
      <svg viewBox="0 0 24 24" width="38" height="38" className="text-white">
        <path
          fill="currentColor"
          d="M9 3v13.5l3 1V6.3c3.7.6 6 2.4 6 4.7 0 2.1-1.7 3.5-4.5 2.4v2.3c4.2 1.1 7.5-1.1 7.5-4.7C21 7.1 16.8 4.6 9 3z"
        />
        <path fill="currentColor" d="M3 16.5v1.9l6 1.6v-1.9L3 16.5z" />
      </svg>
    </div>
  );
}
