import { FC, ReactNode } from 'react'
import TopBar from './TopBar'
import Footer from './Footer'
import s from './Layout.module.scss'
import { Container } from 'react-bootstrap'

type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <Container className={s.content}>{children}</Container>
      <Footer />
    </>
  )
}

export default Layout
