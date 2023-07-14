import { useEffect, useState } from 'react'
import { useQuestionnaireStore } from 'store/store'
import useQuestionnaire from './useQuestionnaire'
import { useAuth } from '@spartanbits/react-auth'
import { useParams } from 'react-router-dom'

const useResults = () => {
  const questionnaire = useQuestionnaire()
  const { questionnaireId } = useParams()
  const { results, fetchResults } = useQuestionnaireStore()
  const { get } = useAuth()

  useEffect(() => {
    if (questionnaireId === undefined) return
    fetchResults(get, parseInt(questionnaireId))
  }, [fetchResults, get, questionnaireId])

  return { results, questionnaire }
}

export default useResults
