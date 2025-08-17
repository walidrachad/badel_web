// app/(dashboard)/checkout/confirm/page.tsx
// Design-only: Tailwind UI (no data, no actions)
"use client";
import { useState } from "react";
import PhoneNumberSelect from "@/components/mobile/PhoneNumberSelect";
import AppBar from "@/components/mobile/app_bar/AppBar";

export default function ConfirmPaymentPage() {
  const [phoneId, setPhoneId] = useState<string | null>(null);

  const numbers = [
    { id: "33223301", label: "33 22 33 01" },
    { id: "33556677", label: "33 55 66 77" },
  ];
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6">
      {/* Header */}

      <AppBar title="Confirm payment"></AppBar>
      {/* Product summary row */}
      <div className="mb-4 flex items-center gap-3">
        <AppleCardMini />
        <div className="min-w-0">
          <div className="truncate text-base font-semibold">
            <h2>Apple Gift Card</h2>
          </div>
          <div className="text-muted-foreground text-sm">
            <p>USA • $100</p>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-card text-card-foreground divide-y rounded-2xl border">
        <SummaryRow label="Subtotal" value="4 800 MRU" />
        <SummaryRow label="Tax" value="0 MRU" />
        <SummaryRow labelStrong="Total" valueStrong="4 800 MRU" />
      </div>

      {/* Payment method */}
      <section className="mt-6 space-y-3 pb-4">
        <h2 className="text-lg font-semibold">Payment method</h2>

        <div className="grid grid-cols-3 gap-3">
          {/* Selected */}
          <PaymentMethodCard selected logo={<BankilyLogo />} name="Bankily" />
          <PaymentMethodCard logo={<SedadLogo dim />} name="SedadBank" />
          <PaymentMethodCard logo={<MasrviLogo dim />} name="Masrvi" />
        </div>
      </section>

      {/* Phone select */}
      <PhoneNumberSelect
        label="Bankily phone number"
        items={numbers}
        value={phoneId ?? undefined}
        onChange={setPhoneId}
        onAddNew={() => {
          // open a modal/route to add phone
          // after saving, push into your numbers state and set selected
          alert("Add phone flow here");
        }}
      />

      {/* spacer so sticky button doesn’t overlap content */}
      <div className="h-24" />

      {/* Sticky Pay button */}
      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
        <div className="mx-auto w-full max-w-xl p-4">
          <button className="w-full rounded-2xl bg-[#c44a06] px-4 py-3 text-center text-base font-semibold text-white shadow-sm hover:opacity-95">
            Pay • 4 800 MRU
          </button>
        </div>
      </div>
    </div>
  );
}

function AppleCardMini() {
  return (
    <div
      className="h-24 w-40 shrink-0 rounded-2xl p-2 bg-[length:100%_100%]"
      style={{ backgroundImage: "url('/images/demo/frame_275_3.png')" }}
    >
      <div className="relative h-full w-full rounded-xl bg-white/0"></div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  labelStrong,
  valueStrong,
}: {
  label?: string;
  value?: string;
  labelStrong?: string;
  valueStrong?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div
        className={
          labelStrong
            ? "text-base font-semibold text-[#000] "
            : "text-muted-foreground text-base"
        }
      >
        {labelStrong ?? label}
      </div>
      <div
        className={
          valueStrong
            ? "text-base font-semibold text-[#000] "
            : "text-base text-[#000]"
        }
      >
        {valueStrong ?? value}
      </div>
    </div>
  );
}

function PaymentMethodCard({
  logo,
  name,
  selected,
}: {
  logo: React.ReactNode;
  name: string;
  selected?: boolean;
}) {
  return (
    <div
      className={[
        "bg-card relative rounded-2xl border p-3 text-center shadow-sm",
        selected ? "ring-foreground/80 ring-2" : "opacity-100",
      ].join(" ")}
    >
      {/* check badge when selected */}
      {selected && (
        <div className="bg-foreground  text-background absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
          ✓
        </div>
      )}
      <div className="bg-background mb-2 flex h-14 items-center justify-center overflow-hidden rounded-lg">
        {logo}
      </div>
      <div className="text-foreground text-xs">{name}</div>
    </div>
  );
}

/* ---------- placeholder bank logos (design only) ---------- */

function BankilyLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded bg-emerald-500" />
      <div className="text-sm font-semibold">Bankily</div>
    </div>
  );
}

function SedadLogo({ dim }: { dim?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${dim ? "opacity-60" : ""}`}>
      <div className="h-8 w-8 rounded bg-lime-500" />
      <div className="text-sm font-semibold">SedadBank</div>
    </div>
  );
}

function MasrviLogo({ dim }: { dim?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${dim ? "opacity-60" : ""}`}>
      <div className="h-8 w-8 rounded bg-violet-500" />
      <div className="text-sm font-semibold">Masrvi</div>
    </div>
  );
}
