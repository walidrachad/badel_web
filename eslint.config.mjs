import { fileURLToPath, URL } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const eslintConfig = [
	includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
	eslintConfigPrettier,
	...tanstackConfig.map((config) => {
		if (config.name !== 'tanstack/javascript') return config

		return {
			...config,
			rules: {
				...config.rules,
				'@typescript-eslint/no-unused-expressions': [
					'warn',
					{ allowShortCircuit: true, allowTernary: true },
				],
				'@typescript-eslint/consistent-type-exports': 'error',
				'@typescript-eslint/no-deprecated': 'error',
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
						'newlines-between': 'always',
					},
				],
			},
		}
	}),
	pluginReact.configs.flat.recommended,
	{
		languageOptions: {
			...pluginReact.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},
	{
		plugins: {
			'react-hooks': pluginReactHooks,
		},
		settings: { react: { version: 'detect' } },
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			// React scope no longer necessary with new JSX transform.
			'react/react-in-jsx-scope': 'off',
		},
	},
	{
		rules: {
			'react/no-children-prop': ['warn', { allowFunctions: true }],
			'react/prop-types': ['off'],
		},
	},
	{
		ignores: ['dist/**'],
	},
	{
		rules: {
			'no-empty': ['error', { allowEmptyCatch: true }],
		},
	},
]

export default eslintConfig
