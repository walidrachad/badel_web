import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import { logMessage } from '~/lib/logger'

import { api } from '.'

export type HomepageChargesApiPayload = {
	status: boolean
	message: string
	data: Array<any>
}

export const fetchCharges = createServerFn().handler(() => {
	logMessage('running fetchCharges function')
	return api.get<HomepageChargesApiPayload>('homepage-base').json()
})

export const chargesQueryOptions = queryOptions({
	queryKey: ['charges'],
	queryFn: () => fetchCharges(),
})
