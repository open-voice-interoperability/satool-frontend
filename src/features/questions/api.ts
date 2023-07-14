import { get, getLangConfig } from 'api/http-common'
import { Answer } from './questions'

const fetchQuestionnaire = async (
  get: (path: string, params: any, config: any) => Promise<any>,
  id?: number
) => {
  return await get(`/api/questionnaire/${id}`, {}, getLangConfig())
}

const createQuestionnaire = async (
  post: (path: string, data: any, config: any) => Promise<any>,
  name: string
) => {
  return post('/api/questionnaire/new', { name: name }, {})
}

const fetchSections = async (
  get: (path: string, params: any, config: any) => Promise<any>
) => {
  const res = await get('/api/sections', {}, getLangConfig())
  if (res.results) {
    return res.results
  }
  return []
}

const fetchQuestionnaires = async (
  get: (path: string, params: any, config: any) => Promise<any>
) => {
  return get('/api/questionnaires/', {}, getLangConfig())
}

const deleteQuestionnaire = async (
  deleteRes: (path: string, config: any) => Promise<any>,
  id: number
) => {
  return deleteRes(`/api/questionnaires/${id}`, {})
}

const fetchQuestions = async (
  get: (path: string, params: any, config: any) => Promise<any>,
  questionnaireId: number,
  sectionId: number
) => {
  return await get(
    `/api/questions/${questionnaireId}/${sectionId}`,
    {},
    getLangConfig()
  )
}

const fetchQuestion = async (
  get: (path: string, params: any, config: any) => Promise<any>,
  questionnaireId: number,
  id: number
) => {
  return await get(
    `/api/questions/${questionnaireId}/question/${id}`,
    {},
    getLangConfig()
  )
}

const fetchResults = async (
  get: (path: string, params: any, config: any) => Promise<any>,
  questionnaireId: number
) => {
  return await get(`/api/results/${questionnaireId}`, {}, getLangConfig())
}

const fetchSiteInfo = async (slug: string) => {
  return await get(`/api/site/${slug}`)
}

const postAnswers = async (
  post: (path: string, data: any, config: any) => Promise<any>,
  qId: number,
  answers: Answer[]
) => {
  return await post(
    `/api/questionnaire/${qId}/answers`,
    { answers: answers },
    {}
  )
}

export {
  fetchQuestions,
  fetchQuestion,
  postAnswers,
  fetchSections,
  fetchQuestionnaire,
  fetchResults,
  fetchQuestionnaires,
  deleteQuestionnaire,
  createQuestionnaire,
  fetchSiteInfo,
}
