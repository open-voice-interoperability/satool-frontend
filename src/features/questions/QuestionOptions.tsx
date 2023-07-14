import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  Answer,
  Question,
  QuestionOption as QuestionOptionData,
} from './questions'
import { useQuestionnaireStore } from 'store/store'
import { shallow } from 'zustand/shallow'
import s from './QuestionOptions.module.scss'
import { clsx as cn } from 'clsx'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

type QuestionOptionsProps = {
  question: Question
}

type QuestionOptionProps = {
  question: Question
  option: QuestionOptionData
  selected: boolean
  onSelected: (answer: Answer) => void
  onUnSelected: (answer: Answer) => void
  enabled: boolean
}

type FreeTextProps = {
  question: Question
  text?: string
  option: QuestionOptionData
  onChange: (answer: Answer) => void
}

type SuggestionProps = {
  option: QuestionOptionData
}

const QuestionOption: FC<QuestionOptionProps> = ({
  question,
  option,
  selected,
  onSelected,
  onUnSelected,
  enabled,
}) => {
  const handleClick = useCallback(() => {
    if (!enabled && !selected) return
    selected
      ? onUnSelected({ option, question })
      : onSelected({ option, question })
  }, [question, option, enabled, selected, onSelected, onUnSelected])
  return (
    <button
      className={cn(s.option, selected && s.selected)}
      onClick={handleClick}
    >
      {option.text}
    </button>
  )
}

const FreeText: FC<FreeTextProps> = ({ question, option, text, onChange }) => {
  const { t } = useTranslation()
  return (
    <textarea
      onChange={(e) => {
        onChange({ question, option, text: e.target.value })
      }}
      placeholder={
        option.freeTextPlaceholder ??
        (t('question_option_freetext_placeholder') || '')
      }
      value={text}
    />
  )
}

const Suggestion: FC<SuggestionProps> = ({ option }) => {
  return <div dangerouslySetInnerHTML={{ __html: option.helpText || '' }}></div>
}

const QuestionOptions: FC<QuestionOptionsProps> = ({ question }) => {
  const { answers, setAnswer, unSetAnswer } = useQuestionnaireStore(
    ({ answers, setAnswer, unSetAnswer }) => ({
      answers,
      setAnswer,
      unSetAnswer,
    }),
    shallow
  )
  const selectedAnswers = answers.filter((a) => a.question.id === question.id)
  const freeTextRef = useRef<HTMLDivElement>()
  const helpTextRef = useRef<HTMLDivElement>()

  const handleSelected = useCallback(
    (answer: Answer) => {
      const qA = answers.filter((a) => a.question.id === question.id)
      if (qA.length > 0 && question.maxSelect === 1) {
        unSetAnswer(selectedAnswers[0])
      }
      if (answer.option.freeTextPlaceholder?.length) {
        freeTextRef?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      if (answer.option.helpText?.length) {
        helpTextRef?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      setAnswer(answer)
    },
    [answers, selectedAnswers, setAnswer, unSetAnswer, question]
  )
  const handleUnSelected = useCallback(
    (answer: Answer) => {
      unSetAnswer(answer)
    },
    [unSetAnswer]
  )
  const isSelected = (option: QuestionOptionData) => {
    return answers.findIndex((a) => a.option.id === option.id) >= 0
  }

  const options = question.options.map((option) => (
    <Col
      sm={12}
      md={question.options.length <= 5 ? 12 : 4}
      key={`col-${option.id}`}
    >
      <QuestionOption
        question={question}
        enabled={
          selectedAnswers.length < question.maxSelect ||
          question.maxSelect === 1
        }
        key={option.id}
        option={option}
        selected={isSelected(option)}
        onSelected={handleSelected}
        onUnSelected={handleUnSelected}
      />
    </Col>
  ))

  const getText = useCallback(() => {
    const textOption = question.options.find((o) => o.freeText && isSelected(o))
    const textAnswer = answers.find((a) => a.option.id === textOption?.id)
    return (
      textOption && (
        <FreeText
          question={question}
          option={textOption}
          text={textAnswer?.text}
          onChange={handleSelected}
        />
      )
    )
  }, [question, answers, handleSelected])

  const getSuggestion = () => {
    const suggestionOption = question.options.find(
      (o) => o.helpText && isSelected(o)
    )
    return suggestionOption && <Suggestion option={suggestionOption} />
  }

  return (
    <div>
      <Row>{options}</Row>
      <Row id="freeText">
        <Col ref={freeTextRef}>{getText()}</Col>
      </Row>
      <Row id="suggestion">
        <Col ref={helpTextRef}>{getSuggestion()}</Col>
      </Row>
    </div>
  )
}

export default QuestionOptions
