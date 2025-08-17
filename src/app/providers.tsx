"use client";

import { ReactNode, useState } from "react";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: ReactNode }) {
  // one QueryClient per browser tab
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
