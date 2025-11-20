import type { Metadata } from 'next'
import AuthProvider from '@/context/AuthenProvider'
import { ToastProvider } from '@/context/ToastProvider'
import { SidebarProvider } from '@/context/SidebarProvider'
import { ToastContainer } from '@/components/ToastContainer'
import NewRelicAI from '@/components/external-scripts/NewRelicAI'
import Menu from '@/components/Menu'
import MainContent from '@/components/MainContent'

import 'snackact-ui/css'
import '@/styles/globals.css'

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
      <head>
        <NewRelicAI />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          <ToastProvider>
            <SidebarProvider>
              <div className="flex h-screen overflow-hidden">
                <Menu />
                <MainContent>{children}</MainContent>
              </div>
              <ToastContainer />
            </SidebarProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
