"use client";
import { useEffect, useState } from "react";
import {
  getSavedPhones,
  getSelectedPhoneId,
  type PhoneItem,
} from "@/lib/phoneStorage";

export function useSavedPhone() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phones, setPhones] = useState<PhoneItem[]>([]);

  useEffect(() => {
    setSelectedId(getSelectedPhoneId());
    setPhones(getSavedPhones());
  }, []);

  const selected = phones.find((p) => p.id === selectedId) || null;
  return { selectedId, selected, phones };
}
