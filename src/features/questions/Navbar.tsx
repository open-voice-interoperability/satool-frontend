import Button from 'components/Button'
import s from './Navbar.module.scss'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import QuestionProgressBar from './QuestionProgressBar'
import { Container } from 'react-bootstrap'
import SectionNavigation from './SectionNavigation'
import { results } from './urls'
import { useQuestionnaireStore } from 'store/store'
import { shallow } from 'zustand/shallow'
import { useParams } from 'react-router-dom'
import TrustMarkLogo from 'layout/TrustMarkLogo'
import { clsx as cn } from 'clsx'
import useQuestion from './useQuestion'
import { useAuth } from '@spartanbits/react-auth'

type NavbarProps = {
  style?: 'secondary' | 'regular'
  nextTo?: string
  backTo?: string
  backText?: string | null
  isStart?: boolean
  isEnd?: boolean
  logo?: boolean
}

const Navbar: FC<NavbarProps> = ({
  style = 'regular',
  backText,
  nextTo,
  backTo,
  isStart = false,
  isEnd = false,
  logo = false,
}) => {
  const { t } = useTranslation()
  const { id, slug } = useParams()
  const { question } = useQuestion({ fetch: false })
  const { get, post } = useAuth()

  const { postAnswers, questionnaire, fetchQuestionnaire, getSectionWithId } =
    useQuestionnaireStore(
      ({
        postAnswers,
        questionnaire,
        fetchQuestionnaire,
        getSectionWithId,
      }) => ({
        postAnswers,
        questionnaire,
        fetchQuestionnaire,
        getSectionWithId,
      }),
      shallow
    )
  const section = question ? getSectionWithId(question.sectionId) : undefined

  useEffect(() => {
    if (!questionnaire) {
      fetchQuestionnaire(get, id ? parseInt(id) : undefined)
    }
  }, [id])
  if (!questionnaire) return null
  return (
    <div className={cn(s.navbar, slug)}>
      <QuestionProgressBar style={style} className={section?.slug} />
      <div className={s.content}>
        <Container className={s.contentWrapper}>
          {logo && <TrustMarkLogo />}
          {backTo && !logo && (
            <Button
              style="secondary"
              variant={style === 'secondary' ? 'inverted' : 'regular'}
              to={backTo}
            >
              {backText ?? t('nav_previous')}
            </Button>
          )}
          <div className={s.sectionNavPlaceholder}></div>
          <div className={s.sectionNav}>
            {question && style === 'regular' && (
              <SectionNavigation
                section={section}
                questionnaire={questionnaire}
              />
            )}
          </div>
          {nextTo && (
            <Button
              variant={style === 'secondary' ? 'inverted' : 'regular'}
              to={nextTo ?? results(questionnaire.id)}
              onClick={() => postAnswers(post, questionnaire.id)}
            >
              {isStart ? t('nav_start') : isEnd ? t('nav_end') : t('nav_next')}
            </Button>
          )}
        </Container>
      </div>
    </div>
  )
}

export default Navbar
