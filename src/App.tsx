import { Route, Routes } from 'react-router-dom'
import s from './App.module.scss'
import Intro from 'features/questions/Intro'
import Page from 'layout/Page'
import SectionHeading from 'features/questions/SectionHeading'
import Question from 'features/questions/Question'
import Results from 'features/questions/Results'
import { RealViewport } from '@spartanbits/react'
import QuestionnaireList from 'features/questions/QuestionnaireList'
import { AuthProvider } from '@spartanbits/react-auth'
import PasswordReset from 'features/auth/ResetPassword'
import PasswordResetConfirm from 'features/auth/ConfirmPassword'
import PasswordChange from 'features/auth/ChangePassword'
import AccountVerification from 'features/auth/AccountVerification'
import ResendEmail from 'features/auth/ResendEmail'
import Logout from 'features/auth/Logout'
import Login from 'features/auth/Login'
import Register from 'features/auth/Register'
import PageInfo from 'features/info/PageInfo'
import Home from 'features/questions/Home'
import CookiesMessage from 'features/info/CookieMessage'

const App = () => {
  return (
    <AuthProvider
      isAdminUser={(user) => user.is_admin}
      isStaffUser={(user) => user.is_staff}
    >
      <div className={s.app}>
        <RealViewport />
        <Page>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<PageInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/accounts/password/reset"
              element={<PasswordReset />}
            />
            <Route
              path="/accounts/password/confirm/:uid/:token"
              element={<PasswordResetConfirm />}
            />
            <Route
              path="/accounts/password/change"
              element={<PasswordChange />}
            />
            <Route
              path="/accounts/verification/:key"
              element={<AccountVerification />}
            />
            <Route
              path="/accounts/verification/resend-email"
              element={<ResendEmail />}
            />
            <Route
              path="/questionnaire/:questionnaireId?"
              element={<Intro />}
            />
            <Route
              path="/questionnaire/:questionnaireId/question/:questionId"
              element={<Question />}
            />
            <Route
              path="/questionnaire/:questionnaireId/section/:slug"
              element={<SectionHeading />}
            />
            <Route
              path="/questionnaire/:questionnaireId/results"
              element={<Results />}
            />
            <Route path="/my-questionnaires" element={<QuestionnaireList />} />
            <Route path="/info/:infoSlug" element={<PageInfo />} />
          </Routes>
        </Page>
        <CookiesMessage />
      </div>
    </AuthProvider>
  )
}

export default App
