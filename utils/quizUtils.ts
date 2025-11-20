import type { QuizResult, UserAnswer } from '@/types/quiz'

/**
 * Calculate the score for a quiz attempt
 */
export function calculateScore(answers: UserAnswer[]): number {
  const correctAnswers = answers.filter(answer => answer.isCorrect).length
  return Math.round((correctAnswers / answers.length) * 100)
}

/**
 * Check if an answer is correct
 */
export function checkAnswer(
  correctAnswer: string,
  selectedAnswer: string
): boolean {
  return correctAnswer === selectedAnswer
}

/**
 * Generate a quiz result object
 */
export function createQuizResult(
  quizId: string,
  answers: UserAnswer[]
): QuizResult {
  return {
    quizId,
    score: calculateScore(answers),
    totalQuestions: answers.length,
    answers,
    completedAt: new Date(),
  }
}

/**
 * Format quiz duration in minutes
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
}
