'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useState } from 'react'
import { SidebarProvider } from '@/components/Layouts/sidebar/sidebar-context'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ThemeProvider defaultTheme="light" attribute="class">
			<SidebarProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</SidebarProvider>
		</ThemeProvider>
	)
}
