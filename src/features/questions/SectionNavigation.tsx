import { FC } from 'react'
import { Questionnaire, Section } from './questions'
import useSections from './useSections'
import { P } from 'components/Text'
import s from './SectionNavigation.module.scss'
import { clsx as cn } from 'clsx'
import { Link } from 'react-router-dom'
import { section as sectionUrl } from './urls'

type SectionNavigationProps = {
  section: Section | undefined
  questionnaire: Questionnaire | undefined
}

const SectionNavigation: FC<SectionNavigationProps> = ({
  section,
  questionnaire,
}) => {
  const sections = useSections({ fetch: false })

  if (!section || !questionnaire) return null
  const index = sections.findIndex((sec) => sec.id === section.id)
  return (
    <div className={s.sectionNav}>
      {sections.map((sect, i) => (
        <Link
          className={s.section}
          to={sectionUrl(questionnaire.id, sect.slug)}
        >
          {section.id === sect.id ? (
            <P style="bold" className={cn(s.text, section.slug)}>
              {i + 1}.{section.name}
            </P>
          ) : i < index ? (
            <P className={s.text}>
              {i + 1}
              <span></span>
            </P>
          ) : null}
        </Link>
      ))}
    </div>
  )
}

export default SectionNavigation
