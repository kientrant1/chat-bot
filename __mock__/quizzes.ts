import type { Quiz } from '@/types/quiz'

/**
 * Sample quiz data for development and testing
 */
export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Scrum Mastery Test',
    url: '/quiz-master/scrum-master',
    description:
      'Test your knowledge on Scrum principles, roles, and practices.',
    totalQuestions: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]
