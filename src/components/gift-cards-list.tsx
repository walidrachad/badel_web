import { Link } from '@tanstack/react-router'

import type { ChargeItem } from '~/api/types'
import type { Category } from '~/data/categories'
import { getLocalizedValue } from '~/lib/utils'

// TODO: Two elements have the same id (4), "VPN" and "Apple Charge"
// TODO: I don't see any `slug` key, maybe not deployed yet?

export function GiftCardsList({ charges }: { charges: Array<ChargeItem> }) {
	return (
		<div className="container grid grid-cols-1">
			{charges.map((charge) => {
				if (charge.listItemType == 'category') {
					return <ChargeItem key={`category-${charge.id}`} charge={charge} />
				}

				return (
					<div key={`group-${charge.id}`} className="space-y-2">
						<h2 className="text-label-large py-4">
							{getLocalizedValue(charge, 'name')}
						</h2>

						<div className="grid grid-cols-2 gap-3">
							{charge.categories.map((category) => (
								<ChargeItem
									key={`group-category-${category.id}`}
									charge={category}
								/>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}

function ChargeItem({ charge }: { charge: ChargeItem }) {
	return (
		<Link
			key={`category-${charge.id}`}
			to="/charge/$id"
			params={{ id: String(charge.id) }}
		>
			<h3 className="sr-only">{getLocalizedValue(charge, 'name')}</h3>
			<img
				src={charge.image_path}
				alt={getLocalizedValue(charge, 'name')}
				className="aspect-2/1 overflow-hidden rounded-2xl"
			/>
		</Link>
	)
}
