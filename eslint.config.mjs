import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const eslintConfig = [
	js.configs.recommended,
	eslintConfigPrettier,
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
					pathGroups: [{ pattern: '~/**', group: 'internal' }],
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
