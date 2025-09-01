import { createFileRoute, Link } from '@tanstack/react-router'

import { ORDERS, OrderStatus } from './-mock'

export const Route = createFileRoute('/orders/$id')({
	component: OrderDetail,
})

function OrderDetail() {
	const params = Route.useParams()
	const order = ORDERS.find((o) => o.id === params.id)

	if (!order) {
		return (
			<div className="mx-auto w-full max-w-xl p-4">
				<p>Order not found.</p>
				<Link to="/orders" className="mt-3 inline-block underline">
					Back to orders
				</Link>
			</div>
		)
	}

	const ui = statusUI(order.status)

	return (
		<div className="mx-auto w-full max-w-xl">
			{/* Top colored header */}
			<div className={`${ui.header} sticky top-0 z-10 px-4 py-3 text-white`}>
				<div className="mx-auto flex max-w-xl items-center justify-between">
					<Link
						to="/orders"
						className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"
					>
						<svg
							viewBox="0 0 24 24"
							width="16"
							height="16"
							className="text-white"
						>
							<path
								d="M15 6l-6 6 6 6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
					<h1 className="text-base font-semibold">{ui.title}</h1>
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
						<svg
							viewBox="0 0 24 24"
							width="16"
							height="16"
							className="text-white/90"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<circle cx="12" cy="8" r="1.2" fill="currentColor" />
							<path d="M11.2 11.5h1.6v5h-1.6z" fill="currentColor" />
						</svg>
					</div>
				</div>

				{/* Stepper */}
				<div className="mx-auto mt-3 flex max-w-xl items-center justify-center gap-6 pb-1">
					<Step icon="paid" label="Paid" active />
					<StepConnector active />
					<Step
						icon="pending"
						label="Pending"
						active={order.status !== OrderStatus.Canceled}
						current={order.status === OrderStatus.Pending}
					/>
					<StepConnector active={order.status !== OrderStatus.Pending} />
					{order.status === OrderStatus.Canceled ? (
						<Step icon="canceled" label="Canceled" active />
					) : (
						<Step
							icon="completed"
							label="Completed"
							active={order.status === OrderStatus.Completed}
						/>
					)}
				</div>
			</div>

			{/* Body */}
			<div className="p-4 sm:p-6">
				{/* Product row */}
				<div className="flex items-center gap-3">
					<AppleCardThumb />
					<div className="min-w-0">
						<div className="truncate text-[15px] font-semibold">
							Apple Gift Card
						</div>
						<div className="text-muted-foreground text-sm">USA • $100</div>
					</div>
				</div>

				{/* Card code */}
				<div className="bg-card mt-4 rounded-2xl border p-3">
					<div className="flex items-center justify-between gap-3">
						<div className="text-muted-foreground text-sm">Card code</div>
						<CopyButton disabled={order.status !== OrderStatus.Completed} />
					</div>

					<div className="mt-2">
						{order.status === OrderStatus.Pending && (
							<div className="bg-muted text-muted-foreground rounded-xl px-3 py-3 text-sm">
								Awaiting approval
							</div>
						)}
						{order.status === OrderStatus.Canceled && (
							<div className="bg-muted text-muted-foreground rounded-xl px-3 py-3 text-sm">
								••••••••••••••••••••
							</div>
						)}
						{order.status === OrderStatus.Completed && (
							<div className="rounded-xl border px-3 py-3 font-mono text-sm">
								WLGIQU…RBT24
							</div>
						)}
					</div>
				</div>

				{/* Payment method table */}
				<div className="mt-4 overflow-hidden rounded-2xl border">
					<TableRow label="Subtotal" value="4 800 MRU" />
					<TableRow label="Transaction ID" value="9R2B347G" />
					<TableRow label="Payment method" value="Bankily" />
					<TableRow strong label="Total paid" value="4 800 MRU" />
				</div>

				<div className="h-28" />
			</div>

			{/* Sticky actions */}
			<div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t px-4 pt-3 pb-6 backdrop-blur">
				<div className="mx-auto w-full max-w-xl space-y-3">
					{order.status === OrderStatus.Completed && (
						<button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c44a06] px-4 py-3 text-base font-semibold text-white">
							Charge instructions
							<svg width="18" height="18" viewBox="0 0 24 24">
								<path
									d="M9 6l6 6-6 6"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					)}
					<button className="hover:bg-accent/40 w-full rounded-2xl border px-4 py-3 text-base font-semibold">
						Some other action
					</button>
				</div>
			</div>
		</div>
	)
}

/* ================= helpers ================= */

function statusUI(status: OrderStatus) {
	switch (status) {
		case OrderStatus.Pending:
			return { header: 'bg-neutral-600', title: 'Order pending' }
		case OrderStatus.Canceled:
			return { header: 'bg-rose-600', title: 'Order canceled' }
		case OrderStatus.Completed:
			return { header: 'bg-emerald-600', title: 'Order completed' }
	}
}

function Step({
	icon,
	label,
	active,
	current,
}: {
	icon: 'paid' | 'pending' | 'completed' | 'canceled'
	label: string
	active?: boolean
	current?: boolean
}) {
	const base = 'flex h-8 w-8 items-center justify-center rounded-full border'
	const cls = active
		? current
			? `${base} border-white bg-white/20 text-white`
			: `${base} border-white/70 text-white`
		: `${base} border-white/40 text-white/60`
	const glyph =
		icon === 'paid' ? (
			<svg width="16" height="16" viewBox="0 0 24 24">
				<path
					d="M4 7h16M4 12h10M4 17h7"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		) : icon === 'pending' ? (
			<svg width="16" height="16" viewBox="0 0 24 24">
				<circle
					cx="12"
					cy="12"
					r="9"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M12 7v5l3 3"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		) : icon === 'completed' ? (
			<svg width="16" height="16" viewBox="0 0 24 24">
				<path
					d="M5 13l4 4L19 7"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		) : (
			<svg width="16" height="16" viewBox="0 0 24 24">
				<path
					d="M6 6l12 12M18 6L6 18"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		)
	return (
		<div className="flex flex-col items-center gap-1">
			<div className={cls}>{glyph}</div>
			<div className="text-[11px] text-white/90">{label}</div>
		</div>
	)
}

function StepConnector({ active }: { active?: boolean }) {
	return (
		<div className={`h-[2px] w-10 ${active ? 'bg-white/80' : 'bg-white/40'}`} />
	)
}

function AppleCardThumb() {
	return (
		<div
			className="h-16 w-28 shrink-0 rounded-2xl p-2"
			style={{ background: 'linear-gradient(135deg,#0a84ff 0%,#0041c4 100%)' }}
		>
			<div className="relative h-full w-full rounded-xl">
				<div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95" />
				<div className="absolute inset-x-2 bottom-1 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] shadow-sm">
					<span>🎵</span>
					<span>🤖</span>
					<span>☁️</span>
					<span>👻</span>
				</div>
			</div>
		</div>
	)
}

function CopyButton({ disabled }: { disabled?: boolean }) {
	return (
		<button
			className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs ${
				disabled
					? 'bg-muted text-muted-foreground cursor-not-allowed'
					: 'bg-muted hover:bg-muted/70'
			}`}
			disabled={disabled}
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
	)
}

function TableRow({
	label,
	value,
	strong,
}: {
	label: string
	value: string
	strong?: boolean
}) {
	return (
		<div className="flex items-center justify-between border-b px-4 py-3 last:border-b-0">
			<div
				className={`text-sm ${strong ? 'font-semibold' : 'text-muted-foreground'}`}
			>
				{label}
			</div>
			<div className={`text-sm ${strong ? 'font-semibold' : ''}`}>{value}</div>
		</div>
	)
}
