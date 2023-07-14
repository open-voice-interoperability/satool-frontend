import { useState } from 'react'
import { fetchSiteInfo } from './api'
import s from './Home.module.scss'
import Loader from 'components/Loader'
import Layout from 'layout/Layout'

const Home = () => {
  const [info, setInfo] = useState<string>('')

  return (
    <Layout>
      <Loader
        f={() => fetchSiteInfo('home')}
        r={(r) => setInfo(r.result)}
        render={() => (
          <div
            className={s.content}
            dangerouslySetInnerHTML={{ __html: info }}
          ></div>
        )}
      ></Loader>
    </Layout>
  )
}

export default Home
