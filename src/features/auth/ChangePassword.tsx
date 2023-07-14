import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '@spartanbits/react-auth'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import AuthFooter from './AuthFooter'
import { useTranslation } from 'react-i18next'
import AuthLayout from './AuthLayout'
import s from './Forms.module.scss'

function PasswordChange() {
  const { t } = useTranslation()
  const [oldPassword, setOldPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const { post, loading, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleOldPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setOldPassword(e.currentTarget.value)
  }

  const handlePassword1Change = (e: FormEvent<HTMLInputElement>) => {
    setPassword1(e.currentTarget.value)
  }

  const handlePassword2Change = (e: FormEvent<HTMLInputElement>) => {
    setPassword2(e.currentTarget.value)
  }

  const handlePasswordChangeClick = () => {
    post(
      '/api/auth/password/change/',
      {
        new_password1: password1,
        new_password2: password2,
        old_password: oldPassword,
      },
      {}
    )
      .then((_data) => setSuccess(true))
      .catch((_error) => setSuccess(false))
  }

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login')
    }
  }, [isAuthenticated, loading])

  return (
    <AuthLayout>
      {success == undefined || success === false ? (
        <>
          <form className={s.form}>
            {success === false && (
              <div className="alert alert-block alert-danger">
                <ul className="mb-0">
                  <li>{t('error_password_change')}</li>
                </ul>
              </div>
            )}
            <div className={s.formGroup}>
              <input
                type="password"
                className="textinput textInput form-control"
                placeholder="Current password"
                onChange={handleOldPasswordChange}
              />
            </div>
            <div className={s.formGroup}>
              <input
                type="password"
                className="textinput textInput form-control"
                placeholder="New password"
                onChange={handlePassword1Change}
              />
            </div>
            <div className={s.formGroup}>
              <input
                type="password"
                className="textinput textInput form-control"
                placeholder="Confirm new password"
                onChange={handlePassword2Change}
              />
            </div>
            <div className={s.footer}>
              <AuthFooter
                onActionClick={handlePasswordChangeClick}
                actionText="Change password"
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <p>{t('text_password_changed')}</p>
          <LoginForm />
        </>
      )}
    </AuthLayout>
  )
}

export default PasswordChange
