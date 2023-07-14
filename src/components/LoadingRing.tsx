import { FC } from 'react'
import s from './LoadingRing.module.scss'
import { clsx as cn } from 'clsx'

type LoadingRingProps = {
  style?: 'primary' | 'secondary'
}

const LoadingRing: FC<LoadingRingProps> = ({ style = 'primary' }) => {
  return (
    <div className={cn(s.ring, style === 'secondary' && s.secondary)}></div>
  )
}

export default LoadingRing
