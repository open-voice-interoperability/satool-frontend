import { Link } from 'react-router-dom'
import AuthFooter from './AuthFooter'
import { RegisterForm as RegisterFormAuth } from '@spartanbits/react-auth'
import { Trans, useTranslation } from 'react-i18next'
import s from './Forms.module.scss'
import { clsx as cn } from 'clsx'
import { H2 } from 'components/Text'

const RegisterForm = ({ onRegister }: any) => {
  const { t } = useTranslation()
  const handleRegister = () => {
    onRegister && onRegister()
  }

  const renderComponent = ({ error, success, loading, handleSubmit }: any) => {
    const getErrorMessage = (name: string) => {
      return (
        error &&
        error[name] && (
          <div className="alert alert-block alert-danger mt-3 py-1">
            <ul className="mb-0">
              <li>{error[name]}</li>
            </ul>
          </div>
        )
      )
    }

    const getGeneralError = () => {
      return (
        success === false && (
          <div className="alert alert-block alert-danger py-1">
            <ul className="mb-0">
              <li>{error['non_field_errors'] || t('error_registration')}</li>
            </ul>
          </div>
        )
      )
    }

    return success ? (
      <>
        <H2>{t('title_register_success')}</H2>
        <p className="pb-3 mb-2">{t('text_verification_email_sent')}</p>
      </>
    ) : (
      <>
        <H2>{t('title_register')}</H2>
        <p className="pb-3 mb-2">{t('text_register')}</p>

        {getGeneralError()}

        <form className={s.form} onSubmit={handleSubmit}>
          {getErrorMessage('email')}
          <div id="div_id_email" className={s.formGroup}>
            <div>
              <input
                type="email"
                name="email"
                maxLength={254}
                autoFocus
                placeholder={t('input_placeholder_email') || ''}
                className="emailinput"
                required
                id="id_email"
              />
            </div>
          </div>
          {getErrorMessage('first_name')}
          <div id="div_id_first_name" className={s.formGroup}>
            <div>
              <input
                type="text"
                name="first_name"
                maxLength={30}
                placeholder={t('input_placeholder_name') || ''}
                className="textinput textInput"
                required
                id="id_first_name"
              />
            </div>
          </div>
          {getErrorMessage('last_name')}
          <div id="div_id_last_name" className={s.formGroup}>
            <div>
              <input
                type="text"
                name="last_name"
                maxLength={150}
                placeholder={t('input_placeholder_last_name') || ''}
                className="textinput textInput"
                required
                id="id_last_name"
              />
            </div>
          </div>
          {getErrorMessage('password1')}
          <div id="div_id_password1" className={s.formGroup}>
            <div>
              <input
                type="password"
                name="password1"
                autoComplete="new-password"
                placeholder={t('input_placeholder_password') || ''}
                className="textinput textInput"
                required
                id="id_password1"
              />
            </div>
          </div>
          {getErrorMessage('password2')}
          <div id="div_id_password2" className={s.formGroup}>
            <div>
              <input
                type="password"
                name="password2"
                autoComplete="new-password"
                placeholder={t('input_placeholder_password_confirmation') || ''}
                className="textinput textInput"
                required
                id="id_password2"
              />
            </div>
          </div>
          {getErrorMessage('terms_accepted')}
          <div className={cn(s.formGroup, s.checkboxWrapper)}>
            <input
              type="checkbox"
              name="terms_accepted"
              className="align-self-center checkboxinput"
              required
              id="id_terms_accepted"
            />
            <div className="align-self-center pe-2">
              <p className="p-small-1 m-0">
                <Trans i18nKey="text_accept_terms">
                  I accept the <Link to="/info/terms">terms of use</Link> and
                  the <Link to="/info/privacy">privacy policy</Link>
                </Trans>
              </p>
            </div>
          </div>
          <div className={s.footer}>
            <AuthFooter
              actionText={t('button_register')}
              showLogin={true}
              loading={loading}
            />
          </div>
        </form>
      </>
    )
  }
  return (
    <RegisterFormAuth
      renderComponent={renderComponent}
      onRegister={handleRegister}
    />
  )
}

export default RegisterForm
