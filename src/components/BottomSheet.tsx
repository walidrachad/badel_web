'use client'

export default function BottomSheet({
	title,
	setSheetOpen,
	sheetOpen,
}: {
	title: string | null
	setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
	sheetOpen: boolean
}) {
	return (
		<>
			{/* Bottom sheet (iOS style) */}
			<div
				className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
					sheetOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
				onClick={() => setSheetOpen(false)}
			/>
			<div
				className={`fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] transform-gpu overflow-y-auto rounded-t-3xl border-t bg-white shadow-[0_-16px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-300 dark:bg-neutral-950 dark:ring-white/10 ${
					sheetOpen ? 'translate-y-0' : 'translate-y-full'
				}`}
				role="dialog"
				aria-modal="true"
			>
				<div className="bg-muted mx-auto mt-2 h-1.5 w-10 rounded-full" />
				<div className="p-5 sm:p-6">
					<div className="mb-3 flex items-start justify-between">
						<h2 className="text-2xl font-semibold">Clarification</h2>
						<button
							className="hover:bg-muted rounded-full p-1"
							onClick={() => setSheetOpen(false)}
							aria-label="Close"
						>
							<svg viewBox="0 0 24 24" width="20" height="20">
								<path
									d="M6 6l12 12M18 6L6 18"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>
					<div className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-600">
						<svg
							viewBox="0 0 24 24"
							width="18"
							height="18"
							className="shrink-0"
						>
							<path
								d="M12 2l10 18H2L12 2z"
								fill="currentColor"
								opacity="0.15"
							/>
							<path
								d="M12 8v5m0 3h.01"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
						<span>Caution when choosing a region</span>
					</div>
					<div className="text-foreground space-y-4 text-sm leading-relaxed">
						<p>{title ?? '—'}</p>
					</div>
					<div className="mt-6">
						<button
							className="hover:bg-accent/40 w-full rounded-2xl border px-4 py-3 text-center text-base font-semibold"
							onClick={() => setSheetOpen(false)}
						>
							Okay
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
