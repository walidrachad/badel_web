import { GearSixIcon, HouseIcon, PackageIcon } from '@phosphor-icons/react'
import { Link, useMatch } from '@tanstack/react-router'

import { m } from '~/paraglide/messages'

import { Button } from './ui/button'

export function BottomNavigation() {
	const matchHome = useMatch({ from: '/', shouldThrow: false })

	return (
		<aside className="border-border-subtle bg-surface fixed inset-x-0 bottom-0 z-9 border-t px-4 pt-3 pb-[max(--spacing(4),env(safe-area-inset-bottom))]">
			<nav className="container">
				<ul className="flex items-center justify-center gap-4">
					<li>
						<Button asChild size="icon" variant="secondary">
							<Link to="/">
								<HouseIcon weight={matchHome ? 'fill' : 'bold'} />
							</Link>
						</Button>
					</li>

					<li>
						<Button asChild className="rounded-full">
							<Link to="/orders">
								<PackageIcon weight="bold" />
								{m.my_orders()}
							</Link>
						</Button>
					</li>

					<li>
						<Button asChild size="icon" variant="secondary">
							<Link to=".">
								<GearSixIcon weight="bold" />
							</Link>
						</Button>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
