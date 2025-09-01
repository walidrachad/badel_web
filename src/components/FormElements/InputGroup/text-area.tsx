import { useId } from 'react'
import { cn } from '~/lib/utils'

interface PropsType {
	label: string
	placeholder: string
	required?: boolean
	disabled?: boolean
	active?: boolean
	className?: string
	icon?: React.ReactNode
	defaultValue?: string
}

export function TextAreaGroup({
	label,
	placeholder,
	required,
	disabled,
	active,
	className,
	icon,
	defaultValue,
}: PropsType) {
	const id = useId()

	return (
		<div className={cn(className)}>
			<label
				htmlFor={id}
				className="text-body-sm text-dark mb-3 block font-medium dark:text-white"
			>
				{label}
			</label>

			<div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:top-5.5 [&_svg]:left-5.5">
				<textarea
					id={id}
					rows={6}
					placeholder={placeholder}
					defaultValue={defaultValue}
					className={cn(
						'border-stroke text-dark focus:border-primary disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 transition outline-none disabled:cursor-default dark:text-white',
						icon && 'py-5 pr-5 pl-13',
					)}
					required={required}
					disabled={disabled}
					data-active={active}
				/>

				{icon}
			</div>
		</div>
	)
}
