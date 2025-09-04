// components/OrderItem.tsx
import Image from "next/image";

type Props = {
  imageType: "apple" | "netflix" | "playstation";
  title: string;
  price: string;
  status: string;
  statusType: "success" | "warning" | "danger";
  date: string;
};

export default function OrderItem({
  imageType,
  title,
  price,
  status,
  statusType,
  date,
}: Props) {
  const statusStyles = {
    success: "bg-[#E9F6E9] border border-[#C9E8CA] text-[#2A7E3B]",
    warning: "bg-[#FFF7C2] border border-[#FBE577] text-[#AB6400]",
    danger: "bg-[#FEEBEC] border border-[#FFCDCE] text-[#CE2C2C]",
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-4">
        {/* Thumbnail */}
        <div className="w-32 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
          {imageType === "apple" && (
            <div className="w-6 h-6 bg-gradient-to-tr from-[#009EDB] to-[#00328B] rounded" />
          )}
          {imageType === "netflix" && <div className="w-14 h-6 bg-[#D81F26]" />}
          {imageType === "playstation" && (
            <div className="w-10 h-10 bg-[#0070D1] rounded" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-base text-[#1C2024]">{title}</div>
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-[#F0F0F3] rounded-full text-sm font-semibold text-[#202020]">
              {price}
            </div>
            <div
              className={`px-2 py-1 rounded-full text-sm font-semibold ${statusStyles[statusType]}`}
            >
              {status}
            </div>
          </div>
          <div className="text-xs text-[#60646C]">{date}</div>
        </div>

        {/* Arrow */}
        <Image src="/icons/caret_right.svg" alt="Menu" width={16} height={16} />
      </div>
      <div className="w-full border-t border-[#F0F0F3]" />
    </div>
  );
}
