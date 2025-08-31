"use client";

import { useEffect, useId, useState } from "react";
import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

type PropsType = {
  label: string;
  items: { value: string; label: string }[];
  prefixIcon?: React.ReactNode;
  className?: string;

  /** NEW: controlled value + change handler (optional) */
  value?: string;
  onValueChange?: (value: string) => void;
} & (
  | { placeholder?: string; defaultValue: string }
  | { placeholder: string; defaultValue?: string }
);

export function Select({
  items,
  label,
  defaultValue,
  placeholder,
  prefixIcon,
  className,
  value,
  onValueChange,
}: PropsType) {
  const id = useId();
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(
    Boolean(value ?? defaultValue)
  );

  // keep internal state in sync if parent controls `value`
  useEffect(() => {
    if (value !== undefined) setIsOptionSelected(value !== "");
  }, [value]);

  return (
    <div className={cn("space-y-3", className)}>
      <label
        htmlFor={id}
        className="block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>

      <div className="relative">
        {prefixIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {prefixIcon}
          </div>
        )}

        <select
          id={id}
          /* controlled when `value` is provided, else fallback to defaultValue */
          value={value}
          defaultValue={value === undefined ? defaultValue || "" : undefined}
          onChange={(e) => {
            setIsOptionSelected(true);
            onValueChange?.(e.target.value);
          }}
          className={cn(
            "w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6",
            (isOptionSelected || value) && "text-dark dark:text-white",
            prefixIcon && "pl-11.5"
          )}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
      </div>
    </div>
  );
}
