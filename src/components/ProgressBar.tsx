import { FC } from 'react'
import s from './ProgressBar.module.scss'
import { clsx as cn } from 'clsx'

type ProgressBarProps = {
  progress: number
  style?: 'secondary' | 'regular'
  className?: string
  showTrack?: boolean
}

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  style = 'regular',
  className,
  showTrack = false,
}) => {
  return (
    <div
      className={cn(
        s.progress,
        style === 'secondary' && s.secondary,
        showTrack && s.track,
        className
      )}
    >
      <span style={{ width: `${progress}%` }}></span>
    </div>
  )
}
