import { useMemo } from 'react'

import type { PhoneItem } from '~/lib/phone-storage'
import { getSavedPhones, getSelectedPhoneId } from '~/lib/phone-storage'

export function useSavedPhone() {
	const selectedId: string | null = useMemo(() => getSelectedPhoneId(), [])
	const phones: Array<PhoneItem> = useMemo(() => getSavedPhones(), [])

	const selected = phones.find((p) => p.id === selectedId) || null
	return { selectedId, selected, phones }
}
