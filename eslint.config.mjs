import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	js.configs.recommended,
	eslintConfigPrettier,
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
		],
	},
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			'import/no-cycle': 'warn',
			'import/order': [
				'warn',
				{
					alphabetize: { order: 'asc', caseInsensitive: true },
					pathGroups: [{ pattern: '@/**', group: 'internal' }],
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
				},
			],
		},
	},
]

export default eslintConfig
