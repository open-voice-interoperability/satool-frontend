import Layout from 'layout/Layout'
import s from './AuthLayout.module.scss'
import { FC, ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className={s.authLayout}>{children}</div>
    </Layout>
  )
}

export default AuthLayout
