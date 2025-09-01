'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import AppBar from '~/components/mobile/app_bar/AppBar'
import { useSavedPhone } from '~/hooks/useSavedPhone'

import OtpInput from './-components/otp-input'
import PaymentFlowRow from './-components/payment-flow-row'

export default function BankilyPaymentPage() {
	const { selected } = useSavedPhone()
	const sp = useSearchParams()

	// values جايين من route
	const profile_picture = sp.get('profile_picture') // bank.profile_picture
	const name = sp.get('name') // bank.name
	const send_account = sp.get('send_account') // bank.send_account
	const price = sp.get('price') // باش نحتافظو بثمن العملية
	const [copied, setCopied] = useState(false) // snackbar state

	const [code, setCode] = useState('')
	const [error, setError] = useState('')

	const allFilled = code.length === 4

	// function copy to clipboard
	const handleCopy = async () => {
		if (send_account) {
			await navigator.clipboard.writeText(send_account)
			setCopied(true)
			setTimeout(() => setCopied(false), 2500) // hide after 2.5s
		}
	}

	return (
		<div className="w-full pt-12">
			{/* Header */}
			<div className="px-4 pt-4">
				<AppBar title="Bankily payment"></AppBar>
			</div>
			<p className="text-muted-foreground px-4 text-sm">
				Open Bankily, choose b-pay and enter the information below
			</p>

			{/* App + tabs preview */}
			<div className="bg-card mt-4 border p-4">
				<div className="mx-auto max-w-2xl">
					<PaymentFlowRow
						appImage={
							profile_picture
								? `https://staging.bedelportal.com/${profile_picture}`
								: '/images/demo/fallback.png'
						}
						appLabel={name ?? 'Bankily'}
						flowImage="/images/demo/bankily.png"
						highlight
					/>
				</div>

				{/* B-Pay card */}
				<div className="mt-4 overflow-hidden rounded-2xl border bg-white pb-4 shadow-sm">
					<div className="bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-white">
						B-Pay
					</div>

					<div className="space-y-4 p-4">
						<div className="space-y-1">
							<div className="text-muted-foreground text-sm">Merchant code</div>
							<div className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
								<div className="truncate text-base font-semibold">
									{send_account ?? 'N/A'}
								</div>
								<button
									onClick={handleCopy}
									className="inline-flex items-center gap-1 rounded-lg bg-[#F0F0F3] px-3 py-1.5 text-xs"
								>
									<svg viewBox="0 0 24 24" width="14" height="14">
										<rect
											x="9"
											y="9"
											width="10"
											height="10"
											rx="2"
											stroke="currentColor"
											fill="none"
										/>
										<rect
											x="5"
											y="5"
											width="10"
											height="10"
											rx="2"
											stroke="currentColor"
											fill="none"
										/>
									</svg>
									Copy
								</button>
							</div>
						</div>

						<div className="grid grid-cols-[1fr_auto] items-end gap-2">
							<div className="space-y-1">
								<div className="text-muted-foreground text-sm">Amount</div>
								<div className="rounded-xl border px-3 py-2 text-lg font-semibold">
									{price ?? '0.00'}
								</div>
							</div>
							<div className="text-muted-foreground pb-2 text-sm font-medium">
								MRU
							</div>
						</div>
					</div>
				</div>

				<br />
				<div className="bg-background rounded-xl border p-3 shadow-lg">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-sm font-medium">
							<h3>رقم هاتف بنكلي</h3>
							<svg
								viewBox="0 0 24 24"
								width="16"
								height="16"
								className="text-amber-600"
							>
								<path
									d="M12 2l10 18H2L12 2z"
									fill="currentColor"
									opacity=".15"
								/>
								<path
									d="M12 8v5m0 3h.01"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									className="text-amber-600"
								/>
							</svg>
						</div>
						<div className="text-xl font-semibold tracking-wide">
							{selected?.label}
						</div>
					</div>
					<p className="text-muted-foreground mt-2 text-[13px] leading-5">
						يجب عليك استخدام هذا رقم في دفع أو انقر هنا لتغييره
					</p>
				</div>
			</div>

			<div className="mt-6 space-y-3 px-4">
				<p className="text-sm">
					After paying using B-Pay, enter transaction code below
				</p>
				<OtpInput
					length={4}
					error={error}
					onChange={(c) => {
						setCode(c)
						if (error) setError('')
					}}
					onComplete={() => {
						// validate async
					}}
				/>
			</div>

			{/* spacer */}
			<div className="h-28" />

			{/* Sticky confirm button */}
			<div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
				<div className="mx-auto w-full max-w-xl p-4">
					<button
						disabled={!allFilled}
						onClick={() => {
							if (code !== '1234') {
								setError(`The code you've entered is invalid`)
								return
							}
							// proceed...
						}}
						className={[
							'w-full rounded-2xl px-4 py-3 font-semibold text-white',
							allFilled
								? 'bg-[#CC4B00] hover:opacity-95'
								: 'cursor-not-allowed bg-gray-200 text-gray-500',
						].join(' ')}
					>
						Confirm payment
					</button>
				</div>
			</div>
			{copied && (
				<div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-black px-4 py-2 text-sm text-white shadow-lg">
					Copied to clipboard
				</div>
			)}
		</div>
	)
}
