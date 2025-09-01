"use client";

import { useEffect, useRef, useState } from "react";

export default function OtpInput({
  length = 4,
  error = "",
  onComplete,
  onChange,
  autoFocus = true,
}: {
  length?: number;
  error?: string; // show error UI when non-empty
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void; // fires on any change
  autoFocus?: boolean;
}) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // focus first on mount
  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const setAt = (idx: number, val: string) => {
    const next = [...values];
    next[idx] = val;
    setValues(next);
    const code = next.join("");
    onChange?.(code);
    if (next.every((v) => v !== "")) onComplete?.(code);
  };

  const handleChange = (v: string, i: number) => {
    if (!/^\d?$/.test(v)) return; // one digit
    setAt(i, v);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = (e.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!digits) return;
    const next = Array(length).fill("");
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setValues(next);
    const code = next.join("");
    onChange?.(code);
    if (digits.length === length) {
      onComplete?.(code);
      refs.current[length - 1]?.blur();
    } else {
      refs.current[digits.length]?.focus();
    }
  };

  const base =
    "flex-1 h-16 w-[20%] text-center text-lg font-semibold rounded-2xl outline-none transition border-2";
  const ok = "border-gray-300 focus:border-black";
  const err = "border-red-600 bg-red-50 text-red-700 focus:border-red-700";

  return (
    <div className="w-full">
      <div className="flex w-full gap-4">
        {values.map((val, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            aria-invalid={!!error}
            className={[base, error ? err : ok].join(" ")}
          />
        ))}
      </div>

      {error ? (
        <div className="flex w-full gap-4 justify-center pt-4">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs">
            !
          </span>
          <p className="justify-center text-sm text-[#DB1F1F]">{error}</p>
        </div>
      ) : null}
    </div>
  );
}
