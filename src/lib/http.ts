import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_BASEURL

if (!baseURL) {
	throw new Error('`VITE_BACKEND_BASEURL` environment variable is not set.')
}

export const http = axios.create({
	baseURL,
	timeout: 10_000,
})

// Optional: interceptors for auth / logging
http.interceptors.response.use(
	(r) => r,
	(err) => {
		// You can normalize errors here
		return Promise.reject(err)
	},
)
