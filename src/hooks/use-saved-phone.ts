import { useEffect, useState } from 'react'

import type { PhoneItem } from '~/lib/phone-storage'
import { getSavedPhones, getSelectedPhoneId } from '~/lib/phone-storage'

export function useSavedPhone() {
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [phones, setPhones] = useState<Array<PhoneItem>>([])

	useEffect(() => {
		setSelectedId(getSelectedPhoneId())
		setPhones(getSavedPhones())
	}, [])

	const selected = phones.find((p) => p.id === selectedId) || null
	return { selectedId, selected, phones }
}
