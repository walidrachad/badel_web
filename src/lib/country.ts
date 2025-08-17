// prefer giftcard.country, fallback to display_value
export function pickCountryCode(gc: {
  country?: string | null;
  display_value?: string | null;
}) {
  const raw = (gc.country ?? gc.display_value ?? "")
    .toString()
    .trim()
    .toUpperCase();
  // accept only 2-letter A–Z codes
  return /^[A-Z]{2}$/.test(raw) ? raw : null;
}

// code → "🇺🇸" style emoji (no deps)
export function codeToFlagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1a5 + c.charCodeAt(0))); // 127397 offset
}

// code → localized country name (uses browser locale; fallback to code)
const regionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(undefined, { type: "region" })
    : null;

export function codeToName(code: string) {
  return regionNames?.of?.(code.toUpperCase()) ?? code.toUpperCase();
}

// build unique, sorted list from giftcards
export function uniqueCountriesFromGiftcards(
  giftcards: Array<{ country?: string | null; display_value?: string | null }>
) {
  const set = new Set<string>();
  for (const gc of giftcards ?? []) {
    const code = pickCountryCode(gc);
    if (code) set.add(code);
  }
  // sort by readable name
  return [...set].sort((a, b) => codeToName(a).localeCompare(codeToName(b)));
}
