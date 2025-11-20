import Quiz from '@/components/quiz-master/Quiz'
import { getQuestions } from '@/services/questions'

export default async function ScrumMasterQuizPage() {
  const questions = await getQuestions()

  return <Quiz questionBank={questions} />
}
