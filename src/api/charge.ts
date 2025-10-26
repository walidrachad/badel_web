import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import { logMessage } from '~/lib/logger'

import type { HomepageChargesApiPayload } from './types'

import { api } from '.'

export const fetchCharges = createServerFn().handler(async () => {
	logMessage('running fetchCharges function')
	return api
		.get<HomepageChargesApiPayload>('homepage-base')
		.json()
		.then((res) => res.data)
})

export const chargesQueryOptions = queryOptions({
	queryKey: ['charges'],
	queryFn: () => fetchCharges(),
})
