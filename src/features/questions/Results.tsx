import RingProgress from 'components/RingProgress'
import QuestionLayout from './QuestionLayout'
import useResults from './useResults'
import { Col, Row } from 'react-bootstrap'
import { H1, H4, P } from 'components/Text'
import s from './Results.module.scss'
import { useTranslation } from 'react-i18next'
import { section } from './urls'
import { useNavigate } from 'react-router-dom'
import { useAuthOnly } from '@spartanbits/react-auth'
import TrustMarkLogo from 'layout/TrustMarkLogo'
import useSections from './useSections'
import Loading from 'components/Loading'

const Results = () => {
  const { results, questionnaire } = useResults()
  const sections = useSections({ fetch: true })
  const { t } = useTranslation()
  const navigate = useNavigate()

  useAuthOnly(() => navigate('/login'))

  return (
    <QuestionLayout
      style="regular"
      nextTo="/my-questionnaires"
      backText={t('button_edit_answers')}
      backTo={
        questionnaire && sections.length > 0
          ? section(
              questionnaire.id,
              sections.length > 0 ? sections[0].slug : ''
            )
          : undefined
      }
      isEnd
    >
      <div className={s.title}>
        <H1>{t('title_results')}</H1>
        <div className={s.logo}>
          <TrustMarkLogo />
        </div>
      </div>
      {!results ? (
        <div className={s.loading}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={s.score}>
            <div className={s.global}>
              <RingProgress
                progress={results.sections.map(
                  (s) => s.score / results.sections.length
                )}
              />
            </div>
            <div className={s.separator}></div>

            <div className={s.sections}>
              {results.sections.map((section, i) => (
                <div className={s.sectionScore}>
                  <RingProgress
                    progress={[section.score]}
                    strokeWidth={18}
                    size={50}
                    color={i}
                    layout="compact"
                  />
                  <P className={s.name}>{section.name}</P>
                </div>
              ))}
            </div>
          </div>
          {results.sections.reduce((acc, s) => s.suggestions.length + acc, 0) >
            0 && (
            <Row className={s.recommendations}>
              <Col>
                <H4>{t('title_recommendations')}</H4>
                {results.sections.map(
                  (section) =>
                    section.suggestions.length > 0 && (
                      <div
                        className={s.sectionSuggestion}
                        key={`section-suggestions-${section.name}`}
                      >
                        <P style="bold" className={s.name}>
                          {section.name}
                        </P>
                        {section.suggestions.map((sug, i) => (
                          <P key={`suggestion-${i}`}>
                            <b>{i + 1}. </b>
                            {sug}
                          </P>
                        ))}
                      </div>
                    )
                )}
              </Col>
            </Row>
          )}
        </>
      )}
    </QuestionLayout>
  )
}

export default Results
