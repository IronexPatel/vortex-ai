import { ThemeProvider } from "@/components/providers/theme-provider"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
title: 'Whiz',
description: 'AI Platform',
}

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
  <ClerkProvider>
<html lang="en" suppressHydrationWarning>
<body className={inter.className}>
  <ThemeProvider
  attribute={"class"}
  defaultTheme="light"
  enableSystem
  storageKey="whiz-theme"
  disableTransitionOnChange>
  {children}
  </ThemeProvider>
  </body>
</html>
</ClerkProvider> 
)
}

