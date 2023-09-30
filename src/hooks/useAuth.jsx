import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuth, setIsLoading } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userSession } = useSelector((state) => state.auth.data)
  const ref = useRef(false)
  const accessToken = localStorage.getItem('access_token')
  useEffect(() => {
    if (!userSession && accessToken) {
      dispatch(setIsLoading(true))
      setTimeout(() => {
        dispatch(setAuth({ userSession: jwtDecode(accessToken), isSignin: true }))
        dispatch(setIsLoading(false))
      }, 500)
    }
    if (!ref.current && userSession) {
      switch (userSession.role) {
        case 'admin':
          navigate('/admin')
          break

        case 'manager':
          navigate('/manager')
          break

        case 'cashier':
          navigate('/cashier')
          break

        case 'kitchen':
          navigate('/kitchen')
          break

        case 'machine':
          navigate('/machine')
          break

        default:
          navigate('/')
          break
      }

      return () => (ref.current = true)
    }
  }, [userSession])
}

export default useAuth
