import { FC, useState } from 'react'
import { deleteQuestionnaire } from './api'
import { useAuth } from '@spartanbits/react-auth'
import Modal from 'components/Modal'
import { useTranslation } from 'react-i18next'
import { P } from 'components/Text'

type DeleteQuestionnaireModalProps = {
  id: number | undefined
  onSuccess?: () => void
  onClose?: () => void
}

const DeleteQuestionnaireModal: FC<DeleteQuestionnaireModalProps> = ({
  id,
  onSuccess,
  onClose,
}) => {
  const { t } = useTranslation()
  const { deleteRes } = useAuth()
  const handleDeleteQuestionnaire = () => {
    return deleteQuestionnaire(deleteRes, id || -1)
  }

  const handleDeleteSuccess = () => {
    onSuccess?.()
  }
  return (
    <Modal
      title={t('title_modal_delete_questionnaire')}
      action={t('button_delete')}
      show={id !== undefined}
      body={<P>{t('modal_confirm_delete_questionnaire')}</P>}
      onAction={handleDeleteQuestionnaire}
      onClose={onClose}
      onSuccess={handleDeleteSuccess}
      actionStyle="red"
    />
  )
}

export default DeleteQuestionnaireModal
