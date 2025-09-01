import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { z } from 'zod'

import AppBar from '~/components/app-bar'
import PhoneNumberSelect from '~/components/phone-number-select'
import { getSelectedPhoneId } from '~/lib/phone-storage'

import PaymentMethodCards from './-payment-method-cards'

type Bank = {
	id: number
	Sb_name: string
	profile_picture: string | null
	send_account?: string | null
}

const checkoutSearchSchema = z.object({
	gcId: z.number().catch(1),
	price: z.string().catch(''),
	name: z.string().catch(''),
	output: z.string().optional().nullable(),
	image: z.string().nullable(),
	catId: z.number(),
})

export const Route = createFileRoute('/checkout/')({
	validateSearch: (search) => checkoutSearchSchema.parse(search),
	component: Checkout,
})

function Checkout() {
	const [phoneId, setPhoneId] = useState<string | undefined>(undefined)
	const [selectedBank, setSelectedBank] = useState<Bank | null>(null)

	const { gcId, price, name, output, image } = Route.useSearch()

	useEffect(() => {
		const last = getSelectedPhoneId()
		if (last) setPhoneId(last)
	}, [])

	const navigate = useNavigate()

	return (
		<div className="mx-auto w-full max-w-xl space-y-6 p-4 pt-12">
			{/* Header */}
			<AppBar title="Confirm payment" />

			{/* Product summary row */}
			<div className="mb-4 flex items-center gap-3">
				<div
					className="h-24 w-40 shrink-0 rounded-2xl bg-[length:100%_100%] p-2"
					style={{
						backgroundImage: `url('https://staging.bedelportal.com/${image}')`,
					}}
				>
					<div className="relative h-full w-full rounded-xl bg-white/0"></div>
				</div>

				<div className="min-w-0">
					<h2 className="truncate text-base font-semibold">{name}</h2>
					<p className="text-muted-foreground text-sm">USA • {output}</p>
				</div>
			</div>

			{/* Summary */}
			<div className="bg-card text-card-foreground divide-y rounded-2xl border">
				<SummaryRow label="Subtotal" value={price + ' MRU'} />
				<SummaryRow label="Tax" value="0 MRU" />
				<SummaryRow labelStrong="Total" valueStrong={price + ' MRU'} />
			</div>

			{/* Payment method cards */}
			<PaymentMethodCards onChange={setSelectedBank} />

			{/* Phone select */}
			<PhoneNumberSelect
				items={[]}
				value={phoneId ?? undefined}
				onChange={setPhoneId}
			/>

			<div className="h-24" />

			{/* Sticky Pay button */}
			<div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
				<div className="mx-auto w-full max-w-xl p-4">
					<button
						disabled={!selectedBank}
						onClick={() => {
							if (!selectedBank) return
							navigate({
								to: `bankily?profile_picture=${selectedBank.profile_picture}&name=${selectedBank.Sb_name}&send_account=${selectedBank.send_account}&price=${price}&gcId=${gcId}`,
							})
						}}
						className={[
							'w-full rounded-2xl px-4 py-3 text-center text-base font-semibold shadow-sm transition',
							selectedBank
								? 'bg-[#c44a06] text-white hover:opacity-95'
								: 'cursor-not-allowed bg-gray-200 text-gray-400',
						].join(' ')}
					>
						{selectedBank ? `Pay • ${price} MRU` : 'Select a payment method'}
					</button>
				</div>
			</div>
		</div>
	)
}

function SummaryRow({
	label,
	value,
	labelStrong,
	valueStrong,
}: {
	label?: string
	value?: string
	labelStrong?: string
	valueStrong?: string
}) {
	return (
		<div className="flex items-center justify-between px-4 py-3">
			<div
				className={
					labelStrong
						? 'text-base font-semibold text-[#000]'
						: 'text-muted-foreground text-base'
				}
			>
				{labelStrong ?? label}
			</div>
			<div
				className={
					valueStrong
						? 'text-base font-semibold text-[#000]'
						: 'text-base text-[#000]'
				}
			>
				{valueStrong ?? value}
			</div>
		</div>
	)
}
