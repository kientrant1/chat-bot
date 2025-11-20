import { PAGE_URL } from './url'

// Menu item interface
export interface MenuItem {
  id: string
  href?: string
  label: string
  icon?: string
  badge?: string | number
  roles?: string[] // Role-based access control
  category?: string
  children?: MenuItem[]
  isExternal?: boolean
  onClick?: () => void
  className?: string
  description?: string
}

// Menu categories for better organization
export const MenuCategories = {
  MAIN: 'main',
  LEARNING: 'learning',
  ADMIN: 'admin',
  LEGAL: 'legal',
  TOOLS: 'tools',
} as const

// Main menu configuration
export const menuConfig: MenuItem[] = [
  {
    id: 'chat',
    href: PAGE_URL.CHAT_BOT,
    label: 'Chat',
    icon: '💬',
    description: 'AI-powered conversations',
    category: MenuCategories.MAIN,
  },
  {
    id: 'quiz',
    label: 'Quiz Center',
    icon: '📝',
    category: MenuCategories.LEARNING,
    children: [
      {
        id: 'quiz-master',
        href: PAGE_URL.QUIZ_MASTER,
        label: 'Quiz Master',
        icon: '📚',
        description: 'General knowledge quizzes',
      },
      {
        id: 'scrum-master',
        href: PAGE_URL.SCRUM_MASTER,
        label: 'Scrum Master Quiz',
        icon: '🏆',
        badge: 'New',
        description: 'Scrum methodology assessment',
      },
    ],
  },
  {
    id: 'docs',
    href: PAGE_URL.TERM_CONDITION,
    label: 'Terms & Conditions',
    icon: '📄',
    category: MenuCategories.LEGAL,
  },
  // Add more menu items here as needed
]

// Example of how to add future menu items:
/*
  {
    id: 'analytics',
    href: '/analytics',
    label: 'Analytics',
    icon: '📊',
    roles: ['admin', 'manager'],
    category: MenuCategories.ADMIN,
    badge: 'Beta',
    description: 'View application analytics and insights'
  },
  {
    id: 'settings',
    href: '/settings',
    label: 'Settings',
    icon: '⚙️',
    category: MenuCategories.TOOLS,
    description: 'Application settings and preferences'
  },
  {
    id: 'help',
    href: 'https://docs.example.com',
    label: 'Help & Documentation',
    icon: '❓',
    isExternal: true,
    category: MenuCategories.TOOLS,
    description: 'External help documentation'
  }
*/

// Menu styling configuration
export const menuStyles = {
  nav: 'bg-white shadow-lg border-b border-gray-200',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'flex justify-between h-16',
  logo: 'flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors',
  logoIcon: 'text-2xl',
  desktopMenu: 'hidden md:flex items-center space-x-4',
  menuItem: {
    base: 'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
    active: 'bg-blue-100 text-blue-700 shadow-sm',
    inactive: 'text-gray-700 hover:text-blue-600 hover:bg-gray-100',
  },
  dropdown: {
    button:
      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-blue-600 hover:bg-gray-100',
    menu: 'absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200',
    item: 'flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors',
  },
  badge:
    'ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full',
  mobileMenu: 'md:hidden border-t border-gray-200 bg-gray-50',
  // New sidebar styles
  sidebar: {
    container:
      'fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out z-40 shadow-xl',
    header:
      'flex items-center gap-3 px-4 py-5 border-b border-gray-200 dark:border-gray-700',
    logo: 'flex items-center gap-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
    nav: 'flex-1 overflow-y-auto overflow-x-hidden px-3 py-4',
    menuItem: {
      base: 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]',
      active:
        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm',
      inactive:
        'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800',
    },
    submenuItem:
      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800',
    footer: 'border-t border-gray-200 dark:border-gray-700 p-4 mt-auto',
    userSection: 'flex items-start flex-col',
  },
}
