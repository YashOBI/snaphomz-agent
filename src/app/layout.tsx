import type { Metadata } from 'next'
import { satoshi } from 'utils/fonts'
import './globals.css'
import { Providers } from 'components/providers/providers'
import ToastProvider from 'components/providers/ToastProvider'
import queryClient from 'lib/querryClient'
import { QueryClientProvider } from '@tanstack/react-query'

export const metadata: Metadata = {
  title: 'OC-Snaphomz Agent Dashboard',
  description: 'OC-Snaphomz Estate Agent'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="box-border bg-[#FAF9F5]">
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
