import { useMemo, useState } from 'react'
import { GiftCard } from '~/types/charge'

type Props = {
	giftcards: GiftCard[]
	onChange?: (gc: GiftCard | null) => void
	/** If true, sorts by numeric value extracted from `output` (default true) */
	sortByOutputValue?: boolean
}

export default function GiftcardGrid({
	giftcards,
	onChange,
	sortByOutputValue = true,
}: Props) {
	const [selectedId, setSelectedId] = useState<number | null>(null)

	const items = useMemo(() => {
		const arr = [...(giftcards ?? [])]
		if (!sortByOutputValue) return arr
		const num = (s?: string | null) =>
			Number(String(s ?? '').replace(/[^\d.]/g, '')) || 0
		return arr.sort((a, b) => num(a.output) - num(b.output))
	}, [giftcards, sortByOutputValue])

	function select(id: number) {
		setSelectedId(id)
		onChange?.(items.find((g) => g.id === id) ?? null)
	}

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{items.map((g) => {
				const selected = g.id === selectedId
				const disabled = g.in_stock === 0

				const priceNum = Number(g.amount_after_fee ?? g.amount ?? 0)
				const priceText = priceNum
					? `${priceNum.toLocaleString('fr-FR')} MRU`
					: ''

				return (
					<button
						key={g.id}
						type="button"
						disabled={disabled}
						aria-pressed={selected}
						onClick={() => select(g.id)}
						className={[
							'relative flex flex-col items-center justify-center rounded-[12px] px-3 py-2 text-center transition',
							'shadow-sm',
							disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-accent/40',
							selected
								? 'border-2 border-[#CF4F00] bg-[#FFEADF]'
								: 'border border-gray-300 bg-white dark:bg-transparent',
						].join(' ')}
					>
						<div className="font-semibold tracking-tight">
							<h3>{g.output ?? '-'}</h3>
						</div>
						<div className="text-muted-foreground mt-1 text-xs">
							<p>{priceText}</p>
						</div>

						{selected && (
							<span className="pointer-events-none absolute -top-[-8px] -right-[-8px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#CF4F00]">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none">
									<path
										d="M6 12l4 4 8-8"
										stroke="#fff"
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						)}
					</button>
				)
			})}
		</div>
	)
}
