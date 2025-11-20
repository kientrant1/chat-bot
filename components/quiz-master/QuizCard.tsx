'use client'

import type { Quiz } from '@/types/quiz'

interface QuizCardProps {
  quiz: Quiz
  onStart?: (url: string) => void
}

export default function QuizCard({ quiz, onStart }: QuizCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {quiz.totalQuestions} questions
        </span>
        {onStart && (
          <button
            onClick={() => onStart(quiz.url)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  )
}
