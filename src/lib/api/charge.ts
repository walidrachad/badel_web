import { seeds } from '../seed'
import { sleep } from '../utils'
import type { CategoryOrGroup } from '../types'

export async function getChargePageItems(): Promise<Array<CategoryOrGroup>> {
	await sleep(500)
	// const res = await http.get<{
	// 	status: boolean
	// 	data: CategoryOrGroup[]
	// 	recent_categories?: unknown
	// 	message?: string
	// }>('/api/v3/charge-page-items')

	return seeds
}
