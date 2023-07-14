export type QuestionOption = {
  text: string
  id: number
  next?: number
  freeText: boolean
  freeTextPlaceholder?: string
  helpText?: string
}

export type Question = {
  text: string
  id: number
  sectionId: number
  minSelect: number
  maxSelect: number
  helpText: string
  options: QuestionOption[]
  optionParent?: number
}

export type Answer = {
  text?: string
  question: Question
  option: QuestionOption
}

export type Questionnaire = {
  name: string
  id: number
  questionCount: number
  progress?: number
  score?: number
}

export type Section = {
  id: number
  slug: string
  name: string
  description: string
  questions: Question[]
}

export type SectionResults = {
  slug: string
  name: string
  score: number
  suggestions: string[]
}

export type Results = {
  score: number
  sections: SectionResults[]
}
