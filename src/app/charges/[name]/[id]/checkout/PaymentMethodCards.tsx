'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Bank = {
	id: number
	Sb_name: string
	profile_picture: string | null
	prefix: string
	send_account: string
}

type ApiResp = {
	status: boolean
	message?: string
	data: Bank[]
}

const BASE_URL = 'https://staging.bedelportal.com' // ⬅️ adjust if needed
const fullUrl = (p?: string | null) =>
	p ? new URL(p, BASE_URL).toString() : '/images/demo/fallback.png'

export default function PaymentMethodCards({
	onChange,
	className = '',
}: {
	onChange?: (bank: Bank | null) => void
	className?: string
}) {
	const [banks, setBanks] = useState<Bank[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedId, setSelectedId] = useState<number | null>(null)

	// fetch banks
	useEffect(() => {
		let alive = true
		async function run() {
			setLoading(true)
			setError(null)
			try {
				const res = await fetch(`${BASE_URL}/api/v1/gift-cards/listsbank`, {
					cache: 'no-store',
				})
				const json = (await res.json()) as ApiResp
				if (!alive) return

				if (!res.ok || !json.status) {
					throw new Error(json.message || `HTTP ${res.status}`)
				}
				const list = Array.isArray(json.data) ? json.data : []
				setBanks(list)
				// default select first
				if (list.length && selectedId == null) {
					setSelectedId(list[0].id)
					onChange?.(list[0])
				}
			} catch (err: unknown) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to load payment methods.',
				)
			} finally {
				if (alive) setLoading(false)
			}
		}
		run()
		return () => {
			alive = false
		}
	}, [onChange, selectedId])

	// const selected = useMemo(
	// 	() => banks.find((b) => b.id === selectedId) ?? null,
	// 	[banks, selectedId],
	// )

	if (loading) {
		return (
			<section className={`mt-6 space-y-3 pb-4 ${className}`}>
				<h2 className="text-lg font-semibold">Payment method</h2>
				<div className="flex justify-center py-6">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section className={`mt-6 space-y-3 pb-4 ${className}`}>
				<h2 className="text-lg font-semibold">Payment method</h2>
				<div className="rounded-lg border p-3 text-sm text-red-600">
					{error}
				</div>
			</section>
		)
	}

	return (
		<section className={`mt-6 space-y-3 pb-4 ${className}`}>
			<h2 className="text-lg font-semibold">Payment method</h2>

			{banks.length === 0 ? (
				<div className="text-muted-foreground rounded-lg border p-3 text-sm">
					No payment methods available.
				</div>
			) : (
				<div className="grid grid-cols-3 gap-3">
					{banks.map((b) => (
						<PaymentMethodCard
							key={b.id}
							name={prettyName(b.Sb_name)}
							logo={
								<Image
									src={fullUrl(b.profile_picture)}
									alt={b.Sb_name}
									className="h-8 w-auto object-contain"
								/>
							}
							selected={b.id === selectedId}
							onClick={() => {
								setSelectedId(b.id)
								onChange?.(b)
							}}
						/>
					))}
				</div>
			)}
		</section>
	)
}

function prettyName(s: string) {
	// simple prettifier: "bankily" -> "Bankily"
	if (!s) return s
	return s.charAt(0).toUpperCase() + s.slice(1)
}

function PaymentMethodCard({
	logo,
	name,
	selected,
	onClick,
}: {
	logo: React.ReactNode
	name: string
	selected?: boolean
	onClick?: () => void
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={[
				'relative rounded-2xl border-2 p-3 text-center transition',
				selected ? 'border-[#1C2024]' : 'opacity-100',
			].join(' ')}
			aria-pressed={selected}
		>
			{/* check badge when selected */}
			{selected && (
				<div className="bg-foreground text-background absolute top-2 right-2 flex h-3 w-3 items-center justify-center rounded-full text-[10px]">
					✓
				</div>
			)}
			<div className="bg-background mb-2 flex h-14 items-center justify-center overflow-hidden rounded-lg">
				{logo}
			</div>
			<div className="text-foreground text-xs">{name}</div>
		</button>
	)
}
