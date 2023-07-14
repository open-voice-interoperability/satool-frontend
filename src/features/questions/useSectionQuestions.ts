import { useAuth } from '@spartanbits/react-auth'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionnaireStore } from 'store/store'

const useSectionQuestions = () => {
  const { questionnaireId, slug } = useParams()
  const { get } = useAuth()
  const {
    sections,
    fetchSectionQuestions,
    fetchSections,
    getSectionWithSlug,
    getFirstQuestionFromSection,
    getPreviousSectionFromId,
  } = useQuestionnaireStore()

  const section = getSectionWithSlug(slug)
  const nextQuestion = getFirstQuestionFromSection(section?.slug)
  const prevSection = getPreviousSectionFromId(section?.id)

  useEffect(() => {
    if (sections.length === 0) {
      fetchSections(get)
    }
  }, [sections])

  useEffect(() => {
    if (!nextQuestion && section)
      fetchSectionQuestions(get, parseInt(questionnaireId ?? '-1'), section.id)
  }, [section, nextQuestion, fetchSectionQuestions])

  return { section, prevSection, nextQuestion }
}

export default useSectionQuestions
