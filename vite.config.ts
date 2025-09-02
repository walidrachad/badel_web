import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
	server: {
		port: 3322,
	},
	plugins: [
		tailwindcss(),
		tsconfigPaths(),
		tanstackStart({ customViteReactPlugin: true }),
		viteReact(),
	],
})
