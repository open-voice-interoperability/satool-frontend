import { FC, useEffect } from 'react'
import QuestionLayout from './QuestionLayout'
import s from './SectionHeading.module.scss'
import { H2, P } from 'components/Text'
import { question, section as sectionUrl } from './urls'
import useQuestionnaire from './useQuestionnaire'
import useSectionQuestions from './useSectionQuestions'
import Loading from 'components/Loading'
import { useParams } from 'react-router'
import { useAuthOnly } from '@spartanbits/react-auth'
import { useNavigate } from 'react-router-dom'

type SectionHeadingProps = {}

const SectionHeading: FC<SectionHeadingProps> = () => {
  const questionnaire = useQuestionnaire()
  const { slug } = useParams()
  const { section, prevSection, nextQuestion } = useSectionQuestions()
  const navigate = useNavigate()

  useAuthOnly(() => navigate('/login'))

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(section?.slug || slug || '')
    return () => {
      document.body.className = ''
    }
  }, [section, slug])

  return (
    <QuestionLayout
      style="secondary"
      nextTo={
        questionnaire &&
        nextQuestion &&
        question(questionnaire.id, nextQuestion.id)
      }
      backTo={
        prevSection && questionnaire
          ? sectionUrl(questionnaire.id, prevSection.slug)
          : '/questionnaire'
      }
    >
      {section ? (
        <div className={s.content}>
          <H2 inverted>{section.name}</H2>
          <P inverted>{section.description}</P>
        </div>
      ) : (
        <div className={s.loadingWrapper}>
          <Loading style="secondary" />
        </div>
      )}
    </QuestionLayout>
  )
}

export default SectionHeading
