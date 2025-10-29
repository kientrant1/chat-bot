import type { Metadata } from 'next'
import '@/styles/globals.css'
import AuthProvider from '@/context/AuthenProvider'

export const metadata: Metadata = {
  title: 'AI Chat Bot',
  description: 'AI powered chat bot with beautiful UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
