'use client'

import React, { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setIsCollapsed(prev => !prev)
  }

  const contextValue: SidebarContextType = {
    isCollapsed,
    setIsCollapsed,
    toggleCollapsed,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
