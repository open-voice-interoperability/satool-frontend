import { Container } from 'react-bootstrap'
import Logo from './Logo'
import Navbar from './Navbar'
import s from './TopBar.module.scss'
import { FC } from 'react'
import { clsx as cn } from 'clsx'
import { Link, useParams } from 'react-router-dom'

type TopBarProps = {
  style?: 'regular' | 'secondary'
  fullNav?: boolean
}

const TopBar: FC<TopBarProps> = ({ style = 'regular', fullNav = false }) => {
  const { slug } = useParams()
  return (
    <div className={cn(s.topbar, slug)}>
      <Container className={s.wrapper}>
        <Link className={s.logo} to="/">
          <Logo style={style === 'regular' ? 'regular' : 'white'} />
        </Link>
        <div className={s.navbar}>
          <Navbar />
        </div>
      </Container>
    </div>
  )
}

export default TopBar
