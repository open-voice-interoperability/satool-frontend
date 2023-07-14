import Modal from 'components/Modal'
import { P } from 'components/Text'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createQuestionnaire } from './api'
import { useAuth } from '@spartanbits/react-auth'

type CreateQuestionnaireModalProps = {
  show: boolean
  onSuccess: (result: any) => void
  onClose: () => void
}

const CreateQuestionnaireModal: FC<CreateQuestionnaireModalProps> = ({
  show,
  onSuccess,
  onClose,
}) => {
  const { t } = useTranslation()
  const { post } = useAuth()
  const [name, setName] = useState('')

  const handleCreateQuestionnaire = () => {
    return createQuestionnaire(post, name)
  }

  const handleSuccess = (result: any) => {
    onSuccess(result)
    setName('')
  }

  const handleClose = () => {
    onClose()
    setName('')
  }

  return (
    <Modal
      title={t('title_modal_new_questionnaire')}
      action={t('button_create')}
      show={show}
      body={
        <>
          <P>{t('modal_new_questionnaire')}</P>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={t('input_questionnaire_name') || ''}
            value={name}
          />
        </>
      }
      onAction={handleCreateQuestionnaire}
      onClose={handleClose}
      onSuccess={handleSuccess}
      actionStyle="primary"
    />
  )
}

export default CreateQuestionnaireModal
