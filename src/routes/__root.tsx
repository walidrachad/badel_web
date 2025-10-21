import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import * as React from 'react'

import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { NotFound } from '~/components/not-found'
import TanStackQueryDevtools from '~/integrations/devtools'
import { seo } from '~/lib/seo'

import globalCss from './globals.css?url'

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title: 'Bedel Charge',
				description: '',
			}),
		],
		links: [
			{ rel: 'stylesheet', href: globalCss },
			{ rel: 'preconnect', href: 'https://rsms.me/' },
			{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		)
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: 'bottom-left',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
