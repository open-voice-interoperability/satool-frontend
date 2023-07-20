import { useNavigate } from 'react-router-dom'
import AuthFooter from './AuthFooter'
import { LoginForm as LoginFormAuth } from '@spartanbits/react-auth'
import { useTranslation } from 'react-i18next'
import s from './Forms.module.scss'

export default function LoginForm({}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const renderComponent = ({
    email,
    password,
    error,
    loading,
    handlePasswordChange,
    handleEmailChange,
    handleSubmit,
  }: any) => {
    return (
      <form onSubmit={handleSubmit} className={s.form}>
        {error && (
          <div className="alert alert-block alert-danger">
            <ul className="mb-0">
              <li>{t('error_login_credentials')}</li>
            </ul>
          </div>
        )}
        <div className={s.formGroup}>
          <input
            type="email"
            className="textinput textInput"
            placeholder={t('input_placeholder_email') || 'Password'}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={s.formGroup}>
          <input
            className="textinput textInput"
            type="password"
            placeholder={t('input_placeholder_password') || 'Password'}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={s.footer}>
          <AuthFooter actionText={t('button_log_in')} loading={loading} />
        </div>
      </form>
    )
  }

  return (
    <LoginFormAuth
      renderComponent={renderComponent}
      onLogin={() => navigate('/my-questionnaires')}
    />
  )
}
