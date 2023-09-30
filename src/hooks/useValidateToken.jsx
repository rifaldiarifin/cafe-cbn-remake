import { useDispatch } from 'react-redux'
import { setAuth, setIsLoading } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAlert } from '../redux/slice/popupScreenSlice'
import CONFIG from '../config/environment'
import { verifyToken, refreshToken } from '../services/auth.service'

const useValidateToken = async () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const BASE_URL = CONFIG.BaseUrlAPI
  const accessToken = localStorage.getItem('access_token')
  const ref = useRef(false)

  useEffect(() => {
    if (!ref.current) {
      dispatch(setIsLoading(true))
      const validateToken = async () => {
        if (!accessToken) {
          try {
            const refresh1 = await refreshToken()
            const newAccessToken = refresh1.data.result.accessToken
            localStorage.setItem('access_token', newAccessToken)
            dispatch(setIsLoading(false))
            dispatch(setAuth({ userSession: jwtDecode(newAccessToken), isSignin: true }))
            return
          } catch (error) {
            dispatch(setAuth({ userSession: null, isSignin: false }))
            dispatch(setIsLoading(false))
            navigate('/auth/signin')
            return
          }
        }
        // check token
        try {
          await verifyToken({ token: accessToken })
          dispatch(setAuth({ userSession: jwtDecode(accessToken), isSignin: true }))
          dispatch(setIsLoading(false))
        } catch (error) {
          if (!error.response) {
            dispatch(
              setAlert({
                title: 'Sign In',
                description: 'No Server Response :(, Try again later.',
                alertType: 'message',
                alertStyle: 'danger'
              })
            )
          } else if (error?.response?.status === 401) {
            try {
              const refresh2 = await refreshToken()
              localStorage.setItem('access_token', refresh2?.data?.result?.accessToken)
              dispatch(setIsLoading(false))
              dispatch(setAuth({ userSession: jwtDecode(refresh2.data.result.accessToken), isSignin: true }))
              return
            } catch (error) {
              localStorage.removeItem('access_token')
              dispatch(setAuth({ userSession: null, isSignin: false }))
              dispatch(setIsLoading(false))
              navigate('/auth/signin')
              return
            }
          } else {
            dispatch(
              setAlert({
                title: 'Connection Error',
                description: 'Error Connection Refused :(',
                alertType: 'message',
                alertStyle: 'danger'
              })
            )
            return
          }
        }
      }
      validateToken()

      return () => (ref.current = true)
    }
  }, [BASE_URL, accessToken, dispatch, navigate])
}

export default useValidateToken
