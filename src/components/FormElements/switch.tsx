import { useId } from 'react'
import { CheckIcon, XIcon } from '~/assets/icons'
import { cn } from '~/lib/utils'

type PropsType = {
	withIcon?: boolean
	background?: 'dark' | 'light'
	backgroundSize?: 'sm' | 'default'
	name?: string
}

export function Switch({
	background,
	withIcon,
	backgroundSize,
	name,
}: PropsType) {
	const id = useId()

	return (
		<label
			htmlFor={id}
			className="flex max-w-fit cursor-pointer items-center select-none"
		>
			<div className="relative">
				<input type="checkbox" name={name} id={id} className="peer sr-only" />
				<div
					className={cn('bg-gray-3 h-8 w-14 rounded-full dark:bg-[#5A616B]', {
						'h-5': backgroundSize === 'sm',
						'dark:bg-primary bg-[#212B36]': background === 'dark',
					})}
				/>

				<div
					className={cn(
						'shadow-switch-1 absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-white transition peer-checked:right-1 peer-checked:translate-x-full peer-checked:[&_.check-icon]:block peer-checked:[&_.x-icon]:hidden',
						{
							'shadow-switch-2 -top-1 left-0 size-7': backgroundSize === 'sm',
							'peer-checked:bg-primary peer-checked:dark:bg-white':
								background !== 'dark',
						},
					)}
				>
					{withIcon && (
						<>
							<CheckIcon className="check-icon dark:fill-dark hidden fill-white" />
							<XIcon className="x-icon" />
						</>
					)}
				</div>
			</div>
		</label>
	)
}
