import { FC } from 'react'
import s from './Logo.module.scss'
import { clsx as cn } from 'clsx'

type LogoProps = {
  style?: 'regular' | 'white'
}

const Logo: FC<LogoProps> = ({ style }) => {
  return <div className={cn(s.logo, style === 'white' && s.white)}></div>
}

export default Logo
