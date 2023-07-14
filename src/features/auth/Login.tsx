import LoginForm from './LoginForm'
import AuthLayout from './AuthLayout'
import { H2 } from 'components/Text'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()
  return (
    <AuthLayout>
      <H2>{t('login_title')}</H2>
      <LoginForm />
    </AuthLayout>
  )
}

export default Login
