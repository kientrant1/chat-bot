export interface Quiz {
  id: string
  title: string
  description: string
  url: string
  totalQuestions: number
  createdAt: Date
  updatedAt: Date
}

export interface Option {
  id: string
  text: string
}

export interface QuestionBank {
  id: number
  text: string
  options: Option[]
  correct: string[] // indices of correct answers
  explanation: string
  multi?: boolean // if true, render as multi-select
  tag?: string // topic tag
}

export enum QuestionTopic {
  SCRUM_MASTER = 'scrum-master',
  PRODUCT_OWNER = 'product-owner',
  AGILE_FUNDAMENTALS = 'agile-fundamentals',
}

export interface DBQuestionRow {
  id: number
  topic: QuestionTopic
  question: QuestionBank
  create_date: Date
}

export interface Answers {
  [questionId: number]: string[] // array of selected option ids
}

export interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
  answers: UserAnswer[]
  completedAt: Date
}

export interface UserAnswer {
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
}
