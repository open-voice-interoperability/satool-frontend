import { post } from 'api/http-common'
import Layout from 'layout/Layout'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoginForm from './LoginForm'
import Loading from 'components/Loading'
import { Trans, Translation, useTranslation } from 'react-i18next'
import AuthLayout from './AuthLayout'
import { H2 } from 'components/Text'

function AccountVerification() {
  const { t } = useTranslation()
  const { key } = useParams()
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    post(
      `/api/auth/registration/verify-email/`,
      {
        key: key,
      },
      {}
    )
      .then((_res) => setSuccess(true))
      .catch((_error) => setSuccess(false))
  }, [])

  if (success === undefined) {
    return <Loading />
  }

  return (
    <AuthLayout>
      {success ? (
        <>
          <H2>{t('title_account_verified')}</H2>
          <p className="pb-4 mb-0">{t('text_account_verified')}</p>
          <LoginForm />
        </>
      ) : (
        <>
          <H2>{t('title_error_account_activation')}</H2>
          <p>
            <Trans i18nKey="error_account_activation">
              We weren't able to activate your account, you can
              <Link to="/accounts/verification/resend-email">
                click here
              </Link>{' '}
              to resend the activation email.
            </Trans>
          </p>
        </>
      )}
    </AuthLayout>
  )
}

export default AccountVerification
