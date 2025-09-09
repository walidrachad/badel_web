import { categoriesList } from '~/data/categories'

import { sleep } from '../utils'

export async function getChargePageItems() {
	await sleep(500)
	// const res = await http.get<{
	// 	status: boolean
	// 	data: CategoryOrGroup[]
	// 	recent_categories?: unknown
	// 	message?: string
	// }>('/api/v3/charge-page-items')

	return categoriesList
}
