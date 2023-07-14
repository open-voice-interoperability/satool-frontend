import { useAuth } from '@spartanbits/react-auth'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionnaireStore } from 'store/store'

const useQuestionnaire = () => {
  const { questionnaire, fetchQuestionnaire } = useQuestionnaireStore()
  const { questionnaireId } = useParams()
  const qId = questionnaireId ? parseInt(questionnaireId) : undefined
  const { get } = useAuth()

  useEffect(() => {
    if (!questionnaire || questionnaire.id !== qId) {
      fetchQuestionnaire(get, qId)
    }
  }, [qId, questionnaire, fetchQuestionnaire])

  return questionnaire
}

export default useQuestionnaire
