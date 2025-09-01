import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'
import { Moon, Sun } from './icons'

const THEMES = [
	{
		name: 'light',
		Icon: Sun,
	},
	{
		name: 'dark',
		Icon: Moon,
	},
]

export function ThemeToggleSwitch() {
	const { setTheme, theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<button
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className="group bg-gray-3 outline-primary rounded-full p-[5px] text-[#111928] outline-1 focus-visible:outline dark:bg-[#020D1A] dark:text-current"
		>
			<span className="sr-only">
				Switch to {theme === 'light' ? 'dark' : 'light'} mode
			</span>

			<span aria-hidden className="relative flex gap-2.5">
				{/* Indicator */}
				<span className="dark:bg-dark-2 dark:group-hover:bg-dark-3 absolute size-[38px] rounded-full border border-gray-200 bg-white transition-all dark:translate-x-[48px] dark:border-none" />

				{THEMES.map(({ name, Icon }) => (
					<span
						key={name}
						className={cn(
							'relative grid size-[38px] place-items-center rounded-full',
							name === 'dark' && 'dark:text-white',
						)}
					>
						<Icon />
					</span>
				))}
			</span>
		</button>
	)
}
