import ServerGuard from '@/components/authen/ServerGuard'
import Link from 'next/link'
import { PAGE_URL } from '@/constants/url'

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-lg text-slate-700">
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12.5l4 4 10-10"
        />
      </svg>
      <span>{children}</span>
    </li>
  )
}

export default function Home() {
  return (
    <ServerGuard>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <div className="mb-10 space-y-3 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-gray-900">
              Welcome to AI Chat Bot
            </h1>
            <p className="text-lg text-gray-600">Welcome back, Kevin</p>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 lg:mx-0">
              Ask questions, practice quizzes, and explore topics with your
              smart chat bot.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Link
                  href={PAGE_URL.CHAT_BOT}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Start chatting
                </Link>

                <Link
                  href={PAGE_URL.QUIZ_MASTER}
                  className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-8 py-3 text-lg font-semibold text-blue-700 shadow-sm transition hover:border-blue-300 hover:shadow"
                >
                  Try Quiz Master
                </Link>
              </div>

              <ul className="space-y-5">
                <ChecklistItem>
                  Get instant answers to your questions
                </ChecklistItem>
                <ChecklistItem>
                  Practice general knowledge or Scrum quizzes
                </ChecklistItem>
                <ChecklistItem>
                  Track your quiz performance over time
                </ChecklistItem>
              </ul>
            </div>

            <div className="w-full max-w-md lg:ml-auto">
              <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent activity
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="rounded-xl bg-gray-50 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)]">
                    Help me prepare for my Scrum exam.
                  </div>
                  <div className="rounded-xl bg-blue-50 px-4 py-3 text-blue-800 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]">
                    Sure! Let&apos;s start with a quick 10-question quiz.
                  </div>
                </div>
                <Link
                  href={PAGE_URL.CHAT_BOT}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-400 hover:shadow"
                >
                  Resume last chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServerGuard>
  )
}
