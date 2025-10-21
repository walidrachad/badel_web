import { z } from 'zod'

const envSchema = z.object({
	BACKEND_BASEURL: z.url(),
})

const clientEnvSchema = z.object({
	VITE_APP_NAME: z.string(),
})

// Validate server environment
export const serverEnv = envSchema.parse(process.env)

// Validate client environment
export const clientEnv = clientEnvSchema.parse(import.meta.env)
