import { fileURLToPath, URL } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const eslintConfig = [
	includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
	// js.configs.recommended,
	eslintConfigPrettier,
	...tanstackConfig.map((config) => {
		if (config.name !== 'tanstack/javascript') return config

		return {
			...config,
			rules: {
				...config.rules,
				'import/order': [
					'error',
					{
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
		}
	}),
]

export default eslintConfig
