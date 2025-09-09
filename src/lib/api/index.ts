import axios from 'axios'
import { env } from '~/env'

export const api = axios.create({
	baseURL: env.BACKEND_BASEURL,
	timeout: 10_000,
})

// Optional: interceptors for auth / logging
api.interceptors.response.use(
	(r) => r,
	(err) => {
		// You can normalize errors here
		return Promise.reject(err)
	},
)
