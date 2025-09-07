import { LucideIcon } from 'lucide-react'

import { Button } from './ui/button'

export function NavigationHeader({
	title,
	leadingAction,
	trailingAction,
}: {
	title: string
	leadingAction?: {
		icon: LucideIcon
		onClick: () => void | Promise<void>
	}
	trailingAction?: {
		icon: LucideIcon
		onClick: () => void | Promise<void>
	}
}) {
	return (
		<div className="bg-surface border-border-subtle sticky top-0 z-50 container flex h-14 items-center justify-between border-b">
			{leadingAction ? (
				<Button
					size="icon"
					variant="secondary"
					className="size-10"
					onClick={leadingAction.onClick}
				>
					<leadingAction.icon className="size-5" />
				</Button>
			) : (
				<div className="size-10" />
			)}

			<h1 className="text-label-xlarge flex-1 text-center">{title}</h1>

			{trailingAction ? (
				<Button
					size="icon"
					variant="secondary"
					className="size-10"
					onClick={trailingAction?.onClick}
				>
					<trailingAction.icon className="size-5" />
				</Button>
			) : (
				<div className="size-10" />
			)}
		</div>
	)
}
