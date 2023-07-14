import {
  fetchQuestion,
  fetchQuestionnaire,
  fetchQuestions,
  fetchResults,
  fetchSections,
  postAnswers,
} from 'features/questions/api'
import {
  Answer,
  Question,
  QuestionOption,
  Questionnaire,
  Results,
  Section,
} from 'features/questions/questions'
import {
  question,
  questionnaire,
  results,
  section,
} from 'features/questions/urls'
import { create } from 'zustand'

interface QuestionnaireState {
  name: string
  sections: Section[]
  questionnaire: Questionnaire | undefined
  results: Results | undefined
  fetchResults: (
    get: (path: string, params: any, config: any) => Promise<any>,
    qId?: number
  ) => void
  fetchQuestionnaire: (
    get: (path: string, params: any, config: any) => Promise<any>,
    id?: number
  ) => Promise<Questionnaire | undefined>
  fetchSections: (
    get: (path: string, params: any, config: any) => Promise<any>
  ) => void
  fetchSectionQuestions: (
    get: (path: string, params: any, config: any) => Promise<any>,
    qId: number,
    id: number
  ) => void
  fetchQuestion: (
    get: (path: string, params: any, config: any) => Promise<any>,
    qId: number,
    id: number
  ) => void
  postAnswers: (
    post: (path: string, data: any, config: any) => Promise<any>,
    qId: number
  ) => void
  getProgress: () => number
  isAnswerComplete: (questionId: number) => boolean
  getSectionWithSlug: (slug?: string) => Section | undefined
  getSectionWithId: (id?: number) => Section | undefined
  getFirstQuestionFromSection: (slug?: string) => Question | undefined
  getNextSectionFromId: (sectionId: number) => Section | undefined
  getPreviousSectionFromId: (sectionId?: number) => Section | undefined
  getQuestionWithId: (id: number, sectionId?: number) => Question | undefined
  getPreviousUrlFromQuestionId: (id: number) => string
  getNextUrlFromQuestionId: (id: number) => string
  getNextQuestion: (id: number, sectionId: number) => Question | undefined
  getPreviousQuestion: (id: number, sectionId: number) => Question | undefined
  answers: Answer[]
  setAnswer: (answer: Answer) => void
  unSetAnswer: (answer: Answer) => void
}

const useQuestionnaireStore = create<QuestionnaireState>()((set, get) => ({
  name: '',
  sections: [],
  results: undefined,
  questionnaire: undefined,
  getProgress: () => {
    const questionnaire = get().questionnaire
    if (!questionnaire) return 0
    return (
      (get().answers.reduce(
        (acc: { els: number[]; count: number }, a) =>
          !acc.els.find(
            (e) => a.question.id === e || a.question.optionParent !== undefined
          )
            ? { els: [...acc.els, a.question.id], count: acc.count + 1 }
            : acc,
        { els: [], count: 0 }
      ).count /
        questionnaire.questionCount) *
      100
    )
  },
  fetchSections: async (get) => {
    const sections = await fetchSections(get)
    set({ sections })
  },
  fetchResults: async (httpGet, qId?: number) => {
    let questionnaire = get().questionnaire
    if (!questionnaire || questionnaire.id !== qId) {
      if (qId !== undefined) {
        questionnaire = await get().fetchQuestionnaire(httpGet, qId)
        if (!questionnaire) {
          return
        }
      }
    }
    if (!questionnaire) return
    const results = await fetchResults(httpGet, questionnaire.id)
    set({ results })
  },
  fetchQuestionnaire: async (get, id?: number) => {
    if (id === undefined) return undefined
    const { questionnaire, answers } = await fetchQuestionnaire(get, id)
    set({ questionnaire, answers })
    return questionnaire as Questionnaire
  },
  fetchSectionQuestions: async (httpGet, qId: number, id: number) => {
    let questionnaire = get().questionnaire
    if (!questionnaire || questionnaire.id !== qId) {
      if (qId !== undefined) {
        questionnaire = await get().fetchQuestionnaire(httpGet, qId)
        if (!questionnaire) {
          return
        }
      }
    }
    if (!questionnaire) return
    const response = await fetchQuestions(httpGet, questionnaire.id, id)
    const sectionIndex = get().sections.findIndex((s) => s.id === id)
    let sections = get().sections
    sections[sectionIndex].questions = response
    set({ sections })
  },
  fetchQuestion: async (httpGet, qId: number, id: number) => {
    let questionnaire = get().questionnaire
    if (!questionnaire || questionnaire.id !== qId) {
      if (qId !== undefined) {
        questionnaire = await get().fetchQuestionnaire(httpGet, qId)
        if (!questionnaire) {
          return
        }
      }
    }
    if (!questionnaire) return
    if (get().sections.length === 0) {
      get().fetchSections(httpGet)
    }
    const response = await fetchQuestion(httpGet, questionnaire.id, id)
    const sectionId = response[0].sectionId
    const sectionIndex = get().sections.findIndex((s) => s.id === sectionId)
    let sections = get().sections
    sections[sectionIndex].questions = response
    set({ sections })
  },
  postAnswers: async (post, qId) => {
    postAnswers(post, qId, get().answers)
  },
  isAnswerComplete: (questionId: number) => {
    const question = get().getQuestionWithId(questionId)
    if (!question) return false
    return (
      get().answers.filter((a) => a.question.id === questionId).length >=
      question.minSelect
    )
  },
  getSectionWithSlug: (slug?: string) =>
    get().sections.find((s) => s.slug === slug),
  getSectionWithId: (id?: number) => {
    return get().sections.find((s) => s.id === id)
  },
  getNextSectionFromId: (sectionId: number) => {
    const sections = get().sections
    const index = sections.findIndex((s) => s.id === sectionId)
    if (index < 0 || index === sections.length - 1) return undefined
    return sections[index + 1]
  },
  getPreviousSectionFromId: (sectionId?: number) => {
    if (sectionId === undefined) return undefined
    const sections = get().sections
    const index = sections.findIndex((s) => s.id === sectionId)
    if (index <= 0) return undefined
    return sections[index - 1]
  },
  getQuestionWithId: (id: number) =>
    get().sections.reduce(
      (acc: Question | undefined, s) =>
        acc ?? s.questions.find((q) => q.id === id),
      undefined
    ),
  getNextQuestion: (id: number, sectionId: number) => {
    const section = get().getSectionWithId(sectionId)
    if (!section) return undefined
    const questions = section.questions
    const currentIndex = questions.findIndex((q) => q.id === id)

    if (currentIndex < 0) return undefined
    const currentQuestion = questions[currentIndex]

    if (currentQuestion.optionParent !== undefined) {
      // conditional, find next conditional, if there is no next, find next regular question
      for (let i = currentIndex + 1; i < questions.length; i++) {
        const q = questions[i]
        if (get().answers.find((a) => q.optionParent === a.option.id)) {
          return q
        }
      }
      const parentIndex = questions.findIndex((q) =>
        q.options.find((o) => o.id === currentQuestion.optionParent)
      )
      for (let i = parentIndex + 1; i < questions.length; i++) {
        const q = questions[i]
        if (q.optionParent === undefined) {
          return q
        }
      }
      return undefined
    }

    // Jump if necessary, if not, find next regular question
    const conditionalAnswers = get().answers.filter(
      (a) =>
        a.question.id === id &&
        a.option.next !== undefined &&
        (sectionId === undefined || sectionId === a.question.sectionId)
    )

    if (conditionalAnswers.length === 0) {
      // Regular answer, find next no conditional
      for (let i = currentIndex + 1; i < questions.length; i++) {
        const q = questions[i]
        if (q.optionParent === undefined) {
          return q
        }
      }
      return undefined
    }
    // Conditional answer, skip to
    return questions.find((q) => q.id === conditionalAnswers[0].option.next)
  },
  getPreviousQuestion: (id: number, sectionId: number) => {
    const section = get().getSectionWithId(sectionId)
    if (!section) return undefined
    const questions = section.questions
    const currentIndex = questions.findIndex((q) => q.id === id)

    if (currentIndex <= 0) return undefined
    const currentQuestion = questions[currentIndex]

    if (currentQuestion.optionParent !== undefined) {
      // conditional, find prev conditional, if there is no next, return parent question
      for (let i = currentIndex - 1; i >= 0; i--) {
        const q = questions[i]
        if (q.optionParent === currentQuestion.optionParent) {
          return q
        }
      }
      return questions.find((q) =>
        q.options.find((o) => o.id === currentQuestion.optionParent)
      )
    }

    // No conditional question, find prev regular question
    let prevQuestion: Question | undefined = undefined
    for (let i = currentIndex - 1; i >= 0; i--) {
      const q = questions[i]
      if (q.optionParent === undefined) {
        prevQuestion = q
        break
      }
    }

    if (prevQuestion === undefined) return undefined
    const answers = get().answers

    const conditionalAnswers = answers.filter((a) =>
      prevQuestion?.options.find(
        (o) =>
          o.id === a.question.optionParent &&
          answers.find((a) => a.option.id === o.id)
      )
    )

    if (conditionalAnswers.length === 0) {
      return prevQuestion
    }
    // Conditional answer, skip to last
    return questions.find(
      (q) =>
        q.id === conditionalAnswers[conditionalAnswers.length - 1].question.id
    )
  },
  getNextUrlFromQuestionId: (id: number) => {
    const questionnaire = get().questionnaire
    if (!questionnaire) return '/'
    const currentQuestion = get().getQuestionWithId(id)
    if (!currentQuestion) return '/'
    const nextQuestion = get().getNextQuestion(id, currentQuestion.sectionId)

    if (!nextQuestion) {
      const nextSection = get().getNextSectionFromId(currentQuestion.sectionId)
      if (!nextSection) return results(questionnaire.id)
      return section(questionnaire.id, nextSection.slug)
    }
    return question(questionnaire.id, nextQuestion.id)
  },
  getPreviousUrlFromQuestionId: (id: number) => {
    const questionnaire = get().questionnaire
    if (!questionnaire) return '/'
    const currentQuestion = get().getQuestionWithId(id)
    if (!currentQuestion) return '/'
    const previousQuestion = get().getPreviousQuestion(
      id,
      currentQuestion.sectionId
    )

    if (!previousQuestion) {
      const previousSection = get().getSectionWithId(currentQuestion.sectionId)
      if (!previousSection) return '/questionnaire'
      return section(questionnaire.id, previousSection.slug)
    }
    return question(questionnaire.id, previousQuestion.id)
  },
  getFirstQuestionFromSection: (slug?: string) => {
    const section = get().getSectionWithSlug(slug)
    if (!section) return undefined

    if (section.questions.length === 0) {
      return undefined
    } else {
      return section.questions[0]
    }
  },
  answers: [],
  setAnswer: (answer: Answer) =>
    set((state) => {
      let answers = [...state.answers]
      const i = answers.findIndex((a) => a.option.id === answer.option.id)
      if (i >= 0) {
        answers[i] = answer
      } else {
        answers.push(answer)
      }
      return { answers }
    }),
  unSetAnswer: (answer: Answer) =>
    set((state) => {
      let answers = [...state.answers]
      const i = answers.findIndex((a) => a.option.id === answer.option.id)
      if (answer.option.next !== undefined) {
        const conditionals = answers.filter(
          (a) => a.question.optionParent === answer.option.id
        )
        for (let c of conditionals) {
          const i = answers.findIndex((a) => c.option.id === a.option.id)
          answers.splice(i, 1)
        }
      }
      if (i >= 0) {
        answers.splice(i, 1)
        return { answers }
      }
      return {}
    }),
}))

export { useQuestionnaireStore }
