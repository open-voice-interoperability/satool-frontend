import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { P } from './Text'
import { clsx as cn } from 'clsx'
import s from './Loading.module.scss'
import LoadingRing from './LoadingRing'

type LoadingProps = {
  style?: 'primary' | 'secondary'
}

const Loading: FC<LoadingProps> = ({ style = 'primary' }) => {
  const { t } = useTranslation()

  return (
    <div className={s.loading}>
      <div className={s.wrapper}>
        <LoadingRing style={style} />
        <P
          className={cn(
            style === 'primary' && s.primary,
            style === 'secondary' && s.secondary
          )}
        >
          {t('loading')}
        </P>
      </div>
    </div>
  )
}

export default Loading
