import type { Metadata } from 'next'
import '@/styles/globals.css'
import AuthProvider from '@/context/AuthenProvider'
import { ToastProvider } from '@/context/ToastProvider'
import { ToastContainer } from '@/components/ToastContainer'

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
        <AuthProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
