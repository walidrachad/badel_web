import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import { logMessage } from '~/lib/logger'

import { api } from '.'

export const fetchRecentActivities = createServerFn().handler(() => {
	logMessage('running fetchRecentActivities function')
	// TODO : Get back to the endpoint
	return api.get<any>('homepage-base').json()
})

export const chargesQueryOptions = queryOptions({
	queryKey: ['recent-activities'],
	queryFn: () => fetchRecentActivities(),
})
