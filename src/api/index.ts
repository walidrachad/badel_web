import ky from 'ky'

import { serverEnv } from '~/config/env'
import { logMessage } from '~/lib/logger'

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

				logMessage(
					`EXTERNAL API Request --> ${request.method} ${pathname} ${response.status}`,
				)
			},
		],
	},
	retry: {
		limit: 1,
		statusCodes: [401],
		methods: ['get', 'post', 'put', 'patch', 'delete'],
	},
})
