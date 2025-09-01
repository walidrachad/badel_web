'use client'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import CategoryTile from '~/components/category-title'
import BottomActionBar from '~/components/bottom-action-bar'
import SeeMoreCard from '~/components/see-more-card'
import { Category, getChargePageItems, GroupItem } from '~/lib/api/charge'

import RecentActivities from '../components/recent-activities'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ['todos'],
		queryFn: getChargePageItems,
	})
	const todos = (data ?? []) as GroupItem[]
	const ordered = [...todos].sort(
		(a, b) => (a.order ?? 9999) - (b.order ?? 9999),
	)

	if (isLoading)
		return (
			<div className="mx-auto flex w-full max-w-xl items-center justify-center py-20">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
			</div>
		)
	if (isError)
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

	return (
		<>
			<div className="fixed inset-x-0 top-0 z-40 bg-white/90 pt-3 backdrop-blur">
				<div className="flex h-12 items-center justify-between">
					<h1 className="flex-1 px-2 text-center text-xl font-semibold tracking-tight">
						Marketplace
					</h1>
				</div>
			</div>
			<div className="mx-auto w-full max-w-xl space-y-6 p-4 pt-12">
				{/* Hero / Apple card */}
				<RecentActivities />
				{ordered.map((item) =>
					'type' in item && item.type === 'group' ? (
						<Section key={item.id} title={item.name}>
							<div className="grid grid-cols-2 gap-4">
								{item.categories.map((cat: Category) => (
									<CategoryTile cat={cat} key={cat.id}>
										<ImageCard
											key={cat.id}
											bg={`url('https://staging.bedelportal.com/${
												cat.image_path
											}')`}
											title=""
										/>
									</CategoryTile>
								))}
								<SeeMoreCard groupId={item.name} categories={item.categories} />
							</div>
						</Section>
					) : (
						<CategoryTile cat={item} key={item.id}>
							<div
								className="rounded-2xl border bg-[length:100%_100%] p-4 sm:p-6"
								style={{
									backgroundImage: `url('https://staging.bedelportal.com/${
										item.image_path
									}')`,
								}}
							>
								<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl p-5 sm:p-7">
									<div className="absolute inset-0 flex items-center justify-center"></div>
								</div>
							</div>
						</CategoryTile>
					),
				)}
			</div>
			<BottomActionBar
				homeHref="/"
				ordersHref="/orders"
				settingsHref="/settings"
			/>
		</>
	)
}

/* ---------- small design-only atoms ---------- */

function Section({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<section className="space-y-3">
			<h2 className="text-lg font-semibold">{title}</h2>
			{children}
		</section>
	)
}

function ImageCard({
	bg,
}: {
	title: string
	flag?: string
	badge?: string
	bg: string
}) {
	return (
		<div className="bg-muted/10 overflow-hidden rounded-2xl border shadow-sm">
			<div
				className="aspect-[16/10] w-full bg-cover bg-center"
				style={{ backgroundImage: bg }}
			/>
		</div>
	)
}
