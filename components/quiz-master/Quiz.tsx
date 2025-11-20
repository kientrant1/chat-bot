'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Answers, QuestionBank } from '@/types/quiz'
import useTimeCounter from '@/hooks/useTimeCounter'
import { useTimerStore } from '@/store/timerStore'

import 'snackact-ui/css'
import dynamic from 'next/dynamic'
import { sendEmail } from '@/services/email'

const QuizHeader = dynamic(
  () => import('snackact-ui').then(mod => mod.QuizHeader),
  {
    ssr: false,
  }
)
const QuestionNavigator = dynamic(
  () => import('snackact-ui').then(mod => mod.QuestionNavigator),
  { ssr: false }
)
const QuestionCard = dynamic(
  () => import('snackact-ui').then(mod => mod.QuestionCard),
  { ssr: false }
)
const QuizNavigation = dynamic(
  () => import('snackact-ui').then(mod => mod.QuizNavigation),
  { ssr: false }
)
const QuizResults = dynamic(
  () => import('snackact-ui').then(mod => mod.QuizResults),
  { ssr: false }
)

interface QuizProps {
  questionBank: QuestionBank[]
}

const shuffledQuestions = (questions: QuestionBank[]) => {
  return [...questions].sort(() => Math.random() - 0.5)
}

const Quiz = ({ questionBank = [] }: QuizProps) => {
  const [questions, setQuestions] = useState<QuestionBank[]>(() => questionBank)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [showNavigator, setShowNavigator] = useState(false)
  const [filterTag, setFilterTag] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  // Timer from useTimeCounter hook
  const { setIsRunning, resetTimer } = useTimeCounter()

  // Subscribe only to timer value from Zustand store
  const timer = useTimerStore(state => state.timer)

  const shuffled = useMemo(() => {
    return shuffledQuestions(questionBank)
  }, [questionBank])

  // Initialize quiz
  useEffect(() => {
    setIsRunning(true)

    // Cleanup: stop timer when component unmounts
    return () => {
      setIsRunning(false)
    }
  }, [setIsRunning])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (optionId: string) => {
    if (submitted) return
    const qId = currentQuestion.id
    const currentAnswers = answers[qId] || []

    if (currentQuestion.multi) {
      // Toggle selection
      if (currentAnswers.includes(optionId)) {
        setAnswers({
          ...answers,
          [qId]: currentAnswers.filter(i => i !== optionId),
        })
      } else {
        setAnswers({ ...answers, [qId]: [...currentAnswers, optionId] })
      }
    } else {
      setAnswers({ ...answers, [qId]: [optionId] })
    }
  }

  const isCorrect = useCallback(
    (qId: number) => {
      const q = questions.find(x => x.id === qId)
      if (!q) return false
      const userAns = answers[qId] || []
      const correctAns = q.correct
      if (userAns.length !== correctAns.length) return false
      return correctAns.every(c => userAns.includes(c))
    },
    [answers, questions]
  )

  const score = useMemo(() => {
    if (!submitted) return 0
    let correct = 0
    questions.forEach(q => {
      if (isCorrect(q.id)) correct++
    })
    return Math.round((correct / questions.length) * 100)
  }, [submitted, questions, isCorrect])

  const handleSubmit = async () => {
    setSubmitted(true)
    setIsRunning(false)
    if (email) await sendEmail(email)
  }

  const handleReset = () => {
    setQuestions(shuffled)
    setCurrentIndex(0)
    setAnswers({})
    setSubmitted(false)
    resetTimer()
    setIsRunning(true)
    setShowNavigator(false)
    setFilterTag('')
    setEmail('')
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleJump = (index: number) => {
    setCurrentIndex(index)
    setShowNavigator(false)
  }

  const getQuestionStatus = (qId: number) => {
    const userAns = answers[qId] || []
    if (!submitted) {
      return userAns.length > 0 ? 'answered' : 'unanswered'
    }
    return isCorrect(qId) ? 'correct' : 'incorrect'
  }

  const tags = useMemo(() => {
    const tagSet = new Set<string>()
    questionBank.forEach(q => {
      if (q.tag) tagSet.add(q.tag)
    })
    return Array.from(tagSet).sort()
  }, [questionBank])

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto snackact-ui-theme-light">
        <QuizHeader
          timer={timer}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          submitted={submitted}
          score={score}
          progress={progress}
          onReset={handleReset}
          onToggleNavigator={() => setShowNavigator(!showNavigator)}
        />

        {/* Email Input Section */}
        {!submitted && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address (optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email to receive results"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {showNavigator && (
          <QuestionNavigator
            questions={questions}
            currentIndex={currentIndex}
            submitted={submitted}
            answers={answers}
            tags={tags}
            filterTag={filterTag}
            onFilterChange={setFilterTag}
            onJumpToQuestion={handleJump}
            getQuestionStatus={getQuestionStatus}
          />
        )}

        <QuestionCard
          question={currentQuestion}
          answers={answers}
          submitted={submitted}
          isCorrect={isCorrect(currentQuestion.id)}
          onAnswer={handleAnswer}
        />

        <QuizNavigation
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          submitted={submitted}
          onPrevious={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />

        {submitted && (
          <QuizResults
            timer={timer}
            questions={questions}
            answers={answers}
            score={score}
            isCorrect={isCorrect}
          />
        )}
      </div>
    </div>
  )
}

export default Quiz
