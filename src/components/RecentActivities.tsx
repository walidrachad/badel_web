type Activity = {
	id: string
	name: string
	icon: string // image URL
}

const activities: Activity[] = [
	{
		id: '1',
		name: 'Apple Charge',
		icon: '/images/demo/apple.png', // your apple logo path
	},
	{
		id: '2',
		name: 'Netflix Subscription',
		icon: '/images/demo/netflix.png', // your netflix logo path
	},
	{
		id: '2',
		name: 'Netflix Subscription',
		icon: '/images/demo/netflix.png', // your netflix logo path
	},
]

export default function RecentActivities() {
	return (
		<section className="mt-6 space-y-3">
			<h2 className="text-base font-semibold">Recent activities</h2>

			<div className="flex items-start gap-6 overflow-x-auto pb-2">
				{activities.map((a) => (
					<div key={a.id} className="flex w-16 flex-col items-center gap-2">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 shadow-sm">
							<img
								src={a.icon}
								alt={a.name}
								className="h-8 w-8 object-contain"
							/>
						</div>
						<p className="w-full truncate text-center text-xs leading-tight font-medium text-black">
							{a.name}
						</p>
					</div>
				))}

				{/* placeholders */}
				{[...Array(2)].map((_, i) => (
					<div
						key={`placeholder-${i}`}
						className="flex w-16 flex-col items-center gap-2"
					>
						<div className="h-16 w-16 rounded-full bg-gray-50" />
						<div className="h-2 w-12 rounded-full bg-gray-100" />
					</div>
				))}
			</div>
		</section>
	)
}
