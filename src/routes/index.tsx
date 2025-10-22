import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { chargesQueryOptions } from '~/api/charge'
import { BottomNavigation } from '~/components/bottom-navigation'
import { GiftCardsList } from '~/components/gift-cards-list'
import { NavigationHeader } from '~/components/navigation-header'
import { RecentActivities } from '~/components/recent-activities'
import logger from '~/lib/logger'

export const Route = createFileRoute('/')({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(chargesQueryOptions)
	},
	head: () => ({
		meta: [{ title: 'Charges | Bedel Charges' }],
	}),
	component: Homepage,
})

function Homepage() {
	const {
		data: posts,
		isError,
		refetch,
	} = useSuspenseQuery(chargesQueryOptions)

	logger.log({ posts })

	if (isError) return <Error refetch={refetch} />

	return (
		<div className="grid pb-20">
			<NavigationHeader title="Marketplace" />
			<RecentActivities />
			<GiftCardsList data={posts} />
			<BottomNavigation />
		</div>
	)
}

function Error({ refetch }: { refetch: () => void }) {
	return (
		<div className="p-6">
			<p className="text-red-600">Failed to load.</p>
			<button
				onClick={() => refetch()}
				className="mt-2 rounded border px-3 py-1"
			>
				Retry
			</button>
		</div>
	)
}
