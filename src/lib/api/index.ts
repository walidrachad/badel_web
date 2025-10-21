import ky from 'ky'

import { serverEnv } from '~/config/env'

import logger from '../logger'

export const BACKEND_BASEURL = import.meta.env.VITE_BACKEND_BASEURL as string

export const api = ky.create({
	prefixUrl: serverEnv.BACKEND_BASEURL,
	timeout: 10_000,
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
	hooks: {
		afterResponse: [
			(request, _, response) => {
				const pathname = new URL(request.url).pathname

				logger.log(
					`EXTERNAL API Request --> ${request.method} ${pathname} ${response.status}`,
				)
			},
		],
	},
	retry: {
		limit: 1,
		statusCodes: [401],
		methods: ['get', 'post', 'head', 'delete', 'options', 'trace'],
	},
})
