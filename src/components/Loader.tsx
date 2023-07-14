import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import Loading from './Loading'
import { useTranslation } from 'react-i18next'
import { P } from './Text'
import Button from './Button'
import s from './Loader.module.scss'

type LoaderProps = {
  f: () => Promise<any>
  r: (r: any) => void
  render: () => ReactNode
  changes?: boolean
}

const Loader: FC<LoaderProps> = ({ f, r, render, changes = true }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean | undefined>()
  const [error, setError] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    f()
      .then((res) => {
        r(res)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
        setLoading(false)
      })
  }, [f, setError, setLoading])

  useEffect(() => {
    if (!changes || loading) return
    load()
  }, [changes])

  if (loading || loading === undefined) {
    return (
      <div className={s.loading}>
        <Loading />
      </div>
    )
  }
  if (error) {
    return (
      <div className={s.error}>
        <P>{t('general_error')}</P>
        <Button onClick={load}>{t('button_retry')}</Button>
      </div>
    )
  }

  return <>{render()}</>
}

export default Loader
