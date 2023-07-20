import { FC, ReactNode } from 'react'
import Navbar from './Navbar'
import s from './QuestionLayout.module.scss'
import { Container } from 'react-bootstrap'
import { clsx as cn } from 'clsx'
import TopBar from 'layout/TopBar'

type QuestionLayoutProps = {
  children: ReactNode
  style?: 'regular' | 'secondary'
  nextTo?: string
  loadingNext?: boolean
  backTo?: string
  backText?: string | null
  isStart?: boolean
  isEnd?: boolean
  logo?: boolean
}

const QuestionLayout: FC<QuestionLayoutProps> = ({
  children,
  style,
  nextTo,
  loadingNext,
  backTo,
  backText,
  isStart = false,
  isEnd = false,
  logo = false,
}) => {
  return (
    <div className={cn(s.questionLayout)}>
      <TopBar style={style} />
      <Container className={s.content}>{children}</Container>
      <div className={s.navbar}>
        <Navbar
          style={style}
          nextTo={nextTo}
          loadingNext={loadingNext}
          backText={backText}
          backTo={backTo}
          isStart={isStart}
          isEnd={isEnd}
          logo={logo}
        />
      </div>
    </div>
  )
}

export default QuestionLayout
