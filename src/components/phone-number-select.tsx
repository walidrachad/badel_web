import { useEffect, useMemo, useRef, useState } from 'react'
import {
	getSavedPhones,
	setSavedPhones,
	setSelectedPhoneId,
	type PhoneItem,
} from '~/lib/phone-storage'

type Item = { id: string; label: string }

function labelToId(label: string) {
	return label.replace(/\s+/g, '')
}
function uniqById(arr: Item[]) {
	const map = new Map<string, Item>()
	for (const it of arr) map.set(it.id, it)
	return Array.from(map.values())
}

export default function PhoneNumberSelect({
	label = 'Bankily phone number',
	items,
	value,
	onChange,
	onAddNew,
	className = '',
	persistSelection = true, // NEW: save selected id automatically
}: {
	label?: string
	items: Item[]
	value?: string | null // selected id (controlled allowed)
	onChange?: (id: string) => void
	onAddNew?: () => void
	className?: string
	persistSelection?: boolean
}) {
	const [open, setOpen] = useState(false)
	const btnRef = useRef<HTMLButtonElement | null>(null)
	const popRef = useRef<HTMLDivElement | null>(null)

	// load phones (merge props + localStorage)
	const [localItems, setLocalItems] = useState<Item[]>([])
	useEffect(() => {
		const ls = getSavedPhones()
		setLocalItems(uniqById([...ls, ...items]))
	}, [items])

	// save to localStorage when list changes
	useEffect(() => {
		if (localItems.length) setSavedPhones(localItems as PhoneItem[])
	}, [localItems])

	// selected item
	const selected = useMemo(
		() => localItems.find((i) => i.id === value) ?? null,
		[localItems, value],
	)

	// close on outside click / escape
	useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!open) return
			const t = e.target as Node
			if (!btnRef.current?.contains(t) && !popRef.current?.contains(t)) {
				setOpen(false)
			}
		}
		function onEsc(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('mousedown', onDocClick)
		document.addEventListener('keydown', onEsc)
		return () => {
			document.removeEventListener('mousedown', onDocClick)
			document.removeEventListener('keydown', onEsc)
		}
	}, [open])

	function selectAndPersist(id: string) {
		onChange?.(id)
		if (persistSelection) setSelectedPhoneId(id) // 🔐 save selected id
		setOpen(false)
	}

	function handleAdd() {
		const raw = prompt('Enter a new Bankily phone number (e.g. 33 22 33 01):')
		if (!raw) {
			setOpen(false)
			return
		}
		const label = raw.trim()
		if (!label) {
			setOpen(false)
			return
		}
		const id = labelToId(label)
		const exists = localItems.find((i) => i.id === id)
		if (exists) {
			selectAndPersist(exists.id)
			onAddNew?.()
			return
		}
		const next = uniqById([...localItems, { id, label }])
		setLocalItems(next)
		selectAndPersist(id)
		onAddNew?.()
	}

	return (
		<div className={className}>
			<label className="mb-2 block text-sm font-bold text-[#000]">
				{label}
			</label>

			{/* trigger */}
			<button
				ref={btnRef}
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((o) => !o)}
				className={[
					'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left',
					'transition focus-visible:outline-none',
					open ? 'border-2 border-[#000]' : 'border border-gray-300',
				].join(' ')}
			>
				<span className="truncate">{selected?.label ?? 'Select a phone'}</span>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					className={`transition ${open ? 'rotate-180' : ''}`}
				>
					<path
						d="M6 9l6 6 6-6"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</button>

			{/* popover */}
			{open && (
				<div ref={popRef} role="listbox" className="relative z-50">
					<div className="mt-2 w-full rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
						{/* numbers */}
						<ul className="max-h-64 overflow-auto py-1">
							{localItems.map((item) => {
								const isSel = item.id === value
								return (
									<li key={item.id}>
										<button
											type="button"
											role="option"
											aria-selected={isSel}
											onClick={() => selectAndPersist(item.id)}
											className="flex w-full items-center justify-between px-4 py-3 text-left text-[#000] hover:bg-black/[0.03]"
										>
											<span className="truncate">{item.label}</span>
											{isSel && (
												<svg
													width="18"
													height="18"
													viewBox="0 0 24 24"
													className="text-black"
												>
													<path
														d="M6 12l4 4 8-8"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											)}
										</button>
									</li>
								)
							})}
						</ul>

						{/* divider */}
						<div className="h-px w-full bg-black/5" />

						{/* add new */}
						<button
							type="button"
							onClick={handleAdd}
							className="flex w-full items-center justify-between px-4 py-3 font-semibold text-[#000] hover:bg-black/[0.03]"
						>
							<span>Add new phone number</span>
							<svg width="18" height="18" viewBox="0 0 24 24">
								<path
									d="M12 5v14M5 12h14"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
