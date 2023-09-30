import { useSelector } from 'react-redux'
import useValidateToken from '../hooks/useValidateToken'
import Unauthorize from './unauthorize'

const RequireAuth = ({ children, allowedRole }) => {
  // Custom hook validation token more ...
  useValidateToken()
  const { userSession, isSignin } = useSelector((state) => state.auth.data)
  return <>{isSignin && userSession ? userSession.role === allowedRole ? children : <Unauthorize /> : null}</>
}

export default RequireAuth
