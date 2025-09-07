import { seeds } from '../seed'
import { CategoryOrGroup } from '../types'
import { sleep } from '../utils'

export async function getChargePageItems(): Promise<CategoryOrGroup[]> {
	await sleep(500)
	// const res = await http.get<{
	// 	status: boolean
	// 	data: CategoryOrGroup[]
	// 	recent_categories?: unknown
	// 	message?: string
	// }>('/api/v3/charge-page-items')

	return seeds
}
