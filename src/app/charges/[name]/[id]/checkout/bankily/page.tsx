// app/(dashboard)/checkout/bankily/page.tsx
// Design-only UI for "Bankily payment" (no logic)

import AppBar from "@/components/mobile/app_bar/AppBar";

export default function BankilyPaymentPage() {
  return (
    <div className="mx-auto w-full max-w-xl sm:p-6">
      {/* Header */}

      <AppBar title="Bankily payment"></AppBar>
      <p className="text-muted-foreground text-sm">
        Open Bankily, choose b-pay and enter the information below
      </p>

      {/* App + tabs preview */}
      <div className="bg-card mt-4 rounded-2xl border p-4">
        <div className="flex items-center gap-3">
          <BankilyAppIcon />
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            className="text-muted-foreground"
          >
            <path
              d="M8 5l8 7-8 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div className="flex flex-1 items-center gap-2">
            <GhostTab label="Debit Card" />
            <GhostTab label="Cash out" />
            <GhostTab label="B-Pay" active />
          </div>
        </div>

        {/* B-Pay card */}
        <div className="mt-4 overflow-hidden rounded-2xl border">
          <div className="bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-white">
            B-Pay
          </div>

          <div className="space-y-4 p-4">
            <div className="space-y-1">
              <div className="text-muted-foreground text-sm">Merchant code</div>
              <div className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
                <div className="truncate text-base font-semibold">
                  BEDEL SARL - 017890
                </div>
                <button className="bg-muted inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <rect
                      x="9"
                      y="9"
                      width="10"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <rect
                      x="5"
                      y="5"
                      width="10"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                  Copy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-end gap-2">
              <div className="space-y-1">
                <div className="text-muted-foreground text-sm">Amount</div>
                <div className="rounded-xl border px-3 py-2 text-lg font-semibold">
                  4 800.00
                </div>
              </div>
              <div className="text-muted-foreground pb-2 text-sm font-medium">
                MRU
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone number warning card */}
      <div className="bg-card mt-4 rounded-2xl border p-3">
        <div className="bg-background rounded-xl border p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="text-amber-600"
              >
                <path
                  d="M12 2l10 18H2L12 2z"
                  fill="currentColor"
                  opacity=".15"
                />
                <path
                  d="M12 8v5m0 3h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-amber-600"
                />
              </svg>
              <span>رقم هاتف بنكلي</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="text-muted-foreground"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-xl font-semibold tracking-wide">32001625</div>
          </div>
          <p className="text-muted-foreground mt-2 text-[13px] leading-5">
            يجب عليك استخدام هذا رقم في دفع أو انقر هنا لتغييره
          </p>
        </div>
      </div>

      {/* Enter transaction code */}
      <div className="mt-6 space-y-3">
        <p className="text-sm">
          After paying using B-Pay, enter transaction code below
        </p>
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card h-14 w-16 rounded-2xl border p-3 text-center text-lg font-semibold shadow-sm"
            />
          ))}
        </div>
      </div>

      {/* spacer */}
      <div className="h-28" />

      {/* Sticky confirm button */}
      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
        <div className="mx-auto w-full max-w-xl p-4">
          <button className="w-full rounded-2xl bg-[#c44a06] px-4 py-3 text-center text-base font-semibold text-white shadow-sm hover:opacity-95">
            Confirm payment
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============== tiny atoms (design only) =============== */

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex h-9 w-9 items-center justify-center rounded-full border shadow-sm">
      {children}
    </div>
  );
}

function BankilyAppIcon() {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border"
      style={{ background: "linear-gradient(180deg,#0a7a6f,#0b3e34)" }}
    >
      {/* placeholder brand block */}
      <div className="h-8 w-8 rounded bg-emerald-400" />
    </div>
  );
}

function GhostTab({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={[
        "flex flex-1 items-center justify-center rounded-xl border px-3 py-2 text-sm",
        active
          ? "border-amber-400 bg-amber-50 text-amber-700"
          : "bg-muted/30 text-muted-foreground",
      ].join(" ")}
    >
      {label}
    </div>
  );
}
