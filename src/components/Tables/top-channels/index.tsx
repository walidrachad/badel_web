import Image from 'next/image'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table'
import { compactFormat, standardFormat } from '~/lib/format-number'
import { cn } from '~/lib/utils'
import { getTopChannels } from '../fetch'

export async function TopChannels({ className }: { className?: string }) {
	const data = await getTopChannels()

	return (
		<div
			className={cn(
				'shadow-1 dark:bg-gray-dark dark:shadow-card grid rounded-[10px] bg-white px-7.5 pt-7.5 pb-4',
				className,
			)}
		>
			<h2 className="text-body-2xlg text-dark mb-4 font-bold dark:text-white">
				Top Channels
			</h2>

			<Table>
				<TableHeader>
					<TableRow className="border-none uppercase [&>th]:text-center">
						<TableHead className="min-w-[120px] !text-left">Source</TableHead>
						<TableHead>Visitors</TableHead>
						<TableHead className="!text-right">Revenues</TableHead>
						<TableHead>Sales</TableHead>
						<TableHead>Conversion</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map((channel, i) => (
						<TableRow
							className="text-dark text-center text-base font-medium dark:text-white"
							key={channel.name + i}
						>
							<TableCell className="flex min-w-fit items-center gap-3">
								<Image
									src={channel.logo}
									className="size-8 rounded-full object-cover"
									width={40}
									height={40}
									alt={channel.name + ' Logo'}
									role="presentation"
								/>
								<div className="">{channel.name}</div>
							</TableCell>

							<TableCell>{compactFormat(channel.visitors)}</TableCell>

							<TableCell className="text-green-light-1 !text-right">
								${standardFormat(channel.revenues)}
							</TableCell>

							<TableCell>{channel.sales}</TableCell>

							<TableCell>{channel.conversion}%</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
