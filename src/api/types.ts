import type { Maybe } from '~/lib/types'

// GET /homepage-base
export type HomepageChargesApiPayload = {
	status: boolean
	message: string
	data: Array<ChargeItem>
}

export type ChargeItem = ChargeItemCategory | ChargeItemGroup

export type ChargeItemBase = {
	id: number
	image_path: string
	name: string
	name_ar: string
	name_fr: string
	order: number
}

export type ChargeItemCategory = ChargeItemBase & {
	listItemType: 'category'
	desclaimer: Maybe<string>
	desclaimer_ar: Maybe<string>
	desclaimer_fr: Maybe<string>
	description: string
	description_ar: string
	description_fr: string
	giftcards: Array<GiftCard>
	in_stock: Maybe<number>
	small_image: string
	type: ChargeItemCategoryType
}

export type ChargeItemCategoryType = 'country' | 'type' | 'none'

export type ChargeItemGroup = ChargeItemBase & {
	listItemType: 'group'
	categories: Array<ChargeItemCategory>
}

export type GiftCard = {
	id: number
	name: string
	output: string
	output_fr: string
	output_ar: string
	amount: string
	amount_after_fee: string
	in_stock: number
	country: Maybe<string>
	category_id: number
	display_type: ChargeItemCategoryType
	display_value: Maybe<string>
	display_order: number
	card_category: GiftCardCardCategory
}

export type GiftCardCardCategory = {
	id: number
	name: string
	name_fr: string
	name_ar: string
	image_path: string
	small_image: string
	description: string
	description_fr: string
	description_ar: string
	category_type: ChargeItemCategoryType
	in_stock: number
}
