import { FC } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import s from './RingProgress.module.scss'
import { clsx as cn } from 'clsx'
import { H2, P } from './Text'

type RingProgressProps = {
  total?: number
  progress: number[]
  className?: string
  strokeWidth?: number
  size?: number
  color?: number
  layout?: 'big' | 'compact'
}

const RingProgress: FC<RingProgressProps> = ({
  total,
  progress,
  className,
  strokeWidth = 18,
  size,
  layout = 'big',
  color,
}) => {
  const styles = [
    buildStyles({
      backgroundColor: 'transparent',
      trailColor: 'transparent',
      pathColor: '#27ba88',
      strokeLinecap: 'butt',
    }),
    buildStyles({
      backgroundColor: 'transparent',
      trailColor: 'transparent',
      pathColor: '#f3b98b',
      strokeLinecap: 'butt',
    }),
    buildStyles({
      backgroundColor: 'transparent',
      trailColor: 'transparent',
      pathColor: '#f09693',
      strokeLinecap: 'butt',
    }),
    buildStyles({
      backgroundColor: 'transparent',
      trailColor: 'transparent',
      pathColor: '#6271e3',
      strokeLinecap: 'butt',
    }),
    buildStyles({
      backgroundColor: 'transparent',
      trailColor: 'transparent',
      pathColor: '#2361e9',
      strokeLinecap: 'butt',
    }),
    buildStyles({
      backgroundColor: 'transparent',
      trailColor: 'transparent',
      pathColor: '#120d6a',
      strokeLinecap: 'butt',
    }),
  ]
  const trackStyle = buildStyles({
    backgroundColor: 'transparent',
    trailColor: 'transparent',
    pathColor: '#f0f0f0',
    strokeLinecap: 'butt',
  })
  const totalScore = Math.floor(
    total ?? progress.reduce((acc, p) => acc + p, 0)
  )
  return (
    <div
      className={cn(s.ringProgress, className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {layout === 'big' ? (
        <H2 className={s.text}>
          {totalScore}
          <span>/100</span>
        </H2>
      ) : (
        <P className={s.text} size="small">
          {totalScore}
        </P>
      )}
      {progress.map((p, i) => {
        const acc = progress.reduce((acc, p, j) => (j < i ? acc + p : acc), 0)
        return (
          <>
            <div
              className={s.ringWrapper}
              style={{
                transform: `rotate(${(acc / 100) * 360}deg`,
                width: `${size}px`,
                height: `${size}px`,
              }}
            >
              <CircularProgressbar
                value={p}
                strokeWidth={strokeWidth}
                styles={styles[color === undefined ? i % styles.length : color]}
              />
            </div>
            {i === progress.length - 1 ? (
              <div
                className={s.ringWrapper}
                style={{
                  transform: `rotate(${((acc + p) / 100) * 360}deg`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <CircularProgressbar
                  value={100 - (acc + p)}
                  strokeWidth={strokeWidth}
                  styles={trackStyle}
                />
              </div>
            ) : null}
          </>
        )
      })}
    </div>
  )
}

export default RingProgress
