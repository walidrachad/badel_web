// import { fileURLToPath, URL } from 'node:url'

// import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

// const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const eslintConfig = [
	// includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
	js.configs.recommended,
	eslintConfigPrettier,
	...tanstackConfig,
	// {
	// 	plugins: {
	// 		import: importPlugin,
	// 	},
	// 	rules: {
	// 		'import/no-cycle': 'warn',
	// 		'import/order': [
	// 			'warn',
	// 			{
	// 				alphabetize: { order: 'asc', caseInsensitive: true },
	// 				pathGroups: [{ pattern: '~/**', group: 'internal' }],
	// 				groups: [
	// 					'builtin',
	// 					'external',
	// 					'internal',
	// 					'parent',
	// 					'sibling',
	// 					'index',
	// 				],
	// 			},
	// 		],
	// 	},
	// },
]

export default eslintConfig
