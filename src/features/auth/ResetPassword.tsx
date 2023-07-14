import { FormEvent, useState } from 'react'
import { post } from 'api/http-common'
import AuthFooter from './AuthFooter'
import AuthLayout from './AuthLayout'
import s from './Forms.module.scss'
import { useTranslation } from 'react-i18next'
import { H2 } from 'components/Text'

function PasswordReset({}) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleResendClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.length == 0) return
    let formData = new FormData()
    formData.append('email', email)
    post(`/api/auth/password/reset/`, formData, {})
      .then((_data) => setSuccess(true))
      .catch((_error) => setSuccess(false))
  }

  return (
    <AuthLayout>
      {success == undefined || !success ? (
        <>
          <H2>{t('title_reset_password')}</H2>
          <p className="pb-4 mb-0">{t('text_reset_password')}</p>

          <form className={s.form} onSubmit={handleResendClick}>
            {success === false && (
              <div className="alert alert-block alert-danger">
                <ul className="mb-0">
                  <li>{t('error_reset_password')}</li>
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
              <AuthFooter actionText={t('button_send_reset_password')} />
            </div>
          </form>
        </>
      ) : (
        <>
          <H2>{t('title_reset_password_sent')}</H2>
          <p>{t('text_reset_password_sent')}</p>
        </>
      )}
    </AuthLayout>
  )
}

export default PasswordReset
