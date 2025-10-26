import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Locale } from '~/paraglide/runtime'
import { getLocale } from '~/paraglide/runtime'

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

/**
 * Get a single localized value (for one key)
 */
export function getLocalizedValue<
	T extends Record<string, any>,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	K extends keyof T,
>(
	obj: T,
	baseKey: K,
	// @ts-ignore errors out
): T extends Record<`${K}_${Locale}`, infer V> ? V : T[K] | undefined {
	const locale = getLocale()

	if (locale === 'en') {
		return obj[baseKey] as any
	}

	const localizedKey = `${String(baseKey)}_${locale}` as keyof T
	return (obj[localizedKey] ?? obj[baseKey]) as any
}
