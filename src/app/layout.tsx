import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import '@/css/style.css'

import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		template: '%s | Bedel Charge',
		default: 'Bedel Charge',
	},
	description: '',
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body>
				<Providers>
					<div className="flex w-full bg-white">{children}</div>
				</Providers>
			</body>
		</html>
	)
}
