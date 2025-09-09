import { Link } from '@tanstack/react-router'

import type { Category, CategoryOrGroup } from '~/data/categories'

export function GiftCardsList({ data }: { data?: Array<CategoryOrGroup> }) {
	if (!data) return null

	return (
		<div className="container grid grid-cols-2 gap-3 py-3">
			{data.map((card) => {
				if (card.type === 'group') {
					return (
						<>
							{card.categories.map((category) => (
								<GiftCard key={category.id} giftCard={category} />
							))}
						</>
					)
				}

				return <div className="col-span-2"></div>
			})}
		</div>
	)
}

function GiftCard({ giftCard }: { giftCard: Category }) {
	return (
		<Link to="/charge/$id" params={{ id: String(giftCard.id) }}>
			<img
				src={giftCard.main_image}
				alt={`Gift Card - ${giftCard.name}`}
				className="aspect-[2/1] overflow-hidden rounded-xl hover:rounded-2xl"
			/>
		</Link>
	)
}
