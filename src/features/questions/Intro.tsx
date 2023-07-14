import { H1, H2, H4 } from 'components/Text'
import QuestionLayout from './QuestionLayout'
import { Trans, useTranslation } from 'react-i18next'
import { section } from './urls'
import useQuestionnaire from './useQuestionnaire'
import useSections from './useSections'
import s from './Intro.module.scss'
import Loading from 'components/Loading'
import { useNavigate } from 'react-router-dom'
import { useAuthOnly } from '@spartanbits/react-auth'

const Intro = () => {
  const { t } = useTranslation()
  const sections = useSections({})
  const questionnaire = useQuestionnaire()

  const navigate = useNavigate()

  useAuthOnly(() => navigate('/login'))

  return (
    <QuestionLayout
      style="regular"
      nextTo={
        questionnaire && sections.length > 0
          ? section(questionnaire.id, sections[0].slug)
          : undefined
      }
      isStart
      logo
    >
      <H1 className={s.title}>
        <Trans i18nkey="title_questionnaire">
          Find out your <strong>TrustMark score</strong>
        </Trans>
      </H1>
      <div className={s.info}>
        {questionnaire &&
          sections.map((section, index) => (
            <div key={index} className={s.slide}>
              <div className={s.wrapper}>
                <H2>{section.name}</H2>
                <div>{section.description}</div>
              </div>
            </div>
          ))}
        {!questionnaire && <Loading />}
      </div>
    </QuestionLayout>
  )
}

export default Intro
