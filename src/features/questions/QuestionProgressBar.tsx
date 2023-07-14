import { ProgressBar } from 'components/ProgressBar'
import { FC } from 'react'
import { useQuestionnaireStore } from 'store/store'

type QuestionProgressBarProps = {
  style?: 'regular' | 'secondary'
  className?: string
}

const QuestionProgressBar: FC<QuestionProgressBarProps> = ({
  style,
  className,
}) => {
  const { answers, getProgress } = useQuestionnaireStore()
  return (
    <ProgressBar progress={getProgress()} style={style} className={className} />
  )
}
export default QuestionProgressBar
