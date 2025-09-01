'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronUpIcon } from '~/assets/icons'
import {
	Dropdown,
	DropdownContent,
	DropdownTrigger,
} from '~/components/ui/dropdown'
import { cn } from '~/lib/utils'
import { LogOutIcon, SettingsIcon, UserIcon } from './icons'

export function UserInfo() {
	const [isOpen, setIsOpen] = useState(false)

	const USER = {
		name: 'John Smith',
		email: 'johnson@nextadmin.com',
		img: '/images/user/user-03.png',
	}

	return (
		<Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
			<DropdownTrigger className="ring-primary dark:ring-offset-gray-dark rounded align-middle ring-offset-2 outline-none focus-visible:ring-1">
				<span className="sr-only">My Account</span>

				<figure className="flex items-center gap-3">
					<Image
						src={USER.img}
						className="size-12"
						alt={`Avatar of ${USER.name}`}
						role="presentation"
						width={200}
						height={200}
					/>
					<figcaption className="text-dark dark:text-dark-6 flex items-center gap-1 font-medium max-[1024px]:sr-only">
						<span>{USER.name}</span>

						<ChevronUpIcon
							aria-hidden
							className={cn(
								'rotate-180 transition-transform',
								isOpen && 'rotate-0',
							)}
							strokeWidth={1.5}
						/>
					</figcaption>
				</figure>
			</DropdownTrigger>

			<DropdownContent
				className="border-stroke dark:border-dark-3 dark:bg-gray-dark border bg-white shadow-md min-[230px]:min-w-[17.5rem]"
				align="end"
			>
				<h2 className="sr-only">User information</h2>

				<figure className="flex items-center gap-2.5 px-5 py-3.5">
					<Image
						src={USER.img}
						className="size-12"
						alt={`Avatar for ${USER.name}`}
						role="presentation"
						width={200}
						height={200}
					/>

					<figcaption className="space-y-1 text-base font-medium">
						<div className="text-dark mb-2 leading-none dark:text-white">
							{USER.name}
						</div>

						<div className="text-gray-6 leading-none">{USER.email}</div>
					</figcaption>
				</figure>

				<hr className="dark:border-dark-3 border-[#E8E8E8]" />

				<div className="dark:text-dark-6 p-2 text-base text-[#4B5563] [&>*]:cursor-pointer">
					<Link
						href={'/charges/charge-details'}
						onClick={() => setIsOpen(false)}
						className="hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] dark:hover:text-white"
					>
						<UserIcon />

						<span className="mr-auto text-base font-medium">View profile</span>
					</Link>

					<Link
						href={'/pages/settings'}
						onClick={() => setIsOpen(false)}
						className="hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] dark:hover:text-white"
					>
						<SettingsIcon />

						<span className="mr-auto text-base font-medium">
							Account Settings
						</span>
					</Link>
				</div>

				<hr className="dark:border-dark-3 border-[#E8E8E8]" />

				<div className="dark:text-dark-6 p-2 text-base text-[#4B5563]">
					<button
						className="hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] dark:hover:text-white"
						onClick={() => setIsOpen(false)}
					>
						<LogOutIcon />

						<span className="text-base font-medium">Log out</span>
					</button>
				</div>
			</DropdownContent>
		</Dropdown>
	)
}
