'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
	Dropdown,
	DropdownContent,
	DropdownTrigger,
} from '~/components/ui/dropdown'
import { useIsMobile } from '~/hooks/use-mobile'
import { cn } from '~/lib/utils'
import { BellIcon } from './icons'

const notificationList = [
	{
		image: '/images/user/user-15.png',
		title: 'Piter Joined the Team!',
		subTitle: 'Congratulate him',
	},
	{
		image: '/images/user/user-03.png',
		title: 'New message',
		subTitle: 'Devid sent a new message',
	},
	{
		image: '/images/user/user-26.png',
		title: 'New Payment received',
		subTitle: 'Check your earnings',
	},
	{
		image: '/images/user/user-28.png',
		title: 'Jolly completed tasks',
		subTitle: 'Assign new task',
	},
	{
		image: '/images/user/user-27.png',
		title: 'Roman Joined the Team!',
		subTitle: 'Congratulate him',
	},
]

export function Notification() {
	const [isOpen, setIsOpen] = useState(false)
	const [isDotVisible, setIsDotVisible] = useState(true)
	const isMobile = useIsMobile()

	return (
		<Dropdown
			isOpen={isOpen}
			setIsOpen={(open) => {
				setIsOpen(open)

				if (setIsDotVisible) setIsDotVisible(false)
			}}
		>
			<DropdownTrigger
				className="bg-gray-2 text-dark hover:text-primary focus-visible:border-primary focus-visible:text-primary dark:border-dark-4 dark:bg-dark-3 dark:focus-visible:border-primary grid size-12 place-items-center rounded-full border outline-none dark:text-white"
				aria-label="View Notifications"
			>
				<span className="relative">
					<BellIcon />

					{isDotVisible && (
						<span
							className={cn(
								'bg-red-light ring-gray-2 dark:ring-dark-3 absolute top-0 right-0 z-1 size-2 rounded-full ring-2',
							)}
						>
							<span className="bg-red-light absolute inset-0 -z-1 animate-ping rounded-full opacity-75" />
						</span>
					)}
				</span>
			</DropdownTrigger>

			<DropdownContent
				align={isMobile ? 'end' : 'center'}
				className="border-stroke dark:border-dark-3 dark:bg-gray-dark border bg-white px-3.5 py-3 shadow-md min-[350px]:min-w-[20rem]"
			>
				<div className="mb-1 flex items-center justify-between px-2 py-1.5">
					<span className="text-dark text-lg font-medium dark:text-white">
						Notifications
					</span>
					<span className="bg-primary rounded-md px-[9px] py-0.5 text-xs font-medium text-white">
						5 new
					</span>
				</div>

				<ul className="mb-3 max-h-[23rem] space-y-1.5 overflow-y-auto">
					{notificationList.map((item, index) => (
						<li key={index} role="menuitem">
							<Link
								href="#"
								onClick={() => setIsOpen(false)}
								className="hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-3 dark:focus-visible:bg-dark-3 flex items-center gap-4 rounded-lg px-2 py-1.5 outline-none"
							>
								<Image
									src={item.image}
									className="size-14 rounded-full object-cover"
									width={200}
									height={200}
									alt="User"
								/>

								<div>
									<strong className="text-dark block text-sm font-medium dark:text-white">
										{item.title}
									</strong>

									<span className="text-dark-5 dark:text-dark-6 truncate text-sm font-medium">
										{item.subTitle}
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>

				<Link
					href="#"
					onClick={() => setIsOpen(false)}
					className="border-primary text-primary hover:bg-blue-light-5 focus:bg-blue-light-5 focus:text-primary focus-visible:border-primary dark:border-dark-3 dark:text-dark-6 dark:hover:border-dark-5 dark:hover:bg-dark-3 dark:hover:text-dark-7 dark:focus-visible:border-dark-5 dark:focus-visible:bg-dark-3 dark:focus-visible:text-dark-7 block rounded-lg border p-2 text-center text-sm font-medium tracking-wide transition-colors outline-none"
				>
					See all notifications
				</Link>
			</DropdownContent>
		</Dropdown>
	)
}
