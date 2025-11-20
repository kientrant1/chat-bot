import { PAGE_URL } from '@/constants/url'

const PUBLIC_ROUTES = [
  PAGE_URL.LOGIN,
  PAGE_URL.SIGN_UP,
  PAGE_URL.TERM_CONDITION,
]

export const isPublicPage = (pathname: string | null): boolean => {
  if (!pathname) return false
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route))
}
