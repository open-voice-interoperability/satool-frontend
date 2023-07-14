import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { clsx as cn } from 'clsx'
import s from './Button.module.scss'

type ButtonProps = {
  to?: string
  back?: boolean
  onClick?: () => void
  className?: string
  children: ReactNode
  style?: 'primary' | 'secondary' | 'red'
  variant?: 'regular' | 'inverted'
}

const Button: FC<ButtonProps> = ({
  to,
  back = false,
  onClick,
  style = 'primary',
  variant = 'regular',
  className,
  ...props
}) => {
  const cls = cn(
    className,
    s.button,
    to && s.link,
    style === 'secondary' && s.secondary,
    variant === 'inverted' && s.inverted,
    style === 'red' && s.red
  )
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {props.children}
      </Link>
    )
  }
  return (
    <button className={cls} onClick={onClick}>
      {props.children}
    </button>
  )
}

export default Button
