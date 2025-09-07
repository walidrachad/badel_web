import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { BottomNavigation } from '~/components/bottom-navigation'
import { GiftCardsList } from '~/components/cards-list'
import { NavigationHeader } from '~/components/navigation-header'
import { RecentActivities } from '~/components/recent-activities'

import { getChargePageItems } from '~/lib/api/charge'

export const Route = createFileRoute('/')({
	component: Homepage,
})

function Homepage() {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ['todos'],
		queryFn: getChargePageItems,
	})

	if (isLoading) return <Loading />

	if (isError) return <Error refetch={refetch} />

	return (
		<div className="grid pb-20">
			<NavigationHeader title="Marketplace" />
			<RecentActivities />
			<GiftCardsList data={data} />
			<BottomNavigation />
		</div>
	)
}

function Loading() {
	return (
		<div className="mx-auto flex w-full max-w-xl items-center justify-center py-20">
			<div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
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
