export const PHONES_KEY = "bankily_phones";
export const SELECTED_PHONE_KEY = "bankily_selected_phone";

// Safe LS getters/setters (no-ops on SSR)
export function lsGet(key: string) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function lsSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

export type PhoneItem = { id: string; label: string };

export function getSavedPhones(): PhoneItem[] {
  const raw = lsGet(PHONES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PhoneItem[];
  } catch {
    return [];
  }
}

export function setSavedPhones(items: PhoneItem[]) {
  lsSet(PHONES_KEY, JSON.stringify(items));
}

export function getSelectedPhoneId(): string | null {
  return lsGet(SELECTED_PHONE_KEY);
}

export function setSelectedPhoneId(id: string) {
  lsSet(SELECTED_PHONE_KEY, id);
}
