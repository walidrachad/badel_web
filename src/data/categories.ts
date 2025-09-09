import z from 'zod'

const categorySchema = z.object({
	type: z.literal('category'),
	id: z.number(),
	name: z.string(),
	name_fr: z.string().nullable(),
	name_ar: z.string().nullable(),
	description: z.string().nullable(),
	description_fr: z.string().nullable(),
	description_ar: z.string().nullable(),
	main_image: z.string(),
	thumbnail_image: z.null(),
	desclaimer: z.string().nullable(),
	desclaimer_fr: z.string().nullable(),
	desclaimer_ar: z.string().nullable(),
	in_stock: z.union([z.literal(0), z.literal(1)]),
})

export type Category = z.infer<typeof categorySchema>

const categoriesGroupSchema = z.object({
	type: z.literal('group'),
	id: z.number(),
	name: z.string(),
	name_fr: z.string().nullable(),
	name_ar: z.string().nullable(),
	description: z.string().nullable(),
	description_fr: z.string().nullable(),
	description_ar: z.string().nullable(),
	main_image: z.string(),
	thumbnail_image: z.null(),
	categories: z.array(categorySchema),
})

export type CategoriesGroup = z.infer<typeof categoriesGroupSchema>

export const categoryOrGroupSchema = z.discriminatedUnion('type', [
	categorySchema,
	categoriesGroupSchema,
])

export type CategoryOrGroup = z.infer<typeof categoryOrGroupSchema>

export const categoriesList = categoryOrGroupSchema.parse([
	{
		type: 'category',
		category: {
			id: 3,
			type: 'none',
			order: 1,
			name: 'Gaming',
			name_fr: 'Jeux',
			name_ar: 'ألعاب',
			description: 'All popular gaming gift cards',
			description_fr: 'Toutes les cartes cadeaux de jeux',
			description_ar: 'جميع بطاقات الألعاب الشهيرة',
			image_path: '/images/gaming.png',
			small_image: null,
			desclaimer: null,
			desclaimer_fr: null,
			desclaimer_ar: null,
			in_stock: 1,
			giftcards: [],
		},
	},
	{
		type: 'category',
		category: {
			id: 4,
			type: 'none',
			order: 2,
			name: 'Food Delivery',
			name_fr: 'Livraison de nourriture',
			name_ar: 'توصيل الطعام',
			description: 'Gift cards for food delivery apps',
			description_fr: 'Cartes cadeaux pour la livraison',
			description_ar: 'بطاقات هدايا لتطبيقات التوصيل',
			image_path: '/images/food.png',
			small_image: null,
			desclaimer: null,
			desclaimer_fr: null,
			desclaimer_ar: null,
			in_stock: 1,
			giftcards: [],
		},
	},
	{
		type: 'category',
		category: {
			id: 5,
			type: 'none',
			order: 3,
			name: 'E-commerce',
			name_fr: 'E-commerce',
			name_ar: 'التجارة الإلكترونية',
			description: 'Online shopping gift cards',
			description_fr: 'Cartes cadeaux pour achats en ligne',
			description_ar: 'بطاقات هدايا للتسوق عبر الإنترنت',
			image_path: '/images/ecommerce.png',
			small_image: null,
			desclaimer: null,
			desclaimer_fr: null,
			desclaimer_ar: null,
			in_stock: 1,
			giftcards: [],
		},
	},
	{
		type: 'group',
		group: {
			id: 8,
			type: 'group',
			order: 4,
			name: 'Streaming Services',
			name_fr: 'Services de streaming',
			name_ar: 'خدمات البث',
			image_path: '/images/streaming.png',
			categories: [
				{
					id: 9,
					type: 'none',
					order: 1,
					name: 'Disney+',
					name_fr: 'Disney+',
					name_ar: 'ديزني+',
					description: 'Disney+ gift cards',
					description_fr: 'Cartes cadeaux Disney+',
					description_ar: 'بطاقات هدايا ديزني+',
					image_path: '/images/disney.png',
					small_image: null,
					desclaimer: null,
					desclaimer_fr: null,
					desclaimer_ar: null,
					in_stock: 1,
					giftcards: [],
				},
			],
		},
	},
])
