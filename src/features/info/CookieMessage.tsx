import s from './CookieMessage.module.scss'
import { useEffect, useState } from 'react'
import { useCookie } from 'react-use'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
import { P } from 'components/Text'
import { Link } from 'react-router-dom'
import Button from 'components/Button'

export const COOKIE_CONSENT_KEY = 'cookieConsent'

const CookiesMessage = () => {
  const [cookie, setCookie] = useCookie(COOKIE_CONSENT_KEY)
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  const handleAccept = () => {
    setShow(false)
    ;(setCookie as (value: any) => void)(true)
  }

  useEffect(() => {
    setShow(cookie === null)
  }, [cookie, setShow])

  if (!show) return null

  return (
    <div className={s.cookies} key="msg-cookies">
      <Container className={s.wrapper}>
        <P className={s.message}>{t('cookies_consent_body')}</P>
        <div className={s.buttons}>
          <Link to="/info/cookies" className={s.policy}>
            {t('link_cookies_policy')}
          </Link>
          <div className={s.padding}></div>
          <div className={s.options}>
            <Button
              style="secondary"
              className={s.accept}
              onClick={handleAccept}
            >
              {t('cookies_consent_accept')}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CookiesMessage
