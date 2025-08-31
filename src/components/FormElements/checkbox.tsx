import { useId } from 'react'
import { CheckIcon, XIcon } from '@/assets/icons'
import { cn } from '@/lib/utils'

type PropsType = {
	withIcon?: 'check' | 'x'
	withBg?: boolean
	label: string
	name?: string
	minimal?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	radius?: 'default' | 'md'
}

export function Checkbox({
	withIcon,
	label,
	name,
	withBg,
	minimal,
	onChange,
	radius,
}: PropsType) {
	const id = useId()

	return (
		<div>
			<label
				htmlFor={id}
				className={cn(
					'flex cursor-pointer items-center select-none',
					!minimal && 'text-body-sm font-medium',
				)}
			>
				<div className="relative">
					<input
						type="checkbox"
						onChange={onChange}
						name={name}
						id={id}
						className="peer sr-only"
					/>

					<div
						className={cn(
							'border-dark-5 peer-checked:border-primary dark:border-dark-6 mr-2 flex size-5 items-center justify-center rounded border peer-checked:[&>*]:block',
							withBg
								? 'peer-checked:bg-primary [&>*]:text-white'
								: 'peer-checked:bg-gray-2 dark:peer-checked:bg-transparent',
							minimal && 'border-stroke dark:border-dark-3 mr-3',
							radius === 'md' && 'rounded-md',
						)}
					>
						{!withIcon && (
							<span className="bg-primary hidden size-2.5 rounded-sm" />
						)}

						{withIcon === 'check' && (
							<CheckIcon className="text-primary hidden" />
						)}

						{withIcon === 'x' && <XIcon className="text-primary hidden" />}
					</div>
				</div>
				<span>{label}</span>
			</label>
		</div>
	)
}
