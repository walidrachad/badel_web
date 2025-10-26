import type { ComponentProps } from 'react'

import { cn } from '~/lib/utils'

import { Button } from './ui/button'

export function NavigationHeader({
	className,
	...props
}: ComponentProps<'div'>) {
	return (
		<header
			data-slot="navigation-header"
			className="bg-surface border-border-subtle sticky top-0 z-8 border-b"
		>
			<div
				className={cn(
					'relative container flex h-14 items-center justify-between',
				)}
				{...props}
			/>
		</header>
	)
}

export function NavigationHeaderTitle({
	className,
	...props
}: ComponentProps<'h1'>) {
	return (
		<h1
			data-slot="navigation-header-title"
			className={cn(
				'text-label-xlarge absolute inset-x-0 flex-1 text-center',
				// '[[data-slot=navigation-header-action]+&]:-ms-10',
				// '[&+[data-slot=navigation-header-action]]:-me-10',
				className,
			)}
			{...props}
		/>
	)
}

export function NavigationHeaderAction({
	className,
	inverted = false,
	size = 'icon',
	position = 'start',
	...props
}: ComponentProps<typeof Button> & {
	position?: 'start' | 'end'
	inverted?: boolean
}) {
	return (
		<Button
			data-slot="navigation-header-action"
			size={size}
			variant="secondary"
			className={cn(
				size === 'icon' && 'size-10 [&_svg]:size-5!',
				position === 'end' && 'ms-auto',
				inverted && 'bg-inverted/20',
				className,
			)}
			{...props}
		/>
	)
}
