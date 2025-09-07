// TODO - translate content

import { AnimatePresence, motion } from 'motion/react'

import { Skeleton } from './ui/skeleton'

export default function RecentActivities() {
	return (
		<section className="container space-y-3 py-4">
			<h2 className="text-paragraph-small">Recent activities</h2>

			<AnimatePresence initial={false} mode="wait">
				<div className="grid grid-cols-5 gap-4">
					{activities.map((activity) => (
						<div key={activity.id} className="space-y-3">
							<img
								src={activity.src}
								alt={activity.name}
								className="aspect-square w-full rounded-full object-contain"
							/>

							<p className="text-label-small line-clamp-2 text-center">
								{activity.name}
							</p>
						</div>
					))}

					{[...Array(activities.length < 5 ? 5 - activities.length : 0)].map(
						(_, i) => (
							<div key={i} className="space-y-2">
								<div className="bg-muted aspect-square w-full rounded-full" />
								<div className="bg-muted h-4 w-11/12 rounded-full" />
							</div>
						),
					)}
				</div>
			</AnimatePresence>
		</section>
	)
}

// function RecentActivitiesLoading() {
// 	return [...Array(5)].map((_, i) => (
// 		<motion.div
// 			key={i}
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			className="space-y-2"
// 		>
// 			<Skeleton className="aspect-square w-full rounded-full" />
// 			<Skeleton className="h-4 w-11/12 rounded-full" />
// 		</motion.div>
// 	))
// }

type Activity = {
	id: number
	name: string
	src: string
}

const activities: Activity[] = [
	{
		id: 1,
		name: 'Apple Charge',
		src: '/gift-cards-images/apple/apple_thumbnail_square.jpg',
	},
	{
		id: 2,
		name: 'Netflix Subscription',
		src: '/gift-cards-images/netflix/netflix_thumbnail_square.jpg',
	},
]
