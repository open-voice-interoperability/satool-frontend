import { P } from 'components/Text'
import s from './Footer.module.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className={s.footer}>
      <Container className={s.wrapper}>
        <div className={s.links}>
          <Link to="/info/privacy">
            <P size="small">{t('link_privacy_policy')}</P>
          </Link>
          <Link to="/info/cookies">
            <P size="small">{t('link_cookies_policy')}</P>
          </Link>
        </div>
        <div className={s.copyright}>
          <P size="small">©{new Date().getFullYear()} Open Voice Network</P>
        </div>
      </Container>
    </div>
  )
}

export default Footer
