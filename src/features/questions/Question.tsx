import { FC, useState } from 'react'
import QuestionLayout from './QuestionLayout'
import { H4, P } from 'components/Text'
import QuestionOptions from './QuestionOptions'
import { useNavigate } from 'react-router-dom'
import s from './Question.module.scss'
import { useTranslation } from 'react-i18next'
import useQuestionnaire from './useQuestionnaire'
import useQuestion from './useQuestion'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import Button from 'components/Button'
import { useAuthOnly } from '@spartanbits/react-auth'

type QuestionProps = {}

const Question: FC<QuestionProps> = ({}) => {
  const { t } = useTranslation()
  const [showHelp, setShowHelp] = useState(false)
  const navigate = useNavigate()

  useAuthOnly(() => navigate('/login'))

  const questionnaire = useQuestionnaire()
  const { question, answered, prevUrl, nextUrl } = useQuestion({})

  const getMaxAnswersText = () => {
    if (!question) return ''
    if (question.maxSelect === 1) {
      return t('question_select_max_one')
    } else {
      return t('question_select_max_n', { n: question.maxSelect })
    }
  }

  if (!question || !questionnaire) return null

  return (
    <QuestionLayout
      style="regular"
      nextTo={answered ? nextUrl : undefined}
      backTo={prevUrl}
    >
      <div className={s.question}>
        <div className={s.content}>
          <P className={s.title}>{questionnaire.name}</P>
          <H4>{question.text}</H4>
          <div className={s.helpWrapper}>
            <P className={s.maxAnswers}>{getMaxAnswersText()}</P>
            {question.helpText && question.helpText.length > 0 ? (
              <Button style="secondary" onClick={() => setShowHelp(true)}>
                {t('button_help')}
              </Button>
            ) : null}
          </div>
          <QuestionOptions question={question} />
        </div>
        <SlidingPane
          className={s.slidingPane}
          width="inherit"
          overlayClassName={s.overlay}
          isOpen={showHelp}
          onRequestClose={() => {
            setShowHelp(false)
          }}
        >
          <div
            className={s.paneContent}
            dangerouslySetInnerHTML={{ __html: question.helpText }}
          ></div>
        </SlidingPane>
      </div>
    </QuestionLayout>
  )
}

export default Question
