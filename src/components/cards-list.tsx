import CategoryTile from '~/components/category-title'
import SeeMoreCard from '~/components/see-more-card'

import { CategoryOrGroup } from '~/lib/types'

export function GiftCardsList({ data }: { data?: CategoryOrGroup[] }) {
	if (!data) return null

	return (
		<div className="mx-auto w-full max-w-xl space-y-6 p-4 pt-12">
			{/* Hero / Apple card */}
			{data.map((item) =>
				item.type === 'group' ? (
					<Section key={item.id} title={item.name}>
						<div className="grid grid-cols-2 gap-4">
							{item.categories.map((cat) => (
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
