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
    <div className="w-full pt-13">
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
        <BrandThumb bg={`url('${order.image}')`} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 truncate text-[16px] font-weight[400]">
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
            <Pill className="bg-[#F0F0F3] text-[#000]">
              {formatMRU(order.amountMRU)}
            </Pill>
            <StatusPill status={order.status} />
          </div>

          <p className="mt-1 text-xs text-muted-foreground text-[#60646C] ">
            {dateText}
          </p>
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
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border-x ${className}`}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: OrderStatus }) {
  const map: Record<
    OrderStatus,
    { bg: string; text: string; label: string; border: string }
  > = {
    [OrderStatus.Completed]: {
      bg: "bg-[#E9F6E9]",
      text: "text-[#2A7E3B]",
      label: "Completed",
      border: "border-[#C9E8CA]",
    },
    [OrderStatus.Pending]: {
      bg: "bg-[#FFF7C2]",
      text: "text-[#AB6400]",
      label: "Pending",
      border: "border-[#FBE577]",
    },
    [OrderStatus.Canceled]: {
      bg: "bg-[#FEEBEC]",
      text: "text-[#CE2C2C]",
      label: "Canceled",
      border: "border-[#FFCDCE]",
    },
  };
  const t = map[status];
  return <Pill className={`${t.bg} ${t.text}`}>{t.label}</Pill>;
}

function BrandThumb({ bg }: { bg: string }) {
  return (
    <div
      className="h-16 w-28 shrink-0 rounded-2xl p-2 bg-[length:100%_100%] "
      style={{
        backgroundImage: bg,
      }}
    ></div>
  );
}
