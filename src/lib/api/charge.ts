import { http } from '../http'
import { CategoryOrGroup } from '../types'

export async function getChargePageItems(): Promise<CategoryOrGroup[]> {
	const res = await http.get<{
		status: boolean
		data: CategoryOrGroup[]
		recent_categories?: unknown
		message?: string
	}>('/api/v3/charge-page-items')

	return res.data.data
}
