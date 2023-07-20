import Button from 'components/Button'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import s from './Navbar.module.scss'
import { useAuth } from '@spartanbits/react-auth'

const Navbar = () => {
  const { questionId, slug } = useParams()
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  let content
  if (pathname === '/' && isAuthenticated) {
    content = (
      <Button to="/my-questionnaires" style="primary">
        {t('button_my_questionnaires')}
      </Button>
    )
  } else if (pathname === '/login' && !isAuthenticated) {
    content = (
      <Button to="/register" style="secondary">
        {t('button_register')}
      </Button>
    )
  } else if (pathname === '/register' && !isAuthenticated) {
    content = (
      <Button to="/login" style="secondary">
        {t('button_log_in')}
      </Button>
    )
  } else if (questionId !== undefined || slug) {
    content = (
      <Button to="/my-questionnaires" style="secondary">
        {t('button_continue_later')}
      </Button>
    )
  } else {
    content = isAuthenticated ? (
      <Button className={s.navButton} to="/logout" style="secondary">
        {t('button_logout')}
      </Button>
    ) : (
      <>
        <Button to="/login">{t('button_log_in')}</Button>
      </>
    )
  }

  return (
    <div className={s.navbar}>
      <div className={s.wrapper}>{content}</div>
    </div>
  )
}

export default Navbar
