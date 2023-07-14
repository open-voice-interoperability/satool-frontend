import { FormEvent, useState } from 'react'
import { post } from 'api/http-common'
import AuthFooter from './AuthFooter'
import AuthLayout from './AuthLayout'
import { useTranslation } from 'react-i18next'
import { H2 } from 'components/Text'
import s from './Forms.module.scss'

function ResendEmail({}) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleResendClick = () => {
    post(
      `/api/auth/registration/resend-email/`,
      {
        email: email,
      },
      {}
    )
      .then((_data) => setSuccess(true))
      .catch((_error) => setSuccess(false))
  }

  return (
    <AuthLayout>
      {success == undefined || !success ? (
        <>
          <H2>{t('title_resend_email')}</H2>
          <p className="pb-4 mb-0">{t('text_resend_email')}</p>

          <form className={s.form}>
            {success === false && (
              <div className="alert alert-block alert-danger">
                <ul className="mb-0">
                  <li>{t('error_resend_email')}</li>
                </ul>
              </div>
            )}
            <div className={s.formGroup}>
              <input
                type="email"
                className="textinput textInput form-control"
                placeholder={t('input_placeholder_email') || ''}
                onChange={handleEmailChange}
              />
            </div>
            <div className={s.footer}>
              <AuthFooter
                onActionClick={handleResendClick}
                actionText={t('button_resend_email')}
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <H2>{t('title_resend_email_done')}</H2>
          <p>{t('text_resend_email_done')}</p>
        </>
      )}
    </AuthLayout>
  )
}

export default ResendEmail
