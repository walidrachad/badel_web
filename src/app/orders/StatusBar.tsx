// components/StatusBar.tsx
type Props = {
  theme?: "light" | "dark";
};

export default function StatusBar({ theme = "dark" }: Props) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-[54px] flex justify-between items-center px-4 ${
        theme === "dark" ? "bg-[#60646C]" : "bg-white"
      }`}
    >
      <div
        className={`text-[17px] font-semibold ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        9:41
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-5 h-3 rounded ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
        />
        <div
          className={`w-5 h-3 rounded ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
        />
        <div
          className={`w-6 h-3 rounded ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
        />
      </div>
    </div>
  );
}
