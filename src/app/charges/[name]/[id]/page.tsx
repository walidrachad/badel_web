// src/app/charges/category/[id]/page.tsx
'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { GlobeIcon } from '@/assets/icons'
import BottomSheet from '@/components/BottomSheet'
import { Select } from '@/components/FormElements/select'
import AppBar from '@/components/mobile/app_bar/AppBar'
import { getChargePageItems, GroupItem, type Category } from '@/lib/api/charge'
import {
	uniqueCountriesFromGiftcards,
	codeToFlagEmoji,
	codeToName,
} from '@/lib/country'

import GiftcardGrid, { GiftCard } from './GiftcardGrid'

const fullUrl = (p?: string | null) =>
	p ? new URL(p, 'https://staging.bedelportal.com/').toString() : null

function flattenCategories(items: GroupItem[]): Category[] {
	const out: Category[] = []
	for (const it of items) {
		if ('type' in it && it.type === 'group') out.push(...it.categories)
		else out.push(it as unknown as Category)
	}
	return out
}

export default function CategoryPage() {
	const params = useParams<{ id: string }>()
	const id = Number(params.id)
	const qc = useQueryClient()
	const [sheetOpen, setSheetOpen] = useState(false)
	const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
	const [selectedGC, setSelectedGC] = useState<GiftCard | null>(null)
	const pathname = usePathname()
	const router = useRouter()
	const cached = qc.getQueryData<Category>(['category', id])

	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ['category', id],
		queryFn: async () => {
			if (cached) return cached
			const items = await getChargePageItems()
			const cat = flattenCategories(items).find((c) => c.id === id)
			return cat ?? null
		},
		initialData: cached ?? null,
		staleTime: 60_000,
	})

	const cat = data as Category

	const filteredGiftcards = useMemo(() => {
		if (!selectedCountry) return cat.giftcards ?? []
		return (cat.giftcards ?? []).filter(
			(gc) => gc.country?.toUpperCase() === selectedCountry.toUpperCase(),
		)
	}, [cat.giftcards, selectedCountry])

	// UI guards
	if (isLoading)
		return (
			<div className="mx-auto flex w-full max-w-xl items-center justify-center py-20">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
			</div>
		)

	if (isError || !data)
		return (
			<div className="p-6">
				<p className="text-red-600">Category not found.</p>
				<button
					onClick={() => refetch()}
					className="mt-2 rounded border px-3 py-1"
				>
					Retry
				</button>
			</div>
		)

	const heroSrc =
		fullUrl(cat.small_image) ??
		fullUrl(cat.image_path) ??
		'/images/demo/fallback.png'
	// const giftcards = cat.giftcards ?? [];
	const countryCodes = uniqueCountriesFromGiftcards(cat.giftcards ?? [])
	const selectItems = countryCodes.map((code) => ({
		label: `${codeToFlagEmoji(code)} ${codeToName(code)}`, // e.g. "🇺🇸 United States"
		value: code, // "US"
	}))

	// const priceText = useMemo(() => {
	//   if (!selectedGC) return "";
	//   const num = Number(selectedGC.amount_after_fee ?? selectedGC.amount ?? 0);
	//   return num ? `${num.toLocaleString("fr-FR")} MRU` : "";
	// }, [selectedGC]);
	return (
		<div className="mx-auto w-full max-w-xl space-y-6 p-4 pt-16">
			<AppBar title={cat.name}>
				<CircleIcon>
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						className="text-foreground/70"
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
				</CircleIcon>
			</AppBar>
			{/* Hero banner from category image */}
			<div
				className="mt-2 rounded-3xl bg-[length:100%_100%] p-4 sm:p-5"
				style={{ backgroundImage: `url('${heroSrc}')` }}
			>
				<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl" />
			</div>
			{/* Description */}
			{(cat.description || cat.description_fr || cat.description_ar) && (
				<section className="mt-5 space-y-2">
					<h2 className="text-base font-semibold">{cat.name}</h2>
					<p className="text-muted-foreground text-sm">
						{cat.description ?? cat.description_fr ?? cat.description_ar}
					</p>
					{/* Learn more -> bottom sheet */}
					<button
						type="button"
						className="text-xs text-amber-600 hover:underline"
						onClick={() => setSheetOpen(true)}
					>
						Learn more
					</button>
				</section>
			)}
			<>
				{cat.type !== 'none' ? (
					<div className="relative">
						<Select
							label={
								cat.type === 'country'
									? 'Your account region'
									: 'Your account type'
							}
							items={selectItems}
							defaultValue={selectItems[0]?.value}
							prefixIcon={<GlobeIcon />}
							onValueChange={(val) => setSelectedCountry(val)}
						/>
					</div>
				) : (
					<div></div>
				)}
			</>
			{/* Giftcards grid (design-only) */}
			{/* <section className="mt-6 space-y-3">
        <h3 className="text-base font-semibold">Choose Card Value</h3>
        {filteredGiftcards.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No giftcards for this country.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filteredGiftcards.map((g) => (
              <button
                key={g.id}
                className="relative flex flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center hover:bg-accent/40"
              >
                <div className="text-base font-semibold">
                  {g.output || g.name}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {(g.amount_after_fee ?? g.amount)
                    ? `${Number(g.amount_after_fee ?? g.amount).toLocaleString("fr-FR")} MRU`
                    : ""}
                </div>
              </button>
            ))}
          </div>
        )}
      </section> */}
			<GiftcardGrid
				giftcards={filteredGiftcards ?? []}
				onChange={setSelectedGC}
			/>
			<div className="h-24" />
			{/* Sticky footer CTA */}
			<div className="bg-background/95 fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur">
				<div className="mx-auto flex w-full max-w-xl items-center gap-3 p-4">
					<button
						disabled={!selectedGC}
						onClick={() => {
							if (!selectedGC) return
							const price = selectedGC.amount_after_fee ?? selectedGC.amount
							router.push(
								`${pathname}/checkout?catId=${cat.id}&gcId=${selectedGC.id}&price=${price}&name=${cat.name}&output=${selectedGC.output}&image=${cat.image_path}`,
							)
						}}
						className={[
							'flex-1 rounded-2xl px-4 py-3 text-center text-sm font-semibold shadow-sm transition',
							selectedGC
								? 'bg-orange-600 text-white hover:opacity-95'
								: 'cursor-not-allowed bg-gray-100 text-gray-400',
						].join(' ')}
					>
						{selectedGC
							? `Proceed • ${Number(
									selectedGC.amount_after_fee ?? selectedGC.amount ?? 0,
								).toLocaleString('fr-FR')} MRU`
							: 'Select an amount'}
					</button>
				</div>
			</div>
			{/* Bottom sheet (iOS style) */}

			<BottomSheet
				setSheetOpen={() => setSheetOpen(false)}
				title={cat.description}
				sheetOpen={sheetOpen}
			></BottomSheet>
		</div>
	)
}

/* small atom fallback */
function CircleIcon({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-background flex h-9 w-9 items-center justify-center rounded-full border shadow-sm">
			{children}
		</div>
	)
}
