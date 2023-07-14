import { FC } from 'react'
import { clsx as cn } from 'clsx'
import s from './Text.module.scss'

type HProps = {
  children: React.ReactNode
  className?: string
  inverted?: boolean
}

type PProps = {
  children: React.ReactNode
  className?: string
  inverted?: boolean
  size?: 'small' | 'regular'
  style?: 'bold' | 'regular'
}

const H1: FC<HProps> = ({ inverted, ...props }) => {
  return (
    <h1 className={cn(s.h1, props.className, inverted && s.inverted)}>
      {props.children}
    </h1>
  )
}

const H2: FC<HProps> = ({ inverted, ...props }) => {
  return (
    <h2 className={cn(s.h2, props.className, inverted && s.inverted)}>
      {props.children}
    </h2>
  )
}

const H4: FC<HProps> = ({ inverted, ...props }) => {
  return (
    <h4 className={cn(s.h4, props.className, inverted && s.inverted)}>
      {props.children}
    </h4>
  )
}

const P: FC<PProps> = ({
  size = 'regular',
  style = 'regular',
  inverted,
  ...props
}) => {
  return (
    <p
      className={cn(
        s.p,
        size === 'small' && s.small,
        style === 'bold' && s.bold,
        inverted && s.inverted,
        props.className
      )}
    >
      {props.children}
    </p>
  )
}

export { P, H1, H2, H4 }
