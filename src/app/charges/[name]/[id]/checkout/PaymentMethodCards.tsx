// src/components/GiftcardGrid.tsx
"use client";

export default function PaymentMethodCards() {
  return (
    <section className="mt-6 space-y-3 pb-4">
      <h2 className="text-lg font-semibold">Payment method</h2>
      <div className="grid grid-cols-3 gap-3">
        {/* Selected */}
        <PaymentMethodCard selected logo="" name="Bankily" />
        <PaymentMethodCard logo="" name="SedadBank" />
        <PaymentMethodCard logo="" name="Masrvi" />
      </div>
    </section>
  );
}

function PaymentMethodCard({
  logo,
  name,
  selected,
}: {
  logo: string;
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
