import { useAuth } from '@spartanbits/react-auth'
import { FC, useEffect } from 'react'
import { useQuestionnaireStore } from 'store/store'

type Props = {
  fetch?: boolean
}

const useSections = ({ fetch = true }: Props) => {
  const { sections, fetchSections } = useQuestionnaireStore()
  const { get } = useAuth()

  useEffect(() => {
    if (sections.length === 0) {
      fetch && fetchSections(get)
    }
  }, [fetchSections, sections])

  return sections
}

export default useSections
