import SignUpContainer from '@/components/SignUpContainer'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { PAGE_URL } from '@/constants/url'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(PAGE_URL.HOME)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpContainer />
      </div>
    </div>
  )
}
