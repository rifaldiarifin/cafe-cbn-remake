import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jsCookie from 'js-cookie'
import signOut from '../services/signout.service'
import { setAuth, setIsLoading } from '../redux/slice/authSlice'
import { setAlert } from '../redux/slice/popupScreenSlice'
import { me, writeActivity } from '../utils/activity'

const useSignOut = () => {
  const ref = useRef(false)
  const alertAction = useSelector((state) => state.popupScreen.data.alertData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (alertAction.actionName === 'signOut' && ref.current) {
      const clearToken = async () => {
        dispatch(setIsLoading(true))
        try {
          await signOut()
          await writeActivity(`${me} signed out on the device`)
          jsCookie.remove('refresh_token', { sameSite: 'Strict' })
          localStorage.removeItem('access_token')
          dispatch(setAuth({ userSession: null, setIsSignin: false }))
          dispatch(setIsLoading(false))

          // Back to home
          navigate('/auth/signin')
        } catch (error) {
          if (!error?.response) {
            console.error('Error: No Server Response! :(')
            dispatch(
              setAlert({
                title: 'Sign out',
                description: 'No Server Response! :(',
                alertType: 'message',
                alertStyle: 'danger'
              })
            )
          } else if (error?.response?.data?.message) {
            console.error('Error: ', error?.response?.data?.message)
            dispatch(
              setAlert({
                title: 'Sign out',
                description: error?.response?.data?.message,
                alertType: 'message',
                alertStyle: 'danger'
              })
            )
          } else {
            console.error('Error: ', error.message)
            dispatch(
              setAlert({
                title: 'Sign out',
                description: error.message,
                alertType: 'message',
                alertStyle: 'danger'
              })
            )
          }
          dispatch(setIsLoading(false))
        }
      }
      if (alertAction.action.yes) {
        clearToken()
      }
    }
    return () => (ref.current = true)
  }, [alertAction.action, dispatch])
}

export default useSignOut
