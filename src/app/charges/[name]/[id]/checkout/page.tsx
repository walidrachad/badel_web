// app/(dashboard)/checkout/confirm/page.tsx
// Design-only: Tailwind UI (no data, no actions)

import AppBar from "@/components/mobile/app_bar/AppBar";

export default function ConfirmPaymentPage() {
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6">
      {/* Header */}

      <AppBar title="Confirm payment"></AppBar>
      {/* Product summary row */}
      <div className="mb-4 flex items-center gap-3">
        <AppleCardMini />
        <div className="min-w-0">
          <div className="truncate text-base font-semibold">
            Apple Gift Card
          </div>
          <div className="text-muted-foreground text-sm">USA • $100</div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-card text-card-foreground divide-y rounded-2xl border">
        <SummaryRow label="Subtotal" value="4 800 MRU" />
        <SummaryRow label="Tax" value="0 MRU" />
        <SummaryRow labelStrong="Total" valueStrong="4 800 MRU" />
      </div>

      {/* Payment method */}
      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold">Payment method</h2>

        <div className="grid grid-cols-3 gap-3">
          {/* Selected */}
          <PaymentMethodCard selected logo={<BankilyLogo />} name="Bankily" />
          <PaymentMethodCard logo={<SedadLogo dim />} name="SedadBank" />
          <PaymentMethodCard logo={<MasrviLogo dim />} name="Masrvi" />
        </div>
      </section>

      {/* Phone select */}
      <section className="mt-6 space-y-2">
        <h3 className="text-sm font-medium">Bankily phone number</h3>
        <SelectField placeholder="Select Bankily number" />
      </section>

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
      className="h-24 w-40 shrink-0 rounded-2xl p-2"
      style={{ background: "linear-gradient(135deg,#0a84ff 0%,#0041c4 100%)" }}
    >
      <div className="relative h-full w-full rounded-xl bg-white/0">
        {/* Apple bubble */}
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 shadow" />
        {/* pill of icons */}
        <div className="absolute inset-x-3 bottom-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs shadow-sm backdrop-blur">
          <span>🎵</span>
          <span>🤖</span>
          <span>☁️</span>
          <span>👻</span>
        </div>
      </div>
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
            ? "text-base font-semibold"
            : "text-muted-foreground text-base"
        }
      >
        {labelStrong ?? label}
      </div>
      <div className={valueStrong ? "text-base font-semibold" : "text-base"}>
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
        <div className="bg-foreground text-background absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
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

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <div className="bg-background flex items-center justify-between rounded-2xl border px-3 py-3">
      <span className="text-muted-foreground text-sm">{placeholder}</span>
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className="text-muted-foreground"
      >
        <path
          d="M6 9l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
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
