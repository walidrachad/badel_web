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
	type: 'country' | 'none'
	order: number
	giftcards: Array<GiftCard>
}

export type CategoriesGroup = {
	id: number
	type: 'group'
	order: number
	name: string
	name_fr: string | null
	name_ar: string | null
	image_path: string | null
	categories: Array<Category>
}

export type GiftCard = {
	id: number
	name: string
	output: string | null
	output_fr: string | null
	output_ar: string | null
	amount?: string
	amount_after_fee?: string
	in_stock: 0 | 1
	country: string | null
	category_id: number
	display_type: string | null
	display_value: string | null
	display_order: number | null
}

export type CategoryOrGroup =
	| (Category & { type: 'country' | 'none' })
	| (CategoriesGroup & { type: 'group' })

export type Activity = {
	id: number
	name: string
	icon: string
}
