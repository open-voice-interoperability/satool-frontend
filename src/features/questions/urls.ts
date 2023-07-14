const question = (qId: number, id: number) =>
  `/questionnaire/${qId}/question/${id}`

const results = (qId: number) => `/questionnaire/${qId}/results`

const section = (qId: number, slug: string) =>
  `/questionnaire/${qId}/section/${slug}`

const questionnaire = (qId: number) => `/questionnaire/${qId}`

export { question, results, section, questionnaire }
