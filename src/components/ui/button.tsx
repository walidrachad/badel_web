import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
	[
		'text-label-large inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl text-lg/normal font-semibold tracking-normal whitespace-nowrap transition-all outline-none',
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
		'focus-visible:border-border focus-visible:ring-border/50 focus-visible:ring-[3px]',
		'aria-invalid:ring-border-destructive/20 aria-invalid:border-border-destructive',
		'disabled:bg-disabled disabled:text-disabled-foreground disabled:pointer-events-none disabled:border-none',
	],
	{
		variants: {
			variant: {
				default: 'bg-accent text-inverted-foreground hover:bg-accent/90',
				secondary: 'bg-inset text-foreground hover:bg-highlight',
				outline:
					'bg-surface text-foreground hover:bg-inset border-emphasis border-2',
				ghost: 'text-foreground hover:bg-inset bg-transparent',
				destructive:
					'bg-destructive-muted text-destructive-foreground hover:bg-destructive-muted/90 border-border-destructive focus-visible:ring-border-destructive/50 border-2',
			},
			size: {
				default: 'h-11 px-5 py-3',
				icon: 'size-13 rounded-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
