import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { NotFound } from '~/components/not-found'

import * as TanstackQuery from './integrations/root-provider'
import { routeTree } from './routeTree.gen'

export function createRouter() {
	const rqContext = TanstackQuery.getContext()

	const router = createTanStackRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: 'intent',
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		scrollRestoration: true,
	})

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	})

	return router
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
