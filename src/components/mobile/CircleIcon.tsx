export default function CircleIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-[#F0F0F3] shadow-sm">
      {children}
    </div>
  );
}
