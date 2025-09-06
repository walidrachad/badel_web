import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	server: {
		port: 3322,
	},
	plugins: [
		tailwindcss(),
		tsconfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tanstackStart({ customViteReactPlugin: true }),
		viteReact(),
	],
})
