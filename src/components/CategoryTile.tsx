// داخل صفحة اللائحة فين كتّعرض categories
'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import type { Category } from '@/lib/api/charge'

export default function CategoryTile({
	cat,
	children,
}: {
	cat: Category
	children?: ReactNode
}) {
	const router = useRouter()
	const qc = useQueryClient()

	const go = () => {
		qc.setQueryData<Category>(['category', cat.id], cat)
		router.push(`/charges/category/${cat.id}`)
	}

	// const src = cat.small_image
	// 	? new URL(cat.small_image, 'https://staging.bedelportal.com/').toString()
	// 	: cat.image_path
	// 		? new URL(cat.image_path, 'https://staging.bedelportal.com/').toString()
	// 		: '/images/demo/fallback.png'

	return (
		<button className="w-full" onClick={go}>
			{children}
		</button>
	)
}
