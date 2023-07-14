import { useAuth } from '@spartanbits/react-auth'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    logout()
      .then((r) => navigate('/'))
      .catch((e) => navigate('/'))
  }, [])

  return null
}

export default Logout
