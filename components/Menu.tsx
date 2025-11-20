'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo } from 'react'
import { LogoutIcon } from 'snackact-ui/icons'
import { MenuItem, menuConfig, menuStyles } from '@/constants/menuConfig'
import ChevronDown from '@/components/icons/ChevronDown'
import ExternalLink from '@/components/icons/ExternalLink'
import Hamburger from '@/components/icons/Hamburger'
import { useSidebar } from '@/context/SidebarProvider'
import { PAGE_URL } from '@/constants/url'
import { isPublicPage } from '@/utils/routes'

export default function Menu() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const { isCollapsed, toggleCollapsed } = useSidebar()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Filter menu items based on user roles (future feature)
  const visibleMenuItems = useMemo(() => {
    return menuConfig.filter(() => {
      return true
    })
  }, [])

  // Don't render menu on public pages
  if (isPublicPage(pathname)) {
    return null
  }

  if (status === 'loading') {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 animate-pulse z-40">
        <div className="p-4 space-y-4">
          <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    )
  }

  if (!session) return null

  const handleSignOut = async () => {
    await signOut({ callbackUrl: PAGE_URL.LOGIN })
  }

  const isActiveMenuItem = (item: MenuItem): boolean => {
    if (item.href === pathname) return true
    if (item.children) {
      return item.children.some(child => child.href === pathname)
    }
    return false
  }

  const renderMenuItem = (item: MenuItem, collapsed = false) => {
    const hasChildren = item.children && item.children.length > 0
    const isActive = isActiveMenuItem(item)
    const isDropdownOpen = openDropdown === item.id
    const gapClass = item.icon ? '' : 'gap-2 pl-2'

    if (hasChildren) {
      return (
        <div key={item.id} className="w-full">
          <button
            onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
            className={`${menuStyles.sidebar.menuItem.base} ${
              isActive
                ? menuStyles.sidebar.menuItem.active
                : menuStyles.sidebar.menuItem.inactive
            } w-full justify-between group ${gapClass}`}
            title={collapsed ? item.label : ''}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {item.icon && (
                <span className="text-xl shrink-0">{item.icon}</span>
              )}
              {!collapsed && (
                <>
                  <span className="flex-1 text-left truncate">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={menuStyles.badge}>{item.badge}</span>
                  )}
                </>
              )}
            </div>
            {!collapsed && (
              <ChevronDown
                className={`w-4 h-4 transition-transform shrink-0 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </button>

          {isDropdownOpen && !collapsed && (
            <div className="ml-8 mt-1 space-y-1">
              {item.children!.map(child => (
                <Link
                  key={child.id}
                  href={child.href!}
                  onClick={() => setIsMobileOpen(false)}
                  className={`${menuStyles.sidebar.submenuItem} ${
                    pathname === child.href
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                      : ''
                  } ${child.icon ? '' : 'gap-2 pl-2'}`}
                >
                  {child.icon && <span className="text-lg">{child.icon}</span>}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {child.label}
                      </span>
                      {child.badge && (
                        <span className={menuStyles.badge}>{child.badge}</span>
                      )}
                    </div>
                    {child.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (item.onClick) {
      return (
        <button
          key={item.id}
          onClick={item.onClick}
          className={`${menuStyles.sidebar.menuItem.base} ${
            isActive
              ? menuStyles.sidebar.menuItem.active
              : menuStyles.sidebar.menuItem.inactive
          } w-full group ${gapClass}`}
          title={collapsed ? item.label : ''}
        >
          {item.icon && <span className="text-xl shrink-0">{item.icon}</span>}
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              {item.badge && (
                <span className={menuStyles.badge}>{item.badge}</span>
              )}
            </>
          )}
        </button>
      )
    }

    return (
      <Link
        key={item.id}
        href={item.href!}
        onClick={() => setIsMobileOpen(false)}
        className={`${menuStyles.sidebar.menuItem.base} ${
          isActive
            ? menuStyles.sidebar.menuItem.active
            : menuStyles.sidebar.menuItem.inactive
        } w-full group ${gapClass}`}
        title={collapsed ? item.label : ''}
        {...(item.isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {item.icon && <span className="text-xl shrink-0">{item.icon}</span>}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{item.label}</span>
              {item.badge && (
                <span className={menuStyles.badge}>{item.badge}</span>
              )}
              {item.isExternal && <ExternalLink />}
            </div>
            {item.description && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {item.description}
              </p>
            )}
          </div>
        )}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <Hamburger isOpen={isMobileOpen} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${menuStyles.sidebar.container} ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Header */}
        <div
          className={`${menuStyles.sidebar.header} ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Link
            href={PAGE_URL.HOME}
            className={`${menuStyles.sidebar.logo} ${isCollapsed ? 'justify-center' : ''}`}
          >
            <span className="text-2xl font-black text-blue-600">AI</span>
            {!isCollapsed && (
              <span className="font-bold text-lg">AI Chat Bot</span>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <nav className={menuStyles.sidebar.nav}>
          <div className="space-y-1">
            {visibleMenuItems.map(item => renderMenuItem(item, isCollapsed))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className={menuStyles.sidebar.footer}>
          <div
            className={`${menuStyles.sidebar.userSection} ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                {session.user?.name?.charAt(0)?.toUpperCase() ||
                  session.user?.email?.charAt(0)?.toUpperCase() ||
                  'U'}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {session.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {session.user?.email}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full mt-2 flex items-center justify-center gap-2"
              title="Sign Out"
            >
              <LogoutIcon />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>

        {/* Collapse Toggle Button (Desktop only) */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 items-center justify-center shadow-md hover:shadow-lg transition-all"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`}
          />
        </button>
      </aside>
    </>
  )
}
