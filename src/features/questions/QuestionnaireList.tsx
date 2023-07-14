import { useEffect, useState } from 'react'
import { deleteQuestionnaire, fetchQuestionnaires } from './api'
import { Questionnaire } from './questions'
import TopBar from 'layout/TopBar'
import s from './QuestionnaireList.module.scss'
import { questionnaire, results } from './urls'
import { Col, Container, Row } from 'react-bootstrap'
import { ProgressBar } from 'components/ProgressBar'
import { useTranslation } from 'react-i18next'
import { H2, H4, P } from 'components/Text'
import Button from 'components/Button'
import Loader from 'components/Loader'
import { useAuth, useAuthOnly } from '@spartanbits/react-auth'
import { useNavigate } from 'react-router-dom'
import Modal from 'components/Modal'
import DeleteQuestionnaireModal from './DeleteQuestionnaireModal'
import CreateQuestionnaireModal from './CreateQuestionnaireModal'

const QuestionnaireList = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const { t } = useTranslation()
  const { get } = useAuth()
  const navigate = useNavigate()
  const [hasChanges, setHasChanges] = useState(true)
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined)
  const [showCreateQuestionnaireModal, setShowCreateQuestionnaireModal] =
    useState(false)

  useAuthOnly(() => navigate('/login'))

  return (
    <div>
      <TopBar style="regular" fullNav />
      <Container className={s.list}>
        <div className={s.titleWrapper}>
          <H2 className={s.title}>{t('title_questionnaire_list')}</H2>
          <Button
            className={s.new}
            onClick={() => setShowCreateQuestionnaireModal(true)}
          >
            {t('button_new_questionnaire')}
          </Button>
        </div>
        <Loader
          changes={hasChanges}
          f={() => fetchQuestionnaires(get)}
          r={(r) => {
            setQuestionnaires(r.results)
            setHasChanges(false)
          }}
          render={() => (
            <Row>
              {questionnaires.length === 0 ? (
                <div className={s.placeholder}>
                  <P>{t('questionnaire_list_empty')}</P>
                  <Button
                    style="secondary"
                    className={s.startNewPlaceholder}
                    onClick={() => setShowCreateQuestionnaireModal(true)}
                  >
                    {t('button_new_questionnaire')}
                  </Button>
                </div>
              ) : (
                questionnaires.map((q) => (
                  <Col sm={12} md={6}>
                    <div className={s.item}>
                      <div className={s.nameWrapper}>
                        <P className={s.name}>{q.name}</P>
                        {q.progress === 100 && (
                          <H4>
                            {q.score?.toFixed(1)}
                            <span>/100</span>
                          </H4>
                        )}
                      </div>
                      <ProgressBar
                        progress={q.progress || 0}
                        className={s.progress}
                        showTrack
                      />
                      <div className={s.controls}>
                        <Button
                          style="red"
                          className={s.delete}
                          onClick={() => setDeleteId(q.id)}
                        >
                          {t('delete')}
                        </Button>
                        <Button
                          className={s.continue}
                          style={q.progress === 100 ? 'primary' : 'secondary'}
                          to={
                            q.progress === 100
                              ? results(q.id)
                              : questionnaire(q.id)
                          }
                        >
                          {q.progress === 100
                            ? t('view_results')
                            : t('continue')}
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))
              )}
            </Row>
          )}
        />
        <DeleteQuestionnaireModal
          id={deleteId}
          onSuccess={() => setHasChanges(true)}
          onClose={() => setDeleteId(undefined)}
        />
        <CreateQuestionnaireModal
          show={showCreateQuestionnaireModal}
          onSuccess={(result: any) => {
            navigate(questionnaire(result.id))
          }}
          onClose={() => setShowCreateQuestionnaireModal(false)}
        />
      </Container>
    </div>
  )
}

export default QuestionnaireList
