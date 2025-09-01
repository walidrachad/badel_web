import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

type PropsType = {
	title: string
	children: ReactNode
	className?: string
}

export function ShowcaseSection({ title, children, className }: PropsType) {
	return (
		<div className="shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white">
			<h2 className="border-stroke text-dark dark:border-dark-3 border-b px-4 py-4 font-medium sm:px-6 xl:px-7.5 dark:text-white">
				{title}
			</h2>

			<div className={cn('p-4 sm:p-6 xl:p-10', className)}>{children}</div>
		</div>
	)
}
