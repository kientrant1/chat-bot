import ServerGuard from '@/components/authen/ServerGuard'
import Link from 'next/link'
import { PAGE_URL } from '@/constants/url'

export default function Home() {
  return (
    <ServerGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to AI Chat Bot
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your intelligent conversation partner powered by advanced AI. Get
              answers, have discussions, and explore topics with our smart chat
              bot.
            </p>

            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link
                href={PAGE_URL.CHAT_BOT}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Chatting 💬
              </Link>

              <Link
                href={PAGE_URL.QUIZ_MASTER}
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Try Quiz Master 📝
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ServerGuard>
  )
}
