'use client'

import { useRouter } from 'next/navigation'
import QuizCard from '@/components/quiz-master/QuizCard'
import { quizzes } from '@/__mock__/quizzes'

export default function QuizzesPage() {
  const router = useRouter()

  const handleOnStart = (url: string) => {
    router.push(url)
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Available Quizzes</h1>
        <p className="text-gray-600 mb-8">
          Choose a quiz to test your knowledge
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={handleOnStart} />
          ))}
        </div>
      </div>
    </main>
  )
}
