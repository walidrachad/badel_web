// components/NavigationBar.tsx
type Props = {
  title: string;
};

export default function NavigationBar({ title }: Props) {
  return (
    <div className="absolute top-[54px] left-0 w-full bg-white flex items-center justify-between px-2">
      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F0F0F3]">
        <div className="w-5 h-4 bg-[#1C2024]" />
      </button>
      <div className="flex-1 text-center text-[#1C2024] font-semibold text-lg">
        {title}
      </div>
      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F0F0F3]">
        <div className="w-5 h-5 bg-[#1C2024]" />
      </button>
    </div>
  );
}
