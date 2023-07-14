import Layout from 'layout/Layout'
import RegisterForm from './RegisterForm'
import { H2 } from 'components/Text'
import { useTranslation } from 'react-i18next'
import AuthLayout from './AuthLayout'

const Register = () => {
  const { t } = useTranslation()
  return (
    <AuthLayout>
      <H2>{t('title_register')}</H2>
      <RegisterForm />
    </AuthLayout>
  )
}

export default Register
