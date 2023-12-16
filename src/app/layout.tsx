import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import logo from '../../public/logo.png'
import './globals.css'
import ThemeProvider from '@/providers/theme-provider'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: 'Chat app',
    icons: {
      icon: logo.src
    }
  }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={cn(
          inter.className,
          "bg-white-900 dark:bg-[#222325] min-h-[100vh]"
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          storageKey='app-theme'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
