import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
})

/** @type {import("eslint").Linter.Config[]} */
export default [
	js.configs.recommended,
	importPlugin.flatConfigs.recommended,
	...compat.config({ extends: ['next'] }),
	{
		rules: {
			'import/order': [
				'warn',
				{
					alphabetize: { order: 'asc', caseInsensitive: true },
					pathGroups: [{ pattern: '~/**', group: 'internal' }],
					groups: [
						'internal',
						'builtin',
						'external',
						'parent',
						'sibling',
						'index',
					],
				},
			],
		},
	},
]
