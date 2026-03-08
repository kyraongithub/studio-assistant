import './globals.css'
import type { Metadata } from 'next'
import { QueryProvider } from '../providers/QueryProvider'

export const metadata: Metadata = {
  title: 'Studio Assistant',
  description: 'AI-powered internal assistant designed for game studio workflows.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
