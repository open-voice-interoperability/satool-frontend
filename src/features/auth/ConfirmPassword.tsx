import { FormEvent, useState } from 'react'
import { post } from 'api/http-common'
import LoginForm from './LoginForm'
import AuthFooter from './AuthFooter'
import { useParams } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import s from './Forms.module.scss'
import { H2 } from 'components/Text'
import { useTranslation } from 'react-i18next'

function PasswordResetConfirm() {
  const { t } = useTranslation()
  const { token, uid } = useParams()
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const handlePassword1Change = (e: FormEvent<HTMLInputElement>) => {
    setPassword1(e.currentTarget.value)
  }

  const handlePassword2Change = (e: FormEvent<HTMLInputElement>) => {
    setPassword2(e.currentTarget.value)
  }

  const handlePasswordResetClick = () => {
    post(
      `/api/auth/password/reset/confirm/`,
      {
        new_password1: password1,
        new_password2: password2,
        uid: uid,
        token: token,
      },
      {}
    )
      .then((_data) => setSuccess(true))
      .catch((_error) => setSuccess(false))
  }

  return (
    <AuthLayout>
      {success == undefined || success === false ? (
        <>
          <H2>{t('title_confirm_password_reset')}</H2>
          <p className="pb-4 mb-0">{t('text_confirm_password_reset')}</p>

          <form className={s.form}>
            {success === false && (
              <div className="alert alert-block alert-danger">
                <ul className="mb-0">
                  <li>{t('error_confirm_password_reset')}</li>
                </ul>
              </div>
            )}
            <div className={s.formGroup}>
              <input
                type="password"
                className="textinput textInput form-control"
                placeholder={t('input_placeholder_password') || ''}
                onChange={handlePassword1Change}
              />
            </div>
            <div className={s.formGroup}>
              <input
                type="password"
                className="textinput textInput form-control"
                placeholder={t('input_placeholder_password_confirmation') || ''}
                onChange={handlePassword2Change}
              />
            </div>
            <div className={s.footer}>
              <AuthFooter
                onActionClick={handlePasswordResetClick}
                actionText={t('button_confirm_password_reset')}
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <H2>{t('title_confirm_password_reset_done')}</H2>
          <p>{t('text_confirm_password_reset_done')}</p>
          <LoginForm />
        </>
      )}
    </AuthLayout>
  )
}

export default PasswordResetConfirm
