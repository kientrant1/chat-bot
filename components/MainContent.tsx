'use client'

import { useSidebar } from '@/context/SidebarProvider'
import { usePathname } from 'next/navigation'
import { isPublicPage } from '@/utils/routes'

interface MainContentProps {
  children: React.ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()

  return (
    <main
      className={`flex-1 overflow-auto transition-all duration-300 ${
        isPublicPage(pathname) ? '' : isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}
    >
      {children}
    </main>
  )
}
