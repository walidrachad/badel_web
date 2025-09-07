import { fileURLToPath, URL } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const eslintConfig = [
	includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
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
