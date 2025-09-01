type Props = {
	appImage: string // مثال: "/images/bankily.png"
	appLabel?: string // مثال: "Bankily"
	flowImage: string // مثال: "/images/bankily-flow.png" (صورة الخيارات كاملة)
	highlight?: boolean // يضيف إطار حول الصورة ديال اليمين
	className?: string
}

export default function PaymentFlowRow({
	appImage,
	appLabel = 'Bankily',
	flowImage,
	className = '',
}: Props) {
	return (
		<div
			className={[
				'w-full p-3 sm:p-4',
				'flex items-center gap-4 sm:gap-6',
				className,
			].join(' ')}
		>
			{/* Left: app card */}
			<div className="flex w-[84px] flex-col items-center">
				<div className="relative aspect-[1/1.05] w-full overflow-hidden rounded-xl shadow">
					<img
						src={appImage}
						alt={appLabel}
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="mt-1.5 text-xs font-medium text-gray-800">
					{appLabel}
				</div>
			</div>

			{/* Arrow */}
			<div className="hidden shrink-0 sm:block">
				<svg
					width="28"
					height="28"
					viewBox="0 0 24 24"
					className="text-gray-700"
				>
					<path
						d="M8 5l8 7-8 7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<div className="shrink-0 sm:hidden">
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					className="text-gray-700"
				>
					<path
						d="M8 5l8 7-8 7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>

			{/* Right: whole flow image (one image) */}
			<div>
				<div className="relative w-full">
					<img src={flowImage} alt="Payment flow" className="" />
				</div>
			</div>
		</div>
	)
}
