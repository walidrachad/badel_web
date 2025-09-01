import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { Category } from '~/lib/api/charge'

export default function SeeMoreCard({
	to = '/charges/gaming',
	groupId,
	categories,
}: {
	to?: string
	groupId: string
	categories: Category[]
}) {
	const qc = useQueryClient()
	const navigate = useNavigate()

	function go() {
		qc.setQueryData<Category[]>(['groupCategories', groupId], categories)

		navigate({
			to: '/charges/$name',
			params: { name: 'gaming' },
			search: { groupId },
		})
	}

	return (
		<button onClick={go} className="hover:bg-accent/30 block w-full">
			<div className="flex aspect-[16/10] items-center justify-center rounded-2xl border bg-[#F0F0F3]">
				<div className="text-muted-foreground flex items-center gap-2 text-sm">
					<span>See more</span>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						className="text-foreground"
					>
						<path
							d="M9 6l6 6-6 6"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</div>
		</button>
	)
}
