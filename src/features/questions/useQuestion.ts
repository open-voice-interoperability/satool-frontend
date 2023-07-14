import { useAuth } from '@spartanbits/react-auth'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionnaireStore } from 'store/store'

type Props = {
  fetch?: boolean
}

const useQuestion = ({ fetch = true }: Props) => {
  const { questionId, questionnaireId } = useParams()
  const { get } = useAuth()
  const qId = parseInt(questionId ?? '-1')
  const questionnaire = parseInt(questionnaireId ?? '-1')

  const {
    answers,
    sections,
    isAnswerComplete,
    fetchQuestion,
    getQuestionWithId,
    getNextUrlFromQuestionId,
    getPreviousUrlFromQuestionId,
  } = useQuestionnaireStore()

  const question = getQuestionWithId(qId)
  const answered = isAnswerComplete(qId)
  const nextUrl = getNextUrlFromQuestionId(qId)
  const prevUrl = getPreviousUrlFromQuestionId(qId)

  useEffect(() => {
    const q = getQuestionWithId(qId)
    if (!q) {
      fetch && fetchQuestion(get, questionnaire, qId)
    }
  }, [qId, getQuestionWithId, fetchQuestion])

  return { question, answered, prevUrl, nextUrl }
}

export default useQuestion
