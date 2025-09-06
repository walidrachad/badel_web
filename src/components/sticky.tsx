import { cn } from '~/lib/utils'

export function Fixed({
	position,
	className,
	...props
}: React.ComponentProps<'div'> & {
	position: 'top' | 'bottom'
}) {
	return (
		<div
			className={cn(
				'fixed inset-x-0 z-50',
				position === 'top' && 'top-0',
				position === 'bottom' && 'bottom-0',
				className,
			)}
			{...props}
		/>
	)
}
