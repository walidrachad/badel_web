import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import unfonts from 'unplugin-fonts/vite'
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
		unfonts({
			google: {
				families: [{ name: 'Inter', styles: 'wght@400;500;600;700' }],
			},
		}),
	],
})
