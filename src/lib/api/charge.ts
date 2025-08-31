// ---- Types for just what you need ----
export type GiftCard = {
	id: number
	name: string
	output: string | null
	output_fr: string | null
	output_ar: string | null
	amount: string // "8400.00"
	amount_after_fee: string // "9600.00"
	in_stock: 0 | 1
	country: string | null
	category_id: number
	display_type: string | null
	display_value: string | null
	display_order: number | null
}

export type Category = {
	id: number
	name: string
	name_fr: string | null
	name_ar: string | null
	description: string | null
	description_fr: string | null
	description_ar: string | null
	image_path: string | null
	small_image: string | null
	desclaimer: string | null
	desclaimer_fr: string | null
	desclaimer_ar: string | null
	in_stock: 0 | 1
	type: 'country' | 'none' | string
	order: number
	giftcards: GiftCard[]
}

export type GroupItem = {
	id: number
	type: 'group'
	order: number
	name: string
	name_fr: string | null
	name_ar: string | null
	image_path: string | null
	categories: Category[]
}

export type ChargeItem = GroupItem | Category

import { http } from '@/lib/http'

export async function getChargePageItems(): Promise<ChargeItem[]> {
	const res = await http.get<{
		status: boolean
		data: ChargeItem[]
		recent_categories?: unknown
		message?: string
	}>('/api/v3/charge-page-items')

	// Return ONLY the array
	return res.data.data ?? []
}
